/** Prefix public paths with the GitHub Pages basePath when set. */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!path.startsWith("/") || path.startsWith("//") || path.startsWith("http")) {
    return path;
  }
  return `${base}${path}`;
}
