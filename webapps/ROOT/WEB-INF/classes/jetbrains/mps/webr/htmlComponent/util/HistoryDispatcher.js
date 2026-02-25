Webr.util.HistoryDispatcher = function () {
  this.listeners = new Webr.util.Set();
  this.h = window.location.hash;
  var it = this;
  //If it has native realisation
  //Watch doc on onhashchange HTML5
  if (window.onhashchange !== undefined) {
    this.historyChange = function () {
      var oldHash = it.h;
      it.h = window.location.hash;
      if (it.h != oldHash) {
        it.fireHistoryChanged();
      }

    };
    window.onhashchange = this.historyChange;
  } else {
    this.historyChange = function () {
      var oldHash = it.h;
      it.h = window.location.hash;
      if (it.h != oldHash) {
        it.fireHistoryChanged();
      }

    };
    window.setInterval(it.historyChange, 250);
  }

};
Webr.util.HistoryDispatcher.prototype.addListener = function (l) {
  this.listeners.add(l);
};
Webr.util.HistoryDispatcher.prototype.removeListener = function (l) {
  this.listeners.remove(l);
};
Webr.util.HistoryDispatcher.prototype.fireHistoryChanged = function () {
  var prevParams = Webr.util.PageStateStore.getInstance().getParams();
  Webr.util.PageStateStore.getInstance().update();
  this.listeners.forEach(function (listener) {
    if (listener.key) {
      var prev = prevParams.get(listener.key.toLowerCase());
      var now = Webr.util.PageStateStore.getInstance().get(listener.key);
      if (prev != now) {
        listener.historyChanged({current: now, prev: prev});
      }

    } else {
      listener.historyChanged();
    }

    return true;
  });
};
Webr.util.HistoryDispatcher.getInstance = function () {
  if (!Webr.util.HistoryDispatcher.dispatcher) {
    Webr.util.HistoryDispatcher.dispatcher = new Webr.util.HistoryDispatcher();
    Webr.util.HistoryDispatcher.dispatcher.historyChange();
  }

  return Webr.util.HistoryDispatcher.dispatcher;
};
Webr.util.HistoryChangeListener = function () {
};
Webr.util.HistoryChangeListener.prototype.historyChanged = function (token) {
};
Webr.util.HistoryToken = function () {
};
