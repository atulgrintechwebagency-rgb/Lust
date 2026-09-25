import { useMemo, useState } from "react";
import {
  Search,
  Heart,
  ArrowRight,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import "./CompanionsPage.css";

const companions = [
  {
    id: 1,
    name: "Sophie",
    type: "The Sweetheart",
    image: "/Images/gallery1.webp",
    status: "Online",
    tags: ["Romantic", "Sweet", "Caring"],
  },
  {
    id: 2,
    name: "Mia",
    type: "The Tease",
    image: "/Images/gallery2.webp",
    status: "Online",
    tags: ["Playful", "Flirty", "Fun"],
  },
  {
    id: 3,
    name: "Luna",
    type: "The Adventurer",
    image: "/Images/gallery3.webp",
    status: "Online",
    tags: ["Adventurous", "Bold", "Curious"],
  },
  {
    id: 4,
    name: "Aria",
    type: "The Dreamer",
    image: "/Images/Aria.webp",
    status: "Online",
    tags: ["Dreamy", "Romantic", "Creative"],
  },
  {
    id: 5,
    name: "Nina",
    type: "The Wild One",
    image: "/Images/gallery5.webp",
    status: "Online",
    tags: ["Confident", "Wild", "Playful"],
  },
  {
    id: 6,
    name: "Chloe",
    type: "The Girl Next Door",
    image: "/Images/gallery6.webp",
    status: "Online",
    tags: ["Friendly", "Sweet", "Casual"],
  },
  {
    id: 7,
    name: "Angelica",
    type: "The Romantic",
    image: "/Images/gallery7.webp",
    status: "Online",
    tags: ["Romantic", "Passionate", "Caring"],
  },
  {
    id: 8,
    name: "Kira",
    type: "The Brunette",
    image: "/Images/gallery8.webp",
    status: "Online",
    tags: ["Confident", "Mysterious", "Flirty"],
  },
  {
    id: 9,
    name: "Lexi",
    type: "The Petite",
    image: "/Images/gallery9.webp",
    status: "Online",
    tags: ["Playful", "Sweet", "Fun"],
  },
  {
    id: 10,
    name: "Valentina",
    type: "The Latina",
    image: "/Images/Gallery10.webp",
    status: "Online",
    tags: ["Passionate", "Romantic", "Confident"],
  },
  {
    id: 11,
    name: "Harper",
    type: "The Blonde",
    image: "/Images/Gallery11.webp",
    status: "Online",
    tags: ["Sweet", "Friendly", "Playful"],
  },
  {
    id: 12,
    name: "Sienna",
    type: "The Tattooed One",
    image: "/Images/Gallery12.webp",
    status: "Online",
    tags: ["Bold", "Creative", "Confident"],
  },
];

const categories = [
  "All",
  "Romantic",
  "Playful",
  "Adventurous",
  "Sweet",
  "Confident",
  "Flirty",
];

export default function CompanionsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);

  const filteredCompanions = useMemo(() => {
    return companions.filter((companion) => {
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
        companion.tags.includes(activeCategory);

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
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
            Meet Your
            <span> AI Companion.</span>
          </h1>

          <p className="ai-companions-hero-description">
            Discover AI companions created to match your personality,
            interests, and the kind of connection you're looking for.
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
              Personalized personalities
            </span>

            <span>
              <Sparkles size={15} />
              Available anytime
            </span>

            <span>
              <Sparkles size={15} />
              Private & secure
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

              <h2 className="section-title">
                AI Companions
              </h2>
            </div>

          </div>


          {/* SEARCH + FILTER */}

          <div className="ai-companions-toolbar">

            <div className="ai-companions-search">

              <Search size={18} />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search companions..."
                aria-label="Search companions"
              />

            </div>
                        <div className="ai-companions-count">
              <strong>
                {filteredCompanions.length}
              </strong>

              <span>
                Companions
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
                onClick={() =>
                  setActiveCategory(category)
                }
              >
                {category}
              </button>

            ))}

          </div>


          {/* GRID */}

          {filteredCompanions.length > 0 ? (

            <div className="ai-companions-grid">

              {filteredCompanions.map((companion) => {

                const isFavorite =
                  favorites.includes(companion.id);

                return (

                  <article
                    className="ai-companion-card"
                    key={companion.id}
                  >

                    <a
                      href={`/companions/${companion.name.toLowerCase()}`}
                      className="ai-companion-image-link"
                    >

                      <img
                        src={companion.image}
                        alt={`${companion.name} - ${companion.type}`}
                        className="ai-companion-image"
                      />

                      <div className="ai-companion-image-overlay" />

                      <span className="ai-companion-online">
                        <span />
                        {companion.status}
                      </span>

                    </a>


                    <button
                      type="button"
                      className={
                        isFavorite
                          ? "ai-companion-favorite active"
                          : "ai-companion-favorite"
                      }
                      onClick={() =>
                        toggleFavorite(companion.id)
                      }
                      aria-label={
                        isFavorite
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

              <h3>
                No companions found
              </h3>

              <p>
                Try another name, personality, or category.
              </p>

              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
              >
                Clear Filters
              </button>

            </div>

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