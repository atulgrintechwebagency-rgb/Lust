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

import "./MyAccount.css";

const likedProfiles = [
    {
        id: 1,
        name: "Angelica",
        tagline: "Big Tits",
        viewers: "1.2K",
        image: "/Images/Chloe.webp",
    },
    {
        id: 2,
        name: "Kira",
        tagline: "Brunette",
        viewers: "842",
        image: "/Images/Luna.webp",
    },
    {
        id: 3,
        name: "Lexi",
        tagline: "Petite",
        viewers: "693",
        image: "/Images/aria.webp",
    },
    {
        id: 4,
        name: "Valentina",
        tagline: "Latina",
        viewers: "521",
        image: "/Images/Luna.webp",
    },
];

const liveModels = [
    {
        id: 1,
        name: "Angelica",
        tagline: "Big Tits",
        viewers: "1.2K",
        image: "/Images/Chloe.webp",
    },
    {
        id: 2,
        name: "Kira",
        tagline: "Brunette",
        viewers: "842",
        image: "/Images/Luna.webp",
    },
    {
        id: 3,
        name: "Lexi",
        tagline: "Petite",
        viewers: "693",
        image: "/Images/aria.webp",
    },
    {
        id: 4,
        name: "Valentina",
        tagline: "Latina",
        viewers: "521",
        image: "/Images/Luna.webp",
    },
    {
        id: 5,
        name: "Harper",
        tagline: "Blonde",
        viewers: "404",
        image: "/Images/Mia.webp",
    },
    {
        id: 6,
        name: "Sienna",
        tagline: "Tattooed",
        viewers: "318",
        image: "/Images/aria.webp",
    },
];

export const accountUser = {
    firstName: "Alex",
    lastName: "Morgan",
    name: "Alex Morgan",
    username: "alexmorgan",
    email: "alex@example.com",
    memberSince: "September 2026",
    membership: "Premium Member",
    avatar: "/Images/Avatar.webp",
};

export function AccountSidebar({ activeSection = "profile", onNavigate }) {
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
                        src={accountUser.avatar}
                        alt={accountUser.name}
                        onError={(event) => {
                            event.currentTarget.style.display = "none";
                        }}
                    />

                    <div className="account-avatar-fallback">
                        <User size={30} strokeWidth={1.5} />
                    </div>
                </div>

                <h2>{accountUser.name}</h2>

                <span className="account-username">
                    @{accountUser.username}
                </span>

                <span className="account-membership">
                    <span></span>
                    {accountUser.membership}
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
                        {likedProfiles.length}
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

function ProfileSection() {
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
                            <strong>{accountUser.name}</strong>
                        </div>
                    </div>

                    <div className="account-detail-item">
                        <div className="account-detail-icon">
                            <User size={17} />
                        </div>

                        <div>
                            <span>Username</span>
                            <strong>@{accountUser.username}</strong>
                        </div>
                    </div>

                    <div className="account-detail-item">
                        <div className="account-detail-icon">
                            <Mail size={17} />
                        </div>

                        <div>
                            <span>Email Address</span>
                            <strong>{accountUser.email}</strong>
                        </div>
                    </div>

                    <div className="account-detail-item">
                        <div className="account-detail-icon">
                            <CalendarDays size={17} />
                        </div>

                        <div>
                            <span>Member Since</span>
                            <strong>{accountUser.memberSince}</strong>
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
                        <strong>{likedProfiles.length}</strong>
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

function LikedProfilesSection() {
    const [liked, setLiked] = useState(
        likedProfiles.reduce((accumulator, profile) => {
            accumulator[profile.id] = true;
            return accumulator;
        }, {})
    );

    const toggleLike = (event, id) => {
        event.preventDefault();
        event.stopPropagation();

        setLiked((previous) => ({
            ...previous,
            [id]: !previous[id],
        }));
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

            <div className="account-model-grid">
                {likedProfiles.map((profile) => (
                    <Link
                        key={profile.id}
                        to={`/live-chat/${profile.id}`}
                        className="account-model-card"
                    >
                        <div className="account-model-image">
                            <img
                                src={profile.image}
                                alt={profile.name}
                            />

                            <div className="account-model-overlay"></div>

                            <span className="account-live-badge">
                                <span></span>
                                LIVE
                            </span>

                            <span className="account-viewer-count">
                                <Eye size={12} />
                                {profile.viewers} watching
                            </span>

                            <button
                                type="button"
                                className={`account-model-heart ${liked[profile.id] ? "liked" : ""
                                    }`}
                                onClick={(event) =>
                                    toggleLike(event, profile.id)
                                }
                                aria-label={
                                    liked[profile.id]
                                        ? `Unlike ${profile.name}`
                                        : `Like ${profile.name}`
                                }
                            >
                                <Heart
                                    size={16}
                                    fill={
                                        liked[profile.id]
                                            ? "currentColor"
                                            : "none"
                                    }
                                />
                            </button>
                        </div>

                        <div className="account-model-info">
                            <div>
                                <h3>{profile.name}</h3>

                                <p>
                                    {profile.tagline}
                                    <span>•</span>
                                    Live Now
                                </p>
                            </div>

                            <ChevronRight size={16} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

function SettingsSection() {
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
                        <p>{accountUser.email}</p>
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

function LiveModelsSection() {
    const [likedModels, setLikedModels] = useState({});

    const toggleLike = (event, id) => {
        event.preventDefault();
        event.stopPropagation();

        setLikedModels((previous) => ({
            ...previous,
            [id]: !previous[id],
        }));
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
                    {liveModels.slice(0, 4).map((model) => (
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
                                    <Eye size={12} />
                                    {model.viewers}
                                </div>

                                <button
                                    type="button"
                                    className={`account-live-heart ${likedModels[model.id] ? "liked" : ""
                                        }`}
                                    onClick={(event) =>
                                        toggleLike(event, model.id)
                                    }
                                    aria-label={
                                        likedModels[model.id]
                                            ? `Unlike ${model.name}`
                                            : `Like ${model.name}`
                                    }
                                    aria-pressed={Boolean(likedModels[model.id])}
                                >
                                    <Heart
                                        size={16}
                                        fill={
                                            likedModels[model.id]
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
                                        {model.tagline}
                                        <span>•</span>
                                        Live Now
                                    </p>
                                </div>

                                <span className="account-live-chat-link">
                                    Chat Now
                                    <ArrowRight size={14} />
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

    const renderContent = () => {
        if (activeSection === "liked") {
            return <LikedProfilesSection />;
        }

        if (activeSection === "settings") {
            return <SettingsSection />;
        }

        return <ProfileSection />;
    };

    return (
        <>
            <main className="account-page">
                <div className="container">
                    <div className="account-layout">
                        <AccountSidebar
                            activeSection={activeSection}
                            onNavigate={setActiveSection}
                        />

                        <div className="account-main">
                            {renderContent()}


                        </div>
                    </div>
                </div>
                <LiveModelsSection />
            </main>
        </>
    );
}

export default MyAccount;