Webr.WikiTextarea = function () {
};
Webr.WikiTextarea.addToolbarButton = function (textarea, text, src, pattern) {
  var userAgent = navigator.userAgent.toLowerCase();
  var is_ie = userAgent.indexOf("win") != -1 && userAgent.indexOf("msie") != -1;
  var is_gecko = userAgent.indexOf("gecko/") != -1;
  var parent = textarea.parentNode;
  var elements = parent.getElementsByTagName("div");
  var previousDiv = null;
  if (elements.length != 0) {
    previousDiv = elements.item(0);
  }

  if (previousDiv == null) {
    var newDiv = document.createElement("div");
    previousDiv = newDiv;
    textarea.parentNode.insertBefore(newDiv, textarea);
  }

  var targetDiv = textarea.previousSibling;
  var img = document.createElement("img");
  img.width = 30;
  img.height = 30;
  img.title = text;
  img.src = src;
  img.onclick = function () {
    if (is_gecko) {
      var len = textarea.textLength;
      var start = textarea.selectionStart;
      var end = textarea.selectionEnd;
      var value = textarea.value;
      var before = value.substring(0, start);
      var inside = value.substring(start, end);
      var after = value.substring(end, len);
      textarea.value = before + pattern.replace("$text$", inside) + after;
    }

    if (is_ie) {
      textarea.focus();
      var selection = document.selection;
      var range = selection.createRange();
      var selectedText = range.text;
      if (selectedText) {
        var r = selection.createRange();
        r.text = pattern.replace("$text$", selectedText);
      }

    }

  };
  targetDiv.appendChild(img);
};
