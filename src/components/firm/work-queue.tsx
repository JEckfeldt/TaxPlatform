"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ENTITY_FILTERS,
  QUEUE_SEGMENTS,
  computeUrgency,
  filterBySearchAndEntity,
  filterBySegment,
  ownerLabel,
  rankReturns,
  returnsForPreparer,
  segmentCounts,
  type EntityFilter,
  type QueueSegment,
} from "@/lib/firm-queue";
import { ALEX_RETURN_ID } from "@/lib/fixtures/return-fields";
import { fieldStateBadgeClasses } from "@/lib/field-affordances";
import type { TaxReturn } from "@/lib/types";
import { cn } from "@/lib/utils";

function rowChips(item: TaxReturn) {
  const chips: { label: string; className: string }[] = [];
  if (item.id === ALEX_RETURN_ID) {
    chips.push({
      label: "AI review",
      className: fieldStateBadgeClasses("ai_generated"),
    });
  }
  if (item.status === "blocked" || item.blockers.length > 0) {
    chips.push({
      label: "Blocked",
      className: fieldStateBadgeClasses("needs_approval"),
    });
  }
  return chips;
}

export function WorkQueue({ returns }: { returns: TaxReturn[] }) {
  const [segment, setSegment] = useState<QueueSegment>("all");
  const [query, setQuery] = useState("");
  const [entity, setEntity] = useState<EntityFilter>("all");

  const myReturns = useMemo(
    () => returnsForPreparer(returns, "jordan"),
    [returns],
  );

  const scoped = useMemo(
    () => filterBySearchAndEntity(myReturns, query, entity),
    [myReturns, query, entity],
  );

  const counts = useMemo(() => segmentCounts(scoped), [scoped]);

  const ranked = useMemo(() => {
    const filtered = filterBySegment(scoped, segment);
    return rankReturns(filtered);
  }, [scoped, segment]);

  const queryActive = query.trim().length > 0;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search clients"
          aria-label="Search clients"
          className="sm:max-w-xs"
        />
        {queryActive ? (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setQuery("")}
          >
            Clear search
          </Button>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {ENTITY_FILTERS.map((item) => (
          <Button
            key={item.id}
            size="sm"
            variant={entity === item.id ? "default" : "outline"}
            onClick={() => setEntity(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {QUEUE_SEGMENTS.map((item) => (
          <Button
            key={item.id}
            size="sm"
            variant={segment === item.id ? "default" : "outline"}
            onClick={() => setSegment(item.id)}
          >
            {item.label}
            <span className="text-muted-foreground ml-1.5 tabular-nums">
              {counts[item.id]}
            </span>
          </Button>
        ))}
      </div>

      <p className="text-muted-foreground text-sm tabular-nums">
        Showing {ranked.length} of {myReturns.length}
      </p>

      {ranked.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No returns match your search/filters.
        </p>
      ) : (
        <div className="border-border divide-border divide-y rounded-xl border">
          {ranked.map((item) => {
            const chips = rowChips(item);
            return (
              <Link
                key={item.id}
                href={`/firm/returns/${item.id}`}
                className="hover:bg-muted/40 block px-4 py-3.5 transition-colors sm:px-5"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">
                        {item.clientName} · {item.taxYear}
                      </span>
                      <Badge variant="secondary" className="capitalize">
                        {item.entityType}
                      </Badge>
                      {chips.map((chip) => (
                        <span
                          key={chip.label}
                          className={cn(
                            "rounded-md px-2 py-0.5 text-xs font-medium",
                            chip.className,
                          )}
                        >
                          {chip.label}
                        </span>
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {item.nextAction}
                    </p>
                    {item.blockers[0] ? (
                      <p className="text-destructive text-xs">
                        Blocked: {item.blockers[0]}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex shrink-0 flex-row flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                    <Badge>Urgency {computeUrgency(item)}</Badge>
                    <span className="text-muted-foreground text-xs">
                      Next: {ownerLabel(item.nextActionOwner)}
                    </span>
                    <span className="text-muted-foreground text-xs capitalize">
                      {item.status.replaceAll("_", " ")}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
