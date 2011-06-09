var slice = require('../slice'),
  invokeWith = require('../invokeWith')

module.exports = {
  
  init: function() {
    this.__publisher = {
      subscribers: []
    }
  },
  
  _publish: function(signal /*, arg1, arg2, ... */) {
    var curryArgs = slice(arguments, 1)
    console.log('pub 1')
    each(this.__publisher.subscribers[signal], invokeWith(curryArgs))
    console.log('pub 2')
  },
  
  subscribe: function(signal, callback) {
    var subscribers = this.__publisher.subscribers
    if (!subscribers[signal]) { subscribers[signal] = [] }
    subscribers[signal].push(callback)
  }
  
}