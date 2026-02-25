Webr.component.ComboComponentBase = function (mainElement, inputElement) {
  Webr.component.ComboComponentBase.superclass.constructor.call(this);
  this.inputElement = null;
  this.jQinputElement = null;
  this.mainElement = null;
  this.inited = false;
  this.onInitValueChanged = false;
  this.current_state = null;
  this.inputElement = inputElement;
  this.jQinputElement = $(inputElement);
  this.mainElement = $(mainElement);
  this.componentName = mainElement.id.substring(3);
  this.root = $(this.findRoot());
  var it = this;
    {
    Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.ComboComponentBase.state_INITIAL);
  }

  this.current_state = Webr.component.ComboComponentBase.state_INITIAL;
};
{
  var F = new Function();
  F.prototype = Webr.component.Component.prototype;
  Webr.component.ComboComponentBase.prototype = new F();
  Webr.component.ComboComponentBase.prototype.constructor = Webr.component.ComboComponentBase;
  Webr.component.ComboComponentBase.superclass = Webr.component.Component.prototype;
}

Webr.component.ComboComponentBase.prototype.init = function () {
  if (!this.inited) {
    //Unbind focus if exists
    this.jQinputElement.unbind("focus");
    this.inputElement.attachWatcher(true);
    this.inputElement.setWatcherDelay(0);
    var it = this;
    //bind
    this.jQinputElement.bind("valuechange", function () {
      it.valueChange();
    });
    this.jQinputElement.focus(function () {
      it.focus();
      it.jQinputElement.select();
    });
    this.jQinputElement.click(function () {
      it.jQinputElement.select();
      it.show();
      return false;
    });
    this.jQinputElement.blur(function () {
      //TODO: why do we need this blur - we have handleBlur and unhandleBlur already?
      it.inputBlur();
    });
    this.jQinputElement.keydown(function (event) {
      if (event.isKey(Webr.util.Key.ENTER)) {
        it.kenter(event);
      }

      if (event.isKey(Webr.util.Key.ESC)) {
        it.kesc(event);
      }

    });
    //Kill Key press, use keydown (KeyPress is first in some browsers - IE)
    this.jQinputElement.keypress(function (event) {
      if (event.isKey(Webr.util.Key.ENTER) || event.isKey(Webr.util.Key.ESC)) {
        return false;
      }

      return true;
    });
    Webr.util.Util.addKeyHandler(this.jQinputElement, function (event) {
      return it.handleKeys(event);
    });
    this.mouseDownFunction = function (event) {
      return it.mdown(event);
    };
    this.keyDownFunction = function (event) {
      if (event.isKey(Webr.util.Key.TAB)) {
        it.ktab(event);
      }

      if (event.isShift(Webr.util.Key.TAB)) {
        it.blur();
      }

    };
    this.inited = true;
  }

};
Webr.component.ComboComponentBase.prototype.deinit = function () {
  this.jQinputElement.unbind();
};
Webr.component.ComboComponentBase.prototype.findRoot = function () {
  return this.mainElement.closest("div.jt-dialog").get(0) || document.body;
};
Webr.component.ComboComponentBase.prototype.handleBlur = function () {
  var d = $(Webr.util.Util.isIE ?document.body :document);
  d.mousedown(this.mouseDownFunction);
  Webr.util.Util.addKeyHandler(d, this.keyDownFunction);
};
Webr.component.ComboComponentBase.prototype.unhandleBlur = function () {
  var d = $(Webr.util.Util.isIE ?document.body :document);
  d.unbind("mousedown", this.mouseDownFunction);
  Webr.util.Util.removeKeyHandler(d, this.keyDownFunction);
};
Webr.component.ComboComponentBase.prototype.getLoadingDiv = function () {
  if (!this.loadingDiv) {
    this.loadingDiv = $(document.createElement("div")).addClass("combobox-loading");
  }

  return this.loadingDiv;
};
Webr.component.ComboComponentBase.prototype.highlight = function (message, dismissOnFocus) {
  this.inputElement.highlight(message, dismissOnFocus);
};
Webr.component.ComboComponentBase.prototype.setFocusNoEvents = function () {
  this.inputElement.focus();
};
Webr.component.ComboComponentBase.prototype.handleKeys = function (event) {
  if (event.isKey(Webr.util.Key.DOWN)) {
    this.kdown();
    return false;
  }

  if (event.isKey(Webr.util.Key.UP)) {
    this.kup();
    return false;
  }

  if (event.isKey(Webr.util.Key.PAGEDOWN)) {
    this.dataList.select_last();
    return false;
  }

  if (event.isKey(Webr.util.Key.PAGEUP)) {
    this.dataList.select_first();
    return false;
  }

  return this.fireKeyDown(event);
};
Webr.component.ComboComponentBase.prototype.getPositionWatcher = function () {
  return this.positionWatcher ?this.positionWatcher :null;
};
Webr.component.ComboComponentBase.prototype.setPositionWatcher = function (watcher) {
  this.positionWatcher = watcher;
};
Webr.component.ComboComponentBase.prototype.makeVisible = function () {
  this.mainElement.show();
  this.positionWatcher.fix();
  this.setFocusNoEvents();
};
Webr.component.ComboComponentBase.prototype.makeHidden = function () {
  this.mainElement.hide();
};
Webr.component.ComboComponentBase.prototype.inputValueChanged = function (value) {
};
Webr.component.ComboComponentBase.prototype.update = function (options, size, from, to, hidePaganation) {
};
Webr.component.ComboComponentBase.prototype.submit = function (option) {
};
Webr.component.ComboComponentBase.prototype.callLoading = function (prefix) {
};
Webr.component.ComboComponentBase.prototype.renderList = function () {
};
Webr.component.ComboComponentBase.prototype.createListWrapper = function () {
};
Webr.component.ComboComponentBase.prototype.getElement = function () {
  return this.mainElement.get(0);
};
Webr.component.ComboComponentBase.prototype.showLoading = function (parent) {
  var it = this;
  this.loadingTimeoutProc = window.setTimeout(function () {
    parent.after(it.getLoadingDiv());
  }, 500);
};
Webr.component.ComboComponentBase.prototype.hideLoading = function () {
  if (this.loadingDiv) {
    this.getLoadingDiv().remove();
  } else {
    window.clearTimeout(this.loadingTimeoutProc);
  }

};
Webr.component.ComboComponentBase.prototype.show = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "show", arguments);
};
Webr.component.ComboComponentBase.prototype.hide = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "hide", arguments);
};
Webr.component.ComboComponentBase.prototype.focus = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "focus", arguments);
};
Webr.component.ComboComponentBase.prototype.blur = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "blur", arguments);
};
Webr.component.ComboComponentBase.prototype.toggle = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "toggle", arguments);
};
Webr.component.ComboComponentBase.prototype.inputBlur = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "inputBlur", arguments);
};
Webr.component.ComboComponentBase.prototype.valueChange = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "valueChange", arguments);
};
Webr.component.ComboComponentBase.prototype.loaded = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "loaded", arguments);
};
Webr.component.ComboComponentBase.prototype.reload = function (s) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "reload", arguments);
};
Webr.component.ComboComponentBase.prototype.mdown = function (event) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mdown", arguments);
};
Webr.component.ComboComponentBase.prototype.keydown = function (event) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "keydown", arguments);
};
Webr.component.ComboComponentBase.prototype.kdown = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "kdown", arguments);
};
Webr.component.ComboComponentBase.prototype.kup = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "kup", arguments);
};
Webr.component.ComboComponentBase.prototype.kesc = function (e) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "kesc", arguments);
};
Webr.component.ComboComponentBase.prototype.kenter = function (e) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "kenter", arguments);
};
Webr.component.ComboComponentBase.prototype.ktab = function (e) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "ktab", arguments);
};
Webr.component.ComboComponentBase.prototype.drop = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "drop", arguments);
};
Webr.component.ComboComponentBase.state_INITIAL = {name: "INITIAL", onenter: function () {
  this.init();
}, focus: function () {
  if (true) {
    return Webr.component.ComboComponentBase.state_NOT_INITED_FOCUSED;
  }

  return false;
}, show: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.ComboComponentBase.state_INITED_LOADING);
    }

    return Webr.component.ComboComponentBase.state_INITED_LOADING;
  }

  return false;
}, toggle: function () {
  if (true) {
    this.show();
    return ;
  }

  return false;
}};
Webr.component.ComboComponentBase.state_NOT_INITED_FOCUSED = {name: "NOT_INITED_FOCUSED", show: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.ComboComponentBase.state_INITED_LOADING);
    }

    return Webr.component.ComboComponentBase.state_INITED_LOADING;
  }

  return false;
}, inputBlur: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.ComboComponentBase.state_INITIAL);
    }

    return Webr.component.ComboComponentBase.state_INITIAL;
  }

  return false;
}, kdown: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.ComboComponentBase.state_INITED_LOADING);
    }

    return Webr.component.ComboComponentBase.state_INITED_LOADING;
  }

  return false;
}, kup: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.ComboComponentBase.state_INITED_LOADING);
    }

    return Webr.component.ComboComponentBase.state_INITED_LOADING;
  }

  return false;
}, valueChange: function () {
  if (true) {
    this.onInitValueChanged = true;
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.ComboComponentBase.state_INITED_LOADING);
    }

    return Webr.component.ComboComponentBase.state_INITED_LOADING;
  }

  return false;
}, toggle: function () {
  if (true) {
    this.show();
    return ;
  }

  return false;
}};
Webr.component.ComboComponentBase.state_INITED = {name: "INITED"};
Webr.component.ComboComponentBase.state_INITED_LOADING = {name: "INITED_LOADING", parentState: Webr.component.ComboComponentBase.state_INITED, onenter: function () {
  this.callLoading();
  this.showLoading(this.jQinputElement);
}, onexit: function () {
  this.hideLoading();
}, hide: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.ComboComponentBase.state_INITED_LOADING);
    }

        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.ComboComponentBase.state_INITIAL);
    }

    return Webr.component.ComboComponentBase.state_INITIAL;
  }

  return false;
}, inputBlur: function () {
  if (true) {
    this.hide();
    return ;
  }

  return false;
}, toggle: function () {
  if (true) {
    this.hide();
    return ;
  }

  return false;
}, valueChange: function () {
  if (true) {
    this.onInitValueChanged = true;
    return ;
  }

  return false;
}, loaded: function () {
  if (true) {
    this.fire(function (l) {
      l.updated();
    });
    if (this.onInitValueChanged) {
      this.inputValueChanged(this.inputElement.value);
      this.onInitValueChanged = false;
    }

        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.ComboComponentBase.state_INITED_LOADING);
    }

        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.ComboComponentBase.state_INITED_SHOWN);
    }

    return Webr.component.ComboComponentBase.state_INITED_SHOWN;
  }

  return false;
}};
Webr.component.ComboComponentBase.state_INITED_HIDDEN = {name: "INITED_HIDDEN", parentState: Webr.component.ComboComponentBase.state_INITED, focus: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.ComboComponentBase.state_INITED_FOCUSED);
    }

    return Webr.component.ComboComponentBase.state_INITED_FOCUSED;
  }

  return false;
}, show: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.ComboComponentBase.state_INITED_SHOWN);
    }

    return Webr.component.ComboComponentBase.state_INITED_SHOWN;
  }

  return false;
}, drop: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.ComboComponentBase.state_INITIAL);
    }

    return Webr.component.ComboComponentBase.state_INITIAL;
  }

  return false;
}, toggle: function () {
  if (true) {
    this.show();
    return ;
  }

  return false;
}};
Webr.component.ComboComponentBase.state_INITED_FOCUSED = {name: "INITED_FOCUSED", parentState: Webr.component.ComboComponentBase.state_INITED, onenter: function () {
  this.fire(function (l) {
    l.focus();
  });
}, show: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.ComboComponentBase.state_INITED_SHOWN);
    }

    return Webr.component.ComboComponentBase.state_INITED_SHOWN;
  }

  return false;
}, kdown: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.ComboComponentBase.state_INITED_SHOWN);
    }

    return Webr.component.ComboComponentBase.state_INITED_SHOWN;
  }

  return false;
}, kup: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.ComboComponentBase.state_INITED_SHOWN);
    }

    return Webr.component.ComboComponentBase.state_INITED_SHOWN;
  }

  return false;
}, kenter: function (e) {
  if (true) {
    this.submit(this.dataList.getCurrentOption());
    return ;
  }

  return false;
}, valueChange: function () {
  if (true) {
    this.inputValueChanged(this.inputElement.value);
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.ComboComponentBase.state_INITED_SHOWN);
    }

    return Webr.component.ComboComponentBase.state_INITED_SHOWN;
  }

  return false;
}, inputBlur: function () {
  if (true) {
    return Webr.component.ComboComponentBase.state_INITED_HIDDEN;
  }

  return false;
}, toggle: function () {
  if (true) {
    this.show();
    return ;
  }

  return false;
}};
Webr.component.ComboComponentBase.state_INITED_SHOWN = {name: "INITED_SHOWN", parentState: Webr.component.ComboComponentBase.state_INITED, onenter: function () {
  this.fire(function (l) {
    l.show();
  });
  this.handleBlur();
  this.makeVisible();
}, onexit: function () {
  this.unhandleBlur();
  this.makeHidden();
  this.fire(function (l) {
    l.hide();
  });
}, mdown: function (event) {
  if (true) {
    if (!(this.mainElement.ancestorOf(event.target)) && !(this.listWrapper.ancestorOf(event.target))) {
      this.blur();
      return ;
    }

    this.setFocusNoEvents();
    return ;
  }

  return false;
}, valueChange: function () {
  if (true) {
    this.inputValueChanged(this.inputElement.value);
    return ;
  }

  return false;
}, kenter: function (e) {
  if (true) {
    this.submit(this.dataList.getCurrentOption());
    e.preventDefault();
    return ;
  }

  return false;
}, ktab: function (e) {
  if (true) {
    this.submit(this.dataList.getCurrentOption());
    return ;
  }

  return false;
}, kdown: function () {
  if (true) {
    this.dataList.select_next();
    return ;
  }

  return false;
}, kup: function () {
  if (true) {
    this.dataList.select_prev();
    return ;
  }

  return false;
}, kesc: function (e) {
  if (true) {
    this.hide();
    e.stopImmediatePropagation();
    return ;
  }

  return false;
}, loaded: function () {
  if (true) {
    this.setFocusNoEvents();
    return ;
  }

  return false;
}, reload: function (s) {
  if (true) {
    this.callLoading(s);
    return ;
  }

  return false;
}, hide: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.ComboComponentBase.state_INITED_SHOWN);
    }

        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.ComboComponentBase.state_INITED_FOCUSED);
    }

    return Webr.component.ComboComponentBase.state_INITED_FOCUSED;
  }

  return false;
}, blur: function () {
  if (true) {
    this.fire(function (l) {
      l.blur();
    });
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.ComboComponentBase.state_INITED_SHOWN);
    }

    return Webr.component.ComboComponentBase.state_INITED_HIDDEN;
  }

  return false;
}, toggle: function () {
  if (true) {
    this.hide();
    return ;
  }

  return false;
}};
Webr.component.ComboComponentListener = function () {
  Webr.component.ComboComponentListener.superclass.constructor.call(this);
};
{
  var F = new Function();
  F.prototype = Webr.component.ComponentListener.prototype;
  Webr.component.ComboComponentListener.prototype = new F();
  Webr.component.ComboComponentListener.prototype.constructor = Webr.component.ComboComponentListener;
  Webr.component.ComboComponentListener.superclass = Webr.component.ComponentListener.prototype;
}

Webr.component.ComboComponentListener.prototype.show = function (source) {
};
Webr.component.ComboComponentListener.prototype.hide = function (source) {
};
Webr.component.ComboComponentListener.prototype.blur = function (source) {
};
Webr.component.ComboComponentListener.prototype.focus = function (source) {
};
Webr.component.ComboComponentListener.prototype.updated = function () {
};
Webr.component.ComboComponentListener.prototype.submitted = function (option, source) {
};
