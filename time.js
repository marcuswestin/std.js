var curry = require('./curry'),
	slice = require('./slice'),
	each = require('./each')

var time = module.exports = {
	now: now,
	ago: ago
}

time.second = time.seconds = 1000
time.minute = time.minutes = 60 * time.second
time.hour = time.hours = 60 * time.minute
time.day = time.days = 24 * time.hour
time.week = time.weeks = 7 * time.day

function now() { return new Date().getTime() }

function ago(ts, yield) { return ago.stepFunction(ts, yield) }
ago.stepFunction = _stepFunction(
	10 * time.second, 'just now', null,
	time.minute, 'less than a minute ago', null,
	2 * time.minute, 'one minute ago', null,
	time.hour, '%N minutes ago', [time.minute],
	2 * time.hour, 'one hour ago', null,
	time.day, '%N hours ago', [time.hour],
	time.day * 2, 'one day ago', null,
	time.week, '%N days ago', [time.day],
	2 * time.week, '1 week ago', [time.week],
	0, '%N weeks ago', [time.week])

ago.precise = _stepFunction(
	time.minute, '%N seconds ago', [time.second],
	time.hour, '%N minutes, %N seconds ago', [time.minute, time.second],
	time.day, '%N hours, %N minutes ago', [time.hour, time.minute],
	time.week, '%N days, %N hours ago', [time.day, time.hour],
	0, '%N weeks, %N days ago', [time.week, time.day])

ago.brief = _stepFunction(
	20 * time.second, 'now', null,
	time.minute, '1 min', null,
	time.hour, '%N min', [time.minute],
	2 * time.hour, '1 hr', null,
	time.day, '%N hrs', [time.hour],
	time.day * 2, '1 day', null,
	time.week, '%N days', [time.day],
	2 * time.week, '1 week', [time.week],
	0, '%N weeks', [time.week])



function _stepFunction() {
	var steps = arguments
	var stepFn = function(ts, yield) {
		var timeAgo = time.now() - ts
		for (var i=0; i < steps.length; i+=3) {
			if (timeAgo > steps[i]) { continue }
			var result = _getStepResult(timeAgo, steps, i)
			if (yield) {
				yield(result.payload)
				if (result.smallestGranularity) {
					setTimeout(curry(stepFn, ts, yield), result.smallestGranularity)
				}
			}
			return result.payload
		}
		return _getStepResult(timeAgo, steps, i - 3).payload // the last one
	}
	return stepFn
}

function _getStepResult(timeAgo, steps, i) {
	var stepSize = steps[i]
	var stepPayload = steps[i+1]
	var stepGranularities = steps[i+2]
	var smallestGranularity = Number.MAX_VALUE
	var untakenTime = timeAgo
	each(stepGranularities, function(granularity) {
		var granAmount = Math.floor(untakenTime / granularity)
		untakenTime -= granAmount * granularity
		stepPayload = stepPayload.replace('%N', granAmount)
		if (granularity < smallestGranularity) {
			smallestGranularity = granularity
		}
	})
	return { payload:stepPayload, smallestGranularity:smallestGranularity }
}