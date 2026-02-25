cr.setTemplateBind("ViewSettingsDialog", function (path) {
  cr.ach(path, "viewSettingsDlg", "keydown", function (event, data) {
    return event.handleEnterEsc(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_save", {});
    }, function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
    });
  });
  cr.ach(path, "closeViewSettingsDlg", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ash(path, "saveViewSettings", "click", null);
  cr.ash(path, "cancelViewSettings", "click", null);
  regtab(path, "settingsTabPanel");
  regdlg(path, "viewSettingsDlg");
});
