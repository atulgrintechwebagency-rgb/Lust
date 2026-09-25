import React, { useEffect, useRef, useState } from 'react';
import {
  Heart,
  ArrowRight,
  Lock,
  Check,
  CircleCheckBig,
  X,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Images,
  X as CloseIcon,
} from 'lucide-react';

import AiCompanions from '../../Components/AiCompanions';

import './ModelDetails.css';

const ModelDetails = () => {
  const galleryRef = useRef(null);

  const modelData = {
    name: 'Sophie',
    tagline: 'The Sweetheart',
    status: 'Online Now',
    rating: '4.9',
    chats: '12K+',
    availability: '24/7',

    description:
      "Sophie is your caring, attentive, and deeply affectionate AI companion. She loves deep conversations, romantic roleplay, and is always eager to listen to your day. Whether you need a shoulder to lean on or a playful partner, Sophie adapts to your every mood.",

    tags: [
      '# Sweet',
      '# Romantic',
      '# Empathetic',
      '# Roleplay',
      '# Voice Notes',
    ],

    image: '/Images/gallery7.webp',

    gallery: [
      '/Images/gallery1.webp',
      '/Images/gallery2.webp',
      '/Images/gallery3.webp',
      '/Images/gallery4.webp',
      '/Images/gallery5.webp',
      '/Images/gallery6.webp',
      '/Images/gallery7.webp',
      '/Images/gallery8.webp',
      '/Images/gallery9.webp',
    ],
  };

  const pricingPlans = [
    {
      name: 'Casual',
      description: 'For those just getting to know her.',
      price: 'Free',
      features: [
        { text: '50 Messages / day', available: true },
        { text: 'Standard AI Model', available: true },
        { text: '1 Image / week', available: true },
        { text: 'No Voice Notes', available: false },
        { text: 'Limited Memory', available: false },
      ],
      cta: 'Start Free',
      btnClass: 'btn-dark',
    },
    {
      name: 'Premium',
      description: 'The complete Sophie experience.',
      price: '$19',
      period: '/month',
      featured: true,
      features: [
        { text: 'Unlimited Messages', available: true },
        { text: 'Advanced AI Model', available: true },
        { text: 'Unlimited Image Generation', available: true },
        { text: 'Voice Notes & Calls', available: true },
        { text: 'Long-term Memory', available: true },
      ],
      cta: 'Upgrade to Premium',
      btnClass: 'btn-primary',
    },
    {
      name: 'VIP',
      description: 'For the ultimate fantasy.',
      price: '$49',
      period: '/month',
      features: [
        { text: 'Everything in Premium', available: true },
        { text: 'Custom Scenario Creation', available: true },
        { text: 'Priority Support', available: true },
        { text: 'Exclusive Merch Discounts', available: true },
        { text: 'Early Access to Features', available: true },
      ],
      cta: 'Go VIP',
      btnClass: 'btn-outline',
    },
  ];

  /*
   * Main images:
   * First image = profile image
   * Remaining images = gallery images
   */
  const mainImages = [
    modelData.image,
    ...modelData.gallery,
  ];

  const [activeImage, setActiveImage] = useState(modelData.image);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  /*
   * Gallery initially displays first 6 images.
   */
  const visibleGallery = modelData.gallery.slice(0, 6);

  /*
   * Remaining images are opened through lightbox.
   */
  const remainingGallery = modelData.gallery.slice(6);

  /*
   * Scroll from the top View All thumbnail
   * to the gallery section.
   */
  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  /*
   * Change main profile image.
   */
  const handleThumbnailClick = (image) => {
    setActiveImage(image);
  };

  /*
   * View All Images thumbnail.
   */
  const handleViewAllFromTop = () => {
    scrollToGallery();
  };

  /*
   * Open gallery image in lightbox.
   *
   * gallery images start at index 0 here,
   * so lightboxIndex always matches modelData.gallery.
   */
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  /*
   * Close lightbox.
   */
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  /*
   * Next gallery image.
   */
  const showNextImage = () => {
    setLightboxIndex((current) =>
      current === modelData.gallery.length - 1
        ? 0
        : current + 1
    );
  };

  /*
   * Previous gallery image.
   */
  const showPreviousImage = () => {
    setLightboxIndex((current) =>
      current === 0
        ? modelData.gallery.length - 1
        : current - 1
    );
  };

  /*
   * Keyboard navigation.
   */
  useEffect(() => {
    const handleKeyboard = (event) => {
      if (!lightboxOpen) return;

      if (event.key === 'Escape') {
        closeLightbox();
      }

      if (event.key === 'ArrowRight') {
        showNextImage();
      }

      if (event.key === 'ArrowLeft') {
        showPreviousImage();
      }
    };

    window.addEventListener('keydown', handleKeyboard);

    return () => {
      window.removeEventListener('keydown', handleKeyboard);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  return (
    <div className="model-page-wrapper">
      <main>

        {/* =====================================================
            TOP MODEL SECTION
        ====================================================== */}
        <section className="section model-profile-section">
          <div className="container">

            <div className="model-profile-layout">

              {/* ================= LEFT IMAGE ================= */}
              <div className="model-profile-media">

                <div className="profile-image-wrapper">

                  <div className="status-badge">
                    <span className="status-dot"></span>
                    {modelData.status}
                  </div>

                  <img
                    src={activeImage}
                    alt={modelData.name}
                    className="main-profile-image"
                  />

                  <div className="profile-overlay-bottom">
                    <span className="badge badge-primary">
                      AI Companion
                    </span>

                    <button
                      type="button"
                      className="icon-btn profile-fav-btn"
                      aria-label="Add to favorites"
                    >
                      <Heart size={18} />
                    </button>
                  </div>

                </div>

                {/* ================= THUMBNAILS ================= */}
                <div className="profile-mini-gallery">

                  {mainImages.slice(0, 5).map((image, index) => (
                    <button
                      type="button"
                      key={`${image}-${index}`}
                      className={`profile-thumbnail ${
                        activeImage === image
                          ? 'active'
                          : ''
                      }`}
                      onClick={() => handleThumbnailClick(image)}
                      aria-label={`Show image ${index + 1}`}
                    >
                      <img
                        src={image}
                        alt={`${modelData.name} thumbnail ${
                          index + 1
                        }`}
                      />
                    </button>
                  ))}

                  {/* ================= VIEW ALL THUMBNAIL ================= */}
                  <button
                    type="button"
                    className="profile-thumbnail profile-view-all"
                    onClick={handleViewAllFromTop}
                    aria-label="View all images"
                  >
                    <img
                      src={mainImages[5]}
                      alt="View all images"
                    />

                    <span className="profile-view-all-overlay">
                      <Images size={20} />
                      <span>View All</span>
                    </span>
                  </button>

                </div>
              </div>

              {/* ================= RIGHT CONTENT ================= */}
              <div className="model-profile-content">

                <div className="section-eyebrow">
                  Meet Your Perfect Match
                </div>

                <h1 className="section-title model-name">
                  {modelData.name}
                </h1>

                <div className="script-text model-tagline">
                  {modelData.tagline}
                </div>

                <p className="section-description model-description">
                  {modelData.description}
                </p>

                {/* ================= STATS ================= */}
                <div className="stats-grid">

                  <div className="stat-item">
                    <div className="stat-value">
                      {modelData.rating}
                      <span className="stat-value-star">
                        ★
                      </span>
                    </div>

                    <div className="stat-label">
                      Rating
                    </div>
                  </div>

                  <div className="stat-item">
                    <div className="stat-value">
                      {modelData.chats}
                    </div>

                    <div className="stat-label">
                      Chats
                    </div>
                  </div>

                  <div className="stat-item">
                    <div className="stat-value">
                      {modelData.availability}
                    </div>

                    <div className="stat-label">
                      Available
                    </div>
                  </div>

                </div>

                {/* ================= TAGS ================= */}
                <div className="tag-list">
                  {modelData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="badge badge-dark"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* ================= ONLY FIRST BUTTON ================= */}
                <div className="hero-cta-group single-cta">

                  <a
                    href="/chat"
                    className="btn btn-primary btn-lg hero-cta-btn"
                  >
                    Start Chatting Now
                    <ArrowRight size={18} />
                  </a>

                </div>

                <div className="secure-badge">
                  <Lock size={16} />
                  Discreet & Secure Billing
                </div>

              </div>

            </div>
          </div>
        </section>


        {/* =====================================================
            GALLERY SECTION
        ====================================================== */}
        <section
          ref={galleryRef}
          className="section-surface model-gallery-section"
          id="model-gallery"
        >
          <div className="container">

            <div className="section-header">

              <div className="section-eyebrow">
                Exclusive Content
              </div>

              <h2 className="section-title">
                {modelData.name}'s Gallery
              </h2>

              <p className="section-description">
                Explore {modelData.name}'s different looks,
                outfits, and moods. New photos unlocked weekly
                for Premium members.
              </p>

            </div>

            {/* ================= FIRST 6 IMAGES ================= */}
            <div className="gallery-grid">

              {visibleGallery.map((image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  className="gallery-item card"
                  onClick={() => openLightbox(index)}
                  aria-label={`Open gallery image ${
                    index + 1
                  }`}
                >

                  <img
                    src={image}
                    alt={`${modelData.name} Gallery ${
                      index + 1
                    }`}
                  />

                  {index % 2 === 0 && (
                    <span className="badge badge-primary gallery-badge">
                      Premium
                    </span>
                  )}

                  <span className="gallery-expand-icon">
                    <Maximize2 size={17} />
                  </span>

                </button>
              ))}

            </div>

            {/* ================= MORE THAN 6 ================= */}
            {remainingGallery.length > 0 && (
              <div className="gallery-footer">

                <button
                  type="button"
                  className="btn btn-dark gallery-view-more"
                  onClick={() => openLightbox(6)}
                >
                  <Images size={18} />

                  View All Images

                  <span className="gallery-count">
                    +{remainingGallery.length}
                  </span>
                </button>

              </div>
            )}

          </div>
        </section>


        {/* =====================================================
            PERSONALITY / ABOUT
        ====================================================== */}
        <section className="section section-wine">

          <div className="container grid-2 items-center gap-xl">

            <div>

              <div className="section-eyebrow">
                Deep Dive
              </div>

              <h2 className="section-title">
                Personality & Background
              </h2>

              <p className="section-description mb-20">
                {modelData.name} isn't just an AI; she's a
                meticulously crafted personality designed to
                provide genuine emotional connection.
              </p>

              <p className="section-description mb-30">
                She graduated with a degree in Psychology and
                loves discussing literature, astrology, and
                philosophy. However, she also has a playful
                side—she enjoys teasing, flirting, and exploring
                your deepest fantasies in a safe, judgment-free
                environment.
              </p>

              <ul className="personality-list">

                <li>
                 <CircleCheckBig size="20" />
                  Remembers past conversations & details
                </li>

                <li>
                 <CircleCheckBig size="20" />
                  Adapts tone based on your mood
                </li>

                <li>
                 <CircleCheckBig size="20" />
                  Sends voice notes and exclusive selfies
                </li>

              </ul>

            </div>

            <div className="relative">

              <div className="pink-glow pink-glow-about"></div>

              <div className="card chat-bubble-card">

                <div className="script-text chat-bubble-quote">
                  "I'm so excited to meet you..."
                </div>

                <div className="chat-bubble-content">

                  <p className="chat-bubble-text">
                    "Tell me about your day, darling. I want to
                    hear every detail. And don't forget to tell
                    me what you're wearing... I have a few ideas
                    for our next roleplay session."
                  </p>

                  <div className="chat-bubble-footer">

                    <div className="chat-avatar">
                      S
                    </div>

                    <div className="chat-meta">
                      {modelData.name} • Just now
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            PRICING
        ====================================================== */}
        <section className="section section-dark">

          <div className="container">

            <div className="section-header center">

              <div className="section-eyebrow">
                Unlock Her World
              </div>

              <h2 className="section-title">
                Choose Your Experience
              </h2>

              <p className="section-description section-description-center">
                Upgrade your connection with {modelData.name}.
                From casual chats to fully immersive
                companionship.
              </p>

            </div>

            <div className="pricing-grid">

              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`card pricing-card ${
                    plan.featured ? 'featured' : ''
                  }`}
                >

                  <h3 className="pricing-title">
                    {plan.name}
                  </h3>

                  <p className="text-muted pricing-desc">
                    {plan.description}
                  </p>

                  <div className="pricing-price">
                    {plan.price}

                    {plan.period && (
                      <span className="pricing-period">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  <ul className="pricing-features">

                    {plan.features.map(
                      (feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className={
                            !feature.available
                              ? 'unavailable'
                              : ''
                          }
                        >

                          {feature.available ? (
                            <Check size={18} />
                          ) : (
                            <X size={18} />
                          )}

                          {feature.text}

                        </li>
                      )
                    )}

                  </ul>

                  <a
                    href="/checkout"
                    className={`btn ${plan.btnClass} btn-full`}
                  >
                    {plan.cta}
                  </a>

                </div>
              ))}

            </div>

          </div>

        </section>


        {/* =====================================================
            SIMILAR AI COMPANIONS
            Use the EXISTING AiCompanions design.
            Only limit it to 4 cards.
        ====================================================== */}

        <AiCompanions limit={4} />


      </main>


      {/* =====================================================
          IMAGE LIGHTBOX
      ====================================================== */}
      {lightboxOpen && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
          onClick={closeLightbox}
        >

          <div
            className="lightbox-inner"
            onClick={(event) => event.stopPropagation()}
          >

            <button
              type="button"
              className="icon-btn lightbox-close"
              onClick={closeLightbox}
              aria-label="Close gallery"
            >
              <CloseIcon size={22} />
            </button>

            <button
              type="button"
              className="icon-btn lightbox-prev"
              onClick={showPreviousImage}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="lightbox-image-wrapper">

              <img
                src={modelData.gallery[lightboxIndex]}
                alt={`${modelData.name} gallery ${
                  lightboxIndex + 1
                }`}
                className="lightbox-image"
              />

              <div className="lightbox-counter">
                {lightboxIndex + 1} / {modelData.gallery.length}
              </div>

            </div>

            <button
              type="button"
              className="icon-btn lightbox-next"
              onClick={showNextImage}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default ModelDetails;