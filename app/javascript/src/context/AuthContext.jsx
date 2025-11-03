import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

// Shape of JSON:API from Rails UserSerializer
// { data: { id: string, type: 'user', attributes: { ... } } } or { data: null }
function parseUser(json) {
  if (!json || !json.data) return null;
  const { id, attributes } = json.data;
  return { id, ...attributes };
}

const AuthContext = createContext({
  user: null,
  loading: true,
  isAuthenticated: false,
  refresh: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/me", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        credentials: "same-origin",
      });
      if (!res.ok) throw new Error(`/api/v1/me ${res.status}`);
      const data = await res.json();
      setUser(parseUser(data));
    } catch (err) {
      // If request fails, assume not authenticated
      setUser(null);
      // Optionally log err
      // console.warn("Auth refresh error", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({ user, loading, isAuthenticated: !!user, refresh }),
    [user, loading, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
