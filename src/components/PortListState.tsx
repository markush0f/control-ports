import type { PortEntry } from "../types/ports";
import { PortTable } from "./PortTable";

type PortListStateProps = {
  error: string;
  isLoading: boolean;
  ports: PortEntry[];
  terminatingPid: string;
  onTerminateProcess: (port: PortEntry) => void;
};

export function PortListState({
  error,
  isLoading,
  ports,
  terminatingPid,
  onTerminateProcess,
}: PortListStateProps) {
  if (error) {
    return (
      <div className="m-5 rounded-md border border-red-900 bg-red-950 p-3 text-sm text-red-300">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-10 text-center text-sm text-neutral-400">
        Escaneando puertos del sistema...
      </div>
    );
  }

  if (ports.length === 0) {
    return (
      <div className="p-10 text-center text-sm text-neutral-400">
        No se encontraron puertos con ese filtro.
      </div>
    );
  }

  return (
    <PortTable
      onTerminateProcess={onTerminateProcess}
      ports={ports}
      terminatingPid={terminatingPid}
    />
  );
}
