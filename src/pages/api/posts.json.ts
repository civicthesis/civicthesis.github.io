import { getCollection } from "astro:content";

export async function GET({ }) {
    const posts = await getCollection("blog");
    const stories = await getCollection("stories");
    // const education = await getCollection("education"); // Optional: Add education later if needed

    const allContent = [
        ...posts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            slug: `blog/${post.slug}`,
            tags: post.data.tags,
            pubDate: post.data.pubDate,
            image: post.data.image,
            type: "Blog",
        })),
        ...stories.map((story) => ({
            title: story.data.title,
            description: story.data.description,
            slug: `stories/${story.slug}`,
            tags: story.data.tags || [], // Stories might not have tags
            pubDate: story.data.pubDate,
            image: story.data.image,
            type: "Story",
        })),
    ];

    // Sort by date descending
    allContent.sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf());

    return new Response(JSON.stringify(allContent), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
