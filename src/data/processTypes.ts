export type ProcessIconName =
  | "app"
  | "browser"
  | "code"
  | "database"
  | "docker"
  | "game"
  | "java"
  | "media"
  | "network"
  | "node"
  | "python"
  | "security"
  | "server"
  | "system"
  | "terminal";

export type ProcessType = {
  type: string;
  label: string;
  icon: ProcessIconName;
  colorClass: string;
  match: string[];
};

export const processTypes: ProcessType[] = [
  {
    type: "java",
    label: "Java / Tomcat",
    icon: "java",
    colorClass: "bg-orange-500/15 text-orange-300 ring-orange-500/25",
    match: ["java.exe", "javaw.exe", "tomcat", "catalina", "spring", "jboss", "wildfly", "jetty", "gradle", "maven", "mvn"],
  },
  {
    type: "node",
    label: "Node.js",
    icon: "node",
    colorClass: "bg-lime-500/15 text-lime-300 ring-lime-500/25",
    match: ["node.exe", "npm.exe", "npx", "pnpm.exe", "yarn.exe", "bun.exe", "vite", "next", "nuxt", "astro", "webpack", "nestjs"],
  },
  {
    type: "python",
    label: "Python",
    icon: "python",
    colorClass: "bg-yellow-500/15 text-yellow-300 ring-yellow-500/25",
    match: ["python.exe", "pythonw.exe", "py.exe", "uvicorn", "gunicorn", "django", "flask", "fastapi", "celery", "jupyter"],
  },
  {
    type: "dotnet",
    label: ".NET / ASP.NET",
    icon: "code",
    colorClass: "bg-purple-500/15 text-purple-300 ring-purple-500/25",
    match: ["dotnet", "iisexpress", "w3wp", "devenv", "kestrel", "aspnet", "msbuild"],
  },
  {
    type: "php",
    label: "PHP",
    icon: "server",
    colorClass: "bg-indigo-500/15 text-indigo-300 ring-indigo-500/25",
    match: ["php.exe", "php-fpm", "composer", "artisan", "laravel", "symfony"],
  },
  {
    type: "go",
    label: "Go",
    icon: "code",
    colorClass: "bg-cyan-500/15 text-cyan-300 ring-cyan-500/25",
    match: ["go.exe", "air.exe", "dlv.exe", "gin", "fiber"],
  },
  {
    type: "rust",
    label: "Rust",
    icon: "terminal",
    colorClass: "bg-amber-600/15 text-amber-300 ring-amber-600/25",
    match: ["cargo.exe", "rustc.exe", "rust-analyzer", "tauri", "actix", "rocket"],
  },
  {
    type: "database-sql",
    label: "SQL",
    icon: "database",
    colorClass: "bg-sky-500/15 text-sky-300 ring-sky-500/25",
    match: ["postgres", "postgresql", "pg_ctl", "mysql", "mariadb", "sqlservr", "oracle", "sqlite", "cockroach"],
  },
  {
    type: "database-nosql",
    label: "NoSQL / Cache",
    icon: "database",
    colorClass: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/25",
    match: ["mongod", "mongo", "redis", "memcached", "cassandra", "couchdb", "elasticsearch", "opensearch", "neo4j"],
  },
  {
    type: "message-broker",
    label: "Broker / Queue",
    icon: "network",
    colorClass: "bg-teal-500/15 text-teal-300 ring-teal-500/25",
    match: ["rabbitmq", "kafka", "zookeeper", "nats", "mosquitto", "activemq", "pulsar"],
  },
  {
    type: "web-server",
    label: "Servidor web",
    icon: "server",
    colorClass: "bg-red-500/15 text-red-300 ring-red-500/25",
    match: ["nginx", "apache", "httpd", "caddy", "traefik", "haproxy", "lighttpd", "envoy"],
  },
  {
    type: "docker",
    label: "Docker",
    icon: "docker",
    colorClass: "bg-blue-500/15 text-blue-300 ring-blue-500/25",
    match: ["docker", "com.docker", "dockerd", "containerd", "podman", "rancher", "wslhost"],
  },
  {
    type: "kubernetes",
    label: "Kubernetes",
    icon: "network",
    colorClass: "bg-blue-600/15 text-blue-300 ring-blue-600/25",
    match: ["kubectl", "minikube", "kind", "k3s", "kubelet", "helm", "lens"],
  },
  {
    type: "browser",
    label: "Navegador",
    icon: "browser",
    colorClass: "bg-fuchsia-500/15 text-fuchsia-300 ring-fuchsia-500/25",
    match: ["chrome", "msedge", "firefox", "brave", "opera", "vivaldi", "arc", "iexplore"],
  },
  {
    type: "editor",
    label: "Editor / IDE",
    icon: "code",
    colorClass: "bg-violet-500/15 text-violet-300 ring-violet-500/25",
    match: ["code.exe", "cursor", "webstorm", "phpstorm", "pycharm", "idea", "intellij", "devenv", "rider", "clion", "sublime", "notepad++"],
  },
  {
    type: "terminal",
    label: "Terminal / Shell",
    icon: "terminal",
    colorClass: "bg-neutral-500/15 text-neutral-200 ring-neutral-500/25",
    match: ["cmd.exe", "powershell", "pwsh", "windowsterminal", "conhost", "bash", "zsh", "fish", "git-bash", "mintty"],
  },
  {
    type: "remote-access",
    label: "Acceso remoto",
    icon: "network",
    colorClass: "bg-rose-500/15 text-rose-300 ring-rose-500/25",
    match: ["teamviewer", "anydesk", "rustdesk", "parsecd", "remotedesktop", "rdpclip", "vnc", "ssh", "sshd", "putty", "tailscale", "zerotier"],
  },
  {
    type: "vpn-proxy",
    label: "VPN / Proxy",
    icon: "security",
    colorClass: "bg-cyan-600/15 text-cyan-300 ring-cyan-600/25",
    match: ["openvpn", "wireguard", "nordvpn", "protonvpn", "expressvpn", "cloudflare warp", "warp-svc", "mitmproxy", "fiddler", "charles", "proxyman"],
  },
  {
    type: "security",
    label: "Seguridad",
    icon: "security",
    colorClass: "bg-red-600/15 text-red-300 ring-red-600/25",
    match: ["msmpeng", "windefend", "securityhealth", "avast", "avg", "norton", "kaspersky", "bitdefender", "eset", "crowdstrike", "sentinel", "wireshark", "nmap"],
  },
  {
    type: "communication",
    label: "Comunicacion",
    icon: "network",
    colorClass: "bg-pink-500/15 text-pink-300 ring-pink-500/25",
    match: ["discord", "teams", "slack", "zoom", "telegram", "whatsapp", "skype", "signal", "element", "mattermost"],
  },
  {
    type: "media",
    label: "Multimedia",
    icon: "media",
    colorClass: "bg-green-500/15 text-green-300 ring-green-500/25",
    match: ["spotify", "vlc", "obs", "ffmpeg", "plex", "jellyfin", "emby", "audacity", "itunes", "applemusic"],
  },
  {
    type: "game",
    label: "Juego / Launcher",
    icon: "game",
    colorClass: "bg-rose-600/15 text-rose-300 ring-rose-600/25",
    match: ["steam.exe", "steamwebhelper", "epicgameslauncher", "battle.net", "riotclient", "valorant", "leagueclient", "minecraft", "roblox", "eadesktop", "ubisoft"],
  },
  {
    type: "cloud-sync",
    label: "Cloud / Sync",
    icon: "network",
    colorClass: "bg-slate-500/15 text-slate-300 ring-slate-500/25",
    match: ["onedrive", "dropbox", "googledrive", "drivefs", "icloud", "mega", "syncthing", "resilio"],
  },
  {
    type: "apple",
    label: "Apple",
    icon: "app",
    colorClass: "bg-zinc-400/15 text-zinc-200 ring-zinc-400/25",
    match: ["apple", "itunes", "icloud", "bonjour", "mDNSResponder", "apsdaemon"],
  },
  {
    type: "microsoft",
    label: "Microsoft",
    icon: "app",
    colorClass: "bg-blue-400/15 text-blue-200 ring-blue-400/25",
    match: ["office", "outlook", "onedrive", "teams", "edge", "msedge", "microsoft", "ms-teams", "sharepoint"],
  },
  {
    type: "windows-network",
    label: "Red Windows",
    icon: "network",
    colorClass: "bg-stone-500/15 text-stone-300 ring-stone-500/25",
    match: ["dns", "dhcp", "dnscache", "iphlpsvc", "netprofm", "nlasvc", "lanman", "rpcss"],
  },
  {
    type: "windows-system",
    label: "Sistema Windows",
    icon: "system",
    colorClass: "bg-neutral-600/15 text-neutral-300 ring-neutral-600/25",
    match: ["system", "svchost", "services", "lsass", "spoolsv", "wininit", "winlogon", "csrss", "dwm", "explorer.exe", "runtimebroker"],
  },
  {
    type: "unknown",
    label: "Desconocido",
    icon: "app",
    colorClass: "bg-neutral-800 text-neutral-400 ring-neutral-700",
    match: ["desconocido", "unknown"],
  },
];

export const fallbackProcessType: ProcessType = {
  type: "app",
  label: "Aplicacion",
  icon: "app",
  colorClass: "bg-neutral-700/40 text-neutral-300 ring-neutral-600/40",
  match: [],
};

export function findProcessType(processName: string) {
  const normalizedProcess = processName.toLowerCase();

  return (
    processTypes.find((processType) =>
      processType.match.some((item) => normalizedProcess.includes(item)),
    ) ?? fallbackProcessType
  );
}
