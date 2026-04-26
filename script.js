// 1. FULL PRODUCT DATA
const products = [
  { id: 1, name: 'முழு நாட்டுக்கோழி - பெரியது (Family Pack)', category: 'whole', price: 1400, oldPrice: 1500, weight: '~2 kg', image: 'Family_Pack.png', badge: 'Best Value', badgeType: 'hot', desc: 'பெரிய குடும்ப விருந்துகளுக்கு ஏற்ற முழு நாட்டுக்கோழி. சிறந்த சுவை மற்றும் தரம்.', rating: 4.9, reviews: 410 },
  { id: 2, name: 'முழு நாட்டுக்கோழி (Whole Chicken)', category: 'whole', price: 700, oldPrice: 800, weight: '~1 kg', image: 'Whole_Chicken.png', badge: 'Best Seller', badgeType: 'hot', desc: 'எங்கள் பண்ணையில் இயற்கையான முறையில் வளர்ந்த ஆரோக்கியமான நாட்டுக்கோழி.', rating: 4.7, reviews: 448 },
  { id: 3, name: 'பெரிய கறி துண்டுகள் பேக் (Curry Cut Large)', category: 'curry-cut', price: 850, oldPrice: 950, weight: '1 kg', image: 'Curry_Cut_Large.png', badge: 'Popular', badgeType: 'hot', desc: 'பெரிய விசேஷங்களுக்கு ஏற்ற கறி துண்டுகள் பேக். எப்போதும் ஃப்ரெஷ் மற்றும் தரம்.', rating: 4.5, reviews: 303 },
  { id: 4, name: 'கறி துண்டுகள் (Curry Cut)', category: 'curry-cut', price: 450, oldPrice: 600, weight: '500g', image: 'Curry_Cut.png', badge: 'Fresh Today', badgeType: '', desc: 'சுவையான நாட்டுக்கோழி குழம்பு வைக்க ஏற்ற சரியான அளவில் வெட்டப்பட்ட துண்டுகள்.', rating: 4.7, reviews: 296 },
  { id: 5, name: 'தேன் வாழைப் பழம் (Then Vazhai Palam)', category: 'fruits', price: 60, oldPrice: 80, weight: '1 kg', image: 'Then_Vazhai_Palam.png', badge: 'Farm Fresh', badgeType: 'new', desc: 'எங்கள் பண்ணையில் இயற்கை முறையில் பழுக்க வைக்கப்பட்ட இனிப்பு சுவை மிகுந்த தேன் வாழை.', rating: 4.9, reviews: 145 },
  { id: 6, name: 'சப்போட்டா (Sapota)', category: 'fruits', price: 40, oldPrice: null, weight: '1 kg', image: 'Sapota.png', badge: 'Organic', badgeType: '', desc: 'இனிப்பு சுவை மிகுந்த, ரசாயனம் இல்லாத இயற்கை முறையில் விளைந்த சப்போட்டா.', rating: 4.7, reviews: 485 },
  { id: 7, name: 'அத்திப்பழம் (Aathi Palam / Fig)', category: 'fruits', price: 150, oldPrice: 180, weight: '1 kg', image: 'Aathi_Palam.png', badge: 'Premium', badgeType: 'hot', desc: 'உடல் ஆரோக்கியத்திற்கு மிகச்சிறந்த தாதுக்கள் நிறைந்த புத்தம் புதிய அத்திப்பழம்.', rating: 4.8, reviews: 640 },
  { id: 8, name: 'பன்னீர் ஆப்பிள் (Water Apple)', category: 'fruits', price: 60, oldPrice: 90, weight: '1 kg', image: 'Water_Apple.png', badge: 'Fresh', badgeType: 'new', desc: 'எங்கள் பண்ணையில் விளைந்த இனிப்பான மற்றும் நீர்ச்சத்து நிறைந்த பன்னீர் ஆப்பிள்.', rating: 4.8, reviews: 178 }
];

// 2. STATE
let cart = JSON.parse(localStorage.getItem('nk_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('nk_wishlist') || '[]');

// 3. MASTER UPDATE FUNCTION
function updateAll() {
    localStorage.setItem('nk_cart', JSON.stringify(cart));
    displayProducts();
    renderCartSidebar();
    
    const badge = document.getElementById('cartBadge');
    if (badge) badge.textContent = cart.reduce((sum, item) => sum + item.qty, 0);

    const totalVal = document.getElementById('cartTotalValue');
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    if (totalVal) totalVal.textContent = `₹${total.toLocaleString('en-IN')}`;

    const note = document.getElementById('deliveryNote');
    if (note) {
        note.textContent = total >= 499 ? "🎉 You've unlocked free delivery!" : `Add items worth ₹${499 - total} more for free delivery`;
    }
}

// 4. DISPLAY PRODUCTS
function displayProducts() {
    const chickenGrid = document.getElementById('chickenGrid');
    const fruitGrid = document.getElementById('fruitGrid');
    if (!chickenGrid || !fruitGrid) return;

    chickenGrid.innerHTML = '';
    fruitGrid.innerHTML = '';

    products.forEach(p => {
        const itemInCart = cart.find(i => i.id === p.id);
        const qty = itemInCart ? itemInCart.qty : 0;
        const isFav = wishlist.includes(p.id);

        const cardHTML = `
            <div class="product-card">
                ${p.badge ? `<div class="product-badge ${p.badgeType}">${p.badge}</div>` : ''}
                <div class="product-img">
                    <img src="${p.image}" alt="${p.name}" style="width:100%; height:200px; object-fit:cover;">
                    <button class="product-wishlist" onclick="toggleWishlist(${p.id})">${isFav ? '❤️' : '🤍'}</button>
                </div>
                <div class="product-info" style="padding: 20px;">
                    <div class="product-category" style="color:#C4522A; font-size:11px; font-weight:700; text-transform:uppercase;">${p.category}</div>
                    <div class="product-name" style="font-family:'Playfair Display', serif; font-weight:700; font-size:18px; margin: 8px 0;">${p.name}</div>
                    <div class="product-desc" style="font-size:13px; color:#7A5C3E; line-height:1.6; margin-bottom:15px; height:40px; overflow:hidden;">${p.desc}</div>
                    <div class="product-meta" style="display:flex; align-items:center; gap:15px; margin-bottom:15px; font-size:12px;">
                        <span style="background:#FDF6EC; padding:2px 8px; border-radius:10px;">⚖️ ${p.weight}</span>
                        <span style="color:#D4A843; font-weight:600;">★ ${p.rating} (${p.reviews})</span>
                    </div>
                    <div class="product-footer" style="display:flex; justify-content:space-between; align-items:center;">
                        <div class="product-price" style="font-weight:700; color:#C4522A; font-size:22px;">
                            ₹${p.price}
                            ${p.oldPrice ? `<span style="text-decoration:line-through; color:#A08060; font-size:14px; margin-left:6px; font-weight:400;">₹${p.oldPrice}</span>` : ''}
                        </div>
                        ${qty > 0 ? `
                            <div class="qty-control" style="display:flex; align-items:center; gap:12px; background:#FDF6EC; padding:6px 14px; border-radius:40px; border:1.5px solid rgba(196,82,42,0.15);">
                                <button onclick="updateQty(${p.id}, -1)" style="width:32px; height:32px; border-radius:50%; border:none; background:white; cursor:pointer; font-weight:bold; box-shadow:0 2px 4px rgba(0,0,0,0.1); font-size:20px;">-</button>
                                <span style="font-weight:700; min-width:20px; text-align:center; font-size:16px;">${qty}</span>
                                <button onclick="updateQty(${p.id}, 1)" style="width:32px; height:32px; border-radius:50%; border:none; background:white; cursor:pointer; font-weight:bold; box-shadow:0 2px 4px rgba(0,0,0,0.1); font-size:20px;">+</button>
                            </div>` : 
                            `<button class="btn-add-cart" onclick="addToCart(${p.id})" style="background:#C4522A; color:white; border:none; padding:12px 24px; border-radius:40px; font-weight:600; cursor:pointer;">+ Add</button>`
                        }
                    </div>
                </div>
            </div>`;
        
        (p.category === 'fruits') ? fruitGrid.innerHTML += cardHTML : chickenGrid.innerHTML += cardHTML;
    });
}

// 5. SIDEBAR & CART ACTIONS
function renderCartSidebar() {
    const container = document.getElementById('cartItemsContainer');
    if (!container) return;
    if (cart.length === 0) {
        container.innerHTML = '<div class="cart-empty" style="text-align:center; padding:40px 0;">Your cart is empty 🛒</div>';
        return;
    }
    container.innerHTML = cart.map(item => `
        <div class="cart-item" style="display:flex; gap:15px; padding:15px 0; border-bottom:1px solid #eee;">
            <img src="${item.image}" style="width:60px; height:60px; border-radius:10px; object-fit:cover;">
            <div style="flex:1;">
                <div style="font-weight:bold; font-size:14px; margin-bottom:5px;">${item.name}</div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="font-weight:bold; color:#C4522A;">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
                    <div class="qty-control" style="display:flex; align-items:center; gap:8px;">
                        <button onclick="updateQty(${item.id}, -1)" style="width:26px; height:26px; border-radius:50%; border:1px solid #ddd; background:white; cursor:pointer;">-</button>
                        <span style="font-weight:bold;">${item.qty}</span>
                        <button onclick="updateQty(${item.id}, 1)" style="width:26px; height:26px; border-radius:50%; border:1px solid #ddd; background:white; cursor:pointer;">+</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

window.openCart = function() {
    document.getElementById('cartSidebar').classList.add('open');
    document.getElementById('cartOverlay').classList.add('open');
    document.body.classList.add('cart-open');
};

window.closeCart = function() {
    document.getElementById('cartSidebar').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('open');
    document.body.classList.remove('cart-open');
};

// 6. MESSAGES (TOASTS)
window.showToast = function(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${type === 'success' ? '✅' : '❤️'}</span> ${message}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
};

// 7. GLOBAL ACTIONS
window.addToCart = (id) => {
    const product = products.find(p => p.id === id);
    const existing = cart.find(i => i.id === id);
    existing ? existing.qty++ : cart.push({ ...product, qty: 1 });
    updateAll();
    showToast(`${product.name} added to cart!`);
};

window.updateQty = (id, delta) => {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
        updateAll();
    }
};

window.toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(x => x !== id);
        showToast('Removed from wishlist', 'info');
    } else {
        wishlist.push(id);
        showToast('Added to wishlist!', 'success');
    }
    localStorage.setItem('nk_wishlist', JSON.stringify(wishlist));
    displayProducts();
};
window.sortProducts = function(criteria, gridId, button) {
    // 1. Filter products based on which grid we are sorting
    let filteredProducts = (gridId === 'fruitGrid') 
        ? products.filter(p => p.category === 'fruits')
        : products.filter(p => p.category === 'whole' || p.category === 'curry-cut');

    // 2. Perform the Sort logic
    if (criteria === 'price-low') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (criteria === 'price-high') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (criteria === 'popular') {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    }

    // 3. Clear and Re-draw the specific grid
    const grid = document.getElementById(gridId);
    if (!grid) return;
    grid.innerHTML = '';

    filteredProducts.forEach(p => {
        const itemInCart = cart.find(i => i.id === p.id);
        const qty = itemInCart ? itemInCart.qty : 0;
        const isFav = wishlist.includes(p.id);

        grid.innerHTML += `
            <div class="product-card">
                ${p.badge ? `<div class="product-badge ${p.badgeType}">${p.badge}</div>` : ''}
                <div class="product-img">
                    <img src="${p.image}" alt="${p.name}" style="width:100%; height:200px; object-fit:cover;">
                    <button class="product-wishlist" onclick="toggleWishlist(${p.id})">${isFav ? '❤️' : '🤍'}</button>
                </div>
                <div class="product-info" style="padding: 20px;">
                    <div class="product-name" style="font-family:'Playfair Display',serif; font-weight:700; font-size:18px;">${p.name}</div>
                    <div class="product-desc" style="font-size:13px; color:#7A5C3E; margin: 8px 0;">${p.desc}</div>
                    <div style="display:flex; gap:12px; margin-bottom:15px; font-size:12px;">
                        <span>⚖️ ${p.weight}</span>
                        <span style="color:#D4A843;">★ ${p.rating}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div style="font-weight:700; color:#C4522A; font-size:20px;">₹${p.price}</div>
                        ${qty > 0 ? `
                            <div class="qty-control" style="display:flex; align-items:center; gap:10px; background:#FDF6EC; padding:5px 12px; border-radius:40px;">
                                <button onclick="updateQty(${p.id},-1)" style="width:30px; height:30px; border-radius:50%; border:none; background:white; cursor:pointer;">-</button>
                                <span style="font-weight:700;">${qty}</span>
                                <button onclick="updateQty(${p.id},1)" style="width:30px; height:30px; border-radius:50%; border:none; background:white; cursor:pointer;">+</button>
                            </div>` : 
                            `<button class="btn-add-cart" onclick="addToCart(${p.id})" style="background:#C4522A; color:white; border:none; padding:10px 20px; border-radius:40px; cursor:pointer;">+ Add</button>`
                        }
                    </div>
                </div>
            </div>`;
    });

    // 4. Update the visual "active" button
    const container = button.parentElement;
    container.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
};
// Brain for Category Navigation
window.filterCategory = function(type, element) {
    // 1. Highlight the active card
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
    });
    element.classList.add('active');

    // 2. Scroll to the section
    if (type === 'chicken') {
        const chickenSec = document.getElementById('chicken-products');
        if (chickenSec) chickenSec.scrollIntoView({ behavior: 'smooth' });
    } else if (type === 'fruits') {
        const fruitSec = document.getElementById('fruitGrid');
        if (fruitSec) {
            // Scroll to the heading of the fruit section
            const fruitHeading = fruitSec.closest('section');
            fruitHeading.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        // Go to top for 'All Products'
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};
document.addEventListener('DOMContentLoaded', updateAll);