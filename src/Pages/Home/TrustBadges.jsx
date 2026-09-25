import React from "react";
import { MessageSquareMore, ShieldCheck, Lock, Heart } from "lucide-react";
import "./TrustBadges.css";

function TrustBadges() {
  const badgeItems = [
    {
      id: 1,
      icon: <MessageSquareMore size={30} strokeWidth={1.8} />,
      title: "24/7 Support",
      description: "We're here for you",
    },
    {
      id: 2,
      icon: <ShieldCheck size={30} strokeWidth={1.8} />,
      title: "Discreet Billing",
      description: "Your privacy matters",
    },
    {
      id: 3,
      icon: <Lock size={30} strokeWidth={1.8} />,
      title: "Secure & Safe",
      description: "Your data is protected",
    },
    {
      id: 4,
      icon: <Heart size={30} strokeWidth={1.8} />,
      title: "18+ Only",
      description: "Adults only platform",
    },
  ];

  return (
    <section className="trust-badges-section">
      <div className="container">
        <div className="trust-badges-wrapper">
          {badgeItems.map((badge, index) => (
            <React.Fragment key={badge.id}>
              {/* Badge Item Grid Block */}
              <div className="trust-badge-item flex items-center">
                <div className="badge-icon-outer flex-center">
                  <div className="badge-icon-inner flex-center">
                    {badge.icon}
                  </div>
                </div>
                
                <div className="badge-text-content">
                  <h4 className="badge-item-title">{badge.title}</h4>
                  <p className="badge-item-description">{badge.description}</p>
                </div>
              </div>
              
              {/* Vertical Divider (Hidden on the final element item) */}
              {index < badgeItems.length - 1 && (
                <div className="trust-vertical-divider" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustBadges;
