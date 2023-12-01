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

// Lấy dữ liệu từ localStorage
var products = JSON.parse(localStorage.getItem("products")) || [];

// Action Add Product
const btnAddProduct = document.querySelector("#products__add-btn");
const infoAddProduct = document.querySelector(".products__add-info");
const productForm = document.getElementById("productForm");
const productAddBtn = document.querySelector("#addBtn");

renderProducts(products);

btnAddProduct.onclick = function () {
    infoAddProduct.classList.toggle("active");
    createProduct();
};

function createProduct() {
    productAddBtn.addEventListener("click", function (event) {
        const productName = document.getElementById("productName").value;
        const productType = document.getElementById("productType").value;
        const productPrice = document.getElementById("productPrice").value;
        const productPromotion =
            document.getElementById("productPromotion").value;
        const productImage = document.getElementById("productImage").files[0];

        if (
            productName.trim() === "" ||
            productType.trim() === "" ||
            productPrice.trim() === "" ||
            productPromotion.trim() === "" ||
            !productImage
        ) {
            alert("Vui lòng nhập đầy đủ thông tin sản phẩm và tải ảnh lên.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            const imageURL = event.target.result;

            products.push({
                name: productName,
                type: productType,
                price: productPrice,
                promotion: productPromotion,
                image: imageURL,
            });
            localStorage.setItem("products", JSON.stringify(products));

            alert("Thêm sản phẩm thành công!");
            resetValue();
            infoAddProduct.classList.toggle("active");
            renderProducts(products);
        };
        reader.readAsDataURL(productImage);
    });
}

function resetValue() {
    document.getElementById("productName").value = "";
    document.getElementById("productType").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productPromotion").value = "";
    document.getElementById("productImage").value = "";
}

function renderProducts(products) {
    var tabProductBlock = document.querySelector("#tab-products");
    tabProductBlock.innerHTML = "";

    var htmls = products.map(function (product, index) {
        return `
            <div class="product-item product-item-${index}">
                <h4>${product.name}</h4>
                <img
                    src="${product.image}"
                    alt="Sản phẩm ${index}"
                    class="product__media-img"
                />
                <div class="group-button">
                    <button onclick="handleUpdateProduct(${index})" class="btn button">Sửa</button>
                    <button onclick="handleDeleteProduct(${index})" class="btn button">Xoá</button>
                </div>
            </div>
        `;
    });
    tabProductBlock.innerHTML = htmls.join("");
}

function handleUpdateProduct(id) {
    var productItem = document.querySelector(".product-item-" + id);
    if (productItem) {
        var htmls = products.map(function (product, index) {
            if (index === id)
                return `
                <div class="text-start">
                    <label for="name" class="label">Tên Sản Phẩm</label>
                    <input
                        type="text"
                        id="name"
                        name="nameUpdate"
                        required=""
                        class="input"
                        value="${product.name}"
                    />
        
                    <label for="type" class="label">
                        Loại Sản Phẩm
                    </label>
                    <select name="typeUpdate" id="type" class="select">
                        <option selected disabled value="${product.type}">${
                    product.type === "smartphone" ? "Điện Thoại" : "LapTop"
                }
                        </option>
                        ${product.type}">${
                    product.type === "laptop"
                        ? '<option value="smartphone">Điện Thoại</option>'
                        : '<option value="laptop">LapTop</option>'
                }
                    </select>
        
                    <label for="price" class="label">Giá</label>
                    <input
                        type="number"
                        id="price"
                        name="priceUpdate"
                        required=""
                        class="input"
                        min="0"
                        value="${product.price}"
                    />
        
                    <label for="promotion" class="label"
                        >Giảm Giá (%)</label
                    >
                    <input
                        type="number"
                        id="promotion"
                        name="promotionUpdate"
                        required=""
                        class="input"
                        min="0"
                        max="100"
                        value="${product.promotion}"
                    />
        
                    <label for="image" class="label"
                        >Hình Ảnh</label
                    >
                    <input
                        type="file"
                        id="image"
                        name="imageUpdate"
                        required=""
                        class="input"
                        accept="image/*"
                        value="${product.image}"
                    />
                    <div class="group-button">
                        <button class="btn button" id="save">Save</button>
                        <button class="btn button" id="cancel">Cancel</button>
                    </div>
                </div>
                `;
        });
        // Giao diện chỉnh sửa
        productItem.innerHTML = htmls.join("");

        // Phần xử lí khi bấm Nút sửa
        var productUpdate = document.querySelector("#save");
        productUpdate.onclick = function () {
            var name = document.querySelector("#name").value;
            var type = document.querySelector("#type").value;
            var price = document.querySelector("#price").value;
            var promotion = document.querySelector("#promotion").value;
            var image = document.querySelector("#image").files[0];

            // nếu không tải ảnh thì lấy ảnh cũ
            if (!image) {
                image = products[id].image;

                products[id] = {
                    name: name,
                    type: type,
                    price: price,
                    promotion: promotion,
                    image: image,
                };

                localStorage.setItem("products", JSON.stringify(products));
                renderProducts(products);
                return;
            }

            const reader = new FileReader();
            reader.onload = function (event) {
                const imageURL = event.target.result;

                products[id] = {
                    name: name,
                    type: type,
                    price: price,
                    promotion: promotion,
                    image: imageURL,
                };
                localStorage.setItem("products", JSON.stringify(products));

                // alert("Đã thêm sản phẩm!");
                renderProducts(products);
            };
            reader.readAsDataURL(image);
        };

        // Phần xử lí khi bấm huỷ
        var productCancel = document.querySelector("#cancel");
        productCancel.onclick = function () {
            renderProducts(products);
        };
    }
}

function handleDeleteProduct(id) {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
        products.splice(id, 1);
    }
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts(products);
}
