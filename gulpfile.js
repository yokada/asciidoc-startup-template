var gulp = require('gulp'),
    bsync = require('browser-sync'),
    exec = require('gulp-exec');

var execReportOptions = {
    err: true,
    stderr: true,
    stdout: true
};

var cmdAsciidocor = 'bundle exec asciidoctor -D ./docs/html -r asciidoctor-diagram <%= file.path %>';

gulp.task('browser-sync', function() {
    bsync({
        server: {
            baseDir: "./docs/html/",
            index  : "./docs/html/README.html"
        }
    });
});

gulp.task('asciidoc', function(cb) {
    gulp.src('./**/*.adoc')
        .pipe(exec(cmdAsciidocor))
        .pipe(exec.reporter(execReportOptions));
});

gulp.task('reload', function () {
    bsync.reload();
});

gulp.task('default', ['browser-sync'], function() {
    gulp.watch('./**/*.adoc').on('change', function(event){
        gulp.src(event.path)
            .pipe(exec(cmdAsciidocor))
            .pipe(exec.reporter(execReportOptions));
    });
    gulp.watch('./**/*.html', ['reload']);
});
