cr.setTemplateBind("TestLdapSettingsDialog", function (path) {
  cr.ach(path, "done", "click", function (event, data) {
    cr.findInHandler(event, "" + "." + "testLdapSettingsDlg", []).setVisible(false, cr.findInHandler(event, "" + "." + "testLdapSettingsDlg", []).getAnchor());
  });
  cr.ach(path, "password", "enter", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_test", {});
  });
  cr.ach(path, "login", "enter", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_test", {});
  });
  cr.ash(path, "test", "click", null);
  regdlg(path, "testLdapSettingsDlg");
  cr.forEach(path, "password", function () {
    this.attachWatcher(false);
  });
  cr.forEach(path, "login", function () {
    this.attachWatcher(false);
  });
});
