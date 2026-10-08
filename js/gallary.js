/********************* Cart ************************* */
const container = document.getElementById("products");

function renderProducts(products) {
  container.innerHTML = products
    .map((p) => {
      const sizes = p.sizes
        .map(
          (s) =>
            `<span class="rounded-md border border-zinc-700 px-2 py-1 text-[10px] text-zinc-300 sm:text-xs hover:bg-lime-400 hover:cursor-pointer transition duration-300 hover:text-black">${s}</span>`,
        )
        .join("");

      return `
        <div class="group grid min-w-0 grid-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-zinc-700">

          <div class="relative aspect-[4/5] overflow-hidden bg-zinc-800">
            <img src="${p.image}" alt="${p.name}" class="h-full w-full object-cover transition duration-700 group-hover:scale-105 ${p.inStock ? "" : "opacity-50 grayscale"}">

            <span class="absolute right-2 top-2 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[10px] text-white backdrop-blur-md sm:text-xs">
              <span class="h-1.5 w-1.5 rounded-full ${p.inStock ? "bg-lime-400" : "bg-red-400"}"></span>
              ${p.inStock ? "In Stock" : "Sold Out"}
            </span>

            <button onclick="addToWishlist(${p.id})" class="icon absolute top-2 left-2.5 rounded">
              <i class="fa-regular fa-heart text-xl text-red-600 p-0.5"></i>
            </button>
          </div>

          <div class="flex flex-1 flex-col p-3 sm:p-5">
            <div class="flex items-center justify-between gap-2">
              <p class="truncate text-[10px] font-medium uppercase tracking-wider text-zinc-400 sm:text-xs">${p.category}</p>
              <P class="text-lime-400 flex gap-1 justify-center items-center text-base">
                <i class="fa-solid fa-star text-base"></i>${p.rating}
              </P>
            </div>

            <h3 class="mt-1.5 truncate text-sm font-semibold text-white sm:text-lg">${p.name}</h3>

            <p class="mt-2 text-base font-bold text-white sm:text-xl">
              ${p.price}
              <span class="text-[10px] text-zinc-300 font-bold sm:text-xs">EGP</span>
            </p>

            <div class="mt-3 mb-4 flex flex-wrap gap-1.5 border-t border-zinc-800 pt-3">${sizes}</div>

            <button
              onclick="addToCart(${p.id})"
              class="mt-auto w-full rounded-xl bg-white py-2.5 text-xs font-semibold text-black transition hover:bg-lime-400 hover:cursor-pointer duration-500 hover:text-black active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 sm:py-3 sm:text-sm"
              ${p.inStock ? "" : "disabled"}>
              ${p.inStock ? "Add To Cart" : "Unavailable"}
            </button>
          </div>
        </div>
      `;
    })
    .join("");
}

/************* filter ************* */

const buttons = document.querySelectorAll(".category-btn");

let result;

if (!result) {
  result = clothes;
  renderProducts(result);
}

buttons.forEach((element) => {
  buttons[0].classList.add("bg-lime-600");
  buttons[0].classList.add("border-white");
  buttons[0].classList.add("text-zinc-800");
  buttons[0].classList.remove("hover:text-lime-400");
  buttons[0].classList.remove("hover:border-lime-400");

  element.addEventListener("click", () => {
    buttons.forEach((btn) => {
      btn.classList.remove("bg-lime-600");
      btn.classList.remove("border-white");
      btn.classList.remove("text-zinc-800");
      btn.classList.add("border-zinc-800");
      btn.classList.add("hover:text-lime-400");
      btn.classList.add("hover:border-lime-400");
    });

    element.classList.add("bg-lime-600");
    element.classList.add("border-white");
    element.classList.add("text-zinc-800");
    element.classList.remove("hover:text-lime-400");
    element.classList.remove("hover:border-lime-400");

    console.log(element);

    const cat = element.id;
    console.log(cat);

    if (cat === "All") {
      result = clothes;
    } else {
      result = clothes.filter((p) => {
        return p.category === cat;
      });
    }

    renderProducts(result);
  });
});

/***************** Add to cart ************** */

let productCart = [];

function addToCart(id) {
  let cartCount = document.getElementById("cartCount");
  let count = Number(cartCount.innerHTML);

  let product = clothes.find((p) => {
    return p.id === id;
  });

  if (product) {
    let existingProduct = productCart.find((p) => {
      return p.id === id;
    });

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      product.quantity = 1;
      productCart.push(product);
      count++;
    }

    cartCount.innerHTML = count;
    disaplayProductCart();
    calculateTotal();

    showToast();
  }
}



function showToast() {
  const toast = document.getElementById("toast");

  toast.classList.remove("hidden");
  toast.classList.add("flex");

  setTimeout(() => {
    toast.classList.add("hidden");
    toast.classList.remove("flex");
  }, 5000);
}

/******** open cart *************** */

const openCartBtn = document.getElementById("openCartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const toast = document.getElementById("toast");
openCartBtn.addEventListener("click", () => {
  cartDrawer.classList.remove("translate-x-full");
  cartOverlay.classList.remove("opacity-0", "invisible");
});


toast.addEventListener("click", () => {
  cartDrawer.classList.remove("translate-x-full");
  cartOverlay.classList.remove("opacity-0", "invisible");
});




closeCartBtn.addEventListener("click", () => {
  cartDrawer.classList.add("translate-x-full");
  cartOverlay.classList.add("opacity-0", "invisible");
});

/***************************************************** */

function disaplayProductCart() {
  cartItems.innerHTML = productCart
    .map(
      (p) => `
        <div class="mb-5 border-b border-zinc-800 pb-5">

          <div class="flex gap-4">

            <div class="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-900">
              <img
                src="${p.image}"
                alt="${p.name}"
                class="h-full w-full object-cover"
              >
            </div>

            <div class="min-w-0 flex-1">

              <div class="flex items-start justify-between gap-3">

                <h3 class="text-sm font-medium leading-5 text-white">
                  ${p.name}
                </h3>

                <button
                  onclick="removeFromCart(${p.id})"
                  class="shrink-0 text-zinc-600 transition hover:text-red-400"
                >
                  <i class="fa-solid fa-trash-can text-xs"></i>
                </button>

              </div>

              <p class="mt-2 text-sm font-semibold text-lime-400" id="price${p.id}">
                ${p.price * p.quantity} EGP
              </p>

              <p class="mt-2 text-xs text-zinc-500">
                ${p.color}
              </p>

              <div class="mt-4 flex items-center gap-1.5">

                <button
                  onclick="decreaseCount(${p.id})"
                  class="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-700 text-zinc-400 transition hover:border-lime-400 hover:text-lime-400"
                >
                  <i class="fa-solid fa-minus text-[8px]"></i>
                </button>

                <span class="flex h-7 min-w-8 items-center justify-center rounded-md border border-zinc-700 px-2 text-xs font-semibold text-white" id="quantity${p.id}">
                  ${p.quantity}
                </span>

                <button
                  onclick="increaseCount(${p.id})"
                  class="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-700 text-zinc-400 transition hover:border-lime-400 hover:text-lime-400"
                >
                  <i class="fa-solid fa-plus text-[8px]"></i>
                </button>

              </div>

            </div>
          </div>

          <div class="mt-4 flex items-center gap-3">

            <span class="shrink-0 text-[9px] uppercase tracking-[0.15em] text-zinc-600">
              Sizes
            </span>

            <div class="flex flex-wrap gap-1.5">

              ${p.sizes
                .map(
                  (size) => `
                    <span class="flex h-7 min-w-7 items-center justify-center rounded-md border border-zinc-700 px-2 text-[10px] text-zinc-300">
                      ${size}
                    </span>
                  `,
                )
                .join("")}

            </div>

          </div>

        </div>
      `,
    )
    .join("");
}

disaplayProductCart();
calculateTotal();

/*************************** */

function increaseCount(id) {
  const price = document.getElementById(`price${id}`);
  const quantity = document.getElementById(`quantity${id}`);
  const product = productCart.find((p) => p.id === id);

  let count = Number(quantity.textContent);

  count++;

  total = product.price * count;

  quantity.textContent = count;
  product.quantity = count;
  price.textContent = `${total} EGP`;

  calculateTotal();
}

function decreaseCount(id) {
  const price = document.getElementById(`price${id}`);
  const quantity = document.getElementById(`quantity${id}`);
  const product = productCart.find((p) => p.id === id);

  let count = Number(quantity.textContent);

  if (count > 1) {
    count--;

    total = product.price * count;
    quantity.textContent = count;
    product.quantity = count;
    price.textContent = `${total} EGP`;

    calculateTotal();
  }
}

/****************** total price ***************** */

function calculateTotal() {
  const totalprice = productCart.reduce((acc, p) => {
    return acc + p.price * p.quantity;
  }, 0);

  cartTotal.innerHTML = `${totalprice} EGP`;
}

/********* wishlist ******** */

const wishlistcount = document.getElementById("wishlistcount");
let count = wishlistcount.innerHTML;

let productWishlist = [];

function addToWishlist(id) {
  let iteam = clothes.find((p) => {
    return p.id === id;
  });

  let existingProduct = productWishlist.find((p) => {
    return p.id === id;
  });

  if (!existingProduct) {
    productWishlist.push(iteam);

    count++;

    wishlistcount.innerHTML = `${count}`;
  } else {
    return;
  }
}

function displayWishlist() {
  const wishlistContainer = document.getElementById("wishlistContainer");

  wishlistContainer.innerHTML = productWishlist
    .map((p) => {
      return `
        <div class="border-b border-zinc-800 pb-4 mb-4">
          <div class="flex gap-4">

            <img
              src="${p.image}"
              alt="${p.name}"
              class="w-20 h-24 object-cover rounded-lg"
            >

            <div class="flex-1">
              <h3 class="font-semibold text-white">
                ${p.name}
              </h3>

              <p class="text-zinc-400 text-sm mt-1">
                ${p.category}
              </p>

              <p class="text-lime-400 font-semibold mt-2">
                $${p.price}
              </p>

              <button
                onclick="removeFromWishlist(${p.id})"
                class="mt-3 text-sm text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>

          </div>
        </div>
      `;
    })
    .join("");
}

const wishlist = document.getElementById("wishlist");
const wishlistOverlay = document.getElementById("wishlistOverlay");
const wishlistDrawer = document.getElementById("wishlistDrawer");
const closeWishlist = document.getElementById("closeWishlist");

wishlist.addEventListener("click", () => {
  wishlistDrawer.classList.remove("translate-x-full");
  wishlistOverlay.classList.remove("opacity-0", "invisible");

  displayWishlist();
});

closeWishlist.addEventListener("click", () => {
  wishlistDrawer.classList.add("translate-x-full");
  wishlistOverlay.classList.add("opacity-0", "invisible");
});

function removeFromWishlist(id) {
  const product = productWishlist.find((p) => {
    return p.id === id;
  });

  if (product) {
    productWishlist = productWishlist.filter((p) => {
      return p.id !== id;
    });

    count = Number(wishlistcount.innerHTML);

    count--;

    productWishlist.innerHTML = count;

    displayWishlist();
  }
}

/************* filter + pagination ************* */

let productsPerPage = 10;
let currentPage = 1;

const paginationContainer = document.getElementById("pagination");

function displayProductsPaginated() {
  let start = (currentPage - 1) * productsPerPage;
  let end = start + productsPerPage;
  let products = result.slice(start, end);
  let totalButtons = Math.ceil(result.length / productsPerPage);

  renderProducts(products);

  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalButtons; i++) {
    paginationContainer.innerHTML += `
      <button
        onclick="changePage(${i})"
        class="w-10 h-10 rounded-full ${currentPage === i ? "bg-lime-400 text-black" : "bg-zinc-800 text-white"}">
        ${i}
      </button>
    `;
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const cat = button.id;

    if (cat !== "All") {
      paginationContainer.classList.add("hidden");
    } else {
      paginationContainer.classList.remove("hidden");
    }
  });
});

function changePage(page) {
  currentPage = page;
  displayProductsPaginated();
}

displayProductsPaginated();
