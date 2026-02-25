Webr.component.ComponentRegistry = function () {
  Webr.component.ComponentRegistry.superclass.constructor.call(this);
  this.templates = {};
  this.ash = this.addServerSideHandler;
  this.ach = this.addClientSideHandler;
};
{
  var F = new Function();
  F.prototype = Webr.event.RefreshListener.prototype;
  Webr.component.ComponentRegistry.prototype = new F();
  Webr.component.ComponentRegistry.prototype.constructor = Webr.component.ComponentRegistry;
  Webr.component.ComponentRegistry.superclass = Webr.event.RefreshListener.prototype;
}

Webr.component.ComponentRegistry.prototype.onDocumentLoad = function () {
  info("onDocumentLoad");
  this.bindHandlers();
  this.executeOnLoad();
};
Webr.component.ComponentRegistry.prototype.onTemplateRefresh = function (root) {
  info("onTemplateRefresh");
  this.clearCaches();
  this.bindHandlers(root);
  this.executeOnLoad();
};
Webr.component.ComponentRegistry.prototype.clearCaches = function () {
  this.component2elements = null;
  this.lastLoadedTemplates = null;
};
Webr.component.ComponentRegistry.prototype.bindHandlers = function (context) {
  this.registerComponents(context);
  time("bindHandlers");
  if (this.component2elements) {
    for ( var templateName in this.templates) {
      var t = this.templates[templateName];
      if (t.paths && t.bind) {
        for (var j = 0; j < t.paths.length; j += 1) {
          var p = t.paths[j];
          t.bind(p);
        }

      }

    }

  }

  timeEnd("bindHandlers");
};
Webr.component.ComponentRegistry.prototype.executeOnLoad = function () {
  if (this.lastLoadedTemplates) {
    var it = this;
    jQuery.each(this.lastLoadedTemplates, function () {
      var _t = this;
      var t = it.templates[_t.name];
      if (t.onLoad) {
        if (t.paths && t.paths.length > 1) {
          window.alert("Can't execute on load handlers if more then one instance of template [" + t.name + "] present.");
        } else {
          t.onLoad(t.paths[0]);
        }

      }

    });
  }

};
Webr.component.ComponentRegistry.prototype.addClientSideHandler = function (path, componentSuffixName, eventName, handler) {
  this.forEach(path, componentSuffixName, function (realPath) {
    $(this).bind(eventName, {realPath: realPath}, handler);
  });
};
Webr.component.ComponentRegistry.prototype.addServerSideHandler = function (path, componentSuffixName, eventName, baseConfig) {
  var it = this;
  var check = function (eb) {
    return eb.noServerSideEvent(eventName);
  };
    

  this.forEach(path, componentSuffixName, function () {
    $(this).bind(eventName, {config: baseConfig, eventName: eventName, it: this}, it.serverHandler);
  }, check);
};
Webr.component.ComponentRegistry.prototype.forEach = function (path, componentSuffixName, f, condition) {
  this.forEachBundle(path, componentSuffixName, function (eb) {
    eb.each(function () {
      //"this" is iteration element here
      f.call(this, eb.realPath);
    });
  }, condition);
};
Webr.component.ComponentRegistry.prototype.forEachBundle = function (path, componentSuffixName, f, condition) {
  var eb = this.findComponents(path, componentSuffixName);
  if (eb) {
    if (condition && !condition(eb)) {
      return ;
    }

    f.call(this, eb);
  }

};
Webr.component.ComponentRegistry.prototype.registerComponent = function (e) {
  var cn = e.getAttribute("cn");
  var eb = this.component2elements[cn];
  if (!eb) {
    eb = new Webr.component.ElementsBundle();
    this.component2elements[cn] = eb;
  }

  eb.elements.push(e);
};
Webr.component.ComponentRegistry.prototype.registerComponents = function (context) {
  time("registerComponents");
  var components = $("[cn]", context);
  if (context && context.getAttribute("cn")) {
    //context element is not taken into accout by jqeury
    components[components.length] = context;
    components.length += 1;
  }

  var t = this;
  if (components.length > 0) {
    this.component2elements = {};
    components.each(function () {
      t.registerComponent(this);
    });
    if (Webr.util.Util.isIE) {
      components.each(function () {
        t.applyExtension(this);
      });
    }

  }

  timeEnd("registerComponents");
  info("total components: " + components.length);
};
Webr.component.ComponentRegistry.prototype.findComponents = function (path, componentSuffixName) {
  if (this.component2elements) {
    var res = this.component2elements[path.path + "." + componentSuffixName];
    if (!res) {
      return undefined;
    }

    res.realPath = path.path;
    return res;
  } else {
    return null;
  }

};
Webr.component.ComponentRegistry.prototype.afterRefresh = function (root) {
  this.onTemplateRefresh(root);
};
Webr.component.ComponentRegistry.prototype.setTemplateBind = function (templateName, f) {
  cr.getTemplate(templateName).bind = f;
};
Webr.component.ComponentRegistry.prototype.setTemplateOnLoad = function (templateName, f) {
  cr.getTemplate(templateName).onLoad = f;
};
Webr.component.ComponentRegistry.prototype.setTemplatePaths = function (paths) {
  this.lastLoadedTemplates = paths;
  jQuery.each(paths, function () {
    var t = this;
    cr.getTemplate(t.name).paths = t.paths;
  });
};
Webr.component.ComponentRegistry.prototype.getTemplate = function (templateName) {
  var t = this.templates[templateName];
  if (!t) {
    t = new Webr.component.Template(templateName);
    this.templates[templateName] = t;
  }

  return t;
};
Webr.component.ComponentRegistry.prototype.createServerEventConfig = function (source, baseConfig, eventName) {
  var config = Webr.event.ServerEventConfig.createCopy(baseConfig, {collectFormElements: true, sync: false, eventParameters: {}});
  //Set component parameters
  config.eventParameters["__COMPONENT_PARAMS__"] = this.getComponentParameters(source);
  config.eventParameters["__COMPONENT_SOURCE__"] = this.getComponentSource(source);
  config.eventName = this.getComponentName(source) + ":" + eventName;
  return config;
};
Webr.component.ComponentRegistry.prototype.getComponentParameters = function (component) {
  var params = [];
  var i = 0;
  var p = component.getAttribute("p" + i);
  i += 1;
  while (p) {
    params.push(p);
    p = component.getAttribute("p" + i);
    i += 1;
  }

  return params;
};
Webr.component.ComponentRegistry.prototype.getComponentSource = function (component) {
  //source = name + params
  var res = this.getComponentName(component);
  var params = this.getComponentParameters(component);
  for (var i = 0; i < params.length; i += 1) {
    res += "_" + params[i].replaceAll("-", "_");
  }

  return res;
};
Webr.component.ComponentRegistry.prototype.getComponentName = function (component) {
  //TODO: shound be cn only, tp should be sent as TEMPLATE_PARAMS
  //cn + tp
  var cname = component.getAttribute("cname");
  if (cname) {
    return cname;
  }

  var cn = component.getAttribute("cn").split(".");
  cname = "";
  for (var i = 0; i < cn.length; i += 1) {
    cname += cn[i];
    var tp = component.getAttribute("tp" + i);
    if (tp) {
      cname += "_" + tp.replaceAll("-", "_");
    }

    if (i != cn.length - 1) {
      cname += ".";
    }

  }

  component.setAttribute("cname", cname);
  return cname;
};
Webr.component.ComponentRegistry.prototype.serverHandler = function (event, params) {
  var baseConfig = event.data.config;
  var config = cr.createServerEventConfig(cr.getTarget(event), baseConfig, event.data.eventName);
  //additional params
  if (params) {
    config.eventParameters = config.eventParameters || {};
    for ( var p in params) {
      config.eventParameters[p] = params[p];
    }

  }

  Webr.Event.post(config);
  return true;
};
Webr.component.ComponentRegistry.prototype.getTarget = function (e) {
  var t = e.data.it;
  if (t) {
    return t;
  }

  t = e.target;
  while (!t.getAttribute("cn")) {
    t = t.parentNode;
  }

  return t;
};
Webr.component.ComponentRegistry.prototype.serverMethodCallInHandler = function (event, methodName, params, baseConfig) {
  var config = Webr.event.ServerEventConfig.createCopy(baseConfig, {sync: false, preventDoubleSubmit: false, processRecentOnly: false, collectFormElements: true, eventName: this.getEventNameForMethodCall(this.addTemplateParams(event.data.realPath, this.getTarget(event)) + methodName), eventParameters: params});
  Webr.Event.post(config);
};
Webr.component.ComponentRegistry.prototype.getEventNameForMethodCall = function (fullMethodName) {
  //replace last "." with ":"
  var pos = fullMethodName.lastIndexOf(".");
  return fullMethodName.substring(0, pos) + ":" + fullMethodName.substring(pos + 1);
};
Webr.component.ComponentRegistry.prototype.serverEventCallInHandler = function (event, config) {
  config.eventSource = this.getTemplateName(this.getTarget(event));
  Webr.Event.post(config);
};
Webr.component.ComponentRegistry.prototype.findGlobal = function (baseName, params) {
  for (var i = 0; i < params.length; i += 1) {
    baseName += "_" + params[i].replaceAll("-", "_");
  }

  baseName = "id_" + baseName;
  return this.findById(baseName);
};
Webr.component.ComponentRegistry.prototype.findById = function (id) {
  //check for element.data().instance first
  var el = document.getElementById(id);
  if (!el) {
    return null;
  }

  var element = $(el);
  var instance = this.getComponentInstance(element);
  return instance ?instance :el;
};
Webr.component.ComponentRegistry.prototype.getComponentInstance = function (e) {
  return e.data(Webr.component.ComponentRegistry.COMPONENT_INSTANCE);
};
Webr.component.ComponentRegistry.prototype.addTemplateParams = function (str, e) {
  var cn = str.split(".");
  var res = "";
  for (var i = 0; i < cn.length; i += 1) {
    res += cn[i];
    var tp = e.getAttribute("tp" + i);
    if (tp) {
      res += "_" + tp.replaceAll("-", "_");
    }

    if (i < cn.length - 1) {
      res += ".";
    }

  }

  return res;
};
Webr.component.ComponentRegistry.prototype.findInHandler = function (event, componentSuffixName, params) {
  return this.findGlobal(this.addTemplateParams(event.data.realPath, this.getTarget(event)) + componentSuffixName, params);
};
Webr.component.ComponentRegistry.prototype.findInGlobalHandler = function (path, componentSuffixName, params) {
  if (componentSuffixName.startsWith(".")) {
    componentSuffixName = componentSuffixName.substring(1);
  }

  var eb = this.findComponents(path, componentSuffixName);
  var templateName;
  if (eb) {
    templateName = this.getTemplateName(eb.elements[0]);
  } else {
    //TODO: error prone approach - doesn't take into account template parameters
    //elements bundle may absent if some template was refreshed already
    templateName = path.path;
  }

  return this.findGlobal(templateName + "." + componentSuffixName, params);
};
Webr.component.ComponentRegistry.prototype.getTemplateName = function (eventSource) {
  var cn = this.getComponentName(eventSource);
  return cn.substring(0, cn.lastIndexOf("."));
};
Webr.component.ComponentRegistry.prototype.registerExtension = function (tagName, name) {
  if (window[name] == null) {
    if (this.elementPrototypes == null) {
      this.elementPrototypes = {};
    }

    var f = new Function();
    window[name] = f;
    this.elementPrototypes[tagName.toLowerCase()] = f;
  }

};
Webr.component.ComponentRegistry.prototype.applyExtension = function (e) {
  if (this.elementPrototypes != null && this.elementPrototypes[e.tagName.toLowerCase()] != null) {
    var p = this.elementPrototypes[e.tagName.toLowerCase()];
    for ( var prop in p.prototype) {
      try {
        e[prop] = p.prototype[prop];
      } catch (ex) {
        //Do nothing
      }

    }

  }

};
Webr.component.ComponentRegistry.COMPONENT_INSTANCE = "_instance_";
Webr.component.ComponentRegistry.instance = new Webr.component.ComponentRegistry();
Webr.component.ComponentRegistry.get = function () {
  return Webr.component.ComponentRegistry.instance;
};
Webr.component.Template = function (name, paths) {
  this.name = name;
  this.paths = paths;
};
Webr.component.TemplatePath = function () {
};
Webr.component.ElementsBundle = function () {
  this.dataValue = {};
  this.elements = [];
};
Webr.component.ElementsBundle.prototype.each = function (f) {
  jQuery.each(this.elements, f);
};
Webr.component.ElementsBundle.prototype.data = function (name, value) {
  if (!value) {
    return this.dataValue[name];
  }

  this.dataValue[name] = value;
};
Webr.component.ElementsBundle.prototype.__getEventsHolder = function () {
  if (!this.__eventsHolder) {
    //use first element as events storage for all elements of this bundle
    this.__eventsHolder = $(this.elements[0]);
  }

  return this.__eventsHolder;
};
Webr.component.ElementsBundle.prototype.__bind = function (eventName, data, handler) {
  this.__getEventsHolder().bind(eventName, data, handler);
};
Webr.component.ElementsBundle.prototype.__fire = function (e, eventName, data) {
  this.__getEventsHolder().trigger(eventName, data);
};
Webr.component.ElementsBundle.prototype.noServerSideEvent = function (eventName) {
  var s = eventName + "$$";
  if (!this.data(s)) {
    this.data(s, true);
    return true;
  }

  return false;
};
var cr = Webr.component.ComponentRegistry.get();
