import { useEffect, useMemo, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { AppHeader } from "./components/AppHeader";
import { PortFilters } from "./components/PortFilters";
import { PortListState } from "./components/PortListState";
import { fallbackProcessType, processTypes } from "./data/processTypes";
import type { PortEntry } from "./types/ports";
import { getPortProcessType } from "./utils/ports";
import "./App.css";

function App() {
  const [ports, setPorts] = useState<PortEntry[]>([]);
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
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

  const filteredPorts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return ports.filter((port) => {
      const processType = getPortProcessType(port);
      const matchesType = selectedType === "all" || processType.type === selectedType;
      const matchesQuery =
        !normalizedQuery ||
        [
          port.protocol,
          port.local_address,
          port.port,
          port.remote_address,
          port.state,
          port.pid,
          port.process_name,
          port.process_command,
          processType.label,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesType && matchesQuery;
    });
  }, [ports, query, selectedType]);

  const typeCounts = useMemo(() => {
    const counts = new Map<string, number>();

    for (const port of ports) {
      const processType = getPortProcessType(port);
      counts.set(processType.type, (counts.get(processType.type) ?? 0) + 1);
    }

    return counts;
  }, [ports]);

  const visibleProcessTypes = useMemo(
    () =>
      [...processTypes, fallbackProcessType]
        .filter((processType) => typeCounts.has(processType.type))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [typeCounts],
  );

  const tcpCount = ports.filter((port) => port.protocol === "TCP").length;
  const udpCount = ports.filter((port) => port.protocol === "UDP").length;
  const listeningCount = ports.filter(
    (port) => port.state === "LISTENING" || port.state === "ABIERTO",
  ).length;

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <section className="flex w-full flex-col">
        <AppHeader
          isLoading={isLoading}
          listeningCount={listeningCount}
          onRefresh={loadPorts}
          tcpCount={tcpCount}
          totalCount={ports.length}
          udpCount={udpCount}
        />

        <section>
          <PortFilters
            filteredCount={filteredPorts.length}
            onQueryChange={setQuery}
            onTypeChange={setSelectedType}
            portsCount={ports.length}
            query={query}
            selectedType={selectedType}
            totalCount={ports.length}
            typeCounts={typeCounts}
            visibleProcessTypes={visibleProcessTypes}
          />

          {actionError && (
            <div className="m-5 rounded-md border border-red-900 bg-red-950 p-3 text-sm text-red-300">
              {actionError}
            </div>
          )}

          <PortListState
            error={error}
            isLoading={isLoading}
            onTerminateProcess={terminateProcess}
            ports={filteredPorts}
            terminatingPid={terminatingPid}
          />
        </section>
      </section>
    </main>
  );
}

export default App;
