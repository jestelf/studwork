cr.setTemplateBind("SelectGroupIconDialog", function (path) {
  cr.ach(path, "closeAddAttachmentDlg", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ach(path, "CancelButton", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ach(path, "OkButton", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_save", {});
  });
  cr.ach(path, "addGroupIconDlg", "keydown", function (event, data) {
    return event.handleEnterEsc(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_add", {});
    }, function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
    });
  });
  cr.ash(path, "addIcon", "change", {collectFileElements: true, preventDoubleSubmit: true});
  regdlg(path, "addGroupIconDlg");
});
