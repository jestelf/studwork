cr.setTemplateBind("EditWatchFolderDialog", function (path) {
  cr.ach(path, "editWatchFolderDlg", "keydown", function (event, data) {
    return event.handleEnterEsc(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_save", {});
    }, function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
    });
  });
  cr.ach(path, "cancelWatchFolder", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ach(path, "deleteWatchFolder", "click", function (event, data) {
    if (window.confirm("Are you sure?")) {
      cr.findInHandler(event, "" + "." + "editWatchFolderDlg", []).setVisible(false, cr.findInHandler(event, "" + "." + "editWatchFolderDlg", []).getAnchor());
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_delete", {});
    }

  });
  cr.ach(path, "saveWatchFolder", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_save", {});
  });
  cr.ach(path, "closeEditWatchFolderDlg", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ash(path, "ts" + "." + "tagStyle", "click", null);
  cr.ash(path, "visibleForGroup", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  cr.ash(path, "updateableForGroup", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  cr.ash(path, "associatedProjects", "load", null);
  regCC(path, "visibleForGroup");
  regCC(path, "updateableForGroup");
  regmb(path, "associatedProjects", false);
  regdlg(path, "editWatchFolderDlg");
});
