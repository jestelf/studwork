cr.setTemplateBind("Issue", function (path) {
  cr.ach(path, "tb" + "." + "deleteIssueLink", "click", function (event, data) {
    if (window.confirm("Are you sure?")) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_deleteIssue", {});
    }

  });
  cr.ach(path, "sl" + "." + "gotoNextIssueLink", "click", function (event, data) {
    Webr.Event.redirect(cr.findInHandler(event, "" + "." + "sl" + "." + "gotoNextIssueLink", []).href);
    return false;
  });
  cr.ach(path, "sl" + "." + "gotoPrevIssueLink", "click", function (event, data) {
    Webr.Event.redirect(cr.findInHandler(event, "" + "." + "sl" + "." + "gotoPrevIssueLink", []).href);
    return false;
  });
  cr.ash(path, "tb" + "." + "editIssueLink", "click", {preventDoubleSubmit: true});
  cr.ash(path, "ic" + "." + "icr" + "." + "ip" + "." + "v" + "." + "vote", "click", null);
  cr.ash(path, "is" + "." + "iwl" + "." + "watchIssue", "click", null);
  cr.ash(path, "is" + "." + "ivl" + "." + "voteForIssue", "click", null);
  cr.ash(path, "is" + "." + "ivl" + "." + "unvoteIssue", "click", null);
  cr.ash(path, "ic" + "." + "icr" + "." + "iv" + "." + "issueVisibility", "submit", null);
  cr.ash(path, "tb" + "." + "printIssue", "click", null);
  cr.ash(path, "is" + "." + "vp" + "." + "st" + "." + "issueState", "Submit", null);
  cr.ash(path, "is" + "." + "vp" + "." + "pr" + "." + "issuePriority", "Submit", null);
  cr.ash(path, "is" + "." + "vp" + "." + "ty" + "." + "issueType", "Submit", null);
  cr.ash(path, "is" + "." + "vp" + "." + "as" + "." + "issueAssignee", "Submit", null);
  cr.ash(path, "is" + "." + "vp" + "." + "su" + "." + "issueSubsystem", "Submit", null);
  cr.ash(path, "is" + "." + "vp" + "." + "av" + "." + "issueAffectsVersion", "submit", null);
  cr.ash(path, "is" + "." + "vp" + "." + "fv" + "." + "issueFixedInVersion", "submit", null);
  cr.ash(path, "ic" + "." + "icr" + "." + "ap" + "." + "ua" + "." + "deleteFile", "click", null);
});
