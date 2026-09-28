"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/workspace/AppShell";
import { DashboardBoard } from "@/components/workspace/DashboardBoard";
import { readSession, type Session } from "@/lib/session";

export default function EmployerAppPage() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(readSession());
  }, []);

  return (
    <AppShell title="Dashboard">
      {session ? <DashboardBoard session={session} /> : null}
    </AppShell>
  );
}
