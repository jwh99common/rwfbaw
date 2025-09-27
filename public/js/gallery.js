let currentCategory = 'all';

// Render products based on current filter
export function renderProducts(productList) {
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
export function setupFilters(productList) {
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
export function getProductById(id, productList) {
  return productList.find(p => p.id === id);
}
