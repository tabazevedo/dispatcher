(function(){
  var ref$, filter, each, last, Dispatcher;
  ref$ = require('prelude-ls'), filter = ref$.filter, each = ref$.each, last = ref$.last;
  Dispatcher = (function(){
    Dispatcher.displayName = 'Dispatcher';
    var prototype = Dispatcher.prototype, constructor = Dispatcher;
    prototype._callbacks = [];
    prototype.on = function(action, callback){
      var prev;
      this._callbacks.push({
        id: (prev = last(
        this._callbacks)) ? prev.id + 1 : 1,
        action: action,
        callback: callback
      });
      return last(
      this._callbacks).id;
    };
    prototype.clear = function(which){
      var this$ = this;
      if (typeof which === 'number') {
        return this._callbacks = filter(function(it){
          return it.id === which;
        })(
        this._callbacks);
      } else {
        return each(function(it){
          return this$.clear(it);
        })(
        which);
      }
    };
    prototype.emit = function(action, payload){
      return each(function(it){
        return it.callback(payload);
      })(
      filter(function(it){
        return it.action === action;
      })(
      this._callbacks));
    };
    function Dispatcher(){}
    return Dispatcher;
  }());
  module.exports = Dispatcher;
}).call(this);
