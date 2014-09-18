/* global chrome */
chrome.runtime.sendMessage({
	title: document.title,
	url: document.location.href,
	highlight: window.getSelection().toString()
});