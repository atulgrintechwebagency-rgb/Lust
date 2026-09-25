import { Link } from "react-router-dom";
import {
  ShieldCheck,
  LockKeyhole,
  Database,
  UserCheck,
  Mail,
} from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <main>
      {/* ===  HERO ==== */}
      <section className="section-wine terms">
        <div className="container">

          <div className="section-header">
            <span className="section-eyebrow">
              Privacy & Security
            </span>

            <h1 className="section-title">
              Privacy <span className="text-primary">Policy.</span>
            </h1>

            <p className="section-description">
              Your privacy matters to us. This Privacy Policy explains
              how Lust Companion collects, uses, protects, and manages
              information when you use our website and services.
            </p>

          </div>

        </div>
      </section>


      {/* === QUICK INFO ====== */}
      <section className="section section-dark">
        <div className="container">

          <div className="grid grid-3 gap-lg">

            <div className="card" style={{ padding: "28px" }}>
              <ShieldCheck
                size={28}
                className="text-primary"
                style={{ marginBottom: "18px" }}
              />

              <h3 style={{ marginBottom: "10px" }}>
                Your Privacy
              </h3>

              <p className="text-muted">
                We take reasonable measures to protect the information
                associated with your account and use of our services.
              </p>
            </div>


            <div className="card" style={{ padding: "28px" }}>
              <LockKeyhole
                size={28}
                className="text-primary"
                style={{ marginBottom: "18px" }}
              />

              <h3 style={{ marginBottom: "10px" }}>
                Account Security
              </h3>

              <p className="text-muted">
                We use appropriate technical and organizational measures
                designed to help protect your information.
              </p>
            </div>


            <div className="card" style={{ padding: "28px" }}>
              <UserCheck
                size={28}
                className="text-primary"
                style={{ marginBottom: "18px" }}
              />

              <h3 style={{ marginBottom: "10px" }}>
                Your Choices
              </h3>

              <p className="text-muted">
                Depending on applicable law, you may have rights relating
                to your personal information and account.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* === POLICY CONTENT ===== */}
      <section className="section-surface">
        <div className="container">

          {/* 1 */}
          <article style={{ marginBottom: "55px" }}>
            <h2 style={{ marginBottom: "18px" }}>
              1. Information We Collect
            </h2>

            <p className="text-muted" style={{ marginBottom: "18px" }}>
              When you create an account or use Lust Companion, we may
              collect information that you provide directly to us.
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
                Name or display name
              </li>

              <li className="text-muted">
                Username
              </li>

              <li className="text-muted">
                Email address
              </li>

              <li className="text-muted">
                Account credentials and authentication information
              </li>

              <li className="text-muted">
                Preferences and settings you choose
              </li>

              <li className="text-muted">
                Information you provide when communicating with our
                services
              </li>
            </ul>
          </article>


          {/* 2 */}
          <article style={{ marginBottom: "55px" }}>
            <h2 style={{ marginBottom: "18px" }}>
              2. Information Collected Automatically
            </h2>

            <p className="text-muted" style={{ marginBottom: "18px" }}>
              When you access our website or services, certain technical
              information may be collected automatically.
            </p>

            <p className="text-muted">
              This may include information such as your IP address,
              browser type, device information, operating system,
              approximate location derived from technical information,
              pages visited, interactions with the website, and
              information about how you use our services.
            </p>
          </article>


          {/* 3 */}
          <article style={{ marginBottom: "55px" }}>
            <h2 style={{ marginBottom: "18px" }}>
              3. How We Use Information
            </h2>

            <p className="text-muted" style={{ marginBottom: "18px" }}>
              We may use information we collect to:
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
                Create and manage your account.
              </li>

              <li className="text-muted">
                Provide, maintain, and improve our services.
              </li>

              <li className="text-muted">
                Personalize your experience and preferences.
              </li>

              <li className="text-muted">
                Communicate with you about your account or services.
              </li>

              <li className="text-muted">
                Help detect, prevent, and address fraud, abuse,
                security issues, and technical problems.
              </li>

              <li className="text-muted">
                Comply with applicable legal obligations.
              </li>
            </ul>
          </article>


          {/* 4 */}
          <article style={{ marginBottom: "55px" }}>
            <h2 style={{ marginBottom: "18px" }}>
              4. Cookies and Similar Technologies
            </h2>

            <p className="text-muted">
              We may use cookies and similar technologies to maintain
              sessions, remember preferences, understand website usage,
              improve functionality, and support security. You may be
              able to control cookies through your browser settings,
              although disabling certain cookies may affect how parts
              of the website function.
            </p>
          </article>


          {/* 5 */}
          <article style={{ marginBottom: "55px" }}>
            <h2 style={{ marginBottom: "18px" }}>
              5. How We Share Information
            </h2>

            <p className="text-muted" style={{ marginBottom: "18px" }}>
              We do not share personal information indiscriminately.
              Information may be shared when reasonably necessary to
              operate our services or meet legal obligations.
            </p>

            <p className="text-muted">
              This may include service providers that assist with
              hosting, authentication, analytics, communications,
              security, payments, customer support, or other business
              operations. Service providers may process information
              only as permitted by their relationship with us and
              applicable law.
            </p>
          </article>


          {/* 6 */}
          <article style={{ marginBottom: "55px" }}>
            <h2 style={{ marginBottom: "18px" }}>
              6. Data Security
            </h2>

            <p className="text-muted">
              We use reasonable safeguards intended to protect personal
              information against unauthorized access, alteration,
              disclosure, or destruction. However, no internet
              transmission or electronic storage system can be
              guaranteed to be completely secure.
            </p>
          </article>


          {/* 7 */}
          <article style={{ marginBottom: "55px" }}>
            <h2 style={{ marginBottom: "18px" }}>
              7. Data Retention
            </h2>

            <p className="text-muted">
              We retain information for as long as reasonably necessary
              to provide our services, maintain your account, comply
              with legal obligations, resolve disputes, enforce
              agreements, and protect our legitimate business
              interests. Retention periods may vary depending on the
              type of information and applicable requirements.
            </p>
          </article>


          {/* 8 */}
          <article style={{ marginBottom: "55px" }}>
            <h2 style={{ marginBottom: "18px" }}>
              8. Your Privacy Choices
            </h2>

            <p className="text-muted">
              Depending on your location and applicable law, you may
              have rights to request access to, correction of, deletion
              of, or information about the processing of certain
              personal information. You may also have rights relating
              to marketing communications and certain forms of data
              processing.
            </p>
          </article>


          {/* 9 */}
          <article style={{ marginBottom: "55px" }}>
            <h2 style={{ marginBottom: "18px" }}>
              9. Children's Privacy
            </h2>

            <p className="text-muted">
              Lust Companion is intended for adults. Our services are
              not directed toward children, and users must meet the
              minimum age requirements applicable to the service.
              We do not knowingly collect personal information from
              children in violation of applicable law.
            </p>
          </article>


          {/* 10 */}
          <article style={{ marginBottom: "55px" }}>
            <h2 style={{ marginBottom: "18px" }}>
              10. Changes to This Privacy Policy
            </h2>

            <p className="text-muted">
              We may update this Privacy Policy from time to time.
              When changes are made, we will update the date shown at
              the beginning of the policy. Your continued use of the
              services after an updated policy becomes effective may
              be subject to the updated policy.
            </p>
          </article>


          {/* 11 */}
          <article>
            <h2 style={{ marginBottom: "18px" }}>
              11. Contact Us
            </h2>

            <p className="text-muted" style={{ marginBottom: "20px" }}>
              If you have questions about this Privacy Policy or your
              personal information, please contact us.
            </p>

            <a
              href="mailto:privacy@lustcompanion.com"
              className="btn btn-outline"
            >
              <Mail size={17} />
              Contact Privacy Team
            </a>
          </article>

        </div>
      </section>


      {/* ==  FOOTER CTA ====== */}

      <section className="section-wine policyfooter" >
        <div className="container-narrow text-center">

          <span className="section-eyebrow">
            Questions?
          </span>

          <h2 className="section-title">
            We're here to <span className="text-primary">help.</span>
          </h2>

          <p
            className="section-description"
            style={{ marginInline: "auto", marginBottom: "28px" }}
          >
            Please review our Terms of Service as well for information
            about using Lust Companion.
          </p>

          <Link
            to="/terms"
            className="btn btn-primary btn-lg"
          >
            View Terms of Service
          </Link>

        </div>
      </section>
    </main>
  );
}