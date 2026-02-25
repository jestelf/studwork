cr.setTemplateBind("IssueWatchersList", function (path) {
  cr.ash(path, "watchersListToggler", "click", null);
});
