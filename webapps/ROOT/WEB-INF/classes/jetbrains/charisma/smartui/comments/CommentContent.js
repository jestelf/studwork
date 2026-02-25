cr.setTemplateBind("CommentContent", function (path) {
  cr.ach(path, "deleteComment", "click", function (event, data) {
    if (window.confirm("Delete comment?")) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_delete", {});
    }

  });
  cr.ach(path, "permanentCommentDelete", "click", function (event, data) {
    if (window.confirm("Delete comment permanently?")) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_deletePermanently", {});
    }

  });
});
