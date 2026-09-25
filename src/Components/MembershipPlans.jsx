import React, { useState } from 'react';
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

import './MembershipPlans.css';

const plans = [
  {
    name: 'Basic',
    label: 'Start Exploring',

    monthlyPrice: '9.99',
    yearlyPrice: '7.99',

    features: [
      'Chat with AI companions',
      'Limited voice notes',
      'Standard models',
      'Access to selected companions',
    ],

    monthlyButton: 'Get Started',
    yearlyButton: 'Get Started',
  },

  {
    name: 'Premium',
    label: 'Most Loved',

    monthlyPrice: '19.99',
    yearlyPrice: '14.99',

    features: [
      'Unlimited chat & voice notes',
      'Access to all companions',
      'Exclusive roleplay scenarios',
      'Priority experience',
      'Premium companion access',
    ],

    monthlyButton: 'Get Premium',
    yearlyButton: 'Get Premium',

    popular: true,
  },

  {
    name: 'Elite',
    label: 'Ultimate Access',

    monthlyPrice: '39.99',
    yearlyPrice: '29.99',

    features: [
      'All Premium features',
      'Early access to new models',
      'Custom companion requests',
      'VIP support',
      'Exclusive experiences',
    ],

    monthlyButton: 'Go Elite',
    yearlyButton: 'Go Elite',
  },
];

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

const comparisonFeatures = [
  {
    label: 'AI Companion Chat',
    basic: true,
    premium: true,
    elite: true,
  },
  {
    label: 'Voice Notes',
    basic: 'Limited',
    premium: 'Unlimited',
    elite: 'Unlimited',
  },
  {
    label: 'Companion Access',
    basic: 'Selected',
    premium: 'All',
    elite: 'All',
  },
  {
    label: 'Exclusive Scenarios',
    basic: false,
    premium: true,
    elite: true,
  },
  {
    label: 'Early Model Access',
    basic: false,
    premium: false,
    elite: true,
  },
  {
    label: 'Custom Companion Requests',
    basic: false,
    premium: false,
    elite: true,
  },
  {
    label: 'VIP Support',
    basic: false,
    premium: false,
    elite: true,
  },
];

function MembershipPlans() {
  const [billing, setBilling] = useState('monthly');

  const isYearly = billing === 'yearly';

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


            <div className="membership-billing-wrapper">

              <span className="membership-save-badge">
                Save up to 50%
              </span>

              <div
                className="membership-toggle"
                role="group"
                aria-label="Billing frequency"
              >

                <button
                  type="button"
                  className={`membership-toggle-btn ${
                    billing === 'monthly' ? 'active' : ''
                  }`}
                  onClick={() => setBilling('monthly')}
                  aria-pressed={billing === 'monthly'}
                >
                  Monthly
                </button>

                <button
                  type="button"
                  className={`membership-toggle-btn ${
                    billing === 'yearly' ? 'active' : ''
                  }`}
                  onClick={() => setBilling('yearly')}
                  aria-pressed={billing === 'yearly'}
                >
                  Yearly
                  <span>Save</span>
                </button>

              </div>

            </div>

          </div>


          {/* PRICING CARDS */}

          <div className="membership-plans">

            {plans.map((plan) => {

              const currentPrice = isYearly
                ? plan.yearlyPrice
                : plan.monthlyPrice;

              const currentButton = isYearly
                ? plan.yearlyButton
                : plan.monthlyButton;

              return (
                <article
                  key={plan.name}
                  className={`membership-card ${
                    plan.popular
                      ? 'membership-card-popular'
                      : ''
                  }`}
                >

                  {plan.popular && (
                    <div className="membership-popular">
                      <Star size={14} fill="currentColor" />
                      Most Popular
                    </div>
                  )}

                  <div className="membership-card-inner">

                    <div className="membership-plan-top">

                      <span className="membership-plan-label">
                        {plan.label}
                      </span>

                      <h3 className="membership-plan-name font-heading">
                        {plan.name}
                      </h3>

                    </div>


                    <div className="membership-price-row">

                      <span className="membership-price font-heading">
                        ${currentPrice}
                      </span>

                      <span className="membership-period">
                        / month
                      </span>

                    </div>


                    {isYearly && (
                      <p className="membership-yearly-note">
                        Billed annually
                      </p>
                    )}


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


                    <a
                      href="/signup"
                      className={`membership-button ${
                        plan.popular
                          ? 'membership-button-primary'
                          : ''
                      }`}
                    >
                      {currentButton}
                      <ArrowRight size={17} />
                    </a>

                  </div>

                </article>
              );
            })}

          </div>


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


function ComparisonValue({ value }) {

  if (value === true) {
    return (
      <span className="comparison-check">
        <Check size={15} />
      </span>
    );
  }

  if (value === false) {
    return (
      <span className="comparison-dash">
        —
      </span>
    );
  }

  return (
    <span className="comparison-text">
      {value}
    </span>
  );
}


export default MembershipPlans;