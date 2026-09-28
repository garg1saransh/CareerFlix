import { notFound } from "next/navigation";
import { CandidateShell } from "@/components/workspace/AppShell";
import { DeskBoard } from "@/components/workspace/DeskBoard";
import { CANDIDATE_DESKS } from "@/lib/desks";
import { CANDIDATE_SECTIONS } from "@/lib/workspace";

type Props = { params: Promise<{ section: string }> };

export function generateStaticParams() {
  return CANDIDATE_SECTIONS.map((section) => ({ section }));
}

export default async function CandidateSectionPage({ params }: Props) {
  const { section } = await params;
  const desk = CANDIDATE_DESKS[section];
  if (!desk) notFound();

  return (
    <CandidateShell title={desk.title}>
      <DeskBoard desk={desk} tone={`c-${section}`} />
    </CandidateShell>
  );
}
