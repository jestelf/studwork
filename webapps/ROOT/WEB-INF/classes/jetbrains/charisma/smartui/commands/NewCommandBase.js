charisma.smartui.NewCommandBase = function (config) {
  charisma.smartui.NewCommandBase.superclass.constructor.call(this);
  this.visible = false;
  this.config = config;
  //turn suggest
  this.suggest = config.commandText.getSuggest();
  this.suggest.getInputPosition = function () {
    var p = $(this.input).offset();
    if (Webr.util.Util.isWebkit) {
      p.top -= document.body.scrollTop;
    } else {
      p.top -= document.documentElement.scrollTop;
    }

    return p;
  };
  this.suggest.suggestDivPosition = "fixed";
  //watcher
  var it = this;
  $(config.commandText).bind("valuechange", function (event, data) {
    it.serverUpdate(data.value, data.caretPos, false);
  }).bind("caretmove", function (event, data) {
    it.serverUpdate(data.value, data.caretPos, false);
  });
  this.suggest.addListener(this);
  config.commandText.attachWatcher(false);
  config.commandText.setWatcherDelay(0);
};
{
  var F = new Function();
  F.prototype = Webr.component.Component.prototype;
  charisma.smartui.NewCommandBase.prototype = new F();
  charisma.smartui.NewCommandBase.prototype.constructor = charisma.smartui.NewCommandBase;
  charisma.smartui.NewCommandBase.superclass = Webr.component.Component.prototype;
}

charisma.smartui.NewCommandBase.prototype.keyhandler = function (e, comment) {
  //handler ctrl-space
  if (e.isCtrl(Webr.util.Key.SPACE)) {
    this.serverUpdate(this.config.commandText.value, this.config.commandText.getCaretPosition(), true);
    return false;
  }

  if (e.isCtrl(Webr.util.Key.ENTER)) {
    $(this.config.submitButton).click();
    return false;
  }

  if (!comment) {
    if (e.isKey(Webr.util.Key.ENTER)) {
      $(this.config.submitButton).click();
      return false;
    }

  }

  return true;
};
charisma.smartui.NewCommandBase.prototype.keyDown = function (source, event) {
  return this.keyhandler(event);
};
charisma.smartui.NewCommandBase.prototype.isVisible = function () {
  return this.visible;
};
charisma.smartui.NewCommandBase.prototype.serverUpdate = function (command, cursorPos, forceSuggestions) {
  var t = this;
  this.callOnVisible(function () {
    t.config.update(command, cursorPos, forceSuggestions);
  });
};
charisma.smartui.NewCommandBase.prototype.callOnVisible = function (f) {
  var t = this;
  this.repeat(function () {
    if (t.isVisible()) {
      f();
    }

    return t.isVisible();
  }, 150, 10);
};
charisma.smartui.NewCommandBase.prototype.repeat = function (f, interval, times) {
  var handle = window.setInterval(function () {
    if (f() || ((times -= 1) < 0)) {
      window.clearTimeout(handle);
    }

  }, interval);
};
charisma.smartui.NewCommandBaseConfig = function () {
};
charisma.smartui.NewCommandBaseConfig.prototype.update = function (command, cursorPos, forceSuggestions) {
};
