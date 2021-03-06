//load data from API
const loadProducts = () => {
  const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const { image, title, category, price, rating } = product; // destructuring objects
    const container = document.getElementById("row");
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div class="card h-100 shadow-sm rounded-3">
      <img src='${image}' class="card-img-top img-fluid product-image mx-auto"  alt="...">
      <div class="card-body p-2">
        <h5 class="card-title mb-3 text-wrap">${title}</h5>
        <div class="card-text">
         <p>${category}<p>
         <h5>$ ${price}</h5>
         <p>Average Rating: ${rating.rate} <i class="fas fa-star"></i> &nbsp;&nbsp; (<i class="fas fa-user"></i> ${rating.count} Ratings)</p>
         </div>
        </div>
        <div class="card-footer">
      <button onclick="addToCart(${price})"  class="btn cart-button"><i class="fas fa-shopping-cart text-white"></i> Add to cart</button>
      <button class="btn btn-danger"><i class="fas fa-info-circle text-white"></i> Details</button>
      </div>
      </div>
    </div>
      `;
    container.appendChild(div);
  }
};

//count total item of cart
let count = 0;
const addToCart = (price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

//get input value function
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", (priceConverted * 0.2).toFixed(2));
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", (priceConverted * 0.3).toFixed(2));
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", (priceConverted * 0.4).toFixed(2));
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
