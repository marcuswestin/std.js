var each = require('../each'),
  style = require('./style')

module.exports = function create(tag, properties, doc) {
	var element = (doc || document).createElement(tag)
  each(properties, function(val, key) {
    if (key == 'class') { key = 'className' }
    else if (key == 'html') { key = 'innerHTML' }
    else if (key == 'style') { style(element, val); return }
    element[key] = val
  })
	return element
}
