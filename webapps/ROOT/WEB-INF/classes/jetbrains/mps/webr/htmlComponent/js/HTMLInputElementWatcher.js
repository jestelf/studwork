Webr.component.HTMLInputElementWatcher = function () {
  this.current_state = null;
  var it = this;
  this.focusHandler = function () {
    it.focus();
  };
  this.blurHandler = function () {
    it.blur();
  };
  this.current_state = Webr.component.HTMLInputElementWatcher.state_HAS_NO_FOCUS;
};
Webr.component.HTMLInputElementWatcher.prototype.attach = function (element, focused) {
  this.textField = element;
  this.valueChangeCheckPeriod = 150;
  this.eventRaiserDelay = 500;
  $(this.textField).focus(this.focusHandler);
  $(this.textField).blur(this.blurHandler);
  if (focused == true) {
    var it = this;
    it.focus();
  }

};
Webr.component.HTMLInputElementWatcher.prototype.detach = function () {
  this.valueChangeCheckPeriod = 150;
  this.eventRaiserDelay = 500;
  //Stop watching
  this.blur();
  $(this.textField).unbind("focus", this.focusHandler);
  $(this.textField).unbind("blur", this.blurHandler);
  this.textField = null;
};
Webr.component.HTMLInputElementWatcher.prototype.resetOldValue = function (value) {
  this.oldValue = value;
};
Webr.component.HTMLInputElementWatcher.prototype.startWatching = function () {
  if (this.valueChangeCheckId != null) {
    window.clearInterval(this.valueChangeCheckId);
  }

  var it = this;
  this.oldValue = this.textField.value;
  this.oldCaret = this.textField.getCaretPosition();
  this.valueChangeCheckId = window.setInterval(function () {
    it.checkChangeTick(it.textField.value, it.textField.getCaretPosition());
  }, this.valueChangeCheckPeriod);
};
Webr.component.HTMLInputElementWatcher.prototype.stopWatching = function () {
  if (this.valueChangeCheckId != null) {
    window.clearInterval(this.valueChangeCheckId);
    this.valueChangeCheckId = null;
  }

};
Webr.component.HTMLInputElementWatcher.prototype.isValueChanged = function () {
  return this.oldValue != this.textField.value;
};
Webr.component.HTMLInputElementWatcher.prototype.isCaretChanged = function () {
  return this.oldCaret != this.textField.getCaretPosition();
};
Webr.component.HTMLInputElementWatcher.prototype.scheduleEventRaise = function (newValue, newCaret) {
  if (this.prevCheckCaret != newCaret || this.prevCheckValue != newValue) {
    this.prevCheckValue = newValue;
    this.prevCheckCaret = newCaret;
    this.rescheduleEventRaise(newValue, newCaret);
  }

};
Webr.component.HTMLInputElementWatcher.prototype.rescheduleEventRaise = function (newValue, newCaret) {
  if (this.eventRaiserId) {
    window.clearTimeout(this.eventRaiserId);
    this.eventRaiserId = null;
  }

    

    

  var it = this;
  this.eventRaiserId = window.setTimeout(function () {
    it.delayFinished(newValue, newCaret);
  }, this.eventRaiserDelay > 0 ?this.eventRaiserDelay :10);
};
Webr.component.HTMLInputElementWatcher.prototype.dismissEventRaise = function () {
  if (this.eventRaiserId) {
    window.clearTimeout(this.eventRaiserId);
    this.eventRaiserId = null;
  }

};
Webr.component.HTMLInputElementWatcher.prototype.fireValueChanged = function (value, caret) {
  this.oldValue = value;
  this.oldCaret = caret;
  this.textField.fireValueChange(caret, value);
};
Webr.component.HTMLInputElementWatcher.prototype.fireCaretMoved = function (value, caret) {
  this.oldValue = value;
  this.oldCaret = caret;
  this.textField.fireCaretMove(caret, value);
};
Webr.component.HTMLInputElementWatcher.prototype.focus = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "focus", arguments);
};
Webr.component.HTMLInputElementWatcher.prototype.blur = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "blur", arguments);
};
Webr.component.HTMLInputElementWatcher.prototype.checkChangeTick = function (newValue, newCaret) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "checkChangeTick", arguments);
};
Webr.component.HTMLInputElementWatcher.prototype.delayFinished = function (newValue, newCaret) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "delayFinished", arguments);
};
Webr.component.HTMLInputElementWatcher.state_HAS_NO_FOCUS = {name: "HAS_NO_FOCUS", focus: function () {
  if (true) {
    this.startWatching();
    return Webr.component.HTMLInputElementWatcher.state_NO_ACTIVITY;
  }

  return false;
}};
Webr.component.HTMLInputElementWatcher.state_HAS_FOCUS = {name: "HAS_FOCUS", blur: function () {
  if (true) {
    //blur is not called if element is hidden
    //possible memory leak
    this.stopWatching();
    //Another possible leak if blur is called & event is not raised yet
    this.dismissEventRaise();
    return Webr.component.HTMLInputElementWatcher.state_HAS_NO_FOCUS;
  }

  return false;
}};
Webr.component.HTMLInputElementWatcher.state_NO_ACTIVITY = {name: "NO_ACTIVITY", parentState: Webr.component.HTMLInputElementWatcher.state_HAS_FOCUS, checkChangeTick: function (newValue, newCaret) {
  if (this.isValueChanged()) {
    this.scheduleEventRaise(newValue, newCaret);
    return Webr.component.HTMLInputElementWatcher.state_TYPING;
  }

  if (this.isCaretChanged()) {
    this.scheduleEventRaise(newValue, newCaret);
    return Webr.component.HTMLInputElementWatcher.state_MOVING_CARET;
  }

  return false;
}};
Webr.component.HTMLInputElementWatcher.state_TYPING = {name: "TYPING", parentState: Webr.component.HTMLInputElementWatcher.state_HAS_FOCUS, checkChangeTick: function (newValue, newCaret) {
  if (this.isValueChanged()) {
    this.scheduleEventRaise(newValue, newCaret);
    return ;
  }

  if (this.isCaretChanged()) {
    this.scheduleEventRaise(newValue, newCaret);
    return Webr.component.HTMLInputElementWatcher.state_MOVING_CARET;
  }

  if (true) {
    this.dismissEventRaise();
    return Webr.component.HTMLInputElementWatcher.state_NO_ACTIVITY;
  }

  return false;
}, delayFinished: function (newValue, newCaret) {
  if (true) {
    this.fireValueChanged(newValue, newCaret);
    return Webr.component.HTMLInputElementWatcher.state_NO_ACTIVITY;
  }

  return false;
}};
Webr.component.HTMLInputElementWatcher.state_MOVING_CARET = {name: "MOVING_CARET", parentState: Webr.component.HTMLInputElementWatcher.state_HAS_FOCUS, checkChangeTick: function (newValue, newCaret) {
  if (this.isValueChanged()) {
    this.scheduleEventRaise(newValue, newCaret);
    return Webr.component.HTMLInputElementWatcher.state_TYPING;
  }

  if (this.isCaretChanged()) {
    this.scheduleEventRaise(newValue, newCaret);
    return ;
  }

  if (true) {
    this.dismissEventRaise();
    return Webr.component.HTMLInputElementWatcher.state_NO_ACTIVITY;
  }

  return false;
}, delayFinished: function (newValue, newCaret) {
  if (true) {
    this.fireCaretMoved(newValue, newCaret);
    return Webr.component.HTMLInputElementWatcher.state_NO_ACTIVITY;
  }

  return false;
}};
