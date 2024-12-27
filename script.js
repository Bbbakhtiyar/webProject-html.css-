// Получаем корзину из localStorage или создаем новую, если корзины нет
const popup = document.querySelector("#popup");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Добавление товара в корзину
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart")) {
        const name = event.target.dataset.name;
        const price = parseInt(event.target.dataset.price);
        cart.push({ name, price });
        localStorage.setItem("cart", JSON.stringify(cart)); 
        showPopup(`${name} added to cart!`);
    }
});

// Отображение корзины на странице оформления заказа
if (document.getElementById("cart-table")) {
    const cartBody = document.getElementById("cart-body");
    const totalElement = document.getElementById("total");
    let total = 0;
    const names = [];

    // Создаем строки таблицы для каждого элемента в корзине
    cart.forEach((item, index) => {
        const row = document.createElement("tr");
        const amount = cart.filter((element) => element.name === item.name).length;

        if (!names.includes(item.name)) {
            const nameCell = document.createElement("td");
            nameCell.textContent = `${item.name} ${amount > 1 ? `x${amount}` : ""}`;
            row.appendChild(nameCell);

            const priceCell = document.createElement("td");
            priceCell.textContent = `${item.price} tenge`;
            row.appendChild(priceCell);

            // Добавляем кнопку удаления
            const removeCell = document.createElement("td");
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.classList.add("remove-from-cart");
            removeButton.addEventListener("click", () => removeFromCart(index)); 
            removeCell.appendChild(removeButton);
            row.appendChild(removeCell);

            cartBody.appendChild(row);
            names.push(item.name);
        }
        total += item.price;
    });

    // Обновляем итоговую сумму
    totalElement.textContent = `${total} тенге`;

    // Завершение покупки
    document.getElementById("completeOrder").addEventListener("click", () => {
        showPopup("Thank you for your purchase!");
        cart.length = 0; // Очищаем корзину
        localStorage.removeItem("cart"); 
        setTimeout(() => {
            location.href = "products.html"; 
        }, 3000);
    });
}

// Функция удаления товара из корзины
function removeFromCart(index) {
    
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    
    location.reload();
}

// Функция для отображения всплывающего сообщения
const showPopup = (message) => {
    popup.textContent = message;

    popup.classList.remove("hidden");
    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
        popup.classList.add("hidden");
    }, 3000);
};

// Добавление класса 'show' таблице при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('table');
    if (table) {
        table.classList.add('show');
    }
});
