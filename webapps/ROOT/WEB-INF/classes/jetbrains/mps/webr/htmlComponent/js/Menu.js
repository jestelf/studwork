Webr.component.Menu = function (button) {
  this.enabled = true;
  this.ieShadowElement = null;
  this.current_state = null;
  this.button = $(button);
  this.button.data(Webr.component.ComponentRegistry.COMPONENT_INSTANCE, this);
  if (this.button.parent("td").length > 0) {
    this.anchor = this.button.parent("td");
    this.activeClass = "jt-toolbar-menu-active";
  } else {
    this.anchor = this.button;
    this.activeClass = "jt-menu-active";
  }

  this.items = this.button.next("ul");
  if (Webr.util.Util.isIE) {
    this.ieShadowElement = $(document.createElement("div")).addClass("ieShadow");
    this.items.parent().append(this.ieShadowElement);
  }

  this.initEvents();
  this.current_state = Webr.component.Menu.state_CLOSED;
};
Webr.component.Menu.prototype.mouseOverButton = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mouseOverButton", arguments);
};
Webr.component.Menu.prototype.mouseOverItems = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mouseOverItems", arguments);
};
Webr.component.Menu.prototype.mouseOutButton = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mouseOutButton", arguments);
};
Webr.component.Menu.prototype.mouseOutItems = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mouseOutItems", arguments);
};
Webr.component.Menu.prototype.itemsClick = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "itemsClick", arguments);
};
Webr.component.Menu.prototype.buttonClick = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "buttonClick", arguments);
};
Webr.component.Menu.prototype.tick = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "tick", arguments);
};
Webr.component.Menu.prototype.hide = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "hide", arguments);
};
Webr.component.Menu.prototype.enable = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "enable", arguments);
};
Webr.component.Menu.prototype.disable = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "disable", arguments);
};
Webr.component.Menu.prototype.initEvents = function () {
  var t = this;
  //unbind mouseover from registration if any
  this.anchor.unbind("mouseover");
  //bind
  this.anchor.mouseover(function () {
    t.mouseOverButton();
  });
  this.anchor.mouseout(function () {
    t.mouseOutButton();
  });
  this.anchor.click(function () {
    t.buttonClick();
  });
  this.items.mouseover(function () {
    t.mouseOverItems();
  });
  this.items.mouseout(function () {
    t.mouseOutItems();
  });
  this.items.click(function () {
    t.itemsClick();
  });
};
Webr.component.Menu.prototype.setEnabled = function (enabled) {
  if (enabled) {
    this.enable();
  } else {
    this.disable();
  }

};
Webr.component.Menu.prototype.isEnabled = function () {
  return this.enabled;
};
Webr.component.Menu.prototype._show = function () {
  if (Webr.component.Menu.OPEN_MENU) {
    Webr.component.Menu.OPEN_MENU.hide();
  }

  Webr.component.Menu.OPEN_MENU = this;
  this.setItemsPosition();
  this.setIeShadowPosition();
  this.anchor.addClass(this.activeClass);
  this.items.show();
  this.setIeShadowVisible(true);
};
Webr.component.Menu.prototype.setItemsPosition = function () {
  this.items.css({top: this.anchor.position().top + this.anchor.height(), left: this.anchor.position().left, width: Math.max(this.anchor.width(), this.items.width())});
};
Webr.component.Menu.prototype.setIeShadowPosition = function () {
  if (this.ieShadowElement) {
    this.ieShadowElement.css({top: this.anchor.position().top + this.anchor.height(), left: this.anchor.position().left, width: this.items.outerWidth() - 3, height: this.items.outerHeight() - 3});
  }

};
Webr.component.Menu.prototype.setIeShadowVisible = function (visible) {
  if (this.ieShadowElement) {
    if (visible) {
      this.ieShadowElement.show();
    } else {
      this.ieShadowElement.hide();
    }

  }

};
Webr.component.Menu.prototype._hide = function () {
  Webr.component.Menu.OPEN_MENU = null;
  this.items.hide();
  this.setIeShadowVisible(false);
  this.anchor.removeClass(this.activeClass);
};
Webr.component.Menu.prototype._setEnabled = function (enabled) {
  this.enabled = enabled;
  if (enabled) {
    this.button.removeClass("jt-menu-disabled");
  } else {
    this.button.addClass("jt-menu-disabled");
  }

};
Webr.component.Menu.prototype._startShowTimer = function () {
  var t = this;
  this.showTimerHandler = window.setTimeout(function () {
    t.tick();
  }, Webr.component.Menu.SHOW_PAUSE);
};
Webr.component.Menu.prototype._stopShowTimer = function () {
  window.clearTimeout(this.showTimerHandler);
};
Webr.component.Menu.prototype._startHideTimer = function () {
  var t = this;
  this.hideTimerHandler = window.setTimeout(function () {
    t.tick();
  }, Webr.component.Menu.HIDE_PAUSE);
};
Webr.component.Menu.prototype._stopHideTimer = function () {
  window.clearTimeout(this.hideTimerHandler);
};
Webr.component.Menu.SHOW_PAUSE = 100;
Webr.component.Menu.HIDE_PAUSE = 400;
Webr.component.Menu.state_CLOSED = {name: "CLOSED", mouseOverButton: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Menu.state_PAUSE_BEFORE_OPEN);
    }

    return Webr.component.Menu.state_PAUSE_BEFORE_OPEN;
  }

  return false;
}, disable: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Menu.state_DISABLED);
    }

    return Webr.component.Menu.state_DISABLED;
  }

  return false;
}};
Webr.component.Menu.state_PAUSE_BEFORE_OPEN = {name: "PAUSE_BEFORE_OPEN", onenter: function () {
  this._startShowTimer();
}, onexit: function () {
  this._stopShowTimer();
}, tick: function () {
  if (true) {
    this._show();
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Menu.state_PAUSE_BEFORE_OPEN);
    }

    return Webr.component.Menu.state_OPEN;
  }

  return false;
}, buttonClick: function () {
  if (true) {
    this._show();
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Menu.state_PAUSE_BEFORE_OPEN);
    }

    return Webr.component.Menu.state_OPEN;
  }

  return false;
}, mouseOutButton: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Menu.state_PAUSE_BEFORE_OPEN);
    }

    return Webr.component.Menu.state_CLOSED;
  }

  return false;
}, mouseOutItems: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Menu.state_PAUSE_BEFORE_OPEN);
    }

    return Webr.component.Menu.state_CLOSED;
  }

  return false;
}};
Webr.component.Menu.state_OPEN = {name: "OPEN", mouseOutButton: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Menu.state_PAUSE_BEFORE_CLOSE);
    }

    return Webr.component.Menu.state_PAUSE_BEFORE_CLOSE;
  }

  return false;
}, mouseOutItems: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Menu.state_PAUSE_BEFORE_CLOSE);
    }

    return Webr.component.Menu.state_PAUSE_BEFORE_CLOSE;
  }

  return false;
}, hide: function () {
  if (true) {
    this._hide();
    return Webr.component.Menu.state_CLOSED;
  }

  return false;
}, itemsClick: function () {
  if (true) {
    this._hide();
    return Webr.component.Menu.state_CLOSED;
  }

  return false;
}, disable: function () {
  if (true) {
    this._hide();
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Menu.state_DISABLED);
    }

    return Webr.component.Menu.state_DISABLED;
  }

  return false;
}};
Webr.component.Menu.state_PAUSE_BEFORE_CLOSE = {name: "PAUSE_BEFORE_CLOSE", onenter: function () {
  this._startHideTimer();
}, onexit: function () {
  this._stopHideTimer();
}, tick: function () {
  if (true) {
    this._hide();
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Menu.state_PAUSE_BEFORE_CLOSE);
    }

    return Webr.component.Menu.state_CLOSED;
  }

  return false;
}, hide: function () {
  if (true) {
    this._hide();
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Menu.state_PAUSE_BEFORE_CLOSE);
    }

    return Webr.component.Menu.state_CLOSED;
  }

  return false;
}, itemsClick: function () {
  if (true) {
    this._hide();
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Menu.state_PAUSE_BEFORE_CLOSE);
    }

    return Webr.component.Menu.state_CLOSED;
  }

  return false;
}, mouseOverButton: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Menu.state_PAUSE_BEFORE_CLOSE);
    }

    return Webr.component.Menu.state_OPEN;
  }

  return false;
}, mouseOverItems: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Menu.state_PAUSE_BEFORE_CLOSE);
    }

    return Webr.component.Menu.state_OPEN;
  }

  return false;
}, disable: function () {
  if (true) {
    this._hide();
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Menu.state_PAUSE_BEFORE_CLOSE);
    }

        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Menu.state_DISABLED);
    }

    return Webr.component.Menu.state_DISABLED;
  }

  return false;
}};
Webr.component.Menu.state_DISABLED = {name: "DISABLED", onenter: function () {
  this._setEnabled(false);
}, onexit: function () {
  this._setEnabled(true);
}, enable: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Menu.state_DISABLED);
    }

    return Webr.component.Menu.state_CLOSED;
  }

  return false;
}};
Webr.component.Menu.registerMenu = function (path, comboboxSuffixName) {
  cr.forEach(path, comboboxSuffixName, function () {
    var button = $(this);
    var handler = button;
    if (button.parent("td").length > 0) {
      handler = button.parent("td");
    }

    handler.one("mouseover", function () {
      new Webr.component.Menu(button).mouseOverButton();
    });
  });
};
Webr.component.Menu.getMenu = function (menu) {
  if (menu._startShowTimer) {
    return menu;
  } else {
    //remove mouseover handler from registerMenu
    return new Webr.component.Menu(menu);
  }

};
var regmn = Webr.component.Menu.registerMenu;
