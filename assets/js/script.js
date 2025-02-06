'use strict';

// Функция переключения активности элемента
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
}

// Переменные для боковой панели
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Функционал переключения боковой панели для мобильных устройств
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// Переменные для отзывов
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Переменные модального окна
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Функция переключения модального окна
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// Добавить событие клика для всех элементов отзывов
testimonialsItem.forEach(item => {
  item.addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
});

// Закрытие модального окна
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);







// Переменные для пользовательского выбора
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Переключение выбора
select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// Событие выбора элемента
selectItems.forEach(item => {
  item.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

// Функция фильтрации
const filterItems = document.querySelectorAll("[data-filter-item]");
const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {
    if (selectedValue === "все" || selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Переключение активного элемента фильтра
let lastClickedBtn = filterBtn[0];
filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});










// Переменные формы обратной связи
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Проверка валидации формы
formInputs.forEach(input => {
  input.addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

// Отправка данных формы в Telegram
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Получение данных из формы
  const name = document.querySelector('input[name="fullname"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const message = document.querySelector('textarea[name="message"]').value;

  // Telegram API токен и Chat ID
  const botToken = '5886546930:AAFbwo3GQkztX6WhgqJjwbtl8GRy1GvTFP8';
  const chatId = '1346484314';

  // Формирование сообщения
  const text = `Новое сообщение с формы обратной связи портфолио:\n\nИмя: ${name}\nEmail: ${email}\nСообщение: ${message}`;

  // URL для отправки сообщения
  const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;

  // Отправка запроса
  fetch(url)
    .then(response => {
      if (response.ok) {
        alert('Сообщение успешно отправлено!');

        // Очистка полей формы
        document.querySelector('input[name="fullname"]').value = '';
        document.querySelector('input[name="email"]').value = '';
        document.querySelector('textarea[name="message"]').value = '';
      } else {
        alert('Ошибка при отправке сообщения.');
      }
    })
    .catch(error => {
      console.error('Ошибка:', error);
      alert('Ошибка при отправке сообщения.');
    });
});



// Переменные навигации по страницам
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Событие для навигации по страницам
navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    const page = this.getAttribute("data-nav-link");
    pages.forEach((pageElement, index) => {
      if (page === pageElement.dataset.page) {
        pageElement.classList.add("active");
        navigationLinks[index].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pageElement.classList.remove("active");
        navigationLinks[index].classList.remove("active");
      }
    });
  });
});


//Подгрузка видео после нажатия на обложку 

function loadYouTubeVideo(parentElement) {
  const videoSrc = parentElement.querySelector('[data-src]').getAttribute('data-src'); // Берём URL видео из data-src
  const iframe = document.createElement('iframe'); // Создаём iframe
  iframe.src = videoSrc + "?autoplay=1"; // Добавляем autoplay, чтобы видео запускалось сразу
  iframe.setAttribute('frameborder', '0'); // Убираем рамку
  iframe.setAttribute('allowfullscreen', 'true'); // Разрешаем полноэкранный режим
  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'); // Разрешаем дополнительные функции
  iframe.style.position = 'absolute';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  parentElement.innerHTML = ''; // Очищаем содержимое div (удаляем картинку и кнопку)
  parentElement.appendChild(iframe); // Добавляем iframe
}

