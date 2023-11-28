// Tiêu đề trang (header)
const titlePage = document.querySelector("#title-page");
function getTitlePage(item) {
    var htmls = `
        <h2>${item.textContent}</h2>
    `;
    titlePage.innerHTML = htmls;
}

// Action item
const navItems = document.querySelectorAll(".nav__link");
const panes = document.querySelectorAll(".item-pane");
navItems.forEach((item, index) => {
    const pane = panes[index];

    item.onclick = function () {
        document.querySelector(".nav__link.active").classList.remove("active");
        document.querySelector(".item-pane.active").classList.remove("active");

        this.classList.add("active");
        pane.classList.add("active");

        getTitlePage(this);
    };
});

// Action Add Product
const btnAddProduct = document.querySelector("#products__add-btn");
const infoAddProduct = document.querySelector(".products__add-info");

btnAddProduct.onclick = function () {
    infoAddProduct.classList.toggle("active");
    // Gọi hàm tạo ở đây
};
