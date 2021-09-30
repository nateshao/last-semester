//~~tv:20078.20150326
//~~tc: Fix syntax error

//Library loader (libloader)
if(typeof utag.ut=="undefined"){
  utag.ut={};
}
utag.ut.libloader2=function(o, a, b, c, l) {
  a=document;b=a.createElement('script');b.language='javascript';b.type='text/javascript';b.src=o.src;if(o.id){b.id=o.id};
  if (typeof o.cb=='function') {
    b.hFlag=0;b.onreadystatechange=function(){if((this.readyState=='complete'||this.readyState=='loaded')&&!b.hFlag){b.hFlag=1;o.cb()}};
    b.onload=function(){if(!b.hFlag){b.hFlag=1;o.cb()}}
  }
  l = o.loc || 'head';
  c = a.getElementsByTagName(l)[0];
  if (c) {
    if (l == 'script') {
      c.parentNode.insertBefore(b, c);
    } else {
      c.appendChild(b)
    }
    utag.DB("Attach to "+l+": "+o.src)
  }
};

//tealium universal tag - utag.sender.20078 ut4.0.202007160442, Copyright 2020 Tealium.com Inc. All Rights Reserved.
try {
  (function(id, loader, u) {
    u = utag.o[loader].sender[id] = {};
    u.ev = {'view': 1};
    u.initialized = false;
      u.map={};
  u.extend=[];

    u.send = function(a, b) {
      if (u.ev[a] || typeof u.ev.all != "undefined") {
        //##UTENABLEDEBUG##utag.DB("send:##UTID##");
        var c, d, e, f;

        u.data = {
          "pid" : "nu8xb",
          "base_url" : "//platform.twitter.com/oct.js"
        };

        //Extensions
        

        //Mapping
        for (d in utag.loader.GV(u.map)) {
          if (typeof b[d] != "undefined" && b[d] != "") {
            e = u.map[d].split(",");
            for ( f = 0; f < e.length; f++) {
              u.data[e[f]] = b[d];
            }
          }
        }

        //Callback function that gets called after the external JS library has loaded.
        u.twitter_callback = function() {
          u.initialized = true;
          twttr.conversion.trackPid(u.data.pid);
        };

        if (!u.initialized) {
          utag.ut.libloader2({src:u.data.base_url, cb:u.twitter_callback});
        } else {
          u.twitter_callback();
        }

        //##UTENABLEDEBUG##utag.DB("send:##UTID##:COMPLETE");
      }
    };
    utag.o[loader].loader.LOAD(id);
  })('22', 'vmware.microsites-privacy');
} catch(e) {
}
//end tealium universal tag

