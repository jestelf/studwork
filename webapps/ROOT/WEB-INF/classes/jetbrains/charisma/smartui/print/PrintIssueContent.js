cr.setTemplateBind("PrintIssueContent", function (path) {
  cr.ach(path, "ic" + "." + "commentsToggler", "click", function (event, data) {
    $("#" + "ct_s").toggleClass("active");
    $("#" + "ct_h").toggleClass("hidden");
    $(cr.findInHandler(event, "" + "." + "ic" + "." + "issueComments", [])).toggleClass("hidden");
    $(cr.findInHandler(event, "" + "." + "ic" + "." + "issueCommentsTitle", [])).toggleClass("hidden");
  });
  cr.ach(path, "fullVersion", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_go", {});
  });
});
