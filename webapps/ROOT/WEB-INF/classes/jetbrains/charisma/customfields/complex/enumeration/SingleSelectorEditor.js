cr.setTemplateBind("SingleSelectorEditor", function (path) {
  cr.ash(path, "valueSelector", "Submit", null);
  cr.ash(path, "valueSelector", "Load", {collectFormElements: false});
});
