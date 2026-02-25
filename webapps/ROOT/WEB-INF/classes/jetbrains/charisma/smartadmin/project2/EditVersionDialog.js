cr.setTemplateBind("EditVersionDialog", function (path) {
  cr.ach(path, "editVersionDlg", "keydown", function (event, data) {
    return event.handleEnterEsc(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_save", {});
    }, function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
    });
  });
  cr.ach(path, "closeEditVersionDlg", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ach(path, "editVersionDlg", "historychanged", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ash(path, "saveVersion", "click", null);
  cr.ash(path, "cancelVersion", "click", null);
  cr.ash(path, "versionReleaseDate", "DateSelected", null);
  regdlg(path, "editVersionDlg");
  regC(path, "versionReleaseDate");
});
