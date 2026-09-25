import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Check,
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
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [adult, setAdult] = useState(false);
  const [terms, setTerms] = useState(false);

  const [preferences, setPreferences] = useState({
    explore: [],
    connection: [],
    language: "",
  });

  const [formData, setFormData] = useState({
    firstName: "",
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
    if (
      !formData.firstName.trim() ||
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      return false;
    }

    if (!adult || !terms) {
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (currentStep === 1) {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    /*
     * Connect your registration API here.
     *
     * formData:
     * - firstName
     * - username
     * - email
     * - password
     * - confirmPassword
     *
     * preferences:
     * - explore
     * - connection
     * - language
     */

    navigate("/");
  };

  const handleSkip = () => {
    /*
     * Registration can continue without saving preferences.
     *
     * Connect your registration API here if required.
     */

    navigate("/");
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
              {/* FIRST NAME */}
              <div className="form-group">
                <label
                  htmlFor="firstName"
                  className="form-label"
                >
                  First Name
                </label>

                <div className="auth-input">
                  <User
                    className="auth-input-icon"
                    size={18}
                  />

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    autoComplete="given-name"
                    required
                  />
                </div>
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
                  />
                </div>
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
                />
              </div>
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
            </div>

            {/* PASSWORD ERROR */}
            {formData.confirmPassword &&
              formData.password !==
                formData.confirmPassword && (
                <p className="auth-form-error">
                  Passwords do not match.
                </p>
              )}

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
                onChange={(event) =>
                  setAdult(event.target.checked)
                }
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
                onChange={(event) =>
                  setTerms(event.target.checked)
                }
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

            {/* NEXT */}
            <button
              type="button"
              disabled={
                !adult ||
                !terms ||
                !formData.firstName.trim() ||
                !formData.username.trim() ||
                !formData.email.trim() ||
                !formData.password ||
                !formData.confirmPassword ||
                formData.password !==
                  formData.confirmPassword
              }
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
            >
              Save Preferences

              <ArrowRight size={18} />
            </button>

            {/* SKIP */}
            <button
              type="button"
              className="auth-skip-button"
              onClick={handleSkip}
            >
              Skip for now
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