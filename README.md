# Dispatcher

A simple functional event dispatcher with support for both string and regular expression matching

### Usage

```JavaScript
dispatcher = require('dispatcher')();

dispatcher.on('action', function(){
  console.log('First action matched.');
});

dispatcher.on(/.*/, function(){
  console.log('Wildcard match.');
});

dispatcher.emit('action');
  // -> First action matched.
  // -> Wildcard match.

dispatcher.emit('abc');
  // -> Wildcard match.
```

### Testing and compiling `lib` yourself

Dispatcher is written in LiveScript, but compiles to JavaScript.
Simply `npm install -g gulp` then `gulp test` after installing dependencies and it will compile and run unit tests for you.