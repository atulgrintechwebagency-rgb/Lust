import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
} from "lucide-react";

import AuthLayout from "./AuthLayout";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!token) {
      setError("This password reset link is invalid or incomplete. Request a new one.");
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters long."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Passwords do not match. Please try again."
      );
      return;
    }

    setLoading(true);

    try {
      const apiBaseUrl = import.meta.env.VITE_LARAVEL_API_URL?.replace(/\/+$/, "");

      if (!apiBaseUrl) {
        throw new Error("Password reset is not available right now. Please try again later.");
      }

      const response = await fetch(`${apiBaseUrl}/auth/change/password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          token,
          password,
          password_confirmation: confirmPassword,
        }),
      });
      const data = (await response.json().catch(() => null)) || {};

      if (!response.ok || !data.success) {
        const validationError = Object.values(data.errors || {})
          .flat()
          .find(Boolean);

        throw new Error(
          validationError ||
            data.message ||
            `Unable to reset your password (HTTP ${response.status}). Please try again.`
        );
      }

      setSuccessMessage(
        data.message ||
          "Password reset successfully. You can now log in with your new password."
      );
      setSuccess(true);
    } catch (requestError) {
      setError(requestError.message || "Unable to reset your password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthLayout
        page="reset-password-success"
        eyebrow="Password Updated"
        title={
          <>
            You're all{" "}
            <span>set.</span>
          </>
        }
        description="Your password has been successfully updated. You can now sign in with your new password."
        image="/Images/membership-promo-model.webp"
        quote="Sometimes a fresh beginning is exactly what you need."
      >
        <div className="auth-success">
          <div className="auth-success-icon">
            <CheckCircle2 size={28} />
          </div>

          <h2>
            Password reset successful
          </h2>

          <p>
            {successMessage}
          </p>

          <Link
            to="/login"
            className="btn btn-primary btn-lg btn-full"
          >
            Sign In

            <ArrowRight size={18} />
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      page="reset-password"
      eyebrow="Create New Password"
      title={
        <>
          Set your new{" "}
          <span>password.</span>
        </>
      }
      description="Choose a new password for your account. Make sure it's something secure that you can remember."
      image="/Images/membership-promo-model.webp"
      quote="Your privacy deserves a password you can trust."
    >
      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        {/* ==== PASSWORD ====== */}
        <div className="form-group">
          <label
            htmlFor="newPassword"
            className="form-label"
          >
            New Password
          </label>

          <div className="auth-input">
            <LockKeyhole
              className="auth-input-icon"
              size={18}
            />

            <input
              id="newPassword"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Create new password"
              autoComplete="new-password"
              minLength={8}
              required
            />

            <button
              type="button"
              className="auth-password-toggle"
              onClick={() =>
                setShowPassword(
                  (value) => !value
                )
              }
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          <small className="auth-field-help">
            Use at least 8 characters for your new password.
          </small>
        </div>

        {/* =====  CONFIRM PASSWORD ==== */}
        <div className="form-group">
          <label
            htmlFor="confirmNewPassword"
            className="form-label"
          >
            Confirm New Password
          </label>

          <div className="auth-input">
            <LockKeyhole
              className="auth-input-icon"
              size={18}
            />

            <input
              id="confirmNewPassword"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
              placeholder="Confirm new password"
              autoComplete="new-password"
              minLength={8}
              required
            />

            <button
              type="button"
              className="auth-password-toggle"
              onClick={() =>
                setShowConfirmPassword(
                  (value) => !value
                )
              }
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* ===  ERROR ===== */}
        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

        {/* ====   SUBMIT == */}
        <button
          type="submit"
          className="btn btn-primary btn-lg btn-full auth-submit"
          disabled={loading}
        >
          {loading ? "Updating Password..." : "Reset Password"}

          {!loading && <ArrowRight size={18} />}
        </button>

        {/* = LOGIN ======= */}
        <p className="auth-switch">
          Remember your password?{" "}

          <Link to="/login">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}