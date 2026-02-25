(function () {
    function f() {
        if (document.getElementById("jt-wrapper")) return;
        var div = document.createElement("div");
        div.id = "jt-wrapper";
        div.style.position = "fixed";
        div.style.top = "-4px";
        div.style.right = "-4px";
        div.style.zIndex = 901001;
        var url = '${getBaseUrl()}/bookmarklet/${getRequestParameter("p")}?' + encodeURIComponent(top.location.href);
        var iframe = document.createElement("iframe");
        iframe.src = url;
        iframe.style.width = "530px";
        iframe.style.height = "290px";
        iframe.style.border = "4px solid #8A929B";
        iframe.style.backgroundColor = "white";
        div.appendChild(iframe);
        document.body.appendChild(div);
        var getScroll = function() {
            return [window.scrollX || document.body.scrollTop || document.documentElement.scrollTop, window.scrollY || document.body.scrollLeft || document.documentElement.scrollLeft];
        };
        var setScroll = function(scroll) {
            window.scrollTo(scroll[0], scroll[1]);
        };
        var changeUrl = function(l) {
            try {location.replace(l);}
            catch(e) {location.href = l;}
        };
        var oldScroll;
        var monitor = setInterval(function() {
            if (/^newissue-close/.test(location.href.split('#')[1])) {
                clearInterval(monitor);
                changeUrl(location.href.split('#')[0] + "#");
                div.parentNode.removeChild(div);
                if (oldScroll) {
                    setScroll(oldScroll);
                    setTimeout(function() {setScroll(oldScroll);}, 1);
                }
            }
            else {
                oldScroll = getScroll();
            }
        }, 50);
    }
    f();
})();