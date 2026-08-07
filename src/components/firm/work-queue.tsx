"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  QUEUE_SEGMENTS,
  computeUrgency,
  filterBySegment,
  ownerLabel,
  rankReturns,
  segmentCounts,
  type QueueSegment,
} from "@/lib/firm-queue";
import { ALEX_RETURN_ID } from "@/lib/fixtures/return-fields";
import {
  fieldStateBadgeClasses,
} from "@/lib/field-affordances";
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

  const counts = useMemo(() => segmentCounts(returns, "jordan"), [returns]);
  const ranked = useMemo(() => {
    const filtered = filterBySegment(returns, segment, "jordan");
    return rankReturns(filtered);
  }, [returns, segment]);

  return (
    <div className="space-y-6">
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

      {ranked.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No returns in this segment.
        </p>
      ) : (
        <div className="grid gap-3">
          {ranked.map((item) => {
            const chips = rowChips(item);
            return (
              <Link key={item.id} href={`/firm/returns/${item.id}`}>
                <Card className="transition-shadow hover:shadow-md">
                  <CardHeader className="gap-3 space-y-0 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <CardTitle className="text-lg">
                          {item.clientName} · {item.taxYear}
                        </CardTitle>
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
                      <CardDescription>{item.nextAction}</CardDescription>
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
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
