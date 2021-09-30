//tealium universal tag - utag.loader ut4.34.202108120650, Copyright 2021 Tealium.com Inc. All Rights Reserved. 

var utag_condload=false;window.__tealium_twc_switch=false;try{
function getOptanonCookiee(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
 }

 var getOneTrustCookie= decodeURIComponent(getOptanonCookiee('OptanonConsent'));
 
if(getOneTrustCookie.indexOf('C0002:1') > -1 ){
window.ignore_data = function(data) {}
  }
}catch(e){console.log(e);}

if(!utag_condload){try{
function getOptanonCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
 }

 var getOneTrustCookie= decodeURIComponent(getOptanonCookie('OptanonConsent'));
 
if(getOneTrustCookie.indexOf('C0002:1') > -1 ){
// Preloader to determine whether to load Demandbase Tag or not
    if (typeof sessionStorage.dbInfo == "undefined") {
        window.utag_cfg_ovrd = {noview: true};
        a = document;
        b = a.createElement("script");
        b.language = "javascript";
        b.type = "text/javascript";
        b.async = 1;
        b.charset = "utf-8";
        b.src = "//api.company-target.com/api/v2/ip.js?key=e1f90d4a92d08428627aa34a78d58cc3e866c84f&var=dbInfo";
        //b.id = "utag_jaredtest.sitecat_54";
        if (b.addEventListener) {
            b.addEventListener("load", function() {
                db_callback();
            }, false);
            b.addEventListener('error', function(){
                utag.DB("********ERROR");
                utag.view(utag_data);
            })
        } else {
            b.onreadystatechange = function() {
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    this.onreadystatechange = null;
                    db_callback();
                }
            };
            b.onerror = function() {
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    this.onerror = null;
                    utag.DB("******* ERROR");
                    utag.view(utag_data);
                }
            };
        }
        l = "head";
        c = a.getElementsByTagName(l)[0];
        if (c) {
            if (l == "script") {
                c.parentNode.insertBefore(b, c);
            } else {
                c.appendChild(b);
            }
        }
        db_callback = function(e) {
            utag.DB("******* Callback - Utag.view Called")
            utag.view(utag_data);
        };
    }
    ;
    window._teal_user_agent = navigator.userAgent;
//Create new URL variable to be used in Load Rules
if(document.URL.match(/(.htm|.html|\/)$/)){
   utag_data['load_rule_url']=document.URL.replace(/(.htm|.html|\/)$/,"");
   utag_data['load_rule_pathname']=location.pathname.replace(/(.htm|.html|\/)$/,"");
}else{
   utag_data['load_rule_url']=document.URL;
   utag_data['load_rule_pathname']=location.pathname;
}
/*capturing URL up to first two levels and appending "/" at the end
ex:"https://www.vmware.com/ca/products.html" will be converted to "https://www.vmware.com/ca/products/"

*/
domain_locale = document.URL.replace(/(.*\.com)(\/?)([^\/]*)(\/?[^\/]*).*(.htm|.html)?$/,'$1$2$3$4');
domain_locale = domain_locale.replace(/([^\/]+)$/,'$1/');
utag_data['load_rule_domain_locale'] = domain_locale;
}
}catch(e){console.log(e);}}

if (typeof utag == "undefined" && !utag_condload) {
  var utag = {
    id:"vmware.microsites-privacy",
    o:{},
    sender: {},
    send: {},
    rpt: {
      ts: {
        a: new Date()
      }
    },
    dbi: [],
    loader: {
      q: [],
      lc: 0,
      f: {},
      p: 0,
      ol: 0,
      wq: [],
      lq: [],
      bq: {},
      bk: {},
      rf: 0,
      ri: 0,
      rp: 0,
      rq: [],
      ready_q : [], 
      run_ready_q : function(){
        for(var i=0;i<utag.loader.ready_q.length;i++){
          utag.DB("READY_Q:"+i);
          try{utag.loader.ready_q[i]()}catch(e){utag.DB(e)};
        }
      },
      lh: function(a, b, c) {
        a = "" + location.hostname;
        b = a.split(".");
        c = (/\.co\.|\.com\.|\.org\.|\.edu\.|\.net\.|\.asn\./.test(a)) ? 3 : 2;
        return b.splice(b.length - c, c).join(".");
      },
      
      WQ: function(a, b, c, d, g) {
        utag.DB('WQ:' + utag.loader.wq.length);
        try {
          // this picks up a utag_data items added after utag.js was loaded
          // Gotcha: Data layer set after utag.js will not overwrite something already set via an extension.  Only "new" values are copied from utag_data
          // for case where utag_data is set after utag.js is loaded
          if(utag.udoname && utag.udoname.indexOf(".")<0){
            utag.ut.merge(utag.data,window[utag.udoname],0);
          }

          utag.handler.RE('view',utag.data,"bwq");
          // process load rules again if this flag is set
          if(utag.cfg.load_rules_at_wait){
            utag.handler.LR();
          }
        } catch (e) {utag.DB(e)};
	
	d=0;
        g=[]; 
        for (a = 0; a < utag.loader.wq.length; a++) {
          b = utag.loader.wq[a];
	  b.load = utag.loader.cfg[b.id].load;
          if (b.load == 4){
            //LOAD the bundled tag set to wait here
            this.f[b.id]=0;
            utag.loader.LOAD(b.id)
          }else if (b.load > 0) {
            g.push(b);
            //utag.loader.AS(b); // moved: defer loading until flags cleared
	    d++;
          }else{
            // clear flag for those set to wait that were not actually loaded
            this.f[b.id]=1;
          }
        }
        for (a = 0; a < g.length; a++) {
          utag.loader.AS(g[a]);
        }

	if(d==0){
	  utag.loader.END();
	}
      },
      AS: function(a, b, c, d) {
        utag.send[a.id] = a;
        if (typeof a.src == 'undefined') {
          a.src = utag.cfg.path + ((typeof a.name != 'undefined') ? a.name : 'utag.' + a.id + '.js')
        }
        a.src += (a.src.indexOf('?') > 0 ? '&' : '?') + 'utv=' + (a.v?a.v:utag.cfg.v);
        utag.rpt['l_' + a.id] = a.src;
        b = document;
        this.f[a.id]=0;
        if (a.load == 2) {
          b.write('<script id="utag_' + a.id + '" src="' + a.src + '"></scr' + 'ipt>')
          if(typeof a.cb!='undefined')a.cb();
        } else if(a.load==1 || a.load==3) {
          if (b.createElement) {
            c = 'utag_vmware.microsites-privacy_'+a.id;
            if (!b.getElementById(c)) {
	      d = {
	        src:a.src,
		id:c,
                uid:a.id,
		loc:a.loc
              }
              if(a.load == 3){d.type="iframe"};
	      if(typeof a.cb!='undefined')d.cb=a.cb;
              utag.ut.loader(d);
            }
          }
        }
      },
      GV: function(a, b, c) {
        b = {};
        for (c in a) {
          if (a.hasOwnProperty(c) && typeof a[c] != "function") b[c] = a[c];
        }
        return b
      },
      OU: function(a, b, c, d, f){
        try {
          if (typeof utag.data['cp.OPTOUTMULTI'] != 'undefined') {
            c = utag.loader.cfg;
            a = utag.ut.decode(utag.data['cp.OPTOUTMULTI']).split('|');
            for (d = 0; d < a.length; d++) {
              b = a[d].split(':');
              if (b[1] * 1 !== 0) {
                if (b[0].indexOf('c') == 0) {
                  for (f in utag.loader.GV(c)) {
                    if (c[f].tcat == b[0].substring(1)) c[f].load = 0
                  }
                } else if (b[0] * 1 == 0) {
                  utag.cfg.nocookie = true
                } else {
                  for (f in utag.loader.GV(c)) {
                    if (c[f].tid == b[0]) c[f].load = 0
                  }
                }
              }
            }
          }
        } catch (e) {utag.DB(e)}
      },
      RDdom: function(o){
        var d = document || {}, l = location || {};
        o["dom.referrer"] = eval("document." + "referrer");
        o["dom.title"] = "" + d.title;
        o["dom.domain"] = "" + l.hostname;
        o["dom.query_string"] = ("" + l.search).substring(1);
        o["dom.hash"] = ("" + l.hash).substring(1);
        o["dom.url"] = "" + d.URL;
        o["dom.pathname"] = "" + l.pathname;
        o["dom.viewport_height"] = window.innerHeight || (d.documentElement?d.documentElement.clientHeight:960);
        o["dom.viewport_width"] = window.innerWidth || (d.documentElement?d.documentElement.clientWidth:960);
      },
      RDcp: function(o, b, c, d){
        b = b || utag.loader.RC();
        for (d in b) {
          if (d.match(/utag_(.*)/)) {
            for (c in utag.loader.GV(b[d])) {
              o["cp.utag_" + RegExp.$1 + "_" + c] = b[d][c];
            }
          }
        }
        for (c in utag.loader.GV((utag.cl && !utag.cl['_all_']) ? utag.cl : b)) {
          if (c.indexOf("utag_") < 0 && typeof b[c] != "undefined") o["cp." + c] = b[c];
        }
      },
      RDqp: function(o, a, b, c){
        a = location.search + (location.hash+'').replace("#","&");
        if(utag.cfg.lowerqp){a=a.toLowerCase()};
        if (a.length > 1) {
          b = a.substring(1).split('&');
          for (a = 0; a < b.length; a++) {
            c = b[a].split("=");
            if(c.length>1){
              o["qp." + c[0]] = utag.ut.decode(c[1])
            }
          }
        }
      },
      RDmeta: function(o, a, b, h){
        a = document.getElementsByTagName("meta");
        for (b = 0; b < a.length; b++) {
          try{
            h = a[b].name || a[b].getAttribute("property") || ""; 
          }catch(e){h="";utag.DB(e)};
          if (utag.cfg.lowermeta){h=h.toLowerCase()};
          if (h != ""){o["meta." + h] = a[b].content}
        }
      },
      RDva: function(o, a, b){
        // Read visitor attributes in local storage
        a = ""; 
        try{
          a = localStorage.getItem("tealium_va");
          if(!a || a=="{}")return;
          b = utag.ut.flatten({va : JSON.parse(a)});
          utag.ut.merge(utag.data,b,1);
        }catch(e){
          utag.DB("localStorage not supported");
        }
        
        // add items in "b" to data layer
      },
      RD: function(o, a, b, c, d) {
        utag.DB("utag.loader.RD");
        // temporary fix for multiple calls to RD
        if(typeof o["_t_session_id"]!="undefined"){return};
        a = (new Date()).getTime();
        b = utag.loader.RC();
        c = a + parseInt(utag.cfg.session_timeout);
        d = a;
	
	if(!b.utag_main){
	  b.utag_main={};
	}else if(b.utag_main.ses_id&&typeof b.utag_main._st!="undefined"&&parseInt(b.utag_main._st)<a){
	  delete b.utag_main.ses_id;
	}
	
        if(!b.utag_main.v_id){
          b.utag_main.v_id=utag.ut.vi(a);
        }

        if(!b.utag_main.ses_id){
          b.utag_main.ses_id=d+'';
          b.utag_main._ss=b.utag_main._pn=1;
          b.utag_main._sn=1+parseInt(b.utag_main._sn || 0);
        }else{
          d=b.utag_main.ses_id;
          b.utag_main._ss=0;
          b.utag_main._pn=1+parseInt(b.utag_main._pn);
          b.utag_main._sn=parseInt(b.utag_main._sn);
        }

        if(isNaN(b.utag_main._sn) || b.utag_main._sn<1){b.utag_main._sn=b.utag_main._pn=1}

        b.utag_main._st = c+'';

        utag.loader.SC("utag_main", {"v_id": b.utag_main.v_id, "_sn" : b.utag_main._sn, "_ss" : b.utag_main._ss, "_pn" : b.utag_main._pn + ";exp-session", "_st": c, "ses_id": d + ";exp-session"});

        o["_t_visitor_id"]=b.utag_main.v_id;
        o["_t_session_id"]=d;
	
        this.RDqp(o);
        this.RDmeta(o);
        this.RDcp(o,b);
        this.RDdom(o);
        this.RDva(o);
      },
      RC: function(a, x, b, c, d, e, f, g, h, i, j, k, l, m, n, o, v, ck, cv, r, s, t) {
        o = {};
        b = ("" + document.cookie != "") ? (document.cookie).split("; ") : [];
        r = /^(.*?)=(.*)$/;
        s = /^(.*);exp-(.*)$/;
        t = (new Date()).getTime();
        for (c = 0; c < b.length; c++) {
          if (b[c].match(r)) {
            ck = RegExp.$1;
            cv = RegExp.$2;
          }
          e = utag.ut.decode(cv);
          if (typeof ck!="undefined"){
            if (ck.indexOf("ulog") == 0 || ck.indexOf("utag_") == 0) {
              e = e.split("$");
              g = [];
              j = {};
              for (f = 0; f < e.length; f++) {
                try{
                  g = e[f].split(":");
                  if (g.length > 2) {
                    g[1] = g.slice(1).join(":");
                  }
                  v = "";
                  if (("" + g[1]).indexOf("~") == 0) {
                    h = g[1].substring(1).split("|");
                    for (i = 0; i < h.length; i++) h[i] = utag.ut.decode(h[i]);
                    v = h
                  } else v = utag.ut.decode(g[1]);
                  j[g[0]] = v;
                }catch(er){utag.DB(er)};
              }
              o[ck] = {};
              for (f in utag.loader.GV(j)) {
                if (j[f] instanceof Array) {
                  n = [];
                  for (m = 0; m < j[f].length; m++) {
                    if (j[f][m].match(s)){
                      k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : t - 1) : parseInt(RegExp.$2);
                      if (k > t) n[m] = (x == 0) ? j[f][m] : RegExp.$1;
                    }
                  }
                  j[f] = n.join("|");
                } else {
                  j[f] = "" + j[f];
                  if (j[f].match(s)) {
                    k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : t - 1) : parseInt(RegExp.$2);
                    j[f] = (k < t) ? null : (x == 0 ? j[f] : RegExp.$1);
                  }
                }
                if (j[f]) o[ck][f] = j[f];
              }
            } else if (utag.cl[ck] || utag.cl['_all_']) {
              o[ck] = e
            }
          }
        }
        return (a) ? (o[a] ? o[a] : {}) : o;
      },
      SC: function(a, b, c, d, e, f, g, h, i, j, k, x, v) {
        if (!a) return 0;
        if (a=="utag_main" && utag.cfg.nocookie) return 0;
        v = "";
        var date = new Date();
        var exp = new Date();
        exp.setTime(date.getTime()+(365*24*60*60*1000));
        x = exp.toGMTString();
        if (c && c == "da") {
          x = "Thu, 31 Dec 2009 00:00:00 GMT";
        } else if (a.indexOf("utag_") != 0 && a.indexOf("ulog") != 0) {
          if (typeof b != "object") {
            v = b
          }
        } else {
          d = utag.loader.RC(a, 0);
          for (e in utag.loader.GV(b)) {
            f = "" + b[e];
            if (f.match(/^(.*);exp-(\d+)(\w)$/)) {
              g = date.getTime() + parseInt(RegExp.$2) * ((RegExp.$3 == "h") ? 3600000 : 86400000);
              if (RegExp.$3 == "u") g = parseInt(RegExp.$2);
              f = RegExp.$1 + ";exp-" + g;
            }
            if (c == "i") {
              if (d[e] == null) d[e] = f;
            } else if (c == "d") delete d[e];
            else if (c == "a") d[e] = (d[e] != null) ? (f - 0) + (d[e] - 0) : f;
            else if (c == "ap" || c == "au") {
              if (d[e] == null) d[e] = f;
              else {
                if (d[e].indexOf("|") > 0) {
                  d[e] = d[e].split("|")
                }
                g = (d[e] instanceof Array) ? d[e] : [d[e]];
                g.push(f);
                if (c == "au") {
                  h = {};
                  k = {};
                  for (i = 0; i < g.length; i++) {
                    if (g[i].match(/^(.*);exp-(.*)$/)) {
                      j = RegExp.$1;
                    }
                    if (typeof k[j] == "undefined") {
                      k[j] = 1;
                      h[g[i]] = 1;
                    }
                  }
                  g = [];
                  for (i in utag.loader.GV(h)) {
                    g.push(i);
                  }
                }
                d[e] = g
              }
            } else d[e] = f;
          }
          h = new Array();
          for (g in utag.loader.GV(d)) {
            if (d[g] instanceof Array) {
              for (c = 0; c < d[g].length; c++) {
                d[g][c] = encodeURIComponent(d[g][c])
              }
              h.push(g + ":~" + d[g].join("|"))
            } else h.push(g + ":" + encodeURIComponent(d[g]))
          };
          if (h.length == 0) {
            h.push("");
            x = ""
          }
          v = (h.join("$"));
        }
        document.cookie = a + "=" + v + ";path=/;domain=" + utag.cfg.domain + ";expires=" + x;
        return 1
      },
      LOAD: function(a, b, c, d) {
        //utag.DB('utag.loader.LOAD:' + a);
        if(!utag.loader.cfg){
           return
        }
	if(this.ol==0){
          if(utag.loader.cfg[a].block && utag.loader.cfg[a].cbf){
            this.f[a] = 1;
	    delete utag.loader.bq[a];
          }
	  for(b in utag.loader.GV(utag.loader.bq)){
            if(utag.loader.cfg[a].load==4 && utag.loader.cfg[a].wait==0){
              utag.loader.bk[a]=1;
              utag.DB("blocked: "+ a);
            }
	    utag.DB("blocking: " + b);
	    return;
	  }
	  utag.loader.INIT();
	  return;
	}
        utag.DB('utag.loader.LOAD:' + a);
	
        if (this.f[a] == 0) {
          this.f[a] = 1;
      	
	  if(utag.cfg.noview!=true){
	    if(utag.loader.cfg[a].send){
	      utag.DB("SENDING: "+a);
	      try{
		utag.sender[a].send('view',utag.handler.C(utag.data));
		utag.rpt['s_' + a] = 0;
	      } catch (e) {
                utag.DB(e);
		utag.rpt['s_' + a] = 1;
	      }
	    }
	  }
	  if(utag.loader.rf==0)return;
          for (b in utag.loader.GV(this.f)) {
            if (this.f[b] == 0 || this.f[b] == 2) return
          }
	  utag.loader.END();
        }
      },
      EV: function(a, b, c, d) {
        if (b == "ready") {
          if ( (document.attachEvent || utag.cfg.dom_complete) ? document.readyState === "complete" : document.readyState !== "loading" ) setTimeout(c, 1);
          else {
            utag.loader.ready_q.push(c);
            var RH;

            if(utag.loader.ready_q.length<=1){
              if (document.addEventListener) {
                RH = function() {
                  document.removeEventListener("DOMContentLoaded", RH, false);
                  utag.loader.run_ready_q()
                };
                if(!utag.cfg.dom_complete)document.addEventListener("DOMContentLoaded", RH, false);
                window.addEventListener("load", utag.loader.run_ready_q, false);
              } else if (document.attachEvent) {
                RH = function() {
                  if (document.readyState === "complete") {
                    document.detachEvent("onreadystatechange", RH);
                    utag.loader.run_ready_q()
                  }
                };
                document.attachEvent("onreadystatechange", RH);
                window.attachEvent("onload", utag.loader.run_ready_q);
              }
            }
          }
        } else {
          if (a.addEventListener) {
            a.addEventListener(b, c, false)
          } else if (a.attachEvent) {
            a.attachEvent(((d == 1) ? "" : "on") + b, c)
          }
        }
      },
      END: function(b, c, d, e, v, w){
        if(this.ended){return};
        this.ended=1;
	utag.DB("loader.END");
        b = utag.data;
        // add the default values for future utag.link/view calls
	if(utag.handler.base && utag.handler.base!='*'){
          e = utag.handler.base.split(",");
          for (d = 0; d < e.length; d++) {
            if (typeof b[e[d]] != "undefined") utag.handler.df[e[d]] = b[e[d]]
          }
        }else if (utag.handler.base=='*'){
           utag.ut.merge(utag.handler.df,b,1);
        }

        utag.rpt['r_0']="t";
	for(var r in utag.loader.GV(utag.cond)){
          utag.rpt['r_'+r]=(utag.cond[r])?"t":"f";
        }

        utag.rpt.ts['s'] = new Date();
	

        v = ".tiqcdn.com";
        w = utag.cfg.path.indexOf(v);
        if(w>0 && b["cp.utag_main__ss"]==1)utag.ut.loader({src:utag.cfg.path.substring(0,w)+v+"/utag/tiqapp/utag.v.js?a="+utag.cfg.utid+(utag.cfg.nocookie?"&nocookie=1":"&cb="+(new Date).getTime()),id:"tiqapp"})
        
        utag.handler.RE('view',b,"end");
	utag.handler.INIT();
      }
    },
    DB: function(a, b) {
      // return right away if we've already checked the cookie
      if(utag.cfg.utagdb===false){
        return;
      }else if(typeof utag.cfg.utagdb=="undefined"){
        utag.db_log=[];
        b = document.cookie+'';
        utag.cfg.utagdb=((b.indexOf('utagdb=true') >= 0)?true:false);
      }
      if(utag.cfg.utagdb===true){
        utag.db_log.push(a);
        try{console.log(a)}catch(e){}
      }
    },
    RP: function(a, b, c) {
      if (typeof a != 'undefined' && typeof a.src != 'undefined' && a.src != '') {
        b = [];
        for (c in utag.loader.GV(a)) {
          if (c != 'src') b.push(c + '=' + escape(a[c]))
        }
        this.dbi.push((new Image()).src = a.src + '?utv=' + utag.cfg.v + '&utid=' + utag.cfg.utid + '&' + (b.join('&')))
      }
    },
    view: function(a,c,d) {
      return this.track({event:'view', data:a, cfg:{cb:c,uids:d}})
    },
    link: function(a,c) {
      return this.track({event:'link', data:a, cfg:{cb:c}})
    },
    track: function(a,b,c,d) {
      if (typeof a == "string") a = { event: a, data: b, cfg: {cb: c} };

      for(d in utag.loader.GV(utag.o)){
        try{
          utag.o[d].handler.trigger(a.event || "view", a.data || a, a.cfg)
        }catch(e){utag.DB(e)};
      }
      if(a.cfg && a.cfg.cb)try{a.cfg.cb()}catch(e){utag.DB(e)};
      return true
    },
    handler: {
      base: "",
      df: {},
      o: {},
      send: {},
      iflag: 0,
      INIT: function(a, b, c) {
        utag.DB('utag.handler.INIT');
        if(utag.initcatch){
          utag.initcatch=0;
          return
        }
        this.iflag = 1;
        a = utag.loader.q.length;
        if (a > 0) {
          for (b = 0; b < a; b++) {
            c = utag.loader.q[b];
	    // utag.handler.RE(c.a, c.b);
            utag.handler.trigger(c.a, c.b)
          }
        }
        //##UTABSOLUTELAST##
      },
      test: function() {
        return 1
      },
      // reset and run load rules
      LR: function(){
        for(var d in utag.loader.GV(utag.cond)){
          utag.cond[d]=false;
        }
        utag.loader.loadrules();
        utag.loader.initcfg();
        // use the OPTOUTMULTI cookie value to override load rules
        utag.loader.OU();
      },
      // FUTURE: The third param "c" is a string that defines the location i.e. "blr" == before load rules
      RE:function(a,b,c,d,e,f,g){
        if(c && !this.cfg_extend){
          return 0; 
        }
        utag.DB('All Tags EXTENSIONS');
        if(typeof this.extend != "undefined"){
          g=0;
          for (d = 0; d < this.extend.length; d++) {
            try {
              /* FUTURE: Support for Extension Attributes */
              e=0;
              if(typeof this.cfg_extend!="undefined"){
                f=this.cfg_extend[d];
                if(typeof f.count == "undefined")f.count=0;
                if(f[a]==0 || (f.once==1 && f.count>0) || (typeof c!= "undefined" && f[c]==0)){
                  e=1
                }else{
                  if(typeof c!="undefined" && f[c]==1){g=1};
                  f.count++
                }
              }
              if(e!=1){
                this.extend[d](a, b);
                utag.rpt['ex_' + d] = 0
              }
            } catch (e) {
              utag.rpt['ex_' + d] = 1;
	      utag.ut.error({e:e.message,s:utag.cfg.path+'utag.js',l:d,t:'ge'});
            }
          }
          return g;
        }
      },
      trigger: function(a, b, c, d, e, f) {
        utag.DB('trigger:'+a);
        b = b || {};
        utag.DB(b);

        if (!this.iflag) {
          for (d in utag.loader.f) {
            if (!(utag.loader.f[d] === 1)) utag.DB('Tag '+d+' did not LOAD')
          }
          utag.loader.q.push({
            a: a,
            b: b
          });
          return;
        }
        utag.cfg.noview = false;

        utag.ut.merge(b,this.df,0);
        // make sure these values are current for AJAX pages
        utag.loader.RDqp(b);
        utag.loader.RDcp(b);
        utag.loader.RDdom(b);
        utag.loader.RDmeta(b);
        utag.loader.RDva(b);

        // set cfg.uids or cfg.tids to only run specific set of tags
        // utag.track( {event : ”view”, data: {myvar : “myval” }, cfg: {uids : [1,2,10] } } );
        
        if(c && c.uids){
          this.RE(a,b);
          for(f=0;f<c.uids.length;f++){
            d=c.uids[f];
            try {
                // bypass load rules
                if(typeof utag.sender[d]!="undefined"){
                  utag.sender[d].send(a, utag.handler.C(b));
                }else if (a=="view" && utag.loader.cfg[d].load!=2 && utag.loader.cfg[d].s2s!=1){
                  utag.ut.merge(utag.data,b,1);
                  utag.loader.AS({id : d, load : 1}); 
                }
            } catch (e) {utag.DB(e)}
          }
        }else if(utag.cfg.load_rules_ajax){
          // right now, load rules use utag.data (replace items in utag.data with items in b)
          this.RE(a,b,"blr");
          utag.ut.merge(utag.data,b,1);
          // clear and re-run load rules
          this.LR();
          this.RE(a,b);
          // TBD: Run through the "bwq" Extensions again here? (For now, require "bwq" is also set to "run once"?) 

          for(f = 0; f < utag.loader.cfgsort.length; f++){
            d = utag.loader.cfgsort[f];
            try {
              if(utag.loader.cfg[d].load && utag.loader.cfg[d].send){
                if(typeof utag.sender[d]!="undefined"){
                  utag.sender[d].send(a, utag.handler.C(b));
		  utag.rpt['s_' + d] = 0;
                }else if (a=="view" && utag.loader.cfg[d].load!=2 && utag.loader.cfg[d].s2s!=1){
                  // bring in a new tag if the load rule condition is now true
                  utag.loader.AS({id : d, load : 1}); 
                }
              }
            }catch (e) {utag.DB(e)}
          }
        }else{
          this.RE(a,b);
          for (d in utag.loader.GV(utag.sender)) {
            try {
                utag.sender[d].send(a, utag.handler.C(b));
		utag.rpt['s_' + d] = 0;
            } catch (e) {utag.DB(e)}
          }
        }

      },
      // "sort-of" copy
      C: function(a, b, c, d) {
        b = {};
        for (c in utag.loader.GV(a)) {
          if(a[c] instanceof Array){
            b[c] = a[c].slice(0)
          }else{
            // objects are still references to the original (not copies)
            b[c] = a[c]
          }
        }
        return b
      }
    },
    ut:{
      pad: function(a,b,c,d){
        a=""+((a-0).toString(16));d='';if(b>a.length){for(c=0;c<(b-a.length);c++){d+='0'}}return ""+d+a
      },
      vi: function(t,a,b){
        a=this.pad(t,12);b=""+Math.random();a+=this.pad(b.substring(2,b.length),16);try{a+=this.pad((navigator.plugins.length?navigator.plugins.length:0),2);a+=this.pad(navigator.userAgent.length,3);a+=this.pad(document.URL.length,4);a+=this.pad(navigator.appVersion.length,3);a+=this.pad(screen.width+screen.height+parseInt((screen.colorDepth)?screen.colorDepth:screen.pixelDepth),5)}catch(e){utag.DB(e);a+="12345"};return a
      },
      isEmptyObject: function(o, a) {
	for (a in o) {
          return false;
        }
        return true;
      },
      flatten: function(o){
        // stop when arriving at a string, array, boolean, number (float or integer)
        var a = {}; 
        function r(c, p) {
          if (Object(c) !== c || c instanceof Array) {
            a[p] = c;
          } else {
            if(utag.ut.isEmptyObject(c)){
              //a[p] = {};
            }else{
              for (var d in c) {
                r(c[d], p ? p+"."+d : d);
              }
            }
          }
        }
        r(o, "");

        return a;
      },
      merge: function(a, b, c, d) {
        if(c){
          for(d in utag.loader.GV(b)){
            a[d] = b[d]
          }
        }else{
          for(d in utag.loader.GV(b)){
            if(typeof a[d]=="undefined")a[d] = b[d]
          }
        }
      },
      decode: function(a, b) {
        b = "";
        try{b = decodeURIComponent(a)}catch(e){utag.DB(e)};
        if (b == ""){b = unescape(a)};
        return b
      },
      error: function(a, b, c){
        if(typeof utag_err!="undefined"){
          utag_err.push(a)
        }
        c="";for(b in a){c+=b+":"+a[b]+" , "};
        utag.DB(c)
      },
      loader: function(o, a, b, c, l) {
        a=document;
        if (o.type=="iframe") {
          b = a.createElement("iframe");
          o.attrs = o.attrs || { "height" : "1", "width" : "1", "style" : "display:none" };
          for( l in utag.loader.GV(o.attrs) ){
            b.setAttribute( l, o.attrs[l] )
          }
          b.setAttribute("src", o.src);
        }else if (o.type=="img"){
          utag.DB("Attach img: "+o.src);
          b=new Image();b.src=o.src;
          return;
        }else{
          b = a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";
          for( l in utag.loader.GV(o.attrs) ){
            b[l] = o.attrs[l]
          }
          b.src = o.src;
        }
        if(o.id){b.id=o.id};
        if (typeof o.cb=="function") {
          if(b.addEventListener) {
            b.addEventListener("load",function(){o.cb()},false);
          }else {
            // old IE support
            b.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){this.onreadystatechange=null;o.cb()}};
          }
        }
        l = o.loc || "head";
        c = a.getElementsByTagName(l)[0];
        if (c) {
          utag.DB("Attach to "+l+": "+o.src);
          if (l == "script") {
            c.parentNode.insertBefore(b, c);
          } else {
            c.appendChild(b)
          }
        }
      }
    }
  };
  utag.o['vmware.microsites-privacy']=utag;
  utag.cfg = {
    v: "ut4.34.202108120650",
    // Enable load rules ajax feature by default
    load_rules_ajax: true,
    load_rules_at_wait: false,
    lowerqp: false,
    //noview: ##UTNOVIEW##,
    session_timeout: 1800000,
    readywait: 0,
    noload: 0,
    domain: utag.loader.lh(),
    path: "//tags.tiqcdn.com/utag/vmware/microsites-privacy/prod/",
    utid: "vmware/microsites-privacy/202108120650"
  };utag.cond={100:0,101:0,102:0,103:0,104:0,106:0,107:0,11:0,13:0,17:0,18:0,19:0,20:0,25:0,27:0,28:0,30:0,32:0,35:0,39:0,40:0,41:0,42:0,45:0,46:0,49:0,50:0,51:0,52:0,54:0,59:0,5:0,65:0,66:0,67:0,68:0,69:0,71:0,72:0,74:0,75:0,76:0,78:0,79:0,7:0,81:0,82:0,83:0,84:0,85:0,86:0,87:0,88:0,89:0,8:0,90:0,91:0,92:0,93:0,94:0,95:0,96:0,98:0,99:0,9:0};
utag.pagevars=function(ud){ud = ud || utag.data;try{ud['js_page._teal_user_agent']=_teal_user_agent}catch(e){utag.DB(e)};try{ud['js_page._teal_load_demandbase']=_teal_load_demandbase}catch(e){utag.DB(e)};};
utag.loader.chkCanRunTime = function(s,e,d,t,o,i) {   try {       o = {           is : [s,e],           dt : [],           tm : [],           hd : 0,           ms : 0       };       for (i=0;i<2;i++){           d = o.is[i].substring(0,8);           t = o.is[i].substring(8);           o.dt[i] = new Date();           if (d !== '--------'){               o.dt[i].setFullYear(d.substring(0,4));               o.dt[i].setMonth(parseInt(d.substring(4,6))-1);               o.dt[i].setDate(d.substring(6,8));           }           if (t !== '----'){               o.dt[i].setHours(t.substring(0,2));               o.dt[i].setMinutes(t.substring(2,4));           } else {               o.dt[i].setHours(o.hd);               o.dt[i].setMinutes(o.ms);           }           o.dt[i].setSeconds(o.ms);           o.tm[i] = o.dt[i].getTime();           o.hd = 23;           o.ms = 59;       }       o.n = new Date().getTime();       return (o.n >= o.tm[0] && o.n <= o.tm[1]);   } catch (e) {       return false;   }};utag.loader.initdata = function() {   try {       utag.data = (typeof utag_data != 'undefined') ? utag_data : {};       utag.udoname='utag_data';    } catch (e) {       utag.data = {};       utag.DB('idf:'+e);   }};utag.loader.loadrules = function(_pd,_pc) {var d = _pd || utag.data; var c = _pc || utag.cond;for (var l in utag.loader.GV(c)) {switch(l){
case '100':try{c[100]|=  (utag.loader.chkCanRunTime("------------","20221231----")) && ((d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/Request-Demo-Thank-You'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/info-request-thank-you'.toLowerCase())>-1))}catch(e){utag.DB(e)}; break;
case '101':try{c[101]|=  (utag.loader.chkCanRunTime("------------","20221231----")) && ((d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/Request-Demo-Thank-You'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/info-request-thank-you'.toLowerCase())>-1))}catch(e){utag.DB(e)}; break;
case '102':try{c[102]|=  (utag.loader.chkCanRunTime("------------","20221231----")) && ((d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com'.toLowerCase())>-1&&d['dom.url'].toString().toLowerCase().indexOf('-thank-you'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com'.toLowerCase())>-1&&d['dom.url'].toString().toLowerCase().indexOf('-ty'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com'.toLowerCase())>-1&&d['dom.url'].toString().toLowerCase().indexOf('ty-'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/application-performance-with-dynamic-multipath-optimization'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/cpi-telecom-sd-wan-for-dummies-TEST'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/creating-the-retail-store-of-the-future-with-sdwan'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/eBook-6-Ways-SD-WAN-Redefines-Branch-Office-Networking'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/ebook-the-evolution-of-sd-wan-as-a-platform'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/ebook-the-evolution-of-wan-architecture'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/ebook-transforming-the-network-edge-with-sdwan'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/frost-and-sullivan-vendor-market-2019'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/go-mainsteam-with-sdwan-migration-best-practices'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/sd-wan-retail-future'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/sdwan-migration-strategies-for-varying-network-architectures'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/whitepaper-dynamic-multipath-optimization'.toLowerCase())>-1))}catch(e){utag.DB(e)}; break;
case '103':try{c[103]|=  (utag.loader.chkCanRunTime("------------","20221231----")) && ((d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/Request-Demo-Thank-You'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/info-request-thank-you'.toLowerCase())<0))}catch(e){utag.DB(e)}; break;
case '104':try{c[104]|=  (utag.loader.chkCanRunTime("------------","20221231----")) && ((d['dom.url'].toString().toLowerCase().indexOf('https://sase.vmware.com/products/edge-network-intelligence/edge-network-intelligence-demo'.toLowerCase())>-1))}catch(e){utag.DB(e)}; break;
case '106':try{c[106]|=  (utag.loader.chkCanRunTime("------------","20211006----")) && ((d['dom.url'].toString().toLowerCase().indexOf('https://event.vmware.com/flow/vmware/vmworld2021/reg/confirm'.toLowerCase())>-1))}catch(e){utag.DB(e)}; break;
case '107':try{c[107]|=  (utag.loader.chkCanRunTime("------------","20211029----")) && ((d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/euc/2020/02/android-work-profile.html?'.toLowerCase())>-1))}catch(e){utag.DB(e)}; break;
case '11':try{c[11]|=(d['dom.url'].toString().toLowerCase().indexOf('communities.vmware.com'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '13':try{c[13]|=(d['dom.url'].toString().toLowerCase().indexOf('//cloud.vmware.com/community/'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '17':try{c[17]|=(d['dom.url'].toString().toLowerCase()=='https://sdwan.vmware.com/gartner-magic-quadrant-wan-edge-infrastructure-sdwan'.toLowerCase())||(d['dom.url'].toString().toLowerCase()=='https://sdwan-stg.vmware.com/gartner-magic-quadrant-wan-edge-infrastructure-sdwan'.toLowerCase())}catch(e){utag.DB(e)}; break;
case '18':try{c[18]|=(/sdwan\.vmware\.com\/sd-wan-resources\/white-papers\/gartner-magic-quadrant-wan-edge-infrastructure-sdwan$/i.test(d['dom.url']))||(/sdwan-stg\.vmware\.com\/sd-wan-resources\/white-papers\/gartner-magic-quadrant-wan-edge-infrastructure-sdwan$/i.test(d['dom.url']))}catch(e){utag.DB(e)}; break;
case '19':try{c[19]|=(d['dom.url'].toString().toLowerCase().indexOf('vmware.com/20questions/ohanian'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('vmware.com/20questions/adler'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('vmware.com/20questions/sobomehin'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '20':try{c[20]|=(/https:\/\/featurewalkthrough\.vmware\.com\/a\/vcn-assessment-tool$/i.test(d['dom.url']))}catch(e){utag.DB(e)}; break;
case '25':try{c[25]|=(d['dom.url'].toString().toLowerCase().indexOf('wan.velocloud.com/info-request-thank-you.html'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '27':try{c[27]|=(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/telco/'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '28':try{c[28]|=(d['dom.url'].toString().toLowerCase().indexOf('https://evolve.vmware.com/'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '30':try{c[30]|=(d['dom.url'].toString().toLowerCase().indexOf('wan.velocloud.com/request-trial-thank-you.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sdwan1.vmware.com/request-trial-thank-you.html?'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('wan.velocloud.com/info-request-thank-you.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sdwan1.vmware.com/info-request-thank-you.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase1.vmware.com/info-request-thank-you.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase1.vmware.com/request-trial-thank-you.html'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '32':try{c[32]|=(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/emea/en/2019/06/want-to-simplify-your-path-to-the-hybrid-cloud/'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '35':try{c[35]|=(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/cloudnative/2018/12/12/vmworld-pks-customer-highlights/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://www.vmware.com/radius/a-new-vision-for-5g-networks/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/emea/en/2019/06/three-reasons-why-enterprises-need-to-get-onboard-with-5g/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/services-education-insights/2018/05/about-machine-learning-and-multi-cloud.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/cloudnative/2019/12/30/vmware-pivotal-combining-the-skills-people-and-leadership-to-deliver-modern-apps-to-the-enterprise/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://k8s.vmware.com/kubernetes-for-executives/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://k8s.vmware.com/kubernetes-for-developers/'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '39':try{c[39]|=(d['dom.url'].toString().toLowerCase().indexOf('https://pathfinder.vmware.com/digital-workspace-journey-tracker'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '40':try{c[40]|=(d['dom.url'].toString().toLowerCase().indexOf('https://www.vmware.com/radius/digital-employee-experience-infographic/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://www.vmware.com/radius/employee-experience-digital-transformation-priority/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://www.vmware.com/radius/fostering-employee-empowerment/'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '41':try{c[41]|=(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/cloudnative/2018/12/12/vmworld-pks-customer-highlights/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://www.vmware.com/radius/a-new-vision-for-5g-networks/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/emea/en/2019/06/three-reasons-why-enterprises-need-to-get-onboard-with-5g/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://www.vmware.com/radius/cloud-native-application-development-dominos/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://k8s.vmware.com/kubernetes-for-executives/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://k8s.vmware.com/kubernetes-for-developers/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://octo.vmware.com/defining-modern-application/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/services-education-insights/2018/05/about-machine-learning-and-multi-cloud.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/cloudnative/2019/12/30/vmware-pivotal-combining-the-skills-people-and-leadership-to-deliver-modern-apps-to-the-enterprise/'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '42':try{c[42]|=(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/cloudnative/2018/12/12/vmworld-pks-customer-highlights/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://www.vmware.com/radius/a-new-vision-for-5g-networks/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/emea/en/2019/06/three-reasons-why-enterprises-need-to-get-onboard-with-5g/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://www.vmware.com/radius/cloud-native-application-development-dominos/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://k8s.vmware.com/kubernetes-for-executives/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://k8s.vmware.com/kubernetes-for-developers/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://octo.vmware.com/defining-modern-application/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/services-education-insights/2018/05/about-machine-learning-and-multi-cloud.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/cloudnative/2019/12/30/vmware-pivotal-combining-the-skills-people-and-leadership-to-deliver-modern-apps-to-the-enterprise/'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '45':try{c[45]|=(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/cloudnative/2018/12/12/vmworld-pks-customer-highlights/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://www.vmware.com/radius/impact/leading-culinary-revolution/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://www.vmware.com/radius/a-new-vision-for-5g-networks/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/emea/en/2019/06/three-reasons-why-enterprises-need-to-get-onboard-with-5g/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://www.vmware.com/radius/cloud-native-application-development-dominos/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://k8s.vmware.com/kubernetes-for-executives/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://k8s.vmware.com/kubernetes-for-developers/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://octo.vmware.com/defining-modern-application/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/services-education-insights/2018/05/about-machine-learning-and-multi-cloud.html/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/cloudnative/2019/12/30/vmware-pivotal-combining-the-skills-people-and-leadership-to-deliver-modern-apps-to-the-enterprise/'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '46':try{c[46]|=(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/cloudnative/2018/12/12/vmworld-pks-customer-highlights/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://www.vmware.com/radius/impact/leading-culinary-revolution/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://www.vmware.com/radius/a-new-vision-for-5g-networks/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/emea/en/2019/06/three-reasons-why-enterprises-need-to-get-onboard-with-5g/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://www.vmware.com/radius/cloud-native-application-development-dominos/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://k8s.vmware.com/kubernetes-for-executives/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://k8s.vmware.com/kubernetes-for-developers/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://octo.vmware.com/defining-modern-application/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/services-education-insights/2018/05/about-machine-learning-and-multi-cloud.html/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/cloudnative/2019/12/30/vmware-pivotal-combining-the-skills-people-and-leadership-to-deliver-modern-apps-to-the-enterprise/'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '49':try{c[49]|=(d['dom.url'].toString().toLowerCase().indexOf('/radius/'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '5':try{c[5]|=(d['content_system']=='microsites :now')}catch(e){utag.DB(e)}; break;
case '50':try{c[50]|=(d['dom.url'].toString().toLowerCase().indexOf('https://vforum.vmware.com/tw/thank-you.html'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '51':try{c[51]|=(d['dom.url'].toString().toLowerCase().indexOf('https://vforum.vmware.com/tw/register.html'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '52':try{c[52]|=(d['dom.url'].toString().toLowerCase().indexOf('https://vforum.vmware.com/tw'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '54':try{c[54]|=(d['dom.url'].toString().toLowerCase().indexOf('wan.velocloud.com/request-trial-thank-you.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sdwan1.vmware.com/request-trial-thank-you.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('wan.velocloud.com/info-request-thank-you.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sdwan1.vmware.com/info-request-thank-you.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase1.vmware.com/info-request-thank-you.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase1.vmware.com/request-trial-thank-you.html'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '59':try{c[59]|=(d['dom.url'].toString().toLowerCase().indexOf('https://evolve.vmware.com/thank-you.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('http://evolve.vmware.com/thank-you.html'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '65':try{c[65]|=(d['dom.url'].toString().toLowerCase().indexOf('-uat.vmware.com'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('-stg.vmware.com'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('-stage.vmware.com'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('-lt.vmware.com'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('-test11.vmware.com'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('-test13.vmware.com'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('-dev11.vmware.com'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('-dev13.vmware.com'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('benefits.vmware.com'.toLowerCase())<0)||(d['dom.url'].toString().toLowerCase().indexOf('evolve.vmware.com'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('cioforum.vmware.com'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('vforum.vmware.com'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('launch.vmware.com'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '66':try{c[66]|=(d['dom.url'].toString().toLowerCase().indexOf('-uat.vmware.com'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('-stg.vmware.com'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('-stage.vmware.com'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('-lt.vmware.com'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('-test11.vmware.com'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('-test13.vmware.com'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('-dev11.vmware.com'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('-dev13.vmware.com'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '67':try{c[67]|=(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/emea/de/2019/12/deutsche-telekom'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '68':try{c[68]|=(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/careers'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '69':try{c[69]|=(d['dom.url'].toString().toLowerCase().indexOf('https://vforum.vmware.com/sg/thank-you.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://vforum.vmware.com/au/thank-you.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://vforum.vmware.com/in/thank-you.html'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '7':try{c[7]|=(/digitalenterprise\/jp$/i.test(d['load_rule_pathname']))||(/digitalenterprise\/jp\/thank-you$/i.test(d['load_rule_pathname']))||(/digitalenterprise\/jp\/digitalworkspace$/i.test(d['load_rule_pathname']))||(/digitalenterprise\/jp\/hybridcloudHCI$/i.test(d['load_rule_pathname']))}catch(e){utag.DB(e)}; break;
case '71':try{c[71]|=(d['dom.url'].toString().toLowerCase().indexOf('https://tanzu.vmware.com/'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('k8s.vmware.com/vmworld-us/'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('hello-tanzu.vmware.com'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('https://kube.academy'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('k8s.vmware.com'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('connect.tanzu.vmware.com'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('https://benefits.vmware.com'.toLowerCase())<0)}catch(e){utag.DB(e)}; break;
case '72':try{c[72]|=(d['cp.OptanonConsent'].toString().indexOf('C0002:1')>-1)}catch(e){utag.DB(e)}; break;
case '74':try{c[74]|=(d['cp.OptanonConsent'].toString().indexOf('C0004:1')>-1)}catch(e){utag.DB(e)}; break;
case '75':try{c[75]|=(d['cp.OptanonConsent'].toString().indexOf('C0005:1')>-1)}catch(e){utag.DB(e)}; break;
case '76':try{c[76]|=(d['dom.url'].toString().toLowerCase().indexOf('https://vmworld.jp/register/complete/'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '78':try{c[78]|=(d['dom.url'].toString().toLowerCase().indexOf('https://tanzu.vmware.com/mission-control'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://tanzu.vmware.com/application-service'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://tanzu.vmware.com/build-service'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://tanzu.vmware.com/observability'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://tanzu.vmware.com/kubernetes-grid'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://tanzu.vmware.com/service-mesh'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://tanzu.vmware.com/application-catalog'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://tanzu.vmware.com/labs'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://cloudsolutions.vmware.com/'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '79':try{c[79]|=(d['dom.url'].toString().toLowerCase().indexOf('https://benefits.vmware.com'.toLowerCase())<0)}catch(e){utag.DB(e)}; break;
case '8':try{c[8]|=(d['dom.url'].toString().toLowerCase().indexOf('vmware.com/aaaradius/possible/cloud/'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('vmware.com/ciovantage'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '81':try{c[81]|=(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/cio/2020/06/office-of-the-cio-6-best-practices-for-successfully-managing-a-crises.html'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '82':try{c[82]|=(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/cio/2020/01/increasing-business-agility-through-digital-transformation-it-annual-performance-report.html'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '83':try{c[83]|=(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/cio/2021/02/the-cybersecurity-industry-is-broken-tom-corn-senior-vice-president-security-products-vmware.html'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '84':try{c[84]|=(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/cio/2020/04/office-of-the-cio-what-weve-learned-as-a-digital-responder-during-covid-19.html'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '85':try{c[85]|=(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/cio/'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '86':try{c[86]|=(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/cio/cio-exchange-resources'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '87':try{c[87]|=(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/cio/2021/02/technology-as-a-powerful-force-for-good-nestor-rodriguez.html'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '88':try{c[88]|=(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/cio/2021/01/cios-reveal-top-trends-shaping-it-resilience.html'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '89':try{c[89]|=(d['dom.url'].toString().toLowerCase().indexOf('https://event.vmware.com/flow/vmware/workspace/reg/page/confirmation'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '9':try{c[9]|=(d['dom.url'].toString().toLowerCase().indexOf('www.vmware.com/ciovantage/article/introducing-vmware-cloud'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('www.air-watch.com/solutions/windows-10-management/'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '90':try{c[90]|=(d['dom.url'].toString().toLowerCase().indexOf('https://sdwan.vmware.com/secure-access-service-edge'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '91':try{c[91]|=(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/euc/2020/03/byod-business-continuity.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/euc/2018/11/forrester-tei-workspace-one.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/euc/2021/01/vmware-leader-idc-marketscape-for-uem.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/euc/2021/01/vmware-gartner-peer-insights-customers-choice-for-uem.html'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '92':try{c[92]|=(d['dom.url'].toString().toLowerCase().indexOf('https://event.vmware.com/flow/vmware/securityconnect/reg/page/confirmation'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '93':try{c[93]|=(d['dom.url'].toString().toLowerCase().indexOf('sase1.vmware.com'.toLowerCase())>-1&&d['dom.url'].toString().toLowerCase().indexOf('ty-'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('wan.velocloud.com'.toLowerCase())>-1&&d['dom.url'].toString().toLowerCase().indexOf('ty-'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sdwan1.vmware.com'.toLowerCase())>-1&&d['dom.url'].toString().toLowerCase().indexOf('ty-'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sdwan1.vmware.com'.toLowerCase())>-1&&d['dom.url'].toString().toLowerCase().indexOf('-thank-you.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase1.vmware.com'.toLowerCase())>-1&&d['dom.url'].toString().toLowerCase().indexOf('-thank-you.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('wan.velocloud.com/go-mainsteam-with-sdwan-migration-best-practices.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('wan.velocloud.com/Whitepaper-Market-Outlook-SD-WAN-2019-2024.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('wan.velocloud.com/sdwan-migration-strategies-for-varying-network-architectures.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('wan.velocloud.com/sdwan-for-telcos-service-providers-topology-and-routing.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('wan.velocloud.com/vmware-sdwan-by-velocloud-components-placement-interaction.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('wan.velocloud.com/sdwan-overlays-topologies-and-deployment-models.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('wan.velocloud.com/sdwan-use-cases-top-use-cases-in-deployment-today.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('wan.velocloud.com/sdwan-optimized-cloud-access.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('wan.velocloud.com/sdwan-zero-touch-provisioning.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('wan.velocloud.com/application-performance-with-dynamic-multipath-optimization.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('wan.velocloud.com/frost-and-sullivan-vendor-market-2019.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('wan.velocloud.com/market-outlook-software-defined-wan-2020-2025.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase1.vmware.com/go-mainsteam-with-sdwan-migration-best-practices.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase1.vmware.com/Whitepaper-Market-Outlook-SD-WAN-2019-2024.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase1.vmware.com/sdwan-migration-strategies-for-varying-network-architectures.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase1.vmware.com/sdwan-for-telcos-service-providers-topology-and-routing.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase1.vmware.com/vmware-sdwan-by-velocloud-components-placement-interaction.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase1.vmware.com/sdwan-overlays-topologies-and-deployment-models.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase1.vmware.com/sdwan-use-cases-top-use-cases-in-deployment-today.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase1.vmware.com/sdwan-optimized-cloud-access.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase1.vmware.com/sdwan-zero-touch-provisioning.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase1.vmware.com/application-performance-with-dynamic-multipath-optimization.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase1.vmware.com/frost-and-sullivan-vendor-market-2019.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase1.vmware.com/market-outlook-software-defined-wan-2020-2025.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sdwan1.vmware.com/go-mainsteam-with-sdwan-migration-best-practices.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sdwan1.vmware.com/Whitepaper-Market-Outlook-SD-WAN-2019-2024.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sdwan1.vmware.com/sdwan-migration-strategies-for-varying-network-architectures.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sdwan1.vmware.com/sdwan-for-telcos-service-providers-topology-and-routing.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sdwan1.vmware.com/vmware-sdwan-by-velocloud-components-placement-interaction.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sdwan1.vmware.com/sdwan-overlays-topologies-and-deployment-models.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sdwan1.vmware.com/sdwan-use-cases-top-use-cases-in-deployment-today.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sdwan1.vmware.com/sdwan-optimized-cloud-access.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sdwan1.vmware.com/sdwan-zero-touch-provisioning.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sdwan1.vmware.com/application-performance-with-dynamic-multipath-optimization.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sdwan1.vmware.com/frost-and-sullivan-vendor-market-2019.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sdwan1.vmware.com/market-outlook-software-defined-wan-2020-2025.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sdwan1.vmware.com/vmware-sdwan-by-velocloud-components-placement-interaction.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase1.vmware.com/sdwan-routing-considerations-during-migration.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sdwan1.vmware.com/vmware-sdwan-by-velocloud-components-placement-interaction.html'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase1.vmware.com/sdwan-routing-considerations-during-migration.html'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '94':try{c[94]|=(d['dom.url'].toString().toLowerCase().indexOf('wan.velocloud.com/request-trial-thank-you.html'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('sdwan1.vmware.com/request-trial-thank-you.html'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('wan.velocloud.com/info-request-thank-you.html'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('sdwan1.vmware.com/info-request-thank-you.html'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('sase1.vmware.com/info-request-thank-you.html'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('sase1.vmware.com/request-trial-thank-you.html'.toLowerCase())<0)}catch(e){utag.DB(e)}; break;
case '95':try{c[95]|=  (utag.loader.chkCanRunTime("------------","20220130----")) && ((d['dom.url'].toString().toLowerCase()=='https://event.vmware.com/flow/vmware/vmworld2021/reg/confirm'.toLowerCase()))}catch(e){utag.DB(e)}; break;
case '96':try{c[96]|=  (utag.loader.chkCanRunTime("------------","20220130----")) && ((d['dom.url'].toString().toLowerCase()=='https://event.vmware.com/flow/vmware/vmworld2021/reg/confirm'.toLowerCase()))}catch(e){utag.DB(e)}; break;
case '98':try{c[98]|=  (utag.loader.chkCanRunTime("------------","20220130----")) && ((d['dom.url'].toString().toLowerCase()=='https://event.vmware.com/flow/vmware/vmworld2021/reg/confirm'.toLowerCase()))}catch(e){utag.DB(e)}; break;
case '99':try{c[99]|=  (utag.loader.chkCanRunTime("------------","20221231----")) && ((d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com'.toLowerCase())>-1&&d['dom.url'].toString().toLowerCase().indexOf('-thank-you'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com'.toLowerCase())>-1&&d['dom.url'].toString().toLowerCase().indexOf('-ty'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com'.toLowerCase())>-1&&d['dom.url'].toString().toLowerCase().indexOf('ty-'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/application-performance-with-dynamic-multipath-optimization'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/cpi-telecom-sd-wan-for-dummies-TEST'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/creating-the-retail-store-of-the-future-with-sdwan'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/eBook-6-Ways-SD-WAN-Redefines-Branch-Office-Networking'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/ebook-the-evolution-of-sd-wan-as-a-platform'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/ebook-the-evolution-of-wan-architecture'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/ebook-transforming-the-network-edge-with-sdwan'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/frost-and-sullivan-vendor-market-2019'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/go-mainsteam-with-sdwan-migration-best-practices'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/sd-wan-retail-future'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/sdwan-migration-strategies-for-varying-network-architectures'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('sase.vmware.com/resources/whitepaper-dynamic-multipath-optimization'.toLowerCase())>-1))}catch(e){utag.DB(e)}; break;}}};utag.pre=function() {    utag.loader.initdata();utag.pagevars();    try{utag.loader.RD(utag.data)}catch(e){utag.DB(e)};    utag.loader.loadrules();    };utag.loader.GET=function(){utag.cl={'_all_':1};utag.pre();
  utag.handler.extend=[function(a,b){
//All Tags to parse Demandbase data
function getOptanonCookies(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
 }

 var getOneTrustCookie= decodeURIComponent(getOptanonCookies('OptanonConsent'));
 
if(getOneTrustCookie.indexOf('C0002:1') > -1 ){
if (typeof dbInfo != 'undefined' || typeof sessionStorage.dbInfo != "undefined") {
  if(typeof dbInfo!='undefined'){
    sessionStorage.dbInfo = JSON.stringify(dbInfo);
  }else{
    dbInfo = JSON.parse(sessionStorage.dbInfo);
  }
  for (key in dbInfo) {
    utag_data[key] = dbInfo[key];
    b[key] = dbInfo[key];
  }
}
}
},
function(a,b){ try{ if((b['dom.url'].toString().toLowerCase().indexOf('blogs.vmware.com'.toLowerCase())>-1&&b['cp.OptanonConsent'].toString().indexOf('C0004:1')>-1)){
// Type your JS code here.

!function(a,b,c,d,e,f,g){a.ktag||(e=function(){e.sendEvent?e.sendEvent(arguments):e.ktq.push(arguments)},e.ktq=[],a.ktag=e,f=b.getElementsByTagName(d)[0],g=b.createElement(d),g.async=!0,g.src=c,f.parentNode.appendChild(g))}(window,document,"https://resources.xg4ken.com/js/v2/ktag.js?tid=KT-N36E8-3EB","script");

ktag('setup', 'KT-N36E8-3EB');
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(b['cp.OptanonConsent'].toString().indexOf('C0004:1')>-1){
// Type your JavaScript code here...
if(window.location.href.match(/blogs\.vmware\.com\/telco/)){ 
	
	var ftRand = Math.random() + "";
    var num = ftRand * 1000000000000000000;
    jQuery('body').append('<img src="https://ad.doubleclick.net/ddm/activity/src=8513285;type=hve0;cat=ushve007;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord='+num+'" width="1" height="1" alt=""/>'); 
	}
	if(window.location.href.match(/blogs\.vmware\.com\/telco/)){ 
	
	var ftRand = Math.random() + "";
    var num = ftRand * 1000000000000000000;
    jQuery('body').append('<img src="https://ad.doubleclick.net/ddm/activity/src=8513285;type=hve0;cat=ukhve00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord='+num+'" width="1" height="1" alt=""/>'); 
	}
	
	if(window.location.href.match(/blogs\.vmware\.com\/telco/)){ 
	
	var ftRand = Math.random() + "";
    var num = ftRand * 1000000000000000000;
    jQuery('body').append('<img src="https://ad.doubleclick.net/ddm/activity/src=8668669;type=ukhve0;cat=ukhve004;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord='+num+'" width="1" height="1" alt=""/>'); 
	}
	
	
 //DMR-10024 START
if(window.location.href.match(/vmware\.com\/radius\/impact\/chitale-dairy-transforming-rural-india\//) ){
	
	
	var ftRand = Math.random() + "";
    var num = ftRand * 1000000000000000000;
    $('body').append('<img border="0" width="1" height="1" src="https://ad.doubleclick.net/ddm/activity/src=9327419;type=hvefm0;cat=inhve00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord='+num+'"">');
	


}

//END
} } catch(e){ utag.DB(e) }  }];
  utag.handler.cfg_extend=[{"end":0,"alr":1,"blr":0,"id":"5","bwq":0},{"alr":1,"blr":0,"end":0,"id":"15","bwq":0},{"bwq":0,"end":0,"alr":1,"blr":0,"id":"19"}];
  utag.loader.initcfg = function(){
    utag.loader.cfg={"12":{load:(utag.cond[5] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:7115},"15":{load:utag.cond[72],send:1,v:202108030628,wait:1,tid:19063},"21":{load:(utag.cond[79] && utag.cond[74]),send:1,v:202102050313,wait:1,tid:6026},"22":{load:(utag.cond[79] && utag.cond[74]),send:1,v:202102050313,wait:1,tid:20078},"23":{load:(utag.cond[79] && utag.cond[75]),send:1,v:202102050313,wait:1,tid:2013},"25":{load:(utag.cond[7] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:6026},"26":{load:(utag.cond[71] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:1066},"31":{load:(utag.cond[8] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:20067},"32":{load:(utag.cond[9] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:6031},"33":{load:(utag.cond[79] && utag.cond[72]),send:1,v:202102050313,wait:1,tid:20010},"41":{load:(utag.cond[11] && utag.cond[72]),send:1,v:202008070212,wait:1,tid:6038},"46":{load:(utag.cond[13] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:6026},"49":{load:(utag.cond[13] && utag.cond[72]),send:1,v:202008070212,wait:1,tid:7110},"59":{load:(utag.cond[17] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:4001},"60":{load:(utag.cond[18] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:4001},"61":{load:(utag.cond[19] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:20010},"63":{load:(utag.cond[20] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:20067},"69":{load:utag.cond[74],send:1,v:202106091737,wait:1,tid:2063},"75":{load:(utag.cond[27] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:20067},"76":{load:(utag.cond[28] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:20067},"77":{load:(utag.cond[25] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:6026},"82":{load:(utag.cond[74] && utag.cond[93] && utag.cond[94]),send:1,v:202107090717,wait:1,tid:7132},"83":{load:(utag.cond[30] && utag.cond[74]),send:1,v:202107060846,wait:1,tid:7132},"86":{load:(utag.cond[32] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:20067},"92":{load:(utag.cond[35] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:20067},"93":{load:(utag.cond[39] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:20067},"94":{load:(utag.cond[40] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:20067},"96":{load:(utag.cond[41] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:20067},"97":{load:(utag.cond[42] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:20067},"100":{load:(utag.cond[45] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:20067},"101":{load:(utag.cond[46] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:20067},"104":{load:(utag.cond[74] && utag.cond[49]),send:1,v:202008070212,wait:1,tid:20010},"105":{load:(utag.cond[50] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:6026},"106":{load:(utag.cond[51] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:6026},"107":{load:(utag.cond[52] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:6026},"110":{load:(utag.cond[54] && utag.cond[74]),send:1,v:202107060846,wait:1,tid:4001},"111":{load:(utag.cond[74] && utag.cond[93] && utag.cond[94]),send:1,v:202107090717,wait:1,tid:4001},"112":{load:(utag.cond[79] && utag.cond[74]),send:1,v:202102050313,wait:1,tid:20010},"115":{load:(utag.cond[59] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:4001},"116":{load:(utag.cond[59] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:7132},"123":{load:(utag.cond[65] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:13060},"124":{load:(utag.cond[79] && utag.cond[66] && utag.cond[74]),send:1,v:202102050313,wait:1,tid:13060},"125":{load:(utag.cond[67] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:4001},"127":{load:(utag.cond[68] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:4001},"129":{load:(utag.cond[79] && utag.cond[74]),send:1,v:202102050313,wait:1,tid:20067},"131":{load:(utag.cond[69] && utag.cond[74]),send:1,v:202008070212,wait:1,tid:20067},"132":{load:(utag.cond[79] && utag.cond[74]),send:1,v:202102050313,wait:1,tid:20110},"135":{load:(utag.cond[74] && utag.cond[76]),send:1,v:202010160228,wait:1,tid:4001},"136":{load:(utag.cond[79] && utag.cond[74]),send:1,v:202102050313,wait:1,tid:4001},"141":{load:(utag.cond[78] && utag.cond[74]),send:1,v:202101191121,wait:1,tid:20010},"147":{load:(utag.cond[74] && utag.cond[81]),send:1,v:202103161226,wait:1,tid:4001},"148":{load:(utag.cond[74] && utag.cond[82]),send:1,v:202103161226,wait:1,tid:4001},"149":{load:(utag.cond[74] && utag.cond[83]),send:1,v:202103161226,wait:1,tid:4001},"150":{load:(utag.cond[74] && utag.cond[84]),send:1,v:202103161226,wait:1,tid:4001},"151":{load:(utag.cond[74] && utag.cond[85]),send:1,v:202103161226,wait:1,tid:4001},"152":{load:(utag.cond[74] && utag.cond[86]),send:1,v:202103161226,wait:1,tid:4001},"153":{load:(utag.cond[74] && utag.cond[87]),send:1,v:202103161226,wait:1,tid:4001},"154":{load:(utag.cond[74] && utag.cond[88]),send:1,v:202103161226,wait:1,tid:4001},"155":{load:(utag.cond[74] && utag.cond[89]),send:1,v:202103231228,wait:1,tid:4001},"156":{load:1,send:1,v:202104300611,wait:1,tid:20010},"157":{load:(utag.cond[74] && utag.cond[90]),send:1,v:202104300925,wait:1,tid:4001},"158":{load:(utag.cond[74] && utag.cond[91]),send:1,v:202105040501,wait:1,tid:20010},"160":{load:(utag.cond[92] && utag.cond[74]),send:1,v:202105180503,wait:1,tid:6026},"163":{load:(utag.cond[74] && utag.cond[95]),send:1,v:202106151649,wait:1,tid:20078},"164":{load:(utag.cond[96] && utag.cond[74]),send:1,v:202106151649,wait:1,tid:4001},"166":{load:(utag.cond[74] && utag.cond[98]),send:1,v:202106151649,wait:1,tid:6026},"168":{load:1,send:1,v:202107090717,wait:1,tid:20010},"170":{load:(utag.cond[99] && utag.cond[103] && utag.cond[74]),send:1,v:202107090717,wait:1,tid:7132},"171":{load:(utag.cond[100] && utag.cond[74]),send:1,v:202107090717,wait:1,tid:7132},"172":{load:(utag.cond[101] && utag.cond[74]),send:1,v:202107090717,wait:1,tid:4001},"173":{load:(utag.cond[103] && utag.cond[102] && utag.cond[74]),send:1,v:202107090717,wait:1,tid:4001},"174":{load:(utag.cond[104] && utag.cond[74]),send:1,v:202107131218,wait:1,tid:20010},"176":{load:(utag.cond[106] && utag.cond[74]),send:1,v:202107200524,wait:1,tid:20010},"177":{load:(utag.cond[107] && utag.cond[74]),send:1,v:202107200524,wait:1,tid:4001}};
utag.loader.cfgsort=["12","15","21","22","23","25","26","31","32","33","41","46","49","59","60","61","63","69","75","76","77","82","83","86","92","93","94","96","97","100","101","104","105","106","107","110","111","112","115","116","123","124","125","127","129","131","132","135","136","141","147","148","149","150","151","152","153","154","155","156","157","158","160","163","164","166","168","170","171","172","173","174","176","177"];
  }
utag.loader.initcfg();
}

  if(typeof utag_cfg_ovrd!='undefined'){for(var i in utag.loader.GV(utag_cfg_ovrd))utag.cfg[i]=utag_cfg_ovrd[i]};
  utag.loader.PINIT = function(a,b,c){
    utag.DB("Pre-INIT");
    if (utag.cfg.noload) {
      return;
    }

    try {
      // Initialize utag.data
      this.GET();
      // FUTURE: blr = "before load rules"
      if(utag.handler.RE('view',utag.data,"blr")){
        utag.handler.LR();
      }
      
    }catch(e){utag.DB(e)};
    // process 'blocking' tags (tags that need to run first)
    a=this.cfg;
    c=0;
    for (b in this.GV(a)) {
      // external .js files (currency converter tag) are blocking
      if(a[b].load>0 && (typeof a[b].src!='undefined'&&a[b].src!='')){
        a[b].block = 1
      }
      if(a[b].block){
        // handle case of bundled and blocking (change 4 to 1)
        // (bundled tags that do not have a .src should really never be set to block... they just run first)
        if(a[b].load==4)a[b].load=1; 
	c=1;
	this.bq[b]=1;
 	a[b].cb=function(){
          var d=this.uid;
          utag.loader.cfg[d].cbf=1;
          utag.loader.LOAD(d)
        };
        a[b].id=b; 
        this.AS(a[b]);
      }
    }
    if(c==0)this.INIT();
  };
  utag.loader.INIT = function(a, b, c, d, e) {
    utag.DB('utag.loader.INIT');
    if (this.ol == 1) return -1;
    else this.ol = 1;
    // The All Tags scope extensions run after blocking tags complete
    utag.handler.RE('view',utag.data);

    utag.rpt.ts['i'] = new Date();
     
    d = this.cfgsort;
    // TODO: Publish engine should sort the bundled tags first..
    for (a=0;a<d.length;a++){
      e = d[a];
      b = this.cfg[e];
      b.id = e;
      // s2s (ServerStream) tags do not load client-side
      if(b.block != 1 && b.s2s != 1){
        if (utag.loader.bk[b.id] || (utag.cfg.readywait && b.load==4)){
          this.f[b.id]=0;
          utag.loader.LOAD(b.id)
        // do not wait if the utag.cfg.noview flag is set and the tag is bundled
        }else if (b.wait == 1 && utag.loader.rf == 0  && !(b.load==4 && utag.cfg.noview)) {
	  utag.DB('utag.loader.INIT: waiting ' + b.id);
          this.wq.push(b)
          this.f[b.id]=2;
        }else if (b.load>0){
	  utag.DB('utag.loader.INIT: loading ' + b.id);
	  this.lq.push(b);
          this.AS(b);
        }
      }
    }
          
    if (this.wq.length > 0) utag.loader.EV('', 'ready', function(a) {
      if(utag.loader.rf==0){
        utag.DB('READY:utag.loader.wq');
        utag.loader.rf=1;
        utag.loader.WQ();
      }
    });
    else if(this.lq.length>0)utag.loader.rf=1;
    else if(this.lq.length==0)utag.loader.END();

    return 1
  };
  utag.loader.EV('', 'ready', function(a) {if(utag.loader.efr!=1){utag.loader.efr=1;try{
function getOptanonCookkie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
 }

 var getOneTrustCookkie= decodeURIComponent(getOptanonCookkie('OptanonConsent'));
 
if(getOneTrustCookkie.indexOf('C0004:1') > -1 ){

if(window.location.href.match(/vmware\.com\/radius\/tag\/agents-of-change/)){
		
    var ftRand = Math.random() + "";
    var num = ftRand * 1000000000000000000;
    $('body').append('<img border="0" width="1" height="1" src="https://9157927.fls.doubleclick.net/activityi;src=9157927;type=vmwor0;cat=vmwar00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord=1'+num+'"">');
	
}

if(window.location.href.match(/vmware\.com\/radius\/topic\/agents-of-change/)){
		
    var ftRand = Math.random() + "";
    var num = ftRand * 1000000000000000000;
    $('body').append('<img border="0" width="1" height="1" src="https://9157927.fls.doubleclick.net/activityi;src=9157927;type=vmwor0;cat=vmwar00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord=1'+num+'"">');
	
}
	
jQuery('a[href="https://www.vmware.com/learn/278143_VMware_Cloud_Foundation_REG.html"]').on("click",function (){
	
     var ftRand = Math.random() + "";
     var num = ftRand * 1000000000000000000;
     $('body').append('<img border="0" width="1" height="1" src="https://9157927.fls.doubleclick.net/activityi;src=9157927;type=cloud00;cat=vmwar00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord='+num+'"">');
	
})
  
  if(window.location.href=="http://wan.velocloud.com/info-request-thank-you.html"){
  gtag('event', 'conversion', {'send_to': 'AW-964575739/604jCM_Ah5gBEPuD-csD'});
}


if(window.location.href.includes("https://www.vmware.com/radius/impact/leading-culinary-revolution/") === true ||
window.location.href.includes("https://www.vmware.com/radius/cloud-native-application-development-dominos/") === true ||
window.location.href.includes("https://octo.vmware.com/defining-modern-application/") === true 
//window.location.href.includes("https://blogs.vmware.com/services-education-insights/2018/05/about-machine-learning-and-multi-cloud.html") === true ||
//window.location.href.includes("https://blogs.vmware.com/cloudnative/2019/12/30/vmware-pivotal-combining-the-skills-people-and-leadership-to-deliver-modern-apps-to-the-enterprise/") === true ||
//window.location.href.includes("https://k8s.vmware.com/kubernetes-for-executives/") === true ||
//window.location.href.includes("https://k8s.vmware.com/kubernetes-for-developers/") === true ||
//window.location.href.includes("https://www.vmware.com/solutions/business-continuity.html") === true
  ){       
    var ftRand = Math.random() + "";
    var num = ftRand * 1000000000000000000; 
  $('body').append('<img border="0" width="1" height="1" src="https://ad.doubleclick.net/ddm/activity/src=8513285;type=hve0;cat=ushve007;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord='+num+'"">');
    
}

//DMR-11798 starting
if(window.location.href.includes("https://evolve.vmware.com/thank-you.html"))
{
	 var ftRand = Math.random() + "";
    var num = ftRand * 1000000000000000000; 
  $('body').append('<img border="0" width="1" height="1" src="https://www.facebook.com/tr?id=1026009530921215&ev=CompleteRegistration&noscript=1'+num+'"">');
    
	// fbq('track', 'CompleteRegistration');
}
//DMR-11798 ending

/*
 //DMR-11449 Starting
   (function () {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=DC-9758136';
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s,x);
    })();
	
  //$('body').append("<script src = 'https://www.googletagmanager.com/gtag/js?id=DC-9758136' type='text/javascript' async='async'></script>");

//DMR-11449 Ending 
  */
  
//DMR-11496 Starting
/*

//India
if(window.location.href.includes("https://blogs.vmware.com/cloudnative/2018/12/12/vmworld-pks-customer-highlights") === true){
var ftRand = Math.random() + "";
    var num = ftRand * 1000000000000000000;
	
jQuery('body').append('<img border="0" width="1" height="1" src="https://ad.doubleclick.net/ddm/activity/src=8671176;type=hveru0;cat=inhve003;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord='+num+'"">');
	
jQuery('body').append('<img border="0" width="1" height="1" src="https://ad.doubleclick.net/ddm/activity/src=8513285;type=hve0;cat=inhve0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord='+num+'"">');

}
//UK
if(window.location.href.includes("https://blogs.vmware.com/cloudnative/2018/12/12/vmworld-pks-customer-highlights") === true){
var ftRand = Math.random() + "";
    var num = ftRand * 1000000000000000000;
	
jQuery('body').append('<img border="0" width="1" height="1" src="https://ad.doubleclick.net/ddm/activity/src=8668669;type=ukhve0;cat=ukhve004;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord='+num+'"">');
	
jQuery('body').append('<img border="0" width="1" height="1" src="https://ad.doubleclick.net/ddm/activity/src=8513285;type=hve0;cat=ukhve00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord='+num+'"">');
	
}
//US
if(window.location.href.includes("https://blogs.vmware.com/cloudnative/2018/12/12/vmworld-pks-customer-highlights") === true){
var ftRand = Math.random() + "";
    var num = ftRand * 1000000000000000000;
	
jQuery('body').append('<img border="0" width="1" height="1" src="https://ad.doubleclick.net/ddm/activity/src=8513285;type=hve0;cat=ushve007;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord='+num+'"">');
		
}

//DMR-11496 Ending
*/


//DMR-11821 Pixel Implementation Starting
if(window.location.href.includes("https://www.vmware.com/radius/network-visibility-it-problems/")===true || 
window.location.href.includes("https://www.vmware.com/radius/cloud-native-application-development-dominos/")===true  ||
window.location.href.includes("https://www.vmware.com/radius/how-to-multi-cloud-success/")===true){
/*(function() {
    var ntveng = document.createElement('script');
     ntveng.type = 'text/javascript';
        ntveng.async = true;
       
    ntveng.src = 'https://s.ntv.io/serve/load.js';
    ntveng.setAttribute('ntv-clickout-tracking', 'true');
    document.head.appendChild(ntveng);
  })();*/
  $('body').append('<script type="text/javascript">window._prx = window._prx || []; var _prx =  window._prx;_prx.push(["cfg.ClickOutTracking"]);</script><script type="text/javascript" src="https://s.ntv.io/serve/load.js" async></script>');
}
//DMR-11821 Pixel Implementation Ending



//DMR-11910 ntv Pixel implementation starting
if(window.location.href.includes("https://www.vmware.com/radius/network-visibility-it-problems/")===true ||
window.location.href.includes("https://www.vmware.com/radius/cloud-native-application-development-dominos/")===true ||
window.location.href.includes("https://www.vmware.com/radius/how-to-multi-cloud-success/")===true)
{
	var ftRand = Math.random() + "";
    var num = ftRand * 1000000000000000000;
jQuery('body').append('<img border="0" width="1" height="1" src="https://jadserve.postrelease.com/rt.gif?ntv_tg=1de15ea4c7304630a12525950484fde6&ord='+num+'"">');

}
//DMR-11910 ntv Pixel implementation ending




//DMR-11867  Linkedin pixel Starting

if(window.location.href.includes("https://evolve.vmware.com/") === true || 
window.location.href.includes("https://evolve.vmware.com/register.html") === true || 
window.location.href.includes("https://evolve.vmware.com/thank-you.html") === true ||
window.location.href.includes("http://evolve.vmware.com/") === true || 
window.location.href.includes("http://evolve.vmware.com/register.html") === true || 
window.location.href.includes("http://evolve.vmware.com/thank-you.html") === true )
{
var ftRand = Math.random() + "";
    var num = ftRand * 1000000000000000000;
	
jQuery('body').append('<img border="0" width="1" height="1" src="https://px.ads.linkedin.com/collect/?pid=916683&fmt=gif'+num+'"">');

}


/*(function()

{
 var s = document.getElementsByTagName("script")[0];
 var b = document.createElement("script");
 b.type = "text/javascript";b.async = true; b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
 s.parentNode.insertBefore(b, s);
 }
)();

*/

//DMR-11867  Linkedin Pixel Ending

//DMR-12658 US Awareness code starting
if(window.location.href.includes("https://www.vmware.com/radius/amir-levy-harel-digital-transformation/") === true || 
window.location.href.includes("https://blogs.vmware.com/emea/en/2020/01/successful-surgery-braunschweig-municipal-hospital-to-modernize-it-infrastructure-for-driving-digitization/") === true || 
window.location.href.includes("https://blogs.vmware.com/emea/en/2020/04/dynamic-developers-help-swisscom-transform-its-business-and-move-to-the-cloud/") === true
)
{
var ftRand = Math.random() + "";
    var num = ftRand * 1000000000000000000;
	
jQuery('body').append('<img border="0" width="1" height="1" src="https://ad.doubleclick.net/ddm/activity/src=8513285;type=hve0;cat=ushve007;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord='+num+'"">');

}

//DMR-12658 US Awareness code ending
//DMR-12658 US Awareness code ending
//DMR-12721 UK Awareness code starting
if(window.location.href.includes("https://www.vmware.com/radius/amir-levy-harel-digital-transformation/") === true || 
window.location.href.includes("https://blogs.vmware.com/emea/en/2020/01/successful-surgery-braunschweig-municipal-hospital-to-modernize-it-infrastructure-for-driving-digitization/") === true || 
window.location.href.includes("https://blogs.vmware.com/emea/en/2020/04/dynamic-developers-help-swisscom-transform-its-business-and-move-to-the-cloud/") === true
)
{
var ftRand = Math.random() + "";
    var num = ftRand * 1000000000000000000;
	
jQuery('body').append('<img border="0" width="1" height="1" src="https://ad.doubleclick.net/ddm/activity/src=8668669;type=ukhve0;cat=ukhve004;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord='+num+'">');
jQuery('body').append('<img border="0" width="1" height="1" src="https://ad.doubleclick.net/ddm/activity/src=8513285;type=hve0;cat=ukhve00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord='+num+'">');
}
//DMR-12721 UK Awareness code ending
//DMR-12722 IN Awareness code starting
if(window.location.href.includes("https://www.vmware.com/radius/amir-levy-harel-digital-transformation/") === true || 
window.location.href.includes("https://blogs.vmware.com/emea/en/2020/01/successful-surgery-braunschweig-municipal-hospital-to-modernize-it-infrastructure-for-driving-digitization/") === true || 
window.location.href.includes("https://blogs.vmware.com/emea/en/2020/04/dynamic-developers-help-swisscom-transform-its-business-and-move-to-the-cloud/") === true
)
{
var ftRand = Math.random() + "";
    var num = ftRand * 1000000000000000000;
	jQuery('body').append('<img border="0" width="1" height="1" src="https://ad.doubleclick.net/ddm/activity/src=8671176;type=hveru0;cat=inhve003;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord='+num+'">');
    jQuery('body').append('<img border="0" width="1" height="1" src="https://ad.doubleclick.net/ddm/activity/src=8513285;type=hve0;cat=inhve0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord='+num+'">');
}
//DMR-12722 IN Awareness code ending



//DMR-13685 Floodlight pixel starting
if(window.location.href.includes("https://benefits.vmware.com") !== true)
{
 window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'DC-9545401');
//DMR-13685 Floodlight pixel ending
}


//DMR-14576 starting
//US
if( window.location.href.includes("https://tanzu.vmware.com/customers/duke-energy") === true )
	{
	var ftRand = Math.random() + "";
		var num = ftRand * 1000000000000000000;
		 jQuery('body').append('<img border="0" src="https://ad.doubleclick.net/ddm/activity/src=8513285;type=hve0;cat=ushve007;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord='+num+'" width="1" height="1" alt=""/>');; 
		
	}
if( window.location.href.includes("https://tanzu.vmware.com/customers/duke-energy") === true )
	{
	var ftRand = Math.random() + "";
		var num = ftRand * 1000000000000000000;
		 jQuery('body').append('<img border="0" src="https://ad.doubleclick.net/ddm/activity/src=8513285;type=hve0;cat=minut0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord='+num+'" width="1" height="1" alt=""/>');; 
		
	}

//DMR-14576 ending

}

//DWEP-299 Starting
//COL - 14
var currentDate = new Date() //current date
var campaignEndDate = new Date(2022, 0, 30);  //campaign end date
if(window.location.href.includes('https://event.vmware.com/flow/vmware/vmworld2021/reg/form/contactInfo')){
  if(currentDate <= campaignEndDate){
	var ftRand = Math.random() + "";
	var num = ftRand * 1000000000000000000;
	jQuery('body').append('<img border="0" src="https://ad.doubleclick.net/ddm/activity/src=9758136;type=siteactn;cat=vmwor0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord='+num+'" width="1" height="1" alt=""/>');
  }
}
//DWEP-299 Ending

//DWEP-370 Starting
if(window.location.href.includes('https://www.vmw.events/exsum?src=ds_60bf5084225e3&cid=7012H000001KWiAQAW')){
	var currentDate = new Date();
    var campaignEndDate = new Date(2021, 5, 29);
    if(currentDate <= campaignEndDate){
		window._qevents = window._qevents || [];
		(function() {
		  var elem = document.createElement('script');
		  elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js";
		  elem.async = true;
		  elem.type = "text/javascript";
		  var scpt = document.getElementsByTagName('script')[0];
		  scpt.parentNode.insertBefore(elem, scpt);
		})();
		window._qevents.push({qacct:"p-XYjVX-jVeuv56",uid:"__INSERT_EMAIL_HERE__"});
	}
}
//DWEP-370 Ending

//DWEP-369 Starting
if(window.location.href.includes('https://sase.vmware.com/')){
    var currentDate = new Date();
    var campaignEndDate = new Date(2022, 5, 30);
    if(currentDate <= campaignEndDate){
	   //COL - 11
       $('body').append("<script type='text/javascript' data-cfasync='false' src='https://tribl.io/footer.js?orgId=Kwk8mqBlxeUv9128lm3k'></script>");
	   //COL - 12
	   $('body').append("<script type='text/javascript' data-cfasync='false' src='https://tribl.io/h.js?orgId=Kwk8mqBlxeUv9128lm3k'></script>");
	}
}
//DWEP-369 Ending
//DWEP-620 Starting
if(window.location.href.includes('https://sase.vmware.com/products/edge-network-intelligence/edge-network-intelligence-demo') === true){
  $(".blueButtonOpaque.btn.btn-blue-outline").click(function () {
    var a=document.forms["TheForm"]["firstName"].value;
    var b=document.forms["TheForm"]["lastName"].value;
    var c=document.forms["TheForm"]["company"].value;
    var d=document.forms["TheForm"]["email"].value;
    var e=document.forms["TheForm"]["title"].value;
    var f=document.forms["TheForm"]["industry"].value;
    var g=document.forms["TheForm"]["demoType"].value;
    var h=document.forms["TheForm"]["phoneCode"].value;
    var i=document.forms["TheForm"]["country"].value;
    if($('#state').attr('class') === 'selectpicker'){
      var j=document.forms["TheForm"]["state"].value;
      if (a !== "" && b !== "" && c !== "" && d !== "" && e !== "" && f !== "" && g !== "" && h !== "" && i !== "" && j !== "") {
	//col-12
	var currentDate = new Date();
	var campaignEndDate = new Date(2022, 11, 31);
	if(currentDate <= campaignEndDate){
	  gtag('event', 'conversion', {'send_to': 'AW-951536373/tX66CPilkKcBEPWV3cUD'});
	}           
      }
    }
    else if($('#state').attr('class') === 'selectpicker ignore'){
      if (a !== "" && b !== "" && c !== "" && d !== "" && e !== "" && f !== "" && g !== "" && h !== "" && i !== "") {
	//col-12
	var currentDate = new Date();
	var campaignEndDate = new Date(2022, 11, 31);
	if(currentDate <= campaignEndDate){
	  gtag('event', 'conversion', {'send_to': 'AW-951536373/tX66CPilkKcBEPWV3cUD'});
	}
      }
    }
  });
}	
//DWEP-620 Ending 

//DWEP-639 Starting
 if(window.location.href.includes('https://event.vmware.com/flow/vmware/vmworld2021/reg/form/contactInfo')===true){
	            var currentDate = new Date();
	            var campaignEndDate = new Date(2021, 9, 6);
	            if(currentDate <= campaignEndDate){
                //GLOBAL SCRIPT		
                    (function () {
                            var s = document.createElement('script');
                            s.type = 'text/javascript';
                            s.async = true;
                            s.src = 'https://www.googletagmanager.com/gtag/js?id=DC-9157927';
                            var x = document.getElementsByTagName('script')[0];
                            x.parentNode.insertBefore(s, x);
                        })();
                    
                    //PIXEL CODE	
                    var ftRand = Math.random() + "";
                    var num = ftRand * 1000000000000000000;
                    jQuery('body').append('<img width="1" height="1" src="https://ad.doubleclick.net/ddm/activity/src=9157927;type=regis0;cat=vmwar00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord='+num+'" alt=""/>');
				}
          }
 //DWEP-639 Ending
 
 //DWEP-739 22Q3 JP Google & FreakOut Pixel Insertion Request Starting
var FreakcurrentDate = new Date();
var FreakexpiryDate = new Date(2021, 09, 01, 00, 00, 00);
if(FreakcurrentDate < FreakexpiryDate){
	if(window.location.href.indexOf("japanevents.vmware.com/seminar/detail/988")> -1 || window.location.href.indexOf("japanevents.vmware.com/seminar/form/1595")> -1){
		let gtmSeminar = document.createElement("script");
		gtmSeminar.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=AW-794650713");
		document.body.appendChild(gtmSeminar);
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'AW-794650713');

	}

	if(window.location.href.indexOf("japanevents.vmware.com/seminar/form/complete")> -1 ){
		gtag('event', 'conversion', {'send_to': 'AW-794650713/nQHlCOi0290CENnQ9foC'});
	
		var _fout_queue = _fout_queue || {}; if (_fout_queue.conv === void 0) _fout_queue.conv = {};
		if (_fout_queue.conv.queue === void 0) _fout_queue.conv.queue = [];

	_fout_queue.conv.queue.push({
		'user_id': 7305,
		'convtype': 18,
		'price': 0,
		'dat': ''
	});

	  (function() {
		var el = document.createElement('script'); el.type = 'text/javascript'; el.async = true;
		el.src = 'https://js.fout.jp/conversion.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(el, s);
	  })();
	}
}
//DWEP-739 22Q3 JP Google & FreakOut Pixel Insertion Request Ending




}catch(e){utag.DB(e)};
try{ try{ if((utag.data['dom.url'].toString().toLowerCase().indexOf('https://blogs.vmware.com/emea/en/2019/06/want-to-simplify-your-path-to-the-hybrid-cloud/'.toLowerCase())>-1&&utag.data['cp.OptanonConsent'].toString().indexOf('C0004:1')>-1)){
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'DC-9157927');


  gtag('event', 'conversion', {
    'allow_custom_scripts': true,
    'send_to': 'DC-9157927/cloud00/vmwar0+standard'
  });


} } catch(e){ utag.DB(e) }  }catch(e){utag.DB(e)};}})

  if(utag.cfg.readywait || utag.cfg.waittimer){
    utag.loader.EV('', 'ready', function(a) {
      if(utag.loader.rf==0){
        utag.loader.rf=1;
        utag.cfg.readywait=1;
        utag.DB('READY:utag.cfg.readywait');
        setTimeout(function(){utag.loader.PINIT()}, utag.cfg.waittimer || 1);
      }
    })
  }else{
    utag.loader.PINIT()
  }
}

