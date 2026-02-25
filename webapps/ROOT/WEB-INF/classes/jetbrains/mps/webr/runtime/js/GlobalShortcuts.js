Webr.GlobalShortcuts = function () {
};
Webr.GlobalShortcuts.addBinding = function (config) {
  var target;
  if (Webr.Dialogs.getCurrentDialog() != null) {
    Ext.Element.get(Webr.Dialogs.getCurrentDialog().getEl()).on("keydown", function (e) {
      if (Webr.GlobalShortcuts.testKey(e, config)) {
        config.fn.call();
        e.stopEvent();
      }

    });
  } else {
    Ext.Element.get(document).on("keydown", function (e) {
      //check focus
      if (Webr.Dialogs.getCurrentDialog() != null) {
        //skip - not a dialog shortcut but some dialog is being shown
        return ;
      }

      if (Webr.GlobalShortcuts.testKey(e, config)) {
        config.fn.call();
        e.stopEvent();
      }

    });
  }

};
Webr.GlobalShortcuts.testKey = function (e, config) {
  return Webr.GlobalShortcuts.test(config.alt, e.altKey) && Webr.GlobalShortcuts.test(config.shift, e.shiftKey) && Webr.GlobalShortcuts.test(config.ctrl, e.ctrlKey) && config.key == e.getKey();
};
Webr.GlobalShortcuts.test = function (expected, actual) {
  //compare negotiations to work around undefined values (treat undefined as false)
  return !expected == !actual;
};
Webr.GlobalShortcuts.descr = function (c) {
  var res = "";
  if (c.ctrl) {
    res += "CTRL+";
  }

  if (c.shift) {
    res += "SHIFT+";
  }

  if (c.alt) {
    res += "ALT+";
  }

  res += c.key;
  return res;
};
