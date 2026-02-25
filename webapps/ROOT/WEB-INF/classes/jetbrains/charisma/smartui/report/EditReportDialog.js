cr.setTemplateBind("EditReportDialog", function (path) {
  cr.ach(path, "editReportOk", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_submit", {});
  });
  cr.ach(path, "editReportDlg", "keydown", function (event, data) {
    return event.handleEnterEsc(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_submit", {});
    }, function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
    });
  });
  cr.ach(path, "editReportCancel", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ach(path, "closeEditReportDlg", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ash(path, "xSortORder", "Submit", null);
  cr.ash(path, "ySortORder", "Submit", null);
  cr.ash(path, "xAxisCombo", "Submit", null);
  cr.ash(path, "yAxisCombo", "Submit", null);
  cr.ash(path, "xSortORder", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  cr.ash(path, "ySortORder", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  cr.ash(path, "xAxisCombo", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  cr.ash(path, "yAxisCombo", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  regCC(path, "xSortORder");
  regCC(path, "ySortORder");
  regCC(path, "xAxisCombo");
  regCC(path, "yAxisCombo");
  regdlg(path, "editReportDlg");
});
