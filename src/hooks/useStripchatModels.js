import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_STRIPCHAT_MODELS_API_URL;

const formatCount = (count) =>
  new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(count);

const getModelCategory = (gender) => {
  const normalizedGender =
    typeof gender === "string" ? gender.trim().toLowerCase() : "";

  if (["malefemale", "femalemale", "couple"].includes(normalizedGender)) {
    return "Couple";
  }

  if (normalizedGender === "female" || normalizedGender === "females") {
    return "Female";
  }

  if (normalizedGender === "male" || normalizedGender === "males") {
    return "Male";
  }

  return "Other";
};

const getValidCount = (value) => {
  const count = typeof value === "number" ? value : Number(value);
  return Number.isFinite(count) && count >= 0 ? count : 0;
};

const getValidUrl = (value) => {
  if (typeof value !== "string" || !value.trim()) {
    return "";
  }

  try {
    const url = new URL(value.trim());
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
};

const mapModel = (model) => {
  const category = getModelCategory(model.gender);
  const gallery = [
    model.previewUrlThumbBig,
    model.previewUrl,
    model.snapshotUrl,
    model.popularSnapshotUrl,
    model.verifiedPopularSnapshotUrl,
    model.avatarUrl,
  ]
    .map(getValidUrl)
    .filter((url, index, urls) => url && urls.indexOf(url) === index);
  const streamUrl =
    getValidUrl(model.stream?.url) ||
    getValidUrl(model.stream?.urls?.["480p"]) ||
    getValidUrl(model.stream?.urls?.original) ||
    Object.values(model.stream?.urls || {})
      .map(getValidUrl)
      .find(Boolean) ||
    "";
  const avatarUrl = getValidUrl(model.avatarUrl);
  const languages = Array.isArray(model.languages)
    ? model.languages.filter(
        (language) => typeof language === "string" && language.trim()
      )
    : [];
  const streamWidth = getValidCount(model.stream?.width);
  const streamHeight = getValidCount(model.stream?.height);

  return {
    id: model.id,
    name: model.username,
    username: model.username,
    type: category,
    category,
    action: "Visit Stripchat",
    image:
      getValidUrl(model.previewUrlThumbBig) ||
      getValidUrl(model.previewUrl) ||
      getValidUrl(model.snapshotUrl) ||
      avatarUrl,
    avatarUrl,
    gallery,
    streamUrl,
    viewers: formatCount(getValidCount(model.viewersCount)),
    country:
      typeof model.modelsCountry === "string"
        ? model.modelsCountry.trim().toUpperCase()
        : "",
    languages,
    favoritedCount: getValidCount(model.favoritedCount),
    isNew: Boolean(model.isNew),
    broadcastHD: Boolean(model.broadcastHD),
    broadcastVR: Boolean(model.broadcastVR),
    broadcastMobile: Boolean(model.broadcastMobile),
    status: typeof model.status === "string" ? model.status.trim() : "",
    streamResolution:
      streamWidth > 0 && streamHeight > 0
        ? `${streamWidth} × ${streamHeight}`
        : "",
    tags: [
      ...languages.map((language) => language.toUpperCase()),
      ...(model.broadcastHD ? ["HD"] : []),
    ],
    profileUrl: `https://stripchat.com/${encodeURIComponent(model.username)}`,
  };
};

export const isStripchatModelLive = (model) =>
  model.status?.toLowerCase() === "public";

export default function useStripchatModels() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadModels = async () => {
      setLoading(true);
      setError("");

      try {
        if (!apiUrl) {
          throw new Error("VITE_STRIPCHAT_MODELS_API_URL is not configured.");
        }

        const response = await fetch(apiUrl, {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Stripchat API request failed (${response.status}).`);
        }

        const data = await response.json();
        if (!Array.isArray(data.models)) {
          throw new Error("Stripchat API returned an invalid models response.");
        }

        const validModels = data.models.filter(
          (model) =>
            model &&
            ((typeof model.id === "number" && Number.isFinite(model.id)) ||
              (typeof model.id === "string" && model.id.trim().length > 0)) &&
            typeof model.username === "string" &&
            model.username.trim().length > 0
        );

        setModels(validModels.map(mapModel));
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.message || "Unable to load live models.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadModels();
    return () => controller.abort();
  }, [reloadKey]);

  return {
    models,
    loading,
    error,
    retry: () => setReloadKey((key) => key + 1),
  };
}
