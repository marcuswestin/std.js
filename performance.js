// https://gist.github.com/paulirish/5438650

// relies on Date.now() which has been supported everywhere modern for years.
// as Safari 6 doesn't have support for NavigationTiming, we use a Date.now() timestamp for relative values

(function(){
	// prepare base perf object
	if (typeof window.performance === 'undefined') {
		window.performance = {};
	}
	
	if (!window.performance.now){
		
		var nowOffset = Date.now();
		
		if (performance.timing && performance.timing){
			nowOffset = performance.timing.navigationStart
		}
		
		
		window.performance.now = function now(){
			return Date.now() - nowOffset;
		}
		
	}
	
})();
