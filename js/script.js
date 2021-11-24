function createProduct(parent, imgUrl, productTitle, textPrice) {
  const product = document.createElement("div");
  product.className = "product";

  createImg(product, imgUrl, productTitle);
  createText(product, productTitle, textPrice);
  parent.appendChild(product);
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

// fetch("https://fakestoreapi.com/products") // <== importare la lista prodotti in modo remoto
//   .then((response) => response.json())
//   .then((data) => {
//     products = data;
//     renderProducts();
//   });

let products = [];
const wrapperProducts = document.querySelector(".wrapper__products");

function renderProducts(listItems) {
    listItems.map((product) => {
    createProduct(wrapperProducts, product.image, product.title, product.price);
  });
}

const getProductList = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    return renderProducts(data);
}

getProductList();



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