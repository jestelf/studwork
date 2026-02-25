cr.setTemplateBind("SelectBuildType", function (path) {
  cr.ash(path, "selectBuildType", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  regCC(path, "selectBuildType");
});
