let currentCategory = 'all';

/**
 * Loads product data from a JSON file.
 * Returns an array of product objects or logs an error if fetch fails.
 */
async function loadProducts() {
  try {
    const response = await fetch('/data/products.json', {
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // optional: bypass browser cache for fresh data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const products = await response.json();

    if (!Array.isArray(products)) {
      throw new Error('Invalid product format: expected an array');
    }

    return products;
  } catch (error) {
    console.error('❌ Failed to load products:', error);
    return []; // fallback to empty array
  }
}

// Load and render products
loadProducts().then(products => {
  renderProducts(products);
});

// Render products based on current filter
function renderProducts(productList) {
  const gallery = document.getElementById('gallery');
  const filteredProducts = currentCategory === 'all'
    ? productList
    : productList.filter(p => p.category === currentCategory);

  gallery.innerHTML = filteredProducts.map(product => `
    <div class="product-card" data-id="${product.id}">
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

  console.log("Rendering products:", filteredProducts);
}

// Setup category filters
function setupFilters(productList) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentCategory = e.target.dataset.category;
      renderProducts(productList);
    });
  });
}

// Get product by ID
function getProductById(id, productList) {
  return productList.find(p => p.id === id);
}

export { loadProducts, renderProducts, setupFilters,  getProductById};
