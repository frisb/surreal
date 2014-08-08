# Surreal [![Build Status](https://travis-ci.org/frisb/surreal.png)](http://travis-ci.org/frisb/surreal)

[![npm status badge](https://nodei.co/npm/surreal.png?stars=true&downloads=true)](https://nodei.co/npm/surreal/)

Surreal is a simple and extensible serialization module for server and client.

All contributions are welcome.

## Features
* Extendible by inheriting Surreal.BaseSerializer.
* Serializes functions.

## Simple API

#### Surreal.serialize(obj)

* `obj` Object.

Serializes the object into a JSON string.

#### Surreal.deserialize(str)

* `str` String.

Deserializes the JSON string into an object.

## Example Usage

``` js
var Surreal = require('surreal');

var obj = {
  key1: 'value1',
  key2: 'value2',
  func1: function () {
    console.log('my function');
  }
};

var str = Surreal.serialize(obj);
console.log(str);

var obj = Surreal.deserialize(str);
console.log(obj);

```

## Installation

#### server
```
npm install surreal
```

#### client
``` html
<script type="text/javascript" src="surreal.js"></script>
```

## License

(The MIT License)

Copyright (c) frisB.com &lt;play@frisb.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![Analytics](https://ga-beacon.appspot.com/UA-40562957-6/surreal/readme)](https://github.com/igrigorik/ga-beacon)
