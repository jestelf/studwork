cr.setTemplateBind("EditBuildDialog", function (path) {
  cr.ach(path, "editBuildDlg", "keydown", function (event, data) {
    return event.handleEnterEsc(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_save", {});
    }, function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
    });
  });
  cr.ach(path, "closeEditBuildDlg", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ach(path, "editBuildDlg", "historychanged", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ash(path, "cancelVersion", "click", null);
  cr.ash(path, "saveVersion", "click", null);
  cr.ash(path, "buildAssembleDate", "DateSelected", null);
  regdlg(path, "editBuildDlg");
  regC(path, "buildAssembleDate");
});
