/*
* * * * * ==============================
* * * * * ==============================
* * * * * ==============================
* * * * * ==============================
========================================
========================================
========================================
----------------------------------------
USWDS SASS GULPFILE
----------------------------------------
*/

const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const gulp = require("gulp");
const pkg = require("./node_modules/uswds/package.json");
const postcss = require("gulp-postcss");
const replace = require("gulp-replace");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const uswds = require("./node_modules/uswds-gulp/config/uswds");


sass.compiler = require("sass");

/*
----------------------------------------
PATHS
----------------------------------------
- All paths are relative to the
  project root
- Don't use a trailing `/` for path
  names
----------------------------------------
*/
// Prudentia theme Sass source directory
const PRUDENTIA_SASS_SRC = "../../contrib/prudentia/sass";

// Project Sass source directory
const PROJECT_SASS_SRC = "./sass";

// Project components source directory
const PROJECT_PRUDENTIA_COMPONENTS_SRC = "./components/prudentia";

// Images destination
const IMG_DEST = "./assets/img";

// Fonts destination
const FONTS_DEST = "./assets/fonts";

// Javascript destination
const JS_DEST = "./assets/js";

// Compiled CSS destination
const CSS_DEST = "./assets/css";

// Site CSS destination
// Like the _site/assets/css directory in Jekyll, if necessary.
// If using, uncomment line 106
const SITE_CSS_DEST = "./path/to/site/css/destination";

/*
----------------------------------------
TASKS
----------------------------------------
*/

gulp.task('directories', function () {
  return gulp.src('*.*', { read: false })
    .pipe(gulp.dest('./assets/img'))
    .pipe(gulp.dest('./assets/fonts'))
    .pipe(gulp.dest('./assets/js'))
    .pipe(gulp.dest('./assets/css'))
    .pipe(gulp.dest('./components/prudentia'));
});

gulp.task("copy-uswds-setup", () => {
  return gulp
    .src(`${uswds}/scss/theme/**/**`)
    .pipe(gulp.dest(`${PROJECT_SASS_SRC}`));
});

gulp.task("copy-prudentia-setup", () => {
  return gulp
    // you might need to replace 'web' with your project root directory name
    .src("../../../../web/themes/contrib/prudentia/sass/*.scss")
    .pipe(gulp.dest(`${PROJECT_SASS_SRC}`));
});

gulp.task("copy-prudentia-components", () => {
  return gulp
    // you might need to replace 'web' with your project root directory name
    .src("../../../../web/themes/contrib/prudentia/components/**/**")
    .pipe(gulp.dest(`${PROJECT_PRUDENTIA_COMPONENTS_SRC}`));
});

gulp.task("copy-uswds-fonts", () => {
  return gulp.src(`${uswds}/fonts/**/**`).pipe(gulp.dest(`${FONTS_DEST}`));
});

gulp.task("copy-uswds-images", () => {
  return gulp.src(`${uswds}/img/**/**`).pipe(gulp.dest(`${IMG_DEST}`));
});

gulp.task("copy-uswds-js", () => {
  return gulp.src(`${uswds}/js/**/**`).pipe(gulp.dest(`${JS_DEST}`));
});

gulp.task("build-sass", function(done) {
  var plugins = [
    // Autoprefix
    autoprefixer({
      cascade: false,
      grid: true
    }),
    // Minify
    csso({ forceMediaMerge: false }),
  ];
  return (
    gulp
      .src([`${PROJECT_SASS_SRC}/*.scss`, `${PRUDENTIA_SASS_SRC}/*.scss`])
      .pipe(sourcemaps.init({ largeFile: true }))
      .pipe(
        sass.sync({
          includePaths: [
            `${PROJECT_SASS_SRC}`,
            `${PRUDENTIA_SASS_SRC}`,
            `${uswds}/scss`,
            `${uswds}/scss/packages`
          ]
        })
      )
      .pipe(replace(/\buswds @version\b/g, "based on uswds v" + pkg.version))
      .pipe(postcss(plugins))
      .pipe(sourcemaps.write("."))
      // uncomment the next line if necessary for Jekyll to build properly
      //.pipe(gulp.dest(`${SITE_CSS_DEST}`))
      .pipe(gulp.dest(`${CSS_DEST}`))
  );
});

gulp.task(
  "init",
  gulp.series(
    "directories",
    "copy-uswds-setup",
    // "copy-prudentia-setup",
    "copy-uswds-fonts",
    "copy-uswds-images",
    "copy-uswds-js",
    "copy-prudentia-components",
    "build-sass"
  )
);

gulp.task("watch-sass", function() {
  gulp.watch(`${PROJECT_SASS_SRC}/**/*.scss`, gulp.series("build-sass"));
});

gulp.task("watch", gulp.series("build-sass", "watch-sass"));

gulp.task("default", gulp.series("watch"));
