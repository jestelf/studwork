jQuery.Event.prototype.getKeyCode = function () {
  var keyCode = Webr.util.Util.isSafari ?jQuery.Event.SAFARI_KEYCODES[this.keyCode] || this.keyCode :this.keyCode;
  return keyCode == 0 ?this.which :keyCode;
};
jQuery.Event.prototype.targetIsInput = function () {
  return this.targetIs(["INPUT", "TEXTAREA"]);
};
jQuery.Event.prototype.targetIs = function (tags) {
  for (var i = 0; i < tags.length; i += 1) {
    if (this.target.tagName.toLowerCase() == tags[i].toLowerCase()) {
      return true;
    }

  }

  return false;
};
jQuery.Event.prototype.testKey = function (ctrl, alt, shift, meta, keyCode) {
  var matchesCtrl = (ctrl === undefined || ctrl === this.ctrlKey);
  var matchesAlt = (alt === undefined || alt === this.altKey);
  var matchesShift = (shift === undefined || shift === this.shiftKey);
  var eventMeta = Webr.util.Util.isMac ?this.originalEvent.metaKey :false;
  var matchesMeta = (meta === undefined || meta === eventMeta);
  if (matchesCtrl && matchesAlt && matchesShift && matchesMeta) {
    if (keyCode.length) {
      //array
      var _keyCode = this.getKeyCode();
      for (var i = 0; i < keyCode.length; i += 1) {
        if (keyCode[i] == _keyCode) {
          return true;
        }

      }

    } else {
      return keyCode == undefined ?true :keyCode == this.getKeyCode();
    }

  }

  return false;
};
jQuery.Event.prototype.isKey = function (keyCode, keyCode2, keyCode3, keyCode4) {
  return this.testKey(false, false, false, false, arguments.length <= 1 ?keyCode :arguments);
};
jQuery.Event.prototype.isCtrl = function (keyCode) {
  return this.testKey(true, false, false, false, arguments.length <= 1 ?keyCode :arguments);
};
jQuery.Event.prototype.isAlt = function (keyCode) {
  return this.testKey(false, true, false, false, arguments.length <= 1 ?keyCode :arguments);
};
jQuery.Event.prototype.isAltCtrl = function (keyCode) {
  return this.testKey(true, true, false, false, arguments.length <= 1 ?keyCode :arguments);
};
jQuery.Event.prototype.isShift = function (keyCode) {
  return this.testKey(false, false, true, false, arguments.length <= 1 ?keyCode :arguments);
};
jQuery.Event.prototype.isMeta = function (keyCode) {
  return this.testKey(false, false, false, true, arguments.length <= 1 ?keyCode :arguments);
};
jQuery.Event.prototype.handleEnterEsc = function (onEnter, onEsc) {
  if (this.isKey(Webr.util.Key.ENTER) || this.isCtrl(Webr.util.Key.ENTER)) {
    onEnter();
    return false;
  } else {
    if (this.isKey(Webr.util.Key.ESC)) {
      onEsc();
      return false;
    }

  }

  return true;
};
jQuery.Event.SAFARI_KEYCODES = {63232: 38, 63233: 40, 63234: 37, 63235: 39, 63276: 33, 63277: 34, 63272: 46, 63273: 36, 63275: 35};
Webr.util.Key = function () {
};
Webr.util.Key.SPACE = 32;
Webr.util.Key.ESC = 27;
Webr.util.Key.DELETE = 46;
Webr.util.Key.ENTER = 13;
Webr.util.Key.PAGEUP = 33;
Webr.util.Key.PAGEDOWN = 34;
Webr.util.Key.END = 35;
Webr.util.Key.HOME = 36;
Webr.util.Key.UP = 38;
Webr.util.Key.LEFT = 37;
Webr.util.Key.RIGHT = 39;
Webr.util.Key.DOWN = 40;
Webr.util.Key.TAB = 9;
Webr.util.Key.INSERT = 45;
Webr.util.Key.A = 65;
Webr.util.Key.C = 67;
Webr.util.Key.D = 68;
Webr.util.Key.H = 72;
Webr.util.Key.I = 73;
Webr.util.Key.J = 74;
Webr.util.Key.N = 78;
Webr.util.Key.P = 80;
Webr.util.Key.F2 = 113;
Webr.util.Key.test = function (e, ctrl, alt, shift, keyCode, charCode) {
  return e.ctrlKey == (ctrl || false) && e.altKey == (alt || false) && e.shiftKey == (shift || false) && ((charCode != undefined && e.charCode == charCode) || charCode == undefined) && ((keyCode != undefined && e.getKeyCode() == keyCode) || keyCode == undefined);
};
Webr.util.Key.isKeyNoModifiers = function (e, keyCode, keyCode2) {
  if (keyCode instanceof Array) {
    var res = false;
    jQuery.each(keyCode, function () {
      res = res || Webr.util.Key.isKeyNoModifiers(e, this);
    });
    return res;
  }

  var res = Webr.util.Key.test(e, false, false, false, keyCode);
  if (keyCode2) {
    res = res || Webr.util.Key.isKeyNoModifiers(e, keyCode2);
  }

  return res;
};
Webr.util.Key.isApplicable = function (e, keyMappings) {
  var keyStroke = Webr.util.Util.getKeyStroke(keyMappings);
  if (keyStroke) {
    return e.testKey(keyStroke.ctrl, keyStroke.alt, keyStroke.shift, keyStroke.meta, keyStroke.keyCode);
  }

  return false;
};
