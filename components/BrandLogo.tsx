import Link from "next/link";

type Props = {
  href?: string;
  width?: number;
  onClick?: () => void;
};

export function BrandLogo({ href = "/", width = 150, onClick }: Props) {
  const img = (
    <img className="brand__logo" src="/finallogo1.png" alt="CareerFlix" width={width} />
  );

  if (onClick && !href) {
    return (
      <button type="button" className="brand" aria-label="CareerFlix home" onClick={onClick}>
        {img}
      </button>
    );
  }

  return (
    <Link href={href} className="brand" aria-label="CareerFlix home" onClick={onClick}>
      {img}
    </Link>
  );
}
