//~~tv:20110.20170501
//~~tc: Adding tag The Trade Desk Universal Pixel

//tealium universal tag - utag.sender.20110 ut4.0.202010090233, Copyright 2020 Tealium.com Inc. All Rights Reserved.
try {
  (function (id, loader) {
    var u = {"id" : id};
    utag.o[loader].sender[id] = u;
    // Please do not modify
    if (utag.ut === undefined) { utag.ut = {}; }
    // Start Tealium loader 4.41
    /* utag.js version 4.26 or above is required to avoid errors with this loader function */
    var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
    if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) { u.loader = function(o, a, b, c, l, m) { utag.DB(o); a = document; if (o.type == "iframe") { m = a.getElementById(o.id); if (m && m.tagName == "IFRAME") { b = m; } else { b = a.createElement("iframe"); } o.attrs = o.attrs || {}; utag.ut.merge(o.attrs, { "height": "1", "width": "1", "style": "display:none" }, 0); } else if (o.type == "img") { utag.DB("Attach img: " + o.src); b = new Image(); } else { b = a.createElement("script"); b.language = "javascript"; b.type = "text/javascript"; b.async = 1; b.charset = "utf-8"; } if (o.id) { b.id = o.id; } for (l in utag.loader.GV(o.attrs)) { b.setAttribute(l, o.attrs[l]); } b.setAttribute("src", o.src); if (typeof o.cb == "function") { if (b.addEventListener) { b.addEventListener("load", function() { o.cb(); }, false); } else { b.onreadystatechange = function() { if (this.readyState == "complete" || this.readyState == "loaded") { this.onreadystatechange = null; o.cb(); } }; } } if (o.type != "img" && !m) { l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to " + l + ": " + o.src); if (l == "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b); } } } }; } else { u.loader = utag.ut.loader; }
    // End Tealium loader
    // Start Tealium typeOf 4.35
    if (utag.ut.typeOf === undefined) { u.typeOf = function(e) {return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();};} else { u.typeOf = utag.ut.typeOf; }
    // End Tealium typeOf

    u.ev = {"view" : 1};
    u.initialized = false;
    u.scriptrequested = false;

      u.map={};
  u.extend=[];


    // Start Loader Callback
    u.loader_cb = function () {
      utag.DB("send:132:CALLBACK");
      u.initialized = true;
      
      if (typeof TTDUniversalPixelApi === 'function') {
        var universalPixelApi = new TTDUniversalPixelApi();
        universalPixelApi.init(
          u.data.adv_id,
          [u.data.up_id],
          "https://insight.adsrvr.org/track/up",
          "ttdUniversalPixelTag" + u.data.pixel_tag_id
        );
      }

      utag.DB("send:132:CALLBACK:COMPLETE");
    };
    // End Loader Callback

    u.send = function (a, b) {
      if (u.ev[a] || u.ev.all !== undefined) {
        utag.DB("send:132");
        utag.DB(b);

        var c, d, e, f;

        u.data = {
          "qsp_delim" : "&",
          "kvp_delim" : "=",
          "base_url" : "//js.adsrvr.org/up_loader.1.1.0.js",
          "adv_id" : "w0wm271",
          "up_id" : "o3uh0rv",
          "pixel_tag_id" : ""
        };

        // Start tag-scoped extensions
        
        utag.DB("send:132:EXTENSIONS");
        utag.DB(b);
        // End tag-scoped extensions


        // Start Mapping
        for (d in utag.loader.GV(u.map)) {
          if (b[d] !== undefined && b[d] !== "") {
            e = u.map[d].split(",");
            for (f = 0; f < e.length; f++) {
              u.data[e[f]] = b[d];
            }
          }
        }
        utag.DB("send:132:MAPPINGS");
        utag.DB(u.data);
        // End Mapping

        // Report required config is missing, and stop tag from firing.
        if (!u.data.adv_id) {
          utag.DB(u.id + ": Tag not fired: Required attribute not populated");
          return;
        }

        if (u.initialized) {
          u.loader_cb();
        } else {
          if (!u.scriptrequested) {
            u.scriptrequested = true;

            var missing = !(document.getElementById('ttdUniversalPixelTag' + u.data.pixel_tag_id));
            if (missing) {
              var div = document.createElement('div');
              div.setAttribute('id', 'ttdUniversalPixelTag' + u.data.pixel_tag_id);
              div.setAttribute('style', 'display: none;');
              document.getElementsByTagName('body')[0].appendChild(div);
            }
            


            u.loader({
              "type" : "script",
              "src" : u.data.base_url,
              "cb" : u.loader_cb,
              "loc" : "script",
              "id" : "utag_132",
              "attrs" : {}
            });
          }
        }

        utag.DB("send:132:COMPLETE");
      }
    };
    utag.o[loader].loader.LOAD(id);
  }("132", "vmware.microsites-privacy"));
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag

