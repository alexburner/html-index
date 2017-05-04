#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const make = require('./make');
const remove = require('./remove');

let pathArgIndex = 2;
while (process.argv[pathArgIndex].startsWith('-')) pathArgIndex++;
const pathArg = process.argv[pathArgIndex] || '';
const workingDir = process.env.PWD || '/';
const targetDir = path.isAbsolute(pathArg)
    ? path.resolve(pathArg)
    : path.resolve(workingDir + (pathArg.length ? `/${pathArg}` : ''))
;

try { fs.accessSync(targetDir); }
catch (e) {
    console.error('Error: could not resolve target path.');
    console.error('argv =', process.argv);
    console.error('pathArg =', pathArg);
    console.error('workingDir =', workingDir);
    console.error('targetDir =', targetDir);
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
    console.log('>', targetDir);
    console.log('and remove all traces of html-index.');
    console.log('');
    rl.question('Are you sure you want to continue? (yes/no) ', answer => {
        rl.close();
        if (!answer.match(/^y(es)?$/i)) return;
        console.log('');
        console.log('Removing...');
        remove(targetDir);
    });
} else {
    console.log('');
    console.log('This will recursively walk');
    console.log('>', targetDir);
    console.log('and create index.html files.');
    console.log('');
    rl.question('Are you sure you want to continue? (yes/no) ', answer => {
        rl.close();
        if (!answer.match(/^y(es)?$/i)) return;
        console.log('');
        console.log('Indexing...');
        make(targetDir);
    });
}