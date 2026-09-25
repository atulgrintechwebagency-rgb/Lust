import { Link } from 'react-router-dom';
import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  Heart,
  MessageCircle,
  Search,
  ShieldCheck,
  Eye,
  Video,
  Wifi,
  X,
} from 'lucide-react';

import './LivemodelPage.css';


/* == LIVE MODELS DATA ============= */

const liveModels = [
  {
    id: 1,
    name: 'Angelica',
    type: 'Big Tits',
    action: 'Chat Now',
    category: 'Blonde',
    image: '/Images/gallery1.webp',
    viewers: '1.2K',
    description:
      'Sweet, confident and ready to make your live chat feel personal.',
    tags: ['Blonde', 'Playful', 'Flirty'],
    featured: true,
  },

  {
    id: 2,
    name: 'Kira',
    type: 'Brunette',
    action: 'Private Chat',
    category: 'Brunette',
    image: '/Images/gallery2.webp',
    viewers: '842',
    description:
      'A mysterious brunette with a playful side and plenty to say.',
    tags: ['Brunette', 'Private', 'Mysterious'],
  },

  {
    id: 3,
    name: 'Lexi',
    type: 'Petite',
    action: 'Tip Me',
    category: 'Petite',
    image: '/Images/gallery3.webp',
    viewers: '693',
    description:
      'Petite, playful and always ready to keep the conversation going.',
    tags: ['Petite', 'Sweet', 'Playful'],
  },

  {
    id: 4,
    name: 'Valentina',
    type: 'Latina',
    action: 'Exclusive',
    category: 'Latina',
    image: '/Images/gallery4.webp',
    viewers: '521',
    description:
      'Confident energy, warm conversation and an unforgettable presence.',
    tags: ['Latina', 'Confident', 'Passionate'],
  },

  {
    id: 5,
    name: 'Harper',
    type: 'Blonde',
    action: 'Chat Now',
    category: 'Blonde',
    image: '/Images/gallery5.webp',
    viewers: '404',
    description:
      'A fun-loving blonde who knows how to make every chat interesting.',
    tags: ['Blonde', 'Friendly', 'Playful'],
  },

  {
    id: 6,
    name: 'Sienna',
    type: 'Tattooed',
    action: 'Private Show',
    category: 'Tattooed',
    image: '/Images/gallery6.webp',
    viewers: '318',
    description:
      'Bold personality, unique style and a private experience made for you.',
    tags: ['Tattooed', 'Bold', 'Creative'],
  },

  {
    id: 7,
    name: 'Camila',
    type: 'Brunette',
    action: 'Chat Now',
    category: 'Brunette',
    image: '/Images/gallery7.webp',
    viewers: '287',
    description:
      'Warm, charming and ready for a one-on-one conversation.',
    tags: ['Brunette', 'Romantic', 'Caring'],
  },

  {
    id: 8,
    name: 'Bella',
    type: 'Petite',
    action: 'Private Chat',
    category: 'Petite',
    image: '/Images/gallery8.webp',
    viewers: '245',
    description:
      'Cute, confident and always ready to create a fun connection.',
    tags: ['Petite', 'Cute', 'Flirty'],
  },

  {
    id: 9,
    name: 'Sofia',
    type: 'Latina',
    action: 'Exclusive',
    category: 'Latina',
    image: '/Images/gallery9.webp',
    viewers: '201',
    description:
      'Passionate personality with a naturally captivating presence.',
    tags: ['Latina', 'Passionate', 'Confident'],
  },

  {
    id: 10,
    name: 'Riley',
    type: 'Tattooed',
    action: 'Chat Now',
    category: 'Tattooed',
    image: '/Images/Gallery10.webp',
    viewers: '186',
    description:
      'Creative, confident and never short on conversation.',
    tags: ['Tattooed', 'Creative', 'Bold'],
  },

  {
    id: 11,
    name: 'Emily',
    type: 'Blonde',
    action: 'Private Chat',
    category: 'Blonde',
    image: '/Images/Gallery11.webp',
    viewers: '165',
    description:
      'A playful personality with a soft and welcoming energy.',
    tags: ['Blonde', 'Sweet', 'Friendly'],
  },

  {
    id: 12,
    name: 'Nina',
    type: 'Brunette',
    action: 'Chat Now',
    category: 'Brunette',
    image: '/Images/Gallery12.webp',
    viewers: '143',
    description:
      'Confident, mysterious and ready for your next live conversation.',
    tags: ['Brunette', 'Mysterious', 'Flirty'],
  },
];


const categories = [
  'All',
  'Blonde',
  'Brunette',
  'Latina',
  'Petite',
  'Tattooed',
];


/* =======  LIVE MODEL CARD ==== */

function LiveModelCard({ model }) {

  const [liked, setLiked] = useState(false);
  

  const handleLike = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setLiked((previousLiked) => !previousLiked);
  };

  return (
    <Link
      to={`/live-chat/${liveModels.id}`}
      className="live-model-card card"
      aria-label={`Start live chat with ${model.name}`}
    >

      <div className="live-model-image">

        <img
          src={model.image}
          alt={`${model.name} live model`}
          className="image-cover"
        />

        <div className="live-model-image-overlay" />


        {/* LIVE BADGE */}

        <div className="live-model-status">

          <span className="live-status-dot" />

          <span>
            LIVE
          </span>

        </div>


        {/* VIEWERS */}

        <div className="live-model-viewers">

          <Eye size={12} />

          <span>
            {model.viewers}
          </span>

        </div>


        {/* LIKE */}

        <button
          type="button"
          className={`live-model-favorite icon-btn ${
            liked ? 'liked' : ''
          }`}
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


        {/* CARD CONTENT */}

        <div className="live-model-card-content">

          <div className="live-model-card-heading">

            <div>

              <h3 className="live-model-name font-heading">
                {model.name}
              </h3>

              <p className="live-model-type">

                {model.type}

                <span className="live-model-dot-separator">
                  •
                </span>

                <span className="live-action-text">
                  {model.action}
                </span>

              </p>

            </div>


            <ChevronRight
              className="live-model-arrow"
              size={22}
              strokeWidth={1.6}
            />

          </div>


          <div className="live-model-tags">

            {model.tags.map((tag) => (

              <span
                key={tag}
                className="badge badge-dark live-model-tag"
              >
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

  const [activeCategory, setActiveCategory] = useState('All');

  const [searchTerm, setSearchTerm] = useState('');


  /* =======   FILTER MODELS ===== */

  const filteredModels = useMemo(() => {

    const search = searchTerm.trim().toLowerCase();

    return liveModels.filter((model) => {

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

  }, [activeCategory, searchTerm]);


  /* ====  CLEAR SEARCH ======== */

  const clearSearch = () => {
    setSearchTerm('');
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
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
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
                  onClick={() =>
                    setActiveCategory(category)
                  }
                >
                  {category}
                </button>

              ))}

            </div>

          </div>


          {/* =======   MODEL GRID ===== */}

          {filteredModels.length > 0 ? (

            <div className="live-models-grid">

              {filteredModels.map((model) => (

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

              <h3 className="font-heading">
                No live models found
              </h3>

              <p>
                Try another name or select a different category.
              </p>

              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All');
                }}
              >
                View All Models
              </button>

            </div>

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
                src="/Images/liveModel.webp" alt="Angelica live model" className="image-cover"/>

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