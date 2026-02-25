cr.setTemplateBind("SecretIssueHistory", function (path) {
  cr.ach(path, "resetNumberInProject", "click", function (event, data) {
    if (window.confirm("Are you sure?")) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_resetNumberInProject", {});
    }

  });
});
