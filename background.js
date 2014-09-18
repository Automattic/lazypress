/* global chrome */
var clippings = [],
	callbacks = [],
	url, title;

// This function is called onload in the popup code
function getPageInfo( callback ) {
	// Add the callback to the queue
	callbacks.push( callback );
	// Inject the content script into the current page
	chrome.tabs.executeScript(null, { file: 'content_script.js' });
}

function startAPost() {
	var html = getQuotes() + "\n\n" + getViaLink(),
		url = 'https://wordpress.com/post?text=' + encodeURIComponent( html );
	chrome.tabs.create({
		url: url
	});
	clippings = [];
}

function getQuotes() {
	var string = '';
	clippings.forEach(function( value ){
		string += '<blockquote>' + value + '</blockquote>' + "\n\n";
	});
	string = string.trim();
	return string;
}

function getViaLink() {
	return 'via <a href="' + url + '">' + title + '</a>';
}

function getClippings() {
	return clippings;
}

// Perform the callback when a request is received from the content script
chrome.runtime.onMessage.addListener(function(request)  {
	// Get the first callback in the callbacks array
	// and remove it from the array
	var callback = callbacks.shift();
	// add a clipping
	clippings.push( request.highlight );
	url = request.url;
	title = request.title;
	// badge
	chrome.browserAction.setBadgeText( {text: clippings.length.toString()});
	// Call the callback function
	callback( clippings, request );
});