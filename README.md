# html-index

*Write simple index.html lists for directories.*

In case you're using something like Jenkins on GitHub pages and want to be able to walk through directory trees, like how you could on that good ol' Apache server you recently migrated from.


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

- skips directories with existing `index.html` (and no `.html-indexed`)
- uses `.html-indexed` to track its own changes, skips indexing if nothing has changed
- `index.html` list won't include filenames preceded by `.` (such as ".git")
- `index.html` list won't include "index.html"
