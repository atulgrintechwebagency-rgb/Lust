import "./StripchatApiSkeleton.css";

function SkeletonCard() {
  return (
    <div className="stripchat-skeleton-card" aria-hidden="true">
      <span className="stripchat-skeleton stripchat-skeleton-card-badge" />
      <div className="stripchat-skeleton-card-copy">
        <span className="stripchat-skeleton stripchat-skeleton-title" />
        <span className="stripchat-skeleton stripchat-skeleton-subtitle" />
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="stripchat-skeleton-profile" aria-hidden="true">
      <div className="stripchat-skeleton stripchat-skeleton-profile-image" />
      <div className="stripchat-skeleton-profile-info">
        <span className="stripchat-skeleton stripchat-skeleton-eyebrow" />
        <span className="stripchat-skeleton stripchat-skeleton-heading" />
        <span className="stripchat-skeleton stripchat-skeleton-line" />
        <div className="stripchat-skeleton-stats">
          <span className="stripchat-skeleton stripchat-skeleton-stat" />
          <span className="stripchat-skeleton stripchat-skeleton-stat" />
          <span className="stripchat-skeleton stripchat-skeleton-stat" />
        </div>
        <span className="stripchat-skeleton stripchat-skeleton-line stripchat-skeleton-line-short" />
        <span className="stripchat-skeleton stripchat-skeleton-button" />
      </div>
    </div>
  );
}

function ChatSkeleton() {
  return (
    <div className="stripchat-skeleton-chat" aria-hidden="true">
      <div className="stripchat-skeleton-chat-main">
        <div className="stripchat-skeleton stripchat-skeleton-video" />
        <div className="stripchat-skeleton stripchat-skeleton-profile-bar" />
      </div>
      <div className="stripchat-skeleton stripchat-skeleton-chat-panel" />
    </div>
  );
}

export default function StripchatApiSkeleton({
  variant = "grid",
  count = 4,
  className = "",
}) {
  if (variant === "profile") {
    return (
      <div
        className={`stripchat-api-skeleton ${className}`}
        role="status"
        aria-label="Loading model profile"
        aria-busy="true"
      >
        <ProfileSkeleton />
      </div>
    );
  }

  if (variant === "chat") {
    return (
      <div
        className={`stripchat-api-skeleton ${className}`}
        role="status"
        aria-label="Loading live chat"
        aria-busy="true"
      >
        <ChatSkeleton />
      </div>
    );
  }

  return (
    <div
      className={`stripchat-api-skeleton stripchat-skeleton-${variant} ${className}`}
      role="status"
      aria-label="Loading models"
      aria-busy="true"
    >
      {Array.from({ length: count }, (_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}
