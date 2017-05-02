'use strict';

let fs = require('fs');

function walkDir(dir, subdir='/') {
    fs.readdir(dir + subdir, (err, files) => {
        if (err) return console.error(err);
        removeIndex(dir, subdir, files);
        files = files.filter(file => (
            file !== 'index.html' &&
            file !== '.html-index' &&
            file !== '.html-indexed' // legacy
        ));
        files.forEach((file) => {
            fs.stat(dir + subdir + file, (err, stat) => {
                if (err) return console.error(err);
                if (stat && stat.isDirectory()) {
                    walkDir(dir, subdir + file + '/');
                }
            });
        });
    });
}

function removeIndex(dir, subdir, files) {
    // legacy: clean out any old .html-indexed files
    const hasHtmlIndex = files.includes('.html-index');
    const hasHtmlIndexed = files.includes('.html-indexed');
    if (hasHtmlIndex) removeFile(dir, subdir, '.html-index');
    if (hasHtmlIndexed) removeFile(dir, subdir, '.html-indexed');
    if (hasHtmlIndex || hasHtmlIndexed) {
        removeFile(dir, subdir, 'index.html');
    }
}

function removeFile(dir, subdir, file) {
    fs.unlink(dir + subdir + file, err => {
        if (err) return console.error(err);
        console.log(` - removed ${file} for ${subdir}`);
    });
}

module.exports = dir => walkDir(dir);