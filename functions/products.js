export async function onRequest(context) {
  const db = context.env.gallery_db;
  
  console.log("🔍 D1 query triggered from /products");
  
  const { results } = await db.prepare("SELECT * FROM products").all();
  
  console.log(`📦 D1 returned ${results.length} products`);
  
  
  const products = results.map(p => ({
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    category: p.category,
    image: p.image,
    images: p.images ? JSON.parse(p.images) : [],
    longDescription: p.longDescription
  }));

  return Response.json(products);
}
