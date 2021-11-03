"use strict";

function testWebP(callback) {
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };

  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});
document.addEventListener('DOMContentLoaded', function () {
  var body = document.querySelector('body');
  var wrapper = document.querySelector('.wrapper');
  var header = document.querySelector('.header');
  var burger = document.querySelector('.header__burger');
  var menu = document.querySelector('.menu');
  var menuFirstLink = document.querySelector('.menu__link');
  var clientsInner = document.querySelector('.clients__inner'); //Событие клика по документу

  document.addEventListener('click', documentActions); //Событие прокрутки документа

  window.addEventListener('scroll', windowScroll); //Функция клика

  function documentActions(e) {
    var targetElement = e.target; //Клик по бургеру для вызова меню

    if (targetElement.classList.contains('header__burger')) {
      wrapper.classList.add('lock');
      body.classList.add('lock');
      burger.classList.add('hide');
      menu.classList.add('open');
    } //Клик по close закрыть для скрытия меню


    if (targetElement.classList.contains('menu__btn')) {
      wrapper.classList.remove('lock');
      body.classList.remove('lock');
      burger.classList.remove('hide');
      menu.classList.remove('open');
    } //Клик вне меню для скрытия меню


    if (!targetElement.closest('.menu') && !targetElement.classList.contains('header__burger')) {
      wrapper.classList.remove('lock');
      body.classList.remove('lock');
      burger.classList.remove('hide');
      menu.classList.remove('open');
    } //Клик по элементу меню с подменю для показа подменю 


    if (targetElement.classList.contains('menu__link', 'menu__text')) {
      var sublist = targetElement.nextElementSibling;

      if (sublist) {
        targetElement.classList.toggle('active');
        menuFirstLink.classList.toggle('disable');
        sublist.classList.toggle('open');

        if (sublist.classList.contains('open')) {
          sublist.style.height = sublist.scrollHeight + 'px';
        } else {
          sublist.style.height = 0;
        }
      }
    } //Клик по элементам секции getting для показа описания в мобильной версии


    if (targetElement.classList.contains('getting__item', 'getting__btn')) {
      targetElement.classList.add('active');
    } //Клик вне элементов секции getting и скрытие описания


    if (!targetElement.classList.contains('getting__descr') && !targetElement.classList.contains('getting__item')) {
      var gettingItems = document.querySelectorAll('.getting__item');

      for (var i = 0; i < gettingItems.length; i++) {
        var gettingItem = gettingItems[i];

        if (gettingItem.classList.contains('active')) {
          gettingItem.classList.remove('active');
        }
      }
    } //Клик по кнопке остальное для показа всего текста и скрытия самой кнопки в секции founder


    if (targetElement.classList.contains('founder__btn-rest') && !targetElement.classList.contains('hide')) {
      targetElement.closest('.founder__quote').querySelector('.founder__text').classList.add('active');
      targetElement.classList.add('hide');
    } //Клик по кнопке остальное для показа всего текста и скрытия самой кнопки в секции reviews


    if (targetElement.classList.contains('reviews__btn-rest') && !targetElement.classList.contains('hide')) {
      targetElement.closest('.reviews__info').querySelector('.reviews__text').classList.add('active');
      targetElement.classList.add('hide');
      reviewsSwiper.update();
    } //Клик по кнопки фильтрации контента в секции progress-work


    if (targetElement.classList.contains('progress-work__btn')) {
      if (!targetElement.classList.contains('active')) {
        var progressButtons = document.querySelectorAll('.progress-work__btn');

        for (var _i = 0; _i < progressButtons.length; _i++) {
          var progressBtn = progressButtons[_i];
          progressBtn.classList.remove('active');
        }

        targetElement.classList.add('active');
        var progressContents = document.querySelectorAll('.prosressing-work');

        for (var _i2 = 0; _i2 < progressContents.length; _i2++) {
          var progressContent = progressContents[_i2];
          progressContent.classList.remove('active');
        }

        document.querySelector('.' + targetElement.dataset.filter).classList.add('active');
      }
    }
  } // Функция для фиксации хедера


  var currentScroll;

  function headerFixid() {
    currentScroll = window.pageYOffset;

    var headerFix = function headerFix() {
      return header.classList.contains('fixed');
    };

    if (currentScroll > 0 && !headerFix()) {
      header.classList.add('fixed');
    }

    if (currentScroll == 0 && headerFix()) {
      header.classList.remove('fixed');
    }
  }

  headerFixid(); //Функция для скрытия описания элементов в секции getting при скролле

  function gettingDisabled() {
    var gettingItems = document.querySelectorAll('.getting__item');

    for (var i = 0; i < gettingItems.length; i++) {
      var gettingItem = gettingItems[i];

      if (gettingItem.classList.contains('active')) {
        gettingItem.classList.remove('active');
      }
    }
  } //Функция прокручивающая список с брендами в секции с партнерами вправо


  function scrollBy() {
    clientsInner.scrollLeft = 500;
  }

  scrollBy(); //Функция прокрутки документа

  function windowScroll() {
    headerFixid();
    gettingDisabled();
    progressScrollBar();
  } //Функция заполнения полосы прогресс-бара при прокрутке


  var progressScrollBar = function progressScrollBar() {
    var heightPage = document.documentElement.scrollHeight;
    var windowScrollPosition = window.pageYOffset;
    var windowHeight = window.innerHeight;
    var progressLine = document.querySelector('.progress-scroll-bar span');
    progressLine.style.height = 100 / (heightPage - windowHeight) * windowScrollPosition + '%';
  }; //Функция перемещения изображения во флекс-контейнер в мобильной версии в секции top для адаптива


  var innerTop = document.querySelector('.top__image');

  if (innerTop) {
    var innerTopMoved = function innerTopMoved() {
      if (window.innerWidth <= 991.98 && !innerTopClass()) {
        innerTop.classList.add('moved');
        innerTopParents.append(innerTop);
      }

      if (window.innerWidth > 991.98 && innerTopClass()) {
        innerTop.classList.remove('moved');
        innerTopPreParents.append(innerTop);
      }
    };

    var innerTopPreParents = innerTop.closest('.top__body');
    var innerTopParents = innerTopPreParents.querySelector('.top__info');

    var innerTopClass = function innerTopClass() {
      return innerTop.classList.contains('moved');
    };

    innerTopMoved();
    window.addEventListener('resize', function () {
      innerTopMoved();
    });
  }

  ; //Функция перемещения изображения во флекс-контейнер в мобильной версии в секции founder для адаптива

  var innerFounder = document.querySelector('.founder__image');

  if (innerFounder) {
    var innerFounderMoved = function innerFounderMoved() {
      if (window.innerWidth <= 767.98 && !innerFounderClass()) {
        innerFounder.classList.add('moved');
        innerFounderParents.prepend(innerFounder);
      }

      if (window.innerWidth > 767.98 && innerFounderClass()) {
        innerFounder.classList.remove('moved');
        innerFounderPreParents.prepend(innerFounder);
      }
    };

    var innerFounderPreParents = innerFounder.closest('.founder__container');
    var innerFounderParents = innerFounderPreParents.querySelector('.founder__info');

    var innerFounderClass = function innerFounderClass() {
      return innerFounder.classList.contains('moved');
    };

    innerFounderMoved();
    window.addEventListener('resize', function () {
      innerFounderMoved();
    });
  }

  ; //Функция создающая эффект телевизионного шума у фона меню

  var canvas = document.querySelector('.noise'),
      ctx = canvas.getContext('2d');

  function main() {
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    render();
  }

  function getRandom() {
    return Math.random() * 255;
  }

  function render() {
    var imageData = ctx.createImageData(ctx.canvas.width, ctx.canvas.height);

    for (var i = 0; i < imageData.data.length; i += 4) {
      var color = getRandom();
      imageData.data[i] = color;
      imageData.data[i + 1] = color;
      imageData.data[i + 2] = color;
      imageData.data[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(render);
  }

  function updateCanvasSize() {
    ctx.canvas.height = canvas.offsetHeight;
    ctx.canvas.width = canvas.offsetWidth;
  }

  main(); //Функция задающая маску для инпутов

  var inputApplicants = document.querySelector('#applicantsPhone');
  var inputPrices = document.querySelector('#pricesPhone');

  if (inputApplicants) {
    var maskOptions = {
      mask: '+{7}(000) 000 00 00'
    };
    IMask(inputApplicants, maskOptions);
  }

  if (inputApplicants) {
    var _maskOptions = {
      mask: '+{7}(000) 000 00 00'
    };
    IMask(inputPrices, _maskOptions);
  } //Функция добавляющая класс всем инпутам в которые что то вписали для стилизации валидации


  var inputs = document.querySelectorAll('input');

  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    input.addEventListener("change", function () {
      if (this.value.length) {
        this.classList.add('valid');
      } else {
        this.classList.remove('valid');
      }
    });
  } //Функция валидации формы секции aplicants


  var validateApplicantsForms = function validateApplicantsForms(selector, rules, messages) {
    new JustValidate('.applicants__form', {
      rules: rules,
      messages: messages,
      submitHundler: function submitHundler(form) {}
    });
  };

  validateApplicantsForms('.applicants__form', {
    applicantsName: {
      required: true,
      minLength: 3
    },
    applicantsPhone: {
      required: true,
      minLength: 17
    }
  }, {
    applicantsName: {
      required: '*это поле необходимо заполнить',
      minLength: 'Минимум 3 символа'
    },
    applicantsPhone: {
      required: '*это поле необходимо заполнить',
      minLength: '*заполните телефон в формате +7(xxx) xxx xx xx'
    }
  }); //Функция валидации формы секции prices

  var validatePricesForms = function validatePricesForms(selector, rules, messages) {
    new JustValidate('.prices__form', {
      rules: rules,
      messages: messages,
      submitHundler: function submitHundler(form) {}
    });
  };

  validatePricesForms('.prices__form', {
    pricesName: {
      required: true,
      minLength: 3
    },
    pricesPhone: {
      required: true,
      minLength: 17
    }
  }, {
    pricesName: {
      required: '*это поле необходимо заполнить',
      minLength: 'Минимум 3 символа'
    },
    pricesPhone: {
      required: '*это поле необходимо заполнить',
      minLength: '*заполните телефон в формате +7(xxx) xxx xx xx'
    }
  }); //Подключение слайдера в секции reviews

  var reviewsSwiper = new Swiper('.reviews__body', {
    watchOverflow: true,
    slidesPerView: 1,
    grabCursor: true,
    autoHeight: true,
    navigation: {
      nextEl: '.reviews__next',
      prevEl: '.reviews__prev'
    },
    pagination: {
      el: '.reviews__pagination',
      type: 'bullets'
    },
    breakpoints: {
      '991.98': {
        pagination: {
          autoHeight: false,
          el: '.reviews__pagination',
          type: 'fraction'
        }
      }
    }
  }); //Функция для следования стрелки за курсором мыши в секции our-help

  document.onmousemove = function (event) {
    var y = event.y;
    var x = event.x;
    var helpList = document.querySelector('.our-help__list');
    var distanceTopToList = helpList.getBoundingClientRect().top;
    var distanceLeftToList = helpList.getBoundingClientRect().left;
    var arrowList = document.querySelector('.our-help__arrow svg');
    var distanceCursorTop = y - distanceTopToList;
    var distanceCursorLeft = x - distanceLeftToList;
    var heightList = helpList.offsetHeight;
    var widthList = helpList.offsetWidth;

    if (distanceCursorTop >= 0 && distanceCursorTop <= heightList - 10 && distanceCursorLeft >= 0 && distanceCursorLeft <= widthList) {
      arrowList.style.transform = 'translateY(' + distanceCursorTop + 'px)';
      arrowList.style.opacity = 1;
    } else {
      arrowList.style.opacity = 0;
    }
  };
});