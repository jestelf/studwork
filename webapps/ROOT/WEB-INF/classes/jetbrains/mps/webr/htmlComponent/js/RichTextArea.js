Webr.component.RichTextArea = function (element) {
  this.frameElement = $(element);
  $(element).data(Webr.component.ComponentRegistry.COMPONENT_INSTANCE, this);
  this.iframeInitialization();
};
Webr.component.RichTextArea.prototype.iframeInitialization = function () {
  var value = this.frameElement.attr("_valueId");
  this.iframeDocument = this.designModeOn();
  if (value) {
    this.setDefaultText(value);
  }

  this.appendStylesheet();
};
Webr.component.RichTextArea.prototype.designModeOn = function () {
  var iframe = this.frameElement.get(0);
  var iframeDocument;
  iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
  if (iframeDocument) {
    iframeDocument.designMode = "on";
    if (!Webr.util.Util.isIE) {
      iframeDocument.body.contentEditable = true;
    }

    iframeDocument.open();
    iframeDocument.write("");
    iframeDocument.close();
    return iframeDocument;
  }

};
Webr.component.RichTextArea.prototype.setDefaultText = function (text) {
  this.iframeDocument.body.appendChild(this.iframeDocument.createTextNode(text));
};
Webr.component.RichTextArea.prototype.appendStylesheet = function () {
  var element = $(this.iframeDocument.createElement("link"));
  var href = "${getClasspathUri("jetbrains/mps/webr/htmlComponent/css/richTextArea.css")}";
  element.attr("type", "text/css");
  element.attr("rel", "stylesheet");
  element.attr("media", "screen");
  element.attr("href", href);
  this.frameElement.contents().find("head").append(element);
};
Webr.component.RichTextArea.prototype.createRangeObject = function (rootElement) {
  if (rootElement.createRange) {
    return rootElement.createRange();
  } else {
    if (rootElement.createTextRange != undefined) {
      return rootElement.createTextRange();
    }

  }

};
Webr.component.RichTextArea.prototype.setClassAttribute = function (start, offset, className) {
  var _START = undefined;
  var _END = undefined;
  var range;
  var root = this.iframeDocument.body;
  var totalLenght = 0;
  var currNode = undefined;
  for (var i = 0; root.childNodes.length; ++i) {
    if (root.childNodes.item(i).nodeType == 3) {
      currNode = root.childNodes.item(i);
    } else {
      currNode = root.childNodes.item(i).firstChild;
    }

    totalLenght += currNode.nodeValue != null ?currNode.nodeValue.length :currNode.firstChild.nodeValue.length;
    if (start < totalLenght) {
      if (_START == undefined) {
        _START = {node: currNode, pos: start - totalLenght + currNode.nodeValue.length};
      }

    }

    if ((start + offset) < totalLenght) {
      _END = {node: currNode, pos: start + offset - totalLenght + currNode.nodeValue.length};
            break;

    }

  }

  if (!Webr.util.Util.isIE) {
    range = this.createRangeObject(this.iframeDocument);
    range.setStart(_START.node, _START.pos);
    range.setEnd(_END.node, _END.pos);
    var el = this.iframeDocument.createElement("span");
    el.setAttribute("class", className);
    range.surroundContents(el);
    range.detach();
  } else {
    range = this.createRangeObject(root);
    var textFragment = root.innerText;
    textFragment = textFragment.substring(start, start + offset);
    if (range.findText(textFragment)) {
      range.pasteHTML("<span class='" + className + "'>" + range.text);
    }

  }

};
Webr.component.RichTextArea.prototype.oncaretmove = function (caretPos, value) {
};
Webr.component.RichTextArea.prototype.onvaluechange = function (caretPos, value) {
};
Webr.component.RichTextArea.registerRichTextArea = function (path, suffixName) {
  cr.forEach(path, suffixName, function () {
    var rta = new Webr.component.RichTextArea(this);
  });
};
var regrta = Webr.component.RichTextArea.registerRichTextArea;
