import { ShieldCheck, Sparkles } from "lucide-react";
import "./Auth.css";
export default function AuthLayout({
  children,
  eyebrow,
  title,
  description,
  image,
  quote,
  page = "login",
}) {
  return (
    <main className={`auth-page auth-page-${page}`}>
      <div className="auth-container">

        {/* =====================================================
            LEFT — FORM
        ====================================================== */}
        <section className="auth-form-side">

          <div className="auth-form-inner">
            {/* Header */}
            <div className="auth-header">

              <span className="section-eyebrow">
                {eyebrow}
              </span>

              <h1>{title}</h1>

              <p>{description}</p>

            </div>


            {/* Page form */}
            {children}


            {/* Bottom */}
            <div className="auth-bottom">

              <div className="auth-security">

                <span>
                  <ShieldCheck size={20} />
                </span>

                <small>
                  Private & secure
                </small>

              </div>

              <div className="auth-security">

                <span>
                  <Sparkles size={20} />
                </span>

                <small>
                  AI-powered companionship
                </small>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            RIGHT — IMAGE
        ====================================================== */}
        <aside className="auth-image-side">

          <img
            src={image}
            alt=""
            className="auth-image"
          />

          <div className="auth-image-overlay" />

          <div className="auth-image-gradient" />


          {/* Image top */}
          <div className="auth-image-top">

            <span className="badge badge-primary">
              18+ Adults Only
            </span>

          </div>


          {/* Image bottom */}
          <div className="auth-image-content">

            <div className="auth-image-line">
              <span />
              Lust Companion
            </div>

            <blockquote>
              “{quote}”
            </blockquote>
          </div>

        </aside>

      </div>
    </main>
  );
}