import { notFound } from "next/navigation";
import { AppShell } from "@/components/workspace/AppShell";
import { DeskBoard } from "@/components/workspace/DeskBoard";
import { EMPLOYER_DESKS } from "@/lib/desks";
import { APP_TOOLS } from "@/lib/workspace";

type Props = { params: Promise<{ tool: string }> };

export function generateStaticParams() {
  return APP_TOOLS.map((tool) => ({ tool }));
}

export default async function EmployerToolPage({ params }: Props) {
  const { tool } = await params;
  const desk = EMPLOYER_DESKS[tool];
  if (!desk) notFound();

  return (
    <AppShell title={desk.title}>
      <DeskBoard desk={desk} tone={tool} />
    </AppShell>
  );
}
