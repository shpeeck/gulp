const { src, dest, watch, parallel } = require("gulp");
const scss = require("gulp-sass"),
	prefix = require("gulp-autoprefixer"),
	sync = require("browser-sync").create(),
	imagemin = require("gulp-imagemin");
	
function convertStyles() {
	return src('app/scss/style.scss')
	.pipe(scss(
        {
            outputStyle: 'compressed'
        }
    ))
    .pipe(prefix())
	.pipe(dest('dist/css'));
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

exports.default = parallel(convertStyles, watchFiles, browserSync);


// для запуска convertStyles, watchFiles, browserSync пишем gulp 
