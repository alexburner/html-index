# html-index

In case you're serving static files with something like Jenkins on GitHub pages and want to be able to browse through your directory tree, like how you could on that good ol' Apache server you recently migrated from.


## Installation

```
$ npm install -g html-index
```


## Execution

Create index.html files starting from current path:
```
$ html-index
```

Create index.html files starting from a relative path:
```
$ html-index ../some/relative/path
```

Create index.html files starting from an absolute path:
```
$ html-index ~/some/absolute/path
```


## Removal

If you want to remove generated `index.html` files, add `-rm` or `--remove`:
```
$ html-index -rm
$ html-index -rm ../some/relative/path
$ html-index -rm ~/some/absolute/path
```


## Notes

- recursively adds `index.html` for target dir & children
- also adds `.html-indexed` to track its own changes
- does not overwrite pre-existing `index.html` files (by looking for `.html-indexed`)
- does not overwrite `index.html` if nothing has changed (by looking in `.html-indexed`)
- does not walk directories that start with `.` (such as `.git`)
- `index.html` won't include filenames preceded by `.` (such as `.gitignore`)
- `index.html` won't include `index.html`
