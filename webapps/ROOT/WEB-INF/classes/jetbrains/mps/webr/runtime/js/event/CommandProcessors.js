Webr.event.CommandProcessor = function () {
};
Webr.event.CommandProcessor.prototype.processCommand = function (command, context) {
};
Webr.event.CommandProcessor.commandProcessors = [];
Webr.event.CommandProcessor.register = function (commandProcessor) {
  Webr.event.CommandProcessor.commandProcessors.push(commandProcessor);
};
Webr.event.ProcessingContext = function () {
  this.scripts = [];
  this.refresh = 0;
  this.errorMessagesCleared = false;
};
Webr.event.ProcessingContext.prototype.addScript = function (script) {
  this.scripts.push(script);
};
Webr.event.ProcessingContext.prototype.queue = function () {
  this.refresh = this.refresh + 1;
};
Webr.event.ProcessingContext.prototype.release = function () {
  this.refresh = this.refresh - 1;
  if (this.refresh == 0) {
    for (var i = 0; i < this.scripts.length; ++i) {
      eval(this.scripts[i]);
    }

  }

};
Webr.event.ExecuteCommandProcessor = function () {
  Webr.event.ExecuteCommandProcessor.superclass.constructor.call(this);
};
{
  var F = new Function();
  F.prototype = Webr.event.CommandProcessor.prototype;
  Webr.event.ExecuteCommandProcessor.prototype = new F();
  Webr.event.ExecuteCommandProcessor.prototype.constructor = Webr.event.ExecuteCommandProcessor;
  Webr.event.ExecuteCommandProcessor.superclass = Webr.event.CommandProcessor.prototype;
}

Webr.event.ExecuteCommandProcessor.prototype.processCommand = function (command, context) {
  var processed = false;
  if (command.getAttribute("type") == "execute") {
    processed = true;
    context.addScript(command.firstChild.nodeValue);
  }

  return processed;
};
Webr.event.CommandProcessor.register(new Webr.event.ExecuteCommandProcessor());
Webr.event.MessageCommandProcessor = function () {
  Webr.event.MessageCommandProcessor.superclass.constructor.call(this);
};
{
  var F = new Function();
  F.prototype = Webr.event.CommandProcessor.prototype;
  Webr.event.MessageCommandProcessor.prototype = new F();
  Webr.event.MessageCommandProcessor.prototype.constructor = Webr.event.MessageCommandProcessor;
  Webr.event.MessageCommandProcessor.superclass = Webr.event.CommandProcessor.prototype;
}

Webr.event.MessageCommandProcessor.prototype.processCommand = function (command, context) {
  var processed = false;
  if (command.getAttribute("type") == "message") {
    var clear = command.getAttribute("clear");
    if (clear && clear != "false" && context.errorMessagesCleared == false) {
      Webr.ErrorMessage.clearErrorMessages();
      context.errorMessagesCleared = true;
    }

    var errorMessages = eval(command.firstChild.nodeValue);
    for (var i = 0; i < errorMessages.length; ++i) {
      var message = errorMessages[i];
      Webr.ErrorMessage.addMessage(message.message, message.severity, message.inputName, message.propertyName);
    }

    processed = true;
  }

  return processed;
};
Webr.event.CommandProcessor.register(new Webr.event.MessageCommandProcessor());
Webr.event.RefreshCommandProcessor = function () {
  Webr.event.RefreshCommandProcessor.superclass.constructor.call(this);
};
{
  var F = new Function();
  F.prototype = Webr.event.CommandProcessor.prototype;
  Webr.event.RefreshCommandProcessor.prototype = new F();
  Webr.event.RefreshCommandProcessor.prototype.constructor = Webr.event.RefreshCommandProcessor;
  Webr.event.RefreshCommandProcessor.superclass = Webr.event.CommandProcessor.prototype;
}

Webr.event.RefreshCommandProcessor.prototype.processCommand = function (command, context) {
  var processed = false;
  if (command.getAttribute("type") == "refresh") {
    processed = true;
    var targetId = command.getAttribute("targetId");
    var substHeader = command.getAttribute("target");
    if (targetId != null && targetId != "") {
      var target = document.getElementById(targetId);
      //notify unregister
      this.notifyListeners(function (l) {
        if (l.beforeRefresh) {
          l.beforeRefresh(substHeader);
        }

        return true;
      });
      var newContent = $(command).text();
      Webr.event.RefreshCommandProcessor.setContent(target, newContent, context);
      //notify register
      //get new target
      target = document.getElementById(targetId);
      this.notifyListeners(function (l) {
        if (l.afterRefresh) {
          l.afterRefresh(target);
        }

        return true;
      });
    } else {
      window.alert("Try to refresh not refreshable template [" + substHeader + "]");
      Webr.Event.reload();
    }

  }

  return processed;
};
Webr.event.RefreshCommandProcessor.prototype.notifyListeners = function (f) {
  if (Webr.event.RefreshCommandProcessor.refreshListeners) {
    Webr.event.RefreshCommandProcessor.refreshListeners.forEach(f);
  }

};
Webr.event.RefreshCommandProcessor.ID_GEN = 0;
Webr.event.RefreshCommandProcessor.setContent = function (e, html, context) {
  return Webr.event.RefreshCommandProcessor.setContentToElement(e, html, context);
};
Webr.event.RefreshCommandProcessor.setContentToElement = function (element, html, context) {
  ++Webr.event.RefreshCommandProcessor.ID_GEN;
  var id = "__unique_id_end_of_div__" + Webr.event.RefreshCommandProcessor.ID_GEN;
  if (context) {
    context.queue();
  }

  var span = document.createElement("span");
  span.id = id;
  document.body.appendChild(span);
  var availCheckCount = 200;
  var waitAvailHandler = window.setInterval(function () {
    if (availCheckCount > 0) {
      if (span) {
        window.clearInterval(waitAvailHandler);
        Webr.event.RefreshCommandProcessor.executeScripts(html, function () {
          span.parentNode.removeChild(span);
          if (context) {
            context.release();
          }

        });
      } else {
        --availCheckCount;
      }

    } else {
      window.clearInterval(waitAvailHandler);
    }

  }, 20);
  time("setContentToElement");
  var rowHtml = html.replace(Webr.event.RefreshCommandProcessor.createScriptRegexp(), "");
  var p = rowHtml.indexOf("<");
  var rootTag = rowHtml.substring(p + 1, rowHtml.indexOf(" ", p));
  var e = $(element);
  if (element.tagName.toLowerCase() == rootTag.toLowerCase()) {
    //fast refresh
    //clear events
    $(element).unbind();
    //update attributes
    var attrs = rowHtml.substring(rowHtml.indexOf(" ", p), rowHtml.indexOf(">"));
    var r = new RegExp("\\w+\\=\"[^\"]*\"", "ig");
    var attr;
    while (attr = r.exec(attrs)) {
      attr = attr[0];
      var ep = attr.indexOf("=");
      e.attr(attr.substring(0, ep), attr.substring(ep + 2, attr.length - 1));
    }

    //extract content of area being refreshed: <div>xxx</div> -> xxx
    //and set it as innerHTML
    rowHtml = rowHtml.substring(rowHtml.indexOf(">") + 1, rowHtml.lastIndexOf("<"));
    try {
      element.innerHTML = rowHtml;
    } catch (ex) {
      //If exception is raised it means that we can't insert rowHtml - use jQuery
      e.html(rowHtml);
    }

  } else {
    e.replaceWith(rowHtml);
  }

  timeEnd("setContentToElement");
  return e;
};
Webr.event.RefreshCommandProcessor.createScriptRegexp = function () {
  return new RegExp("(?:\\s*)(?:<script([^>]*)?>)((\\s|.)*?)(?:<\/script>)(?:\\s*)", "ig");
};
Webr.event.RefreshCommandProcessor.executeScripts = function (html, onFinish) {
  Webr.event.RefreshCommandProcessor._executeScripts(html, html.indexOf("<script"), onFinish);
};
Webr.event.RefreshCommandProcessor._executeScripts = function (html, start, onFinish) {
  //can't use regexp here because of bug in webkit - it doesn't support capturing groups longer then 20k
  var _start;
  var stop;
  var src;
  var script;
    

  if (start == -1) {
    //no scripts
    onFinish();
    return ;
  }

  _start = start;
  start = html.indexOf(">", start) + 1;
  stop = html.indexOf("<\/script>", start);
  if (stop == -1) {
    //no well-formed scripts
    onFinish();
    return ;
  }

    

  //load src
  var _src = /src=\"(.*)\"/.exec(html.substring(_start + 7, start - 1));
  if (_src) {
    src = _src[1];
    trace("Start load script [" + src + "]");
    jQuery.getScript(src, function () {
      //continue script loading and evaluation only after this one was loaded
      trace("Script loaded [" + src + "]");
      start = html.indexOf("<script", stop + 8);
      Webr.event.RefreshCommandProcessor._executeScripts(html, start, onFinish);
    });
    //not real exit - continue after script is loaded
    return ;
  }

    

  //eval inline script
  script = html.substring(start, stop);
  if (script && script.length > 0) {
    eval(script);
  }

    

  //continue script loading and evaluation
  start = html.indexOf("<script", stop + 8);
  Webr.event.RefreshCommandProcessor._executeScripts(html, start, onFinish);
};
Webr.event.RefreshCommandProcessor.addListener = function (listener) {
  if (Webr.event.RefreshCommandProcessor.refreshListeners == null) {
    Webr.event.RefreshCommandProcessor.refreshListeners = new Webr.util.Set();
  }

  Webr.event.RefreshCommandProcessor.refreshListeners.add(listener);
};
Webr.event.RefreshCommandProcessor.removeListener = function (listener) {
  if (Webr.event.RefreshCommandProcessor.refreshListeners == null) {
    return ;
  }

  Webr.event.RefreshCommandProcessor.refreshListeners.remove(listener);
};
Webr.event.CommandProcessor.register(new Webr.event.RefreshCommandProcessor());
