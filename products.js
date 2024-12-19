let search = document.querySelector(".search");
let products = document.querySelectorAll("#products .product");

search.addEventListener("input", (event) => {
    const searchData = event.target.value.toLowerCase();
    let found = false;

    products.forEach((product) => {
        const productName = product.querySelector("h3").innerText.toLowerCase();
        if (productName.includes(searchData)) {
            product.style.display = "block";
            found = true;
        } else {
            product.style.display = "none";
        }
    });

    const noResults = document.querySelector(".no-results");
    if (!found) {
        if (!noResults) {
            const message = document.createElement("p");
            message.className = "no-results";
            message.innerText = "Ничего не найдено.";
            products[0].parentElement.appendChild(message);
        }
    } else if (noResults) {
        noResults.remove();
    }
});

const buttons = document.querySelectorAll('.add-to-cart-btn');
buttons.forEach(button => {
    button.setAttribute('title', 'Добавить товар в корзину');
});