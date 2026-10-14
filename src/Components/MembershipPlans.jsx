import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Crown,
  Check,
  Heart,
  Sparkles,
  MessageCircle,
  Mic,
  Users,
  ShieldCheck,
  Zap,
  Star,
  ArrowRight,
} from 'lucide-react';

import { useIsAuthenticated } from '../utils/auth';
import { getAccountUser } from '../utils/account';
import './MembershipPlans.css';

const membershipPlansUrl = import.meta.env.VITE_LARAVEL_API_URL
  ? `${import.meta.env.VITE_LARAVEL_API_URL.replace(/\/+$/, "")}/membership-plans`
  : "https://lustcompanion.com/backend/api/membership-plans";

const benefits = [
  {
    icon: MessageCircle,
    title: 'Unlimited Conversations',
    description:
      'Keep the conversation going whenever you want without worrying about limits.',
  },
  {
    icon: Heart,
    title: 'More Personal Connections',
    description:
      'Discover companions that match your interests, mood, and preferred style.',
  },
  {
    icon: Mic,
    title: 'Voice Experiences',
    description:
      'Take your conversations beyond text with immersive voice interactions.',
  },
  {
    icon: Sparkles,
    title: 'Exclusive Experiences',
    description:
      'Unlock premium companions, scenarios, and experiences as a member.',
  },
];

function MembershipPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);
  const [selectionNotice, setSelectionNotice] = useState("");
  const authenticated = useIsAuthenticated();
  const currentMembership = String(getAccountUser().membership || "").toLowerCase();

  useEffect(() => {
    const controller = new AbortController();

    const loadPlans = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(membershipPlansUrl, {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        const result = (await response.json().catch(() => null)) || {};

        if (!response.ok || !result.success) {
          throw new Error(
            result.message ||
              `Unable to load membership plans (HTTP ${response.status}).`
          );
        }

        const memberships = result.data?.memberships;
        if (
          !Array.isArray(memberships) ||
          memberships.some(
            (plan) =>
              !plan ||
              typeof plan.id !== "number" ||
              typeof plan.name !== "string" ||
              typeof plan.slug !== "string" ||
              !Array.isArray(plan.features)
          )
        ) {
          throw new Error("Membership service returned an invalid plans response.");
        }

        setPlans(memberships);
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.message || "Unable to load membership plans.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadPlans();
    return () => controller.abort();
  }, [retryKey]);

  return (
    <main className="membership-page">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="membership-hero">

        <div className="membership-hero-bg" />
        <div className="membership-hero-glow membership-hero-glow-one" />
        <div className="membership-hero-glow membership-hero-glow-two" />

        <div className="container membership-hero-container">

          <div className="membership-hero-content">

            <span className="membership-eyebrow">
              <Crown size={16} />
              Premium Membership
            </span>

            <h1 className="membership-hero-title font-heading">
              More Connection.
              <span>More Freedom.</span>
            </h1>

            <p className="membership-hero-description">
              Choose the membership that fits your world. Unlock deeper
              conversations, premium companions, voice experiences, and more.
            </p>

            <div className="membership-hero-actions">

              <a
                href="#membership-plans"
                className="btn btn-primary btn-lg"
              >
                Explore Membership
                <ArrowRight size={18} />
              </a>

              <span className="membership-hero-note">
                Cancel anytime
              </span>

            </div>

          </div>

          <div className="membership-hero-visual">

            <div className="membership-orbit membership-orbit-one" />
            <div className="membership-orbit membership-orbit-two" />

            <div className="membership-hero-card">

              <div className="membership-hero-card-icon">
                <Heart size={30} fill="currentColor" />
              </div>

              <span>Made for connection</span>

              <strong>
                Your world.
                <br />
                Your companion.
              </strong>

            </div>

            <div className="membership-floating-card membership-floating-card-top">
              <Sparkles size={16} />
              <span>Premium Access</span>
            </div>

            <div className="membership-floating-card membership-floating-card-bottom">
              <Users size={16} />
              <span>More Companions</span>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MEMBERSHIP PLANS
      ====================================================== */}

      <section
        className="membership-plans-section"
        id="membership-plans"
      >

        <div className="membership-section-bg" />

        <div className="container">

          <div className="membership-section-header">

            <div>

              <span className="section-eyebrow">
                <Crown size={15} />
                Choose Your Experience
              </span>

              <h2 className="section-title font-heading">
                Find Your Perfect
                <span> Membership</span>
              </h2>

              <p className="section-description">
                Start simple or unlock everything. Every plan gives you a
                more personal way to connect.
              </p>

            </div>


          </div>


          {/* PRICING CARDS */}

          <div className="membership-plans">
            {loading ? (
              <p className="membership-api-message" role="status">
                Loading membership plans…
              </p>
            ) : error ? (
              <div className="membership-api-message" role="alert">
                <span>{error}</span>
                <button
                  type="button"
                  onClick={() => setRetryKey((key) => key + 1)}
                >
                  Try again
                </button>
              </div>
            ) : plans.length === 0 ? (
              <p className="membership-api-message" role="status">
                No membership plans are available right now.
              </p>
            ) : plans.map((plan) => {
              const price = Number(plan.price);
              const formattedPrice = Number.isFinite(price)
                ? new Intl.NumberFormat(undefined, {
                    style: "currency",
                    currency: plan.currency || "USD",
                  }).format(price)
                : `${plan.currency || "USD"} ${plan.price}`;

              return (
                <article
                  key={plan.id}
                  className={`membership-card ${
                    plan.is_popular
                      ? 'membership-card-popular'
                      : ''
                  }`}
                >

                  {plan.is_popular && (
                    <div className="membership-popular">
                      <Star size={14} fill="currentColor" />
                      Most Popular
                    </div>
                  )}

                  <div className="membership-card-inner">

                    <div className="membership-plan-top">

                      <span className="membership-plan-label">
                        {plan.tagline}
                      </span>

                      <h3 className="membership-plan-name font-heading">
                        {plan.name}
                      </h3>

                    </div>


                    <div className="membership-price-row">

                      <span className="membership-price font-heading">
                        {formattedPrice}
                      </span>

                      <span className="membership-period">
                        / {plan.billing_period}
                      </span>

                    </div>


                    <div className="membership-divider" />


                    <ul className="membership-features">

                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="membership-feature"
                        >

                          <span className="membership-check">
                            <Check
                              size={14}
                              strokeWidth={2.8}
                            />
                          </span>

                          <span>{feature}</span>

                        </li>
                      ))}

                    </ul>


                    {authenticated ? (
                      <button
                        type="button"
                        className={`membership-button ${
                          plan.is_popular
                            ? 'membership-button-primary'
                            : ''
                        }`}
                        disabled={currentMembership === plan.slug.toLowerCase()}
                        onClick={() => setSelectionNotice(
                          `The ${plan.name} plan is available to view, but plan changes are not available yet.`
                        )}
                      >
                        {currentMembership === plan.slug.toLowerCase()
                          ? "Current Plan"
                          : `Choose ${plan.name}`}
                        {currentMembership !== plan.slug.toLowerCase() && (
                          <ArrowRight size={17} />
                        )}
                      </button>
                    ) : (
                      <Link
                        to={`/register?plan=${encodeURIComponent(plan.slug)}`}
                        className={`membership-button ${
                          plan.is_popular
                            ? 'membership-button-primary'
                            : ''
                        }`}
                      >
                        {plan.name === "Basic"
                          ? "Get Started"
                          : `Get ${plan.name}`}
                        <ArrowRight size={17} />
                      </Link>
                    )}
                  </div>

                </article>
              );
            })}

          </div>

          {selectionNotice && (
            <p className="membership-selection-notice" role="status">
              {selectionNotice}
            </p>
          )}


          <div className="membership-trust-row">

            <div>
              <ShieldCheck size={25} />
              <span>Secure & Private</span>
            </div>

            <div>
              <Zap size={25} />
              <span>Instant Access</span>
            </div>

            <div>
              <Heart size={25} />
              <span>Cancel Anytime</span>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BENEFITS
      ====================================================== */}

      <section className="membership-benefits-section">

        <div className="container">

          <div className="membership-benefits-header">

            <span className="section-eyebrow">
              Why Join
            </span>

            <h2 className="section-title font-heading">
              Your Membership,
              <span> Your Experience</span>
            </h2>

            <p className="section-description">
              Unlock more ways to connect, communicate, and enjoy your
              personal AI companion experience.
            </p>

          </div>


          <div className="membership-benefits-grid">

            {benefits.map((benefit) => {

              const Icon = benefit.icon;

              return (
                <article
                  className="membership-benefit-card"
                  key={benefit.title}
                >

                  <div className="membership-benefit-icon">
                    <Icon size={24} />
                  </div>

                  <h3 className="font-heading">
                    {benefit.title}
                  </h3>

                  <p>
                    {benefit.description}
                  </p>

                </article>
              );
            })}

          </div>

        </div>

      </section>


      {/* ==   FINAL CTA ==== */}

      <section className="membership-final-section">

        <div className="membership-final-bg" />

        <div className="container membership-final-container">

          <div className="membership-final-content">
            <span className="section-eyebrow">
              Your Experience Starts Here
            </span>

            <h2 className="membership-final-title font-heading">
              Ready To Find
              <span> Your Connection?</span>
            </h2>

            <p>
              Choose your membership and step into a more personal,
              immersive companion experience.
            </p>

            <a
              href="#membership-plans"
              className="btn btn-primary btn-lg"
            >
              Choose Your Plan
              <ArrowRight size={18} />
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}


export default MembershipPlans;