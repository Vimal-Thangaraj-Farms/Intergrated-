// 1. COMPLETE PRODUCT LIST
const products = [
  { id: 1, name: 'முழு நாட்டுக்கோழி - பெரியது (Family Pack)', category: 'whole', price: 1400, weight: '~2 kg', image: 'Family_Pack.png', badge: 'Best Value', badgeType: 'hot', desc: 'பெரிய குடும்ப விருந்துகளுக்கு ஏற்ற முழு நாட்டுக்கோழி.', rating: 4.9, reviews: 410 },
  { id: 2, name: 'முழு நாட்டுக்கோழி (Whole Chicken)', category: 'whole', price: 700, weight: '~1 kg', image: 'Whole_Chicken.png', badge: 'Best Seller', badgeType: 'hot', desc: 'இயற்கையான முறையில் வளர்ந்த ஆரோக்கியமான நாட்டுக்கோழி.', rating: 4.7, reviews: 448 },
  { id: 3, name: 'பெரிய கறி துண்டுகள் பேக் (Curry Cut Large)', category: 'curry-cut', price: 850, weight: '1 kg', image: 'Curry_Cut_Large.png', badge: 'Popular', badgeType: 'hot', desc: 'பெரிய விசேஷங்களுக்கு ஏற்ற கறி துண்டுகள் பேக்.', rating: 4.5, reviews: 303 },
  { id: 4, name: 'கறி துண்டுகள் (Curry Cut)', category: 'curry-cut', price: 450, weight: '500g', image: 'Curry_Cut.png', badge: 'Fresh Today', badgeType: '', desc: 'சுவையான நாட்டுக்கோழி குழம்பு வைக்க ஏற்ற துண்டுகள்.', rating: 4.7, reviews: 296 },
  { id: 5, name: 'தேன் வாழைப் பழம் (Then Vazhai Palam)', category: 'fruits', price: 60, weight: '1 kg', image: 'Then_Vazhai_Palam.png', badge: 'Farm Fresh', badgeType: 'new', desc: 'இயற்கை முறையில் பழுக்க வைக்கப்பட்ட தேன் வாழை.', rating: 4.9, reviews: 145 },
  { id: 6, name: 'சப்போட்டா (Sapota)', category: 'fruits', price: 40, weight: '1 kg', image: 'Sapota.png', badge: 'Organic', badgeType: '', desc: 'இனிப்பு சுவை மிகுந்த இயற்கை முறையில் விளைந்த சப்போட்டா.', rating: 4.7, reviews: 485 },
  { id: 7, name: 'அத்திப்பழம் (Aathi Palam / Fig)', category: 'fruits', price: 150, weight: '1 kg', image: 'Aathi_Palam.png', badge: 'Premium', badgeType: 'hot', desc: 'உடல் ஆரோக்கியத்திற்கு மிகச்சிறந்த அத்திப்பழம்.', rating: 4.8, reviews: 640 },
  { id: 8, name: 'பன்னீர் ஆப்பிள் (Water Apple)', category: 'fruits', price: 60, weight: '1 kg', image: 'Water_Apple.png', badge: 'Fresh', badgeType: 'new', desc: 'இனிப்பான மற்றும் நீர்ச்சத்து நிறைந்த பன்னீர் ஆப்பிள்.', rating: 4.8, reviews: 178 }
];

// 2. WEBSITE STATE
let cart = JSON.parse(localStorage.getItem('nk_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('nk_wishlist') || '[]');

// 3. THE "DRAWING" BRAIN (Displays products in two grids)
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
            ${p.badge ? `<div class="product-badge ${p.badgeType}">${p.badge}</div>` : ''}
            <div class="product-img">
                <img src="${p.image}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover;">
                <button class="product-wishlist" onclick="toggleWishlist(${p.id})">${isFav ? '❤️' : '🤍'}</button>
            </div>
            <div class="product-info">
                <div class="product-category">${p.category.toUpperCase()}</div>
                <div class="product-name">${p.name}</div>
                <div class="product-meta"><span>⚖️ ${p.weight}</span> <span>★ ${p.rating}</span></div>
                <div class="product-footer">
                    <div class="product-price">₹${p.price}</div>
                    ${qty > 0 
                        ? `<div class="qty-control" style="display:flex; align-items:center; gap:10px;">
                             <button onclick="updateQty(${p.id}, -1)">-</button>
                             <span>${qty}</span>
                             <button onclick="updateQty(${p.id}, 1)">+</button>
                           </div>`
                        : `<button class="btn-add-cart" onclick="addToCart(${p.id})">+ Add</button>`
                    }
                </div>
            </div>
        `;

        if (p.category === 'whole' || p.category === 'curry-cut') {
            chickenGrid.appendChild(card);
        } else if (p.category === 'fruits') {
            fruitGrid.appendChild(card);
        }
    });
    
    updateCartUI();
}

// 4. ACTION FUNCTIONS
window.addToCart = function(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(i => i.id === id);
    if (existing) { existing.qty++; } else { cart.push({ ...product, qty: 1 }); }
    saveAndUpdate();
}

window.updateQty = function(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
    saveAndUpdate();
}

window.toggleWishlist = function(id) {
    if (wishlist.includes(id)) { wishlist = wishlist.filter(x => x !== id); } 
    else { wishlist.push(id); }
    localStorage.setItem('nk_wishlist', JSON.stringify(wishlist));
    displayProducts();
}

function saveAndUpdate() {
    localStorage.setItem('nk_cart', JSON.stringify(cart));
    displayProducts();
}

function updateCartUI() {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.getElementById('cartBadge');
    if (badge) badge.textContent = totalQty;
}

// 5. START THE ENGINE
document.addEventListener('DOMContentLoaded', displayProducts);