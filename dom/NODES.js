var Class = require('std/Class'),
  each = require('std/each'),
  slice = require('std/slice'),
  style = require('std/dom/style')

var NODES = module.exports

NODES.NODE = Class(function() {

  this._tag = null

  this.init = function(args) {
    this._args = args
  }

  this.toDOM = function(doc) {
    if (this._doc == doc) { return this._node }
    this._doc = doc
    var node = this._node = doc.createElement(this._tag),
      args = this._args

    if (typeof args[0] == 'string') {
      node.className = args[0]
      this._processArgs(node, doc, args, 1)
    } else {
      this._processArgs(node, doc, args, 0)
    }
    
    return node
  }
  
  this._processArgs = function(node, doc, args, index) {
    while (index < args.length) {
      var arg = args[index++]
      if (!arg) { continue }
      if (arg instanceof NODES.NODE) {
        node.appendChild(arg.toDOM(doc))
      } else if (typeof arg == 'string') {
        node.appendChild(doc.createTextNode(arg))
      // } else if (isArray(arg)) {
      } else {
        each(arg, function(val, key) {
          if (key == 'style') { style(node, val) }
          else { node[key] = val }
        })
      }
    }
  }

  this.appendTo = function(el) {
    return el.appendChild(this.toDOM(el.ownerDocument))
  }

})

NODES.TEXT = Class(NODES.NODE, function() {
  this.toDOM = function(doc) {
    var args = this._args,
      text = args.length > 1 ? slice(args).join(' ') : args[0]
    return doc.createTextNode(text)
  }
})

NODES.FRAGMENT = Class(NODES.NODE, function() {
  this.toDOM = function(doc) {
    var fragment = doc.createDocumentFragment()
    this._processArgs(fragment, doc, this._args, 0)
    return fragment
  } 
})

NODES.DIV = Class(NODES.NODE, function() { this._tag = 'div' })
NODES.SPAN = Class(NODES.NODE, function() { this._tag = 'div' })
NODES.IMG = Class(NODES.NODE, function() { this._tag = 'img' })
NODES.A = Class(NODES.NODE, function() { this._tag = 'a' })

NODES.exposeGlobals = function() {
  TEXT = function() { return new NODES.TEXT(arguments) }
  FRAGMENT = function() { return new NODES.FRAGMENT(arguments) }
  DIV = function() { return new NODES.DIV(arguments) }
  SPAN = function() { return new NODES.SPAN(arguments) }
  IMG = function() { return new NODES.IMG(arguments) }
  A = function() { return new NODES.A(arguments) }
}
