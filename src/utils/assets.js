/**
 * Helper to resolve public asset paths dynamically taking into account
 * Vite's import.meta.env.BASE_URL for GitHub Pages deployment.
 */
export const getAssetPath = (path) => {
  if (!path) return '';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL || '/';
  return baseUrl.endsWith('/') ? `${baseUrl}${cleanPath}` : `${baseUrl}/${cleanPath}`;
};
