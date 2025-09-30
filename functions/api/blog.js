export async function onRequest(context) {
  const db = context.env.gallery_db;
  const { results } = await db.prepare("SELECT * FROM posts ORDER BY createdAt DESC").all();

  const posts = results.map(p => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    author: p.author,
    createdAt: p.createdAt
  }));

  return Response.json(posts);
}
