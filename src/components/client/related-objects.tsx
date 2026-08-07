import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RelatedObjects({
  taskHref,
  taskLabel,
  documentHref,
  documentLabel,
  threadHref,
  threadLabel,
}: {
  taskHref?: string;
  taskLabel?: string;
  documentHref?: string;
  documentLabel?: string;
  threadHref?: string;
  threadLabel?: string;
}) {
  const links = [
    taskHref
      ? { href: taskHref, label: taskLabel ?? "Task", kind: "Task" }
      : null,
    documentHref
      ? {
          href: documentHref,
          label: documentLabel ?? "Document",
          kind: "Document",
        }
      : null,
    threadHref
      ? {
          href: threadHref,
          label: threadLabel ?? "Conversation",
          kind: "Conversation",
        }
      : null,
  ].filter(Boolean) as { href: string; label: string; kind: string }[];

  if (links.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        Related
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            <span className="text-muted-foreground mr-1.5">{link.kind}:</span>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
