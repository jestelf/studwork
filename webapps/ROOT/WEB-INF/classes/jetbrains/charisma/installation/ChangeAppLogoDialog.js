cr.setTemplateBind("ChangeAppLogoDialog", function (path) {
  cr.ach(path, "logoUploadDialog", "keydown", function (event, data) {
    event.handleEnterEsc(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_submit", {});
    }, function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_dismiss", {});
    });
  });
  cr.ash(path, "submit", "click", null);
  cr.ash(path, "closeLogoUploadDlg", "click", null);
  cr.ash(path, "dismiss", "click", null);
  regdlg(path, "logoUploadDialog");
});
