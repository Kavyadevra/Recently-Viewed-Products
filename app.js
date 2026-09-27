const products = [];

for (const category of storeData.categories) {
    for (const subcategory of category.subcategories) {
        for (const product of subcategory.products) {
            products.push(product);
        }
    }
}

const productsContainer = document.getElementById("products");
const recentlyViewedContainer = document.getElementById("recentlyViewed");
const clearHistoryButton = document.getElementById("clearHistory");

const modal = document.getElementById("productModal");
const modalContent = document.getElementById("modalContent");
const closeModalButton = document.getElementById("closeModal");

let recentlyViewed = [];
const recentSet = new Set();

function renderProducts() {
    productsContainer.innerHTML = "";

    for (const product of products) {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <h3>${product.name}</h3>
            <p class="product-brand">${product.brand}</p>
            <p class="product-price">
                ₹${product.price.toLocaleString("en-IN")}
            </p>
            <button>View Product</button>
        `;

        card.querySelector("button").addEventListener("click", () => {
            openProduct(product);
        });

        productsContainer.appendChild(card);
    }
}

function openProduct(product) {

    // Remove product if already present
    if (recentSet.has(product.id)) {
        recentlyViewed = recentlyViewed.filter(id => id !== product.id);
        recentSet.delete(product.id);
    }

    // Add to front
    recentlyViewed.unshift(product.id);
    recentSet.add(product.id);

    // Keep only 5 products
    if (recentlyViewed.length > 5) {
        const removed = recentlyViewed.pop();
        recentSet.delete(removed);
    }

    renderRecentlyViewed();

    modalContent.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.brand}</p>
        <p>₹${product.price.toLocaleString("en-IN")}</p>
        <p>⭐ ${product.rating} (${product.reviews} reviews)</p>
        <p>${product.tags.join(", ")}</p>
    `;

    modal.classList.remove("hidden");
}

function renderRecentlyViewed() {

    recentlyViewedContainer.innerHTML = "";

    if (recentlyViewed.length === 0) {
        recentlyViewedContainer.innerHTML = `
            <div class="empty">
                No recently viewed products yet.
            </div>
        `;
        return;
    }

    for (const id of recentlyViewed) {

        const product = products.find(item => item.id === id);

        if (!product) continue;

        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <h3>${product.name}</h3>
            <p class="product-brand">${product.brand}</p>
            <p class="product-price">
                ₹${product.price.toLocaleString("en-IN")}
            </p>
        `;

        recentlyViewedContainer.appendChild(card);
    }
}

clearHistoryButton.addEventListener("click", () => {
    recentlyViewed = [];
    recentSet.clear();
    renderRecentlyViewed();
});

closeModalButton.addEventListener("click", () => {
    modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});

renderProducts();
renderRecentlyViewed();