const stripAccents = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const sanitizeRole = (value) => {
  const raw = String(value ?? "").trim().toLowerCase();
  const v = stripAccents(raw);

  const ADMIN_SYNONYMS = new Set(["admin", "administrador"]);
  const USER_SYNONYMS = new Set(["user", "usuario"]);

  if (ADMIN_SYNONYMS.has(v)) return "admin";
  if (USER_SYNONYMS.has(v)) return "user";

  return v === "admin" || v === "user" ? v : "user";
};

export const getObjectRole = (obj) => {
  return String(obj?.role ?? obj?.attributes?.role ?? "");
};

export const isAdmin = (obj) => sanitizeRole(getObjectRole(obj)) === "admin";
