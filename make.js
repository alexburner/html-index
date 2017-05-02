'use strict';

let fs = require('fs');

let date;
let dirname;

function walkDir(dir, subdir='/') {
    fs.readdir(dir + subdir, (err, files) => {
        if (err) return console.error(err);
        makeIndex(dir, subdir, files);
        files.forEach((file) => {
            fs.stat(dir + subdir + file, (err, stat) => {
                if (err) return console.error(err);
                if (stat && stat.isDirectory() && !file.startsWith('.')) {
                    walkDir(dir, subdir + file + '/');
                }
            });
        });
    });
}

function makeIndex(dir, subdir, files) {
    let alreadyBeenIndexed = files.includes('.html-index');
    if (files.includes('index.html') && !alreadyBeenIndexed) return;
    files = files.filter(file => !file.startsWith('.') && file !== 'index.html');
    files.sort();
    files.unshift('../');
    let fingerprint = dirname + subdir + JSON.stringify(files);
    if (alreadyBeenIndexed) {
        fs.readFile(dir + subdir + '.html-index', 'utf8', (err, data) => {
            if (err) return console.error(err);
            if (data === fingerprint) return console.log(` ~ skipped ${subdir}`);
            writeIndex(dir, subdir, files, fingerprint);
        });
    } else {
        writeIndex(dir, subdir, files, fingerprint);
    }
}

function writeIndex(dir, subdir, files, fingerprint) {
    let title = `Index of ${dirname + subdir}`;
    let list = files
        .map(file => `<li><a href="${file}">${file}</a></li>`)
        .join('')
    ;
    let index = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${title}</title>
        </head>
        <body>
            <cite>Generated ${date}</cite>
            <h1>${title}</h1>
            <ul>${list}</ul>
        </body>
        </html>
    `;
    fs.writeFile(dir + subdir + 'index.html', index, err => {
        if (err) return console.error(err);
        console.log(` + wrote index.html for ${subdir}`);
        fs.writeFile(dir + subdir + '.html-index', fingerprint, err => {
            if (err) return console.error(err);
            console.log(`++ wrote .html-index for ${subdir}`);
        });
    });
}

module.exports = dir => {
    date = new Date().toLocaleString();
    dirname = dir.split('/').pop();
    walkDir(dir);
};