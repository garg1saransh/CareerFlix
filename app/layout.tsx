import type { Metadata } from "next";
import "./globals.css";
import "../styles/landing.css";
import "../styles/pages.css";
import "../styles/polish.css";
import "../styles/wow.css";
import "../styles/atelier.css";
import "../styles/luxe.css";
import "../styles/atlas.css";
import "../styles/nova.css";
import "../styles/pulse.css";
import "../styles/studio.css";
import "../styles/workspace.css";
import "../styles/navpages.css";

export const metadata: Metadata = {
  title: "CareerFlix — Interview & Hiring Platform",
  description:
    "Video interviews, assessments, job forms, talent pool, scheduling, employee management and bulk resume tools — every response scored automatically. Built for teams who hire without a hiring department.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('cf-theme');if(t)document.documentElement.dataset.theme=t;}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased nova pulse studio">{children}</body>
    </html>
  );
}
