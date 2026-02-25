cr.setTemplateBind("Exception", function (path) {
  cr.ach(path, "backToListButton", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_backToList", {});
  });
  cr.ach(path, "backButton", "click", function (event, data) {
    window.history.back();
  });
  cr.ach(path, "reportButton", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_report", {__param__details: cr.findInHandler(event, "" + "." + "details", []).value}, {preventDoubleSubmit: true, collectFormElements: false});
  });
  cr.ach(path, "details", "keydown", function (event, data) {
    if (Webr.util.Key.isApplicable(event, SmartUIShortCuts["SubmitErrorReport"])) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_report", {__param__details: cr.findInHandler(event, "" + "." + "details", []).value}, {preventDoubleSubmit: true, collectFormElements: false});
      return false;
    }

  });
  cr.ach(path, "details", "keypress", function (event, data) {
    if (Webr.util.Key.isApplicable(event, SmartUIShortCuts["SubmitErrorReport"])) {
      return false;
    }

  });
  cr.ach(path, "showExceptionButton", "click", function (event, data) {
    var shown = cr.findInHandler(event, "" + "." + "showExceptionButton", []).innerHTML.indexOf("Hide") >= 0;
    if (shown) {
      $(cr.findInHandler(event, "" + "." + "ed" + "." + "exception", [])).hide();
    } else {
      $(cr.findInHandler(event, "" + "." + "ed" + "." + "exception", [])).show();
    }

    cr.findInHandler(event, "" + "." + "showExceptionButton", []).innerHTML = shown ?"Show error details" :"Hide error details";
  });
});
