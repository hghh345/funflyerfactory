(function(){

var P={
  show:{
    head:"BASEMENT SHOW!!!",
    burst:"ALL AGES",
    sub:"3 bands. $5. Bring a friend.",
    body:"Doors at 7. Bring snacks to share.\nNo jerks.",
    when:"Fri Oct 22 @ 7pm\n418 Maple St (the basement)",
    tab:"BASEMENT SHOW FRI 7PM",
    wa:"1",
    font:"1",
    col:"0",
    pat:"0",
    bd:"2",
    dg:"★ ★ ★"
  },

  cat:{
    head:"HAVE YOU SEEN MITTENS?",
    burst:"REWARD",
    sub:"Orange cat. Very chatty.",
    body:"Last seen near the corner store.\nAnswers to treats, not her name.",
    when:"Call or text Dana\n555-0142",
    tab:"MITTENS 555-0142",
    wa:"0",
    font:"0",
    col:"2",
    pat:"0",
    bd:"3",
    dg:""
  },

  sale:{
    head:"HUGE YARD SALE",
    burst:"CHEAP!",
    sub:"Everything must go",
    body:"Records, lamps, a bread maker,\nand one (1) exercise bike.",
    when:"Sat 8am to 2pm\n77 Elm Court",
    tab:"YARD SALE SAT 8AM",
    wa:"2",
    font:"5",
    col:"3",
    pat:"2",
    bd:"1",
    dg:"☺ ☺ ☺"
  },

  party:{
    head:"DANCE PARTY",
    burst:"FREE ENTRY",
    sub:"Wear something shiny",
    body:"DJ sets all night.\nCoat check is a chair.",
    when:"Sat Nov 6, 10pm\nThe Roller Rink",
    tab:"DANCE PARTY NOV 6",
    wa:"3",
    font:"0",
    col:"1",
    pat:"1",
    bd:"2",
    dg:"♪ ♫ ♪"
  }
};


var C=[
  ["#fff200","#000","#ff1493"],
  ["#ff9ee5","#3a006f","#00b7ff"],
  ["#fff","#000","#d00000"],
  ["#b6ff3b","#1a1a8c","#ff5a00"],
  ["#8fd8ff","#00205b","#ff00aa"],
  ["#ff2a2a","#fff200","#ffffff"],
  ["#7a2cff","#ffffff","#3cff9e"],
  ["#9ff5d0","#003b2e","#ff4fa3"],
  ["#ffcf33","#6a0dad","#ff3d00"],
  ["#ff9a1f","#1a0033","#fff200"]
];


var ids=[
  "head",
  "burst",
  "sub",
  "body",
  "when",
  "tab",
  "wa",
  "font",
  "col",
  "pat",
  "bd",
  "dg",
  "sz",
  "tabs",
  "shape",
  "bw",
  "c0",
  "c1",
  "c2"
];

var E={};

ids.forEach(function(i){
  E[i]=document.getElementById(i);
  E[i].addEventListener("input",draw);
});


var fl=document.getElementById("fl");

var pic="";

var AR=[
  "8.5/11",
  "1/1",
  "4/5",
  "9/16"
];

var PX=[
  [1275,1650],
  [800,800],
  [1080,1350],
  [1080,1920]
];

var msg=document.getElementById("msg");

var dl=null;


/* ---------- star shape ---------- */

var pts=[];

for(var i=0;i<32;i++){

  var a=i*Math.PI/16;
  var r=i%2?38:50;

  pts.push(
    (50+r*Math.sin(a)).toFixed(1)+"% "+
    (50-r*Math.cos(a)).toFixed(1)+"%"
  );

}

fl.style.setProperty(
  "--star",
  "polygon("+pts.join(",")+")"
);


/* ---------- draw flyer ---------- */

function draw(){

  var c=
    +E.col.value==10
      ? [E.c0.value,E.c1.value,E.c2.value]
      : C[+E.col.value];

  document.getElementById("cust").hidden=
    E.col.value!="10";

  fl.style.setProperty("--bg",c[0]);
  fl.style.setProperty("--fg",c[1]);
  fl.style.setProperty("--ac",c[2]);

  fl.className=
    "flyer b"+
    E.bd.value+
    " p"+
    E.pat.value+
    " f"+
    E.font.value+
    " z"+
    E.sz.value+
    (E.bw.checked?" bw":"");

  fl.style.setProperty(
    "--ar",
    AR[+E.sz.value]
  );


  /* photo */

  var pc=document.getElementById("oPic");

  if(pic){

    pc.src=pic;
    pc.hidden=false;

  }else{

    pc.removeAttribute("src");
    pc.hidden=true;

  }


  /* headline */

  var h=document.getElementById("oHead");

  var sh=+E.shape.value;
  var tx=E.head.value;

  h.textContent="";


  if(!sh){

    h.textContent=tx;
    h.className="head w"+E.wa.value;

  }else{

    h.className="head";

    var cs=tx
      .replace(/\s+/g," ")
      .trim();

    var n=cs.replace(/ /g,"").length;
    var k=0;

    cs.split(" ").forEach(function(w,wi){

      if(wi){
        h.appendChild(
          document.createTextNode(" ")
        );
      }

      var ws=document.createElement("span");

      ws.className="wd";

      w.split("").forEach(function(ch){

        var l=document.createElement("span");

        var t=
          (k-(n-1)/2)/
          Math.max(1,n/2);

        var y,r;

        if(sh==1){

          y=Math.sin(k*.9)*1.6;
          r=0;

        }else if(sh==2){

          y=t*t*6;
          r=t*20;

        }else{

          y=Math.sin(k*12.9)*1.2;
          r=Math.sin(k*7.7)*8;

        }

        l.className="l w"+E.wa.value;

        l.textContent=ch;

        l.style.transform=
          "translateY("+
          y.toFixed(2)+
          "cqw) rotate("+
          r.toFixed(1)+
          "deg)";

        ws.appendChild(l);

        k++;

      });

      h.appendChild(ws);

    });

  }


  /* text */

  var s=document.getElementById("oSub");

  s.textContent=E.sub.value;

  s.style.display=
    E.sub.value
      ?"inline-block"
      :"none";


  document.getElementById("oBody").textContent=
    E.body.value;

  document.getElementById("oWhen").textContent=
    E.when.value;

  document.getElementById("oDg").textContent=
    E.dg.value;


  /* sticker */

  var b=document.getElementById("oBurst");

  b.textContent=E.burst.value;

  b.style.display=
    E.burst.value
      ?"flex"
      :"none";


  /* tear-offs */

  var t=document.getElementById("oTabs");

  t.style.display=
    E.tabs.checked
      ?"flex"
      :"none";

  E.tab.disabled=
    !E.tabs.checked;

  t.innerHTML="";

  for(var i=0;i<8;i++){

    var d=document.createElement("div");

    d.className="tab";

    d.textContent=E.tab.value;

    t.appendChild(d);

  }

}


/* ---------- templates ---------- */

document.querySelectorAll("[data-t]").forEach(function(b){

  b.addEventListener("click",function(){

    load(
      b.getAttribute("data-t")
    );

  });

});


function load(k){

  var p=P[k];

  for(var k2 in p){

    E[k2].value=p[k2];

  }

  draw();

}


/* ---------- messages ---------- */

function say(t){

  msg.textContent=t;

}


/* ---------- PDF ---------- */

document.getElementById("print").addEventListener(
  "click",
  function(){

    var button=this;

    var originalText=
      button.textContent;

    button.disabled=true;

    button.textContent=
      "Making PDF...";

    say(
      "Making your PDF..."
    );


    try{

      if(
        !window.jspdf ||
        typeof window.jspdf.jsPDF!=="function"
      ){

        throw new Error(
          "jsPDF is not loaded"
        );

      }


      var jsPDF=
        window.jspdf.jsPDF;


      var z=+E.sz.value;

      var size=PX[z];

      var W=size[0];
      var H=size[1];


      var n=
        fl.cloneNode(true);

      n.removeAttribute("id");


      n.querySelectorAll(".sel")
        .forEach(function(e){

          e.classList.remove("sel");

        });


      n.querySelectorAll("[data-d]")
        .forEach(function(e){

          e.style.zIndex="20";

        });


      var exportedPic=
        n.querySelector(".pic");


      if(exportedPic){

        exportedPic.style.position=
          "relative";

        exportedPic.style.zIndex="5";

      }


      n.style.width=
        W+"px";

      n.style.height=
        H+"px";

      n.style.aspectRatio=
        "auto";

      n.style.boxShadow=
        "none";

      n.style.position=
        "relative";

      n.style.overflow=
        "hidden";


      /* collect CSS */

      var css="";


      document.querySelectorAll("style")
        .forEach(function(s){

          css+=
            s.textContent+
            "\n";

        });


      var sheets=
        document.querySelectorAll(
          'link[rel="stylesheet"]'
        );


      sheets.forEach(function(link){

        try{

          if(
            link.sheet &&
            link.sheet.cssRules
          ){

            for(
              var i=0;
              i<link.sheet.cssRules.length;
              i++
            ){

              css+=
                link.sheet
                  .cssRules[i]
                  .cssText+
                "\n";

            }

          }

        }catch(e){}

      });


      css=css
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;");


      var svg=
        '<svg xmlns="http://www.w3.org/2000/svg"'+
        ' width="'+W+'" height="'+H+'">'+
        '<foreignObject width="100%" height="100%">'+
        '<div xmlns="http://www.w3.org/1999/xhtml">'+
        '<style>'+css+'</style>'+
        new XMLSerializer()
          .serializeToString(n)+
        '</div>'+
        '</foreignObject>'+
        '</svg>';


      var im=new Image();


      im.onload=function(){

        try{

          var canvas=
            document.createElement(
              "canvas"
            );

          canvas.width=W;
          canvas.height=H;


          var ctx=
            canvas.getContext("2d");


          ctx.drawImage(
            im,
            0,
            0,
            W,
            H
          );


          var pdfSizes=[
            [8.5,11],
            [8,8],
            [8,10],
            [6,10.6666667]
          ];


          var pw=
            pdfSizes[z][0];

          var ph=
            pdfSizes[z][1];


          var pdf=
            new jsPDF({

              orientation:
                ph>pw
                  ?"portrait"
                  :"landscape",

              unit:"in",

              format:[
                pw,
                ph
              ],

              compress:true

            });


          pdf.addImage(
            canvas.toDataURL(
              "image/png"
            ),
            "PNG",
            0,
            0,
            pw,
            ph,
            undefined,
            "FAST"
          );


          var names=[
            "letter",
            "square",
            "4x5",
            "story"
          ];


          pdf.save(
            "funflyer-"+
            names[z]+
            ".pdf"
          );


          say(
            "PDF saved!"
          );


        }catch(err){

          console.error(
            "PDF RENDER ERROR:",
            err
          );

          say(
            "Could not make the PDF. Try Save as PNG instead."
          );

        }


        button.disabled=false;

        button.textContent=
          originalText;

      };


      im.onerror=function(){

        console.error(
          "Could not render flyer SVG"
        );

        say(
          "Could not make the PDF. Try Save as PNG instead."
        );

        button.disabled=false;

        button.textContent=
          originalText;

      };


      im.src=
        "data:image/svg+xml;charset=utf-8,"+
        encodeURIComponent(svg);


    }catch(err){

      console.error(
        "PDF ERROR:",
        err
      );

      say(
        "Could not make the PDF. Try Save as PNG instead."
      );

      button.disabled=false;

      button.textContent=
        originalText;

    }

  }
);


/* ---------- picture upload ---------- */

document.getElementById("file")
  .addEventListener(
    "change",
    function(e){

      var f=
        e.target.files[0];

      if(!f)return;


      var u=
        URL.createObjectURL(f);

      var im=
        new Image();


      im.onload=function(){

        var m=
          Math.min(
            1,
            1200/
            Math.max(
              im.width,
              im.height
            )
          );


        var c=
          document.createElement(
            "canvas"
          );


        c.width=
          Math.round(
            im.width*m
          );

        c.height=
          Math.round(
            im.height*m
          );


        c.getContext("2d")
          .drawImage(
            im,
            0,
            0,
            c.width,
            c.height
          );


        pic=
          c.toDataURL(
            "image/jpeg",
            .88
          );


        URL.revokeObjectURL(u);

        draw();

      };


      im.onerror=function(){

        msg.textContent=
          "That file would not open as an image. Try a JPG or PNG.";

      };


      im.src=u;

    }
  );


/* ---------- remove picture ---------- */

document.getElementById("nopic")
  .addEventListener(
    "click",
    function(){

      pic="";

      document.getElementById(
        "file"
      ).value="";

      draw();

    }
  );


E.tabs.addEventListener(
  "change",
  draw
);


/* ---------- selected item system ---------- */

var T={};

var sel=null;

var NAMES={
  oPlate:"Headline",
  oSub:"Subheading",
  oPic:"Picture",
  oDg:"Dingbats",
  oBody:"Details",
  oWhen:"When and where",
  oBurst:"Sticker"
};


function g(i){

  return document.getElementById(i);

}


function applyT(id){

  var e=g(id);

  var t=T[id];

  if(!e || !t)return;


  e.style.translate=
    t.x+"cqw "+t.y+"cqw";

  e.style.rotate=
    t.r+"deg";

  e.style.scale=
    t.s;

}


/* ---------- selection ---------- */

function select(id){

  document
    .querySelectorAll(".sel")
    .forEach(function(e){

      e.classList.remove("sel");

    });


  sel=id;

  var on=!!id;


  [
    "rot",
    "siz",
    "rst",
    "del"
  ].forEach(function(i){

    g(i).disabled=!on;

  });


  if(on){

    var el=g(id);

    if(!el){

      sel=null;

      g("selName").textContent=
        "Nothing selected. Click something on the flyer.";

      return;

    }


    el.classList.add("sel");


    var t=T[id];


    if(!t){

      T[id]={
        x:0,
        y:0,
        r:0,
        s:1
      };

      t=T[id];

    }


    g("rot").value=
      t.r;

    g("siz").value=
      Math.round(
        t.s*100
      );


    g("selName").textContent=
      NAMES[id] ||
      "Item";


  }else{

    g("selName").textContent=
      "Nothing selected. Click something on the flyer.";

  }

}


/* ---------- controls ---------- */

g("rot").addEventListener(
  "input",
  function(){

    if(sel){

      T[sel].r=
        +this.value;

      applyT(sel);

    }

  }
);


g("siz").addEventListener(
  "input",
  function(){

    if(sel){

      T[sel].s=
        this.value/100;

      applyT(sel);

    }

  }
);


g("rst").addEventListener(
  "click",
  function(){

    if(sel){

      T[sel]={
        x:0,
        y:0,
        r:0,
        s:1
      };

      applyT(sel);

      select(sel);

    }

  }
);


/* ---------- delete selected item ---------- */

g("del").addEventListener(
  "click",
  function(){

    if(!sel)return;


    var el=g(sel);

    if(!el)return;


    /*
      If the selected item is the picture,
      use the normal picture removal behavior.
    */

    if(sel==="oPic"){

      pic="";

      g("file").value="";

      T[sel]={
        x:0,
        y:0,
        r:0,
        s:1
      };

      select(null);

      draw();

      return;

    }


    /*
      Other flyer elements are removed from
      the current flyer.
    */

    el.remove();

    delete T[sel];

    select(null);

  }
);


/* ---------- draggable items ---------- */

var dr=null;


function makeDraggable(el){

  if(!el)return;


  el.setAttribute(
    "data-d",
    "1"
  );


  el.style.touchAction=
    "none";

  el.style.userSelect=
    "none";

  el.style.webkitUserSelect=
    "none";


  el.addEventListener(
    "pointerdown",
    function(e){

      var id=el.id;

      if(!T[id]){

        T[id]={
          x:0,
          y:0,
          r:0,
          s:1
        };

      }


      select(id);


      var t=T[id];


      dr={
        el:el,
        id:id,
        pointerId:e.pointerId,
        px:e.clientX,
        py:e.clientY,
        x:t.x,
        y:t.y
      };


      try{

        el.setPointerCapture(
          e.pointerId
        );

      }catch(x){}


      e.preventDefault();

      e.stopPropagation();

    }
  );


  el.addEventListener(
    "pointermove",
    function(e){

      if(
        !dr ||
        dr.el!==el ||
        dr.pointerId!==e.pointerId
      ){

        return;

      }


      var u=
        fl.getBoundingClientRect()
          .width/100;


      var t=
        T[dr.id];


      t.x=
        dr.x+
        (e.clientX-dr.px)/u;

      t.y=
        dr.y+
        (e.clientY-dr.py)/u;


      applyT(
        dr.id
      );


      e.preventDefault();

    }
  );


  el.addEventListener(
    "pointerup",
    function(e){

      if(
        dr &&
        dr.el===el &&
        dr.pointerId===e.pointerId
      ){

        dr=null;

      }

    }
  );


  el.addEventListener(
    "pointercancel",
    function(e){

      if(
        dr &&
        dr.el===el &&
        dr.pointerId===e.pointerId
      ){

        dr=null;

      }

    }
  );

}


/* ---------- built-in flyer elements ---------- */

Object.keys(NAMES)
  .forEach(function(id){

    var el=g(id);

    if(!el)return;


    el.setAttribute(
      "data-d",
      "1"
    );


    T[id]={
      x:0,
      y:0,
      r:0,
      s:1
    };


    makeDraggable(el);

  });


/* ---------- clicking the flyer ---------- */

fl.addEventListener(
  "pointerdown",
  function(e){

    var target=e.target;

    var el=null;


    if(
      target &&
      target.closest
    ){

      el=
        target.closest(
          "[data-d]"
        );

    }


    if(
      !el ||
      !fl.contains(el)
    ){

      select(null);

    }

  }
);


/* ---------- PNG ---------- */
function savePng(){

  var z=PX[+E.sz.value];
  var W=z[0];
  var H=z[1];

  var n=fl.cloneNode(true);

  n.removeAttribute("id");

  n.querySelectorAll(".sel").forEach(function(e){
    e.classList.remove("sel");
  });

  /*
    Make absolutely sure the uploaded picture is
    included in the exported flyer.

    The live flyer already has the correct data URL,
    but we explicitly put that data URL onto the
    cloned picture for mobile browsers.
  */
  var exportedPic=n.querySelector("#oPic");

  if(exportedPic && pic){

    exportedPic.setAttribute(
      "src",
      pic
    );

    exportedPic.removeAttribute(
      "hidden"
    );

    exportedPic.style.display=
      "block";

    exportedPic.style.visibility=
      "visible";

    exportedPic.style.opacity=
      "1";

    exportedPic.style.position=
      "relative";

    exportedPic.style.zIndex=
      "5";

    exportedPic.style.width=
      "auto";

    exportedPic.style.height=
      "auto";

    exportedPic.style.maxWidth=
      "80cqw";

    exportedPic.style.maxHeight=
      "50cqw";

    exportedPic.style.objectFit=
      "contain";

  }

  n.style.width=W+"px";
  n.style.height=H+"px";
  n.style.aspectRatio="auto";
  n.style.boxShadow="none";

  var css="";

  document.querySelectorAll("style").forEach(function(s){
    css+=s.textContent+"\n";
  });

  var sheets=document.querySelectorAll(
    'link[rel="stylesheet"]'
  );

  sheets.forEach(function(link){

    try{

      if(link.sheet && link.sheet.cssRules){

        for(
          var i=0;
          i<link.sheet.cssRules.length;
          i++
        ){

          css+=
            link.sheet.cssRules[i].cssText+
            "\n";

        }

      }

    }catch(e){}

  });

  css=
    css
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;");

  var svg=
    '<svg xmlns="http://www.w3.org/2000/svg"' +
    ' width="'+W+'" height="'+H+'">' +

    '<foreignObject width="100%" height="100%">' +

    '<div xmlns="http://www.w3.org/1999/xhtml">' +

    '<style>'+css+'</style>' +

    new XMLSerializer()
      .serializeToString(n) +

    '</div>' +

    '</foreignObject>' +

    '</svg>';

  var im=new Image();

  /*
    Important for mobile browsers:
    wait for the exported SVG/image to finish loading
    before creating the PNG.
  */
  im.onload=function(){

    try{

      var c=document.createElement("canvas");

      c.width=W;
      c.height=H;

      var ctx=c.getContext("2d");

      ctx.drawImage(
        im,
        0,
        0,
        W,
        H
      );

      c.toBlob(
        function(b){

          if(!b){

            say(
              "Could not make the PNG. Screenshot the flyer instead."
            );

            return;

          }

          function showImg(){

            var o=
              document.getElementById("outimg");

            o.src=
              URL.createObjectURL(b);

            o.style.display=
              "block";

            say(
              "Right-click or long-press the picture below to save it."
            );

          }

          if(!dl){

            showImg();
            return;

          }

          dl.save({
            filename:
              "funflyer-"+W+"x"+H+".png",
            data:b
          })
          .then(function(){

            say("Saved.");

          })
          .catch(function(e){

            if(
              e &&
              e.code==="declined"
            ){

              say("Save cancelled.");

            }else{

              showImg();

            }

          });

        },
        "image/png"
      );

    }catch(x){

      console.error(
        "PNG EXPORT ERROR:",
        x
      );

      say(
        "Could not make the PNG. Screenshot the flyer instead."
      );

    }

  };

  im.onerror=function(){

    console.error(
      "PNG IMAGE LOAD ERROR"
    );

    say(
      "Could not make the PNG. Screenshot the flyer instead."
    );

  };

  say("Making your PNG...");

  im.src=
    "data:image/svg+xml;charset=utf-8,"+
    encodeURIComponent(svg);

}


document.getElementById("save")
  .addEventListener(
    "click",
    savePng
  );


/* ---------- collapsible sections ---------- */

var mq=
  window.matchMedia(
    "(min-width:661px)"
  );

var secs=
  document.querySelectorAll(
    "details.sec"
  );


function syncSec(){

  for(
    var n=0;
    n<secs.length;
    n++
  ){

    var d=secs[n];


    if(mq.matches){

      d.dataset.locked="1";

      d.open=true;

    }else{

      delete d.dataset.locked;

      if(!d.dataset.user){

        d.open=false;

      }

    }

  }

}


for(
  var n=0;
  n<secs.length;
  n++
)(function(d){

  d.addEventListener(
    "toggle",
    function(){

      if(
        d.dataset.locked
      ){

        d.open=true;

        return;

      }


      if(
        !mq.matches
      ){

        d.dataset.user="1";

      }

    }
  );

})(secs[n]);


function mqChange(){

  for(
    var n=0;
    n<secs.length;
    n++
  ){

    delete secs[n]
      .dataset.user;

  }

  syncSec();

}


if(
  mq.addEventListener
){

  mq.addEventListener(
    "change",
    mqChange
  );

}else{

  mq.addListener(
    mqChange
  );

}


syncSec();


/* ---------- mobile Edit button ---------- */

document.getElementById(
  "editJump"
).addEventListener(
  "click",
  function(){

    document
      .querySelector(".ctl")
      .scrollIntoView({
        behavior:"smooth",
        block:"start"
      });

  }
);


/* ---------- start ---------- */

load("show");

})();