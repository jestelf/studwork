cr.setTemplateBind("DateEditor", function (path) {
  cr.ash(path, "clearValue", "click", null);
  cr.ash(path, "dateChooser", "DateSelected", null);
  cr.ash(path, "dateChooser", "DateSelected", null);
  regC(path, "dateChooser");
});
