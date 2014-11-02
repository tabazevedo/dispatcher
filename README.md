# Dispatcher

A simple functional event dispatcher with support for both string and regular expression matching

### Usage

```
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