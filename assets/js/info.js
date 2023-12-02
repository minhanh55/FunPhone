//render ở trang info.html
var productName = localStorage.getItem("productName");
var productImage = localStorage.getItem("productImage");
var productPrice = localStorage.getItem("productPrice");
var productPrice2 = productPrice.replace(/\n/g, "");

var headingInfo = document.querySelector(".info__heading");
headingInfo.innerText = productName;

var breadcrumbInfo = document.querySelector(".breadcrumb-name");
breadcrumbInfo.innerText = productName;

var imgInfo = document.querySelector(".info__left-image");
imgInfo.src = productImage;

var priceInfo = document.querySelector(".info__right-price");
priceInfo.innerHTML = productPrice + "₫";

// Thêm sản phẩm vào giỏ hàng
var btnAddCart = document.querySelector(".groupbtn__cart");

// Mỗi khi click thì lưu thông tin vào LocalStorage với key là tên sản phẩm và value là 1 object chứa thông tin sản phẩm đó (tên, giá, ảnh, số lượng)
btnAddCart.addEventListener("click", function () {
    var product = {
        name: productName,
        price: productPrice2,
        image: productImage,
        quantity: 1,
    };

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    var cart = JSON.parse(localStorage.getItem("cart"));
    if (cart == null) {
        // Nếu chưa có thì tạo mới giỏ hàng và thêm sản phẩm vào
        var cart = {};
        cart[productName] = product;
        alert("Thêm sản phẩm vào giỏ hàng thành công");
    } else {
        // Nếu đã có thì kiểm tra xem sản phẩm đó đã có trong giỏ hàng chưa
        if (cart[productName] == undefined) {
            // Nếu chưa có thì thêm sản phẩm vào
            cart[productName] = product;
            alert("Thêm sản phẩm vào giỏ hàng thành công");
        } else {
            // Nếu đã có thì tăng số lượng lên 1
            cart[productName].quantity += 1;
            alert("Thêm sản phẩm vào giỏ hàng thành công");
        }
    }

    // Lưu lại thông tin giỏ hàng vào LocalStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // conlog cart
    // console.log(cart);
});

function seeMore() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Xem thêm";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Thu gọn";
        moreText.style.display = "inline";
    }
}

// đặt lịch sửa chữa
var booking = document.querySelector(".groupbtn__order");
booking.addEventListener("click", function () {
    window.location.href = "booking.html";
});
