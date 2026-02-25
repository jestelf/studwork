cr.setTemplateBind("BackupCronExprDialog", function (path) {
  cr.ach(path, "backupCronExprDlgClose", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel2", {});
  });
  cr.ach(path, "backupCronExprDlg", "keydown", function (event, data) {
    e.handleEnterEsc(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_save2", {});
    }, function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel2", {});
    });
        

  });
  regdlg(path, "backupCronExprDlg");
});
