import { FirmShell } from "@/components/firm/firm-shell";

export default function FirmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FirmShell>{children}</FirmShell>;
}
