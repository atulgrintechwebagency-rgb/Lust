import { useState } from "react";
import { ArrowLeft, Eye, Heart, Languages, Video } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import useStripchatModels from "../../hooks/useStripchatModels";
import StripchatApiSkeleton from "../../Components/StripchatApiSkeleton";
import "./ModelDetails.css";

const formatCount = (value) => {
  const count = Number(value);
  return Number.isFinite(count) && count >= 0
    ? new Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(count)
    : "0";
};

export default function ModelDetails() {
  const { id } = useParams();
  const { models, loading, error, retry } = useStripchatModels();
  const [selectedImage, setSelectedImage] = useState("");
  const identifier = id?.trim().toLowerCase();
  const model = models.find(
    (item) =>
      String(item.id) === id ||
      item.username?.trim().toLowerCase() === identifier
  );
  const gallery = model?.gallery?.length
    ? model.gallery
    : model?.image
      ? [model.image]
      : [];
  const activeImage = gallery.includes(selectedImage)
    ? selectedImage
    : model?.image || gallery[0];
  const isLive = model?.status.toLowerCase() === "public";

  return (
    <div className="model-page-wrapper">
      <main>
        <section className="section model-profile-section">
          <div className="container">
            <Link to="/companions" className="btn btn-outline">
              <ArrowLeft size={17} />
              <span>All models</span>
            </Link>

            {loading ? (
              <StripchatApiSkeleton variant="profile" />
            ) : error ? (
              <div className="model-details-message" role="alert">
                <h1>Model profile could not be loaded</h1>
                <p>{error}</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={retry}
                >
                  Try again
                </button>
              </div>
            ) : !model ? (
              <div className="model-details-message" role="status">
                <h1>Model not found</h1>
                <p>
                  This model is not available in the current models feed.
                </p>
              </div>
            ) : (
              <div className="model-profile-layout">
                <div className="model-profile-media">
                  <div className="profile-image-wrapper">
                    {model.status && (
                      <div
                        className={`status-badge${
                          isLive ? "" : " status-badge--offline"
                        }`}
                      >
                        <span className="status-dot" />
                        {isLive ? "LIVE NOW" : model.status}
                      </div>
                    )}
                    {activeImage && (
                      <img
                        src={activeImage}
                        alt={`${model.name} preview`}
                        className="main-profile-image"
                      />
                    )}
                    <div className="profile-overlay-bottom">
                      <span className="badge badge-primary">
                        {model.category} model
                      </span>
                    </div>
                  </div>

                  {gallery.length > 1 && (
                    <div className="profile-mini-gallery">
                      {gallery.map((image) => (
                        <button
                          type="button"
                          key={image}
                          className={`profile-thumbnail${
                            activeImage === image ? " active" : ""
                          }`}
                          onClick={() => setSelectedImage(image)}
                          aria-label={`Show another ${model.name} image`}
                        >
                          <img src={image} alt="" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="model-profile-content">
                  <div className="section-eyebrow">STRIPCHAT MODEL</div>
                  <h1 className="section-title model-name">{model.name}</h1>
                  <p className="section-description model-description">
                    {model.country ? `${model.country} · ` : ""}
                    {model.category} model profile
                  </p>

                  <div className="stats-grid">
                    <div className="stat-item">
                      <div className="stat-value">
                        <Eye size={18} />
                        {model.viewers}
                      </div>
                      <div className="stat-label">Watching</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">
                        <Heart size={18} />
                        {formatCount(model.favoritedCount)}
                      </div>
                      <div className="stat-label">Favorites</div>
                    </div>
                    {model.country && (
                      <div className="stat-item">
                        <div className="stat-value">{model.country}</div>
                        <div className="stat-label">Country</div>
                      </div>
                    )}
                  </div>

                  {model.languages.length > 0 && (
                    <div className="model-details-languages">
                      <Languages size={17} />
                      <span>
                        {model.languages
                          .map((language) => language.toUpperCase())
                          .join(", ")}
                      </span>
                    </div>
                  )}

                  {model.streamResolution && (
                    <p className="section-description">
                      Stream resolution: {model.streamResolution}
                    </p>
                  )}

                  <div className="tag-list">
                    {model.broadcastHD && (
                      <span className="badge badge-dark">HD</span>
                    )}
                    {model.broadcastVR && (
                      <span className="badge badge-dark">VR</span>
                    )}
                    {model.broadcastMobile && (
                      <span className="badge badge-dark">Mobile</span>
                    )}
                    {model.isNew && (
                      <span className="badge badge-dark">New</span>
                    )}
                  </div>

                  {isLive && (
                    <div className="hero-cta-group single-cta">
                      <Link
                        to={`/live-chat/${encodeURIComponent(model.id)}`}
                        className="btn btn-primary btn-lg hero-cta-btn"
                      >
                        Join Live Chat
                        <Video size={18} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
