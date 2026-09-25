import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Connect your authentication API here.

    navigate("/");
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
        {/* ==================================================
            EMAIL
        =================================================== */}
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
              required
            />
          </div>
        </div>

        {/* ==================================================
            PASSWORD
        =================================================== */}
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

        {/* ==================================================
            REMEMBER ME
        =================================================== */}
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

        {/* ==================================================
            SUBMIT
        =================================================== */}
        <button
          type="submit"
          className="btn btn-primary btn-lg btn-full auth-submit"
        >
          Sign In

          <ArrowRight size={18} />
        </button>

        {/* ==================================================
            DIVIDER
        =================================================== */}
        {/*
        <div className="auth-divider">
          <span />
          <small>or continue with</small>
          <span />
        </div>
        */}

        {/* ==================================================
            REGISTER
        =================================================== */}
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