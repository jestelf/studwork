cr.setTemplateBind("Hint1", function (path) {
  cr.ach(path, "searchExample1", "click", function (event, data) {
    charisma.smartui.App.APP.setSearchQuery(cr.findInHandler(event, "" + "." + "searchExample1", []).innerHTML);
  });
  cr.ach(path, "searchExample2", "click", function (event, data) {
    charisma.smartui.App.APP.setSearchQuery(cr.findInHandler(event, "" + "." + "searchExample2", []).innerHTML);
  });
});
