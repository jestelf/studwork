cr.setTemplateBind("EditTeamcityServerDialog", function (path) {
  cr.ach(path, "editTeamcityServerDlg", "keydown", function (event, data) {
    return event.handleEnterEsc(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_save", {});
    }, function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
    });
  });
  cr.ash(path, "calcel", "click", null);
  cr.ash(path, "save", "click", null);
  regdlg(path, "editTeamcityServerDlg");
});
