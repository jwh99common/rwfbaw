// Modal functionality for product details

function setupModal() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => {
        if (e.target === modal) modal.style.display = 'none';
    };
}

function openModal(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    
    document.getElementById('modalTitle').textContent = product.title;
    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalDescription').textContent = product.longDescription;
    document.getElementById('modalPrice').textContent = `£${product.price}`;
    document.getElementById('modalCategory').textContent = product.category;
    
    modal.style.display = 'block';
}