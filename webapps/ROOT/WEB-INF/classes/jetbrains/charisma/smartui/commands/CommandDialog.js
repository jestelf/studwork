cr.setTemplateBind("CommandDialog", function (path) {
  cr.ach(path, "submitButton", "click", function (event, data) {
    cr.findInHandler(event, "" + "." + "submitButton", []).disabled = true;
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_submit", {__param__command: charisma.smartui.NewCommandDialog.instance.config.commandText.value}, {preventDoubleSubmit: true});
  });
  cr.ach(path, "cancelButton", "click", function (event, data) {
    charisma.smartui.NewCommandDialog.instance.hide();
  });
  cr.ach(path, "closeDialog", "click", function (event, data) {
    charisma.smartui.NewCommandDialog.instance.hide();
  });
  cr.ach(path, "commandDialog", "keydown", function (event, data) {
    if (Webr.util.Key.isApplicable(event, SmartUIShortCuts["TogglePreview"])) {
      cr.findInHandler(event, "" + "." + "commandCommentPreviewCheckbox", []).click();
    }

  });
  cr.ash(path, "commandCommentPreviewCheckbox", "click", null);
  cr.ash(path, "commandCommentGroups", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  regCC(path, "commandCommentGroups");
  regdlg(path, "commandDialog");
});
