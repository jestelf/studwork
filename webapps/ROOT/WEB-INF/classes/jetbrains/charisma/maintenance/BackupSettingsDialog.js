cr.setTemplateBind("BackupSettingsDialog", function (path) {
  cr.ach(path, "backupSettingsDlg", "keydown", function (event, data) {
    return event.handleEnterEsc(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_save", {});
    }, function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
    });
  });
  cr.ach(path, "backupSettingsDlgClose", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ach(path, "backupOk", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_save", {});
  });
  cr.ach(path, "backupCancel", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ash(path, "location", "valuechange", null);
  regdlg(path, "backupSettingsDlg");
  cr.forEach(path, "location", function () {
    this.attachWatcher(false);
  });
});
