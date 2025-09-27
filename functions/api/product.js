// functions/api/products.js
// API for product management

// Sample product data - in real app, this would come from a database
const products = [
    {
        id: 1,
        title: "Sunset Over the Moors",
        description: "Acrylic painting capturing the golden hour over Yorkshire moors. Original piece on canvas.",
        price: 45,
        category: "painting",
        image: "/images/g1.png",
        longDescription: "This vibrant acrylic painting captures the magical moment when the sun sets over the Yorkshire moors. Painted en plein air during a camping trip, it features warm oranges and purples bleeding into the evening sky. The piece measures 16x20 inches on stretched canvas.",
        available: true,
        created: "2024-01-15"
    },
    {
        id: 2,
        title: "City Street Life",
        description: "Charcoal drawing of bustling London street scene. Framed and ready to hang.",
        price: 30,
        category: "drawing",
        image: "/images/g1.png",
        longDescription: "A detailed charcoal study of everyday life on a busy London street. This drawing captures the energy and movement of urban life with careful attention to light and shadow. Completed on heavyweight drawing paper and professionally framed.",
        available: true,
        created: "2024-01-10"
    },
    {
        id: 3,
        title: "Digital Landscape Series #3",
        description: "Limited edition digital print of mountain landscape. High quality giclee print.",
        price: 25,
        category: "digital",
        image: "/images/g1.png",
        longDescription: "Part of a limited series of digital landscapes inspired by the Lake District. Created using digital painting techniques and printed as a high-quality giclee print on archival paper. Limited to 50 prints, each signed and numbered.",
        available: true,
        created: "2024-02-01"
    },
    {
        id: 4,
        title: "Morning Dew Macro",
        description: "Fine art photograph of water droplets on spider web. Matted and framed.",
        price: 35,
        category: "photography",
        image: "/images/g1.png",
        longDescription: "Captured at dawn in Richmond Park, this macro photograph shows the intricate beauty of morning dew on a spider's web. Shot with a 100mm macro lens and printed on premium photographic paper. Comes matted and framed.",
        available: true,
        created: "2024-01-20"
    },
    {
        id: 5,
        title: "Abstract Emotions",
        description: "Mixed media painting exploring color and form. Bold, contemporary piece.",
        price: 60,
        category: "painting",
        image: "/images/g1.png",
        longDescription: "This bold abstract piece uses mixed media including acrylics, ink, and collage elements to explore themes of emotion and human connection. The vibrant colors and dynamic composition make it a striking focal point for any room.",
        available: false, // Example: sold out
        created: "2024-01-25"
    },
    {
        id: 6,
        title: "Portrait Study",
        description: "Pencil portrait demonstrating classical drawing techniques.",
        price: 40,
        category: "drawing",
        image: "/images/g1.png",
        longDescription: "A detailed pencil portrait study showcasing traditional drawing techniques. This piece demonstrates careful observation of light, shadow, and form. Completed on high-quality drawing paper using graphite pencils ranging from 2H to 8B.",
        available: true,
        created: "2024-02-05"
    }
];

// GET /api/products - Get all products or filter by category
export async function onRequestGet(context) {
    const url = new URL(context.request.url);
    const category = url.searchParams.get('category');
    
    let filteredProducts = products;
    
    // Filter by category if specified
    if (category && category !== 'all') {
        filteredProducts = products.filter(p => p.category === category);
    }
    
    // Only return available products by default
    const showAll = url.searchParams.get('show_all') === 'true';
    if (!showAll) {
        filteredProducts = filteredProducts.filter(p => p.available);
    }
    
    return jsonResponse({
        products: filteredProducts,
        total: filteredProducts.length,
        categories: [...new Set(products.map(p => p.category))]
    });
}

// GET /api/products/[id] - Get single product (this would be products/[id].js)
export async function onRequestPost(context) {
    try {
        const { id } = await context.request.json();
        const product = products.find(p => p.id === parseInt(id));
        
        if (!product) {
            return jsonResponse({ error: "Product not found" }, 404);
        }
        
        return jsonResponse(product);
    } catch (error) {
        return jsonResponse({ error: "Invalid request" }, 400);
    }
}

// Handle CORS
export async function onRequestOptions(context) {
    return new Response(null, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    });
}