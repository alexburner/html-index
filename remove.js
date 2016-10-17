'use strict';

let fs = require('fs');

let dir;

function walkDir(subdir='/') {
    fs.readdir(dir + subdir, (err, files) => {
        if (err) return console.error(err);
        removeIndex(subdir, files);
        files = files.filter(file => file !== 'index.html' && file !== '.html-indexed');
        files.forEach((file) => {
            fs.stat(dir + subdir + file, (err, stat) => {
                if (err) return console.error(err);
                if (stat && stat.isDirectory()) {
                    walkDir(subdir + file + '/');
                }
            });
        });
    });
}

function removeIndex(subdir, files) {
    if (!files.includes('.html-indexed')) return;
    fs.unlink(dir + subdir + 'index.html', err => {
        if (err) return console.error(err);
        console.log(` - removed index.html for ${subdir}`);
    });
    fs.unlink(dir + subdir + '.html-indexed', err => {
        if (err) return console.error(err);
        console.log(`-- removed .html-indexed for ${subdir}`);
    });
}

module.exports = target => {
    dir = target;
    walkDir();
};