cr.setTemplateBind("AddAttachmentDialog", function (path) {
  cr.ach(path, "fileUpload", "change", function (event, data) {
    $(cr.findInHandler(event, "" + "." + "fileSelectionDiv", [])).hide();
    $(cr.findInHandler(event, "" + "." + "uploadingDiv", [])).show();
  });
  cr.ach(path, "cancelFile", "click", function (event, data) {
    cr.findInHandler(event, "" + "." + "addAttachmentDlg", []).setVisible(false);
  });
  cr.ach(path, "addAttachmentDlg", "keydown", function (event, data) {
    return event.handleEnterEsc(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_add", {});
    }, function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
    });
  });
  cr.ach(path, "closeAddAttachmentDlg", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ash(path, "fileUpload", "change", {collectFileElements: true, preventDoubleSubmit: true});
  cr.ash(path, "filePermittedGroup", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  regCC(path, "filePermittedGroup");
  regdlg(path, "addAttachmentDlg");
});
