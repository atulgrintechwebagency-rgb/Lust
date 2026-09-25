import React from "react";
import { Link } from "react-router-dom";
import { FaXTwitter, FaInstagram, FaDiscord, FaYoutube, FaChevronUp } from "react-icons/fa6";
import "./Footer.css";

function Footer() {
  // Operational back-to-top scroll handler method
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-container-inner flex-between items-center">
        
        {/* LEFT SECTION: BRANDING & SLOGAN META */}
        <div className="footer-left flex items-center">
          <Link to="/" className="footer-logo-link" aria-label="Lust Companion Home">
            <img src="/Images/logoicon.webp" alt="LUST COMPANION" className="footer-logo-img" />
          </Link>
          <span className="footer-slogan-divider" aria-hidden="true"></span>
          <p className="footer-slogan-text">More Than a Fantasy — A Community.</p>
        </div>

        {/* RIGHT SECTION: SOCIAL CONNECTIONS & INTERACTIVE SCROLL SHORTCUT */}
        <div className="footer-right flex items-center">
          <span className="footer-follow-label">Follow Us</span>
          
          <div className="footer-social-links flex items-center">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-icon-anchor" aria-label="Follow us on X">
              <FaXTwitter size={20} />
            </a>

            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-anchor" aria-label="Follow us on Instagram">
              <FaInstagram size={20} />
            </a>

            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="social-icon-anchor" aria-label="Join our Discord Server">
              <FaDiscord size={20} />
            </a>

            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon-anchor" aria-label="Subscribe on Youtube">
              <FaYoutube size={20} />
            </a>
          </div>

          {/* INTERACTIVE BACK TO TOP CONTROL KEY BUTTON */}
          <button 
            type="button" 
            className="footer-scroll-top-btn flex-center"
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
          >
            <FaChevronUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
