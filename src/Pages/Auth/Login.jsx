import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

import AuthLayout from "./AuthLayout";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  /* === UI STATE ==== */

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  /* === LOGIN FORM STATE ====== */

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* === API STATE ==== */

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* === LOGIN SUBMIT ===== */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const apiBaseUrl = import.meta.env.VITE_LARAVEL_API_URL?.replace(/\/+$/, "");

      if (!apiBaseUrl) {
        throw new Error("Login service is not configured. Please contact support.");
      }

      const response = await fetch(
        `${apiBaseUrl}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
            password: password,
          }),
        }
      );

        const data = (await response.json().catch(() => null)) || {};

      /* ===  CHECK API RESPONSE ====== */

      if (!response.ok || !data.success) {
        throw new Error(
            data.message ||
              (!response.ok
                ? `Unable to login (HTTP ${response.status}). Please try again.`
                : "Unable to login. Please try again.")
        );
      }

      /* ==== GET USER + TOKEN ====== */

      const user = data.data.user;
      const token = data.data.token;

      /* ===  SAVE AUTHENTICATION ======= */

      const storage = remember
        ? localStorage
        : sessionStorage;

      storage.setItem("auth_token", token);
      storage.setItem("auth_user", JSON.stringify(user));
      window.dispatchEvent(
        new CustomEvent("auth-change", {
          detail: { message: "Login successful." },
        })
      );

      /* ==  LOGIN SUCCESS ====== */

      navigate(location.state?.from || "/", { replace: true });
    } catch (error) {
      setError(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      page="login"
      eyebrow="Welcome Back"
      title={
        <>
          Continue the{" "}
          <span>conversation.</span>
        </>
      }
      description="Sign in to continue your private conversations and reconnect with your companions."
      image="/Images/gallery6.webp"
      quote="Sometimes you just need someone who listens."
    >
      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        {/* ==  EMAIL ====== */}

        <div className="form-group">
          <label
            htmlFor="email"
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
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </div>
        </div>

        {/* =====   PASSWORD ======= */}

        <div className="form-group">
          <div className="auth-label-row">
            <label
              htmlFor="password"
              className="form-label"
            >
              Password
            </label>

            <Link
              to="/forgot-password"
              className="auth-forgot"
            >
              Forgot password?
            </Link>
          </div>

          <div className="auth-input">
            <LockKeyhole
              className="auth-input-icon"
              size={18}
            />

            <input
              id="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
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
        </div>

        {/* ===  REMEMBER ME ==== */}

        <label
          htmlFor="rememberMe"
          className={`auth-check ${
            remember ? "is-checked" : ""
          }`}
        >
          <input
            id="rememberMe"
            type="checkbox"
            checked={remember}
            onChange={(event) =>
              setRemember(event.target.checked)
            }
          />

          <span className="auth-check-box">
            {remember && <Check size={13} />}
          </span>

          <span className="auth-check-label">
            Remember me
          </span>
        </label>

        {/* =====  API ERROR ======== */}

        {error && (
          <p
            className="auth-error"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* ======  SUBMIT === */}

        <button
          type="submit"
          className="btn btn-primary btn-lg btn-full auth-submit"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}

          {!loading && <ArrowRight size={18} />}
        </button>

        {/* === REGISTER ===== */}

        <p className="auth-switch">
          Don't have an account?{" "}

          <Link to="/register">
            Create one
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}