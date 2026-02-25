cr.setTemplateBind("EditBuildTypeMappingDialog", function (path) {
  cr.ach(path, "editTeamcityMappingDialog", "keydown", function (event, data) {
    return event.handleEnterEsc(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_save", {});
    }, function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
    });
  });
  cr.ach(path, "save", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_save", {});
  });
  cr.ach(path, "closeEditTeamcityMappingDialog", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ach(path, "cancel", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ash(path, "selectTeamcityServer", "Submit", null);
  cr.ash(path, "selectTeamcityProject", "Submit", null);
  cr.ash(path, "bt" + "." + "selectBuildType", "Submit", null);
  cr.ash(path, "selectTeamcityServer", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  cr.ash(path, "selectProject", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  cr.ash(path, "selectTeamcityProject", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  regCC(path, "selectTeamcityServer");
  regCC(path, "selectProject");
  regCC(path, "selectTeamcityProject");
  regdlg(path, "editTeamcityMappingDialog");
});
