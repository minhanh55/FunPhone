const isLogin =
    localStorage.getItem("tokenLogin") && localStorage.getItem("tokenLogin");

// Có đăng nhập thì hiện ra user
if (isLogin) {
    var user = JSON.parse(localStorage.getItem("tokenLogin"));
    var userBlock = document.querySelector(".header-check");
    var userBlockMobile = document.querySelector(".header-check-mobile");
    if (user.isAdmin === true) {
        userBlock.innerHTML = `
        <div class="row header__item">
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
                        >Tài khoản</strong
                    >
                </div>
            </div>
            <ul class="sub-menu">
                <li class="sub-menu-admin">
                    <a href="admin">
                        <i
                            class="fa-solid fa-circle-user"
                        ></i>
                        Trang Admin</a
                    >
                </li>
                <hr />
                <li>
                    <a href="" onclick="logout()">
                        <i
                            class="fa-solid fa-right-from-bracket"
                        ></i>
                        Đăng xuất</a
                    >
                </li>
            </ul>
        </div>
        `;

        userBlockMobile.innerHTML = `
        <div class="row header__item">
            <div class="col-3">
                <div class="fs-1 text-light">
                    <i
                        class="fa fa-user header-icon"
                    ></i>
                </div>
            </div>
            <div class="col-9">
                <strong class="subheader"
                    >Tài khoản</strong
                >
            </div>
            <ul class="sub-menu">
                <li class="sub-menu-admin">
                    <a href="admin">
                        <i
                            class="fa-solid fa-circle-user"
                        ></i>
                        Trang Admin</a
                    >
                </li>
                <hr />
                <li>
                    <a href="" onclick="logout()">
                        <i
                            class="fa-solid fa-right-from-bracket"
                        ></i>
                        Đăng xuất</a
                    >
                </li>
            </ul>
        </div>
        `;
    } else {
        userBlock.innerHTML = `
        <div class="row header__item">
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
                        >Tài khoản</strong
                    >
                </div>
            </div>
            <ul class="sub-menu">
                <li>
                    <a href="" onclick="logout()">
                        <i
                            class="fa-solid fa-right-from-bracket"
                        ></i>
                        Đăng xuất</a
                    >
                </li>
            </ul>
        </div>
        `;

        userBlockMobile.innerHTML = `
        <div class="row header__item">
            <div class="col-3">
                <div class="fs-1 text-light">
                    <i
                        class="fa fa-user header-icon"
                    ></i>
                </div>
            </div>
            <div class="col-9">
                <strong class="subheader"
                    >Tài khoản</strong
                >
            </div>
            <ul class="sub-menu">
                <li>
                    <a href="" onclick="logout()">
                        <i
                            class="fa-solid fa-right-from-bracket"
                        ></i>
                        Đăng xuất</a
                    >
                </li>
            </ul>
        </div>
        `;
    }
}

function showNotification(className, content) {
    document.getElementById("notification").style.display = "flex";
    document.getElementById("notification").classList.add(className);
    document.getElementById("contentNotification").innerText = content;
    setTimeout(() => {
        document.getElementById("notification").classList.remove(className);
        document.getElementById("contentNotification").innerText = "";
        document.getElementById("notification").style.display = "none";
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

    var dataUser = [];
    // lấy dữ liệu từ cả localStorage users và dữ liệu userAdmin
    if (JSON.parse(localStorage.getItem("users"))) {
        dataUser = JSON.parse(localStorage.getItem("users")).concat(userAdmin);
    } else {
        dataUser = userAdmin;
    }

    const checkUser = dataUser.find(
        (item) => item.account === account && item.password === password
    );
    if (checkUser) {
        localStorage.setItem("tokenLogin", JSON.stringify(checkUser));
        // hiện thông báo đăng nhập thành công, 0.5s tự đóng
        showNotification("alert-success", "Đăng nhập thành công");
        setTimeout(() => {
            window.location.href = "./index.html";
        }, 500);

        // window.location.href = "./index.html";
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
