import { useMemo, useState } from "react";
import { fallbackProcessType, processTypes } from "../data/processTypes";
import type { PortEntry } from "../types/ports";
import { getPortProcessType } from "../utils/ports";

export function usePortFilters(ports: PortEntry[]) {
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

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

  return {
    filteredPorts,
    query,
    selectedType,
    setQuery,
    setSelectedType,
    typeCounts,
    visibleProcessTypes,
  };
}
