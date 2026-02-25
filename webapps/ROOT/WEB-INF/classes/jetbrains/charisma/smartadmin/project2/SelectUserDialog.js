cr.setTemplateBind("SelectUserDialog", function (path) {
  cr.ach(path, "selectUserOk", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_submit", {});
  });
  cr.ach(path, "selectUserDlg", "keydown", function (event, data) {
    return event.handleEnterEsc(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_submit", {});
    }, function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
    });
  });
  cr.ach(path, "selectUserDlg", "historychanged", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ach(path, "selectUserCancel", "click", function (event, data) {
    cr.findInHandler(event, "" + "." + "selectUserDlg", []).setVisible(false);
  });
  cr.ach(path, "closeSelectUserDlg", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ash(path, "selectUserCombo", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  regCC(path, "selectUserCombo");
  regdlg(path, "selectUserDlg");
});
