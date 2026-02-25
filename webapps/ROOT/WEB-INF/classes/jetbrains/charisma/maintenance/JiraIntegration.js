cr.setTemplateBind("JiraIntegration", function (path) {
  cr.ash(path, "JiraIntegrationContent" + "." + "JiraServerSettings" + "." + "saveJiraSettings", "click", null);
  cr.ash(path, "JiraIntegrationContent" + "." + "JiraImportProject" + "." + "importProject", "click", null);
  cr.ash(path, "JiraIntegrationContent" + "." + "JiraImportProject" + "." + "issueType", "click", null);
  cr.ash(path, "JiraIntegrationContent" + "." + "JiraServerSettings" + "." + "enableJiraIntegration", "click", null);
  regt(path, "ticker").addServerSideListener({collectFormElements: false}, "count");
});
