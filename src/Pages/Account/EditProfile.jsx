import { useEffect, useState } from "react";
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

import { getAccountAvatarUrl, getAccountUser } from "../../utils/account";
import useAccountAvatar from "../../hooks/useAccountAvatar";
import { AccountSidebar } from "./MyAccount";
import "./EditProfile.css";

function EditProfile() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("profile");
  const [user, setUser] = useState(getAccountUser);
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: user.name || "",
    username: user.username || "",
    email: user.email || "",
    about: user.about || "",
  });

  const [profileImage, setProfileImage] = useState(getAccountAvatarUrl(user));
  const avatarDisplayUrl = useAccountAvatar(profileImage);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    return () => {
      if (profileImage.startsWith("blob:")) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
    setError("");
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
    setAvatarFile(file);
    setSaved(false);
    setError("");
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSaved(false);
    setLoading(true);

    try {
      const token =
        localStorage.getItem("auth_token") ||
        sessionStorage.getItem("auth_token");
      const apiBaseUrl = import.meta.env.VITE_LARAVEL_API_URL?.replace(/\/+$/, "");

      if (!token) {
        throw new Error("Please sign in again to update your profile.");
      }

      if (!apiBaseUrl) {
        throw new Error("Profile service is not configured. Please try again later.");
      }

      const payload = new FormData();
      payload.append("_method", "PATCH");
      payload.append("name", formData.name.trim());
      payload.append("username", formData.username.trim().replace(/^@+/, ""));
      payload.append("email", formData.email.trim());
      payload.append("about", formData.about);

      if (avatarFile) {
        payload.append("avatar", avatarFile);
      }

      const response = await fetch(`${apiBaseUrl}/profile`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });
      const data = (await response.json().catch(() => null)) || {};

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            `Unable to update your profile (HTTP ${response.status}). Please try again.`
        );
      }

      const returnedUser = data.data?.user;
      if (!returnedUser) {
        throw new Error(
          "The profile was updated, but the server returned no user profile."
        );
      }
      const updatedUser = {
        ...returnedUser,
        avatar_cache_key: avatarFile
          ? Date.now()
          : user.avatar_cache_key,
      };

      const storage = localStorage.getItem("auth_token")
        ? localStorage
        : sessionStorage;
      storage.setItem("auth_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setFormData({
        name: updatedUser.name || "",
        username: updatedUser.username || "",
        email: updatedUser.email || "",
        about: updatedUser.about || "",
      });
      setProfileImage(getAccountAvatarUrl(updatedUser));
      setAvatarFile(null);
      setSaved(true);
      window.dispatchEvent(new CustomEvent("auth-change"));
    } catch (requestError) {
      setError(requestError.message || "Unable to update your profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="edit-profile-page">
        <div className="container">
          <div className="edit-profile-layout">
            <AccountSidebar
              user={user}
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
              {error && (
                <div className="edit-profile-error" role="alert">
                  {error}
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
                        key={avatarDisplayUrl}
                        src={avatarDisplayUrl}
                        alt={user.name || "Profile avatar"}
                        onError={(event) => {
                          event.currentTarget.hidden = true;
                        }}
                        onLoad={(event) => {
                          event.currentTarget.hidden = false;
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
                      <label htmlFor="name">
                        Full Name
                      </label>

                      <div className="edit-profile-input-wrap">
                        <User size={16} />

                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Full name"
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
                      <label htmlFor="about">About You</label>

                      <div className="edit-profile-input-wrap textarea-wrap">
                        <FileText size={16} />

                        <textarea
                          id="about"
                          name="about"
                          rows="5"
                          value={formData.about}
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
                    disabled={loading}
                  >
                    <Save size={16} />
                    {loading ? "Saving..." : "Save Changes"}
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