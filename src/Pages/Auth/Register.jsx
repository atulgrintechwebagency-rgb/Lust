import { useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";

import AuthLayout from "./AuthLayout";
import "./Auth.css";

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [adult, setAdult] = useState(false);
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const [preferences, setPreferences] = useState({
    explore: [],
    connection: [],
    language: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const steps = [
    {
      number: 1,
      label: "Account",
    },
    {
      number: 2,
      label: "Preferences",
    },
    {
      number: 3,
      label: "Personalize",
    },
  ];

  const exploreOptions = [
    "AI companions",
    "Live creators",
    "Both",
    "Merchandise",
    "Just browsing",
  ];

  const connectionOptions = [
    "Text chat",
    "Voice",
    "Both",
  ];

  const languageOptions = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFieldErrors((previous) => {
      const nextErrors = { ...previous, [name]: "" };

      if (name === "password" || name === "confirmPassword") {
        nextErrors.confirmPassword = "";
      }

      return nextErrors;
    });
    setError("");
  };

  const togglePreference = (type, value) => {
    setPreferences((previous) => {
      const currentValues = previous[type];

      const exists = currentValues.includes(value);

      return {
        ...previous,
        [type]: exists
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      };
    });
  };

  const isPreferenceSelected = (type, value) => {
    return preferences[type].includes(value);
  };

  const validateStepOne = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Enter your full name.";
    }

    if (!formData.username.trim()) {
      nextErrors.username = "Choose a username.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (formData.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = "Confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (!adult) {
      nextErrors.adult = "You must confirm that you are 18 or older.";
    }

    if (!terms) {
      nextErrors.terms = "You must accept the terms to continue.";
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      setError("");
      if (!validateStepOne()) {
        return;
      }

      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((previous) => previous - 1);
    }
  };

  const registerAccount = async () => {
    if (loading) {
      return;
    }

    setError("");
    setLoading(true);

    try {
      const apiBaseUrl = import.meta.env.VITE_LARAVEL_API_URL?.replace(/\/+$/, "");

      if (!apiBaseUrl) {
        throw new Error("Registration service is not configured. Please try again later.");
      }

      const response = await fetch(`${apiBaseUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          username: formData.username.trim().replace(/^@+/, ""),
          email: formData.email.trim(),
          password: formData.password,
          password_confirmation: formData.confirmPassword,
          is_18_or_older: adult ? 1 : 0,
          terms_accepted: terms ? 1 : 0,
          device_name: "web-app",
        }),
      });

      const data = (await response.json().catch(() => null)) || {};

      if (!response.ok || !data.success) {
        const apiFieldNames = {
          password_confirmation: "confirmPassword",
          is_18_or_older: "adult",
          terms_accepted: "terms",
        };
        const nextFieldErrors = Object.fromEntries(
          Object.entries(data.errors || {}).map(([field, messages]) => [
            apiFieldNames[field] || field,
            Array.isArray(messages) ? messages[0] : messages,
          ])
        );
        const firstValidationError = Object.values(nextFieldErrors).find(Boolean);

        if (firstValidationError) {
          setFieldErrors(nextFieldErrors);
          setCurrentStep(1);
          setError("");
          return;
        }

        throw new Error(
          data.message ||
            `Unable to register (HTTP ${response.status}). Please try again.`
        );
      }

      const token = data.data?.token;
      const user = data.data?.user;
      if (token) {
        sessionStorage.setItem("auth_token", token);
        if (user) {
          sessionStorage.setItem("auth_user", JSON.stringify(user));
        }
        window.dispatchEvent(new CustomEvent("auth-change"));
      }

      setSuccessMessage(
        data.message || "Registration successful. Please verify your email."
      );
    } catch (requestError) {
      setError(requestError.message || "Unable to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (currentStep !== 3) {
      return;
    }

    registerAccount();
  };

  const handleSkip = () => {
    registerAccount();
  };

  return (
    <AuthLayout
      page="register"
      eyebrow="Create Your Account"
      title={
        <>
          Start your <span>connection.</span>
        </>
      }
      description="Create your account and discover a more personal way to chat, connect, and explore."
      image="/Images/gallery1.webp"
      quote="The right conversation can change the entire mood."
    >
      <form
        className="auth-form auth-register-form"
        onSubmit={handleSubmit}
      >
        {successMessage ? (
          <div className="auth-success" role="status">
            <div className="auth-success-icon">
              <CheckCircle2 size={28} />
            </div>
            <h2>Check your email</h2>
            <p>{successMessage}</p>
            <Link
              to="/login"
              className="btn btn-primary btn-lg btn-full auth-submit"
            >
              Go to sign in
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <>
        {/* ==================================================
            STEP INDICATOR
        =================================================== */}
        <div className="auth-stepper">
          {steps.map((step, index) => {
            const isActive = currentStep === step.number;
            const isComplete = currentStep > step.number;

            return (
              <div
                className="auth-step-wrapper"
                key={step.number}
              >
                <div
                  className={`auth-step ${
                    isActive ? "is-active" : ""
                  } ${
                    isComplete ? "is-complete" : ""
                  }`}
                >
                  <span className="auth-step-number">
                    {isComplete ? (
                      <Check size={13} />
                    ) : (
                      step.number
                    )}
                  </span>

                  <span className="auth-step-label">
                    {step.label}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <span
                    className={`auth-step-line ${
                      currentStep > step.number
                        ? "is-complete"
                        : ""
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}

        {/* ==================================================
            STEP 1 — ACCOUNT
        =================================================== */}
        {currentStep === 1 && (
          <div className="auth-step-content">
            <div className="auth-step-heading">
              <span className="auth-step-count">
                Step 1 of 3
              </span>

              <h2>Create your account</h2>

              <p>
                Set up your account to get started with Lust
                Companion.
              </p>
            </div>

            {/* NAME ROW */}
            <div className="auth-form-grid">
              {/* FULL NAME */}
              <div className="form-group">
                <label
                  htmlFor="name"
                  className="form-label"
                >
                  Full Name
                </label>

                <div className="auth-input">
                  <User
                    className="auth-input-icon"
                    size={18}
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? "name-error" : undefined}
                  />
                </div>
                {fieldErrors.name && (
                  <p className="auth-form-error" id="name-error">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              {/* USERNAME */}
              <div className="form-group">
                <label
                  htmlFor="username"
                  className="form-label"
                >
                  Username
                </label>

                <div className="auth-input">
                  <User
                    className="auth-input-icon"
                    size={18}
                  />

                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="@username"
                    autoComplete="username"
                    required
                    aria-invalid={Boolean(fieldErrors.username)}
                    aria-describedby={fieldErrors.username ? "username-error" : undefined}
                  />
                </div>
                {fieldErrors.username && (
                  <p className="auth-form-error" id="username-error">
                    {fieldErrors.username}
                  </p>
                )}
              </div>
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label
                htmlFor="registerEmail"
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
                  id="registerEmail"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? "register-email-error" : undefined}
                />
              </div>
              {fieldErrors.email && (
                <p className="auth-form-error" id="register-email-error">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* PASSWORD ROW */}
            <div className="auth-form-grid">
              {/* PASSWORD */}
              <div className="form-group">
                <label
                  htmlFor="registerPassword"
                  className="form-label"
                >
                  Password
                </label>

                <div className="auth-input">
                  <LockKeyhole
                    className="auth-input-icon"
                    size={18}
                  />

                  <input
                    id="registerPassword"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    aria-invalid={Boolean(fieldErrors.password)}
                    aria-describedby={fieldErrors.password ? "register-password-error" : undefined}
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
                {fieldErrors.password && (
                  <p className="auth-form-error" id="register-password-error">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="form-group">
                <label
                  htmlFor="confirmPassword"
                  className="form-label"
                >
                  Confirm Password
                </label>

                <div className="auth-input">
                  <LockKeyhole
                    className="auth-input-icon"
                    size={18}
                  />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    aria-invalid={Boolean(fieldErrors.confirmPassword)}
                    aria-describedby={fieldErrors.confirmPassword ? "confirm-password-error" : undefined}
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
                {fieldErrors.confirmPassword && (
                  <p className="auth-form-error" id="confirm-password-error">
                    {fieldErrors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* PASSWORD ERROR */}
            {/* ADULT CHECKBOX */}
            <label
              className={`auth-consent ${
                adult ? "is-checked" : ""
              }`}
              htmlFor="adultCheck"
            >
              <input
                id="adultCheck"
                type="checkbox"
                checked={adult}
                onChange={(event) => {
                  setAdult(event.target.checked);
                  setFieldErrors((previous) => ({ ...previous, adult: "" }));
                }}
                aria-invalid={Boolean(fieldErrors.adult)}
                aria-describedby={fieldErrors.adult ? "adult-error" : undefined}
              />

              <span className="auth-check-box">
                {adult && <Check size={13} />}
              </span>

              <span className="auth-consent-text">
                <strong>
                  I'm 18 years or older
                </strong>

                <small>
                  Lust Companion is an adults-only
                  experience.
                </small>
              </span>
            </label>
            {fieldErrors.adult && (
              <p className="auth-form-error" id="adult-error">
                {fieldErrors.adult}
              </p>
            )}

            {/* TERMS CHECKBOX */}
            <label
              className={`auth-consent ${
                terms ? "is-checked" : ""
              }`}
              htmlFor="termsCheck"
            >
              <input
                id="termsCheck"
                type="checkbox"
                checked={terms}
                onChange={(event) => {
                  setTerms(event.target.checked);
                  setFieldErrors((previous) => ({ ...previous, terms: "" }));
                }}
                aria-invalid={Boolean(fieldErrors.terms)}
                aria-describedby={fieldErrors.terms ? "terms-error" : undefined}
              />

              <span className="auth-check-box">
                {terms && <Check size={13} />}
              </span>

              <span className="auth-consent-text">
                <span>
                  I agree to{" "}
                  <Link to="/terms">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy-policy">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </span>
            </label>
            {fieldErrors.terms && (
              <p className="auth-form-error" id="terms-error">
                {fieldErrors.terms}
              </p>
            )}

            {/* NEXT */}
            <button
              type="button"
              className="btn btn-primary btn-lg btn-full auth-submit"
              onClick={handleNext}
            >
              Continue

              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ==================================================
            STEP 2 — PREFERENCES
        =================================================== */}
        {currentStep === 2 && (
          <div className="auth-step-content">
            <div className="auth-step-heading">
              <span className="auth-step-count">
                Step 2 of 3
              </span>

              <h2>Your preferences</h2>

              <p>
                Tell us what you would like to explore
                first. You can change these later.
              </p>
            </div>

            {/* EXPLORE */}
            <div className="auth-preference-section">
              <label className="auth-preference-title">
                What would you like to explore first?
              </label>

              <div className="auth-option-list">
                {exploreOptions.map((option) => {
                  const selected =
                    isPreferenceSelected(
                      "explore",
                      option
                    );

                  return (
                    <button
                      key={option}
                      type="button"
                      className={`auth-option ${
                        selected
                          ? "is-selected"
                          : ""
                      }`}
                      onClick={() =>
                        togglePreference(
                          "explore",
                          option
                        )
                      }
                    >
                      <span className="auth-option-check">
                        {selected && (
                          <Check size={12} />
                        )}
                      </span>

                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CONNECTION */}
            <div className="auth-preference-section">
              <label className="auth-preference-title">
                How do you prefer to connect?
              </label>

              <div className="auth-option-list">
                {connectionOptions.map((option) => {
                  const selected =
                    isPreferenceSelected(
                      "connection",
                      option
                    );

                  return (
                    <button
                      key={option}
                      type="button"
                      className={`auth-option ${
                        selected
                          ? "is-selected"
                          : ""
                      }`}
                      onClick={() =>
                        togglePreference(
                          "connection",
                          option
                        )
                      }
                    >
                      <span className="auth-option-check">
                        {selected && (
                          <Check size={12} />
                        )}
                      </span>

                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              <small className="auth-help-text">
                You can select more than one.
              </small>
            </div>

            {/* ACTIONS */}
            <div className="auth-step-actions">
              <button
                type="button"
                className="auth-back-button btn btn-primary btn-lg"
                onClick={handleBack}
              >
                <ArrowLeft size={17} />

                Back
              </button>

              <button
                type="button"
                className="btn btn-primary btn-lg auth-submit"
                onClick={handleNext}
              >
                Continue

                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ==================================================
            STEP 3 — PERSONALIZE
        =================================================== */}
        {currentStep === 3 && (
          <div className="auth-step-content">
            <div className="auth-step-heading">
              <span className="auth-step-count">
                Step 3 of 3
              </span>

              <h2>Personalize your experience</h2>

              <p>
                Choose your preferred language to make
                your experience feel more personal.
              </p>
            </div>

            {/* LANGUAGE */}
            <div className="form-group">
              <label
                htmlFor="language"
                className="form-label"
              >
                What language would you prefer?
              </label>

              <div className="auth-input auth-select">
                <ChevronDown
                  className="auth-input-icon"
                  size={18}
                />

                <select
                  id="language"
                  value={preferences.language}
                  onChange={(event) =>
                    setPreferences(
                      (previous) => ({
                        ...previous,
                        language:
                          event.target.value,
                      })
                    )
                  }
                >
                  <option value="">
                    Select a language
                  </option>

                  {languageOptions.map(
                    (language) => (
                      <option
                        key={language}
                        value={language}
                      >
                        {language}
                      </option>
                    )
                  )}
                </select>
              </div>

              <small className="auth-help-text">
                You can change this later from your
                account settings.
              </small>
            </div>

            {/* SUMMARY */}
            <div className="auth-preference-summary">
              <div>
                <span>Exploring</span>

                <strong>
                  {preferences.explore.length > 0
                    ? preferences.explore.join(
                        ", "
                      )
                    : "Not selected"}
                </strong>
              </div>

              <div>
                <span>Connection</span>

                <strong>
                  {preferences.connection.length > 0
                    ? preferences.connection.join(
                        ", "
                      )
                    : "Not selected"}
                </strong>
              </div>
            </div>

            {/* SAVE */}
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-full auth-submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}

              {!loading && <ArrowRight size={18} />}
            </button>

            {/* SKIP */}
            <button
              type="button"
              className="auth-skip-button"
              onClick={handleSkip}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Skip preferences"}
            </button>

            {/* BACK */}
            <button
              type="button"
              className="auth-back-button auth-back-centered btn-primary btn btn-lg "
              onClick={handleBack}
            >
              <ArrowLeft size={17} />

              Back
            </button>
          </div>
        )}

          </>
        )}

        {/* ==================================================
            LOGIN
        =================================================== */}
        <p className="auth-switch">
          Already have an account?{" "}

          <Link to="/login">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}