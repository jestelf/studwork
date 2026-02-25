cr.setTemplateBind("EditProjectAssignees", function (path) {
  cr.ash(path, "removeAssigneeGroup", "click", null);
  cr.ash(path, "removeAssignee2", "click", null);
  cr.ash(path, "addAssignee2", "click", null);
  cr.ash(path, "addAssignee3", "click", null);
  cr.ash(path, "addAssigneeGroup1", "click", null);
  cr.ash(path, "addAssigneeGroup3", "click", null);
  cr.ash(path, "addAssigneeGroup2", "click", null);
  cr.ash(path, "addAssignee1", "click", null);
});
