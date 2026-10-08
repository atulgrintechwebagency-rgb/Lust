import { useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Mail,
  CheckCircle2,
} from "lucide-react";

import AuthLayout from "./AuthLayout";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const normalizedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const apiBaseUrl = import.meta.env.VITE_LARAVEL_API_URL?.replace(/\/+$/, "");

      if (!apiBaseUrl) {
        throw new Error("Password reset is not available right now. Please try again later.");
      }

      const response = await fetch(`${apiBaseUrl}/auth/forgot/password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });
      const data = (await response.json().catch(() => null)) || {};

      if (!response.ok || !data.success) {
        const validationError = Object.values(data.errors || {})
          .flat()
          .find(Boolean);

        throw new Error(
          validationError ||
            data.message ||
            `Unable to send the reset link (HTTP ${response.status}). Please try again.`
        );
      }

      setEmail(normalizedEmail);
      setSubmitted(true);
    } catch (requestError) {
      setError(requestError.message || "Unable to send the reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      page="forgot-password"
      eyebrow="Reset Your Password"
      title={
        <>
          Forgot your{" "}
          <span>password?</span>
        </>
      }
      description="Enter the email address associated with your account and we'll send you a secure link to reset your password."
      image="/Images/gallery1.webp"
      quote="A fresh start is only one conversation away."
    >
      {!submitted ? (
        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          {/* === EMAIL ======= */}
          <div className="form-group">
            <label
              htmlFor="forgotEmail"
              className="form-label"
            >
              Email Address
            </label>

            <div className="auth-input">
              <Mail
                className="auth-input-icon"
                size={18}
              />

              <input
                id="forgotEmail"
                type="email"
                value={email}
                onChange={(event) =>
                  {
                    setEmail(event.target.value);
                    setError("");
                  }
                }
                placeholder="you@example.com"
                autoComplete="email"
                required
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "forgot-email-error" : undefined}
              />
            </div>

            {error && (
              <p className="auth-form-error" id="forgot-email-error" role="alert">
                {error}
              </p>
            )}

            <small className="auth-field-help">
              We'll send password reset instructions to this
              email address.
            </small>
          </div>

          {/* === SUBMIT ===== */}
          <button
            type="submit"
            className="btn btn-primary btn-lg btn-full auth-submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}

            {!loading && <ArrowRight size={18} />}
          </button>

          {/* ====  BACK TO LOGIN ==== */}
          <Link
            to="/login"
            className="auth-back-link"
          >
            <ArrowLeft size={16} />

            Back to Sign In
          </Link>
        </form>
      ) : (
        /* ====  EMAIL SENT ======= */
        <div className="auth-success">
          <div className="auth-success-icon">
            <CheckCircle2 size={28} />
          </div>

          <h2>
            Check your email
          </h2>

          <p>
            If an account exists for{" "}
            <strong>{email}</strong>, we've sent you a
            password reset link.
          </p>

          <p className="auth-success-note">
            Please check your inbox and spam folder. The
            reset link may expire for security reasons.
          </p>

          <Link
            to="/login"
            className="btn btn-primary btn-lg btn-full"
          >
            Back to Sign In

            <ArrowRight size={18} />
          </Link>

          <button
            type="button"
            className="auth-text-button"
            onClick={() => setSubmitted(false)}
          >
            Use a different email
          </button>
        </div>
      )}
    </AuthLayout>
  );
}