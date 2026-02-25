var CommandToolbarGuard = {};
CommandToolbarGuard = function (menu) {
  this.visible = true;
  var self = this;
  this.menu = menu;
  this.componentName = menu.button.attr("id").substring(3);
  info("MenuGuard[" + this.componentName + "] created");
  this.refreshListener = {beforeRefresh: function (templatePath) {
    self.onTemplateRefresh(templatePath);
  }};
  this.keyProxy = function (e) {
    if (self.visible && self.menu.isEnabled()) {
      return self.keyHandler(e);
    }

    return true;
  };
  Webr.event.RefreshCommandProcessor.addListener(this.refreshListener);
};
CommandToolbarGuard.prototype.onTemplateRefresh = function (path) {
  if (this.componentName.indexOf(path) == 0) {
    this.finalize();
  }

};
CommandToolbarGuard.prototype.setKeyHandler = function (handler) {
  info("MenuGuard[" + this.componentName + "] keyHandler updated");
  var self = this;
  if (this.keyHandler) {
    $(document).unbind("keydown", this.keyProxy);
  }

  this.keyHandler = handler;
  if (handler) {
    $(document).keydown(this.keyProxy);
  }

};
CommandToolbarGuard.prototype.setTimer = function (timer, duration) {
  info("MenuGuard[" + this.componentName + "] timer updated");
  if (this.timerId) {
    window.clearInterval(this.timerId);
    this.timerId = null;
  }

  if (timer) {
    this.timerId = window.setInterval(timer, duration);
  }

};
CommandToolbarGuard.prototype.setVisible = function (visible) {
  info("MenuGuard[" + this.componentName + "] " + (visible ?"visible" :"hidden"));
  this.visible = visible;
};
CommandToolbarGuard.prototype.finalize = function () {
  this.setKeyHandler(null);
  this.setTimer(null, 0);
  info("MenuGuard[" + this.componentName + "] destroyed");
  this.componentName = null;
  this.keyProxy = null;
  Webr.event.RefreshCommandProcessor.removeListener(this.refreshListener);
  this.refreshListener = null;
  this.menu["guard"] = null;
};
CommandToolbarGuard.registerHandlers = function (menu, keyDownHandler, timerHandler) {
  var guard = CommandToolbarGuard.get(Webr.component.Menu.getMenu(menu));
  guard.setKeyHandler(keyDownHandler);
  guard.setTimer(timerHandler, 250);
};
CommandToolbarGuard.get = function (menu) {
  if (!menu["guard"]) {
    menu["guard"] = new CommandToolbarGuard(menu);
  }

  return menu["guard"];
};
