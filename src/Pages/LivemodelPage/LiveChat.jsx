import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    BadgeCheck,
    Bell,
    Check,
    ChevronDown,
    Clock3,
    Crown,
    Ellipsis,
    Heart,
    Maximize,
    MessageCircle,
    Mic,
    MoreHorizontal,
    Play,
    Send,
    ShieldCheck,
    Sparkles,
    UserPlus,
    Volume2,
    VolumeX,
    X,
    Zap,
} from 'lucide-react';


import './LiveChat.css';

/* =========================================================
   LIVE MODELS
========================================================= */

const liveModels = [
    {
        id: 1,
        name: 'Angelica',
        type: 'Big Tits',
        category: 'Blonde',
        image: '/Images/poster.webp',
        video: '/Images/livevideo.mp4',
        viewers: '1.2K',
        description:
            'Sweet, confident and ready to make your live chat feel personal.',
        tags: ['Blonde', 'Playful', 'Flirty'],
        verified: true,
        isLive: true,
        location: 'Online',
        age: '24',
        bio:
            'I love meeting new people, having fun conversations and creating memorable moments. Come into my room and say hi.',
        stats: {
            followers: '18.4K',
            likes: '42.8K',
            experience: '2 years',
        },
    },
    {
        id: 2,
        name: 'Kira',
        type: 'Brunette',
        category: 'Brunette',
        image: '/Images/gallery8.webp',
        video: '/Images/livevideo2.mp4',
        viewers: '842',
        description:
            'A mysterious brunette with a playful side and plenty to say.',
        tags: ['Brunette', 'Private', 'Mysterious'],
        verified: true,
        isLive: true,
        location: 'Online',
        age: '26',
        bio:
            'I enjoy playful conversations, meeting interesting people and making every chat feel personal.',
        stats: {
            followers: '14.2K',
            likes: '35.7K',
            experience: '3 years',
        },
    },
    {
        id: 3,
        name: 'Lexi',
        type: 'Petite',
        category: 'Petite',
        image: '/Images/gallery9.webp',
        video: '/Images/livevideo.mp4',
        viewers: '693',
        description:
            'Petite, playful and always ready to keep the conversation going.',
        tags: ['Petite', 'Sweet', 'Playful'],
        verified: true,
        isLive: true,
        location: 'Online',
        age: '23',
        bio:
            'I am always up for a fun conversation and getting to know someone new.',
        stats: {
            followers: '11.8K',
            likes: '28.4K',
            experience: '1 year',
        },
    },
    {
        id: 4,
        name: 'Valentina',
        type: 'Latina',
        category: 'Latina',
        image: '/Images/Gallery10.webp',
        video: '/Images/livevideo2.mp4',
        viewers: '521',
        description:
            'Confident energy, warm conversation and an unforgettable presence.',
        tags: ['Latina', 'Confident', 'Passionate'],
        verified: true,
        isLive: true,
        location: 'Online',
        age: '25',
        bio:
            'I love connecting with people and creating a warm, fun and memorable experience.',
        stats: {
            followers: '16.1K',
            likes: '39.2K',
            experience: '2 years',
        },
    },
    {
        id: 5,
        name: 'Harper',
        type: 'Blonde',
        category: 'Blonde',
        image: '/Images/Gallery11.webp',
        video: '/Images/livevideo.mp4',
        viewers: '404',
        description:
            'A fun-loving blonde who knows how to make every chat interesting.',
        tags: ['Blonde', 'Friendly', 'Playful'],
        verified: true,
        isLive: true,
        location: 'Online',
        age: '24',
        bio:
            'I enjoy meeting new people and turning ordinary conversations into something memorable.',
        stats: {
            followers: '9.8K',
            likes: '21.5K',
            experience: '1 year',
        },
    },
    {
        id: 6,
        name: 'Sienna',
        type: 'Tattooed',
        category: 'Tattooed',
        image: '/Images/Gallery12.webp',
        video: '/Images/livevideo2.mp4',
        viewers: '318',
        description:
            'Bold personality, unique style and a private experience made for you.',
        tags: ['Tattooed', 'Bold', 'Creative'],
        verified: true,
        isLive: true,
        location: 'Online',
        age: '27',
        bio:
            'Creative, confident and always interested in meeting someone with a great personality.',
        stats: {
            followers: '8.4K',
            likes: '18.7K',
            experience: '3 years',
        },
    },
];

/* =========================================================
   QUICK MESSAGES
========================================================= */

const quickMessages = [
    'Hey 👋',
    'You look amazing!',
    'How are you?',
    'Tell me something fun',
];

/* =========================================================
   HELPERS
========================================================= */

const getCurrentTime = () =>
    new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

/* =========================================================
   LIVE CHAT
========================================================= */

const LiveChat = () => {
    const { modelId } = useParams();

    const currentModelId = Number(modelId) || 1;

    const model =
        liveModels.find(
            (item) => item.id === currentModelId
        ) || liveModels[0];

    /* =======================================================
       OTHER ONLINE MODELS
    ======================================================= */

    const onlineModels = liveModels
        .filter((item) => item.id !== model.id && item.isLive)
        .slice(0, 4);

    const videoRef = useRef(null);
    const chatMessagesRef = useRef(null);
    const moreMenuRef = useRef(null);

    const [messages, setMessages] = useState([
        {
            id: 1,
            user: model.name,
            message: `Hey! Welcome to my room 😘`,
            time: 'Now',
            isModel: true,
        },
        {
            id: 2,
            user: 'Daniel',
            message: 'Hey! You look amazing.',
            time: 'Now',
            isModel: false,
        },
        {
            id: 3,
            user: model.name,
            message: 'Thank you ❤️ I’m happy you’re here.',
            time: 'Now',
            isModel: true,
        },
    ]);

    const [message, setMessage] = useState('');
    const [liked, setLiked] = useState(false);
    const [onlineModelLikes, setOnlineModelLikes] = useState({});
    const [following, setFollowing] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showTips, setShowTips] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);

    /* =======================================================
       RESET WHEN MODEL CHANGES
    ======================================================= */

    useEffect(() => {
        setLiked(false);
        setFollowing(false);
        setShowInfo(false);
        setShowTips(false);
        setShowMore(false);

        setMessages([
            {
                id: Date.now(),
                user: model.name,
                message: `Hey! Welcome to my room 😘`,
                time: 'Now',
                isModel: true,
            },
            {
                id: Date.now() + 1,
                user: 'Daniel',
                message: 'Hey! You look amazing.',
                time: 'Now',
                isModel: false,
            },
            {
                id: Date.now() + 2,
                user: model.name,
                message: 'Thank you ❤️ I’m happy you’re here.',
                time: 'Now',
                isModel: true,
            },
        ]);
    }, [model.id, model.name]);

    /* =======================================================
       PAGE TITLE
    ======================================================= */

    useEffect(() => {
        document.title = `${model.name} Live Chat | Lust Companion`;

        return () => {
            document.title = 'Lust Companion';
        };
    }, [model.name]);

    /* =======================================================
       AUTOPLAY VIDEO
    ======================================================= */

    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        video.muted = true;
        setIsMuted(true);

        const playVideo = async () => {
            try {
                await video.play();
                setIsPlaying(true);
            } catch {
                setIsPlaying(false);
            }
        };

        playVideo();
    }, [model.id]);

    /* =======================================================
       CLOSE MORE MENU
    ======================================================= */

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                moreMenuRef.current &&
                !moreMenuRef.current.contains(event.target)
            ) {
                setShowMore(false);
            }
        };

        document.addEventListener(
            'mousedown',
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside
            );
        };
    }, []);

    /* =======================================================
       AUTO SCROLL CHAT
    ======================================================= */

    useEffect(() => {
        if (!chatMessagesRef.current) return;

        chatMessagesRef.current.scrollTop =
            chatMessagesRef.current.scrollHeight;
    }, [messages]);

    /* =======================================================
       SEND MESSAGE
    ======================================================= */

    const handleSendMessage = (event) => {
        event.preventDefault();

        const trimmedMessage = message.trim();

        if (!trimmedMessage) return;

        setMessages((previousMessages) => [
            ...previousMessages,
            {
                id: Date.now(),
                user: 'You',
                message: trimmedMessage,
                time: getCurrentTime(),
                isModel: false,
            },
        ]);

        setMessage('');
    };

    /* =======================================================
       QUICK MESSAGE
    ======================================================= */

    const handleQuickMessage = (quickMessage) => {
        setMessage(quickMessage);
    };

    /* =======================================================
       LIKE
    ======================================================= */

    const handleLike = () => {
        setLiked((previousLiked) => !previousLiked);
    };

    /* =======================================================
       FOLLOW
    ======================================================= */

    const handleFollow = () => {
        setFollowing(
            (previousFollowing) => !previousFollowing
        );
    };

    /* =======================================================
       PLAY / PAUSE
    ======================================================= */

    const handlePlayPause = async () => {
        const video = videoRef.current;

        if (!video) return;

        if (video.paused) {
            try {
                await video.play();
                setIsPlaying(true);
            } catch {
                setIsPlaying(false);
            }
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    /* =======================================================
       MUTE
    ======================================================= */

    const handleMuteToggle = () => {
        const video = videoRef.current;

        if (!video) return;

        video.muted = !video.muted;
        setIsMuted(video.muted);
    };

    /* =======================================================
       FULLSCREEN
    ======================================================= */

    const handleFullscreen = async () => {
        const video = videoRef.current;

        if (!video) return;

        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            } else if (video.requestFullscreen) {
                await video.requestFullscreen();
            }
        } catch {
            // Ignore fullscreen errors.
        }
    };

    /* =======================================================
       TIP
    ======================================================= */

    const handleTip = () => {
        setShowTips(true);
    };

    return (
        <>
            <main className="live-chat-page">
                {/* ===================================================
            TOP BAR
        ==================================================== */}

                <section className="live-chat-topbar">
                    <div className="container">
                        <div className="live-chat-topbar-inner">
                            <Link
                                to="/live-models"
                                className="live-chat-back"
                            >
                                <ArrowLeft size={17} />
                                <span>Back to Live Models</span>
                            </Link>

                            <div className="live-chat-security">
                                <ShieldCheck size={16} />
                                <span>Private & Secure</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===================================================
            LIVE ROOM
        ==================================================== */}

                <section className="live-chat-room section">
                    <div className="container">
                        <div className="live-chat-layout">
                            {/* =================================================
                  LEFT CONTENT
              ================================================== */}

                            <div className="live-chat-main">
                                {/* =================================================
                    VIDEO
                ================================================== */}

                                <div className="live-video-container">
                                    <video
                                        ref={videoRef}
                                        key={model.video}
                                        className="live-video-player"
                                        src={model.video}
                                        poster={model.image}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="auto"
                                        onPlay={() => setIsPlaying(true)}
                                        onPause={() => setIsPlaying(false)}
                                    />

                                    <div className="live-video-gradient" />

                                    {/* Video top information */}
                                    <div className="live-video-top">
                                        <div className="live-status">
                                            <span className="live-status-dot" />
                                            <span>LIVE</span>
                                        </div>

                                        <div className="live-viewers">
                                            <span className="live-viewers-dot" />
                                            <span>
                                                {model.viewers} watching
                                            </span>
                                        </div>
                                    </div>

                                    {/* Center play */}
                                    {!isPlaying && (
                                        <button
                                            type="button"
                                            className="live-video-center-play"
                                            onClick={handlePlayPause}
                                            aria-label="Play video"
                                        >
                                            <Play
                                                size={30}
                                                fill="currentColor"
                                            />
                                        </button>
                                    )}

                                    {/* Video controls */}
                                    <div className="live-video-controls">
                                        <button
                                            type="button"
                                            className="live-video-control"
                                            onClick={handlePlayPause}
                                            aria-label={
                                                isPlaying
                                                    ? 'Pause video'
                                                    : 'Play video'
                                            }
                                        >
                                            {isPlaying ? (
                                                <span className="pause-icon">
                                                    <span />
                                                    <span />
                                                </span>
                                            ) : (
                                                <Play
                                                    size={18}
                                                    fill="currentColor"
                                                />
                                            )}
                                        </button>

                                        <button
                                            type="button"
                                            className="live-video-control"
                                            onClick={handleMuteToggle}
                                            aria-label={
                                                isMuted
                                                    ? 'Unmute video'
                                                    : 'Mute video'
                                            }
                                        >
                                            {isMuted ? (
                                                <VolumeX size={18} />
                                            ) : (
                                                <Volume2 size={18} />
                                            )}
                                        </button>

                                        <div className="live-video-controls-spacer" />

                                        <span className="live-video-live-label">
                                            LIVE
                                        </span>

                                        <button
                                            type="button"
                                            className="live-video-control"
                                            onClick={handleFullscreen}
                                            aria-label="Fullscreen"
                                        >
                                            <Maximize size={18} />
                                        </button>
                                    </div>
                                </div>

                                {/* =================================================
                    CURRENT MODEL PROFILE
                ================================================== */}

                                <div className="live-model-details card">
                                    <div className="live-model-details-main">
                                        <div className="live-model-details-avatar-wrap">
                                            <img
                                                src={model.image}
                                                alt={model.name}
                                                className="live-model-details-avatar"
                                            />

                                            {model.isLive && (
                                                <span className="live-model-online-dot" />
                                            )}
                                        </div>

                                        <div className="live-model-details-content">
                                            <div className="live-model-name-row">
                                                <h2>{model.name}</h2>

                                                {model.verified && (
                                                    <span className="live-model-verified">
                                                        <BadgeCheck size={16} />
                                                        Verified
                                                    </span>
                                                )}
                                            </div>

                                            <div className="live-model-meta">
                                                <span>
                                                    {model.age} years old
                                                </span>

                                                <span className="live-model-meta-dot">
                                                    •
                                                </span>

                                                <span>{model.location}</span>

                                                <span className="live-model-meta-dot">
                                                    •
                                                </span>

                                                <span>{model.category}</span>
                                            </div>

                                            <p>{model.description}</p>

                                            <div className="live-model-tags">
                                                {model.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="badge"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="live-model-details-actions">
                                            <button
                                                type="button"
                                                className={`btn ${following
                                                        ? 'btn-primary'
                                                        : 'btn-outline'
                                                    } live-follow-button`}
                                                onClick={handleFollow}
                                            >
                                                {following ? (
                                                    <>
                                                        <Check size={17} />
                                                        Following
                                                    </>
                                                ) : (
                                                    <>
                                                        <UserPlus size={17} />
                                                        Follow
                                                    </>
                                                )}
                                            </button>

                                            <button
                                                type="button"
                                                className={`live-profile-like ${liked ? 'liked' : ''
                                                    }`}
                                                onClick={handleLike}
                                                aria-label={
                                                    liked
                                                        ? `Unlike ${model.name}`
                                                        : `Like ${model.name}`
                                                }
                                                aria-pressed={liked}
                                            >
                                                <Heart
                                                    size={19}
                                                    fill={
                                                        liked
                                                            ? 'currentColor'
                                                            : 'none'
                                                    }
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="live-model-stats">
                                        <div className="live-model-stat">
                                            <span className="live-model-stat-value">
                                                {model.stats.followers}
                                            </span>

                                            <span className="live-model-stat-label">
                                                Followers
                                            </span>
                                        </div>

                                        <div className="live-model-stat">
                                            <span className="live-model-stat-value">
                                                {model.stats.likes}
                                            </span>

                                            <span className="live-model-stat-label">
                                                Likes
                                            </span>
                                        </div>

                                        <div className="live-model-stat">
                                            <span className="live-model-stat-value">
                                                {model.stats.experience}
                                            </span>

                                            <span className="live-model-stat-label">
                                                Experience
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* =================================================
                    ABOUT
                ================================================== */}

                                <div className="live-about-card card">
                                    <div className="live-about-header">
                                        <div>
                                            <span className="section-eyebrow">
                                                Get to know her
                                            </span>

                                            <h3>
                                                About {model.name}
                                            </h3>
                                        </div>

                                        <button
                                            type="button"
                                            className="live-about-toggle"
                                            onClick={() =>
                                                setShowInfo(
                                                    (previousValue) =>
                                                        !previousValue
                                                )
                                            }
                                            aria-label={
                                                showInfo
                                                    ? 'Hide information'
                                                    : 'Show information'
                                            }
                                        >
                                            <ChevronDown
                                                size={19}
                                                className={
                                                    showInfo ? 'rotate' : ''
                                                }
                                            />
                                        </button>
                                    </div>

                                    <div
                                        className={`live-about-content ${showInfo ? 'expanded' : ''
                                            }`}
                                    >
                                        <p>{model.bio}</p>
                                    </div>

                                    {!showInfo && (
                                        <p className="live-about-preview">
                                            {model.bio}
                                        </p>
                                    )}
                                </div>

                                {/* =================================================
                    TRUST
                ================================================== */}

                                <div className="live-trust-row">
                                    <div className="live-trust-item">
                                        <ShieldCheck size={18} />
                                        <span>Secure chat</span>
                                    </div>

                                    <div className="live-trust-item">
                                        <Clock3 size={18} />
                                        <span>Available now</span>
                                    </div>

                                    <div className="live-trust-item">
                                        <Sparkles size={18} />
                                        <span>
                                            Premium experience
                                        </span>
                                    </div>
                                </div>

                            </div>

                            {/* =================================================
                  CHAT SIDEBAR
              ================================================== */}

                            <aside className="live-chat-sidebar">
                                <div className="live-chat-sidebar-inner">
                                    {/* Chat header */}
                                    <div className="live-chat-header">
                                        <div className="live-chat-header-info">
                                            <div className="live-chat-header-avatar-wrap">
                                                <img
                                                    src={model.image}
                                                    alt={model.name}
                                                    className="live-chat-header-avatar"
                                                />

                                                <span className="live-chat-online-dot" />
                                            </div>

                                            <div>
                                                <div className="live-chat-header-name">
                                                    <span>{model.name}</span>

                                                    {model.verified && (
                                                        <BadgeCheck size={15} />
                                                    )}
                                                </div>

                                                <span className="live-chat-header-status">
                                                    Live now
                                                </span>
                                            </div>
                                        </div>

                                        <div
                                            className="live-chat-more"
                                            ref={moreMenuRef}
                                        >
                                            <button
                                                type="button"
                                                className="live-chat-icon-button"
                                                onClick={() =>
                                                    setShowMore(
                                                        (previousValue) =>
                                                            !previousValue
                                                    )
                                                }
                                                aria-label="More options"
                                            >
                                                <Ellipsis size={20} />
                                            </button>

                                            {showMore && (
                                                <div className="live-more-menu">
                                                    <button type="button">
                                                        <Bell size={16} />
                                                        Notifications
                                                    </button>

                                                    <button type="button">
                                                        <MessageCircle size={16} />
                                                        Report room
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Intro */}
                                    <div className="live-chat-intro">
                                        <div className="live-chat-intro-icon">
                                            <Sparkles size={17} />
                                        </div>

                                        <div>
                                            <strong>
                                                You’re chatting with{' '}
                                                {model.name}
                                            </strong>

                                            <span>
                                                Be respectful and enjoy the
                                                conversation.
                                            </span>
                                        </div>
                                    </div>

                                    {/* Messages */}
                                    <div
                                        className="live-chat-messages"
                                        ref={chatMessagesRef}
                                    >
                                        {messages.map(
                                            (chatMessage) => (
                                                <div
                                                    key={chatMessage.id}
                                                    className={`live-chat-message ${chatMessage.isModel
                                                            ? 'model-message'
                                                            : 'user-message'
                                                        }`}
                                                >
                                                    {chatMessage.isModel && (
                                                        <img
                                                            src={model.image}
                                                            alt={model.name}
                                                            className="live-message-avatar"
                                                        />
                                                    )}

                                                    <div className="live-message-content">
                                                        <div className="live-message-meta">
                                                            <span className="live-message-user">
                                                                {chatMessage.user}
                                                            </span>

                                                            {chatMessage.isModel && (
                                                                <BadgeCheck
                                                                    size={13}
                                                                />
                                                            )}

                                                            <span className="live-message-time">
                                                                {chatMessage.time}
                                                            </span>
                                                        </div>

                                                        <div className="live-message-bubble">
                                                            {chatMessage.message}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>

                                    {/* Quick messages */}
                                    <div className="live-quick-messages">
                                        {quickMessages.map(
                                            (quickMessage) => (
                                                <button
                                                    type="button"
                                                    key={quickMessage}
                                                    onClick={() =>
                                                        handleQuickMessage(
                                                            quickMessage
                                                        )
                                                    }
                                                >
                                                    {quickMessage}
                                                </button>
                                            )
                                        )}
                                    </div>

                                    {/* Input */}
                                    <form
                                        className="live-chat-input-area"
                                        onSubmit={handleSendMessage}
                                    >
                                        <div className="live-chat-input-wrap">
                                            <input
                                                type="text"
                                                value={message}
                                                onChange={(event) =>
                                                    setMessage(
                                                        event.target.value
                                                    )
                                                }
                                                placeholder={`Message ${model.name}...`}
                                            />

                                            <button
                                                type="button"
                                                className="live-chat-mic"
                                                aria-label="Voice message"
                                            >
                                                <Mic size={17} />
                                            </button>
                                        </div>

                                        <button
                                            type="submit"
                                            className="live-chat-send"
                                            disabled={!message.trim()}
                                            aria-label="Send message"
                                        >
                                            <Send size={17} />
                                        </button>
                                    </form>

                                    {/* Actions */}
                                    <div className="live-chat-actions">
                                        <button
                                            type="button"
                                            className="live-chat-tip-button"
                                            onClick={handleTip}
                                        >
                                            <Zap size={16} />
                                            Send a Tip
                                        </button>

                                        <button
                                            type="button"
                                            className="live-chat-action-button"
                                            onClick={handleLike}
                                            aria-label="Like model"
                                        >
                                            <Heart
                                                size={16}
                                                fill={
                                                    liked
                                                        ? 'currentColor'
                                                        : 'none'
                                                }
                                            />
                                        </button>

                                        <button
                                            type="button"
                                            className="live-chat-action-button"
                                            aria-label="More"
                                        >
                                            <MoreHorizontal size={17} />
                                        </button>
                                    </div>

                                    <div className="live-chat-security-note">
                                        <ShieldCheck size={18} />
                                        <span>
                                            Your conversation is private
                                            and secure.
                                        </span>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>
                {/* =================================================
                    MORE ONLINE MODELS
                ================================================== */}

                <section className="more-online-models">
                    <div className="container">
                        <div className="more-online-models-header">
                            <div>
                                <span className="section-eyebrow">
                                    Discover more
                                </span>

                                <h2>
                                    More Online Models
                                </h2>

                                <p>
                                    Meet other models who are live
                                    right now.
                                </p>
                            </div>

                            <Link
                                to="/live-models"
                                className="more-online-view-all"
                            >
                                View All
                                <ArrowLeft
                                    size={15}
                                    className="view-all-arrow"
                                />
                            </Link>
                        </div>

                        <div className="more-online-models-grid">
                            {onlineModels.map(
                                (onlineModel) => (
                                    <Link
                                        key={onlineModel.id}
                                        to={`/live-chat/${onlineModel.id}`}
                                        className="online-model-card"
                                    >
                                        <div className="online-model-image-wrap">
                                            <img
                                                src={onlineModel.image}
                                                alt={onlineModel.name}
                                                className="online-model-image"
                                                loading="lazy"
                                            />

                                            <div className="online-model-image-overlay" />

                                            <div className="online-model-live">
                                                <span />
                                                LIVE
                                            </div>

                                            <div className="online-model-viewers">
                                                <span>
                                                    {onlineModel.viewers}
                                                </span>
                                                watching
                                            </div>

                                                <button
                                                type="button"
                                                className={`online-model-heart ${
                                                    onlineModelLikes[onlineModel.id] ? 'liked' : ''
                                                }`}
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    event.stopPropagation();

                                                    setOnlineModelLikes((previousLikes) => ({
                                                    ...previousLikes,
                                                    [onlineModel.id]: !previousLikes[onlineModel.id],
                                                    }));
                                                }}
                                                aria-label={
                                                    onlineModelLikes[onlineModel.id]
                                                    ? `Unlike ${onlineModel.name}`
                                                    : `Like ${onlineModel.name}`
                                                }
                                                aria-pressed={Boolean(onlineModelLikes[onlineModel.id])}
                                                >
                                                <Heart
                                                    size={16}
                                                    fill={
                                                    onlineModelLikes[onlineModel.id]
                                                        ? 'currentColor'
                                                        : 'none'
                                                    }
                                                />
                                                </button>
                                        </div>

                                        <div className="online-model-info">
                                            <div className="online-model-name-row">
                                                <h3>
                                                    {onlineModel.name}
                                                </h3>

                                                {onlineModel.verified && (
                                                    <BadgeCheck
                                                        size={15}
                                                    />
                                                )}
                                            </div>

                                            <span className="online-model-type">
                                                {onlineModel.type}
                                            </span>

                                            <div className="online-model-footer">
                                                <div className="online-model-tags">
                                                    {onlineModel.tags
                                                        .slice(0, 2)
                                                        .map((tag) => (
                                                            <span key={tag}>
                                                                {tag}
                                                            </span>
                                                        ))}
                                                </div>

                                                <span className="online-model-chat">
                                                    Chat Now
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            )}
                        </div>
                    </div>
                </section>
            </main>

            {/* =====================================================
          TIP MODAL
      ====================================================== */}

            {showTips && (
                <div
                    className="live-tip-modal-backdrop"
                    onClick={() => setShowTips(false)}
                >
                    <div
                        className="live-tip-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <button
                            type="button"
                            className="live-tip-close"
                            onClick={() => setShowTips(false)}
                            aria-label="Close"
                        >
                            <X size={19} />
                        </button>

                        <div className="live-tip-icon">
                            <Crown size={25} />
                        </div>

                        <span className="section-eyebrow">
                            Show some love
                        </span>

                        <h2>
                            Send a Tip to {model.name}
                        </h2>

                        <p>
                            Support {model.name} and make your live
                            experience even more personal.
                        </p>

                        <div className="live-tip-options">
                            {['$5', '$10', '$25', '$50'].map(
                                (amount) => (
                                    <button
                                        type="button"
                                        key={amount}
                                        onClick={() =>
                                            setShowTips(false)
                                        }
                                    >
                                        {amount}
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LiveChat;