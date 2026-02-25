cr.setTemplateBind("Assignee", function (path) {
  cr.ash(path, "issueAssignee", "Submit", null);
  cr.ash(path, "issueAssignee", "Load", {collectFormElements: false});
});
