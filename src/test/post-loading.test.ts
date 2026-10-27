import { describe, expect, it } from "vitest";
import { getPost, posts } from "@/content/posts";
import { postSlugs } from "@/content/slugs";

describe("Lightweight blog listings", () => {
  it("keeps listing fields synchronized without including article bodies", async () => {
    expect(posts.map((post) => post.slug).sort()).toEqual([...postSlugs].sort());
    for (const summary of posts) {
      const full = await getPost(summary.slug);
      expect(full).toBeDefined();
      if (!full) throw new Error(`Missing article: ${summary.slug}`);
      const { body, takeaways, ...fields } = full;
      expect(summary).toEqual(fields);
      expect(body.length).toBeGreaterThan(0);
      expect(takeaways.length).toBeGreaterThan(0);
      expect(summary).not.toHaveProperty("body");
    }
  });

  it("does not load a module for unknown article slugs", async () => {
    expect(await getPost("missing-article")).toBeUndefined();
  });
});