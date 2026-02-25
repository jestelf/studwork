cr.setTemplateBind("FilterContent", function (path) {
  cr.ach(path, "allCheckbox", "click", function (event, data) {
    cr.getTarget(event).disabled = true;
    cr.getTarget(event).checked = true;
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_checkAll", {__param__anchorId: cr.getTarget(event).id});
    jQuery.each(charisma.smartui.Filter.getFilter(cr.getTarget(event)).options, function () {
      this.checked = false;
      $(this).parent().removeClass("selected");
    });
    $(cr.getTarget(event)).parent().parent().parent().children("a:first").removeClass("modified");
  });
  cr.ach(path, "filterCheckbox", "click", function (event, data) {
    var checked = cr.getTarget(event).checked;
    var allCheckbox = cr.findInHandler(event, "" + "." + "allCheckbox", []);
    var uncheckedLast = false;
    if (checked) {
      $(cr.getTarget(event)).parent().addClass("selected");
    } else {
      $(cr.getTarget(event)).parent().removeClass("selected");
    }

    if (allCheckbox.checked) {
      if (checked) {
        //enable and uncheck All
        allCheckbox.disabled = false;
        allCheckbox.checked = false;
      }

    } else {
      if (!checked) {
        uncheckedLast = $(charisma.smartui.Filter.getFilter(cr.getTarget(event)).options).filter(function () {
          return this.checked;
        }).length == 0;
      }

    }

    if (uncheckedLast) {
      allCheckbox.disabled = true;
      allCheckbox.checked = true;
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_checkAll", {__param__anchorId: cr.getTarget(event).id});
      $(cr.getTarget(event)).parent().parent().parent().children("a:first").removeClass("modified");
    } else {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_checkFilterParam", {__param__filterParam: cr.getTarget(event).id, __param__checked: checked, __param__anchorId: cr.getTarget(event).id});
      $(cr.getTarget(event)).parent().parent().parent().children("a:first").addClass("modified");
    }

  });
  cr.ash(path, "showMoreFilters", "click", null);
});
