Webr.util.Util = function () {
};
Webr.util.Util.AGENT = navigator.userAgent.toLowerCase();
Webr.util.Util.isWindows = Webr.util.Util.AGENT.indexOf("windows") != -1 || Webr.util.Util.AGENT.indexOf("win32") != -1;
Webr.util.Util.isMac = Webr.util.Util.AGENT.indexOf("macintosh") != -1 || Webr.util.Util.AGENT.indexOf("mac os x") != -1;
Webr.util.Util.isAir = Webr.util.Util.AGENT.indexOf("adobeair") != -1;
Webr.util.Util.isLinux = Webr.util.Util.AGENT.indexOf("linux") != -1;
Webr.util.Util.isWebkit = Webr.util.Util.AGENT.indexOf("webkit") != -1;
Webr.util.Util.isGecko = (!Webr.util.Util.isWebkit) && (Webr.util.Util.AGENT.indexOf("gecko") != -1);
Webr.util.Util.isIE = Webr.util.Util.AGENT.indexOf("msie") != -1;
Webr.util.Util.isChrome = Webr.util.Util.AGENT.indexOf("chrome") != -1;
Webr.util.Util.isSafari = (!Webr.util.Util.isChrome) && Webr.util.Util.AGENT.indexOf("safari") != -1;
Webr.util.Util.isOpera = Webr.util.Util.AGENT.indexOf("opera") != -1;
Webr.util.Util.browserVersion = parseFloat((Webr.util.Util.AGENT.match(/.+?(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1]);
Webr.util.Util.handlers = {};
Webr.util.Util.isInput = function (e) {
  return e.tagName == "INPUT" || e.tagName == "TEXTAREA";
};
Webr.util.Util.targetIsInput = function (e) {
  return Webr.util.Util.isInput(e["target"]);
};
Webr.util.Util.targetIs = function (e, tags) {
  for (var i = 0; i < tags.length; i += 1) {
    if (e["target"].tagName == tags[i]) {
      return true;
    }

  }

  return false;
};
Webr.util.Util.addKeyHandler = function (e, handler) {
  Webr.util.Util.handlers[e] = handler;
  if (Webr.util.Util.isIE || Webr.util.Util.isWebkit) {
    $(e).keydown(handler);
  } else {
    $(e).keypress(handler);
  }

};
Webr.util.Util.removeKeyHandler = function (e, handler) {
  delete Webr.util.Util.handlers[e];
  if (Webr.util.Util.isIE || Webr.util.Util.isWebkit) {
    $(e).unbind("keydown", handler);
  } else {
    $(e).unbind("keypress", handler);
  }

};
Webr.util.Util.stopEvent = function () {
  return false;
};
Webr.util.Util.vpWidth = function () {
  return window.innerWidth || document.documentElement["clientWidth"] || document.body.clientWidth;
};
Webr.util.Util.vpHeight = function () {
  return window.innerHeight || document.documentElement["clientHeight"] || document.body.clientHeight;
};
Webr.util.Util.getSelection = function () {
  var selection;
  if (window.getSelection) {
    selection = "" + window.getSelection();
  } else {
    if (document.selection) {
      selection = document.selection.createRange().text;
    }

  }

  return selection;
};
Webr.util.Util.isKnownBrowser = function () {
  return Webr.util.Util.isGecko || Webr.util.Util.isWebkit || Webr.util.Util.isIE || Webr.util.Util.isOpera;
};
Webr.util.Util.isAgent = function (property) {
  return Webr.util.Util.AGENT.toLowerCase().indexOf(property) != -1;
};
Webr.util.Util.checkBrowser = function (browser) {
  var allow = true;
  if (browser) {
    allow = false;
    for (var i = 0; i < browser.length; ++i) {
      if (Webr.util.Util.isAgent(browser[i])) {
        allow = true;
      }

    }

  }

  return allow;
};
Webr.util.Util.checkOS = function (os) {
  var allow = true;
  if (os) {
    allow = false;
    for (var i = 0; i < os.length; ++i) {
      if (Webr.util.Util.isAgent(os[i])) {
        allow = true;
      }

    }

  }

  return allow;
};
Webr.util.Util.getKeyStroke = function (keyMappings) {
  for (var i = 0; i < keyMappings.length; ++i) {
    if (Webr.util.Util.checkBrowser(keyMappings[i].browser) && Webr.util.Util.checkOS(keyMappings[i].os)) {
      return keyMappings[i].keyStroke;
    }

  }

  return null;
};
