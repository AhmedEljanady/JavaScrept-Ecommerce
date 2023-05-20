// Define Product
let productsDom = document.querySelector(".products");
let products = JSON.parse(localStorage.getItem("products")) || productsDB;

// Display Producs
let drawProductsUI;
(drawProductsUI = function (products = []) {
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
          <a onclick='saveItemData(${item.id})'>${item.title}</a>
          <p>${item.desc}</p>
          <span> Size: ${item.size} </span>

          ${
            item.isMe === "Y"
              ? "<button class='edit-product' onclick='editProduct(" +
                item.id +
                ")'> Edit Product </button>"
              : ""
          }
        </div>
        <div class="product-item-actions">
          <button class="add-to-cart" onclick="addedToCart(${
            item.id
          })">Add To Cart</button>
          <i class=" far fa-solid fa-heart" style="color: ${
            item.liked ? "red" : ""
          }" onclick="favorite(${item.id})"></i>
        </div>
      </div>
    `;
  });

  productsDom.innerHTML = productsUI.join("");
})(JSON.parse(localStorage.getItem("products")) || products);

// Add To cart
function addedToCart(id) {
  if (localStorage.getItem("username")) {
    let products = JSON.parse(localStorage.getItem("products")) || productsDB;
    let product = products.find((item) => item.id === id);
    let isProductInCart = addedItem.some((i) => i.id === product.id);

    if (isProductInCart) {
      addedItem = addedItem.map((p) => {
        if (p.id === product.id) p.qty += 1;
        return p;
      });
    } else {
      addedItem.push(product);
    }
    // UI
    cartProductDivDom.innerHTML = "";
    addedItem.forEach((item) => {
      cartProductDivDom.innerHTML += `<p>${item.title} <span class='item-qty'>${item.qty}</span></p>`;
    });

    // Save Data
    localStorage.setItem("productsInCart", JSON.stringify(addedItem));

    // Add counter of Items
    let cartProductItems = document.querySelectorAll(".carts-products div p");
    badgeDom.style.display = "block";
    badgeDom.innerHTML = cartProductItems.length;
  } else {
    window.location = "login.html";
  }
}

function saveItemData(id) {
  localStorage.setItem("productId", id);
  window.location = "cartDetails.html";
}

// search function
let input = document.getElementById("search");

input.addEventListener("keyup", function (e) {
  search(e.target.value, JSON.parse(localStorage.getItem("products")));

  if (e.target.value.trim() === "")
    drawProductsUI(JSON.parse(localStorage.getItem("products")));
});

function search(title, myArray) {
  let arr = myArray.filter(
    (item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
  );
  drawProductsUI(arr);
}


function getUniqueArr(arr, filterType) {
  let unique = arr
    .map((item) => item[filterType])
    .map((item, i, final) => final.indexOf(item) === i && i)
    .filter((item) => arr[item])
    .map((item) => arr[item]);

  return unique;
}

function favorite(id) {
  let favoritesItems = localStorage.getItem("productsFavorite")
    ? JSON.parse(localStorage.getItem("productsFavorite"))
    : [];
  let hearts = [...document.querySelectorAll(".fa-heart")].find(
    (e) => e.getAttribute("onclick") === `favorite(${id})`
  );
  let choosenItem = products.find((item) => item.id === id);
  if (!favoritesItems?.some((e) => e.id === choosenItem.id)) {
    function addToFavorite(id) {
      if (localStorage.getItem("username")) {
        hearts.style.color = "red";
        let choosenItem = products.find((item) => item.id === id);
        choosenItem.liked = true;
        console.log("from add: " + choosenItem.id, choosenItem.liked);
        favoritesItems = [...favoritesItems, choosenItem];
        let uniqueProducts = getUniqueArr(favoritesItems, "id");
        localStorage.setItem(
          "productsFavorite",
          JSON.stringify(uniqueProducts)
        );
        localStorage.setItem("products", JSON.stringify(products));
      } else {
        window.location = "login.html";
      }
    }
    addToFavorite(choosenItem.id);
  } else {
    function removeItemFromCart(id) {
      hearts.style.color = "";
      choosenItem.liked = false;
      console.log("from remove: " + choosenItem.id, choosenItem.liked);
      localStorage.setItem("products", JSON.stringify(products));
      let productsFavorite = localStorage.getItem("productsFavorite");
      if (productsFavorite) {
        let items = JSON.parse(productsFavorite);
        let filteredItems = items.filter((item) => item.id !== id);
        localStorage.setItem("productsFavorite", JSON.stringify(filteredItems));
      }
    }
    removeItemFromCart(choosenItem.id);
  }
}

// Edit Product
function editProduct(id) {
  localStorage.setItem("editProduct", id);
  window.location = "editProduct.html";
}

// Filter Products By Size
let sizeFilter = document.getElementById("size-filter");

sizeFilter.addEventListener("change", getProductsFilteredBySize);

function getProductsFilteredBySize(e) {
  let val = e.target.value;
  let products = JSON.parse(localStorage.getItem("products")) || productsDB;

  if (val === "all") {
    drawProductsUI(products);
  } else {
    products = products.filter((i) => i.size === val);
    drawProductsUI(products);
  }
}
