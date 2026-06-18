use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::process::Command;

#[derive(Serialize)]
pub struct PortEntry {
    pub protocol: String,
    pub local_address: String,
    pub port: String,
    pub remote_address: String,
    pub state: String,
    pub pid: String,
    pub process_name: String,
    pub process_command: String,
}

#[derive(Clone, Default)]
struct ProcessInfo {
    name: String,
    command: String,
}

#[derive(Deserialize)]
#[serde(rename_all = "PascalCase")]
struct CimProcess {
    process_id: u32,
    name: Option<String>,
    command_line: Option<String>,
}

pub fn list_ports() -> Result<Vec<PortEntry>, String> {
    let netstat_output = Command::new("netstat")
        .args(["-ano"])
        .output()
        .map_err(|error| format!("No se pudo ejecutar netstat: {error}"))?;

    if !netstat_output.status.success() {
        return Err("netstat no pudo obtener la lista de puertos".to_string());
    }

    let process_infos = get_process_infos();
    let output = String::from_utf8_lossy(&netstat_output.stdout);
    let mut ports = output
        .lines()
        .filter_map(|line| parse_netstat_line(line, &process_infos))
        .collect::<Vec<_>>();

    ports.sort_by(|a, b| {
        let protocol_order = a.protocol.cmp(&b.protocol);
        if protocol_order == std::cmp::Ordering::Equal {
            parse_port_number(&a.port).cmp(&parse_port_number(&b.port))
        } else {
            protocol_order
        }
    });

    Ok(ports)
}

pub fn kill_process(pid: String) -> Result<(), String> {
    let parsed_pid = pid.parse::<u32>().map_err(|_| "PID invalido".to_string())?;

    if is_protected_pid(parsed_pid) {
        return Err("No se permite terminar procesos criticos del sistema".to_string());
    }

    if parsed_pid == std::process::id() {
        return Err("No se puede terminar la propia aplicacion".to_string());
    }

    let process_infos = get_process_infos();
    if let Some(process_info) = process_infos.get(&pid) {
        if is_protected_process_name(&process_info.name) {
            return Err(format!(
                "{} es un proceso protegido y no se puede terminar desde la app",
                process_info.name
            ));
        }
    }

    let output = Command::new("taskkill")
        .args(["/PID", &pid, "/F"])
        .output()
        .map_err(|error| format!("No se pudo ejecutar taskkill: {error}"))?;

    if output.status.success() {
        Ok(())
    } else {
        let stderr = String::from_utf8_lossy(&output.stderr).trim().to_string();
        let stdout = String::from_utf8_lossy(&output.stdout).trim().to_string();
        let message = if stderr.is_empty() { stdout } else { stderr };

        Err(if message.is_empty() {
            "No se pudo terminar el proceso".to_string()
        } else {
            message
        })
    }
}

fn is_protected_pid(pid: u32) -> bool {
    matches!(pid, 0 | 4)
}

fn is_protected_process_name(process_name: &str) -> bool {
    let normalized_name = process_name.to_lowercase();
    matches!(
        normalized_name.as_str(),
        "system"
            | "system idle process"
            | "registry"
            | "smss.exe"
            | "csrss.exe"
            | "wininit.exe"
            | "winlogon.exe"
            | "services.exe"
            | "lsass.exe"
            | "svchost.exe"
            | "fontdrvhost.exe"
            | "dwm.exe"
    )
}

fn get_process_infos() -> HashMap<String, ProcessInfo> {
    let mut process_infos = get_process_infos_from_tasklist();
    let powershell_infos = get_process_infos_from_powershell();

    for (pid, powershell_info) in powershell_infos {
        process_infos
            .entry(pid)
            .and_modify(|process_info| {
                if !powershell_info.name.is_empty() {
                    process_info.name = powershell_info.name.clone();
                }

                if !powershell_info.command.is_empty() {
                    process_info.command = powershell_info.command.clone();
                }
            })
            .or_insert(powershell_info);
    }

    process_infos
}

fn get_process_infos_from_powershell() -> HashMap<String, ProcessInfo> {
    let Ok(output) = Command::new("powershell")
        .args([
            "-NoProfile",
            "-Command",
            "Get-CimInstance Win32_Process | Select-Object ProcessId,Name,CommandLine | ConvertTo-Json -Compress",
        ])
        .output()
    else {
        return HashMap::new();
    };

    if !output.status.success() {
        return HashMap::new();
    }

    let output_text = String::from_utf8_lossy(&output.stdout);
    let Ok(json) = serde_json::from_str::<serde_json::Value>(&output_text) else {
        return HashMap::new();
    };

    match json {
        serde_json::Value::Array(items) => items
            .into_iter()
            .filter_map(parse_cim_process_value)
            .collect(),
        item => parse_cim_process_value(item).into_iter().collect(),
    }
}

fn parse_cim_process_value(value: serde_json::Value) -> Option<(String, ProcessInfo)> {
    let process = serde_json::from_value::<CimProcess>(value).ok()?;
    let name = process.name.unwrap_or_default();

    if name.is_empty() {
        return None;
    }

    Some((
        process.process_id.to_string(),
        ProcessInfo {
            name,
            command: process.command_line.unwrap_or_default(),
        },
    ))
}

fn get_process_infos_from_tasklist() -> HashMap<String, ProcessInfo> {
    let Ok(output) = Command::new("tasklist")
        .args(["/fo", "csv", "/nh"])
        .output()
    else {
        return HashMap::new();
    };

    if !output.status.success() {
        return HashMap::new();
    }

    String::from_utf8_lossy(&output.stdout)
        .lines()
        .filter_map(parse_tasklist_line)
        .collect()
}

fn parse_tasklist_line(line: &str) -> Option<(String, ProcessInfo)> {
    let columns = parse_csv_line(line);
    let process_name = columns.first()?.trim().to_string();
    let pid = columns.get(1)?.trim().to_string();

    if pid.is_empty() || process_name.is_empty() {
        None
    } else {
        Some((
            pid,
            ProcessInfo {
                name: process_name,
                command: String::new(),
            },
        ))
    }
}

fn parse_csv_line(line: &str) -> Vec<String> {
    let mut columns = Vec::new();
    let mut current = String::new();
    let mut in_quotes = false;
    let mut chars = line.chars().peekable();

    while let Some(character) = chars.next() {
        match character {
            '"' if in_quotes && chars.peek() == Some(&'"') => {
                current.push('"');
                chars.next();
            }
            '"' => in_quotes = !in_quotes,
            ',' if !in_quotes => {
                columns.push(current.trim().to_string());
                current.clear();
            }
            _ => current.push(character),
        }
    }

    columns.push(current.trim().to_string());
    columns
}

fn parse_netstat_line(
    line: &str,
    process_infos: &HashMap<String, ProcessInfo>,
) -> Option<PortEntry> {
    let columns = line.split_whitespace().collect::<Vec<_>>();
    let protocol = columns.first()?.to_uppercase();

    match protocol.as_str() {
        "TCP" if columns.len() >= 5 => {
            let pid = columns[4].to_string();
            let process_info = process_infos.get(&pid).cloned().unwrap_or_default();
            Some(PortEntry {
                protocol,
                local_address: columns[1].to_string(),
                port: extract_port(columns[1]),
                remote_address: columns[2].to_string(),
                state: columns[3].to_string(),
                process_name: process_name_or_unknown(&process_info),
                process_command: process_info.command,
                pid,
            })
        }
        "UDP" if columns.len() >= 4 => {
            let pid = columns[3].to_string();
            let process_info = process_infos.get(&pid).cloned().unwrap_or_default();
            Some(PortEntry {
                protocol,
                local_address: columns[1].to_string(),
                port: extract_port(columns[1]),
                remote_address: columns[2].to_string(),
                state: "ABIERTO".to_string(),
                process_name: process_name_or_unknown(&process_info),
                process_command: process_info.command,
                pid,
            })
        }
        _ => None,
    }
}

fn process_name_or_unknown(process_info: &ProcessInfo) -> String {
    if !process_info.name.is_empty() {
        process_info.name.clone()
    } else if let Some(command_name) = extract_process_name_from_command(&process_info.command) {
        command_name
    } else {
        "Desconocido".to_string()
    }
}

fn extract_process_name_from_command(command: &str) -> Option<String> {
    let trimmed_command = command.trim();

    if trimmed_command.is_empty() {
        return None;
    }

    let executable = if let Some(rest) = trimmed_command.strip_prefix('"') {
        rest.split_once('"').map(|(path, _)| path).unwrap_or(rest)
    } else {
        trimmed_command
            .split_whitespace()
            .next()
            .unwrap_or(trimmed_command)
    };

    executable
        .rsplit(['\\', '/'])
        .next()
        .filter(|name| !name.is_empty())
        .map(ToString::to_string)
}

fn extract_port(address: &str) -> String {
    address
        .rsplit_once(':')
        .map(|(_, port)| port.trim_matches(']').to_string())
        .unwrap_or_else(|| "-".to_string())
}

fn parse_port_number(port: &str) -> u16 {
    port.parse::<u16>().unwrap_or(u16::MAX)
}
