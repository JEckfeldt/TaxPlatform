import {
  FIELD_STATES,
  fieldStateBadgeClasses,
  fieldStateLabel,
} from "@/lib/field-affordances";
import { cn } from "@/lib/utils";

export function FieldStateLegend() {
  return (
    <div className="border-border/80 bg-card/60 space-y-2 rounded-xl border px-3 py-3">
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        Field states
      </p>
      <div className="flex flex-wrap gap-2">
        {FIELD_STATES.map((state) => (
          <span
            key={state}
            className={cn(
              "inline-flex rounded-md px-2 py-0.5 text-xs font-medium",
              fieldStateBadgeClasses(state),
            )}
          >
            {fieldStateLabel(state)}
          </span>
        ))}
      </div>
    </div>
  );
}
