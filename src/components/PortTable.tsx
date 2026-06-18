import type { ReactNode } from "react";
import type { PortEntry } from "../types/ports";
import { getPortProcessType, protocolClass, stateClass } from "../utils/ports";
import { ProcessIcon } from "./ProcessIcon";
import { ProcessTypeBadge } from "./ProcessTypeBadge";

type PortTableProps = {
  ports: PortEntry[];
  terminatingPid: string;
  onTerminateProcess: (port: PortEntry) => void;
};

export function PortTable({
  ports,
  terminatingPid,
  onTerminateProcess,
}: PortTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1240px] text-left text-sm">
        <thead className="border-b border-neutral-800 bg-neutral-900 text-xs uppercase tracking-wide text-neutral-500">
          <tr>
            <th className="px-4 py-3">Protocolo</th>
            <th className="px-4 py-3">Puerto</th>
            <th className="px-4 py-3">Direccion local</th>
            <th className="px-4 py-3">Direccion remota</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Tipo</th>
            <th className="px-4 py-3">Proceso</th>
            <th className="px-4 py-3">PID</th>
            <th className="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {ports.map((port, index) => {
            const processType = getPortProcessType(port);

            return (
              <tr
                className="transition hover:bg-neutral-900/70"
                key={`${port.protocol}-${port.local_address}-${port.remote_address}-${port.pid}-${index}`}
              >
                <td className="px-4 py-3">
                  <HoverDialog label="Protocolo" value={port.protocol}>
                    <span
                      className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${protocolClass(
                        port.protocol,
                      )}`}
                    >
                      {port.protocol}
                    </span>
                  </HoverDialog>
                </td>
                <td className="px-4 py-3 font-semibold text-neutral-100">
                  <HoverDialog label="Puerto" value={port.port}>
                    {port.port}
                  </HoverDialog>
                </td>
                <td className="px-4 py-3 font-mono text-neutral-300">
                  <HoverDialog label="Direccion local" value={port.local_address}>
                    {port.local_address}
                  </HoverDialog>
                </td>
                <td className="px-4 py-3 font-mono text-neutral-500">
                  <HoverDialog label="Direccion remota" value={port.remote_address}>
                    {port.remote_address}
                  </HoverDialog>
                </td>
                <td className="px-4 py-3">
                  <HoverDialog label="Estado" value={port.state}>
                    <span className={`font-medium ${stateClass(port.state)}`}>
                      {port.state}
                    </span>
                  </HoverDialog>
                </td>
                <td className="px-4 py-3 text-neutral-300">
                  <HoverDialog label="Tipo" value={processType.label}>
                    <ProcessTypeBadge processType={processType} />
                  </HoverDialog>
                </td>
                <td className="px-4 py-3 text-neutral-200">
                  <HoverDialog
                    label="Proceso"
                    value={`${port.process_name || "Desconocido"}\n${port.process_command || `PID ${port.pid}`}`}
                  >
                    <span className="flex items-start gap-2">
                      <span className={processType.colorClass}>
                        <ProcessIcon name={processType.icon} />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-medium text-neutral-100">
                          {port.process_name || "Desconocido"}
                        </span>
                        <span className="block max-w-[360px] truncate font-mono text-xs text-neutral-500">
                          {port.process_command || `PID ${port.pid}`}
                        </span>
                      </span>
                    </span>
                  </HoverDialog>
                </td>
                <td className="px-4 py-3 font-mono text-neutral-500">
                  <HoverDialog label="PID" value={port.pid}>
                    {port.pid}
                  </HoverDialog>
                </td>
                <td className="px-4 py-3 text-right">
                  <HoverDialog
                    align="right"
                    label="Acciones"
                    value={
                      port.pid === "0" || port.pid === "4"
                        ? "Proceso protegido del sistema"
                        : `Terminar proceso ${port.process_name || port.pid}`
                    }
                  >
                    <button
                      className="rounded-md border border-red-900/80 px-2 py-1 text-xs font-medium text-red-300 transition hover:bg-red-950 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={terminatingPid === port.pid || port.pid === "0" || port.pid === "4"}
                      onClick={() => onTerminateProcess(port)}
                      type="button"
                    >
                      {terminatingPid === port.pid ? "Terminando" : "Terminar"}
                    </button>
                  </HoverDialog>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

type HoverDialogProps = {
  children: ReactNode;
  label: string;
  value: string;
  align?: "left" | "right";
};

function HoverDialog({
  children,
  label,
  value,
  align = "left",
}: HoverDialogProps) {
  return (
    <span className="group relative inline-flex max-w-full">
      {children}
      <span
        className={`pointer-events-none absolute top-full z-20 mt-2 hidden w-max max-w-sm rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-left text-xs font-normal text-neutral-200 shadow-xl shadow-black/40 ring-1 ring-black/20 group-hover:block ${
          align === "right" ? "right-0" : "left-0"
        }`}
        role="tooltip"
      >
        <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
          {label}
        </span>
        <span className="block whitespace-pre-wrap break-words">{value}</span>
      </span>
    </span>
  );
}
