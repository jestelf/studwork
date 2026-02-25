Webr.component.ToolTip = function (watchElement, elementToolTip, config, overlapPosition) {
  this.follow = false;
  this.opacity = 0;
  this.Delta = 15;
  this.current_state = null;
  this.watchElement = watchElement;
  this.toolTip = elementToolTip;
  this.follow = config.followCursor || this.follow;
  this.overlapPosition = overlapPosition;
  this.createToolTip();
  var it = this;
  $(this.watchElement).mouseover(function (event) {
    it.mover();
  });
  $(this.watchElement).mouseout(function (event) {
    it.mout();
  });
  $(this.watchElement).bind("mousemove", function (event) {
    it.mmove(event.pageX, event.pageY);
  });
  this.current_state = Webr.component.ToolTip.state_INACTIVE;
};
Webr.component.ToolTip.prototype.createToolTip = function () {
  this.container = this.toolTip;
  this.container.style.display = "none";
  this.container.style.position = "absolute";
  $(this.container).addClass("tooltip");
};
Webr.component.ToolTip.prototype.startTimer = function () {
  var it = this;
  this.timer = window.setTimeout(function () {
    it.timeOut();
  }, 5);
};
Webr.component.ToolTip.prototype.cancelTimer = function () {
  window.clearTimeout(this.timer);
};
Webr.component.ToolTip.prototype.startTicker = function () {
  if (!this.ticker) {
    var it = this;
    this.ticker = window.setInterval(function () {
      it.timeTick();
    }, 5);
  }

};
Webr.component.ToolTip.prototype.stopTicker = function () {
  if (this.ticker) {
    window.clearInterval(this.ticker);
    this.ticker = null;
  }

};
Webr.component.ToolTip.prototype.move = function () {
  if (this.y && this.x) {
    this.content.css("top", this.y + 18);
    this.content.css("left", this.x);
  }

};
Webr.component.ToolTip.prototype.show = function () {
  this.obj = this.getTargetWidth();
  if (this.obj.targetWidth == undefined) {
    this.obj.targetWidth = "auto";
  }

  if (this.overlapPosition && this.obj.overlap) {
    $(this.watchElement).addClass("tooltip-overlap");
    $(this.watchElement).css("width", this.obj.targetWidth + "px");
  } else {
    if (!($(this).hasClass("hidden" + "tooltip"))) {
      if (!this.content) {
        this.content = $(this.container);
        $(document.body).append(this.container);
      }

      this.move();
      this.content.fadeIn("def");
    }

  }

};
Webr.component.ToolTip.prototype.hide = function () {
  if (this.overlapPosition && this.obj.overlap) {
    $(this.watchElement).removeClass("tooltip-overlap");
    $(this.watchElement).css("width", "auto");
  } else {
    if (!($(this).hasClass("hidden" + "tooltip"))) {
      this.content.fadeOut("def");
    }

  }

};
Webr.component.ToolTip.prototype.getTargetWidth = function () {
  var el = this.watchElement;
  var s;
  var targetWidth = 0;
  if (el.hasChildNodes()) {
    s = el.firstChild.nodeValue.replace(new RegExp("^\s*", "g"), "").replace(new RegExp("\s*$", "g"), "");
  } else {
    s = $(el).text().replace(new RegExp("^\s*", "g"), "").replace(new RegExp("\s*$", "g"), "");
  }

  targetWidth = Webr.component.FontMetrics.stringWidth(el, s);
  return {targetWidth: targetWidth, elementWidth: $(el).width(), overlap: (($(el).width() - this.Delta) < targetWidth)};
};
Webr.component.ToolTip.prototype.mover = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mover", arguments);
};
Webr.component.ToolTip.prototype.mout = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mout", arguments);
};
Webr.component.ToolTip.prototype.mmove = function (x, y) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mmove", arguments);
};
Webr.component.ToolTip.prototype.timeTick = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "timeTick", arguments);
};
Webr.component.ToolTip.prototype.timeOut = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "timeOut", arguments);
};
Webr.component.ToolTip.state_INACTIVE = {name: "INACTIVE", mmove: function (x, y) {
  if (true) {
    this.x = x;
    this.y = y;
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.ToolTip.state_PAUSED);
    }

    return Webr.component.ToolTip.state_PAUSED;
  }

  return false;
}};
Webr.component.ToolTip.state_PAUSED = {name: "PAUSED", onenter: function () {
  this.startTimer();
}, onexit: function () {
  this.cancelTimer();
}, mmove: function (x, y) {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.ToolTip.state_PAUSED);
    }

    return Webr.component.ToolTip.state_INACTIVE;
  }

  return false;
}, mout: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.ToolTip.state_PAUSED);
    }

    return Webr.component.ToolTip.state_INACTIVE;
  }

  return false;
}, timeOut: function () {
  if (true) {
    this.show();
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.ToolTip.state_PAUSED);
    }

        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.ToolTip.state_SHOWN);
    }

    return Webr.component.ToolTip.state_SHOWN;
  }

  return false;
}};
Webr.component.ToolTip.state_SHOWN = {name: "SHOWN", onenter: function () {
  this.startTicker();
}, onexit: function () {
  this.stopTicker();
}, timeTick: function () {
  if (this.follow) {
    this.move();
    return ;
  }

  return false;
}, mout: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.ToolTip.state_SHOWN);
    }

        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.ToolTip.state_OUT_PAUSE);
    }

    return Webr.component.ToolTip.state_OUT_PAUSE;
  }

  return false;
}, mmove: function (x, y) {
  if (this.follow) {
    this.x = x;
    this.y = y;
    return ;
  }

  return false;
}};
Webr.component.ToolTip.state_OUT_PAUSE = {name: "OUT_PAUSE", onenter: function () {
  this.startTimer();
}, onexit: function () {
  this.cancelTimer();
}, mover: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.ToolTip.state_OUT_PAUSE);
    }

        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.ToolTip.state_SHOWN);
    }

    return Webr.component.ToolTip.state_SHOWN;
  }

  return false;
}, timeOut: function () {
  if (true) {
    this.hide();
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.ToolTip.state_OUT_PAUSE);
    }

    return Webr.component.ToolTip.state_INACTIVE;
  }

  return false;
}};
Webr.component.ToolTip.register = function (path, compName, followCursor) {
  cr.forEach(path, compName, function () {
    var overlap = false;
    var el = $(this);
    var attachTo = document.getElementById(el.attr("bid"));
    $(attachTo).one("mouseover", function () {
      if (el.attr("overlap") != null) {
        overlap = true;
      }

      var toolTip = new Webr.component.ToolTip(attachTo, el.get(0), {followCursor: followCursor}, overlap).mover();
    });
  });
};
Webr.component.ToolTipConfig = function () {
};
var regtt = Webr.component.ToolTip.register;
