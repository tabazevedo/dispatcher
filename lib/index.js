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
            return it.id === which;
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
        return each(function(it){
          if (it.action === action) {
            return it.callback(payload);
          } else if (typeof it.action === 'function' && it.action(action)) {
            return it.callback(payload);
          } else if (it.action instanceof RegExp && it.action.test(action)) {
            return it.callback((payload.matches = action.match(it.action), payload));
          }
        })(
        this.callbacks);
      }
    };
  };
}).call(this);
