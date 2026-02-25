cr.setTemplateBind("EditIssueLinkTypeDialog", function (path) {
  cr.ach(path, "editIssLinkTypeDialog", "keydown", function (event, data) {
    return event.handleEnterEsc(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_save", {});
    }, function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
    });
  });
  cr.ach(path, "closeEditIssLinkTypeDialog", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancel", {});
  });
  cr.ach(path, "directed", "click", function (event, data) {
    cr.findInHandler(event, "" + "." + "inwardName", []).style.visibility = cr.findInHandler(event, "" + "." + "directed", []).checked ?"visible" :"hidden";
    cr.findInHandler(event, "" + "." + "inwardNameLabel", []).style.visibility = cr.findInHandler(event, "" + "." + "directed", []).checked ?"visible" :"hidden";
  });
  cr.ash(path, "cancel", "click", null);
  cr.ash(path, "save", "click", null);
  regdlg(path, "editIssLinkTypeDialog");
});
