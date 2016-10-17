#!/usr/bin/env node

'use strict';

let fs = require('fs');
let path = require('path');
let readline = require('readline');

let make = require('./make');
let remove = require('./remove');

//
// SETUP
//

let argIndex = 2;
process.argv.forEach((arg, i) => {
    if (i < 2) return;
    // path arg might be displaced by --flags
    if (arg.startsWith('-')) argIndex++;
})

let pwd = process.env.PWD || '/';
let arg = process.argv[argIndex] || '';
let dir = !path.isAbsolute(arg) ?
    path.resolve(pwd + (arg.length ? '/' + arg : '')) :
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
    console.error('');
    throw e;
}

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('-------------------------------------------------------------------------');
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~ HTML INDEXER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
console.log('-------------------------------------------------------------------------');
if (process.argv.includes('-rm') || process.argv.includes('--remove')) {
    console.log('');
    console.log('This will recursively walk');
    console.log('>', dir);
    console.log('and remove all traces of html-index.');
    console.log('');
    rl.question('Are you sure you want to continue? (yes/no) ', answer => {
        rl.close();
        if (!answer.match(/^y(es)?$/i)) return;
        console.log('');
        console.log('Removing...');
        remove(dir);
    });
} else {
    console.log('');
    console.log('This will recursively walk');
    console.log('>', dir);
    console.log('and create index.html files.');
    console.log('');
    rl.question('Are you sure you want to continue? (yes/no) ', answer => {
        rl.close();
        if (!answer.match(/^y(es)?$/i)) return;
        console.log('');
        console.log('Indexing...');
        make(dir);
    });
}