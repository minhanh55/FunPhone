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
    var tr = document.createElement("tr");
    tr.innerHTML = `
        <td class="productInfo"><img style="width: 70px;" src="${cart[key].image}" alt=""><span class="productName">${cart[key].name}</span></td>
        <td><span class="productPrice">${cart[key].price}</span><sup>đ</sup></td>
        <td><input style="width: 50px; outline: none;" type="number" value="${cart[key].quantity}" min="1" class="quantity"></td>
        <td style="cursor: pointer;"><span class="deleteProduct"><i class="fa-solid fa-trash"></i></span></td>
    `;
    // có thể thay đổi số lượng sản phẩm trong giỏ hàng
    tr.querySelector(".quantity").onchange = function () {
        var quantity = this.value;
        var productName =
            this.parentElement.parentElement.querySelector(
                ".productName"
            ).innerText;
        for (var key in cart) {
            if (cart[key].name == productName) {
                cart[key].quantity = quantity;
                localStorage.setItem("cart", JSON.stringify(cart));
                location.reload();
            }
        }
    };
    // xóa sản phẩm trong giỏ hàng
    tr.querySelector(".deleteProduct").onclick = function () {
        var productName =
            this.parentElement.parentElement.querySelector(
                ".productName"
            ).innerText;
        for (var key in cart) {
            if (cart[key].name == productName) {
                delete cart[key];
                localStorage.setItem("cart", JSON.stringify(cart));
                location.reload();
            }
        }
    };

    tbody.appendChild(tr);
    // kiểm tra không đúng định dạng tiền tệ thì chuyển đổi
    if (!cart[key].price.includes(".")) {
        cart[key].price = cart[key].price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    // tổng tiền
    total += parseInt(cart[key].price.replace(/\./g, "")) * cart[key].quantity;
    totalPrice.innerText = total + "đ";
    totalPrice.innerText = totalPrice.innerText.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        "."
    );
}
