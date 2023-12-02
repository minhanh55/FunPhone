const isLogin =
    localStorage.getItem("tokenLogin") && localStorage.getItem("tokenLogin");
// Check đăng nhập
function checkLogin() {
    if (!isLogin) {
        window.location.replace("./login.html"); // đưa về trang login
    } else {
        window.location.replace("./index.html"); // đưa vào trang giả hàng
        var user = JSON.parse(localStorage.getItem("user"));
        var userBlock = document.querySelector(".header-check");
        userBlock.innerHTML = `
        <div
            class="row header__item"
            onclick="logout()"
        >
            <div class="col-3">
                <div class="fs-1 text-light">
                    <i
                        class="fa fa-user header-icon"
                    ></i>
                </div>
            </div>
            <div class="col-9">
                <div class="col-9">
                    <strong class="subheader"
                        >Đăng xuất</strong
                    >
                </div>
            </div>
        </div>
        `;
    }
}

// Có đăng nhập thì hiện ra user
if (isLogin) {
    var user = JSON.parse(localStorage.getItem("user"));
    var userBlock = document.querySelector(".header-check");
    var userBlockMobile = document.querySelector(".header-check-mobile");
    userBlock.innerHTML = `
    <div
        class="row header__item"
        onclick="logout()"
    >
        <div class="col-3">
            <div class="fs-1 text-light">
                <i
                    class="fa fa-user header-icon"
                ></i>
            </div>
        </div>
        <div class="col-9">
            <div class="col-9">
                <strong class="subheader"
                    >Đăng xuất</strong
                >
            </div>
        </div>
    </div>   
    `;
    userBlockMobile.innerHTML = `
    <div
        class="row header__item"
        onclick="logout()"
    >
        <div class="col-3">
            <div class="fs-1 text-light">
                <i
                    class="fa fa-shopping-cart header-icon"
                ></i>
            </div>
        </div>
        <div class="col-9">
            <strong class="subheader"
                >Đăng xuất</strong
            >
        </div>
    </div>`;
}

function showNotification(className, content) {
    document.getElementById("notification").classList.add(className);
    document.getElementById("contentNotification").innerText = content;
    setTimeout(() => {
        document.getElementById("notification").classList.remove(className);
        document.getElementById("contentNotification").innerText = "";
    }, 3000);
}

function login() {
    const userAdmin = [
        {
            account: "admin",
            password: "admin",
            isAdmin: true,
        },
    ];
    const account = document.getElementById("account").value;
    const password = document.getElementById("password").value;

    // lấy dữ liệu từ cả localStorage users và dữ liệu userAdmin
    const dataUser = JSON.parse(localStorage.getItem("users")).concat(
        userAdmin
    );

    const checkUser = dataUser.find(
        (item) => item.account === account && item.password === password
    );
    if (checkUser) {
        localStorage.setItem("tokenLogin", JSON.stringify(checkUser));
        window.location.href = "./index.html";
    } else {
        showNotification(
            "alert-danger",
            "Tài khoản và mật khẩu không đúng - Vui lòng nhập lại"
        );
    }
}

function logout() {
    // Xác nhận mới đăng xuất
    const isConfirm = window.confirm("Xác nhận đăng xuất?");
    if (isConfirm) {
        localStorage.removeItem("tokenLogin");
        window.location.href = "./index.html";
    }
}