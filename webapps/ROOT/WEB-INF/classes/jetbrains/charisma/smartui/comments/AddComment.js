cr.setTemplateBind("AddComment", function (path) {
  cr.ach(path, "commentTextarea", "keydown", function (event, data) {
    if (event.isKey(Webr.util.Key.TAB)) {
      Webr.component.ComboBoxComponent.safeFocus(cr.findInHandler(event, "" + "." + "cs" + "." + "permittedGroup", []));
      return false;
    }

    return true;
  });
  cr.ach(path, "commentTextarea", "keydown", function (event, data) {
    if (event.isKey(Webr.util.Key.ESC)) {
      cr.findInHandler(event, "" + "." + "commentTextarea", []).focus();
      return false;
    }

  });
  cr.ach(path, "newComment", "keydown", function (event, data) {
    if (Webr.util.Key.isApplicable(event, SmartUIShortCuts["TogglePreview"])) {
      cr.findInHandler(event, "" + "." + "cs" + "." + "previewCommentCheckbox", []).click();
      return false;
    }

    if (Webr.util.Key.isApplicable(event, SmartUIShortCuts["Submit"])) {
      $(cr.findInHandler(event, "" + "." + "addCommentLink", [])).click();
      return false;
    }

  });
  cr.ach(path, "addCommentLink", "click", function (event, data) {
    cr.findInHandler(event, "" + "." + "commentTextarea", []).detachWatcher();
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_save", {__param__text: cr.findInHandler(event, "" + "." + "commentTextarea", []).value}, {preventDoubleSubmit: true});
  });
  cr.ach(path, "cs" + "." + "previewCommentCheckboxLabel", "click", function (event, data) {
    cr.findInHandler(event, "" + "." + "cs" + "." + "previewCommentCheckbox", []).click();
    return false;
  });
  cr.ash(path, "commentTextarea", "valuechange", {hideLoadingPopup: true});
  cr.ash(path, "cs" + "." + "previewCommentCheckbox", "click", null);
  cr.ash(path, "closeCommentsLink", "click", null);
  cr.forEach(path, "commentTextarea", function () {
    this.attachWatcher(false);
  });
  cr.forEach(path, "commentTextarea", function () {
    Webr.component.ElementExpander.addExpandListener(this, 200);
  });
});
