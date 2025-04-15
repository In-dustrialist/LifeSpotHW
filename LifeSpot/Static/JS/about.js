// ✅ Функция-конструктор для обычного комментария
function Comment(userName, comment) {
    this.userName = userName;
    this.comment = comment;
    this.date = new Date().toLocaleString();
}

// 🚀 Основная функция
function getReview() {
    // Получаем имя
    let userName = prompt("Как вас зовут?");
    if (userName === null) return;

    // Получаем текст комментария
    let comment = prompt("Напишите свой отзыв");
    if (comment === null) return;

    // ✅ Создаём комментарий через конструктор
    let review = new Comment(userName, comment);

    // ❓ Хотим ли рейтинг?
    if (confirm("Хотите, чтобы ваш комментарий могли оценить?")) {
        // Создаем объект-отзыв на основе review
        let ratedReview = Object.create(review);
        ratedReview.rate = 0; // рейтинг по умолчанию
        writeReview(ratedReview);
    } else {
        writeReview(review);
    }
}

// 🖊 Печать комментария на страницу
function writeReview(review) {
    const reviewsBlock = document.getElementsByClassName('reviews')[0];

    // Уникальный ID для кнопки лайка, если это отзыв
    const uniqueId = "like-" + Math.random().toString(36).substr(2, 9);

    reviewsBlock.innerHTML +=
        `<div class="review-text">
            <p><i><b>${review.userName}</b>  ${review.date}</i></p>
            <p>${review.comment}</p>` +

        // Если это отзыв с рейтингом — добавляем кнопку лайка
        (review.hasOwnProperty('rate')
            ? `<p><b>Рейтинг:</b> <span id="${uniqueId}">${review.rate}</span>
               <button onclick="addLike('${uniqueId}')">❤️</button></p>`
            : '') +

        `</div>`;
}

// ❤️ Увеличение рейтинга
function addLike(id) {
    const rateElement = document.getElementById(id);
    let currentRate = parseInt(rateElement.innerText);
    rateElement.innerText = currentRate + 1;
}
