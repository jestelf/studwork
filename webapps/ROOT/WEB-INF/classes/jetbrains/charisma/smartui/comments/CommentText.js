cr.setTemplateBind("CommentText", function (path) {
  cr.ash(path, "cc" + "." + "editCommentLink", "click", null);
  cr.ash(path, "cc" + "." + "restoreCommentLink", "click", null);
});
