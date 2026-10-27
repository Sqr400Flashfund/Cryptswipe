import type { Post, PostCategory, PostSummary } from "./types";
import { postSummaries } from "./post-summaries";
export { formatDate } from "@/lib/format-date";

const modules = import.meta.glob<{ default: Post }>("./posts/*.ts");

export const posts = postSummaries;

export const categories: PostCategory[] = ["Guides", "Comparisons", "Security", "Networks"];

export async function getPost(slug: string): Promise<Post | undefined> {
  const load = modules[`./posts/${slug}.ts`];
  if (!load) return undefined;
  return (await load()).default;
}

export function relatedPosts(post: PostSummary, n = 3) {
  const same = posts.filter((p) => p.slug !== post.slug && p.category === post.category);
  const rest = posts.filter((p) => p.slug !== post.slug && p.category !== post.category);
  return [...same, ...rest].slice(0, n);
}

