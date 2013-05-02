module.exports = rand

function rand(floor, ceil) {
	if (arguments.length == 1) { // an array
		return floor[rand(0, floor.length - 1)]
	} else {
		return Math.floor(Math.random() * (ceil - floor + 1)) + floor
	}
}