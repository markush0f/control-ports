import type { ProcessType } from "../data/processTypes";
import type { PortEntry } from "../types/ports";
import { ActionError } from "./ActionError";
import { PortFilters } from "./PortFilters";
import { PortListState } from "./PortListState";

type PortsPanelProps = {
  actionError: string;
  error: string;
  filteredPorts: PortEntry[];
  isLoading: boolean;
  ports: PortEntry[];
  query: string;
  selectedType: string;
  terminatingPid: string;
  typeCounts: Map<string, number>;
  visibleProcessTypes: ProcessType[];
  onQueryChange: (query: string) => void;
  onTerminateProcess: (port: PortEntry) => void;
  onTypeChange: (type: string) => void;
};

export function PortsPanel({
  actionError,
  error,
  filteredPorts,
  isLoading,
  ports,
  query,
  selectedType,
  terminatingPid,
  typeCounts,
  visibleProcessTypes,
  onQueryChange,
  onTerminateProcess,
  onTypeChange,
}: PortsPanelProps) {
  return (
    <section>
      <PortFilters
        filteredCount={filteredPorts.length}
        onQueryChange={onQueryChange}
        onTypeChange={onTypeChange}
        portsCount={ports.length}
        query={query}
        selectedType={selectedType}
        totalCount={ports.length}
        typeCounts={typeCounts}
        visibleProcessTypes={visibleProcessTypes}
      />

      <ActionError message={actionError} />

      <PortListState
        error={error}
        isLoading={isLoading}
        onTerminateProcess={onTerminateProcess}
        ports={filteredPorts}
        terminatingPid={terminatingPid}
      />
    </section>
  );
}
