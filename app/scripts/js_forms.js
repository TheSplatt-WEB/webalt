document.addEventListener('DOMContentLoaded', () => { // DOM готов к взаимодейтсвию

	const onScrollHeader = () => { // объявляем основную функцию onScrollHeader

		const header = document.querySelector('.header'); // находим header и записываем в константу
		const footer = document.querySelector('.footer'); // находим футер и записываем его в константу
		let footerHeight = offsetHeight.footer; // вычисляем высоту футера
		let windowHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight)
		let footerVisible = () => (prevScroll + currentScroll) > windowHeight - footerHeight

		let prevScroll = window.pageYOffset // узнаем на сколько была прокручена страница ранее
		let currentScroll // на сколько прокручена страница сейчас (пока нет значения)

		window.addEventListener('scroll', () => { // при прокрутке страницы

			currentScroll = window.pageYOffset // узнаем на сколько прокрутили страницу

			const headerHidden = () => header.classList.contains('header_hidden') // узнаем скрыт header или нет

			if (currentScroll > prevScroll && !headerHidden()) { // если прокручиваем страницу вниз и header не скрыт
				header.classList.add('header_hidden') // то скрываем header
			}
			if (currentScroll < prevScroll && headerHidden()) { // если прокручиваем страницу вверх и header скрыт
				header.classList.remove('header_hidden') // то отображаем header
			}

			prevScroll = currentScroll // записываем на сколько прокручена страница на данный момент

		})

	}

	onScrollHeader() // вызываем основную функцию onScrollHeader

});

//Аккордион////////////////////////////////////////
const questionsLink = document.querySelectorAll('.__link');
for (let questionsLinkItem of questionsLink) {
	questionsLinkItem.addEventListener('click', function (el) {
		el.preventDefault();
		this.classList.toggle('open');
		const dropHidden = () => this.classList.contains('open');
		if (dropHidden()) {
			this.nextElementSibling.style.height = this.nextElementSibling.scrollHeight + 'px';
			this.nextElementSibling.classList.add('open');
		}
		else {
			this.nextElementSibling.style.height = 0 + 'px';
			this.nextElementSibling.classList.remove('open');
		}
	});
};

//Кнопка бургера////////////////////////////////////////
const menuBtn = document.querySelectorAll('.header__burger');
const menu = document.querySelector('.menu');
for (let i = 0; i < menuBtn.length; i++) {
	const menuBtnItem = menuBtn[i];
	menuBtnItem.addEventListener('click', function () {
		for (let i = 0; i < menuBtn.length; i++) {
			const menuBtnItem = menuBtn[i];
			menuBtnItem.classList.toggle('open');
			body.classList.toggle('open');
			menu.classList.toggle('open');
		}
	})
}

//Кнопка наверх////////////////////////////////////////
const btnTop = document.querySelector('.btn__top');
btnTop.addEventListener('click', function () {
	let windowTop = window.pageYOffset
	const scrollTo = document.querySelector('.wrapper');
	let scrollSize = scrollTo.getBoundingClientRect().top - 121;
	let start = null;
	requestAnimationFrame(step);
	function step(time) {
		if (start === null) start = time;
		var progress = time - start,
			r = (scrollSize < 0 ? Math.max(windowTop - progress / speed, windowTop + scrollSize) : Math.min(windowTop + progress / speed, windowTop + scrollSize));
		window.scrollTo(0, r);
		if (r != windowTop + scrollSize) {
			requestAnimationFrame(step)
		} else {
			location.scrollTo = scrollTo
		}
	}
}, false);

//Скролл к якорям////////////////////////////////////////
const diagnosticsLink = document.querySelectorAll('.__link');
let speed = .2;
for (let diagnosticsLinkItem of diagnosticsLink) {
	diagnosticsLinkItem.addEventListener('click', function (el) {
		el.preventDefault();
		let windowTop = window.pageYOffset;
		const id = this.getAttribute('href');
		const scrollTo = document.querySelector(id);
		let scrollSize = scrollTo.getBoundingClientRect().top;
		let start = null;
		requestAnimationFrame(step);
		function step(time) {
			if (start === null) start = time;
			var progress = time - start,
				r = (scrollSize < 0 ? Math.max(windowTop - progress / speed, windowTop + scrollSize) : Math.min(windowTop + progress / speed, windowTop + scrollSize));
			window.scrollTo(0, r);
			if (r != windowTop + scrollSize) {
				requestAnimationFrame(step)
			} else {
				location.scrollTo = scrollTo
			}
		}
	}, false);
};
