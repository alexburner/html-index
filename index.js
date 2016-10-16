#!/usr/bin/env node

'use strict';

let fs = require('fs');
let path = require('path');
let pwd = process.env.PWD || '/';
let arg = process.argv[2] || '';
let dir = !path.isAbsolute(arg) ?
    path.resolve(pwd + (!arg ? '' : '/' + arg)) :
    path.resolve(arg)
;

try {
    fs.accessSync(dir);
}
catch (e) {
    console.error('Error: could not resolve target path.');
    console.error('pwd =', pwd);
    console.error('arg =', arg);
    console.error('dir =', dir);
    throw e;
}

console.log('----------------------------------------------------------------------');
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~ HTML INDEXER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
console.log('----------------------------------------------------------------------');
console.error('pwd =', pwd);
console.error('arg =', arg);
console.error('dir =', dir);
console.log('');

let date = new Date().toLocaleString();
let dirname = dir.split('/').pop();

function walkDir(subdir='/') {
    fs.readdir(dir + subdir, (err, files) => {
        if (err) return console.error(err);
        makeIndex(subdir, files);
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

function makeIndex(subdir, files) {
    let alreadyBeenIndexed = files.includes('.html-indexed');
    if (files.includes('index.html') && !alreadyBeenIndexed) return;
    files = files.filter(file => !file.startsWith('.') && file !== 'index.html');
    files.sort();
    files.unshift('../');
    let fingerprint = dir + subdir + JSON.stringify(files);
    if (alreadyBeenIndexed) {
        fs.readFile(dir + subdir + '.html-indexed', 'utf8', (err, data) => {
            if (err) return console.error(err);
            if (data === fingerprint) return console.log(`~ skipped ${subdir}`);
            writeIndex(subdir, files, fingerprint);
        });
    } else {
        writeIndex(subdir, files, fingerprint);
    }
}

function writeIndex(subdir, files, fingerprint) {
    let title = `Index of ${dirname + subdir}`;
    let list = files.map(file => `<li><a href="${file}">${file}</a></li>`).join('');
    let index = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${title}</title>
        </head>
        <body>
            <h1>${title}</h1>
            <ul>${list}</ul>
            <cite>Generated on ${date}</cite>
        </body>
        </html>
    `;
    fs.writeFile(dir + subdir + 'index.html', index, err => {
        if (err) return console.error(err);
        console.log(`✓ wrote index.html for ${subdir}`);
        fs.writeFile(dir + subdir + '.html-indexed', fingerprint, err => {
            if (err) return console.error(err);
            console.log(`✓✓ wrote .html-indexed for ${subdir}`);
        });
    });
}

walkDir();