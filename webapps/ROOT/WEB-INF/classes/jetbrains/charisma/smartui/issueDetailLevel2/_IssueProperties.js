cr.setTemplateBind("_IssueProperties", function (path) {
  cr.ach(path, "voteForIssue", "mouseover", function (event, data) {
    voteVisibility.setVisible(cr.findInHandler(event, "" + "." + "ip" + "." + "voteForIssue", [cr.getTarget(event).getAttribute("p0")]), true);
    voteVisibility.setVisible(cr.findInHandler(event, "" + "." + "ip" + "." + "unvoteForIssue", [cr.getTarget(event).getAttribute("p0")]), true);
  });
  cr.ach(path, "voteForIssue", "mouseout", function (event, data) {
    voteVisibility.setVisible(cr.findInHandler(event, "" + "." + "ip" + "." + "voteForIssue", [cr.getTarget(event).getAttribute("p0")]), false);
    voteVisibility.setVisible(cr.findInHandler(event, "" + "." + "ip" + "." + "unvoteForIssue", [cr.getTarget(event).getAttribute("p0")]), false);
  });
});
var voteVisibility = {};
voteVisibility.setVisible = function (el, visible) {
  if (el) {
    if (visible) {
      $(el).removeClass("disabled");
    } else {
      $(el).addClass("disabled");
    }

  }

};

