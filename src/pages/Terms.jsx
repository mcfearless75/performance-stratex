import LegalLayout from "./LegalLayout";

export default function Terms() {
  return (
    <LegalLayout eyebrow="Legal" title="Terms of Engagement" updated="6 June 2026">
      <p>These terms govern your use of the Performance StratEx website and any engagement to produce investor or lender documentation. By instructing us, you agree to these terms in addition to the specific scope and fee letter issued for your engagement.</p>

      <h3>1. Who we are and what we do</h3>
      <p>Performance StratEx is a forensic accounting and strategy consultancy operated by Lynsey Graham. We produce structured investor and lender documentation packs — up to thirteen integrated documents — for early-stage businesses seeking funding. We do not provide regulated financial advice, investment advice, or tax advice.</p>

      <h3>2. Scope of work</h3>
      <p>The scope of every engagement is defined in an individual engagement letter. The standard pack consists of intake questionnaires, a financial model, market intelligence, go-to-market strategy and a suite of funder-facing documents, produced across five gated stages. The engagement letter records:</p>
      <ul>
        <li>Which documents are in scope.</li>
        <li>The fee and payment schedule.</li>
        <li>The expected turnaround at each gate.</li>
        <li>Any agreed exclusions or variations.</li>
      </ul>

      <h3>3. The gated workflow</h3>
      <p>Documents are produced and released under a five-gate workflow (Gates A–E). No document downstream of a gate is generated, released, or relied upon until the preceding gate has been signed off in writing by Lynsey. This is a feature of the service, not a limitation. You agree that figures cited or shared from any pre-gate or draft material are not warranted as final.</p>

      <h3>4. Your obligations</h3>
      <p>You agree to:</p>
      <ul>
        <li>Provide accurate, complete and timely information through the intake forms.</li>
        <li>Disclose all material facts relevant to your business and its financial position.</li>
        <li>Review draft documents, evidence grades and AI review findings at each gate.</li>
        <li>Acknowledge in writing where you accept or override an adversarial review finding.</li>
        <li>Use the delivered documents only for the funding purposes for which they were produced.</li>
      </ul>
      <p>The quality of the output is directly governed by the quality of the inputs you provide. We reserve the right to pause an engagement where information is materially incomplete or contradictory.</p>

      <h3>5. Professional judgment and use of AI</h3>
      <p>Documents are produced with the support of third-party AI services (Perplexity, Anthropic Claude, OpenAI GPT-4o) and through an adversarial review protocol in which the reviewing AI is independent of the generating AI. Every document is reviewed and signed off by Lynsey before release. AI does not approve or release any document.</p>
      <p>Evidence grades (Verified, Supported, Estimated, Unsupported) appear on every claim. Estimated and Unsupported items remain estimates and assumptions — not warranted facts.</p>

      <h3>6. Not investment advice</h3>
      <p>Documents we produce describe the venture and its financials as represented by the founders. They do not constitute:</p>
      <ul>
        <li>An offer or solicitation of investment.</li>
        <li>Investment, tax, legal or regulated financial advice.</li>
        <li>A recommendation to any third party to invest, lend or transact.</li>
        <li>An audit or assurance opinion under any recognised audit standard.</li>
      </ul>

      <h3>7. Third-party reliance</h3>
      <p>Documents are produced for your use with funders you nominate. No third party is entitled to rely on the documents as against Performance StratEx. Investors, lenders, grant assessors and advisers reviewing the pack do so on the basis of their own due diligence. We owe no duty of care to recipients outside our engagement with you.</p>

      <h3>8. Intellectual property</h3>
      <ul>
        <li><strong>You own</strong> the final, gate-cleared documents delivered under your engagement, and the business information they contain.</li>
        <li><strong>We retain</strong> the methodology, templates, prompts, model architecture, locked-summary structure, gate logic, evidence-grading framework and review protocols. These are not licensed to you for reuse outside the engagement.</li>
        <li>The financial model is delivered to you as a locked, read-only copy. The live working model and underlying architecture remain our property.</li>
      </ul>

      <h3>9. Fees and payment</h3>
      <p>Fees are set out in the engagement letter and are payable in accordance with the schedule specified there. Where stage-gated payments are agreed, work on a subsequent stage will not commence until the prior stage is paid. We reserve the right to suspend or terminate an engagement for non-payment.</p>

      <h3>10. Confidentiality</h3>
      <p>Each party will keep confidential the other's commercial, financial and strategic information disclosed during the engagement, save as required by law or with written consent. Our duty of confidence is in addition to professional obligations binding Lynsey as a forensic accountant.</p>

      <h3>11. Limitation of liability</h3>
      <p>To the maximum extent permitted by law:</p>
      <ul>
        <li>Our total aggregate liability under any single engagement is limited to the fees paid by you under that engagement.</li>
        <li>We are not liable for loss of profit, loss of opportunity, failure of any funding application, loss of investor interest, decisions made by you or any third party on the basis of the documents, or any indirect or consequential loss.</li>
        <li>Nothing in these terms limits liability for death, personal injury caused by negligence, fraud, or any other liability that cannot be excluded by law.</li>
      </ul>
      <p>Professional indemnity insurance details are available on request.</p>

      <h3>12. Termination</h3>
      <p>Either party may terminate an engagement on written notice. On termination:</p>
      <ul>
        <li>Fees for work completed and in progress to the date of termination remain payable.</li>
        <li>You receive any documents already gate-cleared and delivered.</li>
        <li>Pre-gate working materials and draft outputs are not released.</li>
        <li>Confidentiality, IP, retention and liability terms survive termination.</li>
      </ul>

      <h3>13. Website use</h3>
      <p>The marketing site and any portal links are provided as is. We may modify or withdraw any part of the site at any time. You agree not to attempt to access non-public portal areas, scrape protected content, or interfere with the service.</p>

      <h3>14. Governing law</h3>
      <p>These terms and any engagement entered under them are governed by the laws of Northern Ireland. The courts of Northern Ireland have exclusive jurisdiction, save that we may bring proceedings in any jurisdiction to protect confidentiality or intellectual property.</p>

      <h3>15. Changes</h3>
      <p>We may update these terms. Material changes to active engagements take effect only on written agreement. The "last updated" date at the top of this page reflects the current version.</p>

      <hr/>
      <p style={{fontSize:12,opacity:.7}}>These terms are provided as our standing terms of engagement. They are not a substitute for the engagement letter issued for any specific instruction.</p>
    </LegalLayout>
  );
}
