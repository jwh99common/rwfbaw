export async function onRequest(context) {
  const imageName = context.params.name.trim();
  const bucket = context.env.r2_test; // ✅ matches binding name

  console.log(`Context 1: ${context.env.r2_test}`);
  console.log(`Context 1: ${context.env.r2_images}`);
  console.log(`Context 1: ${context.env.image_assets}`);

  console.log(`Fetching image: ${imageName}`);
  console.log(`Fetching image: ${imageName}`);
  console.log(`Fetching image: ${imageName}`);

  if (!bucket || typeof bucket.get !== "function") {
    console.warn("R2 binding 'r2_test' not available");
    return new Response("R2 not configured", { status: 500 });
  }

  const object = await bucket.get(imageName);

  if (!object) {
    console.warn(`Image '${imageName}' not found in R2`);
    return new Response("Image not found", { status: 404 });
  }

  return new Response(object.body, {
    headers: {
      "Content-Type": object.httpMetadata?.contentType || "image/png",
      "Cache-Control": "public, max-age=3600",
      "X-R2-Served": "true"
    }
  });
}
