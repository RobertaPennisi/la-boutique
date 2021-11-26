//Parte inerente la logica della modale
const modalAddedToCart = document.querySelector(".modalAddedToCart");

const showModal = (top, left) => {
  modalAddedToCart.style.display = "block";
  modalAddedToCart.style.top = top + 30 + "px";
  modalAddedToCart.style.left = left + 12 + "px";

  setTimeout(() => {modalAddedToCart.style.display = "none";}, 1000);
}

//parte inerente la logica dello slider
const slider = () => {
  const slides = ["https://cdn.pixabay.com/photo/2013/11/14/12/34/neckties-210347_960_720.jpg", "https://cdn.pixabay.com/photo/2016/04/19/13/39/store-1338629_960_720.jpg", "https://cdn.pixabay.com/photo/2015/08/29/01/18/closet-912694_960_720.jpg"]
  const overlay = document.querySelector('.overlay');
  
  setTimeout(() => {
    overlay.style.backgroundImage = `url('${slides[0]}')`;
    
    setTimeout(() => {
      overlay.style.backgroundImage = `url('${slides[1]}')`;
      
      setTimeout(() => {
        overlay.style.backgroundImage = `url('${slides[2]}')`;
        
      }, 3000);
    }, 3000);
  }, 3000);
}

setInterval(slider, 9000);

//Parte inerente la logica del carrello
function setCartProductsNum() {
  cartProductsNum.textContent = `Numero prodotti: ${cartList.length}`;
}

function createProduct(parent, imgUrl, productTitle, textPrice, idProduct) {
  const product = document.createElement("div");
  product.className = "product";
  product.setAttribute("id", idProduct);

  createImg(product, imgUrl, productTitle);
  createText(product, productTitle, textPrice);
  parent.appendChild(product);

  product.addEventListener("click", (e) => {
    const localStorageValue = localStorage.getItem("totCartitems");
    if (localStorageValue) {
      cartList = JSON.parse(localStorageValue);
    }

    cartList.push(
      productsList.find(
        (product) => parseInt(e.currentTarget.id) === product.id
      )
    );
    setCartProductsNum();
    showModal(product.offsetTop, product.offsetLeft);
    
    // Nel caso in cui volessimo aggiungere una interazione col LocalStorage
    localStorage.setItem("totCartitems", JSON.stringify(cartList));
  });
}

function createImg(parent, imgUrl, productTitle) {
  const image = document.createElement("img");
  image.src = imgUrl;
  image.alt = productTitle;

  parent.appendChild(image);
}

function createText(parent, productTitle, textPrice) {
  const title = document.createElement("h4");
  title.textContent = productTitle;

  const price = document.createElement("strong");
  price.textContent = `${textPrice} $`;

  parent.append(title, price);
}

function renderProducts(listItems) {
  listItems.map((product) => {
    createProduct(
      wrapperProducts,
      product.image,
      product.title,
      product.price,
      product.id
    );
  });
}

// Async await
const getProductsList = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  productsList = data;

  return renderProducts(data);
};

let productsList = [];
const wrapperProducts = document.querySelector(".wrapper__products");

// Parte inerente alla logica del carrello
let cartList = [];

const localStorageTot = localStorage.getItem("totCartitems");
const cartBtn = document.querySelector(".cartBtn");
const cartProductsNum = document.querySelector(".cartProductsNum");
const clearCartBtn = document.querySelector(".clearCart");

// Flusso generale
const parsedTotCardItemsLen =
  JSON.parse(localStorage.getItem("totCartitems"))?.length || 0;

cartProductsNum.textContent = `Numero prodotti: ${parsedTotCardItemsLen || 0}`;
getProductsList();

clearCartBtn.addEventListener("click", () => {
  cartList.length = 0;
  setCartProductsNum();
});