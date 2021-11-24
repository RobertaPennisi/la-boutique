const cartRender = () => {
  cartProductsNum.textContent = `Numero prodotti: ${cartList.length}`;
  localStorage.setItem('totCartItems', cartList.length);
}

function createProduct(parent, imgUrl, productTitle, textPrice, idProduct) {
  const product = document.createElement("div");
  product.className = "product";
  product.setAttribute("id", idProduct)

  createImg(product, imgUrl, productTitle);
  createText(product, productTitle, textPrice);
  parent.appendChild(product);

  product.addEventListener('click', (e) => {  
    cartList.push(
      productList.find(
        (product) => parseInt(e.currentTarget.id) === product.id
      )
    );
    cartRender();
    //cartProductsNum.textContent = `Numero prodotti: ${cartList.length}`
    //alert(`Prodotto aggiunto al carrello, numero prodotti: ${cartList.length}`)
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
    createProduct(wrapperProducts, product.image, product.title, product.price, product.id);
  });
}

const getProductList = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    productList = data;
    return renderProducts(data);
}

let productList = [];
const wrapperProducts = document.querySelector(".wrapper__products");

// Parte inerente alla logica del carrello
let cartList = [];
const cartBtn = document.querySelector(".cartBtn");
const cartProductsNum = document.querySelector('.cartProductsNum');
const clearCartBtn = document.querySelector('.clearCart');


getProductList();
clearCartBtn.addEventListener('click', () => {
    cartList = [];
    cartRender();
    //cartProductsNum.textContent = `Numero prodotti: ${cartList.length}`
})

document.addEventListener('DOMContentLoaded', () => {
    cartList.length = localStorage.getItem("totCartItems");
    cartRender();
})