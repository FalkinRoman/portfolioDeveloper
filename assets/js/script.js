'use strict';

// Блокируем скролл до загрузки
document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('preloader-active');
  
  // Инициализация анимации прогресс-бара
  const progressCircle = document.querySelector('.logo-circle-progress');
  if (progressCircle) {
    const circumference = 283; // 2 * π * 45 (радиус круга)
    
    // Устанавливаем начальное состояние - пустой круг
    progressCircle.style.strokeDashoffset = circumference;
    
    let progress = 0;
    
    // Функция обновления прогресса
    const updateProgress = () => {
      const currentProgress = Math.min(progress, 100);
      // При 0% offset = circumference (пустой), при 100% offset = 0 (полный)
      const offset = circumference - (currentProgress / 100) * circumference;
      progressCircle.style.strokeDashoffset = offset;
    };
    
    // Симуляция прогресса загрузки
    const startTime = performance.now();
    const minLoadTime = 2500;
    
    const animateProgress = () => {
      const elapsed = performance.now() - startTime;
      progress = Math.min((elapsed / minLoadTime) * 100, 100);
      updateProgress();
      
      if (progress < 100) {
        requestAnimationFrame(animateProgress);
      } else {
        // Достигли 100% - полный круг
        progressCircle.style.strokeDashoffset = 0;
      }
    };
    
    // Начинаем анимацию с небольшой задержкой
    setTimeout(() => {
      requestAnimationFrame(animateProgress);
    }, 50);
  }
});

// Preloader и инициализация AOS
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  const progressCircle = document.querySelector('.logo-circle-progress');
  
  // Убеждаемся, что прогресс достиг 100%
  if (progressCircle) {
    const circumference = 283;
    progressCircle.style.strokeDashoffset = 0;
  }
  
  // Минимальное время показа прелоадера
  const minLoadTime = 2500;
  const startTime = performance.now();
  
  function hidePreloaderAndInitAOS() {
    const elapsed = performance.now() - startTime;
    const remainingTime = Math.max(0, minLoadTime - elapsed);
    
    setTimeout(() => {
      // Скрываем прелоадер
      if (preloader) {
        preloader.classList.add('hidden');
      }
      
      // Разблокируем скролл
      document.body.classList.remove('preloader-active');
      
      // Инициализируем AOS после скрытия прелоадера
      setTimeout(() => {
        if (typeof AOS !== 'undefined') {
          // Инициализируем AOS
          AOS.init({
            duration: 700,
            easing: 'ease-out',
            once: true,
            offset: 50,
            delay: 0,
            disable: false,
          });
          
          // Обновляем AOS и принудительно показываем элементы в viewport
          setTimeout(() => {
            // Показываем все элементы, которые уже в viewport
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            document.querySelectorAll('[data-aos]').forEach(el => {
              const rect = el.getBoundingClientRect();
              
              // Если элемент виден в viewport (с запасом в 200px для надежности)
              if (rect.top < windowHeight + 200 && rect.bottom > -200) {
                // Принудительно запускаем анимацию
                el.classList.add('aos-animate');
                // Убираем inline стили, если они есть
                el.style.opacity = '';
                el.style.visibility = '';
              }
            });
            
            // Обновляем AOS после принудительного показа элементов
            AOS.refresh();
            
            // Дополнительная проверка через небольшую задержку
            setTimeout(() => {
              AOS.refresh();
            }, 100);
          }, 200);
        } else {
          console.warn('AOS library not loaded - showing all elements');
          // Fallback: показываем все элементы, если AOS не загрузилась
          document.querySelectorAll('[data-aos]').forEach(el => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
          });
        }
      }, 100);
    }, remainingTime);
  }
  
  hidePreloaderAndInitAOS();
});

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

// Инициализация Swiper для отзывов
let testimonialsSwiperInstance = null;

function initTestimonialsSwiper() {
  if (typeof Swiper !== 'undefined') {
    testimonialsSwiperInstance = new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 15,
      watchOverflow: true,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
      },
    });
    
    // Кастомные кнопки навигации
    const prevBtn = document.querySelector('.testimonials-custom-prev');
    const nextBtn = document.querySelector('.testimonials-custom-next');
    
    if (prevBtn && testimonialsSwiperInstance) {
      prevBtn.addEventListener('click', () => {
        testimonialsSwiperInstance.slidePrev();
      });
    }
    
    if (nextBtn && testimonialsSwiperInstance) {
      nextBtn.addEventListener('click', () => {
        testimonialsSwiperInstance.slideNext();
      });
    }
    
    // Обновление состояния кнопок при изменении слайда
    if (testimonialsSwiperInstance) {
      testimonialsSwiperInstance.on('slideChange', () => {
        updateNavButtons();
      });
      updateNavButtons();
    }
    
    // Убираем overflow: hidden у Swiper контейнеров
    const swiperEl = document.querySelector('.testimonials-swiper');
    if (swiperEl) {
      swiperEl.style.overflow = 'visible';
      const wrapper = swiperEl.querySelector('.swiper-wrapper');
      if (wrapper) {
        wrapper.style.overflow = 'visible';
      }
    }
  } else {
    // Если Swiper еще не загружен, попробуем через небольшую задержку
    setTimeout(initTestimonialsSwiper, 100);
  }
}

// Обновление состояния кнопок
function updateNavButtons() {
  if (!testimonialsSwiperInstance) return;
  
  const prevBtn = document.querySelector('.testimonials-custom-prev');
  const nextBtn = document.querySelector('.testimonials-custom-next');
  
  if (prevBtn) {
    if (testimonialsSwiperInstance.isBeginning) {
      prevBtn.classList.add('disabled');
      prevBtn.disabled = true;
    } else {
      prevBtn.classList.remove('disabled');
      prevBtn.disabled = false;
    }
  }
  
  if (nextBtn) {
    if (testimonialsSwiperInstance.isEnd) {
      nextBtn.classList.add('disabled');
      nextBtn.disabled = true;
    } else {
      nextBtn.classList.remove('disabled');
      nextBtn.disabled = false;
    }
  }
}

// Инициализируем после загрузки DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTestimonialsSwiper);
} else {
  initTestimonialsSwiper();
}







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

function loadVideo(parentElement) {
  const videoElement = parentElement.querySelector('[data-src]');
  const videoSrc = videoElement.getAttribute('data-src');
  
  const iframe = document.createElement('iframe');
  
  // Определяем тип видео по URL
  if (videoSrc.includes('drive.google.com')) {
    // Google Drive
    // Формат: https://drive.google.com/file/d/FILE_ID/preview
    iframe.src = videoSrc + (videoSrc.includes('?') ? '&' : '?') + 'autoplay=1';
  } else if (videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be')) {
    // YouTube
    iframe.src = videoSrc + (videoSrc.includes('?') ? '&' : '?') + 'autoplay=1';
  } else {
    // Другие источники (VK, RuTube и т.д.)
    iframe.src = videoSrc + (videoSrc.includes('?') ? '&' : '?') + 'autoplay=1';
  }
  
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allowfullscreen', 'true');
  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  iframe.style.position = 'absolute';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.top = '0';
  iframe.style.left = '0';
  
  parentElement.innerHTML = '';
  parentElement.appendChild(iframe);
}

// Анимация прогресс-баров навыков
const animateSkillBar = (bar) => {
  const skillValue = bar.getAttribute('data-skill');
  // Убеждаемся, что начальное состояние установлено
  bar.style.width = '0%';
  
  // Используем requestAnimationFrame для плавной анимации
  requestAnimationFrame(() => {
    setTimeout(() => {
      bar.style.width = skillValue + '%';
    }, 50);
  });
};

// Intersection Observer для отслеживания появления элементов
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Анимация прогресс-баров навыков
      if (entry.target.classList.contains('skill')) {
        const progressBars = entry.target.querySelectorAll('.skill-progress-fill[data-skill]');
        progressBars.forEach((bar, index) => {
          setTimeout(() => {
            animateSkillBar(bar);
          }, index * 200);
        });
        observer.unobserve(entry.target);
      }
    }
  });
}, observerOptions);

// Наблюдаем за секцией навыков
const skillSection = document.querySelector('.skill');
if (skillSection) {
  observer.observe(skillSection);
}

