cr.setTemplateBind("UpdateAttachmentDialog", function (path) {
  cr.ach(path, "cancelUpdFile", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ach(path, "updateAttachmentDlg", "keydown", function (event, data) {
    return event.handleEnterEsc(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_update", {});
    }, function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
    });
  });
  cr.ach(path, "closeUpdateAttachmentDlg", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ash(path, "deleteFile", "click", null);
  cr.ash(path, "updateFile", "click", {collectFileElements: true});
  cr.ash(path, "updAttPermittedGroup", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  regCC(path, "updAttPermittedGroup");
  regdlg(path, "updateAttachmentDlg");
});
