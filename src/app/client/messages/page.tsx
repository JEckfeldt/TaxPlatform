"use client";

import Link from "next/link";
import { AppBreadcrumbs } from "@/components/shell/app-breadcrumbs";
import { useClientDemo } from "@/components/client/client-demo-provider";
import { usePersona } from "@/components/persona/persona-provider";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { clientThreadsForReturn } from "@/lib/navigation";
import { returnForPersona } from "@/lib/fixtures/seed";
import { getPersona } from "@/lib/personas";
import { cn } from "@/lib/utils";

export default function ClientMessagesPage() {
  const { persona } = usePersona();
  const { threads } = useClientDemo();
  const taxReturn = returnForPersona(persona?.id ?? "alex");
  const clientThreads = clientThreadsForReturn(threads, taxReturn?.id);

  return (
    <div className="space-y-6">
      <AppBreadcrumbs
        items={[
          { label: "Home", href: "/client/home" },
          { label: "Messages" },
        ]}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Messages</h1>
          <p className="text-muted-foreground max-w-2xl">
            Conversations stay attached to your documents and tasks — not a
            generic inbox.
          </p>
        </div>
        <Link
          href="/client/home"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          Back to home
        </Link>
      </div>

      {clientThreads.length === 0 ? (
        <p className="text-muted-foreground text-sm">No messages yet.</p>
      ) : (
        <div className="grid gap-3">
          {clientThreads.map((thread) => {
            const last = thread.messages[thread.messages.length - 1];
            const author = last ? getPersona(last.authorId) : undefined;
            return (
              <Link key={thread.id} href={`/client/messages/${thread.id}`}>
                <Card className="transition-shadow hover:shadow-md">
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-base">{thread.subject}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {author ? `${author.name.split(" ")[0]}: ` : null}
                      {last?.body}
                    </CardDescription>
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
