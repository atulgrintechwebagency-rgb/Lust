import { useSyncExternalStore } from "react";

export const isAuthenticated = () =>
  Boolean(
    localStorage.getItem("auth_token") ||
      sessionStorage.getItem("auth_token")
  );

const subscribeToAuthChanges = (onChange) => {
  window.addEventListener("auth-change", onChange);
  window.addEventListener("storage", onChange);

  return () => {
    window.removeEventListener("auth-change", onChange);
    window.removeEventListener("storage", onChange);
  };
};

export const useIsAuthenticated = () =>
  useSyncExternalStore(
    subscribeToAuthChanges,
    isAuthenticated,
    () => false
  );