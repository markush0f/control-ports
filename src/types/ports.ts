export type PortEntry = {
  protocol: "TCP" | "UDP" | string;
  local_address: string;
  port: string;
  remote_address: string;
  state: string;
  pid: string;
  process_name: string;
  process_command: string;
};
