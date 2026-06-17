type AppHeaderProps = {
  totalCount: number;
  tcpCount: number;
  udpCount: number;
  listeningCount: number;
  isLoading: boolean;
  onRefresh: () => void;
};

export function AppHeader({
  totalCount,
  tcpCount,
  udpCount,
  listeningCount,
  isLoading,
  onRefresh,
}: AppHeaderProps) {
  return (
    <header className="border-b border-neutral-800 px-5 py-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Control Ports</h1>
          <p className="text-sm text-neutral-400">Puertos activos del sistema</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex gap-4 text-sm text-neutral-400">
            <span>
              Total: <strong className="text-neutral-100">{totalCount}</strong>
            </span>
            <span>
              TCP: <strong className="text-neutral-100">{tcpCount}</strong>
            </span>
            <span>
              UDP: <strong className="text-neutral-100">{udpCount}</strong>
            </span>
            <span>
              Abiertos: <strong className="text-neutral-100">{listeningCount}</strong>
            </span>
          </div>

          <button
            className="rounded-md border border-neutral-700 px-3 py-2 text-sm font-medium text-neutral-100 transition hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isLoading}
            onClick={onRefresh}
            type="button"
          >
            {isLoading ? "Actualizando" : "Actualizar"}
          </button>
        </div>
      </div>
    </header>
  );
}
