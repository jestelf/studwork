charisma.smartui.InputWatcher = function (config) {
  this.config = config;
  var it = this;
  $(this.config.input).focus(function () {
    it.start();
  });
  $(this.config.input).blur(function () {
    it.stop();
  });
};
charisma.smartui.InputWatcher.prototype.start = function () {
  if (this.handler == null) {
    var t = this;
    this.prevValue = this.getValue();
    this.handler = window.setInterval(function () {
      t.tick();
    }, this.config.tickPeriod || 150);
    if (this.config.tickOnStart) {
      this.config.tickFunction(this.prevValue);
    }

  }

};
charisma.smartui.InputWatcher.prototype.stop = function () {
  if (this.handler != null) {
    window.clearInterval(this.handler);
    this.handler = null;
  }

};
charisma.smartui.InputWatcher.prototype.tick = function () {
  var newValue = this.getValue();
  if (newValue != this.prevValue) {
    if (newValue == this.newValue) {
      this.prevValue = newValue;
      this.config.tickFunction(newValue, this.getCaretPosition());
    } else {
      this.newValue = newValue;
    }

  }

};
charisma.smartui.InputWatcher.prototype.getValue = function () {
  var value;
  if (this.config.watchCaret) {
    var caretPosition = this.getCaretPosition();
    value = this.config.input.value.substring(0, caretPosition);
  } else {
    value = this.config.input.value;
  }

  return value;
};
charisma.smartui.InputWatcher.prototype.getCaretPosition = function () {
  return charisma.smartui.InputWatcher.getCaretPosition(this.config.input);
};
charisma.smartui.InputWatcher.prototype.setCaretPosition = function (caretPosition) {
  charisma.smartui.InputWatcher.setCaretPosition(this.config.input, caretPosition);
};
charisma.smartui.InputWatcher.getCaretPosition = function (input) {
  try {
    var value = input.value;
    var caretPosition = value.length;
    if (input.createTextRange) {
      var range = document.selection.createRange().duplicate();
      range.moveEnd("character", value.length);
      if (range.text == "") {
        caretPosition = value.length;
      } else {
        caretPosition = value.lastIndexOf(range.text);
      }

    } else {
      if (input.selectionStart != null) {
        caretPosition = input.selectionStart;
      }

    }

    return caretPosition;
  } catch (e) {
    return 0;
  }

};
charisma.smartui.InputWatcher.setCaretPosition = function (input, caretPosition) {
  if (input.selectionStart != null) {
    input.selectionStart = caretPosition;
    input.selectionEnd = caretPosition;
  } else {
    if (input.createTextRange) {
      var range = input.createTextRange();
      range.moveStart("character", caretPosition);
      range.moveEnd("character", caretPosition);
      range.select();
    }

  }

};
charisma.smartui.InputWatcherConfig = function () {
};
