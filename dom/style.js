var client = require('../client')

module.exports = function(element, styleProps) {
  var style = element.style
  each(styleProps, function(val, key) {
    if (typeof val == 'number') { val = val + 'px' }
    else if (key == 'float') { key = 'cssFloat' }
    else if (module.exports.prefixed[key]) { key = module.exports.prefix + key }
    style[key] = val
  })
  return element
}

module.exports.prefix = 
  client.isFirefox ? '-moz-' :
  client.isWebKit ? '-webkit-' :
  null

module.exports.prefixed = {
  // 'boxShadow':true,
  'borderRadius':true,
  'transition':true
}

module.exports.opacity = function(el, fraction) {
  if (client.isIE && client.version <= 8) {
    module.exports.opacity = function(el, fraction) {
      el.style.filter = 'alpha(opacity=' + Math.round(fraction * 100) + ')'
    }
  } else {
    module.exports.opacity = function(el, fraction) {
      el.style.opacity = fraction
      el.style.MozOpacity = fraction
      el.style.KhtmlOpacity = fraction
    }
  }
  module.exports.opacity(el, fraction)
}
