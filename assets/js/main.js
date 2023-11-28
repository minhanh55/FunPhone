var productItem = document.querySelectorAll(".product__item");
var productItemLength = productItem.length;

for (let i = 0; i < productItemLength; i++) {
    productItem[i].addEventListener("click", function () {
        // console.log(productItem[i]);
        // lấy ra tên, hình ảnh sản phẩm

        var productName =
            productItem[i].querySelector(".product__info h3").innerText;
        var productImage = productItem[i].querySelector(
            ".product__media-img"
        ).src;
        var productPrice =
            productItem[i].querySelector(".product__price").innerHTML;

        localStorage.setItem("productName", productName);
        localStorage.setItem("productImage", productImage);
        localStorage.setItem("productPrice", productPrice);

        window.location.href = "info.html";
    });
}

//render ở trang info.html
var productName = localStorage.getItem("productName");
var productImage = localStorage.getItem("productImage");
var productPrice = localStorage.getItem("productPrice");

var headingInfo = document.querySelector(".info__heading");
headingInfo.innerText = productName;

var breadcrumbInfo = document.querySelector(".breadcrumb-name");
breadcrumbInfo.innerText = productName;

var imgInfo = document.querySelector(".info__left-image");
imgInfo.src = productImage;

var priceInfo = document.querySelector(".info__right-price");
// var index = productPrice.indexOf("₫");
// productPrice = productPrice.slice(0, index + 1);
priceInfo.innerHTML = productPrice;
