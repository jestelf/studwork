cr.setTemplateBind("ContentProjectCFDialog", function (path) {
  cr.ash(path, "prototypeCombobox", "Submit", null);
  cr.ash(path, "prototypeCombobox", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  regCC(path, "prototypeCombobox");
});
