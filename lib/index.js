(function(){
  var ref$, filter, each, Dispatcher;
  ref$ = require('prelude-ls'), filter = ref$.filter, each = ref$.each;
  Dispatcher = (function(){
    Dispatcher.displayName = 'Dispatcher';
    var prototype = Dispatcher.prototype, constructor = Dispatcher;
    prototype._callbacks = [];
    prototype.on = function(action, callback){
      this._callbacks.push({
        id: this._callbacks.length + 1,
        action: action,
        callback: callback
      });
      return this._callbacks.length + 1;
    };
    prototype.clear = function(id){
      return this._callbacks = filter(function(it){
        return it.id === id;
      })(
      this._callbacks);
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
