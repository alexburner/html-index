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


## Notes

- recursively adds `index.html` for current directory & all subdirectories
- skips directories with existing `index.html` (and no `.html-indexed`)
- uses `.html-indexed` to track its own changes, skips indexing if nothing has changed
- `index.html` won't include filenames preceded by `.` (such as ".git")
- `index.html` won't include "index.html"
