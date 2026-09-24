"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { IconClose, IconMenu, IconMoon, IconSun } from "@/lib/icons";

type Props = {
  onDemo: () => void;
  children: React.ReactNode;
};

const NAV = [
  { href: "#modules", label: "Modules" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
];

export function SiteChrome({ onDemo, children }: Props) {
  const [topbar, setTopbar] = useState(true);
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [active, setActive] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem("cf-theme") as "dark" | "light" | null;
    const next = stored ?? "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }, []);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setStuck(y > 8);
      setHidden(y > last && y > 140 && !open);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    const ids = ["how-it-works", "modules", "features", "pricing"];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-42% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("cf-theme", next);
  }

  function closeDrawer() {
    setOpen(false);
  }

  return (
    <>
      {topbar && (
        <div className="topbar" id="topbar">
          New: every interview, assessment and resume is now scored automatically.{" "}
          <a href="#modules">See how it works</a>
          <button className="topbar__close" id="topbarClose" aria-label="Dismiss announcement" onClick={() => setTopbar(false)}>
            <IconClose />
          </button>
        </div>
      )}

      <header className={`nav${stuck ? " is-stuck" : ""}${hidden ? " is-hidden" : ""}`} id="nav">
        <div className="wrap nav__inner">
          <BrandLogo href="/" />
          <nav className="nav__menu" aria-label="Main">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`nav__trigger${active && item.href === `#${active}` ? " is-active" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="nav__actions">
            <button className="theme-btn theme-btn--nav" type="button" onClick={toggleTheme} aria-label="Switch theme">
              <IconMoon />
              <IconSun />
            </button>
            <Link href="/login" className="nav__login">
              Log in
            </Link>
            <button type="button" className="btn btn--ghost btn--sm" onClick={onDemo}>
              Book a demo
            </button>
            <Link href="/signup" className="btn btn--primary btn--sm">
              Start free trial
            </Link>
            <button
              className="nav__burger"
              id="burger"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <IconMenu />
            </button>
          </div>
        </div>
      </header>

      <div className={`drawer${open ? " open" : ""}`} id="drawer">
        {NAV.map((item) => (
          <a key={item.href} className="drawer__link" href={item.href} onClick={closeDrawer}>
            {item.label}
          </a>
        ))}
        <Link href="/login" className="drawer__link" onClick={closeDrawer}>
          Log in
        </Link>
        <div className="drawer__cta">
          <Link href="/signup" className="btn btn--primary" onClick={closeDrawer}>
            Start free trial
          </Link>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              closeDrawer();
              onDemo();
            }}
          >
            Book a demo
          </button>
          <button className="theme-btn" id="themeBtnM" type="button" onClick={toggleTheme}>
            <IconMoon />
            <IconSun />
            <span>Switch theme</span>
          </button>
        </div>
      </div>

      {children}

      <footer className="footer">
        <div className="wrap">
          <div className="footer__top">
            <div>
              <BrandLogo href="/" />
              <p className="footer__blurb">
                Video interviews, skills assessments, job forms, resume screening and WhatsApp messaging — one platform for the whole hiring process.
              </p>
              <div className="footer__cta">
                <Link href="/signup" className="btn btn--primary btn--sm">Start free trial</Link>
                <button type="button" className="btn btn--ghost btn--sm" onClick={onDemo}>Book a demo</button>
              </div>
            </div>
            <div className="footer__col">
              <h4>Product</h4>
              <ul>
                <li><a href="#modules">Modules</a></li>
                <li><a href="#how-it-works">How it works</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
              </ul>
            </div>
            <div className="footer__col">
              <h4>Company</h4>
              <ul>
                <li><button type="button" onClick={onDemo}>Book a demo</button></li>
                <li><Link href="/login">Sign in</Link></li>
                <li><Link href="/signup">Start a trial</Link></li>
              </ul>
            </div>
            <div className="footer__col">
              <h4>Legal</h4>
              <ul>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <p>© 2026 CareerFlix. All rights reserved.</p>
            <div className="footer__legal">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <a href="#pricing">Pricing</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
