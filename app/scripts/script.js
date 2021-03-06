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


document.addEventListener('DOMContentLoaded', () => {

	const body = document.querySelector('body');
	const wrapper = document.querySelector('.wrapper');
	const header = document.querySelector('.header');
	const burger = document.querySelector('.header__burger');
	const menu = document.querySelector('.menu');
	const menuFirstLink = document.querySelector('.menu__link');
	const clientsInner = document.querySelector('.clients__inner');

	//Событие клика по документу
	document.addEventListener('click', documentActions);

	//Событие прокрутки документа
	window.addEventListener('scroll', windowScroll);

	//Функция клика
	function documentActions(e) {

		const targetElement = e.target;

		//Клик по бургеру для вызова меню
		if (targetElement.classList.contains('header__burger')) {
			wrapper.classList.add('lock');
			body.classList.add('lock');
			burger.classList.add('hide');
			menu.classList.add('open');
		}

		//Клик по close закрыть для скрытия меню
		if (targetElement.classList.contains('menu__btn')) {
			wrapper.classList.remove('lock');
			body.classList.remove('lock');
			burger.classList.remove('hide');
			menu.classList.remove('open');
		}

		//Клик вне меню для скрытия меню
		if (!targetElement.closest('.menu') && !targetElement.classList.contains('header__burger')) {
			wrapper.classList.remove('lock');
			body.classList.remove('lock');
			burger.classList.remove('hide');
			menu.classList.remove('open');
		}

		//Клик по элементу меню с подменю для показа подменю 
		if (targetElement.classList.contains('menu__link', 'menu__text')) {

			const sublist = targetElement.nextElementSibling;

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
		}

		//Клик по элементам секции getting для показа описания в мобильной версии
		if (targetElement.classList.contains('getting__item', 'getting__btn')) {
			targetElement.classList.add('active');
		}

		//Клик вне элементов секции getting и скрытие описания
		if (!targetElement.classList.contains('getting__descr') && !targetElement.classList.contains('getting__item')) {

			const gettingItems = document.querySelectorAll('.getting__item');

			for (let i = 0; i < gettingItems.length; i++) {
				const gettingItem = gettingItems[i];
				if (gettingItem.classList.contains('active')) {
					gettingItem.classList.remove('active');
				}
			}
		}

		//Клик по кнопке остальное для показа всего текста и скрытия самой кнопки в секции founder
		if (targetElement.classList.contains('founder__btn-rest') && !targetElement.classList.contains('hide')) {
			targetElement.closest('.founder__quote').querySelector('.founder__text').classList.add('active');
			targetElement.classList.add('hide');
		}

		//Клик по кнопке остальное для показа всего текста и скрытия самой кнопки в секции reviews
		if (targetElement.classList.contains('reviews__btn-rest') && !targetElement.classList.contains('hide')) {
			targetElement.closest('.reviews__info').querySelector('.reviews__text').classList.add('active');
			targetElement.classList.add('hide');
			reviewsSwiper.update();
		}

		//Клик по кнопке остальное для показа всего текста и скрытия самой кнопки в секции work-context
		if (targetElement.classList.contains('work-context__btn-rest') && !targetElement.classList.contains('hide')) {
			targetElement.closest('.work-context__item').querySelector('.work-context__descr').classList.add('active');
			targetElement.classList.add('hide');
			contextContentSwiper.update();
		}

		//Клик по кнопки фильтрации контента в секции progress-work
		if (targetElement.classList.contains('progress-work__btn')) {
			if (!targetElement.classList.contains('active')) {
				const progressButtons = document.querySelectorAll('.progress-work__btn');

				for (let i = 0; i < progressButtons.length; i++) {
					const progressBtn = progressButtons[i];
					progressBtn.classList.remove('active')
				}

				targetElement.classList.add('active');

				const progressContents = document.querySelectorAll('.prosressing-work');

				for (let i = 0; i < progressContents.length; i++) {
					const progressContent = progressContents[i];
					progressContent.classList.remove('active');
				}
				document.querySelector('.' + targetElement.dataset.filter).classList.add('active');

			}
		}

		//Клик для вызова лайтбоксов в секции examples
		if (targetElement.classList.contains('examples__link')) {
			body.classList.add('lock');
			targetElement.closest('.examples__item').querySelector('.examples__lightbox').classList.add('open');
		}
		if (targetElement.classList.contains('examples__badge')) {
			body.classList.add('lock');
			targetElement.closest('.examples__item').querySelector('.examples__lightbox').classList.add('open');
		}
		if (targetElement.classList.contains('examples__lightbox')) {
			body.classList.remove('lock');
			targetElement.classList.remove('open');
		}
		if (targetElement.classList.contains('examples__image')) {
			body.classList.remove('lock');
			targetElement.closest('.examples__lightbox').classList.remove('open');
		}

		//Клик для вызова лайтбоксов в секции examples-style
		if (targetElement.classList.contains('examples-style__image')) {
			body.classList.add('lock');
			targetElement.closest('.examples-style__item').querySelector('.examples-style__lightbox').classList.add('open');
		}
		if (targetElement.classList.contains('examples-style__lightbox')) {
			body.classList.remove('lock');
			targetElement.classList.remove('open');
		}
		if (targetElement.classList.contains('examples-style__lightbox-img')) {
			body.classList.remove('lock');
			targetElement.closest('.examples-style__lightbox').classList.remove('open');
		}

		//Клик по кнопке показать еще в секции development
		if (targetElement.classList.contains('development__button')) {
			targetElement.classList.add('hidden');
			targetElement.closest('.development__body').classList.add('visible');
			targetElement.closest('.development__body').querySelector('.development__wrapper').classList.add('visible');
		}

		//Клик по кнопке Посмотреть детальную карту хода работ
		if (targetElement.classList.contains('development__btn')) {
			targetElement.closest('.development-sections').querySelector('.progress-work').classList.add('visible');
			targetElement.closest('.development-sections').querySelector('.development').classList.add('hidden');
		}

		//Скрываем подробную карту работ в секции development
		if (!targetElement.classList.contains('progress-work__btn') && !targetElement.classList.contains('progress-work__btn-popup') && !targetElement.classList.contains('development__btn')) {
			const progressWork = document.querySelector('.progress-work');
			const development = document.querySelector('.development');
			if (progressWork && progressWork.classList.contains('visible')) {
				progressWork.classList.remove('visible');
				development.classList.remove('hidden');
			}
		}

		//Клик по кнопке в секции work-context
		if (targetElement.classList.contains('work-context__btn')) {
			const workBtn = document.querySelectorAll('.work-context__btn');
			for (let i = 0; i < workBtn.length; i++) {
				const workBtnItem = workBtn[i];

				if (workBtnItem.classList.contains('active')) {
					workBtnItem.classList.remove('active');
					targetElement.classList.add('active');
				}
			}

			const btnDataFilter = targetElement.dataset.filter;

			contextContentSwiper.slideTo(btnDataFilter, 300)
		}
	}

	// Функция для фиксации хедера
	let currentScroll;
	function headerFixid() {
		currentScroll = window.pageYOffset;
		const headerFix = () => header.classList.contains('fixed');

		if (currentScroll > 0 && !headerFix()) {
			header.classList.add('fixed');
		}

		if (currentScroll == 0 && headerFix()) {
			header.classList.remove('fixed');
		}
	}
	headerFixid();

	//Функция для скрытия описания элементов в секции getting при скролле
	function gettingDisabled() {
		const gettingItems = document.querySelectorAll('.getting__item');

		for (let i = 0; i < gettingItems.length; i++) {
			const gettingItem = gettingItems[i];
			if (gettingItem.classList.contains('active')) {
				gettingItem.classList.remove('active');
			}
		}
	}

	//Функция прокручивающая список с брендами в секции с партнерами вправо
	function scrollBy() {
		clientsInner.scrollLeft = 500;
	}
	scrollBy();

	//Функция прокрутки документа
	function windowScroll() {
		headerFixid();
		gettingDisabled();
		progressScrollBar();
	}

	//Функция заполнения полосы прогресс-бара при прокрутке
	const progressScrollBar = function () {
		let heightPage = document.documentElement.scrollHeight;
		let windowScrollPosition = window.pageYOffset;
		let windowHeight = window.innerHeight;
		const progressLine = document.querySelector('.progress-scroll-bar span');

		progressLine.style.height = (100 / (heightPage - windowHeight) * windowScrollPosition) + '%';
	}

	//Функция перемещения изображения во флекс-контейнер в мобильной версии в секции top для адаптива
	const innerTop = document.querySelector('.top__image');
	if (innerTop) {
		const innerTopPreParents = innerTop.closest('.top__body');
		const innerTopParents = innerTopPreParents.querySelector('.top__info');
		const innerTopClass = () => innerTop.classList.contains('moved');
		function innerTopMoved() {
			if (window.innerWidth <= 991.98 && !innerTopClass()) {
				innerTop.classList.add('moved');
				innerTopParents.append(innerTop);
			}
			if (window.innerWidth > 991.98 && innerTopClass()) {
				innerTop.classList.remove('moved');
				innerTopPreParents.append(innerTop);
			}
		}
		innerTopMoved();
		window.addEventListener('resize', function () {
			innerTopMoved();
		});
	};

	//Функция перемещения изображения во флекс-контейнер в мобильной версии в секции founder для адаптива
	const innerFounder = document.querySelector('.founder__image');
	if (innerFounder) {
		const innerFounderPreParents = innerFounder.closest('.founder__container');
		const innerFounderParents = innerFounderPreParents.querySelector('.founder__info');
		const innerFounderClass = () => innerFounder.classList.contains('moved');
		function innerFounderMoved() {
			if (window.innerWidth <= 767.98 && !innerFounderClass()) {
				innerFounder.classList.add('moved');
				innerFounderParents.prepend(innerFounder);
			}
			if (window.innerWidth > 767.98 && innerFounderClass()) {
				innerFounder.classList.remove('moved');
				innerFounderPreParents.prepend(innerFounder);
			}
		}
		innerFounderMoved();
		window.addEventListener('resize', function () {
			innerFounderMoved();
		});
	};

	//Функция создающая эффект телевизионного шума у фона меню
	let canvas = document.querySelector('.noise'),
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
		let imageData = ctx.createImageData(ctx.canvas.width, ctx.canvas.height);
		for (let i = 0; i < imageData.data.length; i += 4) {
			const color = getRandom();
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
	main();

	//Функция задающая маску для инпутов
	const inputApplicants = document.querySelector('#applicantsPhone');
	const inputPrices = document.querySelector('#pricesPhone');
	const inputDeveloped = document.querySelector('#developedPhone');
	const inputWhyContext = document.querySelector('#whyContextPhone');
	const inputSmmPhone = document.querySelector('#smmPhone');
	if (inputApplicants) {
		const maskOptions = {
			mask: '+{7}(000) 000 00 00'
		}
		IMask(inputApplicants, maskOptions);
	}
	if (inputPrices) {
		const maskOptions = {
			mask: '+{7}(000) 000 00 00'
		}
		IMask(inputPrices, maskOptions);
	}
	if (inputDeveloped) {
		const maskOptions = {
			mask: '+{7}(000) 000 00 00'
		}
		IMask(inputDeveloped, maskOptions);
	}
	if (inputWhyContext) {
		const maskOptions = {
			mask: '+{7}(000) 000 00 00'
		}
		IMask(inputWhyContext, maskOptions);
	}
	if (inputSmmPhone) {
		const maskOptions = {
			mask: '+{7}(000) 000 00 00'
		}
		IMask(inputSmmPhone, maskOptions);
	}

	//Функция добавляющая класс всем инпутам в которые что то вписали для стилизации валидации
	const inputs = document.querySelectorAll('input');
	for (let i = 0; i < inputs.length; i++) {
		const input = inputs[i];
		input.addEventListener("change", function () {
			if (this.value.length) {
				this.classList.add('valid');
			} else {
				this.classList.remove('valid');
			}
		});
	}

	//Функция валидации формы секции aplicants
	const validateApplicantsForms = function (selector, rules, messages) {
		new JustValidate('.applicants__form', {
			rules: rules,
			messages: messages,
			submitHundler: function (form) {

			}
		})
	}
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
	})

	//Функция валидации формы секции prices
	const prices = document.querySelector('.prices__form');

	if (prices) {
		const validatePricesForms = function (selector, rules, messages) {
			new JustValidate('.prices__form', {
				rules: rules,
				messages: messages,
				submitHundler: function (form) {

				}
			})
		}
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
		})
	}

	//Функция валидации формы секции developed
	const developeds = document.querySelector('.development__form');

	if (developeds) {
		const validateDevelopedForms = function (selector, rules, messages) {
			new JustValidate('.development__form', {
				rules: rules,
				messages: messages,
				submitHundler: function (form) {

				}
			})
		}
		validateDevelopedForms('.development__form', {
			developedName: {
				required: true,
				minLength: 3
			},
			developedPhone: {
				required: true,
				minLength: 17
			}
		}, {
			developedName: {
				required: '*это поле необходимо заполнить',
				minLength: 'Минимум 3 символа'
			},
			developedPhone: {
				required: '*это поле необходимо заполнить',
				minLength: '*заполните телефон в формате +7(xxx) xxx xx xx'
			}
		})
	}

	//Функция валидации формы секции why-context
	const whyContext = document.querySelector('.why-context__form');

	if (whyContext) {
		const validateDevelopedForms = function (selector, rules, messages) {
			new JustValidate('.why-context__form', {
				rules: rules,
				messages: messages,
				submitHundler: function (form) {

				}
			})
		}
		validateDevelopedForms('.why-context__form', {
			whyContextName: {
				required: true,
				minLength: 3
			},
			whyContextPhone: {
				required: true,
				minLength: 17
			}
		}, {
			whyContextName: {
				required: '*это поле необходимо заполнить',
				minLength: 'Минимум 3 символа'
			},
			whyContextPhone: {
				required: '*это поле необходимо заполнить',
				minLength: '*заполните телефон в формате +7(xxx) xxx xx xx'
			}
		})
	}

	//Функция валидации формы секции composition smm
	const smmForm = document.querySelector('.form-box__form');

	if (smmForm) {
		const validateDevelopedForms = function (selector, rules, messages) {
			new JustValidate('.form-box__form', {
				rules: rules,
				messages: messages,
				submitHundler: function (form) {

				}
			})
		}
		validateDevelopedForms('.form-box__form', {
			smmName: {
				required: true,
				minLength: 3
			},
			smmPhone: {
				required: true,
				minLength: 17
			}
		}, {
			smmName: {
				required: '*это поле необходимо заполнить',
				minLength: 'Минимум 3 символа'
			},
			smmPhone: {
				required: '*это поле необходимо заполнить',
				minLength: '*заполните телефон в формате +7(xxx) xxx xx xx'
			}
		})
	}

	//Подключение слайдера в секции reviews
	const reviewsSwiper = new Swiper('.reviews__body', {
		watchOverflow: true,
		slidesPerView: 1,
		grabCursor: true,
		autoHeight: true,

		navigation: {
			nextEl: '.reviews__next',
			prevEl: '.reviews__prev',
		},

		pagination: {
			el: '.reviews__pagination',
			type: 'bullets',
		},

		breakpoints: {
			'991.98': {
				pagination: {
					autoHeight: false,
					el: '.reviews__pagination',
					type: 'fraction',
				},
			},
		}
	});

	//Функция для следования стрелки за курсором мыши в секции our-help
	const helpList = document.querySelector('.our-help__list');
	if (helpList) {
		document.onmousemove = function (event) {
			let y = event.y;
			let x = event.x;
			const distanceTopToList = helpList.getBoundingClientRect().top;
			const distanceLeftToList = helpList.getBoundingClientRect().left;
			const arrowList = document.querySelector('.our-help__arrow svg');
			let distanceCursorTop = y - distanceTopToList;
			let distanceCursorLeft = x - distanceLeftToList;
			let heightList = helpList.offsetHeight;
			let widthList = helpList.offsetWidth;

			if (distanceCursorTop >= 0 && distanceCursorTop <= heightList - 10 && distanceCursorLeft >= 0 && distanceCursorLeft <= widthList) {
				arrowList.style.transform = 'translateY(' + distanceCursorTop + 'px)';
				arrowList.style.opacity = 1;
			} else {
				arrowList.style.opacity = 0;
			}
		}
	}
});

//Подключение слайдера в секции work-context
const contextContentSwiper = new Swiper('.work-context__slider', {
	watchOverflow: true,
	slidesPerView: 1,
	grabCursor: true,
	autoHeight: true,

	pagination: {
		el: '.work-context__pagination',
		type: 'bullets',
	},
});

//Добавляем зависимость активной кнопки от активного слайда
contextContentSwiper.on('slideChange', function () {
	let slideIndex = this.realIndex;

	const btnCurrent = document.querySelectorAll('.work-context__btn');
	for (let i = 0; i < btnCurrent.length; i++) {
		const btnCurrentItem = btnCurrent[i];

		btnCurrentItem.classList.remove('active');

		if (btnCurrentItem.dataset.filter == slideIndex) {
			btnCurrentItem.classList.add('active');

			const coordBtn = btnCurrentItem.getBoundingClientRect().left;

			let scroll = document.querySelector('.work-context__wrapper');

			scroll.scrollBy({
				left: coordBtn - 50,
				behavior: "smooth",
			})

		}

	}
});

//Скролл кнопок в секции work-context
const workContextWrapper = document.querySelector('.work-context__wrapper');

if (workContextWrapper) {
	(function () {
		let speed = 1; // Скорость скролла.

		let scroll = document.querySelector('.work-context__wrapper');

		let left = 0; // отпустили мышку - сохраняем положение скролла
		let drag = false;
		let coorX = 0; // нажали мышку - сохраняем координаты.

		scroll.addEventListener('mousedown', function (e) {
			drag = true;
			coorX = e.pageX - this.offsetLeft;
		});
		document.addEventListener('mouseup', function () {
			drag = false;
			left = scroll.scrollLeft;
		});
		scroll.addEventListener('mousemove', function (e) {
			if (drag) {
				this.scrollLeft = left - (e.pageX - this.offsetLeft - coorX) * speed;
			}
		});
	})();
}

//Подключение слайдера в секции composition
const compositionSwiper = new Swiper('.composition__image.swiper', {
	watchOverflow: true,
	slidesPerView: 1,
	grabCursor: true,
	autoHeight: true,

	navigation: {
		nextEl: '.composition__btn--next',
		prevEl: '.composition__btn--prev',
	},

	pagination: {
		el: '.composition__pagination',
		type: 'fraction',
	},
});