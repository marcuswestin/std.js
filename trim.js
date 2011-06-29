module.exports = function(str) {
	return str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '')
}