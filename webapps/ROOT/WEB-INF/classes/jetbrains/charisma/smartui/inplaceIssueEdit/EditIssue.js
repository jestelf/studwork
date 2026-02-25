cr.setTemplateBind("EditIssue", function (path) {
  cr.ach(path, "editIssueContainer", "keydown", function (event, data) {
    if (Webr.util.Key.isApplicable(event, SmartUIShortCuts["SubmitIssueEdit"])) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_submit", {});
      return false;
    }

    if (Webr.util.Key.isApplicable(event, SmartUIShortCuts["CancelEdit"])) {
      //Workaround near strange behaviour in FF 3.6 and greater
      //Waiting until keydown bubbles, and the show confirm
      window.setTimeout(function () {
        if (window.confirm("Close edit issue form?")) {
          cr.serverMethodCallInHandler(event, "" + "." + "methodCall_postpone", {});
        }

      }, 10);
      return false;
    }

    if (Webr.util.Key.isApplicable(event, SmartUIShortCuts["TogglePreview"])) {
      $(cr.findInHandler(event, "" + "." + "previewCheckbox", [])).change();
      $(cr.findInHandler(event, "" + "." + "previewCheckbox", []).checked = !cr.findInHandler(event, "" + "." + "previewCheckbox", []).checked);
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_togglePreview", {});
    }

    return true;
  });
  cr.ach(path, "previewCheckboxLabel", "click", function (event, data) {
    $(cr.findInHandler(event, "" + "." + "previewCheckbox", [])).change();
    $(cr.findInHandler(event, "" + "." + "previewCheckbox", []).checked = !cr.findInHandler(event, "" + "." + "previewCheckbox", []).checked);
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_togglePreview", {});
  });
  cr.ach(path, "previewCheckbox", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_togglePreview", {});
  });
  cr.ach(path, "eit" + "." + "description", "keydown", function (event, data) {
    if (!cr.findInHandler(event, "" + "." + "eit" + "." + "visibility" + "." + "visibilityCombo", [])) {
      if (event.isKey(Webr.util.Key.TAB)) {
        charisma.smartui.PropertySelector.getInstance().select(0);
        return false;
      }

    }

  });
  cr.ach(path, "eit" + "." + "visibility" + "." + "visibilityCombo", "keydown", function (event, data) {
    if (event.isKey(Webr.util.Key.TAB)) {
      charisma.smartui.PropertySelector.getInstance().select(0);
      return false;
    }

  });
  cr.ach(path, "submitButton", "keydown", function (event, data) {
    if (event.isShift(Webr.util.Key.TAB)) {
      charisma.smartui.PropertySelector.getInstance().select(charisma.smartui.PropertySelector.LAST);
      return false;
    }

  });
  cr.ach(path, "eit" + "." + "summary", "valuechange", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_updateSummaryAndDescription", {__param__summary: cr.findInHandler(event, "" + "." + "eit" + "." + "summary", []).value, __param__description: cr.findInHandler(event, "" + "." + "eit" + "." + "description", []).value}, {processRecentOnly: true, collectFormElements: false, hideLoadingPopup: true});
  });
  cr.ach(path, "eit" + "." + "description", "valuechange", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_updateSummaryAndDescription", {__param__summary: cr.findInHandler(event, "" + "." + "eit" + "." + "summary", []).value, __param__description: cr.findInHandler(event, "" + "." + "eit" + "." + "description", []).value}, {processRecentOnly: true, collectFormElements: false, hideLoadingPopup: true});
  });
  cr.ach(path, "eit" + "." + "summary", "blur", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_updateSummaryAndDescription", {__param__summary: cr.findInHandler(event, "" + "." + "eit" + "." + "summary", []).value, __param__description: cr.findInHandler(event, "" + "." + "eit" + "." + "description", []).value}, {processRecentOnly: true, collectFormElements: false, hideLoadingPopup: true});
  });
  cr.ach(path, "eit" + "." + "description", "blur", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_updateSummaryAndDescription", {__param__summary: cr.findInHandler(event, "" + "." + "eit" + "." + "summary", []).value, __param__description: cr.findInHandler(event, "" + "." + "eit" + "." + "description", []).value}, {processRecentOnly: true, collectFormElements: false, hideLoadingPopup: true});
  });
  cr.ash(path, "cancelButton", "click", null);
  cr.ash(path, "submitButton", "click", {preventDoubleSubmit: true});
  cr.ash(path, "clearButton", "click", null);
  cr.ash(path, "eit" + "." + "project", "Submit", null);
  cr.forEach(path, "eit" + "." + "summary", function () {
    this.attachWatcher(false);
  });
  cr.forEach(path, "eit" + "." + "description", function () {
    this.attachWatcher(false);
  });
});
