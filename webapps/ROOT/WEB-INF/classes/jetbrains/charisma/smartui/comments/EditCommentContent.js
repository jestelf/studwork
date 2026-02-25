cr.setTemplateBind("EditCommentContent", function (path) {
  cr.ach(path, "commentTextEditor", "keydown", function (event, data) {
    if (Webr.util.Key.isApplicable(event, SmartUIShortCuts["Submit"])) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_submit", {});
      return false;
    }

    if (Webr.util.Key.isApplicable(event, SmartUIShortCuts["Dismiss"])) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
      return false;
    }

    if (Webr.util.Key.isApplicable(event, SmartUIShortCuts["TogglePreview"])) {
      cr.findInHandler(event, "" + "." + "cs" + "." + "previewCommentCheckbox", []).click();
      return false;
    }

    return true;
  });
  cr.ash(path, "submitButton", "click", {preventDoubleSubmit: true});
  cr.ash(path, "cancelButton", "click", null);
  cr.ash(path, "textEditArea", "valuechange", null);
  cr.ash(path, "cs" + "." + "previewCommentCheckbox", "click", null);
  cr.forEach(path, "textEditArea", function () {
    this.attachWatcher(false);
  });
  cr.forEach(path, "textEditArea", function () {
    Webr.component.ElementExpander.addExpandListener(this, 400);
  });
});
