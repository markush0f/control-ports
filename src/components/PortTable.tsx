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
                  <span
                    className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${protocolClass(
                      port.protocol,
                    )}`}
                  >
                    {port.protocol}
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold text-neutral-100">{port.port}</td>
                <td className="px-4 py-3 font-mono text-neutral-300">
                  {port.local_address}
                </td>
                <td className="px-4 py-3 font-mono text-neutral-500">
                  {port.remote_address}
                </td>
                <td className="px-4 py-3">
                  <span className={`font-medium ${stateClass(port.state)}`}>
                    {port.state}
                  </span>
                </td>
                <td className="px-4 py-3 text-neutral-300">
                  <ProcessTypeBadge processType={processType} />
                </td>
                <td className="px-4 py-3 text-neutral-200">
                  <span className="inline-flex items-center gap-2">
                    <span className={processType.colorClass}>
                      <ProcessIcon name={processType.icon} />
                    </span>
                    {port.process_name}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-neutral-500">{port.pid}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    className="rounded-md border border-red-900/80 px-2 py-1 text-xs font-medium text-red-300 transition hover:bg-red-950 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={terminatingPid === port.pid || port.pid === "0" || port.pid === "4"}
                    onClick={() => onTerminateProcess(port)}
                    type="button"
                  >
                    {terminatingPid === port.pid ? "Terminando" : "Terminar"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
