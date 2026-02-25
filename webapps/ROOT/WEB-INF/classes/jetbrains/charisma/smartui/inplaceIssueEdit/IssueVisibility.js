cr.setTemplateBind("IssueVisibility", function (path) {
  cr.ash(path, "visibilityCombo", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  regCC(path, "visibilityCombo");
});
