cr.setTemplateBind("TeamcityIntegrationSettings", function (path) {
  cr.ash(path, "enableTeamcityIntegration", "click", null);
});
