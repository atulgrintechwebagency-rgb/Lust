import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import "./LiveModels.css";

function LiveModels() {
  const sliderRef = useRef(null);

  // Exact data parsing extracted from your client mockup image reference
  const modelsData = [
    {
      id: 1,
      name: "Angelica",
      tagline: "Big Tits",
      action: "Chat Now",
      viewers: "1.2K",
      image: "/Images/Chloe.webp"
    },
    {
      id: 2,
      name: "Kira",
      tagline: "Brunette",
      action: "Private Chat",
      viewers: "842",
      image: "/Images/Luna.webp"
    },
    {
      id: 3,
      name: "Lexi",
      tagline: "Petite",
      action: "Tip Me",
      viewers: "693",
      image: "/Images/aria.webp"
    },
    {
      id: 4,
      name: "Valentina",
      tagline: "Latina",
      action: "Exclusive",
      viewers: "521",
      image: "/Images/Luna.webp"
    },
    {
      id: 5,
      name: "Harper",
      tagline: "Blonde",
      action: "Chat Now",
      viewers: "404",
      image: "/Images/Mia.webp"
    },
    {
      id: 6,
      name: "Sienna",
      tagline: "Tattooed",
      action: "Private Show",
      viewers: "318",
      image: "/Images/aria.webp"
    }
  ];

  // Logic managing swift, smooth carousel scroll actions
  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const step = 174; // Standard visual breakpoint mapping step increment sizes
      sliderRef.current.scrollBy({
        left: direction === "left" ? -step * 2 : step * 2,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="section section-dark live-models-section">
      <div className="container live-models-container-override">
        
        {/* SECTION HEADER BLOCK */}
        <div className="live-models-header flex-between">
          <div className="models-title-wrapper flex items-center">
            <span className="live-indicator-dot-pulsing"></span>
            <h2 className="models-section-title">LIVE MODELS NOW</h2>
            <div className="models-header-line"></div>
          </div>
          
          <Link to="/live-models" className="models-view-all flex items-center">
            <span>View All Live Models</span>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" className="view-all-arrow-icon">
              <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* RESPONSIVE TRACK CONTAINER SYSTEM */}
        <div className="live-models-grid-slider" ref={sliderRef}>
          {modelsData.map((model) => (
              <Link 
                key={model.id} 
                to={`/live-chat/${model.id}`} 
                className="model-showcase-card card overflow-hidden"
              >
              {/* Profile Background Image Graphic Content Layer */}
              <div className="model-image-container h-full w-full">
                <img 
                  src={model.image} 
                  alt={model.name} 
                  className="image-cover model-profile-graphic" 
                />
                <div className="model-vignette-overlay"></div>
              </div>

              {/* TOP FLOATING BADGES OVERLAY SYSTEM */}
              <div className="model-badges-upper absolute w-full flex-between items-center">
                <span className="live-pill-badge-red">LIVE</span>
                <div className="live-viewers-badge flex items-center gap-xs">
                  <Eye size={11} className="viewer-eye-icon" />
                  <span>{model.viewers}</span>
                </div>
              </div>

              {/* BOTTOM PROFILE SPEC DETAILS DESCRIPTION BLOCK */}
              <div className="model-card-details absolute w-full">
                <h3 className="model-profile-name">{model.name}</h3>
                <div className="model-attributes-row flex items-center">
                  <span className="attr-tag">{model.tagline}</span>
                  <span className="attr-separator-dot">•</span>
                  <span className="attr-action-link">{model.action}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* BOTTOM MOBILE CAROUSEL NAV CONTROLS VIEWPORT */}
        <div className="models-mobile-navigation-arrows flex-center">
          <button 
            type="button" 
            className="models-arrow-btn left flex-center"
            onClick={() => scrollSlider("left")}
            aria-label="Swipe slider left"
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>
          <button 
            type="button" 
            className="models-arrow-btn right flex-center"
            onClick={() => scrollSlider("right")}
            aria-label="Swipe slider right"
          >
            <ChevronRight size={20} strokeWidth={2} />
          </button>
        </div>

      </div>
    </section>
  );
}

export default LiveModels;
