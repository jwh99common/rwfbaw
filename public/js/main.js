import { loadProducts, renderProducts, setupFilters } from './gallery.js';
import { setupModal, openModal } from './modal.js';

// Initialize gallery with dynamic product loading
async function initGallery() {
  const products = await loadProducts();

  renderProducts(products);
  setupFilters(products);
  setupModal();

  
  console.log("InitGallery called with:", products);

  // Handle click events for modal opening
  document.getElementById('gallery').addEventListener('click', (e) => {
    console.log("Gallery clicked:", e.target);

    const card = e.target.closest('.product-card');
    console.log("Closest .product-card:", card);

    if (card && card.dataset.id) {
      const productId = parseInt(card.dataset.id);
      const product = products.find(p => p.id === productId);

      if (product) openModal(product);
    } else {
      console.log("No valid card or data-id found");
    }
  });
}

document.addEventListener('DOMContentLoaded', initGallery);
