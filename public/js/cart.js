// Cart Management Functions
function loadCart() {
    const savedCart = localStorage.getItem('fbaw-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function saveCart() {
    localStorage.setItem('fbaw-cart', JSON.stringify(cart));
}

function addToCart(productId, quantity = 1) {
    // Handle modal call without productId
    if (typeof productId === 'undefined') {
        const modalTitle = document.getElementById('modalTitle').textContent;
        const product = products.find(p => p.title === modalTitle);
        if (product) {
            productId = product.id;
        } else {
            return;
        }
    }
    
    const product = getProductById(productId);
    if (!product) return;

    const existingItem = cart.items.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({
            productId: productId,
            quantity: quantity,
            addedAt: new Date().toISOString()
        });
    }
    
    calculateTotal();
    saveCart();
    updateCartDisplay();
    renderCartItems();
    
    // Show feedback
    showNotification(`Added "${product.title}" to cart!`);
}

function removeFromCart(productId) {
    const index = cart.items.findIndex(item => item.productId === productId);
    if (index > -1) {
        const product = getProductById(productId);
        cart.items.splice(index, 1);
        calculateTotal();
        saveCart();
        updateCartDisplay();
        renderCartItems();
        showNotification(`Removed "${product.title}" from cart`);
    }
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = cart.items.find(item => item.productId === productId);
    if (item) {
        item.quantity = newQuantity;
        calculateTotal();
        saveCart();
        updateCartDisplay();
        renderCartItems();
    }
}

function calculateTotal() {
    cart.total = cart.items.reduce((sum, item) => {
        const product = getProductById(item.productId);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);
}

function clearCart() {
    cart = { items: [], total: 0 };
    saveCart();
    updateCartDisplay();
    renderCartItems();
}

function getCartItemCount() {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
}

// UI Update Functions
function updateCartDisplay() {
    document.getElementById('cart-count').textContent = getCartItemCount();
    document.getElementById('cart-total').textContent = cart.total.toFixed(0);
    document.getElementById('cartFooterTotal').textContent = cart.total.toFixed(0);
    
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.disabled = cart.items.length === 0;
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.items.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add some beautiful artwork to support local food banks!</p>
            </div>
        `;
        return;
    }

    cartItemsContainer.innerHTML = cart.items.map(item => {
        const product = getProductById(item.productId);
        if (!product) return '';
        
        return `
            <div class="cart-item">
                <img class="cart-item-image" src="${product.image}" alt="${product.title}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${product.title}</div>
                    <div class="cart-item-price">£${product.price}</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${product.id}, ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${product.id}, ${item.quantity + 1})">+</button>
                        <button class="remove-btn" onclick="removeFromCart(${product.id})" title="Remove from cart">🗑️</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Cart UI Functions
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    
    if (sidebar.classList.contains('open')) {
        closeCart();
    } else {
        openCart();
    }
}

function openCart() {
    renderCartItems();
    document.getElementById('cartSidebar').classList.add('open');
    document.getElementById('cartOverlay').classList.add('show');
}

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('show');
}

function proceedToCheckout() {
    alert(`Checkout with ${getCartItemCount()} items totaling £${cart.total}!\n\n(Checkout functionality coming in Phase 3)`);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 2000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}