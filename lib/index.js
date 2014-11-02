(function(){
  var ref$, filter, each, last, map;
  ref$ = require('prelude-ls'), filter = ref$.filter, each = ref$.each, last = ref$.last, map = ref$.map;
  module.exports = function(){
    return {
      id: 0,
      callbacks: [],
      on: function(action, callback){
        this.callbacks.push({
          id: this.id += 1,
          action: action,
          callback: callback
        });
        return this.id;
      },
      clear: function(which){
        var this$ = this;
        which == null && (which = false);
        if (typeof which === 'number') {
          return this.callbacks = filter(function(it){
            return it.id !== which;
          })(
          this.callbacks);
        } else if (which instanceof Array) {
          return each(function(it){
            return this$.clear(it);
          })(
          which);
        } else if (!which) {
          return each(function(it){
            return this$.clear(it);
          })(
          map(function(it){
            return it.id;
          })(
          this.callbacks));
        }
      },
      emit: function(action, payload){
        if (deepEq$(typeof payload, 'undefined', '===')) {
          payload = {};
        }
        return each(function(it){
          if (it.action === action) {
            return it.callback(payload);
          } else if (it.action instanceof RegExp && it.action.test(action)) {
            return it.callback((payload.matches = action.match(it.action), payload));
          }
        })(
        this.callbacks);
      }
    };
  };
  function deepEq$(x, y, type){
    var toString = {}.toString, hasOwnProperty = {}.hasOwnProperty,
        has = function (obj, key) { return hasOwnProperty.call(obj, key); };
    var first = true;
    return eq(x, y, []);
    function eq(a, b, stack) {
      var className, length, size, result, alength, blength, r, key, ref, sizeB;
      if (a == null || b == null) { return a === b; }
      if (a.__placeholder__ || b.__placeholder__) { return true; }
      if (a === b) { return a !== 0 || 1 / a == 1 / b; }
      className = toString.call(a);
      if (toString.call(b) != className) { return false; }
      switch (className) {
        case '[object String]': return a == String(b);
        case '[object Number]':
          return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
        case '[object Date]':
        case '[object Boolean]':
          return +a == +b;
        case '[object RegExp]':
          return a.source == b.source &&
                 a.global == b.global &&
                 a.multiline == b.multiline &&
                 a.ignoreCase == b.ignoreCase;
      }
      if (typeof a != 'object' || typeof b != 'object') { return false; }
      length = stack.length;
      while (length--) { if (stack[length] == a) { return true; } }
      stack.push(a);
      size = 0;
      result = true;
      if (className == '[object Array]') {
        alength = a.length;
        blength = b.length;
        if (first) {
          switch (type) {
          case '===': result = alength === blength; break;
          case '<==': result = alength <= blength; break;
          case '<<=': result = alength < blength; break;
          }
          size = alength;
          first = false;
        } else {
          result = alength === blength;
          size = alength;
        }
        if (result) {
          while (size--) {
            if (!(result = size in a == size in b && eq(a[size], b[size], stack))){ break; }
          }
        }
      } else {
        if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) {
          return false;
        }
        for (key in a) {
          if (has(a, key)) {
            size++;
            if (!(result = has(b, key) && eq(a[key], b[key], stack))) { break; }
          }
        }
        if (result) {
          sizeB = 0;
          for (key in b) {
            if (has(b, key)) { ++sizeB; }
          }
          if (first) {
            if (type === '<<=') {
              result = size < sizeB;
            } else if (type === '<==') {
              result = size <= sizeB
            } else {
              result = size === sizeB;
            }
          } else {
            first = false;
            result = size === sizeB;
          }
        }
      }
      stack.pop();
      return result;
    }
  }
}).call(this);
