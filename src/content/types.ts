export type PostCategory = "Guides" | "Comparisons" | "Security" | "Networks";

export interface Post {
  slug: string;
  title: string;
  /** Meta description, 140–160 chars */
  description: string;
  keyword: string;
  category: PostCategory;
  /** ISO date, e.g. 2026-03-12 */
  date: string;
  updated: string;
  readMinutes: number;
  heroAlt: string;
  takeaways: string[];
  /** Markdown body. No H1. Starts with an intro paragraph, then ## H2 sections. */
  body: string;
}

export type PostSummary = Omit<Post, "body" | "takeaways">;
