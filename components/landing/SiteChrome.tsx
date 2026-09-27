"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { FooterStudio } from "@/components/landing/FooterStudio";
import { IconMenu, IconMoon, IconSun } from "@/lib/icons";
import { NAV_PAGES } from "@/lib/paths";

type Props = {
  onDemo?: () => void;
  children: React.ReactNode;
};

export function SiteChrome({ onDemo, children }: Props) {
  const pathname = usePathname();
  const home = pathname === "/";
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
    if (!home) return;
    const ids = ["how-it-works", "modules", "desk", "features", "pricing"];
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
  }, [home]);

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
      <header className={`nav nav--line${stuck ? " is-stuck" : ""}${hidden ? " is-hidden" : ""}`} id="nav">
        <div className="wrap nav__inner">
          <BrandLogo href="/" />
          <nav className="nav__menu" aria-label="Main">
            {NAV_PAGES.map((item) => {
              const on = home ? active === item.hash : pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav__trigger${on ? " is-active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="nav__actions">
            <button className="theme-btn theme-btn--nav" type="button" onClick={toggleTheme} aria-label="Switch theme">
              <IconMoon />
              <IconSun />
            </button>
            <Link href="/login" className="nav__login">
              Log in
            </Link>
            {onDemo ? (
              <button type="button" className="btn btn--ghost btn--sm" onClick={onDemo}>
                Book a demo
              </button>
            ) : (
              <Link href="/demo" className="btn btn--ghost btn--sm">
                Book a demo
              </Link>
            )}
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
        {NAV_PAGES.map((item) => (
          <Link key={item.href} className="drawer__link" href={item.href} onClick={closeDrawer}>
            {item.label}
          </Link>
        ))}
        <Link href="/login" className="drawer__link" onClick={closeDrawer}>
          Log in
        </Link>
        <div className="drawer__cta">
          <Link href="/signup" className="btn btn--primary" onClick={closeDrawer}>
            Start free trial
          </Link>
          {onDemo ? (
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
          ) : (
            <Link href="/demo" className="btn btn--ghost" onClick={closeDrawer}>
              Book a demo
            </Link>
          )}
          <button className="theme-btn" id="themeBtnM" type="button" onClick={toggleTheme}>
            <IconMoon />
            <IconSun />
            <span>Switch theme</span>
          </button>
        </div>
      </div>

      {children}

      <FooterStudio />
    </>
  );
}
