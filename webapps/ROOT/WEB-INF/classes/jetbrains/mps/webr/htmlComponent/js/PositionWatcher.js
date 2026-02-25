Webr.component.PositionWatcher = function (listElement, anchor, mainElement, binded) {
  this.current_state = null;
  this.setListElement(listElement);
  this.jQAnchorElement = $(anchor);
  if (mainElement) {
    this.jQMainElement = $(mainElement);
  }

  this.binded = binded;
  this.current_state = Webr.component.PositionWatcher.state_INITIAL;
};
Webr.component.PositionWatcher.prototype._reset = function () {
  if (this.binded) {
    this.jQMainElement.removeClass("reversal").css("top", this.jQAnchorElement.offset().top + this.jQAnchorElement.outerHeight(true));
  } else {
    this.jQListElement.removeClass("reversal").css("top", this.top);
  }

  this.jQListElement.children("ul.comboboxList").css("max-height", "").css("overflow-y", "");
};
Webr.component.PositionWatcher.prototype.checkOrientation = function () {
  var maxVisibleHeight = this.jQListElement.maxVisibleHeight();
  var realElementHeight = this.jQListElement.outerHeight(true);
  var maxAllowedHeight = realElementHeight;
  var toDown = maxVisibleHeight - maxAllowedHeight < 0 ?false :true;
  if (toDown) {
    this.todown();
  } else {
    maxVisibleHeight = this.jQAnchorElement.position().top - $(window).scrollTop();
    if (this.jQMainElement != this.jQListElement) {
      maxVisibleHeight -= this.jQMainElement.height();
    }

    if (maxVisibleHeight < maxAllowedHeight) {
      maxVisibleHeight = maxAllowedHeight;
      this.todown();
    } else {
      this.toup();
    }

  }

  var list = this.jQListElement.children("ul.comboboxList");
  var extraContent = this.jQListElement.children("div.extraContent");
  if (maxAllowedHeight > maxVisibleHeight) {
    list.css("max-height", maxVisibleHeight - extraContent.height()).css("overflow-y", "scroll");
  } else {
    list.css("max-height", "").css("overflow-y", "");
  }

};
Webr.component.PositionWatcher.prototype.moveToUp = function () {
  if (this.binded === true) {
    this.jQMainElement.addClass("reversal");
    this.jQMainElement.css("top", this.jQAnchorElement.offset().top - this.jQMainElement.height());
  } else {
    this.jQListElement.addClass("reversal");
    this.jQListElement.css("top", this.top - this.jQMainElement.height());
  }

};
Webr.component.PositionWatcher.prototype.moveToDown = function () {
};
Webr.component.PositionWatcher.prototype.setAnchorElement = function (element) {
  this.jQAnchorElement = $(element);
};
Webr.component.PositionWatcher.prototype.getAnchorElement = function () {
  return this.jQAnchorElement.get(0);
};
Webr.component.PositionWatcher.prototype.setListElement = function (element) {
  if (element) {
    this.jQListElement = $(element);
    this.top = parseInt(this.jQListElement.css("top"));
  }

};
Webr.component.PositionWatcher.prototype.getListElement = function () {
  return this.jQListElement ?this.jQListElement.get(0) :null;
};
Webr.component.PositionWatcher.prototype.reset = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "reset", arguments);
};
Webr.component.PositionWatcher.prototype.fix = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "fix", arguments);
};
Webr.component.PositionWatcher.prototype.toup = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "toup", arguments);
};
Webr.component.PositionWatcher.prototype.todown = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "todown", arguments);
};
Webr.component.PositionWatcher.state_INITIAL = {name: "INITIAL", fix: function () {
  if (true) {
    this.checkOrientation();
    return ;
  }

  return false;
}, todown: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.PositionWatcher.state_OPEN_DOWN);
    }

    return Webr.component.PositionWatcher.state_OPEN_DOWN;
  }

  return false;
}, toup: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.PositionWatcher.state_OPEN_UP);
    }

    return Webr.component.PositionWatcher.state_OPEN_UP;
  }

  return false;
}};
Webr.component.PositionWatcher.state_OPEN_DOWN = {name: "OPEN_DOWN", onenter: function () {
  this.moveToDown();
}, reset: function () {
  if (true) {
    this._reset();
    return Webr.component.PositionWatcher.state_INITIAL;
  }

  return false;
}};
Webr.component.PositionWatcher.state_OPEN_UP = {name: "OPEN_UP", onenter: function () {
  this.moveToUp();
}, reset: function () {
  if (true) {
    this._reset();
    return Webr.component.PositionWatcher.state_INITIAL;
  }

  return false;
}};
