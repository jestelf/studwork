cr.setTemplateBind("BackupSettings", function (path) {
  cr.ach(path, "bfl" + "." + "remove", "click", function (event, data) {
    if (window.confirm("Do you really want delete this backup file?")) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_deleteBackup", {__param__name: cr.getTarget(event).getAttribute("p0")});
    }

  });
  cr.ash(path, "unassignUser", "click", null);
  cr.ash(path, "addUser", "click", null);
  cr.ash(path, "changeBackupSettings", "click", null);
});
