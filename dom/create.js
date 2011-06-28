var each = require('../each'),
  style = require('./style')

module.exports = function create(tag, properties, doc) {
	var element = (doc || document).createElement(tag)
  if (properties.html) { element.innerHTML = properties.html; delete properties.html }
  if (properties.style) { style(element, properties.style); delete properties.style }
  each(properties, function(val, key) { element[key] = val })
	return element
}
