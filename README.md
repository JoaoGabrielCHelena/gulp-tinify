# gulp-tinify
Update of [Josh Broton's](http://joshbroton.com) gulp-tinify package
Minify compatible files using [TinyPNG](https://tinypng.com/)'s API

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

You must have a [TinyPNG Developer API Key](https://tinypng.com/developers) for this to work.

