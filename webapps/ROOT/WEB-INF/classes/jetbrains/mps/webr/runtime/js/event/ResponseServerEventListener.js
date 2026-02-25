Webr.event.ResponseServerEventListener = function (syncCall) {
  Webr.event.ResponseServerEventListener.superclass.constructor.call(this);
  this.syncCall = syncCall;
  if (syncCall) {
    Webr.event.ResponseServerEventListener.SYNC_CALL_IN_PROGRESS = true;
  }

};
{
  var F = new Function();
  F.prototype = Webr.event.ServerEventListener.prototype;
  Webr.event.ResponseServerEventListener.prototype = new F();
  Webr.event.ResponseServerEventListener.prototype.constructor = Webr.event.ResponseServerEventListener;
  Webr.event.ResponseServerEventListener.superclass = Webr.event.ServerEventListener.prototype;
}

Webr.event.ResponseServerEventListener.prototype.onSuccess = function (event, response) {
  if (response.responseXML && response.responseXML.firstChild) {
    Webr.event.ResponseServerEventListener.connected();
    Webr.event.ResponseServerEventListener.processXmlResponse(response.responseXML);
  } else {
    Webr.event.ResponseServerEventListener.error("Incorrect response structure");
  }

  if (this.syncCall) {
    Webr.event.ResponseServerEventListener.SYNC_CALL_IN_PROGRESS = false;
  }

};
Webr.event.ResponseServerEventListener.prototype.onFinish = function (event, success, exception) {
  if (!success) {
    if (exception != null) {
      if (exception.isTimeout() || exception.isCommunication()) {
        Webr.event.ResponseServerEventListener.disconnected();
      } else {
        Webr.event.ResponseServerEventListener.error(exception.statusText);
      }

    }

    if (this.syncCall) {
      Webr.event.ResponseServerEventListener.SYNC_CALL_IN_PROGRESS = false;
    }

  }

};
Webr.event.ResponseServerEventListener.SYNC_CALL_IN_PROGRESS = false;
Webr.event.ResponseServerEventListener.DISCONNECTED = false;
Webr.event.ResponseServerEventListener.DISCONNECTED_POPUP = Webr.event.PopupMessage.SMALL_ERROR;
Webr.event.ResponseServerEventListener.PAGE_CHANGED = false;
Webr.event.ResponseServerEventListener.processResponse = function (response, xmlExpected, source) {
  if (response.responseXML && response.responseXML.firstChild) {
    Webr.event.ResponseServerEventListener.connected();
    Webr.event.ResponseServerEventListener.processXmlResponse(response.responseXML);
  } else {
    if (!source) {
      source = "";
    }

    var statusOk = true;
    if (response.status != null) {
      statusOk = response.status == 200;
    }

    if (!statusOk || xmlExpected) {
      //JT-3628
      if (statusOk) {
        Webr.event.ResponseServerEventListener.error("XML response was expected");
      } else {
        Webr.event.ResponseServerEventListener.disconnected();
      }

      return false;
    }

  }

  return true;
};
Webr.event.ResponseServerEventListener.connected = function () {
  if (Webr.event.ResponseServerEventListener.DISCONNECTED) {
    Webr.event.ResponseServerEventListener.DISCONNECTED = false;
    Webr.event.ResponseServerEventListener.DISCONNECTED_POPUP.hide();
  }

};
Webr.event.ResponseServerEventListener.disconnected = function () {
  if (!Webr.event.ResponseServerEventListener.DISCONNECTED && !Webr.event.ResponseServerEventListener.PAGE_CHANGED) {
    Webr.event.ResponseServerEventListener.DISCONNECTED_POPUP.show("Connection Lost");
    Webr.event.ResponseServerEventListener.DISCONNECTED = true;
  }

};
Webr.event.ResponseServerEventListener.reloadDelayed = function (seconds) {
  if (!Webr.event.ResponseServerEventListener.RELOAD_INTERVAL) {
    Webr.event.ResponseServerEventListener.TIME_TO_RELOAD = seconds;
    Webr.event.ResponseServerEventListener.RELOAD_INTERVAL = window.setInterval(Webr.event.ResponseServerEventListener.waitReloadTick, 1000);
  }

};
Webr.event.ResponseServerEventListener.waitReloadTick = function () {
  if (Webr.event.ResponseServerEventListener.TIME_TO_RELOAD > 0) {
    Webr.event.ResponseServerEventListener.DISCONNECTED_POPUP.show('Connection Lost. <a href="javascript:window.location.reload()">Reload</a> (' + Webr.event.ResponseServerEventListener.TIME_TO_RELOAD + ')');
    --Webr.event.ResponseServerEventListener.TIME_TO_RELOAD;
  } else {
    window.clearInterval(Webr.event.ResponseServerEventListener.RELOAD_INTERVAL);
    Webr.event.ResponseServerEventListener.DISCONNECTED_POPUP.show('Reloading...');
    Webr.Event.reload();
  }

};
Webr.event.ResponseServerEventListener.error = function (message) {
  //Ignore
};
Webr.event.ResponseServerEventListener.processXmlResponse = function (xml) {
  time("processXmlResponse");
  var nodes;
  if ("commands" == xml.firstChild.nodeName) {
    nodes = xml.firstChild.childNodes;
  } else {
    if ("command" == xml.firstChild.nodeName) {
      nodes = xml.childNodes;
    } else {
      Webr.event.PopupMessage.SYSTEM.show("Unexpected response: " + xml.firstChild.nodeName, 10000);
      return ;
    }

  }

  var prcs = Webr.event.CommandProcessor.commandProcessors;
  var context = new Webr.event.ProcessingContext();
  context.queue();
  for (var j = 0; j < nodes.length; j += 1) {
    var command = nodes.item(j);
    if (command.nodeType != 1) {
            continue;

    }

    for (var i = 0; i < prcs.length; i += 1) {
      try {
        if (prcs[i].processCommand(command, context)) {
                    break;

        }

      } catch (e) {
        throw e;
      }

    }

  }

  context.release();
  timeEnd("processXmlResponse");
};
