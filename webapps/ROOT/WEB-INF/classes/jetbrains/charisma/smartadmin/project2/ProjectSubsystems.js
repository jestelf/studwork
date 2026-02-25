cr.setTemplateBind("ProjectSubsystems", function (path) {
  cr.ash(path, "setDefaultSubsystem", "click", null);
  cr.ash(path, "remove", "click", null);
  cr.ash(path, "addNewSubsystem", "click", null);
  cr.ash(path, "edit", "click", null);
});
