'use strict';

let fs = require('fs');

function walkDir(dir, subdir='/') {
    fs.readdir(dir + subdir, (err, files) => {
        if (err) return console.error(err);
        removeIndex(dir, subdir, files);
        files.forEach((file) => {
            if (file === 'index.html') return;
            if (file === '.html-index') return;
            if (file === '.html-indexed') return;
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
    if (files.includes('.html-index')) {
        removeFile(dir, subdir, 'index.html');
        removeFile(dir, subdir, '.html-index');
    }
    // legacy
    if (files.includes('.html-indexed')) {
        removeFile(dir, subdir, '.html-indexed');
    }
}

function removeFile(dir, subdir, file) {
    fs.unlink(dir + subdir + file, err => {
        if (err) return console.error(err);
        console.log(`-- removed ${file} for ${subdir}`);
    });
}

module.exports = dir => walkDir(dir);