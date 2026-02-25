Webr.Dialogs = function () {
};
Webr.Dialogs.getDialogContainerDiv = function () {
  if (Webr.Dialogs.dialogContainerDiv == null) {
    Webr.Dialogs.dialogContainerDiv = Ext.Element.get(document.body.appendChild(document.createElement("div")));
    Webr.Dialogs.dialogContainerDiv.addClass("x-hidden");
  }

  return Webr.Dialogs.dialogContainerDiv;
};
Webr.Dialogs.setCurrentDialog = function (dialog) {
  Webr.Dialogs.currentDialog = dialog;
};
Webr.Dialogs.getCurrentDialog = function () {
  return Webr.Dialogs.currentDialog;
};
Webr.DialogCommandProcessor = function () {
  Webr.DialogCommandProcessor.superclass.constructor.call(this);
};
{
  var F = new Function();
  F.prototype = Webr.event.CommandProcessor.prototype;
  Webr.DialogCommandProcessor.prototype = new F();
  Webr.DialogCommandProcessor.prototype.constructor = Webr.DialogCommandProcessor;
  Webr.DialogCommandProcessor.superclass = Webr.event.CommandProcessor.prototype;
}

Webr.DialogCommandProcessor.prototype.processCommand = function (command) {
  var processed = false;
  if (command.getAttribute("type") == "dialog") {
    processed = true;
    Webr.Dialogs.getDialogContainerDiv().update(command.firstChild.nodeValue, true);
  }

  return processed;
};
Webr.event.CommandProcessor.register(new Webr.DialogCommandProcessor());
