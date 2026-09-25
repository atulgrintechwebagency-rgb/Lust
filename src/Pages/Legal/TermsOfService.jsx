import { Link } from "react-router-dom";
import {
  FileText,
  ShieldCheck,
  UserCheck,
  AlertTriangle,
  CreditCard,
  Mail,
} from "lucide-react";
import './legal.css';

export default function TermsOfService() {
  return (
    <main>
      {/* == HERO ===== */}
      <section className="section-wine terms">
        <div className="container">

          <div className="section-header">

            <span className="section-eyebrow">
              Terms & Conditions
            </span>

            <h1 className="section-title">
              Terms of <span className="text-primary">Service.</span>
            </h1>

            <p className="section-description">
              These Terms of Service explain the rules and conditions
              that apply when you access or use Lust Companion and its
              services.
            </p>
          </div>

        </div>
      </section>


      {/* ====  QUICK INFO ===== */}
      <section className="section section-dark">
        <div className="container">

          <div className="grid grid-3 gap-lg">

            <div className="card" style={{ padding: "28px" }}>

              <FileText
                size={28}
                className="text-primary"
                style={{ marginBottom: "18px" }}
              />

              <h3 style={{ marginBottom: "10px" }}>
                Agreement
              </h3>

              <p className="text-muted">
                By using our services, you agree to comply with these
                Terms and applicable laws.
              </p>

            </div>


            <div className="card" style={{ padding: "28px" }}>

              <UserCheck
                size={28}
                className="text-primary"
                style={{ marginBottom: "18px" }}
              />

              <h3 style={{ marginBottom: "10px" }}>
                Account Responsibility
              </h3>

              <p className="text-muted">
                You are responsible for maintaining the security and
                accuracy of your account information.
              </p>

            </div>


            <div className="card" style={{ padding: "28px" }}>

              <ShieldCheck
                size={28}
                className="text-primary"
                style={{ marginBottom: "18px" }}
              />

              <h3 style={{ marginBottom: "10px" }}>
                Safe Use
              </h3>

              <p className="text-muted">
                Users must use the platform responsibly and must not
                misuse, abuse, or interfere with our services.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* ==  TERMS CONTENT ====== */}
      <section className="section-surface">
        <div className="container">

          {/* 1 */}
          <article style={{ marginBottom: "55px" }}>

            <h2 style={{ marginBottom: "18px" }}>
              1. Acceptance of These Terms
            </h2>

            <p className="text-muted">
              By accessing or using Lust Companion, you agree to be
              bound by these Terms of Service and any additional terms
              or policies referenced by them. If you do not agree with
              these Terms, you should not access or use the services.
            </p>

          </article>


          {/* 2 */}
          <article style={{ marginBottom: "55px" }}>

            <h2 style={{ marginBottom: "18px" }}>
              2. Eligibility and Adults Only
            </h2>

            <p className="text-muted" style={{ marginBottom: "18px" }}>
              Lust Companion is an adults-only service. You must meet
              the minimum age requirement applicable in your
              jurisdiction to create an account or use the services.
            </p>

            <p className="text-muted">
              By creating an account, you represent that you satisfy
              the applicable age requirement and have the legal ability
              to enter into these Terms.
            </p>

          </article>


          {/* 3 */}
          <article style={{ marginBottom: "55px" }}>

            <h2 style={{ marginBottom: "18px" }}>
              3. Your Account
            </h2>

            <p className="text-muted" style={{ marginBottom: "18px" }}>
              Some features require you to create an account. You agree
              to provide accurate information and keep your account
              information reasonably current.
            </p>

            <p className="text-muted">
              You are responsible for maintaining the confidentiality
              of your login credentials and for activity occurring
              through your account. If you believe your account has
              been accessed without authorization, you should contact
              us promptly.
            </p>

          </article>


          {/* 4 */}
          <article style={{ marginBottom: "55px" }}>

            <h2 style={{ marginBottom: "18px" }}>
              4. Acceptable Use
            </h2>

            <p className="text-muted" style={{ marginBottom: "18px" }}>
              You agree not to use the services in a manner that:
            </p>

            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                paddingLeft: "20px",
                listStyle: "disc",
              }}
            >
              <li className="text-muted">
                Violates applicable laws or regulations.
              </li>

              <li className="text-muted">
                Involves fraud, deception, impersonation, or
                unauthorized access.
              </li>

              <li className="text-muted">
                Harasses, threatens, abuses, or exploits another person.
              </li>

              <li className="text-muted">
                Attempts to interfere with or compromise the security
                of the services.
              </li>

              <li className="text-muted">
                Introduces malicious code, software, or other harmful
                material.
              </li>

              <li className="text-muted">
                Uses the services for activities that are prohibited
                by these Terms or applicable law.
              </li>
            </ul>

          </article>


          {/* 5 */}
          <article style={{ marginBottom: "55px" }}>

            <h2 style={{ marginBottom: "18px" }}>
              5. AI Companions and Generated Content
            </h2>

            <p className="text-muted" style={{ marginBottom: "18px" }}>
              Lust Companion may provide AI-powered conversational
              experiences. Responses generated by AI are produced
              automatically and may occasionally be inaccurate,
              incomplete, or inappropriate.
            </p>

            <p className="text-muted">
              AI-generated responses should not be treated as
              professional medical, legal, financial, or other
              specialized professional advice. You are responsible for
              how you use information provided through the service.
            </p>

          </article>


          {/* 6 */}
          <article style={{ marginBottom: "55px" }}>

            <h2 style={{ marginBottom: "18px" }}>
              6. User Content
            </h2>

            <p className="text-muted">
              If the services allow you to submit, upload, transmit, or
              otherwise provide content, you remain responsible for
              that content and must have the necessary rights to submit
              it. You must not submit content that violates applicable
              law or these Terms.
            </p>

          </article>


          {/* 7 */}
          <article style={{ marginBottom: "55px" }}>

            <h2 style={{ marginBottom: "18px" }}>
              7. Intellectual Property
            </h2>

            <p className="text-muted">
              The Lust Companion website, branding, designs, software,
              text, graphics, interfaces, and other materials provided
              through the services may be protected by intellectual
              property laws. Except as expressly permitted, you may not
              reproduce, distribute, modify, publicly display, sell, or
              create derivative works from our protected materials.
            </p>

          </article>


          {/* 8 */}
          <article style={{ marginBottom: "55px" }}>

            <h2 style={{ marginBottom: "18px" }}>
              8. Payments and Subscriptions
            </h2>

            <p className="text-muted">
              Certain features or services may require payment or a
              subscription. Where applicable, pricing, billing
              frequency, renewal terms, cancellation requirements, and
              refund conditions will be presented before purchase or
              otherwise made available to you.
            </p>

          </article>


          {/* 9 */}
          <article style={{ marginBottom: "55px" }}>

            <h2 style={{ marginBottom: "18px" }}>
              9. Service Availability
            </h2>

            <p className="text-muted">
              We may modify, suspend, restrict, or discontinue portions
              of the services from time to time. We do not guarantee
              that the services will always be available, uninterrupted,
              secure, or error-free.
            </p>

          </article>


          {/* 10 */}
          <article style={{ marginBottom: "55px" }}>

            <h2 style={{ marginBottom: "18px" }}>
              10. Account Suspension or Termination
            </h2>

            <p className="text-muted">
              We may suspend or terminate access to an account when
              reasonably necessary to protect the service, enforce
              these Terms, address security concerns, comply with legal
              requirements, or address prohibited activity.
            </p>

          </article>


          {/* 11 */}
          <article style={{ marginBottom: "55px" }}>

            <h2 style={{ marginBottom: "18px" }}>
              11. Disclaimers
            </h2>

            <p className="text-muted">
              To the extent permitted by applicable law, the services
              are provided on an "as available" and "as is" basis.
              We do not guarantee that the services will meet every
              individual expectation or that all content or AI-generated
              responses will be accurate, complete, or uninterrupted.
            </p>

          </article>


          {/* 12 */}
          <article style={{ marginBottom: "55px" }}>

            <h2 style={{ marginBottom: "18px" }}>
              12. Limitation of Liability
            </h2>

            <p className="text-muted">
              To the maximum extent permitted by applicable law,
              limitations on liability may apply to losses arising from
              your use of or inability to use the services. Nothing in
              these Terms is intended to exclude or limit liability
              where such exclusion or limitation is prohibited by law.
            </p>

          </article>


          {/* 13 */}
          <article style={{ marginBottom: "55px" }}>

            <h2 style={{ marginBottom: "18px" }}>
              13. Changes to These Terms
            </h2>

            <p className="text-muted">
              We may update these Terms from time to time. Updated
              Terms will be posted on this page with a revised
              effective or updated date. Your continued use of the
              services after changes become effective may be subject
              to the updated Terms.
            </p>

          </article>


          {/* 14 */}
          <article>

            <h2 style={{ marginBottom: "18px" }}>
              14. Contact Us
            </h2>

            <p className="text-muted" style={{ marginBottom: "20px" }}>
              If you have questions about these Terms of Service,
              please contact us.
            </p>

            <a
              href="mailto:legal@lustcompanion.com"
              className="btn btn-outline"
            >
              <Mail size={17} />
              Contact Us
            </a>

          </article>

        </div>
      </section>


      {/* ===  IMPORTANT NOTICE ===== */}
      <section className="section section-dark">

        <div className="container-narrow">

          <div
            className="card"
            style={{
              padding: "28px",
              display: "flex",
              gap: "18px",
              alignItems: "flex-start",
            }}
          >

            <AlertTriangle
              size={25}
              className="text-primary"
              style={{
                flexShrink: 0,
                marginTop: "2px",
              }}
            />

            <div>

              <h3 style={{ marginBottom: "10px" }}>
                Important
              </h3>

              <p className="text-muted">
                This page provides general terms for the service and
                should be reviewed and finalized by the business's
                legal counsel before publication. Specific requirements
                may vary depending on the jurisdictions in which the
                service operates.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ===== FOOTER CTA ===== */}
      <section className="section-wine termsfooter">

        <div className="container-narrow text-center">

          <span className="section-eyebrow">
            Privacy Matters
          </span>

          <h2 className="section-title">
            Read our <span className="text-primary">Privacy Policy.</span>
          </h2>

          <p
            className="section-description"
            style={{
              marginInline: "auto",
              marginBottom: "28px",
            }}
          >
            Learn how we collect, use, and protect information when you
            use Lust Companion.
          </p>

          <Link
            to="/privacy-policy"
            className="btn btn-primary btn-lg"
          >
            View Privacy Policy
          </Link>

        </div>

      </section>
    </main>
  );
}