cr.setTemplateBind("EditSubsystemDialog", function (path) {
  cr.ach(path, "editSubsystemDlg", "keydown", function (event, data) {
    return event.handleEnterEsc(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_save", {});
    }, function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
    });
  });
  cr.ach(path, "editSubsystemDlg", "historychanged", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ach(path, "closeEditSubsystemDlg", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ash(path, "saveSubsystem", "click", null);
  cr.ash(path, "cancelSubsystem", "click", null);
  cr.ash(path, "defaultAssignee", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  regCC(path, "defaultAssignee");
  regdlg(path, "editSubsystemDlg");
});
