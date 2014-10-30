(function(){
  var dispatcher;
  dispatcher = function(){
    return console.log('dispatcher created!');
  };
  module.exports = {
    VERSION: '0.0.0',
    Dispatcher: dispatcher
  };
}).call(this);
