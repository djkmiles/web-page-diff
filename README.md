# webdiff

## Compare two web pages using phantomjs and image-diff.

- An express node server with a single GET route.
- If 0% difference, reports back plan text "Pages are the same".
- Otherwise, a PNG-format graphic is streamed back with the differences highlighted in red.

### Example Usage

```
http://localhost:3000/v1/<url_1>/<url_2>
```
