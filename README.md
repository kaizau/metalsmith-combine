# Metalsmith Combine

A [Metalsmith](http://www.metalsmith.io/) plugin to prepend or append to files.

Install from metalsmith.json or the JS API:

```js
var metalsmith = require('metalsmith');
var combine = require('metalsmith-combine');

metalsmith(__dirname)
  .use(combine())
  .build();
```

Use from file metadata:

```md
---
prepend:
  - shared/letterhead.md
append:
  - shared/author-bio.md
---

# Speech

Four score and seven years ago...
```
