cr.setTemplateBind("Users", function (path) {
  cr.ach(path, "usersList" + "." + "deleteUser", "click", function (event, data) {
    if (window.confirm("Are you sure?")) {
      if (window.confirm("Really?")) {
        cr.serverMethodCallInHandler(event, "" + "." + "methodCall_delete", {__param__u: cr.getTarget(event).getAttribute("p0")});
      }

    }

  });
  cr.ach(path, "createNewUser", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_createNewUser", {});
  });
  cr.ach(path, "redirectToRegistration", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_redirectToRegistration", {});
  });
  cr.ach(path, "queryText", "keydown", function (event, data) {
    if (event.isCtrl(Webr.util.Key.ENTER)) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_search", {});
    }

  });
  cr.ach(path, "groupFilter", "keydown", function (event, data) {
    if (event.isCtrl(Webr.util.Key.ENTER)) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_search", {});
    }

  });
  cr.ach(path, "roleFilter", "keydown", function (event, data) {
    if (event.isCtrl(Webr.util.Key.ENTER)) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_search", {});
    }

  });
  cr.ach(path, "projectFilter", "keydown", function (event, data) {
    if (event.isCtrl(Webr.util.Key.ENTER)) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_search", {});
    }

  });
  cr.ach(path, "permissionFilter", "keydown", function (event, data) {
    if (event.isCtrl(Webr.util.Key.ENTER)) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_search", {});
    }

  });
  cr.ash(path, "usersList" + "." + "banUser", "click", null);
  cr.ash(path, "queryText", "enter", null);
  cr.ash(path, "searchButton", "click", null);
  cr.ash(path, "resetButton", "click", null);
  cr.ash(path, "groupFilter", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  cr.ash(path, "roleFilter", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  cr.ash(path, "projectFilter", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  cr.ash(path, "permissionFilter", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  regCC(path, "groupFilter");
  regCC(path, "roleFilter");
  regCC(path, "projectFilter");
  regCC(path, "permissionFilter");
  cr.forEach(path, "queryText", function () {
    this.attachWatcher(false);
  });
});
