Webr.util.CheckBrowser = function () {
};
Webr.util.CheckBrowser.check = function () {
  if (!Webr.util.Util.isKnownBrowser()) {
    window.location.href = Webr.util.CheckBrowser.ERROR_URL;
  } else if (Webr.util.Util.isIE && Webr.util.Util.browserVersion < 7) {
    if (!Webr.util.CheckBrowser.isChromeFrameInstalled()) {
      window.location.href = Webr.util.CheckBrowser.CHROME_FRAME_INSTALL_URL;
    }

  }

};
Webr.util.CheckBrowser.isChromeFrameInstalled = function () {
  //Try not expensive checks
  var unav = navigator.userAgent.toLowerCase();
  if (unav.indexOf("chromeframe") >= 0 || unav.indexOf("x-clock") >= 0) {
    return true;
  }

  //More expensive check
  if (typeof window["ActiveXObject"] != undefined) {
    try {
      var obj = new ActiveXObject("ChromeTab.ChromeFrame");
      if (obj) {
        return true;
      }

    } catch (e) {
      //Ooops! :(
    }

  }

};
