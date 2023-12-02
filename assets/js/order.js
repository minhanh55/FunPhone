const generateRandomString = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let result = "";

    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }

    return result;
};

var totalPriceOrder = document.querySelector(".price-total").innerText;
// totalPriceOrder có dạng: 'Tổng thanh toán: 40.300.000 ₫' => cần lấy số 40.300.000
totalPriceOrder = totalPriceOrder.split(" ")[3];

const orderButton = document.querySelector(".order-product");
var cart = JSON.parse(localStorage.getItem("cart"));

if (cart == null || Object.keys(cart).length == 0) {
    var cartList = document.querySelector(".cart__list");
    cartList.innerHTML = `
    <div class="cartempty">
        <i class="fa-solid fa-cart-shopping"></i>
        <span>Không có sản phẩm nào trong giỏ hàng</span>
        <a href="index.html" class="backhome">Về trang chủ</a>
    </div>
    `;
    document.querySelector(".total-cost").style.display = "none";
}

if (orderButton !== null) {
    orderButton.addEventListener("click", () => {
        // check login trước khi đặt hàng
        var isLogin =
            localStorage.getItem("tokenLogin") &&
            localStorage.getItem("tokenLogin");
        if (!isLogin) {
            alert("Vui lòng đăng nhập để đặt hàng!");
            window.location.replace("./login.html"); // đưa về trang login
        } else {
            const data = JSON.parse(localStorage.getItem("cart"));
            if (data !== null) {
                const isConfirm = window.confirm(
                    "Vui lòng kiểm tra lại đơn hàng trước khi xác nhận. Bạn có chắc chắn muốn đặt hàng không?"
                );
                if (isConfirm) {
                    alert("Đặt hàng thành công!");
                    const info = {
                        code: generateRandomString(6),
                        createAt: new Date(),
                        name: "Khách hàng mới",
                        state: "Đang xử lý",
                        payment: "Chưa thanh toán",
                        delivery: "Đang giao hàng",
                        total: totalPriceOrder,
                    };
                    const orders = JSON.parse(localStorage.getItem("orders"));
                    if (orders !== null) {
                        localStorage.setItem(
                            "orders",
                            JSON.stringify([...orders, { data, info }])
                        );
                    } else {
                        localStorage.setItem(
                            "orders",
                            JSON.stringify([{ data, info }])
                        );
                    }
                    localStorage.removeItem("cart");
                    window.location.reload();
                }
            }
        }
    });
}
