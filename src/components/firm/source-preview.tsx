import type { FieldSource } from "@/lib/types";

export function SourcePreview({ source }: { source: FieldSource }) {
  const { highlight } = source;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-medium">{source.documentName}</p>
        <p className="text-muted-foreground text-xs">
          Page {source.page} · {source.regionLabel}
        </p>
      </div>
      <div className="border-border relative aspect-[8.5/11] max-h-72 w-full overflow-hidden rounded-lg border bg-[oklch(0.97_0.01_145)]">
        <div className="text-muted-foreground absolute top-3 left-3 text-[0.65rem] font-medium tracking-wide uppercase">
          Fake W-2 preview
        </div>
        <div className="absolute top-[12%] right-[8%] left-[8%] h-px bg-foreground/10" />
        <div className="absolute top-[18%] right-[8%] left-[8%] h-px bg-foreground/10" />
        <div className="absolute top-[40%] right-[8%] left-[8%] h-px bg-foreground/10" />
        <div className="absolute top-[72%] right-[8%] left-[8%] h-px bg-foreground/10" />
        <div
          className="border-primary/70 bg-primary/15 absolute rounded-sm border-2"
          style={{
            top: `${highlight.top}%`,
            left: `${highlight.left}%`,
            width: `${highlight.width}%`,
            height: `${highlight.height}%`,
          }}
          aria-label={`Highlighted region: ${source.regionLabel}`}
        />
      </div>
      <p className="text-muted-foreground text-xs leading-relaxed">
        Transform: {source.transformNote}
      </p>
    </div>
  );
}
