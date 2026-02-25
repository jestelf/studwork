Webr.component.panel.Dialog = function (dialog) {
  this.visible = false;
  this.current_state = null;
  Webr.component.panel.Dialog.superclass.constructor.call(this, dialog);
  this.initEvents();
  this.current_state = Webr.component.panel.Dialog.state_STATIC;
};
{
  var F = new Function();
  F.prototype = Webr.component.panel.Panel.prototype;
  Webr.component.panel.Dialog.prototype = new F();
  Webr.component.panel.Dialog.prototype.constructor = Webr.component.panel.Dialog;
  Webr.component.panel.Dialog.superclass = Webr.component.panel.Panel.prototype;
}

Webr.component.panel.Dialog.prototype.setVisibleAnimated = function (visible) {
  var _anchor;
  if (!this.anchor) {
    return ;
  } else {
    _anchor = document.getElementById(this.anchor);
    if (_anchor) {
      _anchor = $(_anchor);
    } else {
      _anchor = $(this.anchor);
    }

  }

  this.animationDiv = $(document.createElement("div")).addClass("jt-dialog-animation");
  document.body.appendChild(this.animationDiv.get(0));
  var it = this;
  if (visible) {
    this.centerDialog();
    this.animationDiv.css(this.getBorders(_anchor));
    this.animationDiv.show();
    this.animationDiv.animate(this.getPanelBorders(), Webr.component.panel.Dialog.ANIMATION_SPEED, function () {
      it.animationDiv.remove();
      Webr.component.panel.Dialog.setVisibleModalDiv(visible);
      it._setVisible(visible);
    });
  } else {
    Webr.component.panel.Dialog.superclass.setVisible.call(this, visible);
    Webr.component.panel.Dialog.setVisibleModalDiv(visible);
    this.animationDiv.css(this.getPanelBorders());
    this.animationDiv.show();
    this.animationDiv.animate(this.getBorders(_anchor), Webr.component.panel.Dialog.ANIMATION_SPEED, function () {
      it.animationDiv.remove();
    });
  }

};
Webr.component.panel.Dialog.prototype._setVisible = function (visible) {
  Webr.component.panel.Dialog.superclass.setVisible.call(this, visible);
};
Webr.component.panel.Dialog.prototype.getPanelBorders = function () {
  var c = this.centerPosition();
  return {top: c.top + "px", left: c.left + "px", width: this.panel.width() + "px", height: this.panel.height() + "px"};
};
Webr.component.panel.Dialog.prototype.getBorders = function (e) {
  var _e = $(e);
  return {top: _e.offset().top + "px", left: _e.offset().left + "px", width: _e.width() + "px", height: _e.height() + "px"};
};
Webr.component.panel.Dialog.prototype.setVisible = function (visible, anchor) {
  //do nothing if already visible or not
  if (this.visible == visible) {
    if (!visible) {
      //in case of dialog refresh, model div may stays visible
      Webr.component.panel.Dialog.setVisibleModalDiv(false);
    }

    return ;
  }

  //show/hide dialog and modal div
  if (anchor) {
    this.anchor = anchor;
    this.setVisibleAnimated(visible);
  } else {
    Webr.component.panel.Dialog.setVisibleModalDiv(visible);
    if (visible) {
      this.centerDialog();
    }

    Webr.component.panel.Dialog.superclass.setVisible.call(this, visible);
    this.panel.find("a." + "jt-dialod-focus").focus();
  }

  //clear error messages if closed
  if (!visible) {
    this.clearMessages();
  }

  this.visible = visible;
};
Webr.component.panel.Dialog.prototype.clearMessages = function () {
  Webr.ErrorMessage.closePopup();
};
Webr.component.panel.Dialog.prototype.getAnchor = function () {
  return this.anchor;
};
Webr.component.panel.Dialog.prototype.centerDialog = function () {
  var c = this.centerPosition();
  this.panel.get(0).style.left = c.left + "%";
  this.panel.get(0).style.top = c.top + "%";
};
Webr.component.panel.Dialog.prototype.centerPosition = function () {
  var w = Webr.util.Util.vpWidth();
  var h = Webr.util.Util.vpHeight();
  var dW = this.panel.width() / 2;
  var dH = this.panel.height() / 3;
  var top = 33 - (dH * 100) / h;
  var left = 50 - (dW * 100) / w;
  return {top: top > 0 ?Math.round(top) :0, left: left > 0 ?Math.round(left) :0};
};
Webr.component.panel.Dialog.prototype.mouseDownT = function (e) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mouseDownT", arguments);
};
Webr.component.panel.Dialog.prototype.mouseMoveT = function (e) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mouseMoveT", arguments);
};
Webr.component.panel.Dialog.prototype.mouseOutT = function (e) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mouseOutT", arguments);
};
Webr.component.panel.Dialog.prototype.mouseUpT = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mouseUpT", arguments);
};
Webr.component.panel.Dialog.prototype.initEvents = function () {
  this.title = this.panel.find("." + "jt-panel-title");
  var it = this;
  this.title.mousedown(function (e) {
    it.mouseDownT(e);
  });
  this.title.mouseup(function () {
    it.mouseUpT();
  });
  this.title.mouseout(function (e) {
    it.mouseMoveT(e);
  });
  this.mouseMover = function (e) {
    it.mouseMoveT(e);
    $(document).bind("selectstart", function () {
      return false;
    });
  };
};
Webr.component.panel.Dialog.prototype.releaseDrag = function () {
  $(document).unbind("mousemove", this.mouseMover);
  $(document).unbind("selectstart");
};
Webr.component.panel.Dialog.prototype.initDrag = function (e) {
  if (e.pageX || e.pageY) {
    this.mX = e.pageX;
    this.mY = e.pageY;
  } else {
    if (e.clientX || e.clientY) {
      this.mX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      this.mY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

  }

  this.pX = this.panel.offset().left;
  this.pY = this.panel.offset().top;
  $(document).mousemove(this.mouseMover);
};
Webr.component.panel.Dialog.prototype.Drag = function (e) {
  $(document.body).focus();
  var dX = e.clientX - this.mX;
  var dY = e.clientY - this.mY;
  this.panel.css("left", this.pX + dX, "px");
  this.panel.css("top", this.pY + dY, "px");
};
Webr.component.panel.Dialog.prototype.historyChanged = function (token) {
  if (this.visible) {
    //Send event to server
    this.onhistorychanged(token);
  }

};
Webr.component.panel.Dialog.ANIMATION_SPEED = 150;
Webr.component.panel.Dialog.MODAL_DIV_VISIBLE = false;
Webr.component.panel.Dialog.state_STATIC = {name: "STATIC", mouseDownT: function (e) {
  if (true) {
    this.initDrag(e);
    return Webr.component.panel.Dialog.state_FLOAT;
  }

  return false;
}};
Webr.component.panel.Dialog.state_FLOAT = {name: "FLOAT", mouseMoveT: function (e) {
  if (true) {
    this.Drag(e);
    return ;
  }

  return false;
}, mouseOutT: function (e) {
  if (true) {
    this.releaseDrag();
    return Webr.component.panel.Dialog.state_STATIC;
  }

  return false;
}, mouseUpT: function () {
  if (true) {
    this.releaseDrag();
    return Webr.component.panel.Dialog.state_STATIC;
  }

  return false;
}};
Webr.component.panel.Dialog.setVisibleModalDiv = function (visible) {
  if (!visible && !Webr.component.panel.Dialog.MODAL_DIV_VISIBLE) {
    return ;
  }

  if (Webr.component.panel.Dialog.MODAL_DIV == null) {
    var d = document.createElement("div");
    $(d).addClass("jt-dialog-mask");
    Webr.component.panel.Dialog.MODAL_DIV = d;
  }

  if (visible) {
    document.body.appendChild(Webr.component.panel.Dialog.MODAL_DIV);
  } else {
    document.body.removeChild(Webr.component.panel.Dialog.MODAL_DIV);
  }

  Webr.component.panel.Dialog.MODAL_DIV_VISIBLE = visible;
};
Webr.component.panel.Dialog.setVisibleDialog = function (dialog, visible, anchor) {
  if (dialog && dialog.setVisible) {
    dialog.setVisible(visible, anchor);
  }

  //just in case
  Webr.component.panel.Dialog.setVisibleModalDiv(visible);
};
Webr.component.panel.Dialog.registerDialog = function (path, name) {
  cr.forEach(path, name, function () {
    new Webr.component.panel.Dialog($(this));
  });
};
Webr.component.panel.Dialog.isModalVisible = function () {
  return Webr.component.panel.Dialog.MODAL_DIV_VISIBLE;
};
var regdlg = Webr.component.panel.Dialog.registerDialog;
