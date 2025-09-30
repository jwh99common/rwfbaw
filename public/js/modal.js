let currentImages = [];
let currentIndex = 0;

export function setupModal() {
  const modal = document.getElementById('productModal');
  const closeBtn = modal.querySelector('.close');
  const nextBtn = document.getElementById('nextImage');
  const prevBtn = document.getElementById('prevImage');

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('open');
  });

  nextBtn.addEventListener('click', () => {
    if (currentImages.length > 0) {
      currentIndex = (currentIndex + 1) % currentImages.length;
      updateModalImage();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentImages.length > 0) {
      currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      updateModalImage();
    }
  });

  // Optional: keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'Escape') closeBtn.click();
  });
}

export function openModal(product) {
  const modal = document.getElementById('productModal');

  // Combine main image with additional images
  const allImages = [product.image, ...(product.images || [])];
  currentImages = allImages;
  currentIndex = 0;

  document.getElementById('modalTitle').textContent = product.title;
  document.getElementById('modalDescription').textContent = product.description;
  document.getElementById('modalPrice').textContent = `£${product.price}`;
  document.getElementById('modalCategory').textContent = product.category;
  document.getElementById('modalEtsyLink').href = "https://etsy.com/shop/YourShop";

  updateModalImage();
  modal.classList.add('open');
}

function updateModalImage() {
  const modalImg = document.getElementById('modalImage');
  modalImg.src = currentImages[currentIndex];
  modalImg.alt = `Artwork ${currentIndex + 1}`;

  // Fallback for broken images
  //modalImg.onerror = () => {
    //modalImg.src = '/image-assets/fallback.jpg';
  //};

  // Optional: update image counter
  const counter = document.getElementById('imageCounter');
  if (counter) {
    counter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
  }
}
