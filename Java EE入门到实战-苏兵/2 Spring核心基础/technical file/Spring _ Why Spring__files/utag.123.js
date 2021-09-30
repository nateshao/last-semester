//~~tv:13060.external.20150325
//~~tc: Added event handlers for clickLink and associateLead as well as updated loader design pattern.

try {
  (function (id, loader) {
    var u = {};
    utag.o[loader].sender[id] = u;
    // Please do not modify
    if (utag.ut === undefined) { utag.ut = {}; }
    // Start Tealium loader 4.35
    if (utag.ut.loader === undefined) { u.loader = function (o) { var b, c, l, a = document; if (o.type === "iframe") { b = a.createElement("iframe"); o.attrs = o.attrs || { "height" : "1", "width" : "1", "style" : "display:none" }; for( l in utag.loader.GV(o.attrs) ){ b.setAttribute( l, o.attrs[l] ); } b.setAttribute("src", o.src); }else if (o.type=="img"){ utag.DB("Attach img: "+o.src); b=new Image();b.src=o.src; return; }else{ b = a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8"; for( l in utag.loader.GV(o.attrs) ){ b[l] = o.attrs[l]; } b.src = o.src; } if(o.id){b.id=o.id}; if (typeof o.cb=="function") { if(b.addEventListener) { b.addEventListener("load",function(){o.cb()},false); }else { /* old IE support */ b.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){this.onreadystatechange=null;o.cb()}}; } } l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to "+l+": "+o.src); if (l == "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b) } } } } else { u.loader = utag.ut.loader; }
    // End Tealium loader
    // Start Tealium typeOf 4.35
    if (utag.ut.typeOf === undefined) { u.typeOf = function(e) {return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();};} else { u.typeOf = utag.ut.typeOf; }
    // End Tealium typeOf

    u.ev = {'view' : 1, 'link' : 1};
    u.initialized = false;
    u.scriptrequested = false;
    u.queue = [];
      u.map={};
  u.extend=[function(a,b){ try{ if(1){
// Type your JavaScript code here...

if($('input[name="elqFormName"]').parent('form').length !== 0){

passCookieInMarketoPayload();

}


function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin !== 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
} 

function passCookieInMarketoPayload() {
    var marketoCookie = getCookie("_mkto_trk");
    var timeInt;


     var _mktFormNameStr = $('input[name="elqFormName"]').parent('form').attr('name');
     var forms = document.forms[_mktFormNameStr]
    if (marketoCookie === null) {
        // do cookie doesn't exist stuff;
        timeInt=setTimeout(function(){ passCookieInMarketoPayload() }, 300);
    }
    else {
	
         clearTimeout(timeInt);
        
		 if ($("input[name='cookie']").length === 0) {
                        var tag = document.createElement("input");
                        tag.setAttribute("name", "cookie");
			            tag.setAttribute("id", "cookie");
                        tag.setAttribute("type", "hidden");
                        tag.setAttribute("value", marketoCookie);
                        forms.appendChild(tag);
        }
        
        
    }
}
} } catch(e){ utag.DB(e) }  }];

    u.send = function(a, b) {
      if (u.ev[a] || typeof u.ev.all != "undefined") {
        //##UTENABLEDEBUG##utag.DB("send:##UTID##");

        var c, d, e, f;

        u.data = {
          "base_url" : "//munchkin.marketo.net/munchkin.js",
          "acct" : "048-SZW-045",
          "wsInfo" : "",
          "init" : {},
          "view" : {url : document.URL},
          "click" : {},
          "lead" : {}
        };

        for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};

        for (d in utag.loader.GV(u.map)) {
          if (typeof b[d] !== "undefined" && b[d] !== "") {
            e = u.map[d].split(",");
            for (f = 0; f < e.length; f++) {
              if (e[f].indexOf("init.") === 0) {
                u.data.init[e[f].substr(5)] = b[d];
                u.data.idata = !0;
              } else if (e[f].indexOf("view.") === 0) {
                u.data.view[e[f].substr(5)] = b[d];
              } else if (e[f].indexOf("click.") === 0){
                u.data.click[e[f].substr(6)] = b[d];
              } else if (e[f].indexOf("lead.") === 0){
                u.data.lead[e[f].substr(5)] = b[d];
              } else {
                u.data[e[f]] = b[d];
              }
            }
          }
        }

        // Start Loader Callback
        u.loader_cb = function (a,b,c) {
          if (a === "link" || u.data.event_type === "clickLink"){
            Munchkin.munchkinFunction("clickLink", u.data.click);
          }
          if (!u.initialized) {
            u.initialized = true;

            if (u.data.wsInfo) {
              u.data.init.wsInfo = u.data.wsInfo;
              u.data.idata = !0;
            }

            if (!u.data.idata) {
              Munchkin.init(u.data.acct);
            } else {
              Munchkin.init(u.data.acct, u.data.init);
            }
          } else {
          Munchkin.munchkinFunction('visitWebPage', u.data.view);
          }
          if (u.data.event_type === "associateLead"){
                Munchkin.munchkinFunction(u.data.event_type, u.data.lead); 
          }
        };
        // End Loader Callback

        u.callBack = function () {
          var data = {};
          while (data = u.queue.shift()) {
            u.data = data.data;
            u.loader_cb(data.a,data.b,data.c);
          }
        };

        if (u.initialized) {
          u.loader_cb(a,b,c);
        } else {
          u.queue.push({"data" : u.data, "a" : a, "b" : b, "c": c});
          if (!u.scriptrequested) {
            u.scriptrequested = true;
            u.loader({"type": "script",  "src": u.data.base_url, "cb": u.callBack, "loc": "script", "id": 'utag_123' });
            //u.loader({ "type" : "iframe", "src" : u.data.base_url + c.join(u.data.qsp_delim), "cb" : u.loader_cb, "loc" : "body", "id" : "utag_123" });
          }
        }

        //##UTENABLEDEBUG##utag.DB("send:##UTID##:COMPLETE");
      }
    };
    utag.o[loader].loader.LOAD(id);
  })('123', 'vmware.microsites-privacy');
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag

