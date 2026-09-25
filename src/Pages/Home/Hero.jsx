import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Infinity,
  ShieldCheck,
  Heart,
  Zap,
  Check,
} from 'lucide-react';

import './Hero.css';

// 1. DATA COLLECTION SETUP FOR SLIDESHOW LAYOUTS
const SLIDER_DATA = [
  {
    image: "/Images/Hero.webp", // First slider layer
    eyebrow: "Real Connections. Anytime.",
    titleTextFirst: "Live Freely",
    titleTextAccent: "Connect Your Way",
    description: "Chat with AI companions, watch live models, and enjoy exclusive content – all in one place.",
    neonText: <>Good<br />Girls<br />Play<br />Here</>
  },
  {
    image: "/Images/Hero1.webp", // Second variant slider layer (Add your asset here)
    eyebrow: "Premium AI Interactions.",
    titleTextFirst: "Meet Your",
    titleTextAccent: "AI Companion.",
    description: "Deep, intimate, and unconditional connections customized fully to match your unique desires.",
    neonText: <>Chat<br />Live<br />With<br />Me</>
  },
  {
    image: "/Images/membership-promo-model.webp", // Third variant slider layer (Add your asset here)
    eyebrow: "Unrestricted Passions.",
    titleTextFirst: "Explore",
    titleTextAccent: "Your Fantasies",
    description: "Discrete, one-on-one virtual companion networks running 24/7 without judgment.",
    neonText: <>Always<br />Waiting<br />For<br />You</>
  }
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 2. AUTOMATIC CYCLE RUNNING ENGINE (5 Second Interval Track)
  useEffect(() => {
    const slideTimer = setInterval(() => {
      handleNextSlide();
    }, 4000);

    return () => clearInterval(slideTimer);
  }, [currentSlide]);

  const handleNextSlide = () => {
    setIsTransitioning(true);
    // Timeout matches standard transition delays perfectly before swapping state channels
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === SLIDER_DATA.length - 1 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 3000); // Trigger backdrop transition sequence gracefully
  };

  const currentSlideData = SLIDER_DATA[currentSlide];

  return (
    <section className="hero-section overflow-hidden relative">

      {/* =====================================================
          SLIDER BACKGROUND LAYERS (CROSS-FADE ANIMATION)
      ====================================================== */}
      <div className="hero-bg-wrapper absolute inset-0">
        {SLIDER_DATA.map((slide, idx) => (
          <img
            key={idx}
            src={slide.image}
            alt={`Lust Companion Background Layer ${idx + 1}`}
            className={`hero-background-image image-cover absolute inset-0 w-full h-full ${
              idx === currentSlide ? 'active' : 'inactive'
            }`}
          />
        ))}
        {/* Unified text layout protection veil */}
        <div className="hero-gradient-overlay" />
      </div>

      {/* =====================================================
          MAIN LAYOUT CONTAINER
      ====================================================== */}
      <div className="container hero-container relative">
        <div className="hero-main-layout">

          {/* =================================================
              LEFT CORE TYPOGRAPHY PANELS (ANIMATED ENTRIES)
          ================================================== */}
          <div key={`left-${currentSlide}`} className="hero-content-wrapper animated-fade-in-up">

            <div className="hero-custom-eyebrow font-body text-uppercase">
              {currentSlideData.eyebrow}
            </div>

            <h1 className="hero-title font-heading text-white">
              {currentSlideData.titleTextFirst}<br />
              <span className="text-primary">{currentSlideData.titleTextAccent}</span>
            </h1>

            <p className="hero-description font-body">
              {currentSlideData.description}
            </p>

            {/* CALL TO ACTION ROUTINES */}
            <div className="hero-actions-group">
              <a
                href="/live-models"
                className="btn btn-lg btn-primary hero-btn-chat"
              >
                <span>Get Started</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </a>

              <a
                href="/companions"
                className="btn btn-lg btn-outline hero-btn-explore"
              >
                Browse Models
              </a>
            </div>

            {/* VALUE BULLET POINT HUD ROW */}
            <div className="hero-trust-bullets-row flex items-center">
              <div className="trust-bullet flex items-center">
                <Check size={14} className="text-primary" strokeWidth={3} />
                <span>Discreet & Secure</span>
              </div>
              <div className="trust-bullet flex items-center">
                <Check size={14} className="text-primary" strokeWidth={3} />
                <span>18+ Only</span>
              </div>
              <div className="trust-bullet flex items-center">
                <Check size={14} className="text-primary" strokeWidth={3} />
                <span>24/7 Access</span>
              </div>
            </div>

          </div>

          {/* =================================================
              RIGHT VISUAL FLOATING CARD STACK
          ================================================== */}
          <div className="hero-visual-container">

            {/* FLOATING SIGNATURE NEON LOGO ELEMENT */}
            <div key={`right-${currentSlide}`} className="floating-badge badge-neon animated-neon-scale">
              <p className="neon-text">
                {currentSlideData.neonText}
              </p>
              <Heart
                size={34}
                strokeWidth={1.5}
                className="neon-heart"
                fill="none"
              />
            </div>

          </div>

        </div>

        {/* =====================================================
            SLIDER PAGINATION DOT INDICATORS
        ====================================================== */}
        <div className="slider-dots-container flex items-center gap-xs">
          {SLIDER_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentSlide(idx);
              }}
              className={`slider-dot-indicator ${idx === currentSlide ? 'active' : ''}`}
              aria-label={`Navigate direct to display frame slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

      {/* =====================================================
          PRE-FOOTER REDIRECT NAVIGATION BAR
      ====================================================== */}
      <div className="hero-features-bar">
        <div className="container">
          <div className="features-grid-layout">

            {/* PANEL 1 */}
            <a href="/companions" className="feature-item-box-link card">
              <div className="feature-item-box">
                <Infinity size={24} strokeWidth={2.2} className="feature-icon text-primary" />
                <div className="feature-text-block">
                  <span className="feature-main-title">AI COMPANIONS</span>
                  <span className="feature-sub-desc">Flirt, chat, and create your perfect companion.</span>
                </div>
                <span className="feature-arrow-indicator">›</span>
              </div>
            </a>

            {/* PANEL 2 */}
            <a href="/live" className="feature-item-box-link card">
              <div className="feature-item-box">
                <Zap size={24} strokeWidth={2.2} className="feature-icon text-primary" />
                <div className="feature-text-block">
                  <span className="feature-main-title">LIVE MODELS</span>
                  <span className="feature-sub-desc">Watch and chat with real models, live now.</span>
                </div>
                <span className="feature-arrow-indicator">›</span>
              </div>
            </a>

            {/* PANEL 3 */}
            <a href="/membership" className="feature-item-box-link card">
              <div className="feature-item-box">
                <ShieldCheck size={24} strokeWidth={2.2} className="feature-icon text-primary" />
                <div className="feature-text-block">
                  <span className="feature-main-title">PREMIUM MEMBERSHIP</span>
                  <span className="feature-sub-desc">Unlock exclusive content and special features.</span>
                </div>
                <span className="feature-arrow-indicator">›</span>
              </div>
            </a>

            {/* PANEL 4 */}
            <a href="/shop" className="feature-item-box-link card">
              <div className="feature-item-box">
                <Heart size={24} strokeWidth={2.2} className="feature-icon text-primary" />
                <div className="feature-text-block">
                  <span className="feature-main-title">MERCHANDISE</span>
                  <span className="feature-sub-desc">Show your passion with official gear.</span>
                </div>
                <span className="feature-arrow-indicator">›</span>
              </div>
            </a>

          </div>
        </div>
      </div>

    </section>
  );
}

export default Hero;
