import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  ArrowUpRight,
  UserRound,
  LogOut,
  CheckCircle2,
} from "lucide-react";

import "./Header.css";

const getStoredAuthUser = () => {
  const token =
    localStorage.getItem("auth_token") ||
    sessionStorage.getItem("auth_token");
  const storedUser =
    localStorage.getItem("auth_user") ||
    sessionStorage.getItem("auth_user");

  if (!token || !storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authUser, setAuthUser] = useState(getStoredAuthUser);
  const [authNotice, setAuthNotice] = useState("");

  useEffect(() => {
    const syncAuthUser = (event) => {
      setAuthUser(getStoredAuthUser());

      if (event.detail?.message) {
        setAuthNotice(event.detail.message);
      }
    };

    window.addEventListener("auth-change", syncAuthUser);
    window.addEventListener("storage", syncAuthUser);

    return () => {
      window.removeEventListener("auth-change", syncAuthUser);
      window.removeEventListener("storage", syncAuthUser);
    };
  }, []);

  useEffect(() => {
    if (!authNotice) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setAuthNotice(""), 4000);
    return () => window.clearTimeout(timeoutId);
  }, [authNotice]);

  const handleLogout = async () => {
    const token =
      localStorage.getItem("auth_token") ||
      sessionStorage.getItem("auth_token");

    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("auth_user");
    setAuthUser(null);
    closeMobileMenu();
    window.dispatchEvent(
      new CustomEvent("auth-change", {
        detail: { message: "Logged out successfully." },
      })
    );

    const apiBaseUrl = import.meta.env.VITE_LARAVEL_API_URL?.replace(/\/+$/, "");

    if (!token || !apiBaseUrl) {
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/auth/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = (await response.json().catch(() => null)) || {};

      if (!response.ok || !data.success) {
        console.error(data.message || `Logout request failed (HTTP ${response.status}).`);
      }
    } catch (error) {
      console.error("Logout request failed:", error);
    }
  };

  const profileLabel =
    authUser?.name ||
    [authUser?.first_name, authUser?.last_name].filter(Boolean).join(" ") ||
    authUser?.firstName ||
    authUser?.username ||
    authUser?.email ||
    "My profile";

  /* ===== SCROLL STATE ===== */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ===== CLOSE MOBILE MENU ON DESKTOP ===== */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* ===== LOCK BODY SCROLL ===== */

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  /* ===== ESCAPE KEY ===== */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* ===== CLOSE MOBILE MENU ===== */

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  /* ===== RENDER ===== */

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-container container">

          {/* ===== LOGO ===== */}

          <Link
            to="/"
            className="site-logo"
            onClick={closeMobileMenu}
            aria-label="Lust Companion Home"
          >
            <span className="site-logo-icon">
              <img
                src="/Images/logoicon.webp"
                alt="Lust Companion"
              />
            </span>
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
              ================================================= */}

          <nav
            className="desktop-navigation"
            aria-label="Main navigation"
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `header-nav-link ${isActive ? "active" : ""}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/companions"
              className={({ isActive }) =>
                `header-nav-link ${isActive ? "active" : ""}`
              }
            >
              AI Companions
            </NavLink>

            <NavLink
              to="/live-models"
              className={({ isActive }) =>
                `header-nav-link ${isActive ? "active" : ""}`
              }
            >
              Live Models
            </NavLink>

            <NavLink
              to="/membership"
              className={({ isActive }) =>
                `header-nav-link ${isActive ? "active" : ""}`
              }
            >
              Membership
            </NavLink>

            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `header-nav-link ${isActive ? "active" : ""}`
              }
            >
              Shop
            </NavLink>
          </nav>

          {/* =================================================
              DESKTOP ACTIONS
              ================================================= */}

          <div className="header-actions">

            <button
              type="button"
              className="header-search-button"
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
            >
              <Search
                size={19}
                strokeWidth={1.8}
              />
            </button>

            {authUser ? (
              <>
                <Link to="/my-account" className="header-profile-link">
                  <UserRound size={17} />
                  <span>{profileLabel}</span>
                </Link>

                <button
                  type="button"
                  className="header-logout-button"
                  onClick={handleLogout}
                >
                  <LogOut size={17} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="header-signin">
                  Sign In
                </Link>

                <Link to="/register" className="header-join-button">
                  <span>Join Now</span>
                  <ArrowUpRight size={16} strokeWidth={2} />
                </Link>
              </>
            )}
          </div>

          {/* =================================================
              MOBILE MENU BUTTON
              ================================================= */}

          <button
            type="button"
            className="mobile-menu-button"
            onClick={() =>
              setMobileMenuOpen((previous) => !previous)
            }
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X
                size={25}
                strokeWidth={1.8}
              />
            ) : (
              <Menu
                size={25}
                strokeWidth={1.8}
              />
            )}
          </button>
        </div>
      </header>

      {authNotice && (
        <div className="header-auth-notice" role="status" aria-live="polite">
          <CheckCircle2 size={19} aria-hidden="true" />
          <span>{authNotice}</span>
        </div>
      )}

      {/* =====================================================
          MOBILE NAVIGATION
          ===================================================== */}

      <div
        className={`mobile-navigation ${
          mobileMenuOpen ? "is-open" : ""
        }`}
      >
        <div className="mobile-navigation-inner">

          <nav
            className="mobile-nav-list"
            aria-label="Mobile navigation"
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? "active" : ""}`
              }
              onClick={closeMobileMenu}
            >
              Home
            </NavLink>

            <NavLink
              to="/companions"
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? "active" : ""}`
              }
              onClick={closeMobileMenu}
            >
              AI Companions
            </NavLink>

            <NavLink
              to="/live-models"
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? "active" : ""}`
              }
              onClick={closeMobileMenu}
            >
              Live Models
            </NavLink>

            <NavLink
              to="/membership"
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? "active" : ""}`
              }
              onClick={closeMobileMenu}
            >
              Membership
            </NavLink>

            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? "active" : ""}`
              }
              onClick={closeMobileMenu}
            >
              Shop
            </NavLink>
          </nav>

          {/* =================================================
              MOBILE ACTIONS
              ================================================= */}

          <div className="mobile-navigation-actions">

            <button
              type="button"
              className="mobile-search-button"
              onClick={() => {
                setSearchOpen(true);
                setMobileMenuOpen(false);
              }}
            >
              <Search
                size={18}
                strokeWidth={1.8}
              />

              <span>Search</span>
            </button>

            {authUser ? (
              <>
                <Link
                  to="/my-account"
                  className="mobile-profile-button"
                  onClick={closeMobileMenu}
                >
                  <UserRound size={18} />
                  <span>{profileLabel}</span>
                </Link>

                <button
                  type="button"
                  className="mobile-logout-button"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="mobile-signin-button"
                  onClick={closeMobileMenu}
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="mobile-join-button"
                  onClick={closeMobileMenu}
                >
                  <span>Join Now</span>
                  <ArrowUpRight size={17} strokeWidth={2} />
                </Link>
              </>
            )}
          </div>

          {/* =================================================
              MOBILE FOOT NOTE
              ================================================= */}

          <div className="mobile-navigation-footer">
            <span>More than a chat.</span>
            <span className="mobile-footer-dot">•</span>
            <span>A connection.</span>
          </div>
        </div>
      </div>

      {/* =====================================================
          MOBILE BACKDROP
          ===================================================== */}

      <button
        type="button"
        aria-label="Close menu"
        className={`mobile-menu-backdrop ${
          mobileMenuOpen ? "is-visible" : ""
        }`}
        onClick={closeMobileMenu}
      />

      {/* =====================================================
          SEARCH OVERLAY
          ===================================================== */}

      <div
        className={`search-overlay ${
          searchOpen ? "is-open" : ""
        }`}
        aria-hidden={!searchOpen}
      >
        <div className="search-overlay-backdrop">
          <button
            type="button"
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
          />
        </div>

        <div className="search-overlay-content">

          <div className="search-overlay-header">
            <span className="search-overlay-label">
              Search
            </span>

            <button
              type="button"
              className="search-close-button"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
            >
              <X
                size={23}
                strokeWidth={1.8}
              />
            </button>
          </div>

          <form
            className="header-search-form"
            onSubmit={(event) => {
              event.preventDefault();

              const formData = new FormData(event.currentTarget);
              const query = formData.get("query");

              if (query) {
                window.location.href =
                  `/companions?search=${encodeURIComponent(query)}`;
              }
            }}
          >
            <Search
              size={25}
              strokeWidth={1.6}
            />

            <input
              type="search"
              name="query"
              placeholder="Search companions..."
              autoComplete="off"
              autoFocus={searchOpen}
            />

            <button
              type="submit"
              aria-label="Submit search"
            >
              <ArrowUpRight
                size={21}
                strokeWidth={1.8}
              />
            </button>
          </form>

          <p className="search-overlay-hint">
            Discover AI companions that match your mood,
            interests, and imagination.
          </p>
        </div>
      </div>
    </>
  );
}

export default Header;
