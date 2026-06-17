import type { ProcessType } from "../data/processTypes";

type PortFiltersProps = {
  filteredCount: number;
  totalCount: number;
  portsCount: number;
  query: string;
  selectedType: string;
  typeCounts: Map<string, number>;
  visibleProcessTypes: ProcessType[];
  onQueryChange: (query: string) => void;
  onTypeChange: (type: string) => void;
};

export function PortFilters({
  filteredCount,
  totalCount,
  portsCount,
  query,
  selectedType,
  typeCounts,
  visibleProcessTypes,
  onQueryChange,
  onTypeChange,
}: PortFiltersProps) {
  return (
    <>
      <div className="flex flex-col gap-3 border-b border-neutral-800 px-5 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-sm font-medium">Lista</h2>
          <p className="text-sm text-neutral-400">
            Mostrando {filteredCount} de {totalCount} entradas.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:flex-row lg:max-w-2xl">
          <select
            className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none transition focus:border-neutral-500 sm:w-56"
            onChange={(event) => onTypeChange(event.currentTarget.value)}
            value={selectedType}
          >
            <option value="all">Todos los tipos</option>
            {visibleProcessTypes.map((processType) => (
              <option key={processType.type} value={processType.type}>
                {processType.label} ({typeCounts.get(processType.type)})
              </option>
            ))}
          </select>

          <input
            className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none transition placeholder:text-neutral-500 focus:border-neutral-500"
            onChange={(event) => onQueryChange(event.currentTarget.value)}
            placeholder="Buscar puerto, proceso, PID..."
            value={query}
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b border-neutral-800 px-5 py-3">
        <button
          className={`shrink-0 rounded-md px-2 py-1 text-xs ring-1 ${
            selectedType === "all"
              ? "bg-neutral-100 text-neutral-950 ring-neutral-100"
              : "bg-neutral-900 text-neutral-400 ring-neutral-800 hover:text-neutral-100"
          }`}
          onClick={() => onTypeChange("all")}
          type="button"
        >
          Todos ({portsCount})
        </button>
        {[...visibleProcessTypes]
          .sort((a, b) => (typeCounts.get(b.type) ?? 0) - (typeCounts.get(a.type) ?? 0))
          .map((processType) => (
            <button
              className={`shrink-0 rounded-md px-2 py-1 text-xs ring-1 transition ${
                selectedType === processType.type
                  ? processType.colorClass
                  : "bg-neutral-900 text-neutral-400 ring-neutral-800 hover:text-neutral-100"
              }`}
              key={processType.type}
              onClick={() => onTypeChange(processType.type)}
              type="button"
            >
              {processType.label} ({typeCounts.get(processType.type)})
            </button>
          ))}
      </div>
    </>
  );
}
