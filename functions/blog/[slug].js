export async function onRequest(context) {
  const slug = context.params.slug;
  const db = context.env.gallery_db;
  const { results } = await db.prepare("SELECT * FROM posts WHERE slug = ?").bind(slug).all();

  if (!results.length) {
    return new Response("Post not found", { status: 404 });
  }

  const post = results[0];
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>${post.title}</title>
      <link rel="stylesheet" href="/css/main.css" />
    </head>
    <body>
      <header>
        <nav>
          <a href="/index.html">Gallery</a>
          <a href="/blog/">Blog</a>
        </nav>
      </header>
      <main>
        <h1>${post.title}</h1>
        <p><em>By ${post.author || 'Unknown'} on ${new Date(post.createdAt).toLocaleDateString()}</em></p>
        <article>${post.content}</article>
      </main>
    </body>
    </html>
  `;
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}
