var $ = jQuery,
	list;

function onPageInfo( clippings, pageData )  {
	render( clippings );
}

function render( clippings ) {
	var html = '';
	clippings.forEach(function(clipping){
		html += '<li>' + clipping + '</li>';
	});
	list.html( html );
}

function startAPost() {
	chrome.extension.getBackgroundPage().startAPost();
}

$( window ).load(function(){
	var clippings = chrome.extension.getBackgroundPage().getClippings();
	list = $( '.quotes' );
	render( clippings );
	chrome.extension.getBackgroundPage().getPageInfo( onPageInfo );

	$( '.post' ).click( startAPost );
});