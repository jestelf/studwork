Webr.component.Underline = function (inputElement) {
  this.input = inputElement;
};
Webr.component.Underline.prototype.underline = function (value, ranges, optionalLeftOffset) {
  optionalLeftOffset = optionalLeftOffset || 0;
  var rangesCount = ranges != null ?ranges.length :0;
  var rangesElement = this.getRangesElement();
  var elementNodes = rangesElement.childNodes;
  var existingElementsCount = elementNodes.length;
  var inputPos = $(this.input).position();
  for (var i = 0; i < (existingElementsCount > rangesCount ?existingElementsCount :rangesCount); ++i) {
    var r;
    if (i < existingElementsCount) {
      r = elementNodes.item(i);
    } else {
      r = document.createElement("li");
      rangesElement.appendChild(r);
    }

    if (i < rangesCount && ranges[i].start != -1 && ranges[i].end != -1) {
      var range = ranges[i];
      var left = this.getStringWidth(value, range.start);
      var inputWidth = this.input.offsetWidth;
      if (left + optionalLeftOffset < inputWidth) {
        var top = this.input.offsetTop + this.input.offsetHeight - 2;
        var width = this.getStringWidth(value, range.end) - left;
        if (range.start == range.end) {
          width = 10;
        } else {
          width = this.getStringWidth(value, range.end) - left;
        }

        if (left + optionalLeftOffset + width > inputWidth) {
          width = inputWidth - left - optionalLeftOffset;
        }

        r.style.left = (left + inputPos.left + optionalLeftOffset) + "px";
        r.style.width = width + "px";
        r.style.top = top + "px";
        if (range.styleClass != null) {
          r.className = range.styleClass;
        } else {
          r.className = "type" + range.type;
        }

        r.style.display = "block";
      } else {
        r.style.display = "none";
      }

    } else {
      r.style.display = "none";
    }

  }

};
Webr.component.Underline.prototype.getStringWidth = function (value, end) {
  return Webr.component.FontMetrics.stringWidth(this.input, value.substring(0, end));
};
Webr.component.Underline.prototype.getRangesElement = function () {
  if (this.underliner == null) {
    this.underliner = document.createElement("ul");
    this.underliner.className = "underline";
    $(this.input).after(this.underliner);
  }

  return this.underliner;
};
Webr.component.Range = function () {
};
