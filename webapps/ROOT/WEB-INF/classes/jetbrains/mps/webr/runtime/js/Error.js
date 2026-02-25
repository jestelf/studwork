Webr.StyleUtil = function () {
};
Webr.StyleUtil.hasClass = function (element, styleClass) {
  var wsClassName = " " + element.className + " ";
  var wsStyleClass = " " + styleClass + " ";
  return wsClassName.indexOf(wsStyleClass) != -1;
};
Webr.StyleUtil.addClass = function (element, styleClass) {
  if (!Webr.StyleUtil.hasClass(element, styleClass)) {
    element.className = element.className + " " + styleClass;
  }

};
Webr.StyleUtil.removeClass = function (element, stylePattern) {
  element.className = element.className.replace(stylePattern, " ");
};
Webr.StyleUtil.toggleClass = function (element, styleClass, stylePattern) {
  if (Webr.StyleUtil.hasClass(element, styleClass)) {
    if (stylePattern == null) {
      stylePattern = Webr.StyleUtil.createStylePattern(styleClass);
    }

    Webr.StyleUtil.removeClass(element, stylePattern);
  } else {
    Webr.StyleUtil.addClass(element, styleClass);
  }

};
Webr.StyleUtil.createStylePattern = function (styleClass) {
  return new RegExp("(?:^|\\s+)" + styleClass + "(?:\\s+|$)", "g");
};
Webr.ErrorMessage = function (message, severity, inputName, propertyName) {
  this.message = message;
  this.inputName = inputName;
  this.severity = severity;
  this.propertyName = propertyName;
};
Webr.ErrorMessage.ERROR = "error";
Webr.ErrorMessage.INFO = "info";
Webr.ErrorMessage.errorMessages = [];
Webr.ErrorMessage.addMessage = function (message, severity, inputName, propertyName) {
  var input;
  if (inputName) {
    input = Webr.Component.get(inputName);
  }

  var newErrorMessage = new Webr.ErrorMessage(message, severity, inputName, propertyName);
  Webr.ErrorMessage.errorMessages.push(newErrorMessage);
  newErrorMessage.labelHighlighter = Webr.LabelHighlighter.highlightLabel(inputName);
  Webr.ErrorMessage.showErrorAlert();
};
Webr.ErrorMessage.clearErrorMessages = function () {
  var msgs = Webr.ErrorMessage.errorMessages;
  for (var i = 0; i < msgs.length; i += 1) {
    Webr.LabelHighlighter.unhighlightLabel(msgs[i].labelHighlighter);
  }

  Webr.ErrorMessage.errorMessages = [];
};
Webr.ErrorMessage.closePopup = function () {
  if (Webr.ErrorMessage.POPUP) {
    Webr.ErrorMessage.POPUP.hide();
  }

};
Webr.ErrorMessage.createErrorMessageHtml = function () {
  var messageHtml = "";
  for (var i = 0; i < Webr.ErrorMessage.errorMessages.length; i += 1) {
    var propertyName = "";
    if (Webr.ErrorMessage.errorMessages[i].labelHighlighter) {
      propertyName = ": <b>" + Webr.ErrorMessage.errorMessages[i].labelHighlighter.label.innerHTML + "</b>";
    } else {
      if (Webr.ErrorMessage.errorMessages[i].propertyName) {
        propertyName = ": <b>" + Webr.ErrorMessage.errorMessages[i].propertyName + "</b>";
      }

    }

    messageHtml += "<li class=\"" + Webr.ErrorMessage.errorMessages[i].severity + "\">" + Webr.ErrorMessage.errorMessages[i].message + propertyName + "</li>";
  }

  return messageHtml;
};
Webr.ErrorMessage.showErrorAlert = function () {
  var messageHtml = Webr.ErrorMessage.createErrorMessageHtml();
  if (!Webr.ErrorMessage.POPUP) {
    Webr.ErrorMessage.POPUP = new Webr.event.PopupMessage({styleClass: "error", closable: true, onClose: Webr.ErrorMessage.clearErrorMessages});
  }

  Webr.ErrorMessage.POPUP.show(messageHtml);
};
Webr.LabelHighlighter = function () {
};
Webr.LabelHighlighter.ERROR_STYLE_CLASS = "has-error";
Webr.LabelHighlighter.ERROR_CLASS_PATTERN = Webr.StyleUtil.createStylePattern(Webr.LabelHighlighter.ERROR_STYLE_CLASS);
Webr.LabelHighlighter.highlightLabel = function (inputName) {
  if (inputName) {
    var labels = document.getElementsByTagName("label");
    for (var i = 0; i < labels.length; i += 1) {
      var label = labels.item(i);
      var forInputId = label.htmlFor;
      if (forInputId && forInputId != "") {
        var input = document.getElementById(forInputId);
        if (input && input.tagName.toLowerCase() != "input") {
          input = $(input).find("input").get(0);
        }

        if (input && input.getAttribute("name") == inputName) {
          var labelHighlighter = new Webr.LabelHighlighter();
          labelHighlighter.label = label;
          Webr.StyleUtil.addClass(labelHighlighter.label, Webr.LabelHighlighter.ERROR_STYLE_CLASS);
          return labelHighlighter;
        }

      }

    }

  }

  return null;
};
Webr.LabelHighlighter.unhighlightLabel = function (labelHighlighter) {
  if (labelHighlighter) {
    Webr.StyleUtil.removeClass(labelHighlighter.label, Webr.LabelHighlighter.ERROR_CLASS_PATTERN);
    labelHighlighter.label = null;
  }

};
