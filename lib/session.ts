export type AccountRole = "employer" | "candidate";

export type Session = {
  role: AccountRole;
  name: string;
  email: string;
  company?: string;
};

const KEY = "cf-session";

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "CF";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function nameFromEmail(email: string) {
  const local = email.split("@")[0] || "there";
  return local
    .replace(/[._-]+/g, " ")
    .replace(/\d+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ") || "There";
}

export function companyFromEmail(email: string) {
  const host = email.split("@")[1] || "";
  const root = host.split(".")[0] || "Company";
  return root.charAt(0).toUpperCase() + root.slice(1);
}

export function readSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Session;
    if (!data?.role || !data?.email) return null;
    return data;
  } catch {
    return null;
  }
}

export function writeSession(session: Session) {
  window.localStorage.setItem(KEY, JSON.stringify(session));
}

export function clearSession() {
  window.localStorage.removeItem(KEY);
}

export function homeFor(role: AccountRole) {
  return role === "employer" ? "/app" : "/profile";
}
