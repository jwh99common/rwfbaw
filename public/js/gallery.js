let currentCategory = 'all';

// Render products based on current filter
function renderProducts() {
    const gallery = document.getElementById('gallery');
    const filteredProducts = currentCategory === 'all' 
        ? products 
        : products.filter(p => p.category === currentCategory);

    gallery.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="openModal(${product.id})">
            <img class="product-image" src="${product.image}" alt="${product.title}">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-details">
                    <span class="product-price">£${product.price}</span>
                    <span class="product-category">${product.category}</span>
                </div>
                <a class="buy-on-etsy" href="https://etsy.com/shop/YourShop" target="_blank" onclick="event.stopPropagation();">
                    Buy on Etsy
                </a>
            </div>
        </div>
    `).join('');
    
    console.log("Rendering products:", products);
}

// Setup category filters
function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.dataset.category;
            renderProducts();
        });
    });
}

// Get product by ID
function getProductById(id) {
    return products.find(p => p.id === id);
}