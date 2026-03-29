export const ADMIN_TOKEN_KEY = "prasad_explains_admin_token";

export const getAdminToken = () => (typeof window !== "undefined" ? window.localStorage.getItem(ADMIN_TOKEN_KEY) : null);

export const setAdminToken = (token: string) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(ADMIN_TOKEN_KEY, token);
  }
};

export const clearAdminToken = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(ADMIN_TOKEN_KEY);
  }
};

export const getAuthHeaders = () => {
  const token = getAdminToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
