import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Eye,
  Heart,
  Languages,
  MessageCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import useStripchatModels from "../../hooks/useStripchatModels";
import StripchatApiSkeleton from "../../Components/StripchatApiSkeleton";
import "./LiveChat.css";

const formatCount = (value) =>
  new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

const safeDemoMessages = [
  "Hello! 👋",
  "You look great!",
  "How are you?",
  "Enjoying the stream!",
];

const safeRoomReplies = [
  "Thanks for joining the room! 😊",
  "Welcome! Hope you enjoy the stream.",
  "Thanks for keeping the chat friendly! ✨",
  "Great to have you here! 👋",
];

export default function LiveChat() {
  const { modelId } = useParams();
  const { models, loading, error, retry } = useStripchatModels();
  const videoRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const nextMessageIdRef = useRef(6);
  const replyTimeoutRef = useRef(null);
  const [streamError, setStreamError] = useState("");
  const [replyPending, setReplyPending] = useState(false);
  const [demoMessages, setDemoMessages] = useState([
    { id: 1, user: "MiaFan", message: "Hi everyone! 👋", time: "10:22" },
    { id: 2, user: "Alex", message: "The stream looks great today.", time: "10:24" },
    { id: 3, user: "SunnyDay", message: "Hello from Tokyo!", time: "10:25" },
    { id: 4, user: "MiaFan", message: "Hope everyone is having a lovely day ❤️", time: "10:27" },
    { id: 5, user: "Chris", message: "First time here, nice to meet you all.", time: "10:29" },
  ]);
  const identifier = modelId?.trim().toLowerCase();
  const model = models.find(
    (item) =>
      String(item.id) === modelId ||
      item.username?.trim().toLowerCase() === identifier
  );
  const isLive = model?.status.toLowerCase() === "public";
  const streamUrl = model?.streamUrl;
  const modelName = model?.name;

  useEffect(() => {
    const chat = chatMessagesRef.current;
    if (chat) {
      chat.scrollTop = chat.scrollHeight;
    }
  }, [demoMessages]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isLive || !streamUrl) return undefined;

    setStreamError("");
    let hls;
    let disposed = false;

    const loadStream = async () => {
      try {
        if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = streamUrl;
          return;
        }

        const { default: Hls } = await import("hls.js/light");
        if (disposed) return;

        if (!Hls.isSupported()) {
          setStreamError("This browser does not support HLS live streams.");
          return;
        }

        hls = new Hls();
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            setStreamError(
              "The live stream could not be played. Please try again later."
            );
            hls.destroy();
          }
        });
        hls.loadSource(streamUrl);
        hls.attachMedia(video);
      } catch {
        if (!disposed) {
          setStreamError("The live stream player could not be initialized.");
        }
      }
    };

    loadStream();

    return () => {
      disposed = true;
      hls?.destroy();
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [isLive, streamUrl]);

  useEffect(() => {
    if (modelName) {
      document.title = `${modelName} Live | Lust Companion`;
    }
    return () => {
      document.title = "Lust Companion";
    };
  }, [modelName]);

  useEffect(
    () => () => {
      window.clearTimeout(replyTimeoutRef.current);
    },
    []
  );

  const handleDemoMessage = (text) => {
    if (!safeDemoMessages.includes(text) || replyPending) return;

    const messageId = nextMessageIdRef.current;
    nextMessageIdRef.current += 1;
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const reply =
      safeRoomReplies[
        safeDemoMessages.indexOf(text) % safeRoomReplies.length
      ];

    setReplyPending(true);
    setDemoMessages((messages) =>
      [
        ...messages,
        {
          id: messageId,
          user: "You",
          message: text,
          time,
          isUser: true,
        },
      ].slice(-100)
    );

    replyTimeoutRef.current = window.setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setDemoMessages((messages) =>
        [
          ...messages,
          {
            id: nextMessageIdRef.current,
            user: "Room",
            message: reply,
            time: replyTime,
          },
        ].slice(-100)
      );
      nextMessageIdRef.current += 1;
      setReplyPending(false);
    }, 700);
  };

  if (loading) {
    return (
      <main className="live-chat-page">
        <div className="container live-chat-room section">
          <StripchatApiSkeleton variant="chat" />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="live-chat-page">
        <div className="container live-chat-state" role="alert">
          <h1>Live stream could not be loaded</h1>
          <p>{error}</p>
          <button type="button" className="btn btn-primary" onClick={retry}>
            Try again
          </button>
        </div>
      </main>
    );
  }

  if (!model) {
    return (
      <main className="live-chat-page">
        <div className="container live-chat-state" role="status">
          <h1>Model not found</h1>
          <p>This model is not available in the current models feed.</p>
          <Link to="/live-models" className="btn btn-outline">
            <ArrowLeft size={17} />
            Back to live models
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="live-chat-page">
      <section className="live-chat-topbar">
        <div className="container live-chat-topbar-inner">
          <Link
            to={`/live-model/${encodeURIComponent(model.id)}`}
            className="live-chat-back"
          >
            <ArrowLeft size={17} />
            <span>Back to {model.name}&apos;s profile</span>
          </Link>
          <div className="live-chat-security">
            <span className="live-status-dot" />
            <span>{isLive ? "LIVE NOW" : model.status || "OFFLINE"}</span>
          </div>
        </div>
      </section>

      <section className="live-chat-room section">
        <div className="container">
          {!isLive ? (
            <div className="live-chat-state" role="status">
              <h1>{model.name} is not live right now</h1>
              <p>Come back when this model is broadcasting.</p>
            </div>
          ) : !model.streamUrl ? (
            <div className="live-chat-state" role="alert">
              <h1>Live stream unavailable</h1>
              <p>The API did not provide a valid HLS stream URL.</p>
            </div>
          ) : (
            <div className="live-chat-layout">
              <div className="live-chat-main">
                <div className="live-video-container">
                  <video
                    ref={videoRef}
                    className="live-video-player"
                    poster={model.image}
                    autoPlay
                    muted
                    playsInline
                    controls
                  />
                  <div className="live-video-top">
                    <span className="live-status">
                      <span className="live-status-dot" />
                      LIVE
                    </span>
                    <span className="live-viewers">
                      <Eye size={15} />
                      {model.viewers} watching
                    </span>
                  </div>
                  {streamError && (
                    <div className="live-video-error" role="alert">
                      {streamError}
                    </div>
                  )}
                </div>

                <article className="live-model-details">
                  <div className="live-model-details-main">
                    <div className="live-model-details-avatar-wrap">
                      <img
                        src={model.avatarUrl || model.image}
                        alt=""
                        className="live-model-details-avatar"
                      />
                      <span className="live-model-online-dot" />
                    </div>
                    <div className="live-model-details-content">
                      <div className="live-model-name-row">
                        <h1>{model.name}</h1>
                      </div>
                      <div className="live-model-meta">
                        {model.category}
                        {model.country && (
                          <>
                            <span className="live-model-meta-dot">•</span>
                            {model.country}
                          </>
                        )}
                        {model.streamResolution && (
                          <>
                            <span className="live-model-meta-dot">•</span>
                            {model.streamResolution}
                          </>
                        )}
                      </div>
                      <div className="live-model-tags">
                        {model.broadcastHD && <span>HD</span>}
                        {model.broadcastVR && <span>VR</span>}
                        {model.broadcastMobile && <span>Mobile</span>}
                        {model.isNew && <span>New</span>}
                      </div>
                    </div>
                  </div>
                  <div className="live-model-stats">
                    <div className="live-model-stat">
                      <span className="live-model-stat-value">
                        <Eye size={16} /> {model.viewers}
                      </span>
                      <span className="live-model-stat-label">Watching</span>
                    </div>
                    <div className="live-model-stat">
                      <span className="live-model-stat-value">
                        <Heart size={16} /> {formatCount(model.favoritedCount)}
                      </span>
                      <span className="live-model-stat-label">Favorites</span>
                    </div>
                    {model.languages.length > 0 && (
                      <div className="live-model-stat">
                        <span className="live-model-stat-value">
                          <Languages size={16} />
                          {model.languages
                            .map((language) => language.toUpperCase())
                            .join(", ")}
                        </span>
                        <span className="live-model-stat-label">Languages</span>
                      </div>
                    )}
                  </div>
                </article>
              </div>

              <aside className="live-chat-sidebar">
                <div className="live-chat-sidebar-inner">
                  <header className="live-chat-header">
                    <div className="live-chat-header-info">
                      <MessageCircle size={19} />
                      <div>
                        <div className="live-chat-header-name">Live Chat</div>
                        <span className="live-chat-header-status">
                          With {model.name}
                        </span>
                      </div>
                    </div>
                  </header>
                  <div
                    className="live-chat-messages"
                    ref={chatMessagesRef}
                    role="log"
                    aria-label="Demo live chat messages"
                    aria-live="polite"
                  >
                    {demoMessages.map((chatMessage) => (
                      <div
                        key={chatMessage.id}
                        className={`live-chat-message${
                          chatMessage.isUser ? " user-message" : ""
                        }`}
                      >
                        {!chatMessage.isUser && (
                          <img
                            src={model.avatarUrl || model.image}
                            alt=""
                            className="live-message-avatar"
                          />
                        )}
                        <div className="live-message-content">
                          <div className="live-message-meta">
                            <span className="live-message-user">
                              {chatMessage.user}
                            </span>
                            <span className="live-message-time">
                              {chatMessage.time}
                            </span>
                          </div>
                          <div className="live-message-bubble">
                            {chatMessage.message}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    className="live-quick-messages"
                    aria-label="Approved chat messages"
                  >
                    {safeDemoMessages.map((safeMessage) => (
                      <button
                        type="button"
                        key={safeMessage}
                        onClick={() => handleDemoMessage(safeMessage)}
                        disabled={replyPending}
                      >
                        {safeMessage}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
