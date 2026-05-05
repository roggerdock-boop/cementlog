import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "cementhub_admin_token";

let _token: string | null = sessionStorage.getItem(STORAGE_KEY);
const listeners = new Set<() => void>();

function getToken(): string | null {
  return _token;
}

function notifyListeners() {
  for (const l of listeners) l();
}

export function useAdmin() {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const listener = () => forceUpdate((n) => n + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const token = getToken();
  const isAuthenticated = token !== null;

  const setToken = useCallback((t: string) => {
    _token = t;
    sessionStorage.setItem(STORAGE_KEY, t);
    notifyListeners();
  }, []);

  const clearToken = useCallback(() => {
    _token = null;
    sessionStorage.removeItem(STORAGE_KEY);
    notifyListeners();
  }, []);

  return { token, isAuthenticated, setToken, clearToken };
}
