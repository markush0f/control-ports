import { findProcessType } from "../data/processTypes";
import type { PortEntry } from "../types/ports";

export function protocolClass(protocol: string) {
  return protocol === "TCP"
    ? "bg-neutral-100 text-neutral-950"
    : "bg-neutral-700 text-neutral-100";
}

export function stateClass(state: string) {
  if (state === "LISTENING" || state === "ABIERTO") {
    return "text-emerald-400";
  }

  if (state === "ESTABLISHED") {
    return "text-zinc-200";
  }

  if (state.includes("WAIT") || state.includes("CLOSE")) {
    return "text-amber-400";
  }

  return "text-neutral-400";
}

export function getPortProcessType(port: PortEntry) {
  return findProcessType(`${port.process_name} ${port.process_command}`);
}
