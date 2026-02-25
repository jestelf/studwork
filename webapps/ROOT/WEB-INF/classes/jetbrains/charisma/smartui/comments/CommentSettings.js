cr.setTemplateBind("CommentSettings", function (path) {
  cr.ash(path, "permittedGroup", "Submit", null);
  cr.ash(path, "permittedGroup", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  regCC(path, "permittedGroup");
});
