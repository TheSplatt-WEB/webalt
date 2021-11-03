//Задаем константы ///////////////////////////////////////////////////////////////////////////////////////////////////////
const { src, dest, watch, series, parallel } = require('gulp'),
	scss = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	browsersync = require('browser-sync').create(),
	groupmedia = require('gulp-group-css-media-queries'),
	fileInclude = require('gulp-file-include'),
	uglify = require('gulp-uglify-es').default,
	babel = require('gulp-babel'),
	del = require('del'),
	ttf2woff = require('gulp-ttf2woff'),
	ttf2woff2 = require('gulp-ttf2woff2'),
	imagemin = require("gulp-imagemin"),
	webp = require('gulp-webp'),
	webphtml = require('gulp-webp-html'),
	webpcss = require('gulp-webpcss'),
	fonter = require('gulp-fonter'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename'),
	svgsprite = require('gulp-svg-sprite');
let fs = require('fs');

//Подключаем автообновление браузера ///////////////////////////////////////////////////////////////////////////////////////////////////////
function browserSync() {
	browsersync.init({
		server: {
			baseDir: 'dist/'
		},
		port: 3000,
		notify: false
	});
}

//Следим за html, обрабатываем и выкидываем файлы в папку dist ///////////////////////////////////////////////////////////////////////////////////////////////////////
function html() {
	return src('app/*.html')
		.pipe(fileInclude({
			prefix: '@',
			basepath: '@file'
		}))
		.pipe(webphtml())//Этот плагин заменяет в html обычный тег img на конструкцию picture-source-img, для подключения формата webp в браузерах, которые его поддерживают.
		.pipe(dest('dist/'))
		.pipe(browsersync.stream())
}

//Следим за нашим файлом style.scss, конвертируем из него 2 файла css, один обычный, другой минифицированный и закидываем их в папку dist/css///////////////////////////////////////////////////////////////////////////////////////////////////////
function styles() {
	return src('app/styles/*.scss')
		.pipe(scss({
			outputStyle: 'expanded'
		}))
		.pipe(groupmedia())
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 5 version'],
			cascade: false,
			grid: true
		}))
		.pipe(webpcss())//Этот плагин устанавливают если нужно использование webp в свойстве background-image в scss, для него так же нужно в файл js добавить скрипт, определяющий поддержку браузером формата wepb.
		.pipe(dest('dist/css/'))
		.pipe(scss({
			outputStyle: 'compressed'
		}))
		.pipe(rename({
			extname: ".min.css"
		}))
		.pipe(dest('dist/styles/'))
		.pipe(browsersync.stream())
}

//Следим за нашим файлом script.js, конвертируем из него 2 файла js, один обычный, другой минифицированный и закидываем их в папку dist/js///////////////////////////////////////////////////////////////////////////////////////////////////////
function scripts() {
	return src('app/scripts/script.js')
		.pipe(fileInclude())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(dest('dist/js/'))
		.pipe(uglify())
		.pipe(rename({
			extname: ".min.js"
		}))
		.pipe(dest('dist/scripts/'))
		.pipe(browsersync.stream())
}

//Собираем все css файлы подключаемых плагинов, конкатинируем их в 1 минифицированный файл css и закидываем его в папку dist/css с именем libs.min.css///////////////////////////////////////////////////////////////////////////////////////////////////////
function stylesLibs() {
	return src([
		// 'node_modules/normalize.css/normalize.css',
		// 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css',
		// 'node_modules/slick-carousel/slick/slick.css',
		'node_modules/swiper/swiper-bundle.css',
		// 'node_modules/animate.css/animate.css',
		// 'node_modules/aos/dist/aos.css',
	])
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 5 version'],
			cascade: false,
			grid: true
		}))
		.pipe(concat('libs.min.css'))
		.pipe(cssmin())
		.pipe(dest('dist/styles/'))
		.pipe(browsersync.stream())
}

//Собираем все js файлы подключаемых плагинов, конкатинируем их в 1 минифицированный файл js и закидываем его в папку dist/js с именем libs.min.js///////////////////////////////////////////////////////////////////////////////////////////////////////
function scriptsLibs() {
	return src([
		// 'node_modules/jquery/dist/jquery.js',
		// 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
		// 'node_modules/slick-carousel/slick/slick.js',
		// 'node_modules/stickyfilljs/dist/stickyfill.js',
		// 'node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
		// 'node_modules/wow.js/dist/wow.js',
		'node_modules/imask/dist/imask.js',
		'node_modules/just-validate/dist/js/just-validate.js',
		'node_modules/swiper/swiper-bundle.js',
		// 'node_modules/aos/dist/aos.js',
	])
		.pipe(uglify())
		.pipe(concat('libs.min.js'))
		.pipe(dest('dist/scripts/'))
		.pipe(browsersync.stream())
}

//Следим за всеми файлами jpg, png, svg, gif, ico, webp в папке app/img, конвертируем их в формат webp со сжатием в 70% и закидываем их в папку dist/img. Так же Оригинальные файлы сжимаем до 3 уровня из доступных 7(можно в функции этот параметр поменять) и отправляем сжатые оригиналы в папку dist/img. Все удаленные файлы в папке app/img удалятся из нпапки dist/img при следующем запуске gulp.///////////////////////////////////////////////////////////////////////////////////////////////////////
function images() {
	return src(['app/images/**/*.{jpg,png,svg,gif,ico,webp}', '!app/images/icons/**/*.svg'])
		.pipe(webp({
			quality: 70
		}))
		.pipe(dest('dist/images/'))
		.pipe(src(['app/images/**/*.{jpg,png,svg,gif,ico,webp}', '!app/images/icons/**/*.svg']))
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3 // 0 to 7
			})
		)
		.pipe(dest('dist/images/'))
		.pipe(browsersync.stream())
}

//Следим за всеми svg файлами в папке app/images/icons, собираем их все в svg спрайт и выгружаем в папку dist/images вайл спрайта sprite.svg
function svgSprites() {
	return src('app/images/icons/*.svg')
		.pipe(svgsprite({
			mode: {
				stack: {
					sprite: "../sprite.svg"
				}
			},
			shape: {
				transform: [
					{
						svgo: {
							plugins: [
								{
									removeAttrs: {
										attrs: ['class', 'data-name', 'fill', 'stroke.*']
									}
								},
								{ removeXMLNS: true },
							]
						}
					}
				]
			}
		}))
		.pipe(dest('dist/images'))
}

//Функция слежки за файлами. В данном случае следит за всеми файлами scss, html, js и изображениями в папке app в соответствующих подпапках.///////////////////////////////////////////////////////////////////////////////////////////////////////
function watching() {
	watch(['app/styles/**/*.scss'], styles);
	watch(['app/**/*.html'], html);
	watch(['app/scripts/**/*.js'], scripts);
	watch(['app/images/**/*.{jpg,png,svg,gif,ico,webp}', '!app/images/icons/**/*.svg'], images);
	watch(['app/images/icons/*.svg'], svgSprites);
}

//Функция удаления папки dist. Срабатывает при каждом запуске gulp, перед всеми функциями.///////////////////////////////////////////////////////////////////////////////////////////////////////
function clear() {
	return del('dist/');
}

//Конвертация и подключение шрифтов.///////////////////////////////////////////////////////////////////////////////////////////////////////
function fonts() {
	//Данная функция конвертирует шрифты ttf в woff и woff2, Ее необходимо один раз запустить перед запуском проекта, затем запустить функцию gulp fontsStyle, и только после этого запустить gulp. Повторно этого делать не нужно, только в случае, если добавились новые шрифты.
	return src('app/fonts/*.*')
		.pipe(dest('dist/fonts/'));
};

function otf2ttf() {
	//Данная функция не подключена, так как нужна только в случае, если у тебя есть на руках шрифт в формате otf. Что бы воспользоваться ею нужно закинуть шрифт otf в папку app/fonts и в терминале написать gulp otf2ttf. Делать это необходимо перед запуском gulp.
	return src(['app/fonts/*.otf'])
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(dest('app/fonts/'))
}

function fontsStyle(params) {
	//Эта функция подключит шрифты с помощью миксинов в файл fonts.scss. При запуске появляется какое то красное уведомление, я так и не смог понять че ему надо, но шрифты подключаются и все работает, хз. Ее необходимо запустить один раз после функции gulp fonts, затем нужно в файле fonts.scss изменить имя шрифта, удалив начертание и поменять числовое значение на нужное в зависимости от начертания шрифта. Например там будет так: @include font("Jura-Bold", "Jura-Bold", "400", "normal");, а нужно будет сделать так: @include font("Jura", "Jura-Bold", "700", "normal");. Это необходимо для того что бы подключать шрифт указывая только название семейства, а начертание устанавливать стандартно при помощи свойства font-weight. Всю процедуру конвертации и подключения шрифтов необходимо проделать 1 раз перед запуском gulp, и в дальнейшем этого делать не нужно, только если в проект добавится новый шрифт.
	let file_content = fs.readFileSync('app/styles/common/base/fonts.scss');
	if (file_content == '') {
		fs.writeFile('app/styles/common/base/fonts.scss', '', cb);
		return fs.readdir('dist/fonts/', function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile('app/styles/common/base/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		})
	}
}

function cb() {

}

//Включаем все в работу///////////////////////////////////////////////////////////////////////////////////////////////////////
exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.otf2ttf = otf2ttf;
exports.images = images;
exports.html = html;
exports.styles = styles;
exports.stylesLibs = stylesLibs;
exports.scripts = scripts;
exports.scriptsLibs = scriptsLibs;
exports.watching = watching;
exports.browserSync = browserSync;
exports.clear = clear;
exports.svgSprites = svgSprites;


exports.default = series(clear, stylesLibs, scriptsLibs, styles, html, scripts, images, svgSprites, fonts, parallel(watching, browserSync));