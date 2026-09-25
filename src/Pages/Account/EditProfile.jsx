import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  AtSign,
  FileText,
  Camera,
  Save,
  ArrowLeft,
} from "lucide-react";

import { AccountSidebar, accountUser } from "./MyAccount";
import "./EditProfile.css";

function EditProfile() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("profile");

  const [formData, setFormData] = useState({
    firstName: accountUser.firstName,
    lastName: accountUser.lastName,
    username: accountUser.username,
    email: accountUser.email,
    bio: "Exploring new connections and discovering interesting conversations.",
  });

  const [profileImage, setProfileImage] = useState(
    accountUser.avatar
  );

  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
    setSaved(false);
  };

  const handleSidebarNavigation = (section) => {
    if (section === "profile") {
      navigate("/my-account");
      return;
    }

    if (section === "liked") {
      navigate("/my-account?section=liked");
      return;
    }

    setActiveSection(section);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <>
      <main className="edit-profile-page">
        <div className="container">
          <div className="edit-profile-layout">
            <AccountSidebar
              activeSection={activeSection}
              onNavigate={handleSidebarNavigation}
            />

            <section className="edit-profile-main">
              <div className="edit-profile-heading">
                <div>
                  <Link
                    to="/my-account"
                    className="edit-profile-back"
                  >
                    <ArrowLeft size={15} />
                    Back to Profile
                  </Link>

                  <span className="edit-profile-eyebrow">
                    <span></span>
                    Account Settings
                  </span>

                  <h1>Edit Profile</h1>

                  <p>
                    Update your personal information and profile
                    details.
                  </p>
                </div>
              </div>

              {saved && (
                <div className="edit-profile-success">
                  <span>✓</span>
                  Profile changes saved successfully.
                </div>
              )}

              <form
                className="edit-profile-form"
                onSubmit={handleSubmit}
              >
                <div className="edit-profile-card">
                  <div className="edit-profile-card-heading">
                    <div>
                      <span>Profile Image</span>
                      <h2>Personalize Your Profile</h2>
                    </div>
                  </div>

                  <div className="edit-profile-image-area">
                    <div className="edit-profile-avatar">
                      <img
                        src={profileImage}
                        alt={accountUser.name}
                        onError={(event) => {
                          event.currentTarget.style.display =
                            "none";
                        }}
                      />

                      <div className="edit-profile-avatar-fallback">
                        <User size={34} />
                      </div>
                    </div>

                    <div className="edit-profile-image-copy">
                      <h3>Profile Picture</h3>

                      <p>
                        Choose a clear image that represents
                        you.
                      </p>

                      <label
                        htmlFor="profile-image"
                        className="edit-profile-upload-btn"
                      >
                        <Camera size={15} />
                        Change Photo
                      </label>

                      <input
                        id="profile-image"
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleImageChange}
                        hidden
                      />
                    </div>
                  </div>
                </div>

                <div className="edit-profile-card">
                  <div className="edit-profile-card-heading">
                    <div>
                      <span>Personal Information</span>
                      <h2>Profile Details</h2>
                    </div>
                  </div>

                  <div className="edit-profile-fields">
                    <div className="edit-profile-field">
                      <label htmlFor="firstName">
                        First Name
                      </label>

                      <div className="edit-profile-input-wrap">
                        <User size={16} />

                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="First name"
                        />
                      </div>
                    </div>

                    <div className="edit-profile-field">
                      <label htmlFor="lastName">
                        Last Name
                      </label>

                      <div className="edit-profile-input-wrap">
                        <User size={16} />

                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Last name"
                        />
                      </div>
                    </div>

                    <div className="edit-profile-field">
                      <label htmlFor="username">
                        Username
                      </label>

                      <div className="edit-profile-input-wrap">
                        <AtSign size={16} />

                        <input
                          id="username"
                          name="username"
                          type="text"
                          value={formData.username}
                          onChange={handleChange}
                          placeholder="Username"
                        />
                      </div>
                    </div>

                    <div className="edit-profile-field">
                      <label htmlFor="email">
                        Email Address
                      </label>

                      <div className="edit-profile-input-wrap">
                        <Mail size={16} />

                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email address"
                        />
                      </div>
                    </div>

                    <div className="edit-profile-field edit-profile-field-full">
                      <label htmlFor="bio">About You</label>

                      <div className="edit-profile-input-wrap textarea-wrap">
                        <FileText size={16} />

                        <textarea
                          id="bio"
                          name="bio"
                          rows="5"
                          value={formData.bio}
                          onChange={handleChange}
                          placeholder="Tell us a little about yourself..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="edit-profile-actions">
                  <Link
                    to="/my-account"
                    className="edit-profile-cancel"
                  >
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    className="edit-profile-save"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default EditProfile;