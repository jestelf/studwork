Webr.event.InProgressEventListener = function () {
  Webr.event.InProgressEventListener.superclass.constructor.call(this);
  this.eventsInProgress = [];
};
{
  var F = new Function();
  F.prototype = Webr.event.ServerEventListener.prototype;
  Webr.event.InProgressEventListener.prototype = new F();
  Webr.event.InProgressEventListener.prototype.constructor = Webr.event.InProgressEventListener;
  Webr.event.InProgressEventListener.superclass = Webr.event.ServerEventListener.prototype;
}

Webr.event.InProgressEventListener.prototype.onFinish = function (event, success) {
  var fullName = Webr.event.InProgressEventListener.toFullName(event.config);
  if (this.eventsInProgress[fullName] != null) {
    delete this.eventsInProgress[fullName];
  }

};
Webr.event.InProgressEventListener.prototype.checkDoubleSubmit = function (config) {
  var result = true;
  if (config.preventDoubleSubmit) {
    var previousEvent = this.eventsInProgress[Webr.event.InProgressEventListener.toFullName(config)];
    if (previousEvent != null) {
      result = false;
    }

  }

  return result;
};
Webr.event.InProgressEventListener.prototype.rememberEvent = function (event) {
  if (event.config.preventDoubleSubmit || event.config.processRecentOnly) {
    var eventFullName = Webr.event.InProgressEventListener.toFullName(event.config);
    if (event.config.processRecentOnly) {
      var previousEvent = this.eventsInProgress[eventFullName];
      if (previousEvent != null) {
        previousEvent.abort();
      }

    }

    this.eventsInProgress[eventFullName] = event;
    event.config.listeners.push(this);
  }

};
Webr.event.InProgressEventListener.EVENTS_IN_PROGRESS = [];
Webr.event.InProgressEventListener.get = function () {
  if (Webr.event.InProgressEventListener.instance == null) {
    Webr.event.InProgressEventListener.instance = new Webr.event.InProgressEventListener();
  }

  return Webr.event.InProgressEventListener.instance;
};
Webr.event.InProgressEventListener.toFullName = function (config) {
  var fullName = config.eventSource + ":" + config.eventName;
  return fullName;
};
