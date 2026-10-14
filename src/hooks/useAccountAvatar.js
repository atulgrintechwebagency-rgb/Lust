import { useEffect, useState } from "react";

export default function useAccountAvatar(url) {
  const [avatarState, setAvatarState] = useState({
    url: null,
    imageUrl: "",
  });

  useEffect(() => {
    if (!url) {
      return undefined;
    }

    if (url.startsWith("blob:")) {
      return undefined;
    }

    let objectUrl;
    const controller = new AbortController();

    const loadAvatar = async () => {
      try {
        const avatarUrl = new URL(url, window.location.origin);

        if (avatarUrl.origin !== window.location.origin) {
          setAvatarState({ url, imageUrl: avatarUrl.toString() });
          return;
        }

        const token =
          localStorage.getItem("auth_token") ||
          sessionStorage.getItem("auth_token");
        const headers = { Accept: "image/*" };

        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(avatarUrl, {
          headers,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Avatar image request failed (HTTP ${response.status}).`);
        }

        const image = await response.blob();
        objectUrl = URL.createObjectURL(image);
        setAvatarState({ url, imageUrl: objectUrl });
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Unable to load the account avatar:", error);
          setAvatarState({ url, imageUrl: "" });
        }
      }
    };

    loadAvatar();

    return () => {
      controller.abort();
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [url]);

  if (url?.startsWith("blob:")) {
    return url;
  }

  return avatarState.url === url ? avatarState.imageUrl : "";
}
