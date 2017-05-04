# html-index `0.3.4`

Walks directory tree and generates an `index.html` for any folder that doesn't already have its own

Tracks indexed folders with additional `.html-index` file

In case you wanna be able to browse through your web-served directory trees

Like how it was on that ol' Apache server, before migrating to Jenkins on GitHub Pages


## Installation

```
$ npm install -g html-index
```


## Creating `index.html` files

From your current path
```
$ html-index
```

From a relative path
```
$ html-index ../some/relative/path
```

From an absolute path
```
$ html-index ~/some/absolute/path
```


## Removing created `index.html` files

To undo the effects of `html-index`, add `--remove` or `-rm` to your previous command
```
$ html-index -rm
$ html-index -rm ../some/relative/path
$ html-index -rm ~/some/absolute/path
```


## Notes

- recursively adds `index.html` for target dir & children
- additionally adds `.html-index` to track its own changes
- will not overwrite any already-owned `index.html` files (by checking for `.html-index`)
- will not overwrite `index.html` if nothing has changed (by checking in `.html-index`)
- will not walk directories starting with `.` (such as `.git`)
- will not include filenames starting with `.` (such as `.gitignore`) in `index.html`
- will not include `index.html` in `index.html`


## Change from `0.2.x`

Module uses `.html-index` instead of `.html-indexed` for tracking

To update, remove & re-create indexes
```
$ html-index path/to/project -rm
$ html-index path/to/project
```
