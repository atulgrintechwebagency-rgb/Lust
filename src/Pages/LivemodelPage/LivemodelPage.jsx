import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  Heart,
  MessageCircle,
  Search,
  ShieldCheck,
  Eye,
  Video,
  X,
} from 'lucide-react';

import { useIsAuthenticated } from '../../utils/auth';
import useStripchatModels, {
  isStripchatModelLive,
} from '../../hooks/useStripchatModels';
import StripchatApiSkeleton from '../../Components/StripchatApiSkeleton';
import ModelPagination, {
  MODEL_PAGE_SIZE,
} from '../../Components/ModelPagination';
import './LivemodelPage.css';

const categories = [
  'All',
  'Female',
  'Male',
  'Couple',
  'Other',
];


/* =======  LIVE MODEL CARD ==== */

function LiveModelCard({ model }) {

  const [liked, setLiked] = useState(false);
  const authenticated = useIsAuthenticated();
  

  const handleLike = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setLiked((previousLiked) => !previousLiked);
  };

  return (
    <Link
      to={authenticated ? `/live-chat/${model.id}` : '/login'}
      className="live-model-card card"
      aria-label={
        authenticated
          ? `View ${model.name}'s profile`
          : `Sign in to view ${model.name}`
      }
    >
      <div className="live-model-image">
        <img
          src={model.image}
          alt={authenticated ? `${model.name} live model` : 'Blurred live model preview'}
          className={`image-cover ${authenticated ? '' : 'guest-blurred-image'}`}
        />
        {!authenticated && (
          <div className="guest-image-overlay">
            <span>Sign in to view</span>
          </div>
        )}
        <div className="live-model-image-overlay" />

        <div className="live-model-status">
          <span className="live-status-dot" />
          <span>LIVE</span>
        </div>

        <div className="live-model-viewers">
          <Eye size={12} />
          <span>{model.viewers}</span>
        </div>

        <button
          type="button"
          className={`live-model-favorite icon-btn ${liked ? 'liked' : ''}`}
          onClick={handleLike}
          aria-label={
            liked
              ? `Remove ${model.name} from favorites`
              : `Add ${model.name} to favorites`
          }
          aria-pressed={liked}
        >
          <Heart
            size={17}
            strokeWidth={liked ? 2.4 : 1.8}
            fill={liked ? 'currentColor' : 'none'}
          />
        </button>

        <div className="live-model-card-content">
          <div className="live-model-card-heading">
            <div>
              <h3 className="live-model-name font-heading">{model.name}</h3>
              <p className="live-model-type">
                {model.type}
                <span className="live-model-dot-separator">•</span>
                <span className="live-action-text">View Profile</span>
              </p>
            </div>
            <ChevronRight className="live-model-arrow" size={22} strokeWidth={1.6} />
          </div>
          <div className="live-model-tags">
            {model.tags.map((tag) => (
              <span key={tag} className="badge badge-dark live-model-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}


/* ====== LIVE MODELS PAGE ===== */

function LivemodelPage() {
  const authenticated = useIsAuthenticated();
  const { models, loading, error, retry } = useStripchatModels();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);


  /* =======   FILTER MODELS ===== */

  const filteredModels = useMemo(() => {

    const search = searchTerm.trim().toLowerCase();

    return models.filter((model) => {
      if (!isStripchatModelLive(model)) {
        return false;
      }

      const matchesCategory =
        activeCategory === 'All' ||
        model.category === activeCategory;

      const matchesSearch =
        !search ||
        model.name.toLowerCase().includes(search) ||
        model.type.toLowerCase().includes(search) ||
        model.tags.some((tag) =>
          tag.toLowerCase().includes(search)
        );

      return matchesCategory && matchesSearch;
    });

  }, [activeCategory, models, searchTerm]);
  const paginatedModels = useMemo(() => {
    const startIndex = (currentPage - 1) * MODEL_PAGE_SIZE;
    return filteredModels.slice(startIndex, startIndex + MODEL_PAGE_SIZE);
  }, [currentPage, filteredModels]);


  /* ====  CLEAR SEARCH ======== */

  const clearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };


  return (
    <div className="live-models-page">

      {/* ======  LIVE MODELS DIRECTORY ======= */}

      <section
        id="live-models"
        className="section section-dark live-models-directory"
      >

        <div className="container">


          {/* ======  SECTION HEADER ==== */}

          <div className="section-header live-models-section-header">

            <div>

              <div className="section-eyebrow">
                LIVE RIGHT NOW
              </div>

              <h2 className="section-title font-heading">
                Live Models
              </h2>

              <p className="section-description">

                Browse live models and find someone who matches
                your vibe. Start chatting whenever you're ready.

              </p>

            </div>


            <div className="live-model-count">

              <span className="text-primary">
                {filteredModels.length}
              </span>

              <span>
                Models Available
              </span>

            </div>

          </div>


          {/* ======  SEARCH + FILTER ===== */}

          <div className="live-models-toolbar">


            {/* SEARCH */}

            <div className="live-model-search">

              <Search
                size={18}
                strokeWidth={1.7}
              />


              <input
                type="search"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search live models..."
                aria-label="Search live models"
              />


              {searchTerm && (

                <button
                  type="button"
                  className="live-model-search-clear"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >

                  <X size={16} />

                </button>

              )}

            </div>


            {/* FILTERS */}

            <div
              className="live-model-filters"
              role="tablist"
              aria-label="Live model categories"
            >

              {categories.map((category) => (

                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={
                    activeCategory === category
                  }
                  className={`live-filter-button ${
                    activeCategory === category
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => {
                    setActiveCategory(category);
                    setCurrentPage(1);
                  }}
                >
                  {category}
                </button>

              ))}

            </div>

          </div>


          {/* =======   MODEL GRID ===== */}

          {loading ? (
            <StripchatApiSkeleton variant="grid" count={8} />
          ) : error ? (
            <div className="live-models-empty card" role="alert">
              <h3 className="font-heading">Live models could not be loaded</h3>
              <p>{error}</p>
              <button type="button" className="btn btn-outline" onClick={retry}>
                Try again
              </button>
            </div>
          ) : filteredModels.length > 0 ? (

            <div className="live-models-grid">

              {paginatedModels.map((model) => (

                <LiveModelCard
                  key={model.id}
                  model={model}
                />

              ))}

            </div>
          ) : (
            /* ======  EMPTY STATE ====== */
            <div className="live-models-empty card">
              <Search size={30} />
              <h3 className="font-heading">No live models found</h3>
              <p>Try another name or select a different category.</p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All');
                  setCurrentPage(1);
                }}
              >
                View All Models
              </button>
            </div>
          )}

          {!loading && !error && filteredModels.length > 0 && (
            <ModelPagination
              currentPage={currentPage}
              pageSize={MODEL_PAGE_SIZE}
              totalItems={filteredModels.length}
              onPageChange={setCurrentPage}
            />
          )}

        </div>

      </section>


      {/* ===========   FEATURED LIVE EXPERIENCE ===== */}

      <section
        className="section section-wine live-featured-section"
      >

        <div className="container">

          <div className="live-featured-card">


            {/* =================================================
                IMAGE
            ================================================== */}

            <div className="live-featured-image">

              <img
                src="/Images/liveModel.webp"
                alt={authenticated ? "Angelica live model" : "Blurred featured live model preview"}
                className={`image-cover ${authenticated ? '' : 'guest-blurred-image'}`}
              />

              {!authenticated && (
                <Link to="/login" className="guest-image-overlay guest-image-overlay-link">
                  <span>Sign in to view live models</span>
                </Link>
              )}

              <div className="live-featured-image-overlay" />

            </div>


            {/* ===  CONTENT ===== */}

            <div className="live-featured-content">

              <div className="live-featured-status">

                <span className="live-status-dot" />

                LIVE NOW

              </div>


              <div className="section-eyebrow">
                FEATURED EXPERIENCE
              </div>


              <h2 className="live-featured-title"> Your next
                <span className="text-primary"> connection </span>  starts here.
              </h2>


              <p className="live-featured-description">

                Find a live model who catches your attention,
                start a conversation, and discover where the
                moment takes you.

              </p>


              <div className="live-featured-points">

                <div>

                  <MessageCircle size={18} />

                  <span>
                    One-on-one conversations
                  </span>

                </div>


                <div>

                  <Video size={18} />

                  <span>
                    Live private experiences
                  </span>

                </div>


                <div>

                  <ShieldCheck size={18} />

                  <span>
                    Private and secure
                  </span>

                </div>

              </div>


              <a
                href="#live-models"
                className="btn btn-primary btn-lg"
              >

                Find Your Connection

                <ArrowRight size={18} />

              </a>

            </div>

          </div>

        </div>

      </section>


      {/* =======   HOW IT WORKS ======= */}

      <section id="how-it-works" className="section-dark live-how-section"
      >

        <div className="container">


          {/* SECTION HEADER */}

          <div className="section-header center">

            <div className="section-eyebrow">
              SIMPLE & PRIVATE
            </div>

            <h2 className="section-title font-heading">
              How Live Chat Works
            </h2>

            <p className="section-description">

              Getting started takes just a few moments.
              Choose someone, start chatting, and enjoy the
              experience your way.

            </p>

          </div>


          <div className="grid grid-3 live-how-grid">


            {/* =======  STEP 1 ======= */}

            <article className="live-how-card card">

              <div className="live-how-number">
                01
              </div>

              <div className="live-how-icon">

                <Search size={24} />

              </div>

              <h3 className="font-heading">
                Find Someone
              </h3>

              <p>

                Browse available live models and discover
                someone who matches your interests.

              </p>

            </article>


            {/* ====  STEP 2 ===== */}

            <article className="live-how-card card">

              <div className="live-how-number">
                02
              </div>

              <div className="live-how-icon">

                <MessageCircle size={24} />

              </div>

              <h3 className="font-heading">
                Start Chatting
              </h3>

              <p>

                Start a conversation and create a connection
                that feels natural and personal.

              </p>

            </article>


            {/* ======   STEP 3 ======== */}

            <article className="live-how-card card">

              <div className="live-how-number">
                03
              </div>

              <div className="live-how-icon">

                <Heart size={24} />

              </div>

              <h3 className="font-heading">
                Enjoy The Moment
              </h3>

              <p>

                Take the conversation wherever you want and
                enjoy a more personal live experience.

              </p>

            </article>

          </div>

        </div>

      </section>


      {/* ======  CTA ======= */}

      <section className="section-small section-dark live-models-cta">

        <div className="container">

          <div className="live-models-cta-card">

            <div>

              <div className="section-eyebrow">
                YOUR CONNECTION AWAITS
              </div>

              <h2 className="live-models-cta-title font-heading">

                Find someone who gets your attention.

              </h2>

              <p>

                Explore live models and start your next
                conversation today.

              </p>

            </div>


            <a
              href="#live-models"
              className="btn btn-primary btn-lg"
            >

              Explore Live Models

              <ArrowRight size={18} />

            </a>

          </div>

        </div>

      </section>


    </div>
  );
}


export default LivemodelPage;