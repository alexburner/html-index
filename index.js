#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const make = require('./make');
const remove = require('./remove');

const flagOffset = process.argv.reduce((memo, arg, i) => {
    if (i < 2) return memo + 1; // first two are node & file paths
    else return arg.startsWith('-') ? memo + 1 : memo;
}, 0);

const pathArg = process.argv[flagOffset] || '';
const pwd = process.env.PWD || '/';
const dir = !path.isAbsolute(pathArg) ?
    path.resolve(pwd + (pathArg.length ? '/' + pathArg : '')) :
    path.resolve(pathArg)
;

try { fs.accessSync(dir); }
catch (e) {
    console.error('Error: could not resolve target path.');
    console.error('pwd =', pwd);
    console.error('arg =', arg);
    console.error('dir =', dir);
    console.error('');
    throw e;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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
} else if (process.argv.includes('-m') || process.argv.includes('--migrate')) {
    console.log('');
    console.log('This will recursively walk');
    console.log('>', dir);
    console.log('and migrate any existing indexes.');
    console.log('');
    rl.question('Are you sure you want to continue? (yes/no) ', answer => {
        rl.close();
        if (!answer.match(/^y(es)?$/i)) return;
        console.log('');
        console.log('Migrating...');
        remove(dir);
        make(dir);
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