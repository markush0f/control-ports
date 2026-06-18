#[tauri::command]
fn list_ports() -> Result<Vec<control_ports_core::PortEntry>, String> {
    control_ports_core::list_ports()
}

#[tauri::command]
fn kill_process(pid: String) -> Result<(), String> {
    control_ports_core::kill_process(pid)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![list_ports, kill_process])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
