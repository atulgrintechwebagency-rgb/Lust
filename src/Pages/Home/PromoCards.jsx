import React from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import "./PromoCards.css";

function PromoCards() {
  // Membership benefits checklist items array
  const membershipFeatures = [
    "Unlimited AI chats",
    "Access to exclusive models",
    "Special content & discounts",
    "Early access to new features"
  ];

  // Merchandise features checklist items array
  const merchFeatures = [
    "Apparel & accessories",
    "Discreet shipping",
    "Exclusive designs",
    "Show your support"
  ];

  return (
    <section className="section section-dark promo-cards-section">
      <div className="container">
        <div className="promo-cards-grid">
          
          {/* =========================================================
              CARD 1: PREMIUM MEMBERSHIP
             ========================================================= */}
          <div className="promo-card premium-membership-card card overflow-hidden">
            <div className="promo-card-content">
              {/* Header block with Crown Logo */}
              <div className="promo-card-header flex items-center">
                <div className="promo-icon-wrapper crown-icon">
                  <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://w3.org">
                    <path d="M2 22H26M4 18L2 6L9 11L14 3L19 11L26 6L24 18H4Z" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="promo-title-wrapper">
                  <h3 className="promo-card-title">PREMIUM MEMBERSHIP</h3>
                  <p className="promo-card-subtitle">Get more. Experience deeper connections.</p>
                </div>
              </div>

              {/* Benefits Checklist layout */}
              <ul className="promo-features-list">
                {membershipFeatures.map((feature, index) => (
                  <li key={index} className="promo-feature-item flex items-center gap-sm">
                    <Check size={16} className="promo-check-icon" strokeWidth={3} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <Link to="/membership" className="btn btn-primary btn-full promo-action-btn">
                Join Now
              </Link>
            </div>

            {/* Visual Design Layer: Graphic Asset Background and Glowing Neon Text */}
            <div className="promo-visual-wrapper membership-visual">
              <div className="membership-bg-graphic">
                <img src="/Images/membership-promo-model.webp" alt="" className="image-cover" />
              </div>
              <div className="neon-text-wrapper absolute">
                <span className="font-script script-text neon-line-1">Members</span>
                <span className="font-script script-text neon-line-2">Get More</span>
                <div className="neon-heart flex-center">
                  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://w3.org">
                    <path d="M9 15L1.875 7.875C-0.25 5.75 -0.25 2.125 1.875 0C4 2.125 5.75 3.5 9 6.5C12.25 3.5 14 2.125 16.125 0C18.25 2.125 18.25 5.75 16.125 7.875L9 15Z" fill="currentColor"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================
              CARD 2: LUST COMPANION MERCH
             ========================================================= */}
          <div className="promo-card merch-showcase-card card overflow-hidden">
            <div className="promo-card-content">
              {/* Header block with Shopping Bag Logo */}
              <div className="promo-card-header flex items-center">
                <div className="promo-icon-wrapper bag-icon">
                  <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://w3.org">
                    <path d="M1 7H23V25H1V7ZM6 10V5C6 2.23858 8.23858 0 11 0C13.7614 0 16 2.23858 16 5V10" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="promo-title-wrapper">
                  <h3 className="promo-card-title">LUST COMPANION MERCH</h3>
                  <p className="promo-card-subtitle">Wear your desire.</p>
                </div>
              </div>

              {/* Benefits Checklist layout */}
              <ul className="promo-features-list">
                {merchFeatures.map((feature, index) => (
                  <li key={index} className="promo-feature-item flex items-center gap-sm">
                    <Check size={16} className="promo-check-icon" strokeWidth={3} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <Link to="/shop" className="btn btn-primary btn-full promo-action-btn">
                Shop Now
              </Link>
            </div>

            {/* Visual Design Layer: Hoodie & Cap Mockup Graphic display */}
            <div className="promo-visual-wrapper merch-visual flex-center">
              <div className="merch-products-display relative w-full h-full">
                <img src="/Images/merch-hoodie.webp" alt="Lust Companion Premium Hoodie" className="merch-img-hoodie absolute" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default PromoCards;
