import { products } from './product.js';
import { renderProducts, setupFilters } from './gallery.js';
import { setupModal, openModal } from './modal.js';

// Initialize gallery
function initGallery() {
  renderProducts(products);
  setupFilters(products);
  setupModal();

  // Handle click events for modal opening
  document.getElementById('gallery').addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    if (card && card.dataset.id) {
      const productId = parseInt(card.dataset.id);
      const product = products.find(p => p.id === productId);
      if (product) openModal(product);
    }
  });
}

document.addEventListener('DOMContentLoaded', initGallery);
