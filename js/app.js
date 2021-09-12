//load data from API
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    console.log(product);
    const image = product.image;
    const container = document.getElementById("row");
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div class="card h-100 shadow-sm">
      <img src='${image}' class="card-img-top img-fluid product-image mx-auto"  alt="...">
      <div class="card-body p-2">
        <h5 class="card-title mb-3">${product.title}</h5>
        <div class="card-text">
         <p>${product.category}<p>
         <h5>$ ${product.price}</h5>
         <p>Rating: <i class="fas fa-star"></i> ${product.rating.rate} out of ${product.rating.count} user</p>
         </div>
        </div>
        <div class="card-footer">
      <button onclick="addToCart(${product.price})"  class="btn btn-success">Add to cart</button>
      <button class="btn btn-danger">Details</button>
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
