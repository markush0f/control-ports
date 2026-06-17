import type { ProcessType } from "../data/processTypes";
import { ProcessIcon } from "./ProcessIcon";

type ProcessTypeBadgeProps = {
  processType: ProcessType;
};

export function ProcessTypeBadge({ processType }: ProcessTypeBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs font-medium ring-1 ${processType.colorClass}`}
    >
      <ProcessIcon name={processType.icon} />
      {processType.label}
    </span>
  );
}
