// Thanks Douglas Crockford! http://javascript.crockford.com/prototypal.html
module.exports = function create(obj) {
  if (typeof Object.create == 'function') {
    module.exports = function nativeCreate(obj) {
      return Object.create(obj)
    }
  } else {
    module.exports = function shimCreate(obj) {
      function F() {}
      F.prototype = obj
      return new F()
    }
  }
  return module.exports(obj)
}
