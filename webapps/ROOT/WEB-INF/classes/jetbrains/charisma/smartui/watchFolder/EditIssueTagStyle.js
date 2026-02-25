cr.setTemplateBind("EditIssueTagStyle", function (path) {
  cr.ach(path, "tagStyle", "click", function (event, data) {
    $(cr.findInHandler(event, "" + "." + "tagStylePanel", [])).find("td." + "selectedTagStyle").removeClass("selectedTagStyle");
    $(cr.findInHandler(event, "" + "." + "tagStyle", [cr.getTarget(event).getAttribute("p0")])).parent().addClass("selectedTagStyle");
  });
});
