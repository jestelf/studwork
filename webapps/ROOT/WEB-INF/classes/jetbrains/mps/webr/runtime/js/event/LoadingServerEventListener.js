Webr.event.LoadingServerEventListener = function () {
  Webr.event.LoadingServerEventListener.superclass.constructor.call(this);
  this.loadingMessage = "Loading ...";
  this.uploadingFileMessage = "Uploading ...";
  this.pollsToShow = 12;
  this.message = Webr.event.PopupMessage.SMALL_INFO;
  this.isMessageShown = false;
};
{
  var F = new Function();
  F.prototype = Webr.event.ServerEventListener.prototype;
  Webr.event.LoadingServerEventListener.prototype = new F();
  Webr.event.LoadingServerEventListener.prototype.constructor = Webr.event.LoadingServerEventListener;
  Webr.event.LoadingServerEventListener.superclass = Webr.event.ServerEventListener.prototype;
}

Webr.event.LoadingServerEventListener.prototype.onFinish = function (event, success) {
  this.message.hide();
  this.isMessageShown = false;
};
Webr.event.LoadingServerEventListener.prototype.onPoll = function (event, pollNumber) {
  if (!this.isMessageShown && ((event.config.loadingPopupPollsCount && pollNumber >= event.config.loadingPopupPollsCount) || (!event.config.loadingPopupPollsCount && pollNumber >= this.pollsToShow))) {
    if (event instanceof Webr.event.UploadEvent) {
      this.message.show(this.uploadingFileMessage);
    } else {
      this.message.show(this.loadingMessage);
    }

    this.isMessageShown = true;
  }

};
