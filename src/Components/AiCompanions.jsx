import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import "./AiCompanions.css";

function AiCompanions({ limit }) {
  const scrollContainerRef = useRef(null);

  const companionsData = [
    {
      id: "sophie",
      name: "Sophie",
      tagline: "The Sweetheart",
      image: "/Images/aria.webp",
      isOnline: true,
    },
    {
      id: "mia",
      name: "Mia",
      tagline: "The Tease",
      image: "/Images/Mia.webp",
      isOnline: true,
    },
    {
      id: "luna",
      name: "Luna",
      tagline: "The Adventurer",
      image: "/Images/Luna.webp",
      isOnline: true,
    },
    {
      id: "aria",
      name: "Aria",
      tagline: "The Dreamer",
      image: "/Images/aria.webp",
      isOnline: true,
    },
    {
      id: "nina",
      name: "Nina",
      tagline: "The Wild One",
      image: "/Images/Luna.webp",
      isOnline: true,
    },
    {
      id: "chloe",
      name: "Chloe",
      tagline: "The Girl Next Door",
      image: "/Images/Chloe.webp",
      isOnline: true,
    },
  ];

  const [favorites, setFavorites] = useState({});

  /*
   * If limit is provided:
   *   <AiCompanions limit={4} />
   *
   * only the first 4 companions are displayed.
   *
   * If no limit is provided:
   *   <AiCompanions />
   *
   * all companions are displayed.
   */
  const displayedCompanions = limit
    ? companionsData.slice(0, limit)
    : companionsData;

  const toggleFavorite = (id, event) => {
    event.preventDefault();
    event.stopPropagation();

    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const cardWidth = 174;

      const scrollAmount =
        direction === "left"
          ? -cardWidth * 2
          : cardWidth * 2;

      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="section section-dark companions-section">
      <div className="container responsive-container-override">

        {/* =========================
            SECTION HEADER
        ========================== */}
        <div className="companions-header flex-between">

          <div className="header-title-wrapper flex items-center">
            <h2 className="section-title-custom">
              AI COMPANIONS
            </h2>

            <div className="header-decorator-line"></div>
          </div>

          {/* Always goes to ALL companions page */}
          <Link
            to="/companions"
            className="view-all-link flex items-center"
          >
            <span>View All</span>

            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              className="view-all-arrow"
            >
              <path
                d="M1 9L5 5L1 1"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

        </div>


        {/* =========================
            COMPANIONS
        ========================== */}
        <div
          className="companions-grid-slider-track"
          ref={scrollContainerRef}
        >

          {displayedCompanions.map((companion) => (

            <Link
              key={companion.id}
              to={`/Companions/${companion.id}`}
              className="companion-card card overflow-hidden"
            >

              {/* IMAGE */}
              <div className="companion-image-wrapper h-full w-full">

                <img
                  src={companion.image}
                  alt={companion.name}
                  className="image-cover companion-profile-img"
                />

                <div className="card-ambient-overlay"></div>

              </div>


              {/* CONTENT */}
              <div className="companion-card-details absolute w-full">

                <div className="details-header flex-between items-center w-full">

                  <div className="name-meta-info">

                    <h3 className="companion-name">
                      {companion.name}
                    </h3>

                    <p className="companion-tagline">
                      {companion.tagline}
                    </p>

                  </div>


                  {/* FAVORITE */}
                  <button
                    type="button"
                    className={`favorite-action-btn flex-center ${
                      favorites[companion.id]
                        ? "is-liked"
                        : ""
                    }`}
                    onClick={(e) =>
                      toggleFavorite(companion.id, e)
                    }
                    aria-label={`Add ${companion.name} to favorites`}
                  >

                    <Heart
                      size={25}
                      fill={
                        favorites[companion.id]
                          ? "var(--color-primary)"
                          : "transparent"
                      }
                      strokeWidth={1.8}
                    />

                  </button>

                </div>


                {/* ONLINE STATUS */}
                {companion.isOnline && (
                  <div className="status-badge flex items-center gap-xs">

                    <span className="status-dot-pulse"></span>

                    <span className="status-text-label">
                      Online
                    </span>

                  </div>
                )}

              </div>

            </Link>

          ))}

        </div>


        {/* =========================
            MOBILE CONTROLS
        ========================== */}
        <div className="slider-mobile-controls flex-center">

          <button
            type="button"
            className="slider-control-btn left flex-center"
            onClick={() => handleScroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft
              size={20}
              strokeWidth={2}
            />
          </button>

          <button
            type="button"
            className="slider-control-btn right flex-center"
            onClick={() => handleScroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight
              size={20}
              strokeWidth={2}
            />
          </button>

        </div>

      </div>
    </section>
  );
}

export default AiCompanions;