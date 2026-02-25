cr.setTemplateBind("EditGroupMain", function (path) {
  cr.ach(path, "saveGroup", "keydown", function (event, data) {
    if (event.isCtrl(Webr.util.Key.ENTER)) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_save", {});
    }

  });
  cr.ach(path, "groupName", "keydown", function (event, data) {
    if (event.isCtrl(Webr.util.Key.ENTER)) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_save", {});
    }

  });
  cr.ach(path, "groupDef", "keydown", function (event, data) {
    if (event.isCtrl(Webr.util.Key.ENTER)) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_save", {});
    }

  });
  cr.ach(path, "groupDescr", "keydown", function (event, data) {
    if (event.isCtrl(Webr.util.Key.ENTER)) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_save", {});
    }

  });
  cr.ash(path, "changeIcon", "click", null);
  cr.ash(path, "ai" + "." + "removeIcon", "click", null);
  cr.ash(path, "saveGroup", "click", null);
  cr.ash(path, "cancelGroup", "click", null);
});
