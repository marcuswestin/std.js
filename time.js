var curry = require('./curry')
var slice = require('./slice')
var each = require('./each')

var msTime = module.exports = timeWithBase(1) // millisecond

function inNanoseconds() { return timeWithBase(msTime.nanoseconds) }
function inMicroseconds() { return timeWithBase(msTime.milliseconds) }
function inMilliseconds() { return timeWithBase(msTime.milliseconds) }
function inSeconds() { return timeWithBase(msTime.seconds) }
function inMinutes() { return timeWithBase(msTime.minutes) }
function inHours() { return timeWithBase(msTime.hours) }
function inDays() { return timeWithBase(msTime.days) }
function inWeeks() { return timeWithBase(msTime.weeks) }

function timeWithBase(base) {
	var farFuture = now() + 3000000000
	var distantPast = 1
	
	var time = {
		base: base,
		now: now,
		ago: ago,
		ofDay12Hour: ofDay12Hour,
		ofDay24Hour: ofDay24Hour,
		// for creating instances of time in a different base
		inNanoseconds: inNanoseconds,
		inMicroseconds: inMicroseconds,
		inMilliseconds: inMilliseconds,
		inSeconds: inSeconds,
		inMinutes: inMinutes,
		inHours: inHours,
		inDays: inDays,
		inWeeks: inWeeks,
		// utc vs local time
		getLocalTime: getLocalTime,
		getLocalTimeOfDay: getLocalTimeOfDay,
		getLocalDay: getLocalDay,
		getLocalHourOfDay: getLocalHourOfDay,
		untilLocalTimeOfDay: untilLocalTimeOfDay,
		// helpers
		farFuture: farFuture,
		distantFuture: farFuture,
		distantPast: distantPast,
		farPast: distantPast
	}

	function getLocalTime(utcTime, utcOffset) { return utcTime + utcOffset * time.minutes }
	function getLocalTimeOfDay(utcTime, utcOffset) { return getLocalTime(utcTime, utcOffset) % time.day }
	function getLocalDay(utcTime, utcOffset) { return Math.floor(getLocalTime(utcTime, utcOffset) / time.day) }
	function getLocalHourOfDay(utcTime, utcOffset) { return Math.floor(getLocalTime(utcTime, utcOffset) / time.hour) % 24 }
	function getLocalMinute(utcTime, utcOffset) { return Math.floor(getLocalTime(utcTime, utcOffset) / time.minute) % 60 }
	function untilLocalTimeOfDay(utcTime, utcOffset, timeOfDay) {
		var targetLocalTimeOfDay = (timeOfDay % time.day)
		var difference = (targetLocalTimeOfDay - getLocalTimeOfDay(utcTime, utcOffset))
		return (difference < 0 ? time.day + difference : difference)
	}
	
	time.millisecond = time.milliseconds = 1 / base // millisecond is JS native
	// Bigger
	time.second = time.seconds = 1000 * time.millisecond
	time.minute = time.minutes = 60 * time.second
	time.hour = time.hours = 60 * time.minute
	time.day = time.days = 24 * time.hour
	time.week = time.weeks = 7 * time.day
	// Smaller
	time.microsecond = time.microseconds = time.millisecond / 1000
	time.nanosecond = time.nanoseconds = time.microsecond / 1000

	function now(_base) { return Math.round(new Date().getTime() / (_base || base)) }

	function ofDay24Hour(utcTime, utcOffset) {
		return _pad(getLocalHourOfDay(utcTime, utcOffset)+1)+':'+_pad(getLocalMinute(utcTime, utcOffset))
	}

	function ofDay12Hour(utcTime, utcOffset) {
		var localHour = getLocalHourOfDay(utcTime, utcOffset)
		var displayHour = (localHour == 12 ? 12 : localHour % 12)
		var AM_PM = (localHour < 12 ? 'am' : 'pm')
		return displayHour + ':' + _pad(getLocalMinute(utcTime, utcOffset))+' '+AM_PM
	}
	
	function _pad(num) { return num < 10 ? '0'+num : num }

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
		Infinity, '%N weeks ago', [time.week])

	ago.precise = _stepFunction(
		time.minute, '%N seconds ago', [time.second],
		time.hour, '%N minutes, %N seconds ago', [time.minute, time.second],
		time.day, '%N hours, %N minutes ago', [time.hour, time.minute],
		time.week, '%N days, %N hours ago', [time.day, time.hour],
		Infinity, '%N weeks, %N days ago', [time.week, time.day])

	ago.brief = _stepFunction(
		20 * time.second, 'now', null,
		time.minute, '1 min', null,
		time.hour, '%N min', [time.minute],
		2 * time.hour, '1 hr', null,
		time.day, '%N hrs', [time.hour],
		time.day * 2, '1 day', null,
		time.week, '%N days', [time.day],
		2 * time.week, '1 week', null,
		30 * time.day, '%N weeks', [time.week],
		60 * time.day, '1 month', null,
		Infinity, '%N months', [time.day * 30])

	ago.days = _stepFunction(
		time.day, 'Today', null,
		time.day * 2, 'Yesterday', null,
		time.week, '%N days ago', [time.day],
		time.week * 2, 'Last week', null,
		30 * time.day, '%N weeks ago', [time.week],
		60 * time.day, 'Last month', null,
		365 * time.day, '%N months ago', [time.day * 30],
		365 * time.day * 2, 'Last year', null,
		Infinity, '%N years ago', [time.day * 365]
	)

	var MAX_TIMEOUT_VALUE = 2147483647
	function _stepFunction() {
		var steps = arguments
		var stepFn = function(basedTimestamp, yield) {
			var timeAgo = (now() - basedTimestamp)
			var millisecondsAgo = timeAgo * base
			if (timeAgo < 0) {
				setTimeout(curry(stepFn, basedTimestamp, yield), -millisecondsAgo + 1)
				yield && yield('future')
				return 'future'
			}
			for (var i=0; i<steps.length; i+=3) {
				if (timeAgo > steps[i]) { continue }
				var result = _getStepResult(timeAgo, steps, i)
				if (yield) {
					yield(result.payload)
					if (result.smallestGranularity) {
						var timeoutIn = result.smallestGranularity - (timeAgo % result.smallestGranularity)
						var timeoutInMs = Math.min(timeoutIn*base, MAX_TIMEOUT_VALUE)
						setTimeout(curry(stepFn, basedTimestamp, yield), timeoutInMs)
					}
				}
				return result.payload
			}
			return _getStepResult(millisecondsAgo, steps, i - 3).payload // the last one
		}
		return stepFn
	}

	function _getStepResult(timeAgo, steps, i) {
		var stepSize = steps[i]
		var stepPayload = steps[i+1]
		var stepGranularities = steps[i+2]
		var smallestGranularity = stepSize
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

	return time
}
