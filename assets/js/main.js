// Kiểm tra trong local storage products chưa, nếu chưa có thì thêm vào
var products = JSON.parse(localStorage.getItem("products")) || [];
if (products.length === 0) {
    products = [
        {
            name: "Màn hình chính hãng GX thay cho iPhone Xs Max",
            type: "smartphone",
            price: "3500000",
            promotion: "29",
            image: "./assets/img/product/mangx.png",
        },
        {
            name: "Thay màn hình Samsung Galaxy Note 20 Ultra",
            type: "smartphone",
            price: "4900000",
            promotion: "20",
            image: "./assets/img/product/thay-man-hinh-samsung-galaxy-note-20-ultra.png",
        },
        {
            name: "Thay màn hình Samsung Galaxy A71",
            type: "smartphone",
            price: "1700000",
            promotion: "10",
            image: "./assets/img/product/mansamsunga71.png",
        },
        {
            name: "Pin chính hãng Pisen thay cho iPhone 12 Pro Max",
            type: "smartphone",
            price: "1300000",
            promotion: "10",
            image: "./assets/img/product/pin12promax.png",
        },
        {
            name: "Pin siêu cao chính hãng Pisen thay cho iPhone 7 Plus",
            type: "smartphone",
            price: "1080000",
            promotion: "31",
            image: "./assets/img/product/piniphone7plus.png",
        },
        {
            name: "Pin siêu cao chính hãng Pisen thay cho iPhone X",
            type: "smartphone",
            price: "1430000",
            promotion: "41",
            image: "./assets/img/product/piniphonex.png",
        },
        {
            name: "Sửa bản lề laptop",
            type: "laptop",
            price: "550000",
            promotion: "5",
            image: "./assets/img/product/banle.png",
        },
        {
            name: "Thay ổ cứng SSD Kingston 480GB SA400 SATA",
            type: "laptop",
            price: "1500000",
            promotion: "47",
            image: "./assets/img/product/480GB.png",
        },
        {
            name: "Thay ổ cứng SSD Kingston 240GB SA400",
            type: "laptop",
            price: "1000000",
            promotion: "35",
            image: "./assets/img/product/240GB.png",
        },
        {
            name: "Thay Pin Laptop HP Pavilion X360 14 CD0522SA",
            type: "laptop",
            price: "1600000",
            promotion: "5",
            image: "./assets/img/product/thay-pin-laptop-hp-pavilion.png",
        },
        {
            name: "Pin chính hãng Pisen thay cho MacBook Pro",
            type: "laptop",
            price: "2890000",
            promotion: "14",
            image: "./assets/img/product/macpro13.png",
        },

        {
            name: "Thay RAM laptop Kingston DDR4 16GB Bus 3200",
            type: "laptop",
            price: "1350000",
            promotion: "10",
            image: "./assets/img/product/RAM-Kingston-16GB-3200.png",
        },
    ];
    localStorage.setItem("products", JSON.stringify(products));
}

var products = JSON.parse(localStorage.getItem("products")) || [];

renderProducts(products);

function renderProducts(products) {
    // cho điện thoại
    var smartphoneListBlock = document.querySelector("#smartphones-list");

    var smartphone = products.map(function (product) {
        var priceSale = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "VND",
        }).format(product.price - (product.promotion / 100) * product.price);
        if (product.type === "smartphone") {
            return `
        <div class="col-lg product__item">
            <div class="product__media">
                <img
                    src="${product.image}"
                    alt=""
                    class="product__media-img"
                />
                <span class="product__media-note">
                    <p>BẢO HÀNH 6 THÁNG</p>
                    <p>Sửa 1 giờ</p>
                </span>
                <div class="product__media-promotion">-${
                    product.promotion
                }%</div>
            </div>
            <div class="product__info">
                <h3>${product.name}</h3>
                <div class="product__price">
                <span>${priceSale}</span>
                <span>${new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "VND",
                }).format(product.price)}</span>
                </div>
                <p class="product__desc">
                    <strong>Tặng áo mưa khi thay pin, màn hình Pisen</strong>, số lượng có hạn
                </p>
            </div>
        </div>
        `;
        }
    });
    smartphoneListBlock.innerHTML += smartphone.join("");

    // cho laptop
    var laptopListBlock = document.querySelector("#laptops-list");
    var laptop = products.map(function (product) {
        var priceSale = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "VND",
        }).format(product.price - (product.promotion / 100) * product.price);
        if (product.type === "laptop") {
            return `
        <div class="col-lg product__item">
            <div class="product__media">
                <img
                    src="${product.image}"
                    alt=""
                    class="product__media-img"
                />
                <span class="product__media-note">
                    <p>BẢO HÀNH 6 THÁNG</p>
                    <p>Sửa 1 giờ</p>
                </span>
                <div class="product__media-promotion">-${
                    product.promotion
                }%</div>
            </div>
            <div class="product__info">
                <h3>${product.name}</h3>
                <div class="product__price">
                <span>${priceSale}</span>
                <span>${new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "VND",
                }).format(product.price)}</span>
                </div>
                <p class="product__desc">
                    <strong>Tặng áo mưa khi thay pin, màn hình Pisen</strong>, số lượng có hạn
                </p>
            </div>
        </div>
        `;
        }
    });
    laptopListBlock.innerHTML += laptop.join("");
}

// Click chuyển đến trang info

var productItem = document.querySelectorAll(".product__item");
var productItemLength = productItem.length;

for (let i = 0; i < productItemLength; i++) {
    productItem[i].addEventListener("click", function () {
        console.log(productItem[i]);
        // lấy ra tên, hình ảnh sản phẩm

        var productName =
            productItem[i].querySelector(".product__info h3").innerText;
        var productImage = productItem[i].querySelector(
            ".product__media-img"
        ).src;

        var productPrice = productItem[i].querySelector(
            ".product__price span:first-child"
        ).innerHTML;
        // định dạng như vầy 989&nbsp;₫ tách productPrice để lấy số:
        var productPrice2 = productPrice.slice(0, productPrice.indexOf("₫"));
        if (productPrice2.includes("&")) {
            productPrice2 = productPrice2.replace("&nbsp;", "");
        }

        localStorage.setItem("productName", productName);
        localStorage.setItem("productImage", productImage);
        localStorage.setItem("productPrice", productPrice2);

        window.location.href = "info.html";
    });
}
