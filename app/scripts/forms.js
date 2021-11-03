// Определение поддержки браузером формата webp для использования webp в свойстве background-image в scss///////////////////////////////////////////////////////////////////////////////////////////////
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

//Функция для использования конструкции вместо object-fit: cover; для IE///////////////////////////////////////////////////////////////////////////////////////////////
function ibgWebP() {
	$.each($('.ibg'), function (index, val) {
		if ($(this).find('source').length > 0) {
			$(this).css('background-image', 'url("' + $(this).find('source').attr('srcset') + '")');
		}
	});
}
ibg();
function ibg() {
	$.each($('.ibg'), function (index, val) {
		if ($(this).find('img').length > 0) {
			$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
		}
	});
}
ibgWebP();

//Адаптивное меню///////////////////////////////////////////////////////////////////////////////////////////////
$('.menu__btn, .menu__body').on('click', function () {
	$('.menu__btn, .menu__body').toggleClass('open');
});
$(document).on('click', function (e) {
	if (!$('.menu__btn').is(e.target) && $('.menu__btn').has(e.target).length === 0 &&
		!$('.menu__body').is(e.target) && $('.menu__body').has(e.target).length === 0) {
		$('.menu__body, .menu__btn').removeClass('open');
	}
});

//Отмена перехода по ссылкам и слайдтоггл дропдаунов и слайдап дропдаунов не этой ссылки///////////////////////////////////////////////////////////////////////////////////////////////
$(document).on('click', '.drop', function (event) {
	event.preventDefault();
	if ($('.menu__body').hasClass('one')) {
		$('.dropdown').not($(this).next()).slideUp();
	}
	$(this).next('.dropdown').slideToggle();
});

//Реализация табов///////////////////////////////////////////////////////////////////////////////////////////////
$('.tabs__wrapper').each(function (el) {
	$(this).find('.tab').on('click', function () {
		let id = $(this).attr('data-id');
		$(this).parent().parent().next().find('.tab__item').removeClass('active-tab').hide();
		$(this).parent('.tabs').find('.tab').removeClass('active');
		$(this).parent().prev('.tabs').find('.tab').removeClass('active');
		$(this).parent('.tabs').next('.tabs__hidden').find('.tab').removeClass('active');
		$(this).addClass('active');
		$('#' + id).addClass('active-tab').fadeIn();
		return false;
	});
});

//Присваиваем множеству элементов атрибут id с уникальными значениями///////////////////////////////////////////////////////////////////////////////////////////////
let ii = 0;
$(".tab__item").each(function () {
	ii++;
	$(this).attr("id", "item" + ii);
});

//Ограничение количества символов///////////////////////////////////////////////////////////////////////////////////////////////
$(".__descr").each(function () {
	let val = $(this).prop("innerHTML");
	if (val.length > 100) {
		$(this).prop("innerHTML", val.substr(0, 100) + "...")
	}
});

//Скрываем элементы, коротые не помещаются в строку в дропдаун///////////////////////////////////////////////////////////////////////////////////////////////
let $nav = $('.tabs__inner');
let $btn = $('.tabs__btn');
let $vlinks = $('.tabs');
let $hlinks = $('.tabs__hidden');
let breaks = [];
function updateNav() {
	$vlinks.each(function (el) {
		let availableSpace = $(this).prev($btn).hasClass('hidden') ? $(this).parent($nav).width() : $(this).parent($nav).width() - $(this).prev($btn).width() - 10;
		if ($(this).width() > availableSpace) {
			breaks.push($(this).width());
			$(this).children().last().prependTo($(this).next($hlinks));
			if ($(this).prev($btn).hasClass('hidden')) {
				$(this).prev($btn).removeClass('hidden');
			}
		} else {
			if (availableSpace > breaks[breaks.length - 1]) {
				$(this).next($hlinks).children().first().appendTo($(this));
			}
			if (breaks.length < 1) {
				$(this).prev($btn).addClass('hidden');
				$(this).next($hlinks).addClass('hidden');
			}
		}
		if ($(this).width() > availableSpace) {
			updateNav();
		}
	});
}
$(window).on('resize', function () {
	updateNav();
});
$btn.each(function (el) {
	$(this).on('click', function () {
		$(this).next().next().toggleClass('hidden');
	});
});
$('.tab').on('click', function () {
	$hlinks.addClass('hidden');
});
updateNav();

//Склонения слов в зависимости от значения колличества///////////////////////////////////////////////////////////////////////////////////////////////
const elements = document.querySelectorAll('.rating__info')

elements.forEach(function (el) {
	const count = el.textContent
	const title = declination(count, [' отзыв', ' отзыва', ' отзывов'])
	const age = count + title

	el.textContent = age
})

function declination(number, titles) {
	var cases = [2, 0, 1, 1, 1, 2];
	return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

//Функция перемещающая курсор в input с типом tel в начало строки///////////////////////////////////////////////////////////////////////////////////////////////
$.fn.setCursorPosition = function (pos) {
	if ($(this).get(0).setSelectionRange) {
		$(this).get(0).setSelectionRange(pos, pos);
	} else if ($(this).get(0).createTextRange) {
		let range = $(this).get(0).createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
};
$('input[type="tel"]').on('click', function () {
	$(this).setCursorPosition(3);
});

//Меняем css свойства блокам при клике по кнопке и ссылкам, необходимо так же задать такие же изменения при клике по документу вне объекта///////////////////////////////////////////////////////////////////////////////////////////////
$('.btn, .link').on('click', function () {
	if (!$('.link').hasClass('openDone')) {
		$('.link').addClass('openDone');
		$('.li').css({
			'left': '-15px',
			'right': '-15px'
		});
	} else {
		$('.link').removeClass('openDone');
		$('.li').css({
			'left': '-100vw',
			'right': '150vw'
		});
	}
});

//Удаляем атрибут при разрешении экрана больше 851///////////////////////////////////////////////////////////////////////////////////////////////
$(window).on('resize', function () {
	if ($(window).width() > 851) {
		$('.li').removeAttr('style');
	}
});

//Скролл к якорям ссылок///////////////////////////////////////////////////////////////////////////////////////////////
$('.link, .link_2').on('click', function (event) {
	event.preventDefault();
	let id = $(this).attr('href'),
		top = $(id).offset().top;
	$('body,html').animate({
		scrollTop: top
	}, 800);
});

//Добавление класса блоку при прокрутке///////////////////////////////////////////////////////////////////////////////////////////////
$(window).on('scroll', function () {
	if ($(this).scrollTop() > 20) {
		(!$('block').hasClass('class'))
		$('block').addClass('class');
	}
	else {
		$('block').removeClass('class');
	}
});

//Скрытие элемента по клику вне его///////////////////////////////////////////////////////////////////////////////////////////////
$(document).on('click', function (e) {
	if (!$('.hint__Link').is(e.target) && $('.hint__Link').has(e.target).length === 0 &&
		!$('.hint__block').is(e.target) && $('.hint__block').has(e.target).length === 0) {
		$('.hint__block').fadeOut();
	}
});

//Добавляем блок без элементов с id в конец блока будущего родителя при нажатии на кнопку-ссылку///////////////////////////////////////////////////////////////////////////////////////////////
$('body').on('click', '.added__link', function () {
	$('.parent__block').append('<div></div>')
});

//Скрываем блок при установке флажка в чекбоксе и показываем при отключении///////////////////////////////////////////////////////////////////////////////////////////////
$('body').on('change', 'input#formCheckbox', function () {
	if (!$('.files__item').hasClass('openDone')) {
		$('.files__item').addClass('openDone');
		$('.files__item').fadeOut(300).show();
		$('.files__item').removeAttr('style');
		$('.files__input').prop('required', false);
	} else {
		$('.files__item').removeClass('openDone');
		$('.files__item').fadeIn(300);
		$('.files__input').prop('required', true);
	}
});

//Добавление всех имен загруженных файлов в input multiple через запятую в span///////////////////////////////////////////////////////////////////////////////////////////////
$('body').on('change', '.files__input', function () {
	let name_file = [];
	for (let i = 0; i < $(this).get(0).files.length; ++i) {
		name_file.push($(this).get(0).files[i].name);
	}
	$(this).next().next('span').text(name_file.join(", "));
});

//Форма обратной связи (без файлов)///////////////////////////////////////////////////////////////////////////////////////////////
$(".fancybox-form").on('submit', function () {
	let th = $(this);
	$.ajax({
		type: "POST",
		url: "mail.php",
		data: th.serialize()
	}).done(function () {
		alert("Спасибо, Ваша заявка принята. Наш специалист свяжется с Вами в ближайшее время. График работы: с 10 до 19 часов ежедневно.");
		setTimeout(function () {
			th.trigger("reset");
		}, 1000);
	});
	return false;
});

//Форма отправки с файлами и выведенными именами файлов в span///////////////////////////////////////////////////////////////////////////////////////////////
$(function () {
	document.getElementById('form').addEventListener('submit', function (evt) {

		let pr = document.querySelector('.progress-bar'),
			checkboxNoInspect = document.querySelector('.files__item-noinspect'),
			NoInspect = document.querySelectorAll('.files__input-noinspect'),
			checkboxNoDriver = document.querySelectorAll('.files__item-nodrivers'),
			noDriver = document.querySelectorAll('.files__input-nodrivers'),
			inputs = document.getElementById('form').querySelectorAll('.files__btn span');

		let http = new XMLHttpRequest(),
			f = this;
		let th = $(this);
		evt.preventDefault();

		//Появление анимации загрузки файлов пока они грузятся
		http.upload.onloadstart = function () {
			pr.style.opacity = 1;
			pr.style.visibility = 'visible';
		};
		/////////////////////////////////////////////////////////////////////////
		http.onreadystatechange = function () {
			if (http.readyState == 4 && http.status == 200) {
				alert(http.responseText);
				console.log(http.responseText);
				if (http.responseText.indexOf(f.name.value) == 0) { // очистить поля формы, если в ответе первым словом будет имя отправителя (name)
					th.trigger("reset"); //Очестка всех input
					inputs.forEach(element => {
						element.textContent = 'файл не выбран'; //Очистка названий файлов
					});
					checkboxNoInspect.classList.remove('openDone');//В случае если перед отправкой данный блок был скрыт при помощи чекбокса убираем у него класс openDone
					checkboxNoInspect.style.display = '';//Очищаем стиль display
					checkboxNoDriver.forEach(element => {//То же самое, только этот код если чекбокс мог скрыть несколько таких одинаковых элементов
						element.classList.remove('openDone');
					});
					checkboxNoDriver.forEach(element => {//И очищаем у них стиль display
						element.style = '';
					});
					NoInspect.forEach(element => {
						element.setAttribute('required', true);//Возвращаем ранее скрытым инпутам атрибут required, который был там изначально
					});
					noDriver.forEach(element => {
						element.setAttribute('required', true);//Возвращаем ранее скрытым инпутам атрибут required, который был там изначально
					});
					//Скрытие анимации загрузки файлов после их загрузки
					pr.style.opacity = 0;
					pr.style.visibility = 'hidden';
				}
			}
		};
		http.onerror = function () {
			alert('Ошибка, попробуйте еще раз');
		};

		http.open("POST", "contact.php", true);
		http.send(new FormData(f));

	}, false);
});