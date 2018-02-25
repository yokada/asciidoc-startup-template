var gulp = require('gulp'),
    bsync = require('browser-sync'),
    exec = require('gulp-exec');

gulp.task('browser-sync', function() {
    bsync({
        server: {
            baseDir: "./docs/html/",
            index  : "./docs/html/README.html"
        }
    });
});

gulp.task('asciidoc', function(cb) {
    exec('bundle exec asciidoctor -D ./docs/html -r asciidoctor-diagram docs/*.adoc', function(err, stdout, stderr){
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('reload', function () {
    bsync.reload();
});

var options = {
    continueOnError: false,
    pipeStdout: false
};
var reportOptions = {
    err: true,
    stderr: true,
    stdout: true
};
gulp.task('default', ['browser-sync'], function() {
    gulp.watch('./**/*.adoc').on('change', function(event){
        gulp.src(event.path)
            .pipe(exec('bundle exec asciidoctor -D ./docs/html -r asciidoctor-diagram <%= file.path %>'))
            .pipe(exec.reporter(reportOptions));
        /*
        exec(, function(err, stdout, stderr){
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
        */
    });
    gulp.watch('./**/*.html', ['reload']);
});
