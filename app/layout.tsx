import type { Metadata } from "next";
import "./globals.css";
import "../styles/landing.css";
import "../styles/pages.css";
import "../styles/polish.css";
import "../styles/wow.css";
import "../styles/atelier.css";

export const metadata: Metadata = {
  title: "CareerFlix — Interview & Hiring Platform",
  description:
    "Video interviews, skills assessments, job forms and bulk resume screening — every response scored automatically. Built for teams who hire without a hiring department.",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
