"use client";

import { useEffect, useState } from "react";
import { CandidateShell } from "@/components/workspace/AppShell";
import { CandidateBoard } from "@/components/workspace/CandidateBoard";
import { readSession, type Session } from "@/lib/session";

export default function CandidateProfilePage() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(readSession());
  }, []);

  return (
    <CandidateShell title="My profile">
      {session ? <CandidateBoard session={session} /> : null}
    </CandidateShell>
  );
}
