charisma.smartui.SelectionActions = function () {
};
charisma.smartui.SelectionActions.notTriggIssueList = false;
charisma.smartui.SelectionActions.init = function (checkAllCheckbox) {
  trace("SelectionActions.init");
  if (checkAllCheckbox && checkAllCheckbox != undefined) {
    charisma.smartui.SelectionActions.checkAllCheckbox = checkAllCheckbox;
    $(charisma.smartui.SelectionActions.checkAllCheckbox).click(function () {
      if (charisma.smartui.SelectionActions.notTriggIssueList) {
        charisma.smartui.SelectionActions.notTriggIssueList = false;
        return true;
      }

      //Value change is called later
      var it = this;
      window.setTimeout(function () {
        charisma.smartui.App.APP.issuesList.setCheckedAll(it.checked);
      }, 50);
    });
  }

};
charisma.smartui.SelectionActions.triggCheckAllCheckbox = function (doNotTriggIssueList) {
  if (doNotTriggIssueList) {
    charisma.smartui.SelectionActions.notTriggIssueList = doNotTriggIssueList;
  }

  if (charisma.smartui.SelectionActions.checkAllCheckbox) {
    $(charisma.smartui.SelectionActions.checkAllCheckbox).click();
  }

};
