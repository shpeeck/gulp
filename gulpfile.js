const { src, dest, watch, parallel, series } = require("gulp");
const scss = require("gulp-sass"),
	prefix = require("gulp-autoprefixer"),
	sync = require("browser-sync").create(),
	imagemin = require("gulp-imagemin"),

	fs = require("fs");

	
// Создание файлов
function createFiles() {
    createFolders();
    setTimeout(() => {
        
        fs.writeFile("newfolder/index.html", "!", function (err) {
            if(err) {
                throw err;
            }
            console.log("File created");
        });
        fs.writeFile("newfolder//scss/style.scss", "", function (err) {
            if(err) {
                throw err;
            }
            console.log("File created");
        });
    }, 500);
};

// Создание папок 
function createFolders() {
    return src("*.*", {read: false})
    .pipe(dest("./newfolder/scss/"))
    .pipe(dest("./newfolder/js/"))
    .pipe(dest("./newfolder/img/"))
    .pipe(dest("./newfolder/fonts"))
}


function convertStyles() {
	return src('app/scss/style.scss')
	.pipe(scss(
        {
            outputStyle: 'compressed'
        }
    ))
    .pipe(prefix())
	.pipe(dest('app/css'));
};

function imagesCompressed () {
    return src('app/img/*.{jpg, png, svg}')
    .pipe(imagemin())
    .pipe(dest('dist/img'))
}

function browserSync() {
	sync.init({
		server: {
			baseDir: "app",
			open: "local"
		}
	});
}

function watchFiles() {
    watch('app/scss/**/*.scss', convertStyles);
    watch('app/*.html').on("change", sync.reload);
    watch('app/css/*.css').on("change", sync.reload);
    watch('app/js/*.js').on("change", sync.reload);
    watch('app/img', imagesCompressed);
    // watch('app/fonts/**.ttf', series(convertFonts, fontsStyle));
}


exports.convertStyles = convertStyles;
exports.watchFiles = watchFiles;
exports.browserSync = browserSync;
exports.imagesCompressed = imagesCompressed;
exports.struct = createFiles;

exports.default = parallel(convertStyles, browserSync, watchFiles);

// build 
function moveHtml() {
    return src('app/*.html')
    .pipe(dest('dist'))
}

function moveCss() {
    return src('app/css/*.css')
    .pipe(dest('dist/css'))
}

function moveJs() {
    return src('app/js/*.js')
    .pipe(dest('dist/js'))
}

function moveImgs() {
    return src('app/img/*')
    .pipe(dest('dist/img'))
}

exports.moveHtml = moveHtml;
exports.moveCss = moveCss;
exports.moveJs = moveJs;
exports.moveImgs = moveImgs;
exports.build = series(moveHtml, moveCss, moveJs, moveImgs)


// создаем папки и файлы командой gulp struct
// для запуска convertStyles, watchFiles, browserSync пишем gulp 
// для перемещения файлов набираем gulp build
// перемещение картинок не нужно, так как конвертирую сразу в папку (нужно переделать)
