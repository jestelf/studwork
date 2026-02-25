cr.setTemplateBind("MaintenanceInProgress", function (path) {
  cr.ach(path, "back", "click", function (event, data) {
    window.history.back();
  });
});
