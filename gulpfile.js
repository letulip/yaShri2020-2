const del = require('del');
const { series, src, dest, start, watch } = require('gulp');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const rollup = require('gulp-better-rollup');
const server = require('browser-sync').create();
const mocha = require('gulp-mocha');

const scripts = () => {
  console.log('scripts');
  
  return src([
      'src/js/*.js',
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(rollup({}, {
      format:'iife'
    }))
    .pipe(sourcemaps.write(''))
    .pipe(dest('build'));
};

const test = () => {
  return src(['js/**/*.test.js'])
  .pipe(rollup({
    plugins: [
      commonjs()
    ]
  }, 'cjs'))
  .pipe(dest('build/test'))
  .pipe(mocha({
    reporter: 'spec'
  }));
};

const clean = () => {
  return del('build');
};

const jsWatch = () => {
  scripts();
  server.reload();
  done();
};

const build = series(
  clean,
  test,
  scripts,
);

const serve = () => {
  server.init({
    server: './build',
    notify: false,
    open: true,
    port: 3001,
    ui: false
  });

  
  watch(['src/js/**/*.js', 'src/blocks/**/*.js'], jsWatch).on('change', server.reload);
};

exports.build = build;

exports.clean = clean;

exports.serve = series(build, serve);