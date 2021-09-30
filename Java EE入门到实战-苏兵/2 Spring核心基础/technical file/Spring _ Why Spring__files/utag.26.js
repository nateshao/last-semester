//~~tv:1066.20160620
//~~tc: Updated variable names.
//~~tc: Added link call and callback functionality.
//~~tc: Updated template structure to include u.data and Ecommerce mapping.

var adroll_custom_data = adroll_custom_data || {};
var adroll_conversion_value = adroll_conversion_value || "";
var adroll_conversion_value_in_dollars = adroll_conversion_value_in_dollars || "";
var adroll_adv_id = "";
var adroll_pix_id = "";
var __adroll_loaded = true;
var adroll_record_user = {};

//tealium universal tag - utag.sender.template ut4.0.202007160442, Copyright 2020 Tealium.com Inc. All Rights Reserved.
try {
  (function (id, loader) {
    var u = {"id" : id};
    utag.o[loader].sender[id] = u;
    // Please do not modify
    if (utag.ut === undefined) { utag.ut = {}; }
    // Start Tealium loader 4.35
    var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
    if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 35) { u.loader = function (o) { var b, c, l, a = document; if (o.type === "iframe") { b = a.createElement("iframe"); o.attrs = o.attrs || { "height" : "1", "width" : "1", "style" : "display:none" }; for( l in utag.loader.GV(o.attrs) ){ b.setAttribute( l, o.attrs[l] ); } b.setAttribute("src", o.src); }else if (o.type=="img"){ utag.DB("Attach img: "+o.src); b=new Image();b.src=o.src; return; }else{ b = a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8"; for( l in utag.loader.GV(o.attrs) ){ b[l] = o.attrs[l]; } b.src = o.src; } if(o.id){b.id=o.id}; if (typeof o.cb=="function") { if(b.addEventListener) { b.addEventListener("load",function(){o.cb()},false); }else { /* old IE support */ b.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){this.onreadystatechange=null;o.cb()}}; } } l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to "+l+": "+o.src); if (l == "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b) } } } } else { u.loader = utag.ut.loader; }
    // End Tealium loader
    // Start Tealium typeOf 4.35
    if (utag.ut.typeOf === undefined) { u.typeOf = function(e) {return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();};} else { u.typeOf = utag.ut.typeOf; }
    // End Tealium typeOf

    u.ev = {"view" : 1, "link" : 1};
    u.initialized = false;
    u.scriptrequested = false;
    u.queue = [];



      u.map={};
  u.extend=[];


    u.isEmptyObject = function(o, a) {
      for (a in o) {
        if (utag.ut.hasOwn(o, a)) return false;
      }
      return true;
    }

    u.send=function(a,b,c,d,e,f){
      if(u.ev[a]||typeof u.ev.all!="undefined"){
        //Clear object for multiple calls
        adroll_record_user = {};
        
        u.data = {  
          "advID" : "OSU6T4K5BNEFDBKAQHSKNI",
          "pxlID" : "3T3E3J57XBHLNN2SF6MDM3",
          "base_url" : "//"+(location.protocol=="https:"?"s":"a")+".adroll.com/j/roundtrip.js",
          "adroll" : {
            "conversion_value" : ""
          },
          "adroll_custom_data" : {},
          "adroll_record_user" : {}
        }

        //Initial ID push into global
        adroll_adv_id = u.data.advID;
        adroll_pix_id = u.data.pxlID;

        for(d in utag.loader.GV(u.map)){if(typeof b[d]!=="undefined"&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){
          if(e[f].indexOf("adroll_custom_data.")==0){
            u.data.adroll_custom_data[e[f].split(".")[1]]=b[d];
          } else if (e[f].indexOf("adroll_record_user.")==0) {
            u.data.adroll_record_user[e[f].split(".")[1]]=b[d];
          } else if (e[f].indexOf("adroll_")==0) {
            u.data.adroll[e[f].split("_")[1]]=b[d];
          } else {
            u.data[e[f]]=b[d];
          }
        }}}

        if (typeof u.data.adroll.email != 'undefined') {
          u.data.adroll.email = u.data.adroll.email.toLowerCase();
        }

        u.data.order_id = u.data.order_id || b._corder || "";
        u.data.order_subtotal = u.data.order_subtotal || b._csubtotal || "";

        if (u.data.order_id) {
          if (adroll_conversion_value == "" && u.data.adroll.conversion_value == "" && u.data.order_subtotal) {
            u.data.adroll.conversion_value = u.data.order_subtotal;
          }
          if (u.data.adroll.conversion_value) {
            u.data.adroll.conversion_value = parseFloat(u.data.adroll.conversion_value);
          }
        }

        //Global copying
        adroll_record_user = u.data.adroll_record_user;
        adroll_custom_data = u.data.adroll_custom_data;
        for (var key in u.data.adroll) {
          window["adroll_"+key] = u.data.adroll[key];
        }


      // Start Loader Callback
      u.loader_cb = function (a,b,c) {
        utag.DB("send:26:CALLBACK");
        if (u.initialized){
          if (!u.isEmptyObject(adroll_record_user)) {
              __adroll.record_user(adroll_record_user);
          } else {
            utag.DB("Warning: adroll_record_user object is empty, no pixel fired.");
          }
        }
        // Moved to use __adroll.record_user only on 2nd calls and beyond
        u.initialized = true;

        utag.DB("send:26:CALLBACK:COMPLETE");
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
          u.loader({"type": "script", "src": u.data.base_url, "cb": u.callBack, "loc": "script", "id": "utag_26", "attrs" : {}});
        }
      }
      }
    };
    utag.o[loader].loader.LOAD(id);
  }("26", "vmware.microsites-privacy"));
} catch (error) {
  utag.DB(error);
}
  //end tealium universal tag
