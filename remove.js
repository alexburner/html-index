'use strict';

let fs = require('fs');

function walkDir(dir, subdir='/') {
    fs.readdir(dir + subdir, (err, files) => {
        if (err) return console.error(err);
        removeIndex(dir, subdir, files);
        files = files.filter(file => file !== 'index.html' && file !== '.html-indexed');
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

module.exports = dir => {
    walkDir(dir);
};