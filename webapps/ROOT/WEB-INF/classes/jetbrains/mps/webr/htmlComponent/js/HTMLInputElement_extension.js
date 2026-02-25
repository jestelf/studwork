cr.registerExtension("input", "HTMLInputElement");
cr.registerExtension("textarea", "HTMLTextAreaElement");
HTMLInputElement.prototype.highlight = function (message, position, dismissOnChange, focus) {
  $(this).addClass("form-has-error");
  if (dismissOnChange) {
    this.attachWatcher(true);
    $(this).one("valuechange", HTMLInputElement.dismissOnValueChange);
  }

  if (message) {
    if (this.errorDiv == null) {
      var tooltipElement = document.createElement("div");
      $(tooltipElement).text(message).addClass("error-tooltip");
      var errorDiv = document.createElement("div");
      var eOffset = $(this).offset();
      //don't change html() to text(), otherwise in IE this div is unclosed
      this.errorDiv = $(errorDiv).html("&nbsp;");
      this.tooltip = new Webr.component.ToolTip(errorDiv, tooltipElement, false, false);
      this.errorDiv.addClass("error-bulb").insertAfter(this);
    } else {
      this.tooltip.content.text(message);
    }

  }

  if (focus) {
    this.focus();
  }

};
HTMLInputElement.prototype.unHighlight = function () {
  $(this).removeClass("form-has-error");
  if (this.tooltip != null) {
    $(this.tooltip.toolTip).remove();
    this.tooltip = null;
  }

  this.highlighter = null;
  if (this.errorDiv != null) {
    this.errorDiv.remove();
    this.errorDiv = null;
  }

};
HTMLInputElement.prototype.getValueToCaretPos = function () {
  return this.value.substring(0, this.getCaretPosition());
};
HTMLInputElement.prototype.attachWatcher = function (focused) {
  if (!this.watcherAttached) {
    this.watcherAttached = true;
    this.watcher = new Webr.component.HTMLInputElementWatcher();
    this.watcher.attach(this, focused);
        

    //on key
    var it = this;
    $(this).keydown(this.onKeyFunction = function (e) {
      it.onkey(e);
    });
  }

};
HTMLInputElement.prototype.detachWatcher = function () {
  if (this.watcherAttached) {
    this.watcherAttached = false;
    this.watcher.detach();
    this.watcher = null;
    $(this).unbind("keydown", this.onKeyFunction);
  }

};
HTMLInputElement.prototype.setWatcherDelay = function (watcherDelay) {
  if (this.watcher) {
    this.watcher.eventRaiserDelay = watcherDelay;
  }

};
HTMLInputElement.prototype.setValueNoEvents = function (value) {
  this.value = value;
  if (this.watcher) {
    this.watcher.resetOldValue(value);
  }

};
HTMLInputElement.prototype.getCaretPosition = function () {
  try {
    var value = this.value;
    var caretPosition = value.length;
    if (Webr.util.Util.isIE) {
      if (this.tagName.toLowerCase() == "textarea") {
        var range1 = document.selection.createRange();
        var range2 = range1.duplicate();
        //TODO Fix bug with /n & /r
        range2.moveToElementText(this);
        range2.setEndPoint("EndToEnd", range1);
        caretPosition = range2.text.length;
      } else {
        var range = document.selection.createRange().duplicate();
        range.moveEnd("character", value.length);
        if (range.text == "") {
          caretPosition = value.length;
        } else {
          caretPosition = value.lastIndexOf(range.text);
        }

      }

    } else {
      if (this.selectionStart != null) {
        caretPosition = this.selectionStart;
      }

    }

    return caretPosition;
  } catch (e) {
    return 0;
  }

};
HTMLInputElement.prototype.setCaretPosition = function (pos) {
  this.setSelectionRange(pos, pos);
};
HTMLInputElement.prototype.setSelectionRange = function (start, end) {
  if (this.selectionStart != null) {
    this.selectionStart = start;
    this.selectionEnd = end;
  } else {
    if (this.createTextRange) {
      var range = this.createTextRange();
      range.moveStart("character", start);
      range.moveEnd("character", end);
      range.select();
    }

  }

};
HTMLInputElement.prototype.onvaluechange = function (caretPos, value) {
};
HTMLInputElement.prototype.fireValueChange = function (caretPos, value) {
  $(this).trigger("valuechange", {caretPos: caretPos, value: value});
};
HTMLInputElement.prototype.oncaretmove = function (caretPos, value) {
};
HTMLInputElement.prototype.fireCaretMove = function (caretPos, value) {
  $(this).trigger("caretmove", {caretPos: caretPos, value: value});
};
HTMLInputElement.prototype.onkey = function (e) {
  if (e.isKey(Webr.util.Key.ENTER)) {
    $(this).trigger("enter");
  } else {
    if (e.isKey(Webr.util.Key.ESC)) {
      $(this).trigger("esc");
    }

  }

};
HTMLInputElement.prototype.onenter = function () {
};
HTMLInputElement.prototype.onesc = function () {
};
HTMLInputElement.prototype.underline = function (value, underlineRanges, optionalLeftOffset) {
  if (this.underliner == null && underlineRanges != null && underlineRanges.length > 0) {
    this.underliner = new Webr.component.Underline(this);
  }

  if (this.underliner != null) {
    this.setSpellCheck(false);
    this.underliner.underline(value, underlineRanges, optionalLeftOffset);
  }

};
HTMLInputElement.prototype.suggest = function (data) {
  this.getSuggest().suggest(data);
};
HTMLInputElement.prototype.getSuggest = function () {
  if (this.suggester == null) {
    this.suggester = new Webr.component.Suggest(this);
    this.setAutoComplete(false);
  }

  return this.suggester;
};
HTMLInputElement.prototype.setSpellCheck = function (value) {
  this.setAttribute("spellcheck", value);
};
HTMLInputElement.prototype.setAutoComplete = function (value) {
  this.setAttribute("autocomplete", value ?"on" :"off");
};
HTMLInputElement.prototype.hasChanged = function () {
  return this.value != this.defaultValue;
};
HTMLInputElement.dismissOnValueChange = function (e) {
  var el = e.target;
  el.unHighlight();
};
HTMLTextAreaElement.prototype.highlight = HTMLInputElement.prototype.highlight;
HTMLTextAreaElement.prototype.unHighlight = HTMLInputElement.prototype.unHighlight;
HTMLTextAreaElement.prototype.getValueToCaretPos = HTMLInputElement.prototype.getValueToCaretPos;
HTMLTextAreaElement.prototype.attachWatcher = HTMLInputElement.prototype.attachWatcher;
HTMLTextAreaElement.prototype.detachWatcher = HTMLInputElement.prototype.detachWatcher;
HTMLTextAreaElement.prototype.setWatcherDelay = HTMLInputElement.prototype.setWatcherDelay;
HTMLTextAreaElement.prototype.setValueNoEvents = HTMLInputElement.prototype.setValueNoEvents;
HTMLTextAreaElement.prototype.getCaretPosition = HTMLInputElement.prototype.getCaretPosition;
HTMLTextAreaElement.prototype.setCaretPosition = HTMLInputElement.prototype.setCaretPosition;
HTMLTextAreaElement.prototype.setSelectionRange = HTMLInputElement.prototype.setSelectionRange;
HTMLTextAreaElement.prototype.onvaluechange = HTMLInputElement.prototype.onvaluechange;
HTMLTextAreaElement.prototype.fireValueChange = HTMLInputElement.prototype.fireValueChange;
HTMLTextAreaElement.prototype.oncaretmove = HTMLInputElement.prototype.oncaretmove;
HTMLTextAreaElement.prototype.fireCaretMove = HTMLInputElement.prototype.fireCaretMove;
HTMLTextAreaElement.prototype.onkey = HTMLInputElement.prototype.onkey;
HTMLTextAreaElement.prototype.onenter = HTMLInputElement.prototype.onenter;
HTMLTextAreaElement.prototype.onesc = HTMLInputElement.prototype.onesc;
HTMLTextAreaElement.prototype.underline = HTMLInputElement.prototype.underline;
HTMLTextAreaElement.prototype.suggest = HTMLInputElement.prototype.suggest;
HTMLTextAreaElement.prototype.getSuggest = HTMLInputElement.prototype.getSuggest;
HTMLTextAreaElement.prototype.setSpellCheck = HTMLInputElement.prototype.setSpellCheck;
HTMLTextAreaElement.prototype.setAutoComplete = HTMLInputElement.prototype.setAutoComplete;
HTMLTextAreaElement.prototype.hasChanged = HTMLInputElement.prototype.hasChanged;
HTMLTextAreaElement.dismissOnValueChange = HTMLInputElement.prototype.dismissOnValueChange;
