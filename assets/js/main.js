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
                ${priceSale}<span>${new Intl.NumberFormat("de-DE", {
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
                ${priceSale}<span>${new Intl.NumberFormat("de-DE", {
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
        var productPrice =
            productItem[i].querySelector(".product__price").innerHTML;
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
