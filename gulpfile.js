var gulp = require('gulp'),
    bsync = require('browser-sync'),
    exec = require('child_process').exec;

gulp.task('browser-sync', function() {
    bsync({
        server: {
            baseDir: "./docs/html/",
            index  : "./docs/html/README.html"
        }
    });
});

gulp.task('asciidoc', function(cb) {
    return exec('bundle exec asciidoctor -D ./docs/html -r asciidoctor-diagram docs/*.adoc', function(err, stdout, stderr){
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('reload', function () {
    bsync.reload();
});

gulp.task('default', ['asciidoc', 'browser-sync'], function(cb) {
    gulp.watch('./**/*.adoc').on('change', function(event){
        return exec('bundle exec asciidoctor -D ./docs/html -r asciidoctor-diagram ' + event.path, function(err, stdout, stderr){
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
    });
    gulp.watch('./**/*.html', ['reload']);
});
