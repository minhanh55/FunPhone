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
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>
                <img src="${product.image}" alt="" />
            </td>
            
            <td>${priceFormat}</td>  
            <td>
                <button class="btn btn-success" onclick="decrease('${key}')">-</button>
                <span>${product.quantity}</span>
                <button class="btn btn-success" onclick="increase('${key}')">+</button>
            </td>
            <td>${price}</td>

            <td>
                <button class="btn btn-danger" onclick="remove('${key}')">Xoá</button>
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
