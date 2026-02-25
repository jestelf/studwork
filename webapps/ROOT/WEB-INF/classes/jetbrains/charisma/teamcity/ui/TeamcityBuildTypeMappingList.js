cr.setTemplateBind("TeamcityBuildTypeMappingList", function (path) {
  cr.ash(path, "createNewMapping1", "click", null);
  cr.ash(path, "createNewMapping2", "click", null);
  regt(path, "refreshStatuses").addServerSideListener({collectFormElements: false}, "count");
  regt(path, "refreshStatuses", 3000);
});
