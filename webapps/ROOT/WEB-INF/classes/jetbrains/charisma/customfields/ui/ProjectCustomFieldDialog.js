cr.setTemplateBind("ProjectCustomFieldDialog", function (path) {
  cr.ach(path, "customFieldChooser", "keydown", function (event, data) {
    return event.handleEnterEsc(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_submit", {});
    }, function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_dismiss", {});
    });
  });
  cr.ash(path, "close", "click", null);
  cr.ash(path, "cancel", "click", null);
  cr.ash(path, "submit", "click", null);
  regdlg(path, "customFieldChooser");
});
