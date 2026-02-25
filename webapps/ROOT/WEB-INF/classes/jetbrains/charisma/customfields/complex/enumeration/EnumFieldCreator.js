cr.setTemplateBind("EnumFieldCreator", function (path) {
  cr.ash(path, "cfBundle", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  regCC(path, "cfBundle");
});
