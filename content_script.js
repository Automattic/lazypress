function getSelectionText() {
	var text = false;
	if (window.getSelection) {
		text = window.getSelection().toString();
	} else if (document.selection && document.selection.type != "Control") {
		text = document.selection.createRange().text;
	}
	if ( text === '' ) {
	  return false;
	}
	return text;
}