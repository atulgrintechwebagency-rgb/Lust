export function getAccountUser() {
  const storedUser =
    localStorage.getItem("auth_user") ||
    sessionStorage.getItem("auth_user");

  if (!storedUser) {
    return {};
  }

  try {
    const user = JSON.parse(storedUser);
    return user && typeof user === "object" ? user : {};
  } catch (error) {
    console.error("Unable to read the saved account profile:", error);
    return {};
  }
}

export function getAccountAvatarUrl(user) {
  if (!user?.avatar) {
    return "";
  }

  if (!user.avatar_cache_key) {
    return user.avatar;
  }

  const avatarUrl = new URL(user.avatar, window.location.origin);
  avatarUrl.searchParams.set("v", String(user.avatar_cache_key));
  return avatarUrl.origin === window.location.origin
    ? `${avatarUrl.pathname}${avatarUrl.search}${avatarUrl.hash}`
    : avatarUrl.toString();
}
