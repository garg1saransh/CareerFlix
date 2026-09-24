import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

export default function TermsPage() {
  return (
    <div className="legal-page">
      <div className="wrap">
        <BrandLogo />
        <h1>Terms of Service</h1>
        <p>Last updated 23 September 2026</p>
        <p>
          These terms govern your use of CareerFlix, including the website, trial and paid plans. By creating an account you agree to them.
        </p>
        <h2>The service</h2>
        <p>
          CareerFlix provides video interviews, skills assessments, job forms, resume analysis, a resume editor, messaging and related hiring tools. Features available to you depend on your plan.
        </p>
        <h2>Your account</h2>
        <p>
          You are responsible for the accuracy of the information you submit, for your team’s use of the workspace, and for keeping login details secure.
        </p>
        <h2>Trials and billing</h2>
        <p>
          The 14-day trial starts the first time you log in. When it ends we stop new creations; existing interviews, candidates and data remain until you subscribe or delete the account. Paid plans renew monthly or yearly until cancelled.
        </p>
        <h2>Acceptable use</h2>
        <p>
          You may not use CareerFlix to break the law, to upload content you do not have rights to, or to interfere with the service or other customers.
        </p>
        <h2>Contact</h2>
        <p>
          Legal questions: <a href="mailto:legal@careerflix.com">legal@careerflix.com</a>
        </p>
        <p style={{ marginTop: 32 }}>
          <Link href="/" className="link-arrow">Back to CareerFlix</Link>
        </p>
      </div>
    </div>
  );
}
