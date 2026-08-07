"use client";

import { useMemo, useState } from "react";
import { FieldStateLegend } from "@/components/firm/field-state-legend";
import { ReturnFieldRow } from "@/components/firm/return-field-row";
import { ReviewSidePanel } from "@/components/firm/review-side-panel";
import { getAlexReturnFields } from "@/lib/fixtures/return-fields";
import type { ReturnField } from "@/lib/types";

export function ReviewWorkspace() {
  const [fields, setFields] = useState<ReturnField[]>(() =>
    getAlexReturnFields(),
  );
  const [selectedId, setSelectedId] = useState<string | null>("field-wages");

  const selected = useMemo(
    () => fields.find((f) => f.id === selectedId) ?? null,
    [fields, selectedId],
  );

  function updateField(id: string, patch: Partial<ReturnField>) {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    );
  }

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          Return review
        </h2>
        <p className="text-muted-foreground text-sm">
          Review extracted values, trace them to the W-2, and correct AI output
          without leaving this workspace.
        </p>
      </div>

      <FieldStateLegend />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
        <div className="border-border divide-border divide-y rounded-xl border">
          {fields.map((field) => (
            <ReturnFieldRow
              key={field.id}
              field={field}
              selected={field.id === selectedId}
              onSelect={() => setSelectedId(field.id)}
            />
          ))}
        </div>

        <ReviewSidePanel
          field={selected}
          onAccept={() => {
            if (!selected || selected.state === "locked") return;
            updateField(selected.id, { state: "verified" });
          }}
          onReject={() => {
            if (!selected || selected.state === "locked") return;
            updateField(selected.id, { state: "needs_approval" });
          }}
          onSaveEdit={(value) => {
            if (!selected || selected.state === "locked") return;
            updateField(selected.id, {
              value: value.trim(),
              state: "verified",
            });
          }}
        />
      </div>
    </div>
  );
}
