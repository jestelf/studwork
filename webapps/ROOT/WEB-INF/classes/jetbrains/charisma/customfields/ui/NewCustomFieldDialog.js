cr.setTemplateBind("NewCustomFieldDialog", function (path) {
  cr.ash(path, "submit", "click", null);
  cr.ash(path, "cancel", "click", null);
  cr.ash(path, "close", "click", null);
  cr.ash(path, "typeCombobox", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  regCC(path, "typeCombobox");
  regdlg(path, "dialog");
});
