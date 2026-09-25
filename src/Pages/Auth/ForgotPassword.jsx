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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    // Connect your forgot-password API here.
    // The API should send the password reset email.

    setSubmitted(true);
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
                  setEmail(event.target.value)
                }
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <small className="auth-field-help">
              We'll send password reset instructions to this
              email address.
            </small>
          </div>

          {/* === SUBMIT ===== */}
          <button
            type="submit"
            className="btn btn-primary btn-lg btn-full auth-submit"
          >
            Send Reset Link

            <ArrowRight size={18} />
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