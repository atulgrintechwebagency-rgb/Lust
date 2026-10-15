import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsAuthenticated } from "../utils/auth";
import useLikes from "../hooks/useLikes";
import useStripchatModels from "../hooks/useStripchatModels";
import { getModelSlug } from "../utils/modelSlug";
import StripchatApiSkeleton from "./StripchatApiSkeleton";
import "./AiCompanions.css";

function AiCompanions({ limit }) {
  const scrollContainerRef = useRef(null);
  const authenticated = useIsAuthenticated();
  const location = useLocation();
  const navigate = useNavigate();
  const { models, loading, error, retry } = useStripchatModels();

  const likesState = useLikes();
  const displayedCompanions = limit ? models.slice(0, limit) : models;

  const toggleFavorite = (id, event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!authenticated) {
      window.dispatchEvent(
        new CustomEvent("auth-change", {
          detail: { message: "Sign in to save favorites." },
        })
      );
      navigate("/login", { state: { from: location } });
      return;
    }

    likesState.toggleLike(id);
  };

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;

      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
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

          {loading ? (
            <StripchatApiSkeleton
              variant="carousel"
              count={limit || 6}
            />
          ) : error ? (
            <div className="companions-api-message" role="alert">
              <span>{error}</span>
              <button type="button" onClick={retry}>Try again</button>
            </div>
          ) : displayedCompanions.length === 0 ? (
            <p className="companions-api-message" role="status">
              No companions are available right now.
            </p>
          ) : displayedCompanions.map((companion) => (

            <Link
              key={companion.id}
              to={
                authenticated
                  ? `/companions/${
                      getModelSlug(companion.name) || companion.id
                    }`
                  : "/login"
              }
              className={`companion-card card overflow-hidden ${
                authenticated ? "" : "guest-locked-card"
              }`}
            >

              {/* IMAGE */}
              <div className="companion-image-wrapper h-full w-full">

                <img
                  src={companion.image}
                  alt={authenticated ? companion.name : "Blurred companion preview"}
                  className={`image-cover companion-profile-img ${
                    authenticated ? "" : "guest-blurred-image"
                  }`}
                />

                {!authenticated && (
                  <div className="guest-image-overlay">
                    <span>Sign in to view</span>
                  </div>
                )}

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
                      {companion.type}
                    </p>

                  </div>


                  {/* FAVORITE */}
                  <button
                    type="button"
                    className={`favorite-action-btn flex-center ${
                      likesState.likedIds.has(String(companion.id))
                        ? "is-liked"
                        : ""
                    }`}
                    onClick={(e) =>
                      toggleFavorite(companion.id, e)
                    }
                    aria-label={
                      authenticated
                        ? likesState.likedIds.has(String(companion.id))
                          ? `Remove ${companion.name} from favorites`
                          : `Add ${companion.name} to favorites`
                        : `Sign in to add ${companion.name} to favorites`
                    }
                    aria-pressed={likesState.likedIds.has(String(companion.id))}
                    disabled={likesState.pendingIds.has(String(companion.id))}
                  >

                    <Heart
                      size={25}
                      fill={
                        likesState.likedIds.has(String(companion.id))
                          ? "var(--color-primary)"
                          : "transparent"
                      }
                      strokeWidth={1.8}
                    />

                  </button>

                </div>


                {/* ONLINE STATUS */}
                <div className="status-badge flex items-center gap-xs">

                  <span className="status-dot-pulse"></span>

                  <span className="status-text-label">
                    Online
                  </span>

                </div>

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