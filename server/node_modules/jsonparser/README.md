# jsonparser

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coverage-image]][coverage-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

Gets the whole content in the request as a json to the property json

### Install

```sh
$ npm install jsonparser
```

## API

```js
const jsonparser = require('jsonparser');
```

### jsonparser(options)

This middleware adds a `req.json` property which contains the JSON parsed request body

#### Options
- `strict` a truthy value to check for content type header (default: false).
- `type` request content-type to parse (default: json).
- `bodyCheck` a truthy value for empty body check (default: false).

## Example

```js
const bodyparser = require('simple-bodyparser');
const jsonparser = require('jsonparser');
const app = require('express')();

app.use(bodyparser());
app.use(jsonparser());
app.use(function(req, res, next){
    let body = req.json
});
```

## License

[MIT](LICENSE)


[npm-image]: https://img.shields.io/npm/v/jsonparser.svg?style=flat-square
[npm-url]: https://npmjs.org/package/jsonparser
[github-tag]: http://img.shields.io/github/tag/cosmosgenius/jsonparser.svg?style=flat-square
[github-url]: https://github.com/cosmosgenius/jsonparser/tags
[travis-image]: https://img.shields.io/travis/cosmosgenius/jsonparser.svg?style=flat-square
[travis-url]: https://travis-ci.org/cosmosgenius/jsonparser
[coverage-image]: https://codecov.io/gh/cosmosgenius/jsonparser/branch/master/graph/badge.svg
[coverage-url]: https://codecov.io/gh/cosmosgenius/jsonparser
[license-image]: http://img.shields.io/npm/l/jsonparser.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/jsonparser.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/jsonparser
