/**
 * Typed, safe access to environment variables.
 * Only `VITE_*` vars are exposed to the client.
 */
function readEnv(key: string, fallback = ""): string {
  const value = import.meta.env[key as keyof ImportMetaEnv];
  return typeof value === "string" ? value : fallback;
}

export const env = {
  appUrl: readEnv("VITE_APP_URL", "http://localhost:5173"),
  mode: import.meta.env.MODE,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;
