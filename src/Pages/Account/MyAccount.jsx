import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    User,
    Heart,
    Settings,
    Pencil,
    Mail,
    CalendarDays,
    MessageCircle,
    ChevronRight,
    Eye,
    ArrowRight,
} from "lucide-react";

import { getAccountAvatarUrl, getAccountUser } from "../../utils/account";
import useAccountAvatar from "../../hooks/useAccountAvatar";
import useLikes from "../../hooks/useLikes";
import useStripchatModels from "../../hooks/useStripchatModels";
import "./MyAccount.css";

const getMemberSince = (createdAt) => {
    if (!createdAt) {
        return "—";
    }

    const date = new Date(createdAt);
    return Number.isNaN(date.getTime())
        ? "—"
        : date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
};

export function AccountSidebar({
    user,
    likeCount = 0,
    activeSection = "profile",
    onNavigate,
}) {
    const avatarUrl = useAccountAvatar(getAccountAvatarUrl(user));
    const handleNavigation = (section) => {
        if (onNavigate) {
            onNavigate(section);
        }
    };

    return (
        <aside className="account-sidebar">
            <div className="account-profile-card">
                <div className="account-avatar">
                    <img
                        key={avatarUrl}
                        src={avatarUrl}
                        alt={user.name}
                        onError={(event) => {
                            event.currentTarget.hidden = true;
                        }}
                        onLoad={(event) => {
                            event.currentTarget.hidden = false;
                        }}
                    />

                    <div className="account-avatar-fallback">
                        <User size={30} strokeWidth={1.5} />
                    </div>
                </div>

                <h2>{user.name || "My Account"}</h2>

                <span className="account-username">
                    @{user.username || ""}
                </span>

                <span className="account-membership">
                    <span></span>
                    {user.membership || "Member"}
                </span>

                <Link
                    to="/my-account/edit"
                    className="account-sidebar-edit-btn"
                >
                    <Pencil size={20} />
                    Edit Profile
                </Link>
            </div>

            <nav className="account-navigation">
                <button
                    type="button"
                    className={`account-nav-item ${activeSection === "profile" ? "active" : ""
                        }`}
                    onClick={() => handleNavigation("profile")}
                >
                    <span className="account-nav-icon">
                        <User size={22} />
                    </span>

                    <span>My Profile</span>

                    <ChevronRight size={20} className="account-nav-arrow" />
                </button>

                <button
                    type="button"
                    className={`account-nav-item ${activeSection === "liked" ? "active" : ""
                        }`}
                    onClick={() => handleNavigation("liked")}
                >
                    <span className="account-nav-icon">
                        <Heart size={22} />
                    </span>

                    <span>Liked Profiles</span>

                    <span className="account-nav-count">
                        {likeCount}
                    </span>
                </button>

                <button
                    type="button"
                    className={`account-nav-item ${activeSection === "settings" ? "active" : ""
                        }`}
                    onClick={() => handleNavigation("settings")}
                >
                    <span className="account-nav-icon">
                        <Settings size={22} />
                    </span>

                    <span>Settings</span>

                    <ChevronRight size={20} className="account-nav-arrow" />
                </button>
            </nav>
        </aside>
    );
}

function ProfileSection({ user, likeCount }) {
    return (
        <div className="account-content-section">
            <div className="account-section-heading">
                <div>
                    <span className="account-eyebrow">
                        <span></span>
                        Welcome Back
                    </span>

                    <h1>Your Profile</h1>

                    <p>
                        Keep your profile information up to date and discover
                        the companions you&apos;ve liked.
                    </p>
                </div>

                <Link
                    to="/my-account/edit"
                    className="account-outline-btn"
                >
                    <Pencil size={15} />
                    Edit Profile
                </Link>
            </div>

            <div className="account-details-card">
                <div className="account-card-heading">
                    <div>
                        <span>Personal Information</span>
                        <h2>Profile Details</h2>
                    </div>

                    <Link
                        to="/my-account/edit"
                        className="account-small-edit"
                        aria-label="Edit profile"
                    >
                        <Pencil size={15} />
                    </Link>
                </div>

                <div className="account-details-grid">
                    <div className="account-detail-item">
                        <div className="account-detail-icon">
                            <User size={17} />
                        </div>

                        <div>
                            <span>Full Name</span>
                            <strong>{user.name || "—"}</strong>
                        </div>
                    </div>

                    <div className="account-detail-item">
                        <div className="account-detail-icon">
                            <User size={17} />
                        </div>

                        <div>
                            <span>Username</span>
                            <strong>{user.username ? `@${user.username}` : "—"}</strong>
                        </div>
                    </div>

                    <div className="account-detail-item">
                        <div className="account-detail-icon">
                            <Mail size={17} />
                        </div>

                        <div>
                            <span>Email Address</span>
                            <strong>{user.email || "—"}</strong>
                        </div>
                    </div>

                    <div className="account-detail-item">
                        <div className="account-detail-icon">
                            <CalendarDays size={17} />
                        </div>

                        <div>
                            <span>Member Since</span>
                            <strong>{getMemberSince(user.created_at)}</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div className="account-stats-grid">
                <div className="account-stat-card">
                    <div className="account-stat-icon">
                        <Heart size={19} />
                    </div>

                    <div>
                        <strong>{likeCount}</strong>
                        <span>Liked Profiles</span>
                    </div>
                </div>

                <div className="account-stat-card">
                    <div className="account-stat-icon">
                        <MessageCircle size={19} />
                    </div>

                    <div>
                        <strong>0</strong>
                        <span>Conversations</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LikedProfilesSection({ likesState, models, modelsLoading, modelsError }) {
    const likedProfiles = likesState.likes
        .filter((like) => like.provider === "stripchat")
        .map((like) => ({
            ...like,
            model: models.find(
                (model) =>
                    String(model.id) === String(like.external_model_id)
            ),
        }));

    const removeLike = (event, id) => {
        event.preventDefault();
        event.stopPropagation();
        likesState.toggleLike(id);
    };

    return (
        <div className="account-content-section">
            <div className="account-section-heading">
                <div>
                    <span className="account-eyebrow">
                        <span></span>
                        Your Favorites
                    </span>

                    <h1>Liked Profiles</h1>

                    <p>
                        Profiles you&apos;ve saved for your next conversation.
                    </p>
                </div>

                <Link
                    to="/live-models"
                    className="account-discover-link"
                >
                    Discover More
                    <ArrowRight size={15} />
                </Link>
            </div>

            {likesState.error && (
                <p className="account-api-message" role="alert">
                    {likesState.error}
                </p>
            )}
            {modelsError && (
                <p className="account-api-message" role="alert">
                    {modelsError}
                </p>
            )}
            {likesState.loading && (
                <p className="account-api-message" role="status">
                    Loading your liked profiles…
                </p>
            )}
            <div className="account-model-grid">
                {likedProfiles.map(({ id, external_model_id: modelId, model }) => (
                    <article
                        key={id}
                        className="account-model-card"
                    >
                        <div className="account-model-image">
                            {model?.image ? (
                                <img src={model.image} alt={model.name} />
                            ) : (
                                <div className="account-model-placeholder">
                                    <Heart size={34} />
                                </div>
                            )}

                            {model && <div className="account-model-overlay"></div>}

                            <span className={`account-live-badge${model?.status?.toLowerCase() === "public" ? "" : " account-saved-badge"}`}>
                                {model?.status?.toLowerCase() === "public" ? (
                                    <><span></span>LIVE</>
                                ) : (
                                    "SAVED"
                                )}
                            </span>

                            {model?.status?.toLowerCase() === "public" && (
                                <span className="account-viewer-count">
                                    <Eye size={12} />
                                    {model.viewers} watching
                                </span>
                            )}

                            <button
                                type="button"
                                className="account-model-heart liked"
                                onClick={(event) =>
                                    removeLike(event, modelId)
                                }
                                disabled={likesState.pendingIds.has(String(modelId))}
                                aria-label={
                                    `Remove model ${modelId} from liked profiles`
                                }
                                aria-pressed="true"
                            >
                                <Heart size={16} fill="currentColor" />
                            </button>
                        </div>

                        <div className="account-model-info">
                            <div>
                                <h3>{model?.name || "Stripchat model"}</h3>

                                <p>
                                    {model
                                        ? `${model.type} · ${model.status?.toLowerCase() === "public" ? "Live now" : "Not live"}`
                                        : `Model ID: ${modelId}`}
                                </p>
                            </div>

                            {model && model.status?.toLowerCase() === "public" && (
                                <Link
                                    to={`/live-chat/${model.id}`}
                                    className="account-live-chat-link"
                                >
                                    Chat Now
                                    <ArrowRight size={14} />
                                </Link>
                            )}
                        </div>
                    </article>
                ))}
            </div>
            {!likesState.loading && !likesState.error && likedProfiles.length === 0 && (
                <p className="account-api-message" role="status">
                    You have no liked profiles yet.
                </p>
            )}
            {!modelsLoading && !modelsError && likedProfiles.some((profile) => !profile.model) && (
                <p className="account-api-message" role="status">
                    Some saved profiles are outside the current model feed. They remain saved to your account and can still be removed here.
                </p>
            )}
        </div>
    );
}

function SettingsSection({ user }) {
    return (
        <div className="account-content-section">
            <div className="account-section-heading">
                <div>
                    <span className="account-eyebrow">
                        <span></span>
                        Account
                    </span>

                    <h1>Settings</h1>

                    <p>
                        Manage your account preferences and profile settings.
                    </p>
                </div>
            </div>

            <div className="account-settings-card">
                <div className="account-settings-row">
                    <div className="account-settings-icon">
                        <Mail size={18} />
                    </div>

                    <div>
                        <h3>Email Address</h3>
                        <p>{user.email || "—"}</p>
                    </div>

                    <Link to="/my-account/edit">
                        Edit
                    </Link>
                </div>

                <div className="account-settings-row">
                    <div className="account-settings-icon">
                        <User size={18} />
                    </div>

                    <div>
                        <h3>Profile Information</h3>
                        <p>Update your name, username and bio.</p>
                    </div>

                    <Link to="/my-account/edit">
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    );
}

function LiveModelsSection({ models, likedIds, pendingIds, onToggleLike }) {
    const handleLikeClick = (event, id) => {
        event.preventDefault();
        event.stopPropagation();
        onToggleLike(id);
    };

    return (
        <section className="account-live-section">
            <div className="container">
                <div className="account-live-header">
                    <div>
                        <span className="account-eyebrow">
                            <span></span>
                            Live Right Now
                        </span>

                        <h2>Live Models Now</h2>

                        <p>
                            Meet someone new and start a live conversation.
                        </p>
                    </div>

                    <Link
                        to="/live-models"
                        className="account-discover-link"
                    >
                        View All Live Models
                        <ArrowRight size={15} />
                    </Link>
                </div>

                <div className="account-live-grid">
                    {models.slice(0, 4).map((model) => (
                        <Link
                            key={model.id}
                            to={`/live-chat/${model.id}`}
                            className="account-live-card"
                        >
                            <div className="account-live-image">
                                <img
                                    src={model.image}
                                    alt={model.name}
                                    loading="lazy"
                                />

                                <div className="account-live-image-overlay"></div>

                                <span className="account-live-card-badge">
                                    <span></span>
                                    LIVE
                                </span>

                                <div className="account-live-card-viewers">
                                    <Eye size={16} />
                                    {model.viewers}
                                </div>

                                <button
                                    type="button"
                                    className={`account-live-heart ${likedIds.has(String(model.id)) ? "liked" : ""
                                        }`}
                                    onClick={(event) =>
                                        handleLikeClick(event, model.id)
                                    }
                                    disabled={pendingIds.has(String(model.id))}
                                    aria-label={
                                        likedIds.has(String(model.id))
                                            ? `Unlike ${model.name}`
                                            : `Like ${model.name}`
                                    }
                                    aria-pressed={likedIds.has(String(model.id))}
                                >
                                    <Heart
                                        size={16}
                                        fill={
                                            likedIds.has(String(model.id))
                                                ? "currentColor"
                                                : "none"
                                        }
                                    />
                                </button>
                            </div>

                            <div className="account-live-card-content">
                                <div>
                                    <h3>{model.name}</h3>

                                    <p>
                                        {model.type}
                                        <span>•</span>
                                        Live Now
                                    </p>
                                </div>

                                <span className="account-live-chat-link">
                                    Chat Now
                                    <ArrowRight size={16} />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

function MyAccount() {
    const [activeSection, setActiveSection] = useState("profile");
    const [user, setUser] = useState(getAccountUser);
    const likesState = useLikes();
    const { models, loading: modelsLoading, error: modelsError } = useStripchatModels();

    React.useEffect(() => {
        const syncUser = () => setUser(getAccountUser());
        window.addEventListener("auth-change", syncUser);
        window.addEventListener("storage", syncUser);

        return () => {
            window.removeEventListener("auth-change", syncUser);
            window.removeEventListener("storage", syncUser);
        };
    }, []);

    const renderContent = () => {
        if (activeSection === "liked") {
            return (
                <LikedProfilesSection
                    likesState={likesState}
                    models={models}
                    modelsLoading={modelsLoading}
                    modelsError={modelsError}
                />
            );
        }

        if (activeSection === "settings") {
            return <SettingsSection user={user} />;
        }

        return <ProfileSection user={user} likeCount={likesState.total} />;
    };

    return (
        <>
            <main className="account-page">
                <div className="container">
                    <div className="account-layout">
                        <AccountSidebar
                            user={user}
                            likeCount={likesState.total}
                            activeSection={activeSection}
                            onNavigate={setActiveSection}
                        />

                        <div className="account-main">
                            {likesState.error && activeSection !== "liked" && (
                                <p className="account-api-message" role="alert">
                                    {likesState.error}
                                </p>
                            )}
                            {renderContent()}


                        </div>
                    </div>
                </div>
                <LiveModelsSection
                    models={models}
                    likedIds={likesState.likedIds}
                    pendingIds={likesState.pendingIds}
                    onToggleLike={likesState.toggleLike}
                />
            </main>
        </>
    );
}

export default MyAccount;