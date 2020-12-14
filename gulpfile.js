const { src, dest, watch, parallel } = require("gulp");
const scss = require("gulp-sass"),
	prefix = require("gulp-autoprefixer"),
	sync = require("browser-sync").create();

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
    // watch('app/*.html').on("change", sync.reload);
    // watch('app/css/*.css').on("change", sync.reload);
    // watch('app/js/*.js').on("change", sync.reload);
    // watch('app/_img', imagesCompressed);
    // watch('app/fonts/**.ttf', series(convertFonts, fontsStyle));
}


exports.convertStyles = convertStyles;
exports.watchFiles = watchFiles;
exports.browserSync = browserSync;
exports.default = parallel(convertStyles, watchFiles, browserSync);
