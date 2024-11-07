// Sample data for Filipino breakfast items with image paths
const categories = [
    {
        name: "Silog Meals",
        products: [
            { name: "Tapsilog", price: 120, image: "images/tapsilog.jpg" },
            { name: "Tocilog", price: 110, image: "images/tocilog.jpg" },
            { name: "Longsilog", price: 100, image: "images/longsilog.jpg" },
            { name: "Bangsilog", price: 130, image: "images/bangsilog.jpg" },
            { name: "Hotsilog", price: 90, image: "images/hotsilog.jpg" }
        ]
    },
    {
        name: "Rice Bowls",
        products: [
            { name: "Pork Adobo Bowl", price: 150, image: "images/pork_adobo_bowl.jpg" },
            { name: "Beef Pares Bowl", price: 160, image: "images/beef_pares_bowl.jpg" },
            { name: "Chicken Inasal Bowl", price: 140, image: "images/chicken_inasal_bowl.jpg" },
            { name: "Sinigang na Baboy Bowl", price: 170, image: "images/sinigang_baboy_bowl.jpg" },
            { name: "Kare-Kare Bowl", price: 180, image: "images/kare_kare_bowl.jpg" }
        ]
    },
    {
        name: "Snacks & Sides",
        products: [
            { name: "Lumpiang Shanghai", price: 60, image: "images/lumpiang_shanghai.jpg" },
            { name: "Chicharon", price: 50, image: "images/chicharon.jpg" },
            { name: "Kikiam", price: 40, image: "images/kikiam.jpg" },
            { name: "Banana Cue", price: 30, image: "images/banana_cue.jpg" },
            { name: "Turon", price: 35, image: "images/turon.jpg" }
        ]
    }
];

// Initialize an empty cart
let cart = [];

// Load categories and products
function loadProducts() {
    const container = document.getElementById("food-categories");
    categories.forEach(category => {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("col-12");

        categoryDiv.innerHTML = `<h3>${category.name}</h3>`;
        
        category.products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("card", "p-3", "mb-3");

            productDiv.innerHTML = `
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">₱${product.price}</p>
                    <button class="btn btn-primary" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                </div>
            `;
            categoryDiv.appendChild(productDiv);
        });

        container.appendChild(categoryDiv);
    });
}

// Add item to cart
function addToCart(name, price) {
    const item = cart.find(i => i.name === name);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    alert(`${name} added to cart!`);
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Load cart on the cart page
function loadCart() {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    let subtotal = 0;

    cartItemsContainer.innerHTML = "";
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        cartItemsContainer.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₱${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
        `;
    });

    document.getElementById("subtotal").textContent = `Subtotal: ₱${subtotal.toFixed(2)}`;
    document.getElementById("total").textContent = `Total: ₱${subtotal.toFixed(2)}`;
}

// Generate PDF receipt
document.getElementById("generate-pdf").addEventListener("click", () => {
    const cartElement = document.querySelector(".container");
    html2pdf(cartElement, {
        margin:       1,
        filename:     'receipt.pdf',
        html2canvas:  { scale: 2 },
        jsPDF:        { orientation: 'portrait' }
    });
});

// Load products on homepage
if (document.getElementById("food-categories")) loadProducts();
if (document.getElementById("cart-items")) loadCart();
