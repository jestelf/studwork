Webr.component.VerticalLayouter = function (anchor, callback, elementHeight) {
  this.staticHeight = null;
  this.elementHeight = null;
  this.current_state = null;
  this.anchor = $(anchor);
  this.callback = callback;
  if (elementHeight) {
    if (jQuery.isFunction(elementHeight)) {
      this.elementHeight = elementHeight;
    } else {
      this.staticHeight = elementHeight;
    }

  }

  this.current_state = Webr.component.VerticalLayouter.state_INITIAL;
};
Webr.component.VerticalLayouter.prototype._reset = function () {
  //Dummy
};
Webr.component.VerticalLayouter.prototype.checkOrientation = function (height) {
  var maxVisibleHeight = this.getMaxVisibleHeight(this.anchor);
  var maxAllowedHeight = height ?height :this.staticHeight ?this.staticHeight :this.elementHeight();
  var toDown = maxVisibleHeight - maxAllowedHeight < 0 ?false :true;
  if (toDown) {
    this.todown(maxVisibleHeight);
  } else {
    maxVisibleHeight = this.getMaxVisibleHeight(this.anchor, true);
    if (maxVisibleHeight < maxAllowedHeight) {
      maxVisibleHeight = maxAllowedHeight;
      this.todown(maxVisibleHeight);
    } else {
      this.toup(maxVisibleHeight);
    }

  }

};
Webr.component.VerticalLayouter.prototype.moveToUp = function () {
  //Dummy
};
Webr.component.VerticalLayouter.prototype.moveToDown = function () {
  //Dummy
};
Webr.component.VerticalLayouter.prototype.setAnchorElement = function (element) {
  this.anchor = $(element);
};
Webr.component.VerticalLayouter.prototype.getAnchorElement = function () {
  return this.anchor;
};
Webr.component.VerticalLayouter.prototype.getMaxVisibleHeight = function (el, toUp) {
  var top = el.offset().top;
  var padding = top - $(window).scrollTop();
  if (!toUp) {
    padding = $(window).height() + el.outerHeight(true) - padding;
  }

  var res = Math.max(0, padding);
  return res;
};
Webr.component.VerticalLayouter.prototype.reset = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "reset", arguments);
};
Webr.component.VerticalLayouter.prototype.fix = function (height) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "fix", arguments);
};
Webr.component.VerticalLayouter.prototype.toup = function (maxHeight) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "toup", arguments);
};
Webr.component.VerticalLayouter.prototype.todown = function (maxHeight) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "todown", arguments);
};
Webr.component.VerticalLayouter.state_INITIAL = {name: "INITIAL", fix: function (height) {
  if (true) {
    this.checkOrientation(height);
    return ;
  }

  return false;
}, todown: function (maxHeight) {
  if (true) {
    this.callback(false, maxHeight);
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.VerticalLayouter.state_OPEN_DOWN);
    }

    return Webr.component.VerticalLayouter.state_OPEN_DOWN;
  }

  return false;
}, toup: function (maxHeight) {
  if (true) {
    this.callback(true, maxHeight);
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.VerticalLayouter.state_OPEN_UP);
    }

    return Webr.component.VerticalLayouter.state_OPEN_UP;
  }

  return false;
}};
Webr.component.VerticalLayouter.state_OPEN_DOWN = {name: "OPEN_DOWN", onenter: function () {
  this.moveToDown();
}, reset: function () {
  if (true) {
    this._reset();
    return Webr.component.VerticalLayouter.state_INITIAL;
  }

  return false;
}};
Webr.component.VerticalLayouter.state_OPEN_UP = {name: "OPEN_UP", onenter: function () {
  this.moveToUp();
}, reset: function () {
  if (true) {
    this._reset();
    return Webr.component.VerticalLayouter.state_INITIAL;
  }

  return false;
}};
