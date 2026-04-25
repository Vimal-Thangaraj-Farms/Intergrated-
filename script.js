// 1. ALL PRODUCT DATA
const products = [
  { id: 1, name: 'முழு நாட்டுக்கோழி - பெரியது (Family Pack)', category: 'whole', price: 1400, weight: '~2 kg', image: 'Family_Pack.png', badge: 'Best Value', badgeType: 'hot', rating: 4.9 },
  { id: 2, name: 'முழு நாட்டுக்கோழி (Whole Chicken)', category: 'whole', price: 700, weight: '~1 kg', image: 'Whole_Chicken.png', badge: 'Best Seller', badgeType: 'hot', rating: 4.7 },
  { id: 3, name: 'பெரிய கறி துண்டுகள் பேக் (Curry Cut Large)', category: 'curry-cut', price: 850, weight: '1 kg', image: 'Curry_Cut_Large.png', badge: 'Popular', badgeType: 'hot', rating: 4.5 },
  { id: 4, name: 'கறி துண்டுகள் (Curry Cut)', category: 'curry-cut', price: 450, weight: '500g', image: 'Curry_Cut.png', badge: 'Fresh Today', badgeType: '', rating: 4.7 },
  { id: 5, name: 'தேன் வாழைப் பழம் (Then Vazhai Palam)', category: 'fruits', price: 60, weight: '1 kg', image: 'Then_Vazhai_Palam.png', badge: 'Farm Fresh', badgeType: 'new', rating: 4.9 },
  { id: 6, name: 'சப்போட்டா (Sapota)', category: 'fruits', price: 40, weight: '1 kg', image: 'Sapota.png', badge: 'Organic', badgeType: '', rating: 4.7 },
  { id: 7, name: 'அத்திப்பழம் (Aathi Palam / Fig)', category: 'fruits', price: 150, weight: '1 kg', image: 'Aathi_Palam.png', badge: 'Premium', badgeType: 'hot', rating: 4.8 },
  { id: 8, name: 'பன்னீர் ஆப்பிள் (Water Apple)', category: 'fruits', price: 60, weight: '1 kg', image: 'Water_Apple.png', badge: 'Fresh', badgeType: 'new', rating: 4.8 }
];

// 2. STATE
let cart = JSON.parse(localStorage.getItem('nk_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('nk_wishlist') || '[]');

// 3. MASTER UI UPDATE
function updateUI() {
    localStorage.setItem('nk_cart', JSON.stringify(cart));
    displayProducts();
    renderCartSidebar();
    
    // Update Badge
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.getElementById('cartBadge');
    if (badge) badge.textContent = totalQty;

    // Update Total Price
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const totalVal = document.getElementById('cartTotalValue');
    if (totalVal) totalVal.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
}

// 4. DISPLAY GRIDS
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

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img">
                <img src="${p.image}" alt="${p.name}" style="width:100%; height:200px; object-fit:cover;">
                <button class="product-wishlist" onclick="toggleWishlist(${p.id})">${isFav ? '❤️' : '🤍'}</button>
            </div>
            <div class="product-info">
                <div class="product-name">${p.name}</div>
                <div class="product-price">₹${p.price}</div>
                <div class="product-footer">
                    ${qty > 0 ? `
                        <div class="qty-control" style="display:flex; align-items:center; gap:10px;">
                            <button onclick="updateQty(${p.id}, -1)">-</button>
                            <span>${qty}</span>
                            <button onclick="updateQty(${p.id}, 1)">+</button>
                        </div>` : 
                        `<button class="btn-add-cart" onclick="addToCart(${p.id})">+ Add</button>`
                    }
                </div>
            </div>`;
        
        (p.category === 'fruits') ? fruitGrid.appendChild(card) : chickenGrid.appendChild(card);
    });
}

// 5. CART SIDEBAR
function renderCartSidebar() {
    const container = document.getElementById('cartItemsContainer');
    if (!container) return;
    if (cart.length === 0) {
        container.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
        return;
    }
    container.innerHTML = cart.map(item => `
        <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:5px;">
            <div>
                <div style="font-weight:bold; font-size:14px;">${item.name}</div>
                <div style="font-size:12px; color:var(--terracotta);">₹${item.price} x ${item.qty}</div>
            </div>
            <div class="qty-control">
                <button onclick="updateQty(${item.id}, -1)">-</button>
                <button onclick="updateQty(${item.id}, 1)">+</button>
            </div>
        </div>
    `).join('');
}

// 6. GLOBAL FUNCTIONS
window.addToCart = (id) => {
    const product = products.find(p => p.id === id);
    const existing = cart.find(i => i.id === id);
    existing ? existing.qty++ : cart.push({ ...product, qty: 1 });
    updateUI();
};

window.updateQty = (id, delta) => {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
        updateUI();
    }
};

window.toggleWishlist = (id) => {
    wishlist.includes(id) ? wishlist = wishlist.filter(x => x !== id) : wishlist.push(id);
    localStorage.setItem('nk_wishlist', JSON.stringify(wishlist));
    displayProducts();
};

document.addEventListener('DOMContentLoaded', updateUI);