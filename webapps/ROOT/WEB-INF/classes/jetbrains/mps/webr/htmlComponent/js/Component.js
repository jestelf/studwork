Webr.component.Component = function () {
  this.listeners = new Webr.util.Set();
};
Webr.component.Component.prototype.addListener = function (l) {
  this.listeners.add(l);
};
Webr.component.Component.prototype.removeListener = function (l) {
  this.listeners.remove(l);
};
Webr.component.Component.prototype.fireKeyPressed = function (e) {
  var t = this;
  return this.fire(function (l) {
    if (l.keyPressed) {
      return l.keyPressed(t, e);
    } else {
      return true;
    }

  });
};
Webr.component.Component.prototype.fireKeyDown = function (e) {
  var it = this;
  return this.fire(function (l) {
    if (l.keyDown) {
      return l.keyDown(it, e);
    } else {
      return true;
    }

  });
};
Webr.component.Component.prototype.fire = function (f) {
  return this.listeners.forEach(f);
};
Webr.component.ComponentListener = function () {
};
Webr.component.ComponentListener.prototype.keyPressed = function (source, e) {
  return true;
};
Webr.component.ComponentListener.prototype.keyDown = function (source, e) {
  return true;
};
