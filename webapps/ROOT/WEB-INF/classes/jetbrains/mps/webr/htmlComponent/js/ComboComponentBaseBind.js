Webr.component.ComboComponentBaseBind = function (comboComponent, bindToElement) {
  Webr.component.ComboComponentBaseBind.superclass.constructor.call(this);
  this.current_state = null;
  this.comboComponent = comboComponent;
  this.bindedToElement = bindToElement;
  this.jQbindedElement = $(bindToElement);
  this.comboComponent.setPositionWatcher(new Webr.component.PositionWatcher(null, bindToElement, comboComponent.mainElement, true));
  var it = this;
  this.comboComponent.addListener(this);
  this.jQbindedElement.click(function (e) {
    //ignore click to links
    if (e.targetIs(["A", "IMG"]) && e.target != it.bindedToElement) {
    } else {
      it.toggle();
      return false;
    }

  });
  this.jQbindedElement.mousedown(function (e) {
    if (e.target == it.bindedToElement || it.jQbindedElement.ancestorOf(e.target)) {
      it.comboComponent.unhandleBlur();
    }

  });
  this.overrideBaseFunctions();
  this.moveToRoot();
  this.current_state = Webr.component.ComboComponentBaseBind.state_HIDDN;
};
{
  var F = new Function();
  F.prototype = Webr.component.ComboComponentListener.prototype;
  Webr.component.ComboComponentBaseBind.prototype = new F();
  Webr.component.ComboComponentBaseBind.prototype.constructor = Webr.component.ComboComponentBaseBind;
  Webr.component.ComboComponentBaseBind.superclass = Webr.component.ComboComponentListener.prototype;
}

Webr.component.ComboComponentBaseBind.prototype.makeVisible = function () {
};
Webr.component.ComboComponentBaseBind.prototype.makeHidden = function () {
};
Webr.component.ComboComponentBaseBind.prototype.submitted = function (option, source) {
};
Webr.component.ComboComponentBaseBind.prototype.overrideBaseFunctions = function () {
  var it = this;
  this.comboComponent.showLoading = function (parent) {
    it.comboComponent.loadingTimeoutProc = window.setTimeout(function () {
      it.comboComponent.mainElement.show();
      it.comboComponent.inputElement.focus();
      it.comboComponent.jQinputElement.after(it.comboComponent.getLoadingDiv());
    }, 500);
  };
  this.comboComponent.hideLoading = function () {
    if (it.comboComponent.loadingDiv) {
      it.comboComponent.mainElement.hide();
      it.comboComponent.getLoadingDiv().remove();
    } else {
      window.clearTimeout(it.comboComponent.loadingTimeoutProc);
    }

  };
  this.comboComponent.createListWrapper = function () {
    it.createListWrapper(it.comboComponent);
  };
  this.comboComponent.deinit = function () {
    it.comboComponent.jQinputElement.unbind();
    it.jQbindedElement.unbind();
  };
};
Webr.component.ComboComponentBaseBind.prototype.createListWrapper = function (component) {
  component.listWrapper = $(document.createElement("div")).addClass("contentWrapper").css("width", component.mainElement.width()).hide();
  component.mainElement.append(component.listWrapper);
};
Webr.component.ComboComponentBaseBind.prototype.moveToRoot = function () {
  var e = this.comboComponent.getElement();
  e.setAttribute("_cn", this.comboComponent.componentName);
  e.parentNode.removeChild(e);
  this.comboComponent.root.append(e);
};
Webr.component.ComboComponentBaseBind.prototype.show = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "show", arguments);
};
Webr.component.ComboComponentBaseBind.prototype.toggle = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "toggle", arguments);
};
Webr.component.ComboComponentBaseBind.prototype.hide = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "hide", arguments);
};
Webr.component.ComboComponentBaseBind.state_HIDDN = {name: "HIDDN", toggle: function () {
  if (true) {
    this.comboComponent.show();
    return ;
  }

  return false;
}, show: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.ComboComponentBaseBind.state_SHWN);
    }

    return Webr.component.ComboComponentBaseBind.state_SHWN;
  }

  return false;
}};
Webr.component.ComboComponentBaseBind.state_SHWN = {name: "SHWN", onenter: function () {
  this.comboComponent.mainElement.show();
  this.makeVisible();
}, onexit: function () {
  this.makeHidden();
  this.comboComponent.mainElement.hide();
}, hide: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.ComboComponentBaseBind.state_SHWN);
    }

    return Webr.component.ComboComponentBaseBind.state_HIDDN;
  }

  return false;
}, toggle: function () {
  if (true) {
    this.comboComponent.blur();
    return ;
  }

  return false;
}};
