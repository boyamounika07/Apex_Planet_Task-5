const products = [
  { id: 1, name: "T-Shirt", price: 500, category: "Clothing", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Jeans", price: 1200, category: "Clothing", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Laptop", price: 45000, category: "Electronics", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Headphones", price: 2000, category: "Electronics", image: "https://via.placeholder.com/150" }
];
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const countSpan = document.getElementById('cartCount');
  if (countSpan) countSpan.textContent = cart.length;
}
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart`);
}
function displayProducts(filteredProducts) {
  const container = document.getElementById('productList');
  container.innerHTML = "";
  filteredProducts.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}
function filterProducts() {
  const category = document.getElementById("categoryFilter").value;
  const sort = document.getElementById("sortFilter").value;

  let filtered = [...products];

  if (category !== "All") {
    filtered = filtered.filter(p => p.category === category);
  }
  if (sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  }
  displayProducts(filtered);
}
function showCart() {
  const productList = document.getElementById("productList");
  const cartSection = document.getElementById("cartSection");
  const totalDisplay = document.getElementById("totalPrice");
  productList.style.display = "none";
  document.querySelector(".filters").style.display = "none";
  cartSection.style.display = "flex";
  cartSection.innerHTML = "";
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;
  if (cart.length === 0) {
    cartSection.innerHTML = "<p style='text-align:center'>Your cart is empty.</p>";
    totalDisplay.textContent = "";
    return;
  }
  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Price: ₹${item.price}</p>
      <p>Quantity: ${item.quantity}</p>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartSection.appendChild(card);
  });
  totalDisplay.textContent = "Total: ₹" + total;
}
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}
window.onload = () => {
  updateCartCount();
  filterProducts();
};

