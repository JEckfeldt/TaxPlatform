"use client";

import { useEffect, useState } from "react";
import { SourcePreview } from "@/components/firm/source-preview";
import { Button } from "@/components/ui/button";
import {
  fieldStateBadgeClasses,
  fieldStateLabel,
} from "@/lib/field-affordances";
import { simulateAI } from "@/lib/simulate-ai";
import type { ReturnField } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ReviewSidePanel({
  field,
  onAccept,
  onReject,
  onSaveEdit,
}: {
  field: ReturnField | null;
  onAccept: () => void;
  onReject: () => void;
  onSaveEdit: (value: string) => void;
}) {
  const [draft, setDraft] = useState("");

  useEffect(() => {
    setDraft(field?.value ?? "");
  }, [field?.id, field?.value]);

  if (!field) {
    return (
      <aside className="border-border bg-muted/20 flex min-h-64 items-center justify-center rounded-xl border border-dashed p-6 text-center">
        <p className="text-muted-foreground text-sm">
          Select a field to review source trace and AI details.
        </p>
      </aside>
    );
  }

  const ai = simulateAI(field);
  const locked = field.state === "locked";
  const lowConfidence = (ai?.confidence ?? 1) < 0.7;

  return (
    <aside className="border-border bg-card sticky top-16 space-y-5 rounded-xl border p-4 sm:p-5">
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-heading text-base font-semibold tracking-tight">
            {field.label}
          </h2>
          <span
            className={cn(
              "rounded-md px-2 py-0.5 text-xs font-medium",
              fieldStateBadgeClasses(field.state),
            )}
          >
            {fieldStateLabel(field.state)}
          </span>
        </div>
        <p className="font-mono text-lg">{field.value}</p>
      </div>

      <section className="space-y-2">
        <h3 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          Source trace
        </h3>
        {field.source ? (
          <SourcePreview source={field.source} />
        ) : (
          <p className="text-muted-foreground text-sm">
            No source document linked.
          </p>
        )}
      </section>

      <section className="space-y-2">
        <h3 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          AI explanation
        </h3>
        {ai ? (
          <div
            className={cn(
              "space-y-2 rounded-lg border px-3 py-3 text-sm",
              lowConfidence
                ? "border-amber-700/40 bg-amber-700/5"
                : "border-border/80 bg-muted/30",
            )}
          >
            <p>
              <span className="text-muted-foreground">Confidence: </span>
              <span className="font-medium">
                {Math.round(ai.confidence * 100)}%
              </span>
            </p>
            <p>{ai.summary}</p>
            <p className="text-muted-foreground">{ai.rationale}</p>
            {ai.evidence.length > 0 ? (
              <ul className="list-inside list-disc text-muted-foreground">
                {ai.evidence.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {ai.recommendation ? (
              <p>
                <span className="font-medium">Suggested: </span>
                {ai.recommendation}
              </p>
            ) : null}
            {ai.warning ? (
              <p className="text-amber-950 font-medium">{ai.warning}</p>
            ) : null}
          </div>
        ) : null}
      </section>

      <section className="space-y-3">
        <h3 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          Actions
        </h3>
        {locked ? (
          <p className="text-muted-foreground text-sm">
            Locked — {field.lockedReason ?? "cannot be changed here."}
          </p>
        ) : (
          <>
            <label className="block space-y-1.5 text-sm">
              <span className="font-medium">Edit value</span>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-lg border px-3 py-2 font-mono text-sm outline-none focus-visible:ring-3"
              />
            </label>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Button
                size="sm"
                onClick={onAccept}
                disabled={
                  field.state === "verified" && draft.trim() === field.value
                }
              >
                Accept
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onSaveEdit(draft)}
                disabled={!draft.trim() || draft.trim() === field.value}
              >
                Save edit
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={onReject}
                disabled={field.state === "needs_approval"}
              >
                Reject AI
              </Button>
            </div>
          </>
        )}
      </section>
    </aside>
  );
}
