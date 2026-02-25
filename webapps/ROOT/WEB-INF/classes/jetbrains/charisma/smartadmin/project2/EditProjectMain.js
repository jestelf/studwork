cr.setTemplateBind("EditProjectMain", function (path) {
  cr.ach(path, "shortName", "valuechange", function (event, data) {
    var dash = true;
    var value = cr.findInHandler(event, "" + "." + "shortName", []).value;
    if (cr.findInHandler(event, "" + "." + "projectName", []).value.length == 0 || value.length == 0) {
    } else if (value.indexOf("-") < 0 && (dash = value.indexOf("/") < 0)) {
      cr.findInHandler(event, "" + "." + "shortName", []).unHighlight();
    } else {
      cr.findInHandler(event, "" + "." + "shortName", []).highlight((!dash ?"Slash" :"Dash") + " is not allowed in project ID.");
    }

  });
  cr.ach(path, "nextIssueNumber", "valuechange", function (event, data) {
    var value = cr.findInHandler(event, "" + "." + "nextIssueNumber", []).value;
    if (value.length == 0) {
      cr.findInHandler(event, "" + "." + "nextIssueNumber", []).highlight("Next issue number should be set.");
    } else {
      var number = parseInt(value);
      if (isNaN(number) || number < 1) {
        cr.findInHandler(event, "" + "." + "nextIssueNumber", []).highlight("Next issue number should be a positive integer.");
      } else {
        cr.findInHandler(event, "" + "." + "nextIssueNumber", []).unHighlight();
        if (value != number) {
          cr.findInHandler(event, "" + "." + "nextIssueNumber", []).value = number;
        }

      }

    }

  });
  cr.ash(path, "projectLead", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  regCC(path, "projectLead");
  cr.forEach(path, "shortName", function () {
    this.attachWatcher(false);
  });
  cr.forEach(path, "nextIssueNumber", function () {
    this.attachWatcher(false);
  });
});
