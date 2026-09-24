export function IconClose() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M2 2l10 10M12 2L2 12" />
    </svg>
  );
}

export function IconMenu() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 6h16M3 11h16M3 16h16" />
    </svg>
  );
}

export function IconMoon() {
  return (
    <svg className="i-moon" width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 11.4A7.2 7.2 0 018.6 3a7.2 7.2 0 108.4 8.4z" />
    </svg>
  );
}

export function IconSun() {
  return (
    <svg className="i-sun" width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="3.6" />
      <path d="M10 1.6v2.1M10 16.3v2.1M3.1 3.1l1.5 1.5M15.4 15.4l1.5 1.5M1.6 10h2.1M16.3 10h2.1M3.1 16.9l1.5-1.5M15.4 4.6l1.5-1.5" />
    </svg>
  );
}

export function IconTick() {
  return (
    <svg width="11" height="9" viewBox="0 0 11 9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 4.6L4 7.5 10 1.5" />
    </svg>
  );
}

export function IconArrow() {
  return (
    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 5h10M7.5 1.5L11 5l-3.5 3.5" />
    </svg>
  );
}

export function IconArrowWide() {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 5.5h12M9 1.5l4 4-4 4" />
    </svg>
  );
}

export function IconInterview() {
  return (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="4.5" width="11" height="9" rx="2" />
      <path d="M13.5 8l4-2.5v7L13.5 10z" />
    </svg>
  );
}

export function IconAssessment() {
  return (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="7" />
      <circle cx="10" cy="10" r="2.8" />
      <path d="M10 3v2.2M10 14.8V17M3 10h2.2M14.8 10H17" />
    </svg>
  );
}

export function IconForms() {
  return (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="2.5" width="13" height="15" rx="2" />
      <path d="M7 6.5h6M7 10h6" />
      <path d="M7 13.5l1.5 1.5 3-3" />
    </svg>
  );
}

export function IconAnalyser() {
  return (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8.5" cy="8.5" r="5" />
      <path d="M12.3 12.3L16.5 16.5" />
      <path d="M6.5 8.5h4M6.5 6.5h4M6.5 10.5h2" />
    </svg>
  );
}

export function IconEditor() {
  return (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.5 3.2l3.3 3.3L6.6 15.7l-3.9.6.6-3.9z" />
      <path d="M11 4.7l3.3 3.3" />
    </svg>
  );
}

export function IconBrand() {
  return (
    <svg width="21" height="21" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3.5v4M13 3.5v4" />
      <path d="M4.5 7.5h11v3a5.5 5.5 0 01-11 0z" />
      <path d="M10 16v2.5" />
    </svg>
  );
}

export function IconData() {
  return (
    <svg width="21" height="21" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 5.5L2.5 10 7 14.5M13 5.5L17.5 10 13 14.5" />
    </svg>
  );
}

export function IconLock() {
  return (
    <svg width="21" height="21" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="8.5" width="12" height="8" rx="2" />
      <path d="M7 8.5V6a3 3 0 016 0v2.5" />
    </svg>
  );
}

export const MODULE_ICONS = {
  interviews: IconInterview,
  assessments: IconAssessment,
  forms: IconForms,
  analyser: IconAnalyser,
  editor: IconEditor,
};
