import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useIsAuthenticated } from "../../utils/auth";
import useLikes from "../../hooks/useLikes";
import useStripchatModels from "../../hooks/useStripchatModels";
import { getModelSlug } from "../../utils/modelSlug";
import StripchatApiSkeleton from "../../Components/StripchatApiSkeleton";
import ModelPagination, {
  MODEL_PAGE_SIZE,
} from "../../Components/ModelPagination";
import "./CompanionsPage.css";

const categories = ["All", "Female", "Male", "Couple", "Other"];

export default function CompanionsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const authenticated = useIsAuthenticated();
  const likesState = useLikes();
  const { models, loading, error, retry } = useStripchatModels();
  const location = useLocation();
  const navigate = useNavigate();

  const filteredCompanions = useMemo(() => {
    return models.filter((companion) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        companion.name.toLowerCase().includes(searchValue) ||
        companion.type.toLowerCase().includes(searchValue) ||
        companion.tags.some((tag) =>
          tag.toLowerCase().includes(searchValue)
        );

      const matchesCategory =
        activeCategory === "All" ||
        companion.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory, models]);
  const paginatedCompanions = useMemo(() => {
    const startIndex = (currentPage - 1) * MODEL_PAGE_SIZE;
    return filteredCompanions.slice(
      startIndex,
      startIndex + MODEL_PAGE_SIZE
    );
  }, [currentPage, filteredCompanions]);

  const toggleFavorite = (id, event) => {
    if (!authenticated) {
      event.preventDefault();
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

  return (
    <div className="ai-companions-page">

      {/* = HERO ==== */}

      <section className="ai-companions-hero">

        <div className="ai-companions-hero-bg" />

        <div className="ai-companions-hero-overlay" />

        <div className="container ai-companions-hero-content">

          <span className="section-eyebrow">
            Find Your Connection
          </span>

          <h1 className="ai-companions-hero-title">
            Discover
            <span> Live Models.</span>
          </h1>

          <p className="ai-companions-hero-description">
            Browse live Stripchat models, explore their profiles, and find
            someone you would like to connect with.
          </p>

          <div className="ai-companions-hero-actions">

            <a
              href="#companions"
              className="btn btn-primary btn-lg"
            >
              Explore Companions
              <ArrowRight size={18} />
            </a>

          </div>

          <div className="ai-companions-hero-points">

            <span>
              <Sparkles size={15} />
              Live model profiles
            </span>

            <span>
              <Sparkles size={15} />
              Search and browse
            </span>

            <span>
              <Sparkles size={15} />
              Direct model links
            </span>

          </div>

        </div>

      </section>


      {/* ===  COMPANIONS ======= */}

      <section
        id="companions"
        className="ai-companions-section"
      >

        <div className="container">

          {/* HEADER */}

          <div className="ai-companions-header">

            <div>

              {/* <span className="section-eyebrow">
                Discover Your Match
              </span> */}

              <h2 className="section-title">Live Models</h2>
            </div>

          </div>


          {/* SEARCH + FILTER */}

          <div className="ai-companions-toolbar">

            <div className="ai-companions-search">

              <Search size={18} />

              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search live models..."
                aria-label="Search companions"
              />

            </div>
                        <div className="ai-companions-count">
              <strong>
                {filteredCompanions.length}
              </strong>

              <span>
                Models
              </span>
            </div>


            {/* <div className="ai-companions-filter-label">

              <SlidersHorizontal size={22} />

              <span>Filter</span>

            </div> */}

          </div>


          {/* CATEGORIES */}

          <div className="ai-companions-categories">

            {categories.map((category) => (

              <button
                key={category}
                type="button"
                className={
                  activeCategory === category
                    ? "ai-category active"
                    : "ai-category"
                }
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentPage(1);
                }}
              >
                {category}
              </button>

            ))}

          </div>


          {/* GRID */}

          {loading ? (
            <StripchatApiSkeleton variant="grid" count={8} />
          ) : error ? (
            <div className="ai-companions-empty" role="alert">
              <h3>Models could not be loaded</h3>
              <p>{error}</p>
              <button type="button" className="btn btn-outline" onClick={retry}>
                Try again
              </button>
            </div>
          ) : filteredCompanions.length > 0 ? (

            <div className="ai-companions-grid">

              {paginatedCompanions.map((companion) => {

                const isFavorite =
                  likesState.likedIds.has(String(companion.id));

                return (

                  <article
                    className="ai-companion-card"
                    key={companion.id}
                  >

                    <Link
                      to={
                        authenticated
                          ? `/companions/${
                              getModelSlug(companion.name) || companion.id
                            }`
                          : "/login"
                      }
                      className={`ai-companion-image-link ${
                        authenticated ? "" : "guest-locked-card"
                      }`}
                    >

                      <img
                        src={companion.image}
                        alt={authenticated ? `${companion.name} - ${companion.type}` : "Blurred companion preview"}
                        className={`ai-companion-image ${
                          authenticated ? "" : "guest-blurred-image"
                        }`}
                      />

                      {!authenticated && (
                        <div className="guest-image-overlay">
                          <span>Sign in to view</span>
                        </div>
                      )}

                      <div className="ai-companion-image-overlay" />

                      <span className="ai-companion-online">
                        <span />
                        {companion.status === "public" ? "Live" : companion.status || "Online"}
                      </span>

                    </Link>


                    <button
                      type="button"
                      className={
                        isFavorite
                          ? "ai-companion-favorite active"
                          : "ai-companion-favorite"
                      }
                      onClick={(event) =>
                        toggleFavorite(companion.id, event)
                      }
                      disabled={likesState.pendingIds.has(String(companion.id))}
                      aria-label={
                        !authenticated
                          ? `Sign in to add ${companion.name} to favorites`
                          : isFavorite
                            ? `Remove ${companion.name} from favorites`
                            : `Add ${companion.name} to favorites`
                      }
                    >

                      <Heart
                        size={18}
                        fill={
                          isFavorite
                            ? "currentColor"
                            : "none"
                        }
                      />

                    </button>


                    <div className="ai-companion-info">

                      <div className="ai-companion-name-row">

                        <div>

                          <h3>
                            {companion.name}
                          </h3>

                          <p>
                            {companion.type}
                          </p>

                        </div>

                        <ArrowRight size={25} />

                      </div>


                      <div className="ai-companion-tags">

                        {companion.tags
                          .slice(0, 3)
                          .map((tag) => (

                            <span key={tag}>
                              {tag}
                            </span>

                          ))}

                      </div>

                    </div>

                  </article>

                );

              })}

            </div>
          ) : (
            <div className="ai-companions-empty">
              <Search size={28} />
              <h3>No companions found</h3>
              <p>Try another name, personality, or category.</p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                  setCurrentPage(1);
                }}
              >
                Clear Filters
              </button>
            </div>
          )}

          {!loading && !error && filteredCompanions.length > 0 && (
            <ModelPagination
              currentPage={currentPage}
              pageSize={MODEL_PAGE_SIZE}
              totalItems={filteredCompanions.length}
              onPageChange={setCurrentPage}
            />
          )}

        </div>

      </section>


      {/* === CTA ====== */}

      <section className="ai-companions-cta section-small">

        <div className="container">

          <div className="ai-companions-cta-inner ">

            <div>

              <span className="section-eyebrow">
                Your Connection Awaits
              </span>

              <h2>
                Find someone who gets you.
              </h2>

              <p>
                Create your account and start exploring
                personalized AI companionship.
              </p>

            </div>

            <a
              href="/register"
              className="btn btn-primary btn-lg"
            >
              Get Started
              <ArrowRight size={18} />
            </a>

          </div>

        </div>

      </section>

    </div>
  );
}