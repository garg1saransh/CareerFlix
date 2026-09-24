import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

export default function PrivacyPage() {
  return (
    <div className="legal-page">
      <div className="wrap">
        <BrandLogo />
        <h1>Privacy Policy</h1>
        <p>Last updated 23 September 2026</p>
        <p>
          CareerFlix is an interview and hiring platform. This policy explains what we collect when you use careerflix.com, how we use it, and the choices you have.
        </p>
        <h2>Information we collect</h2>
        <ul>
          <li>Account details such as name, work email, company and role.</li>
          <li>Candidate data you upload or collect: resumes, application answers, interview recordings and assessment results.</li>
          <li>Usage data, device information and cookies needed to run the product.</li>
        </ul>
        <h2>How we use it</h2>
        <p>
          We use this information to provide interviews, assessments, job forms, resume analysis, messaging and billing; to score responses; to keep the service secure; and to communicate about your account.
        </p>
        <h2>Sharing</h2>
        <p>
          We do not sell personal data. We share it only with processors who help us run the platform, with your team members according to the permissions you set, or when the law requires it.
        </p>
        <h2>Retention</h2>
        <p>
          We keep account and hiring records for as long as your organisation needs them, then delete or anonymise them when you close the account or ask us to.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about this policy: <a href="mailto:privacy@careerflix.com">privacy@careerflix.com</a>
        </p>
        <p style={{ marginTop: 32 }}>
          <Link href="/" className="link-arrow">Back to CareerFlix</Link>
        </p>
      </div>
    </div>
  );
}
