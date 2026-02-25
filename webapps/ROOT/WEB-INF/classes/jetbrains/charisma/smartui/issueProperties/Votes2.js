cr.setTemplateBind("Votes2", function (path) {
  cr.ash(path, "unvoteForIssue", "click", null);
  cr.ash(path, "voteForIssue", "click", null);
});
