cr.setTemplateBind("SelectAvatarDialog", function (path) {
  cr.ach(path, "closeSelectAvatarDialog", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_cancelAvatar", {});
  });
  cr.ash(path, "uploadTab", "click", null);
  cr.ash(path, "gravatarTab", "click", null);
  cr.ash(path, "noPictureTab", "click", null);
  cr.ash(path, "cancelButton", "click", null);
  cr.ash(path, "okButton", "click", {preventDoubleSubmit: true});
  regdlg(path, "selectAvatarDialog");
});
