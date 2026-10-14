import { useCallback, useEffect, useState } from "react";

const provider = "stripchat";
const apiBaseUrl = import.meta.env.VITE_LARAVEL_API_URL?.replace(/\/+$/, "");

const getToken = () =>
  localStorage.getItem("auth_token") ||
  sessionStorage.getItem("auth_token");

const getLikeId = (like) => String(like.external_model_id ?? like.model_id ?? "");

export default function useLikes() {
  const [likes, setLikes] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pendingIds, setPendingIds] = useState([]);
  const [error, setError] = useState("");

  const loadLikes = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setLikes([]);
      setTotal(0);
      setError("");
      return;
    }

    if (!apiBaseUrl) {
      setError("Likes service is not configured.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const allLikes = [];
      let page = 1;
      let lastPage = 1;
      let reportedTotal = null;

      do {
        const response = await fetch(`${apiBaseUrl}/likes?page=${page}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = (await response.json().catch(() => null)) || {};

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || `Unable to load likes (HTTP ${response.status}).`
          );
        }

        const pagination = result.data || {};
        const pageLikes = pagination.data;
        if (!Array.isArray(pageLikes)) {
          throw new Error("Likes service returned an invalid response.");
        }

        allLikes.push(...pageLikes);
        const pageTotal = Number(pagination.total);
        if (Number.isFinite(pageTotal)) {
          reportedTotal = pageTotal;
        }
        lastPage = Number(pagination.last_page) || page;
        page += 1;
      } while (page <= lastPage);

      setLikes(allLikes);
      setTotal(reportedTotal ?? allLikes.length);
    } catch (requestError) {
      setError(requestError.message || "Unable to load liked profiles.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialLoad = window.setTimeout(loadLikes, 0);
    const refreshLikes = () => loadLikes();
    window.addEventListener("likes-change", refreshLikes);
    window.addEventListener("auth-change", refreshLikes);
    window.addEventListener("storage", refreshLikes);

    return () => {
      window.clearTimeout(initialLoad);
      window.removeEventListener("likes-change", refreshLikes);
      window.removeEventListener("auth-change", refreshLikes);
      window.removeEventListener("storage", refreshLikes);
    };
  }, [loadLikes]);

  const toggleLike = useCallback(async (modelId) => {
    const id = String(modelId);
    const token = getToken();

    if (!token) {
      setError("Sign in to manage liked profiles.");
      return false;
    }
    if (!apiBaseUrl) {
      setError("Likes service is not configured.");
      return false;
    }
    if (pendingIds.includes(id)) {
      return false;
    }

    const liked = likes.some(
      (like) => like.provider === provider && getLikeId(like) === id
    );
    setPendingIds((current) => [...current, id]);
    setError("");

    try {
      const response = await fetch(
        liked
          ? `${apiBaseUrl}/likes/${encodeURIComponent(id)}`
          : `${apiBaseUrl}/likes`,
        {
          method: liked ? "DELETE" : "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(
            liked
              ? { provider }
              : { provider, model_id: modelId }
          ),
        }
      );
      const result = (await response.json().catch(() => null)) || {};

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            `Unable to ${liked ? "remove" : "save"} this profile (HTTP ${response.status}).`
        );
      }

      await loadLikes();
      window.dispatchEvent(new CustomEvent("likes-change"));
      return true;
    } catch (requestError) {
      const message =
        requestError.message || "Unable to update liked profiles.";
      setError(message);
      window.dispatchEvent(
        new CustomEvent("auth-change", {
          detail: { message },
        })
      );
      return false;
    } finally {
      setPendingIds((current) => current.filter((pendingId) => pendingId !== id));
    }
  }, [likes, loadLikes, pendingIds]);

  const likedIds = new Set(
    likes
      .filter((like) => like.provider === provider)
      .map(getLikeId)
  );

  return {
    likes,
    likedIds,
    total,
    loading,
    error,
    pendingIds: new Set(pendingIds),
    toggleLike,
    refresh: loadLikes,
  };
}
