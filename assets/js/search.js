const productListElement = document.querySelectorAll(".product__list");

if (productListElement) {
    const data = [];

    const productsItem = document.querySelectorAll(".product__item");
    productsItem.forEach((product) => {
        // const id = product.querySelector(".id").textContent;

        const thumb = product.querySelector(".product__media-img").src;

        const notes = Array.from(
            product.querySelectorAll(".product__media-note p")
        ).map((item) => item.textContent);

        const discount = product.querySelector(
            ".product__media-promotion"
        ).textContent;

        const info = {};
        info.title = product.querySelector(".product__info h3").textContent;
        info.prices = Array.from(
            product.querySelectorAll(".product__price span")
        ).map((item) => item.textContent);
        info.desc = product.querySelector(".product__desc").textContent;

        const productItem = {
            thumb,
            notes,
            discount,
            info,
        };

        data.push(productItem);
    });

    var searchInput = document.querySelectorAll(".search-product");
    searchInput.forEach((input) => {
        input.addEventListener("keyup", (e) => {
            if (e.key == "Enter") {
                performSearch(input.value);
            }
        });
    });

    function performSearch(keyword) {
        const productsItem = data.filter((product) => {
            if (
                product.info.title.toLowerCase().includes(keyword.toLowerCase())
            ) {
                return product;
            }
        });

        if (productsItem) {
            const searchResult = document.querySelector(".search-result .row");
            console.log(productsItem);
            if (searchResult) {
                let result = "";
                productsItem.forEach((product) => {
                    result += `
                    <div class="row search-result__product col-xl-3 col-lg-4 col-sm-6 col-12" id="smartphones-list">
                        <div class="product__item my-3" style="width: 90%">
                            <div class="id d-none">${product.id}</div>
                            <div class="product__media">
                                <img
                                    src="${product.thumb}"
                                    alt=""
                                    class="product__media-img"
                                />
                                <span class="product__media-note">
                                    <p>${product.notes[0]}</p>
                                    <p>${product.notes[1]}</p>
                                </span>
                                <div class="product__media-promotion">${product.discount}</div>
                            </div>
                            <div class="product__info">
                                <h3>${product.info.title}</h3>
                                <div class="product__price">
                                    <span>${product.info.prices[0]}</span><span class="line-through">${product.info.prices[1]}</span>
                                </div>
                                <p class="product__desc">
                                    <strong>${product.info.desc}</strong>
                                </p>
                            </div>
                        </div>
                    </div>`;
                });

                searchResult.innerHTML = result;
                searchResult.parentNode.classList.remove("d-none");
                // navigateToInfo();
            }
        }
    }
}

function clearSearch() {
    const logo = document.querySelector(".logo");
    logo.addEventListener("click", () => {
        const searchElement = document.querySelector(".search-result");
        if (searchElement) {
            searchElement.classList.add("d-none");
        }
        document.querySelector(".search-product").value = "";
    });
}

clearSearch();
