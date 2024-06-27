# gulp-tinify
Update of [Josh Broton's](http://joshbroton.com) gulp-tinify package   
Minify compatible files using [TinyPNG](https://tinypng.com/)'s API

You must have a [TinyPNG Developer API Key](https://tinypng.com/developers) for this to work.   
The API key is meant to be a local variable named TINIFY_KEY

## Usage

```js
var gulp = require('gulp');
var tinify = require('gulp-tinify');

gulp.task('tinify', function() {
    gulp.src('/img/**/*')
        .pipe(tinify())
        .pipe(gulp.dest('/dest/img'));
});
```
---
The [conversion mode](https://tinypng.com/developers/reference/nodejs#converting-images) can be passed to it.

```js
var gulp = require('gulp');
var tinify = require('gulp-tinify');

gulp.task('tinify', function() {
    gulp.src('/img/**/*')
        .pipe(tinify(['image/webp']))
        .pipe(gulp.dest('/dest/img'));
});
```
This will convert and compress every image into a .webp image.   

---
The conversion mode can also be set to 'direct' to just compress the image, maintaining filetype.

```js
var gulp = require('gulp');
var tinify = require('gulp-tinify');

gulp.task('tinify', function() {
    gulp.src('/img/**/*')
        .pipe(tinify('direct'))
        .pipe(gulp.dest('/dest/img'));
});
```