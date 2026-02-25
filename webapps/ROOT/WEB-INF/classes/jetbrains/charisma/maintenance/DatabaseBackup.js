cr.setTemplateBind("DatabaseBackup", function (path) {
  cr.ash(path, "enableDatabaseBackup", "click", null);
  cr.ash(path, "BackupSettings" + "." + "backupNow", "click", null);
  regt(path, "ticker").addServerSideListener({collectFormElements: false}, "count");
  regt(path, "ticker", 3000);
});
