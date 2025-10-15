export const getImageUrl = (path?: string | null): string => {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "";

  if (!path) return "/default-avatar.png";
  if (path.startsWith("http")) return path;

  return `${backendUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};
