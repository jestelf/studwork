Webr.component.FontMetrics = function () {
};
Webr.component.FontMetrics.stringWidth = function (element, s) {
  var meterDiv = element.meterDiv;
  if (meterDiv == null) {
    meterDiv = Webr.component.FontMetrics.createMeterDiv(element);
    element.meterDiv = meterDiv;
  }

  var text = meterDiv.childNodes.item(0);
  text.nodeValue = s;
  return $(meterDiv).width();
};
Webr.component.FontMetrics.createMeterDiv = function (element) {
  var meterDiv = document.createElement("div");
  meterDiv.appendChild(document.createTextNode("empty"));
  meterDiv.style.whiteSpace = "pre";
  meterDiv.style.position = "absolute";
  meterDiv.style.top = "-1000px";
  meterDiv.style.left = "-1000px";
  var jDiv = $(meterDiv);
  var jEl = $(element);
  var font_size = jEl.css("font-size");
  jEl.after(meterDiv);
  jDiv.css("font-family", jEl.css("font-family"));
  //Avoiding strange jQuery behavior in IE for font-size counting
  if (Webr.util.Util.isIE) {
    if (jEl.parent().css("font-size") < font_size) {
      font_size = jEl.parent().css("font-size");
    } else {
      font_size = "";
    }

  }

  jDiv.css("font-size", font_size);
  jDiv.css("font-style", jEl.css("font-style"));
  jDiv.css("font-variant", jEl.css("font-variant"));
  jDiv.css("font-weight", jEl.css("font-weight"));
  return meterDiv;
};
