import Link from "next/link";

export default function NotFound() {
  return (
    <div className="nf-page">
      <div>
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>The page you&apos;re looking for doesn&apos;t exist. Let’s get you back.</p>
        <form className="nf-search" action="/">
          <input name="q" placeholder="Search..." />
          <button type="submit" className="btn btn--primary btn--sm">Go</button>
        </form>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link href="/" className="btn btn--primary">Go Home</Link>
          <Link href="/" className="btn btn--ghost">Go Back</Link>
        </div>
      </div>
    </div>
  );
}
