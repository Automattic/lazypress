/* global chrome */
var highlight = window.getSelection().toString();

if ( highlight.length > 2 ) {
		chrome.runtime.sendMessage({
			title: document.title,
			url: document.location.href,
			highlight: highlight
	});
}
