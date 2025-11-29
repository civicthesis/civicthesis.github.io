import { getCollection } from 'astro:content';

export async function GET() {
    const posts = await getCollection('blog');

    const searchData = posts.map(post => ({
        slug: post.slug,
        title: post.data.title,
        description: post.data.description,
        body: post.body, // Note: This is raw markdown, might want to strip it in production
    }));

    return new Response(JSON.stringify(searchData), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
