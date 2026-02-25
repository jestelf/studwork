cr.setTemplateBind("EditUserRoleDialog", function (path) {
  cr.ach(path, "editUserRoleDlg", "keydown", function (event, data) {
    return event.handleEnterEsc(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_save", {});
    }, function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
    });
  });
  cr.ach(path, "closeEditUserDlg", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ash(path, "addRoleButton", "click", null);
  cr.ash(path, "cancelRoleButton", "click", null);
  cr.ash(path, "roleRole", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  cr.ash(path, "roleProjects", "load", null);
  regCC(path, "roleRole");
  regmb(path, "roleProjects", false);
  regdlg(path, "editUserRoleDlg");
});
