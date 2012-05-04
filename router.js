var create = require('./create'),
	options = require('./options'),
	parseUrl = require('./url').parse

module.exports = function(opts) {
	opts = options(opts, { prefix:'/', default:'/' })
	opts.prefix = new RegExp('^'+opts.prefix)
	return create(router, {
		routes:{},
		errorHandlers:[],
		opts:opts
	})
}

var router = {
	add:function(routeName, handler) {
		var route = this.routes
		var parts = routeName.split('/')
		if (parts[0] != '') { throw new Error('Route much start with "/": '+ routeName) }
		parts.shift()
		for (var i=0; i<parts.length; i++) {
			var name = parts[i]
			var isVariable = (name[0] == ':')
			var key = isVariable ? ':' : name
			if (i == parts.length - 1) {
				if (route[key]) {
					throw new Error("Conflicting route name: " + routeName)
				}
				route[key] = { handler:handler }
			} else if (isVariable) {
				route = route[key] = { __paramName:name }
			} else {
				route = route[key] = {}
			}
		}
		return this
	},
	error:function(handler) {
		this.errorHandlers.push(handler)
		return this
	},
	route:function(url) {
		url = parseUrl(url)
		var path = url.pathname
		if (this.opts.prefix) {
			path = path.replace(this.opts.prefix, '')
		}
		var params = url.getSearchParams()
		var route = this.routes
		var parts = path.split('/')
		parts.shift()
		for (var i=0; i<parts.length; i++) {
			var name = parts[i]
			if (!route[name]) { return this._onError(url) }
			route = route[name]
			if (route.__paramName) {
				params[route.__paramName] = name
			}
		}
		
		if (typeof route.handler != 'function') {
			this._onError(path)
		} else {
			route.handler(params)
		}
	},
	_onError:function(url) {
		this.errorHandlers.forEach(function(handler) { handler(url) })
	}
}
