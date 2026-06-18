import { AppHeader } from "./components/AppHeader";
import { PortsPanel } from "./components/PortsPanel";
import { usePortFilters } from "./hooks/usePortFilters";
import { usePorts } from "./hooks/usePorts";
import "./App.css";

function App() {
  const {
    actionError,
    error,
    isLoading,
    loadPorts,
    ports,
    terminateProcess,
    terminatingPid,
  } = usePorts();
  const {
    filteredPorts,
    query,
    selectedType,
    setQuery,
    setSelectedType,
    typeCounts,
    visibleProcessTypes,
  } = usePortFilters(ports);

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

        <PortsPanel
          actionError={actionError}
          error={error}
          filteredPorts={filteredPorts}
          isLoading={isLoading}
          onQueryChange={setQuery}
          onTerminateProcess={terminateProcess}
          onTypeChange={setSelectedType}
          ports={ports}
          query={query}
          selectedType={selectedType}
          terminatingPid={terminatingPid}
          typeCounts={typeCounts}
          visibleProcessTypes={visibleProcessTypes}
        />
      </section>
    </main>
  );
}

export default App;
