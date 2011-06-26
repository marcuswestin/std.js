module.exports = function(element, styleProps) {
  var style = element.style
  each(styleProps, function(val, key) {
    if (typeof val == 'number') { val = val + 'px' }
    if (key == 'float') { key = 'cssFloat' }
    style[key] = val
  })
  return element
}