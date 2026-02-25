cr.setTemplateBind("SetupContent", function (path) {
  cr.ach(path, "resetBaseURL", "click", function (event, data) {
    var location = window.location.href;
    cr.findInHandler(event, "" + "." + "baseUrl", []).value = location.substring(0, location.lastIndexOf("/"));
  });
  cr.ash(path, "enableSmtp", "click", null);
  cr.ash(path, "enableJabber", "click", null);
  cr.ash(path, "saveButton", "click", null);
  cr.ash(path, "cancelButton", "click", null);
  cr.ash(path, "acceptLicenseAgreement", "click", null);
  cr.ash(path, "enterLicense", "click", null);
  cr.ash(path, "resetBaseURL", "click", null);
  cr.ash(path, "switchToEvaluation", "click", null);
  cr.ash(path, "mailProtocol", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  regCC(path, "mailProtocol");
});
