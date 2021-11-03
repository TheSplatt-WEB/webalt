//Подключение JQuery плагинов с настройками///////////////////////////////////////////////////////////////////////////////////////////////

//jquery.maskedinput///////////////////////////////////////////////////////////////////////////////////////////////
//Маска для телефона
$("input[type=tel]").mask("+7 (999) 999-9999");

//Stickyfill///////////////////////////////////////////////////////////////////////////////////////////////
let elements = $('.sticky');
Stickyfill.add(elements);

//Slick-slider///////////////////////////////////////////////////////////////////////////////////////////////
$('.slider').slick({
	arrows: true,
	prevArrow: '<button type="button" class="slick-prev slick-arrow" style="background-image: url(../images/arrow-left.svg);"></button>',
	nextArrow: '<button type="button" class="slick-next slick-arrow" style="background-image: url(../images/arrow-right.svg);"></button>',
	infinite: true,
	autoplay: true,
	autoplaySpeed: 4000,
	speed: 600,
	pauseOnFocus: false,
	pauseOnHover: false,
	dots: true,
	slidesToShow: 3,
	slidesToScroll: 1,
	centerMode: false,
	variableWidth: false,
	adaptiveHeight: false,
	fade: false,
	// asNavFor: '.slider-nav', //Связываем с другим слайдером
	responsive: [{
		breakpoint: 1050,
		settings: {
			prevArrow: false,
			nextArrow: false,
		}
	},]
});

//rateYo///////////////////////////////////////////////////////////////////////////////////////////////
$('.rating__static').rateYo({
	starWidth: '13px',
	ratedFill: '#3a3330',
	readOnly: true,
	rating: 4.5,
	normalFill: 'transparent',
	starSvg: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 32 32"><path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z"></path></svg>',
});