var cart = JSON.parse(localStorage.getItem("cart"));
var table = document.querySelector("table");
var tbody = document.querySelector("tbody");
var totalPrice = document.querySelector(".price-total");
var total = 0;

if (cart == null || Object.keys(cart).length == 0) {
    document.querySelector(".price").style.display = "none";
    document.querySelector(".submit").innerText = "Giỏ hàng trống";
    table.innerHTML = `
        <tr>
            <td colspan="4" style="text-align: center;">Không có sản phẩm nào trong giỏ hàng</td>
        </tr>
    `;
}

for (var key in cart) {
    var index = Object.keys(cart).indexOf(key);
    var product = cart[key];
    if (product.price.includes(".")) {
        product.price = product.price.replace(/\./g, "");
    }
    total += product.price * product.quantity;

    var price = product.price * product.quantity;
    price = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
    }).format(price);

    // biến định dạng giá tiền
    var priceFormat = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
    }).format(product.price);

    tbody.innerHTML += `
        <tr>
            <td class="cart__info-product">
                <div class="cart__info-product-top">
                    <span>${index + 1}</span>
                    <img src="${product.image}" alt="" />
                </div>
                <div class="cart__info-product-bottom">
                    <div class="cart__info-product-item">
                        <span class="cart__info-name">${product.name}</span>
                        <span class="cart__info-price">${priceFormat}</span>
                    </div>
                    <div class="cart__info-product-item">
                        <button class="btn btn-delect">
                            <i class="fa-solid fa-trash-can" onclick="remove('${key}')"></i>
                        </button>
                        <div class="control-quantity">
                            <button class="btn btn-success" onclick="decrease('${key}')">-</button>
                            <span>${product.quantity}</span>
                            <button class="btn btn-success" onclick="increase('${key}')">+</button>
                        </div>
                    </div>
                </div>
            </td>    
        </tr>
    `;
}

total = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "VND",
}).format(total);
totalPrice.innerText = "Tổng thanh toán: " + total;

function increase(key) {
    cart[key].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
}

function decrease(key) {
    if (cart[key].quantity > 1) {
        cart[key].quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.reload();
    }
}

function remove(key) {
    delete cart[key];
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
}
