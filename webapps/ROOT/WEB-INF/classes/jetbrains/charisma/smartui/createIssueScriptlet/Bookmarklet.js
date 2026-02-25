cr.setTemplateBind("Bookmarklet", function (path) {
  cr.ach(path, "submit", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_submit", {});
  });
  cr.ach(path, "summary", "keydown", function (event, data) {
    if (event.isCtrl(Webr.util.Key.ENTER)) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_submit", {});
    }

  });
  cr.ach(path, "description", "keydown", function (event, data) {
    if (event.isCtrl(Webr.util.Key.ENTER)) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_submit", {});
    }

  });
  cr.ach(path, "file", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_addFile", {});
  });
  cr.ach(path, "shot", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_takeScreenshot", {});
  });
  cr.ash(path, "clear", "click", null);
  cr.ash(path, "project", "Submit", null);
  cr.ash(path, "project", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  regCC(path, "project");
});
