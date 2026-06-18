import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import type { PortEntry } from "../types/ports";

export function usePorts() {
  const [ports, setPorts] = useState<PortEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [terminatingPid, setTerminatingPid] = useState("");

  async function loadPorts() {
    setIsLoading(true);
    setError("");

    try {
      const result = await invoke<PortEntry[]>("list_ports");
      setPorts(result);
    } catch (currentError) {
      setError(
        currentError instanceof Error
          ? currentError.message
          : String(currentError),
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadPorts();
  }, []);

  async function terminateProcess(port: PortEntry) {
    const confirmed = window.confirm(
      `Vas a terminar el proceso ${port.process_name} con PID ${port.pid}.\n\nEsto puede cerrar aplicaciones o interrumpir servicios. ¿Continuar?`,
    );

    if (!confirmed) {
      return;
    }

    setActionError("");
    setTerminatingPid(port.pid);

    try {
      await invoke("kill_process", { pid: port.pid });
      await loadPorts();
    } catch (currentError) {
      setActionError(
        currentError instanceof Error
          ? currentError.message
          : String(currentError),
      );
    } finally {
      setTerminatingPid("");
    }
  }

  return {
    actionError,
    error,
    isLoading,
    loadPorts,
    ports,
    terminateProcess,
    terminatingPid,
  };
}
