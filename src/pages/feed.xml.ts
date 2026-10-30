import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import site from "@/content/site.json";

export async function GET(context: any) {
  const posts = await getCollection("posts", ({ data }) => data.draft !== true);
  const sortedPosts = posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: "Spice Labs Blog",
    description: site.site_description,
    site: context.site || site.site_url,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description || "",
      pubDate: post.data.date,
      link: `/posts/${post.slug}/`
    })),
    customData: `<language>en-us</language>`
  });
}
