import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPageSlugForUrl(raw: string): string {
  if (!raw) return "";
  const parts = raw.trim().split("/").filter(Boolean);
  if (parts.length === 0 || raw === "/") return "home";

  const lastPart = parts[parts.length - 1]
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();

  const slugAliases: Record<string, string> = {
    ourprofile: "our-profile",
    ourclients: "our-clients",
    photogallery: "photo-gallery",
  };

  return slugAliases[lastPart] || lastPart;
}
