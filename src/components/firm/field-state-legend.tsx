import {
  FIELD_STATES,
  fieldStateBadgeClasses,
  fieldStateLabel,
} from "@/lib/field-affordances";
import { cn } from "@/lib/utils";

export function FieldStateLegend() {
  return (
    <div className="space-y-2">
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
