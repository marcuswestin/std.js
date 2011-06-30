var Class = require('std/Class')
  , each = require('std/each')
  , slice = require('std/slice')
  , style = require('std/dom/style')
  , isArguments = require('std/isArguments')

var NODES = module.exports

NODES.NODE = Class(function() {

  this._tag = null

  this.init = function(args) {
    this._args = args
  }

  this.render = function(doc) {
    if (this._doc == doc) { return this._el }
    if (this._el) { this.unrender() }

    this._doc = doc
    this._el = doc.createElement(this._tag)

    var args = this._args
      , node = this._el
    if (typeof args[0] == 'string') {
      node.className = args[0]
      this._processArgs(args, 1)
    } else {
      this._processArgs(args, 0)
    }

    return this._el
  }

  this.getDocument = function() { return this._doc }
  this.getElement = function() { return this._el }
  
  this.style = function(styles) { style(this._el, styles); return this }
  this.opacity = function(opacity) { style.opacity(this._el, opacity); return this }

  this._processArgs = function(args, index) {
    while (index < args.length) {
      this._processArg(args[index++])
    }
  }

  this._processArg = function(arg) {
    if (!arg) { return }
    var node = this._el
      , doc = this._doc
    if (typeof arg.render == 'function') {
      node.appendChild(arg.render(doc))
    } else if (typeof arg == 'string') {
      node.appendChild(doc.createTextNode(arg))
    } else if (arg instanceof HTMLElement) {
      node.appendChild(arg)
    } else {
      each(arg, function(val, key) {
        if (key == 'style') { style(node, val) }
        else { node[key] = val }
      })
    }
  }

  this.append = function() {
    if (this._el) {
      this._processArgs(arguments, 0)
    } else {
      if (isArguments(this._args)) { this._args = slice(this._args) } // We delay the call to slice, since it may not be neccesary
      this._args = this._args.concat(slice(arguments))
    }
    return this
  }

  this.appendTo = function(node) {
    var el = (node.getElement ? node.getElement() : node)
    el.appendChild(this.render(node.ownerDocument || node.getDocument()))
    return this
  }
})

NODES.TEXT = Class(NODES.NODE, function() {
  this.render = function(doc) {
    var args = this._args
      , text = args.length > 1 ? slice(args).join(' ') : args[0]
    return doc.createTextNode(text)
  }
})

NODES.FRAGMENT = Class(NODES.NODE, function() {
  this.render = function(doc) {
    this._el = doc.createDocumentFragment()
    this._processArgs(this._args, 0)
    return this._el
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
