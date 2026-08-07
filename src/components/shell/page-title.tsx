import { cn } from "@/lib/utils";

export function PageTitle({
  children,
  className,
  as: Tag = "h1",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Tag
      className={cn(
        "font-heading text-3xl font-semibold tracking-tight sm:text-4xl",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
