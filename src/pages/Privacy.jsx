import LegalLayout from "./LegalLayout";

export default function Privacy() {
  return (
    <LegalLayout eyebrow="Legal" title="Privacy Policy" updated="6 June 2026">
      <p>This Privacy Policy explains how Performance StratEx ("we", "us", "our") collects, uses, stores and protects personal data when you use our website or engage our forensic-grade investor documentation service. We comply with the UK General Data Protection Regulation and the Data Protection Act 2018.</p>

      <h3>1. Who we are</h3>
      <p>Performance StratEx is a forensic accounting and strategy consultancy operated by Lynsey Graham. The service produces investor and lender documentation for early-stage businesses. We are the data controller for all personal data described in this policy.</p>
      <p><strong>Contact:</strong> <a href="#/#contact">hello@performancestratex.com</a></p>
      <p><strong>ICO registration:</strong> Pending. Reference will be published here on confirmation.</p>

      <h3>2. What data we collect</h3>
      <p>We only collect data necessary to deliver the engagement.</p>
      <ul>
        <li><strong>Enquiry data:</strong> Name, email, company name and any message content when you contact us.</li>
        <li><strong>Engagement data:</strong> Founder, director and adviser names, contact details, and biographical information needed to produce the document pack.</li>
        <li><strong>Business data:</strong> Financial inputs, business plan narrative, market information, customer assumptions, pricing and operational details supplied during intake.</li>
        <li><strong>Document data:</strong> Drafts and final versions of the 13-document pack, including the financial model and locked summary block.</li>
        <li><strong>Technical data:</strong> Basic site analytics (page views, referrer, country). No advertising trackers.</li>
      </ul>

      <h3>3. Lawful basis</h3>
      <p>We rely on the following lawful bases under UK GDPR Article 6:</p>
      <ul>
        <li><strong>Contract performance</strong> — to deliver an engagement you have instructed us to provide.</li>
        <li><strong>Legitimate interests</strong> — to respond to enquiries, maintain forensic-grade audit trails, and protect the integrity of the methodology.</li>
        <li><strong>Legal obligation</strong> — to retain accounting and engagement records for the statutory period.</li>
      </ul>

      <h3>4. How we use AI in production</h3>
      <p>Document production uses third-party AI services for two distinct purposes:</p>
      <ul>
        <li><strong>Content generation</strong> — Perplexity AI (perplexity.ai) is used for evidence-graded market intelligence and structured drafting.</li>
        <li><strong>Adversarial review</strong> — Anthropic Claude (anthropic.com) and OpenAI GPT-4o (openai.com) are used as an independent review panel to challenge assumptions, arithmetic and formula integrity. The reviewing AI is never the same as the generating AI.</li>
      </ul>
      <p>Inputs to these services are limited to the structured business and financial data needed for each specific call. We do not send full document packs in a single payload. We do not use these services to make automated decisions about you. Every document is reviewed and signed off by Lynsey before release.</p>
      <p>These providers process data outside the United Kingdom (typically the United States). We rely on the providers' published terms, including their UK GDPR and Standard Contractual Clause commitments, for international transfers. Data is processed under "no training" terms where the provider offers it.</p>

      <h3>5. Other processors</h3>
      <ul>
        <li><strong>Supabase</strong> — secure database and storage (EU region where available).</li>
        <li><strong>Vercel</strong> — website hosting.</li>
        <li><strong>GitHub Pages</strong> — public marketing site hosting.</li>
        <li><strong>Resend</strong> — transactional email.</li>
        <li><strong>Gotenberg</strong> — PDF rendering of finalised documents (self-hosted, authenticated).</li>
      </ul>

      <h3>6. Confidentiality</h3>
      <p>All client information is treated as confidential. Lynsey practises as a forensic accountant and is bound by professional duties of confidentiality in addition to data protection law. Information disclosed to us is not shared with third parties beyond the processors named above, except with your instruction or where required by law.</p>

      <h3>7. How long we keep data</h3>
      <ul>
        <li>Engagement records and final document packs: <strong>seven years</strong> from the end of the engagement (UK statutory accounting retention).</li>
        <li>Working drafts and intermediate AI review reports: <strong>twelve months</strong> from delivery, then deleted.</li>
        <li>Enquiry-only data (no engagement entered): <strong>twelve months</strong> from last contact.</li>
        <li>Marketing analytics: aggregated, no personal identifiers retained.</li>
      </ul>

      <h3>8. Your rights</h3>
      <p>Under UK GDPR you have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you.</li>
        <li>Request correction of inaccurate data.</li>
        <li>Request erasure where no legal obligation requires retention.</li>
        <li>Restrict or object to processing in specified circumstances.</li>
        <li>Receive a copy of data in a portable format.</li>
        <li>Complain to the Information Commissioner's Office (ico.org.uk).</li>
      </ul>
      <p>Send requests to the contact address above. We will respond within one calendar month.</p>

      <h3>9. Security</h3>
      <p>Data is encrypted in transit (TLS) and at rest where the processor supports it. Access to client engagement data is restricted to Lynsey and any directly engaged adviser bound by written confidentiality. Document delivery links are token-protected, time-limited, and rate-limited. We do not request or store payment card details directly.</p>

      <h3>10. Cookies</h3>
      <p>The marketing site uses no advertising cookies and no third-party trackers. We may use minimal first-party analytics to understand site usage. The intake portal uses functional cookies necessary for authentication only.</p>

      <h3>11. Changes</h3>
      <p>We update this policy when our processing changes materially. The "last updated" date at the top of this page reflects the current version. Material changes affecting active engagements will be notified by email.</p>

      <hr/>
      <p style={{fontSize:12,opacity:.7}}>This policy is provided as our current statement of practice. It does not constitute legal advice to any reader.</p>
    </LegalLayout>
  );
}
