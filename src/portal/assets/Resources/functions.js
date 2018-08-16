/*  
		Functions.js
			functions.js is place a place for commonly used and flexible functions.
			These functions should be able to be used for multiple cases and be able
			to be very flexible.
*/


/**
 * Remove item from array
 */
Array.prototype.remove = function (item) {
	if (this.includes(item)) {
		var index = this.indexOf(item);
		if (index !== -1) this.splice(index, 1);
	}
}

String.prototype.insert = function (index, string) {
	if (index > 0)
		return this.substring(0, index) + string + this.substring(index, this.length);
	else
		return string + this;
};

/**
 * Expanding textarea
 */
function initAutoResizeTextArea(textarea) {
	textarea.addEventListener('input', autosize);
	setInterval(autosize, 1000);
	autosize();
	function autosize() {
		var el = textarea;
		setTimeout(function () {
			if (el.style != undefined) {
				el.style.overflow = "hidden";
				el.style.height = "auto";
				el.style.height = el.scrollHeight + 'px';
			}
		}, 0);
	}
}

/**
 * JSON Contains
 */
function jsoncontains (json, value) {
	for (key in json) {
		if (typeof (json[key]) === "object") {}
		else if (json[key] === value) {
			return true;
		}
	}
	return false;
}

/**
 * 2d Collision
 */
function pointInBox(px, py, bx, by, bw, bh) {
	if ((px >= bx && px <= bx + bw) && (py >= by && py <= by + bh))
		return true;
	else
		return false;
}

/**
 * Real Position of element on screen
 */
function realPosition(element) {
	var bodyRect = document.body.getBoundingClientRect(),
		elemRect = element.getBoundingClientRect();
	return { left: elemRect.left - bodyRect.left, top: elemRect.top - bodyRect.top, bottom: elemRect.bottom - bodyRect.bottom, right: elemRect.right - bodyRect.right };
}

/**
 * Find Object In Array By Value of Certain Key
 */
function findObjectByKey(array, key, value) {
	for (var i = 0; i < array.length; i++) {
		if (array[i][key] === value) {
			return array[i];
		}
	}
	return null;
}

/**
 * Find if valid/exists
 */
function stringEV(str) {
	if (str == undefined || str == null || str == "")
		return false;
	else
		return true;
}
function stringUnNull(str) {
	if (str == undefined || str == null)
		return "";
	else
		return str;
}

/**
 * String JSON Reference
 */
function refByString(theObject, path, separator) {
	try {
		separator = separator || '\\';

		return path.
			replace('[', separator).replace(']', '').
			split(separator).
			reduce(
			function (obj, property) {
				return obj[property];
			}, theObject
			);

	} catch (err) {
		return undefined;
	}
}

/**
 * Setting data in a json object by a reference like "folder1/folder2"
 * @param {any} obj The object to set the data in
 * @param {any} path The reference like "folder1/folder2"
 * @param {any} key The key of to set new data
 * @param {any} value The Value to set new data
 */
function pushDataToJsonByDotnot(obj, path, key, value) {
	if (!obj)
		obj = {};
	if (stringUnNull(path) == "") {
		obj[key] = value;
	}
	else {
		var pdtjbd_data = dotnot(obj, path);
		pdtjbd_data[key] = value;
		dotnot(obj, path, pdtjbd_data);
	}
	return obj;
}
function dotnot(obj, is, value) {
	if (typeof is == 'string')
		return dotnot(obj, is.split('\\'), value);
	else if (is.length == 1 && value !== undefined)
		return obj[is[0]] = value;
	else if (is.length == 0)
		return obj;
	else
		return dotnot(obj[is[0]], is.slice(1), value);
}

function deleteDataFromJsonByDotnot(obj, path, key) {
	if (!obj)
		return {};
	if (stringUnNull(path) == "") {
		delete obj[key];
	}
	else {
		var pdtjbd_data = dotnot(obj, path);
		delete pdtjbd_data[key];
		dotnot(obj, path, pdtjbd_data);
	}
	return obj;
}

/**
 * Find the index of first difference in two strings
 */
function findFirstDiffPos(a, b) {
	if (a.length < b.length)[a, b] = [b, a];
	return [...a].findIndex((chr, i) => chr !== b[i]);
}

//console logging addons
console.logg = function (title) {
	var prnt = [(title + ": [ ")];
	prnt.concat(arguments);
	prnt.push(" ]");
	console.log.apply(this, prnt);
	return prnt;
};

/**
 * Guid generates a random uuid quickly
 */
function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


/**
 * Finds the differences in two objects
 */
function findObjectDifferences(a, b) {
	var diff = [ ];
	for (var i = 0; i < Object.keys(a).length; i++) {
		if (a[Object.keys(a)[i]] != b[Object.keys(a)[i]] && diff.indexOf(Object.keys(a)[i]) == -1)
			diff.push(Object.keys(a)[i]);
	}
	for (var i = 0; i < Object.keys(b).length; i++) {
		if (b[Object.keys(b)[i]] != a[Object.keys(b)[i]] && diff.indexOf(Object.keys(b)[i]) == -1)
			diff.push(Object.keys(b)[i]);
	}
	return diff;
}

String.prototype.allIndexesOf = function (substring){
	var a = [], i = -1;
	while ((i = this.indexOf(substring, i + 1)) >= 0) a.push(i);
	return a;
}

function findCurrentWord(string, index) {
	var a = string.split(" "), b = 0;
	for (var i = 0; i < a.length; i++) {
		b += a[i].length + 1;
		if (b > index) {
			return { word: a[i], start: b, end: b - a[i].length };
		}
	}
}

function replaceCurrentWord(string, index, val) {
	var a = string.split(" "), b = 0;
	for (var i = 0; i < a.length; i++) {
		b += a[i].length + 1;
		if (b > index) {
			a[i] = val;
			return a.join(" ");
		}
	}
	return string;
}

function getRelativeParentOffset(el) {
	var iel = 0;
	var ret = { left: 0, top: 0 };
	while (el) {
		iel++;
		el = el.parentNode;
		try {
			if (window.getComputedStyle(el).getPropertyValue('position') == "relative") {
				ret.left += el.getBoundingClientRect().left;
				ret.top += el.getBoundingClientRect().top;
			}
		} catch (err) { }
		if (iel > 200) el = undefined;
	}
	return ret;
}

//Clamping, Min, Maxing and Overflowing
Number.prototype.min = function (val) {
	return this < val ? val : this;
};
Number.prototype.max = function (val) {
	return this > val ? val : this;
};
Number.prototype.clamp = function (min, max) {
	return this > max ? max : (this < min ? min : this);
};
/**
 * Kinda Sketchy...
 */
Number.prototype.overflow = function (min, max) {
	if (this < min) {
		return max + (this - 1 + min + max) % (Math.abs(max) + Math.abs(min) + (min == 0 ? 1 : 0));
	}
	else if (this > max) {
		return min + (this + (Math.abs(max) + Math.abs(min) - max)) % (Math.abs(max) + Math.abs(min) + 1);
	}
	return Number(this);
};

//For Removing The Elements
Element.prototype.clear = function () {
	while (this.firstChild) {
		this.removeChild(this.firstChild);
	}
}

//Find Nested Key
function findNestedKey(o, id) {
	var result, p;
	//Filter Through Children
	for (var i = 0; i < Object.keys(o).length; i++) {
		p = Object.keys(o)[i];
		if (p == id) { return o[p]; }
		//If Child Is Object Recur Through It
		if (o.hasOwnProperty(p) && typeof o[p] === 'object') {
			result = findNestedKey(o[p], id);
			if (result) {
				return result;
			}
		}
	}
	return result;
}

Array.prototype.diff = function (a) {
	return this.filter(function (i) { return a.indexOf(i) < 0; });
};


Number.prototype.addOrdinal = function () {
	var s = ["th", "st", "nd", "rd"],
		v = this % 100;
	return this + (s[(v - 20) % 10] || s[v] || s[0]);
}

var SHP_Timeout; 
function SHP(b) {
	var a = event.srcElement;
	clearTimeout(SHP_Timeout);
	b.type = "visibility_off" != a.innerHTML ? "password" : "text";
	a.parentNode.style.transform = "scale(0.4)";
	SHP_Timeout = setTimeout(function () {
		a.innerHTML = "visibility_off" == a.innerHTML ? "visibility" : "visibility_off";
		a.parentNode.style.transform = "scale(1)"
	}, 150)
}

function is_touch_device() {
	var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
	var mq = function (query) {
		return window.matchMedia(query).matches;
	}

	if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
		return true;
	}

	// include the 'heartz' as a way to have a non matching MQ to help terminate the join
	// https://git.io/vznFH
	var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
	return mq(query);
}

function GetAllNestedKeys(obj) {
	function getKeysClosure(obj) {
		var all = {};
		var seen = [];
		checkValue(obj);
		return Object.keys(all);
		function checkValue(value) {
			if (Array.isArray(value)) return checkArray(value);
			if (value instanceof Object) return checkObject(value);
		}
		function checkArray(array) {
			if (seen.indexOf(array) >= 0) return;
			seen.push(array);
			for (var i = 0, l = array.length; i < l; i++) {
				checkValue(array[i]);
			}
		}
		function checkObject(obj) {
			if (seen.indexOf(obj) >= 0) return;
			seen.push(obj);
			var keys = Object.keys(obj);
			for (var i = 0, l = keys.length; i < l; i++) {
				var key = keys[i];
				all[key] = true;
				checkValue(obj[key]);
			}
		}
	}

	function getKeys(obj) {
		var all = {};
		var seen = [];
		checkValue(obj, all, seen);
		return Object.keys(all);
	}

	function checkValue(value, all, seen) {
		if (Array.isArray(value)) return checkArray(value, all, seen);
		if (value instanceof Object) return checkObject(value, all, seen);
	}
	function checkArray(array, all, seen) {
		if (seen.indexOf(array) >= 0) return;
		seen.push(array);
		for (var i = 0, l = array.length; i < l; i++) {
			checkValue(array[i], all, seen);
		}
	}
	function checkObject(obj, all, seen) {
		if (seen.indexOf(obj) >= 0) return;
		seen.push(obj);
		var keys = Object.keys(obj);
		for (var i = 0, l = keys.length; i < l; i++) {
			var key = keys[i];
			all[key] = true;
			checkValue(obj[key], all, seen);
		}
	}

	function getKeys(obj) {
		var all = {};
		var seen = [];
		checkValue(obj, all, seen);
		return Object.keys(all);
	}

	function checkValue(value, all, seen) {
		if (Array.isArray(value)) return checkArray(value, all, seen);
		if (value instanceof Object) return checkObject(value, all, seen);
	}
	function checkArray(array, all, seen) {
		if (seen.indexOf(array) >= 0) return;
		seen.push(array);
		for (var i = 0, l = array.length; i < l; i++) {
			checkValue(array[i], all, seen);
		}
	}
	function checkObject(obj, all, seen) {
		if (seen.indexOf(obj) >= 0) return;
		seen.push(obj);
		var keys = Object.keys(obj);
		for (var i = 0, l = keys.length; i < l; i++) {
			var key = keys[i];
			all[key] = true;
			checkValue(obj[key], all, seen);
		}
	}
	return getKeysClosure(obj);
}

Date.prototype.addDays = function (days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}

