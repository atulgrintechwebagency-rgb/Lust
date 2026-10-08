import { ArrowLeft, Eye, Heart, Languages, Video } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import useStripchatModels from "../../hooks/useStripchatModels";
import StripchatApiSkeleton from "../../Components/StripchatApiSkeleton";
import "./StripchatModelDetails.css";

const formatCount = (count) =>
  new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(
    count
  );

export default function StripchatModelDetails() {
  const { modelId } = useParams();
  const { models, loading, error, retry } = useStripchatModels();
  const identifier = modelId?.trim().toLowerCase();
  const model = models.find(
    (item) =>
      String(item.id) === modelId ||
      item.username?.trim().toLowerCase() === identifier
  );
  const isLive = model?.status.toLowerCase() === "public";

  return (
    <main className="stripchat-model-details section section-dark">
      <div className="container">
        <Link to="/live-models" className="stripchat-model-back">
          <ArrowLeft size={17} />
          <span>All live models</span>
        </Link>

        {loading ? (
          <StripchatApiSkeleton variant="profile" />
        ) : error ? (
          <div className="stripchat-model-message" role="alert">
            <h1>Model profile could not be loaded</h1>
            <p>{error}</p>
            <button type="button" className="btn btn-primary" onClick={retry}>
              Try again
            </button>
          </div>
        ) : !model ? (
          <div className="stripchat-model-message" role="status">
            <h1>Model not found</h1>
            <p>This model is no longer included in the current live models feed.</p>
          </div>
        ) : (
          <article className="stripchat-model-profile">
            <div className="stripchat-model-profile-image">
              {model.image && <img src={model.image} alt={`${model.name} preview`} />}
              {model.status && (
                <span
                  className={`stripchat-model-live${isLive ? "" : " stripchat-model-live--offline"}`}
                >
                  <span />
                  {isLive ? "LIVE NOW" : model.status}
                </span>
              )}
            </div>

            <div className="stripchat-model-profile-info">
              <p className="section-eyebrow">STRIPCHAT MODEL</p>
              <h1>{model.name}</h1>
              <p className="stripchat-model-category">{model.category} model</p>

              <div className="stripchat-model-stats">
                <div>
                  <Eye size={18} />
                  <span>{model.viewers} watching</span>
                </div>
                <div>
                  <Heart size={18} />
                  <span>{formatCount(model.favoritedCount)} favorites</span>
                </div>
                {model.country && <div>{model.country}</div>}
              </div>

              {model.languages.length > 0 && (
                <div className="stripchat-model-languages">
                  <Languages size={17} />
                  <span>{model.languages.map((language) => language.toUpperCase()).join(", ")}</span>
                </div>
              )}

              {model.streamResolution && (
                <p className="stripchat-model-resolution">
                  Stream resolution: {model.streamResolution}
                </p>
              )}

              <div className="stripchat-model-tags">
                <span>{model.category}</span>
                {model.broadcastHD && <span>HD</span>}
                {model.broadcastVR && <span>VR</span>}
                {model.broadcastMobile && <span>Mobile</span>}
                {model.isNew && <span>New</span>}
              </div>

              {isLive && (
                <Link
                  className="btn btn-primary stripchat-model-open"
                  to={`/live-chat/${encodeURIComponent(model.id)}`}
                >
                  Join Live Chat
                  <Video size={17} />
                </Link>
              )}
            </div>
          </article>
        )}
      </div>
    </main>
  );
}
