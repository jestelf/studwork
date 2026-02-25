Webr.component.Popup = function (panel, groupId) {
  this.movedToBody = false;
  this.inited = false;
  this.hideTimerHandler = 0;
  this.showTimerHandler = 0;
  this.loadingTimeHandler = 0;
  this.anchor = null;
  this.parent = null;
  this.current_state = null;
  Webr.component.Popup.superclass.constructor.call(this, panel);
  var id = panel[0].id;
  this.parentTemplateName = id.substring(3, id.lastIndexOf("."));
  this.groupId = groupId;
  this.parent = panel.parent();
  this.savedBindMouseHovers = true;
  this.savedAnchor = null;
  this.current_state = Webr.component.Popup.state_CLOSED;
};
{
  var F = new Function();
  F.prototype = Webr.component.panel.AbstractPanel.prototype;
  Webr.component.Popup.prototype = new F();
  Webr.component.Popup.prototype.constructor = Webr.component.Popup;
  Webr.component.Popup.superclass = Webr.component.panel.AbstractPanel.prototype;
}

Webr.component.Popup.prototype.setEnabled = function (enabled) {
  if (enabled) {
    this.enable();
  } else {
    this.disable();
  }

};
Webr.component.Popup.prototype.init = function () {
  var it = this;
  this.refreshListener = {beforeRefresh: function (templatePath) {
    it._finalize(templatePath);
  }};
};
Webr.component.Popup.prototype._finalize = function (templatePath) {
  if (this.parentTemplateName.indexOf(templatePath) == 0) {
    Webr.event.RefreshCommandProcessor.removeListener(this.refreshListener);
    //After hide all garbage should be collected by browser garbage collector
    this.hide();
    this.refreshListener = null;
    delete this.refreshListener;
  }

};
Webr.component.Popup.prototype.setLayout = function (layout) {
  this.positionFunc = Webr.component.Popup.POSITION_FUNCTIONS[layout];
};
Webr.component.Popup.prototype.load = function (callback, anchor, callImmideatly) {
  if (!this.inited) {
    this.showAsync(callback, anchor, callImmideatly);
    this.inited = true;
  }

};
Webr.component.Popup.prototype.mouseOverAnchor = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mouseOverAnchor", arguments);
};
Webr.component.Popup.prototype.mouseOverPanel = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mouseOverPanel", arguments);
};
Webr.component.Popup.prototype.mouseOutAnchor = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mouseOutAnchor", arguments);
};
Webr.component.Popup.prototype.mouseOutPanel = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mouseOutPanel", arguments);
};
Webr.component.Popup.prototype.outerClick = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "outerClick", arguments);
};
Webr.component.Popup.prototype.tick = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "tick", arguments);
};
Webr.component.Popup.prototype.hide = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "hide", arguments);
};
Webr.component.Popup.prototype.enable = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "enable", arguments);
};
Webr.component.Popup.prototype.disable = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "disable", arguments);
};
Webr.component.Popup.prototype.show = function (bindMouseHovers, anchor) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "show", arguments);
};
Webr.component.Popup.prototype.showAsync = function (callback, anchor, callImmideatly) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "showAsync", arguments);
};
Webr.component.Popup.prototype.onshow = function () {
};
Webr.component.Popup.prototype.onhide = function () {
};
Webr.component.Popup.prototype._bindMouseOverAnchor = function () {
  var t = this;
  //unbind mouseover from registration if any
  this.anchor.unbind("mouseover");
  //bind
  this.anchorHandlers = [this.anchor.mouseover(function () {
    t.mouseOverAnchor();
  }), this.anchor.mouseout(function () {
    t.mouseOutAnchor();
  })];
};
Webr.component.Popup.prototype._unbindMouseOverAnchor = function () {
  if (this.anchorHandlers) {
    this.anchor.unbind("mouseover", this.anchorHandlers[0]).unbind("mouseout", this.anchorHandlers[1]);
  }

};
Webr.component.Popup.prototype._bindMouseOverPanel = function () {
  var t = this;
  this.panel.mouseover(function () {
    t.mouseOverPanel();
  });
  this.panel.mouseout(function () {
    t.mouseOutPanel();
  });
};
Webr.component.Popup.prototype._bindOuterClick = function (element) {
  var t = this;
  window.setTimeout(function () {
    var f = function (event) {
      if ($(element).ancestorOf(event.target)) {
        return true;
      }

      t.outerClick();
      $(document).unbind("click", f);
    };
    $(document).click(f);
  }, 20);
};
Webr.component.Popup.prototype._moveToBodyIfNecessary = function () {
  if (!this.movedToBody) {
    var e = this._getElement();
    e.parentNode.removeChild(e);
    document.body.appendChild(e);
    this.movedToBody = true;
  }

};
Webr.component.Popup.prototype._moveFromBodyIfNecessary = function () {
  if (this.movedToBody) {
    var e = this._getElement();
    if (this.parent.length > 0) {
      document.body.removeChild(e);
      this.parent.append(e);
      this.movedToBody = false;
    } else {
      throw "Popup parent element not found!";
    }

  }

};
Webr.component.Popup.prototype._getElement = function () {
  return this.panel.get(0);
};
Webr.component.Popup.prototype._hide = function () {
  var e = this._getElement();
  e.style.display = "none";
  Webr.component.Popup.GROUPS[this.groupId] = null;
  this._moveFromBodyIfNecessary();
  this.panel.trigger("hide");
};
Webr.component.Popup.prototype._show = function (bindMouseHovers, anchor) {
  var t = this;
  var openedPopup = Webr.component.Popup.GROUPS[t.groupId];
  if (openedPopup && openedPopup != this) {
    openedPopup.hide();
  }

  Webr.component.Popup.GROUPS[t.groupId] = t;
  this._registerMouseHovers(bindMouseHovers, anchor);
  if (!t.positionFunc) {
    //No position function set. Use default.
    t.positionFunc = Webr.component.Popup.POSITION_FUNCTIONS[0];
  }

  var e = t._getElement();
  this._moveToBodyIfNecessary();
  e.style.visibility = "hidden";
  t.panel.css("top", 0);
  t.panel.css("left", 0);
  e.style.display = "block";
  t.positionFunc(t);
  e.style.visibility = "visible";
  this.panel.trigger("show");
};
Webr.component.Popup.prototype._showFromAsyncLoading = function () {
  var t = this;
  var openedPopup = Webr.component.Popup.GROUPS[t.groupId];
  if (openedPopup && openedPopup != this) {
    openedPopup.hide();
  }

  Webr.component.Popup.GROUPS[t.groupId] = t;
  this._bindMouseOverPanel();
  if (!t.positionFunc) {
    //No position function set. Use default.
    t.positionFunc = Webr.component.Popup.POSITION_FUNCTIONS[0];
  }

  var e = t._getElement();
  this._moveToBodyIfNecessary();
  e.style.visibility = "hidden";
  t.panel.css("top", 0);
  t.panel.css("left", 0);
  e.style.display = "block";
  t.positionFunc(t);
  e.style.visibility = "visible";
  this.panel.trigger("show");
};
Webr.component.Popup.prototype._loading = function () {
  //Add loading text
  this.loadingTimeHandler = window.setTimeout(function () {
  }, Webr.component.Popup.SHOW_PAUSE);
};
Webr.component.Popup.prototype._loaded = function () {
  window.clearTimeout(this.loadingTimeHandler);
};
Webr.component.Popup.prototype._registerMouseHovers = function (bindMouseHovers, element) {
  if (element) {
    //replace anchor with other
    //forgot to unbind on previous anchor
    if (this.anchor && this.anchor.equals(element)) {
      return ;
    }

    this._unbindMouseOverAnchor();
    this.anchor = $(element);
    if (bindMouseHovers) {
      this._bindMouseOverAnchor();
      this._bindMouseOverPanel();
    } else {
      this._bindOuterClick(this.panel);
    }

  } else {
    if (!this.anchor) {
      throw "No anchor for popup!";
    }

  }

};
Webr.component.Popup.prototype._showFixParameters = function (bindMouseHovers, anchor) {
  //check parameters
  if (bindMouseHovers || bindMouseHovers == false) {
    // first parameter exist
    if (anchor) {
      // and second too
      this._show(bindMouseHovers, anchor);
    } else {
      if (bindMouseHovers.appendChild) {
        //bindMouseHovers are actually not defined, but anchor is
        this._show(Webr.component.Popup.DEFAULT_MOUSE_HOVERS, anchor);
      }

    }

  } else {
    // no parameters defined
    this._show(Webr.component.Popup.DEFAULT_MOUSE_HOVERS, null);
  }

};
Webr.component.Popup.prototype._initPopupForDelegatedLoad = function (callback, anchor) {
  this.callback = callback;
  this._registerMouseHovers(true, anchor);
};
Webr.component.Popup.prototype._startShowTimer = function () {
  var t = this;
  var f = function () {
    t.tick();
  };
  this.showTimerHandler = window.setTimeout(f, Webr.component.Popup.SHOW_PAUSE);
};
Webr.component.Popup.prototype._stopShowTimer = function () {
  window.clearTimeout(this.showTimerHandler);
};
Webr.component.Popup.prototype._startHideTimer = function () {
  var t = this;
  var f = function () {
    t.tick();
  };
  this.hideTimerHandler = window.setTimeout(f, Webr.component.Popup.HIDE_PAUSE);
};
Webr.component.Popup.prototype._stopHideTimer = function () {
  window.clearTimeout(this.hideTimerHandler);
};
Webr.component.Popup.DEFAULT_MOUSE_HOVERS = false;
Webr.component.Popup.SHOW_PAUSE = 200;
Webr.component.Popup.HIDE_PAUSE = 400;
Webr.component.Popup.DEFAULT_GROUP_ID = "__DEFAULT_GROUP__";
Webr.component.Popup.GROUPS = [];
Webr.component.Popup.POSITION_FUNCTIONS = [function (p) {
  //function #0
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();
  var position = Webr.component.Popup.getAnchorPoint(p.anchor, 0, 2);
  var panelWidth = this.panel.outerWidth();
  var panelHeight = this.panel.outerHeight();
  p.panel.css("top", Math.max(0, position.top));
  p.panel.css("left", Math.max(0, Math.min(position.left, windowWidth - panelWidth - 1)));
}, function (p) {
  //function #1
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();
  var position = Webr.component.Popup.getAnchorPoint(p.anchor, 2, 0);
  var panelWidth = this.panel.outerWidth();
  var panelHeight = this.panel.outerHeight();
  p.panel.css("top", Math.max(0, position.top));
  p.panel.css("left", Math.max(0, Math.min(position.left, windowWidth - panelWidth - 1)));
}];
Webr.component.Popup.state_CLOSED = {name: "CLOSED", mouseOverAnchor: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Popup.state_PAUSE_BEFORE_OPEN);
    }

    return Webr.component.Popup.state_PAUSE_BEFORE_OPEN;
  }

  return false;
}, disable: function () {
  if (true) {
    return Webr.component.Popup.state_DISABLED;
  }

  return false;
}, showAsync: function (callback, anchor, callImmideatly) {
  if (callImmideatly) {
    this._initPopupForDelegatedLoad(callback, anchor);
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Popup.state_ASYNC_LOADING);
    }

    return Webr.component.Popup.state_ASYNC_LOADING;
  }

  if (true) {
    this._initPopupForDelegatedLoad(callback, anchor);
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Popup.state_PAUSE_BEFORE_LOAD);
    }

    return Webr.component.Popup.state_PAUSE_BEFORE_LOAD;
  }

  return false;
}, show: function (bindMouseHovers, anchor) {
  if (true) {
    this._showFixParameters(bindMouseHovers, anchor);
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Popup.state_OPEN);
    }

    return Webr.component.Popup.state_OPEN;
  }

  return false;
}};
Webr.component.Popup.state_OPEN = {name: "OPEN", onenter: function () {
  Webr.event.RefreshCommandProcessor.addListener(this.refreshListener);
}, mouseOutAnchor: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Popup.state_PAUSE_BEFORE_CLOSE);
    }

    return Webr.component.Popup.state_PAUSE_BEFORE_CLOSE;
  }

  return false;
}, mouseOutPanel: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Popup.state_PAUSE_BEFORE_CLOSE);
    }

    return Webr.component.Popup.state_PAUSE_BEFORE_CLOSE;
  }

  return false;
}, outerClick: function () {
  if (true) {
    this._hide();
    return Webr.component.Popup.state_CLOSED;
  }

  return false;
}, show: function (bindMouseHovers, anchor) {
  if (true) {
    this._hide();
    this._showFixParameters(bindMouseHovers, anchor);
    return ;
  }

  return false;
}, hide: function () {
  if (true) {
    this._hide();
    return Webr.component.Popup.state_CLOSED;
  }

  return false;
}, disable: function () {
  if (true) {
    this._hide();
    return Webr.component.Popup.state_DISABLED;
  }

  return false;
}};
Webr.component.Popup.state_DISABLED = {name: "DISABLED", enable: function () {
  if (true) {
    return Webr.component.Popup.state_CLOSED;
  }

  return false;
}};
Webr.component.Popup.state_ASYNC_BEHAVOIUR = {name: "ASYNC_BEHAVOIUR"};
Webr.component.Popup.state_ASYNC_NOT_LOADED = {name: "ASYNC_NOT_LOADED", parentState: Webr.component.Popup.state_ASYNC_BEHAVOIUR, mouseOverAnchor: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Popup.state_PAUSE_BEFORE_LOAD);
    }

    return Webr.component.Popup.state_PAUSE_BEFORE_LOAD;
  }

  return false;
}};
Webr.component.Popup.state_PAUSE_BEFORE_LOAD = {name: "PAUSE_BEFORE_LOAD", parentState: Webr.component.Popup.state_ASYNC_BEHAVOIUR, onenter: function () {
  this._startShowTimer();
}, onexit: function () {
  this._stopShowTimer();
}, tick: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Popup.state_PAUSE_BEFORE_LOAD);
    }

        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Popup.state_ASYNC_LOADING);
    }

    return Webr.component.Popup.state_ASYNC_LOADING;
  }

  return false;
}, mouseOutAnchor: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Popup.state_PAUSE_BEFORE_LOAD);
    }

    return Webr.component.Popup.state_ASYNC_NOT_LOADED;
  }

  return false;
}, hide: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Popup.state_PAUSE_BEFORE_LOAD);
    }

    return Webr.component.Popup.state_ASYNC_NOT_LOADED;
  }

  return false;
}, disable: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Popup.state_PAUSE_BEFORE_LOAD);
    }

    return Webr.component.Popup.state_ASYNC_DISABLED;
  }

  return false;
}};
Webr.component.Popup.state_ASYNC_LOADING = {name: "ASYNC_LOADING", parentState: Webr.component.Popup.state_ASYNC_BEHAVOIUR, onenter: function () {
    

  this.callback();
  this._loading();
}, onexit: function () {
  this._loaded();
}, mouseOutPanel: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Popup.state_ASYNC_LOADING);
    }

    return Webr.component.Popup.state_ASYNC_NOT_LOADED;
  }

  return false;
}, mouseOutAnchor: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Popup.state_ASYNC_LOADING);
    }

    return Webr.component.Popup.state_ASYNC_NOT_LOADED;
  }

  return false;
}, hide: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Popup.state_ASYNC_LOADING);
    }

    return Webr.component.Popup.state_ASYNC_NOT_LOADED;
  }

  return false;
}, disable: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Popup.state_ASYNC_LOADING);
    }

    return Webr.component.Popup.state_ASYNC_DISABLED;
  }

  return false;
}, show: function (bindMouseHovers, anchor) {
  if (true) {
    this._showFromAsyncLoading();
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Popup.state_ASYNC_LOADING);
    }

        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Popup.state_OPEN);
    }

    return Webr.component.Popup.state_OPEN;
  }

  return false;
}};
Webr.component.Popup.state_ASYNC_DISABLED = {name: "ASYNC_DISABLED", parentState: Webr.component.Popup.state_ASYNC_BEHAVOIUR, enable: function () {
  if (true) {
    return Webr.component.Popup.state_ASYNC_NOT_LOADED;
  }

  return false;
}};
Webr.component.Popup.state_PAUSE_BEFORE_OPEN = {name: "PAUSE_BEFORE_OPEN", onenter: function () {
  this._startShowTimer();
}, onexit: function () {
  this._stopShowTimer();
}, tick: function () {
  if (true) {
    this._show(this.savedBindMouseHovers, this.savedAnchor);
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Popup.state_PAUSE_BEFORE_OPEN);
    }

        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Popup.state_OPEN);
    }

    return Webr.component.Popup.state_OPEN;
  }

  return false;
}, mouseOutAnchor: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Popup.state_PAUSE_BEFORE_OPEN);
    }

    return Webr.component.Popup.state_CLOSED;
  }

  return false;
}, hide: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Popup.state_PAUSE_BEFORE_OPEN);
    }

    return Webr.component.Popup.state_CLOSED;
  }

  return false;
}, disable: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Popup.state_PAUSE_BEFORE_OPEN);
    }

    return Webr.component.Popup.state_DISABLED;
  }

  return false;
}};
Webr.component.Popup.state_PAUSE_BEFORE_CLOSE = {name: "PAUSE_BEFORE_CLOSE", onenter: function () {
  this._startHideTimer();
}, onexit: function () {
  this._stopHideTimer();
}, tick: function () {
  if (true) {
    this._hide();
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Popup.state_PAUSE_BEFORE_CLOSE);
    }

    return Webr.component.Popup.state_CLOSED;
  }

  return false;
}, hide: function () {
  if (true) {
    this._hide();
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Popup.state_PAUSE_BEFORE_CLOSE);
    }

    return Webr.component.Popup.state_CLOSED;
  }

  return false;
}, mouseOverAnchor: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Popup.state_PAUSE_BEFORE_CLOSE);
    }

        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Popup.state_OPEN);
    }

    return Webr.component.Popup.state_OPEN;
  }

  return false;
}, mouseOverPanel: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Popup.state_PAUSE_BEFORE_CLOSE);
    }

        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Popup.state_OPEN);
    }

    return Webr.component.Popup.state_OPEN;
  }

  return false;
}, disable: function () {
  if (true) {
    this._hide();
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Popup.state_PAUSE_BEFORE_CLOSE);
    }

    return Webr.component.Popup.state_DISABLED;
  }

  return false;
}};
Webr.component.Popup.getAnchorPoint = function (element, x, y) {
  var offset = element.offset();
  var width = element.outerWidth();
  var height = element.outerHeight();
  return {left: offset.left + width * x / 2, top: offset.top + height * y / 2};
};
Webr.component.Popup.register = function (path, popupSuffixName) {
  cr.forEach(path, popupSuffixName, function () {
    var e = $(this);
    var groupId = e.attr("gid");
    var lyt = e.attr("lyt");
    var layout = lyt ?parseInt(lyt) :0;
    var result = new Webr.component.Popup(e, groupId ?groupId :Webr.component.Popup.DEFAULT_GROUP_ID);
    result.setLayout(layout);
  });
};
var regPC = Webr.component.Popup.register;
