cr.setTemplateBind("CreateUserDialog", function (path) {
  cr.ach(path, "createUserOk", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_submit", {}, {preventDoubleSubmit: true});
  });
  cr.ach(path, "createUserDialog", "keydown", function (event, data) {
    return event.handleEnterEsc(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_submit", {}, {preventDoubleSubmit: true});
    }, function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
    });
  });
  cr.ach(path, "createUserCancel", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ach(path, "closeCreateUserDlg", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  regdlg(path, "createUserDialog");
});
