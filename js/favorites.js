let productsDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".noProducts");
let products = JSON.parse(localStorage.getItem("productsFavorite"));
let allProducts = JSON.parse(localStorage.getItem("products"));
function drawFavoritesProductsUI(allProducts = []) {
  if (JSON.parse(localStorage.getItem("productsFavorite")).length === 0)
    noProductsDom.innerHTML = "There is no items !!";

  let products =
    JSON.parse(localStorage.getItem("productsFavorite")) || allProducts;
  let productsUI = products.map((item) => {
    return `
    <div class="product-item" style="border: ${
      item.isMe === "Y" ? "2px solid #10cab7" : "2px solid #999"
    }">
          <img
            src="${item.imageUrl}"
            class="product-item-img"
            alt="image"
          />
  
          <div class="product-item-desc">
            <h2>${item.title}</h2>
            <p>${item.desc}</p>
            <span> Size: ${item.size} </span> <br>
            <span> Quntatit: ${item.qty} </span>
          </div>
  
          <div class="product-item-actions">
            <button class="add-to-cart" onclick="removeItemFromCart(${
              item.id
            })">Remove From Favorite</button>
          </div>
        </div>
      `;
  });

  productsDom.innerHTML = productsUI.join("");
}

drawFavoritesProductsUI();

function removeItemFromCart(id) {
  let choosenItem = allProducts.find((item) => item.id === id);
  choosenItem.liked = false;
  let productsFavorite = localStorage.getItem("productsFavorite");
  localStorage.setItem("products", JSON.stringify(allProducts));
  if (productsFavorite) {
    let items = JSON.parse(productsFavorite);
    let filteredItems = items.filter((item) => item.id !== id);
    localStorage.setItem("productsFavorite", JSON.stringify(filteredItems));
    drawFavoritesProductsUI(filteredItems);
  }
}