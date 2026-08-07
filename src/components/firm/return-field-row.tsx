import {
  fieldStateBadgeClasses,
  fieldStateClasses,
  fieldStateLabel,
} from "@/lib/field-affordances";
import type { ReturnField } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ReturnFieldRow({
  field,
  selected,
  onSelect,
}: {
  field: ReturnField;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full px-3 py-3.5 text-left transition-colors first:rounded-t-xl last:rounded-b-xl",
        fieldStateClasses(field.state),
        selected
          ? "bg-primary/8 ring-primary/25 relative z-[1] ring-1 ring-inset"
          : "hover:bg-muted/40",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-medium">{field.label}</p>
          <p className="font-mono text-base tracking-tight">{field.value}</p>
          {field.state === "locked" && field.lockedReason ? (
            <p className="text-muted-foreground text-xs">{field.lockedReason}</p>
          ) : null}
          {field.ai?.warning ? (
            <p className="text-amber-900 text-xs">{field.ai.warning}</p>
          ) : null}
        </div>
        <span
          className={cn(
            "shrink-0 rounded-md px-2 py-0.5 text-xs font-medium",
            fieldStateBadgeClasses(field.state),
          )}
        >
          {fieldStateLabel(field.state)}
        </span>
      </div>
    </button>
  );
}
