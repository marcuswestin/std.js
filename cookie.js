module.exports = {
	get: get
}

function get(name) {
	var regex = new RegExp(
		'(^|(; ))' + // beginning of document.cookie, or "; " which signifies the beginning of a new cookie
		name +
		'=([^;]*)') // the value of the cookie, matched up until a ";" or the end of the string
	var match = document.cookie.match(regex)
	return match && match[3]
}
