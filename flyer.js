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
  "head","burst","sub","body","when","tab",
  "wa","font","col","pat","bd","dg","sz",
  "tabs","shape","bw","c0","c1","c2"
];

var E={};

ids.forEach(function(i){
  E[i]=document.getElementById(i);
  E[i].addEventListener("input",draw);
});


var fl=document.getElementById("fl");
var pic="";
var AR=["8.5/11","1/1","4/5","9/16"];
var PX=[[1275,1650],[800,800],[1080,1350],[1080,1920]];
var msg=document.getElementById("msg");


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

fl.style.setProperty("--star","polygon("+pts.join(",")+")");


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
    "flyer b"+E.bd.value+
    " p"+E.pat.value+
    " f"+E.font.value+
    " z"+E.sz.value+
    (E.bw.checked?" bw":"");

  fl.style.setProperty("--ar",AR[+E.sz.value]);

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

    var cs=tx.replace(/\s+/g," ").trim();
    var n=cs.replace(/ /g,"").length;
    var k=0;

    cs.split(" ").forEach(function(w,wi){

      if(wi){
        h.appendChild(document.createTextNode(" "));
      }

      var ws=document.createElement("span");
      ws.className="wd";

      w.split("").forEach(function(ch){

        var l=document.createElement("span");
        var t=(k-(n-1)/2)/Math.max(1,n/2);
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
          "translateY("+y.toFixed(2)+"cqw) rotate("+
          r.toFixed(1)+"deg)";

        ws.appendChild(l);
        k++;

      });

      h.appendChild(ws);

    });

  }

  /* text */

  var s=document.getElementById("oSub");
  s.textContent=E.sub.value;
  s.style.display=E.sub.value?"inline-block":"none";

  document.getElementById("oBody").textContent=E.body.value;
  document.getElementById("oWhen").textContent=E.when.value;
  document.getElementById("oDg").textContent=E.dg.value;

  /* sticker */

  var b=document.getElementById("oBurst");
  b.textContent=E.burst.value;
  b.style.display=E.burst.value?"flex":"none";

  /* tear-offs */

  var t=document.getElementById("oTabs");
  t.style.display=E.tabs.checked?"flex":"none";
  E.tab.disabled=!E.tabs.checked;

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
    load(b.getAttribute("data-t"));
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


/* ---------- bake cqw-derived values as px ---------- */
/* Chrome's SVG foreignObject doesn't resolve container query
   units (cqw) reliably — it treats them as 0. Bake computed
   styles as inline px before rasterizing so every browser
   renders the clone identically. */

function bakeLayoutPx(root){
  var PROPS=[
    'font-size','letter-spacing','line-height','word-spacing',
    'padding-top','padding-right','padding-bottom','padding-left',
    'margin-top','margin-right','margin-bottom','margin-left',
    'border-top-width','border-right-width','border-bottom-width','border-left-width',
    'top','right','bottom','left',
    'outline-width','outline-offset',
    'text-shadow','box-shadow','filter',
    'transform','translate','rotate','scale',
    'width','height','max-width','max-height','min-width','min-height',
    '-webkit-text-stroke','-webkit-text-stroke-width'
  ];
  var saved=[];

  function walk(el){
    var cs;
    try{cs=getComputedStyle(el);}catch(e){return;}
    var orig=el.getAttribute('style')||'';
    for(var i=0;i<PROPS.length;i++){
      var p=PROPS[i];
      var v=cs.getPropertyValue(p);
      if(!v)continue;
      v=v.trim();
      if(!v||v==='none'||v==='normal'||v==='auto'||v==='0px'||v==='1')continue;
      try{el.style.setProperty(p,v,'important');}catch(e){}
    }
    saved.push({el:el,style:orig});
    for(var j=0;j<el.children.length;j++)walk(el.children[j]);
  }

  walk(root);

  return function restore(){
    for(var i=0;i<saved.length;i++){
      var s=saved[i];
      if(s.style)s.el.setAttribute('style',s.style);
      else s.el.removeAttribute('style');
    }
  };
}


/* ---------- save / export PNG ---------- */

document.getElementById("save").addEventListener("click", async function () {
  var button = this;
  var originalText = button.textContent;
  var flyer = document.getElementById("fl");
  var picture = document.getElementById("oPic");
  var selectedElements = [];
  var restoreLayout = null;
  var savedVis = "";
  var photoGeom = null;

  if (button.disabled) return;
  button.disabled = true;
  button.textContent = "Making your flyer...";
  say("Preparing your flyer...");

  try {
    if (typeof htmlToImage === "undefined" || typeof htmlToImage.toCanvas !== "function") {
      throw new Error("The image library didn't load. Refresh and try again.");
    }

    if (document.fonts && document.fonts.ready) {
      try { await document.fonts.ready; } catch (e) {}
    }

    var hasPhoto = !!(pic && picture && !picture.hidden);

    /* If there's no photo, temporarily detach the img so html-to-image
       never sees an src-less <img> (which makes it reject with a raw Event). */
    var picParent = null, picNext = null;
    if (!hasPhoto && picture && picture.parentNode) {
      picParent = picture.parentNode;
      picNext = picture.nextSibling;
      picture.remove();
    }

    /* --- measure photo geometry, then hide it --- */
    if (hasPhoto) {
      try { await picture.decode(); } catch (e) {}

      savedVis = picture.style.visibility;

      var sT = picture.style.translate;
      var sR = picture.style.rotate;
      var sS = picture.style.scale;
      var sF = picture.style.transform;

      picture.style.translate = "none";
      picture.style.rotate = "none";
      picture.style.scale = "none";
      picture.style.transform = "none";
      void picture.offsetWidth;

      var pr = picture.getBoundingClientRect();
      var fr0 = flyer.getBoundingClientRect();
      var t = T["oPic"] || { x: 0, y: 0, r: 0, s: 1 };

      photoGeom = {
        left: pr.left - fr0.left,
        top: pr.top - fr0.top,
        w: pr.width,
        h: pr.height,
        flyerW: fr0.width,
        flyerH: fr0.height,
        tx: t.x || 0,
        ty: t.y || 0,
        tr: t.r || 0,
        ts: t.s || 1
      };

      picture.style.translate = sT;
      picture.style.rotate = sR;
      picture.style.scale = sS;
      picture.style.transform = sF;
      picture.style.visibility = "hidden";
    }

    /* --- clear selection outlines --- */
    flyer.querySelectorAll(".sel").forEach(function (el) {
      selectedElements.push(el);
      el.classList.remove("sel");
    });

    var sizeIndex = Number(E.sz.value) || 0;
    var size = PX[sizeIndex] || PX[0];
    var W = size[0];
    var H = size[1];

    var fr2 = flyer.getBoundingClientRect();
    var pixelRatio = W / fr2.width;

    /* --- bake cqw values as px for this render --- */
    restoreLayout = bakeLayoutPx(flyer);
    if (hasPhoto) picture.style.visibility = "hidden";
    if (!hasPhoto && picture && picture.parentNode) picture.remove();

    var canvas;
    try {
      canvas = await htmlToImage.toCanvas(flyer, {
        pixelRatio: pixelRatio,
        backgroundColor: null,
        skipFonts: true,
        filter: function (node) {
          return !(node && node.id === "oPic");
        }
      });
    } finally {
      restoreLayout();
      restoreLayout = null;
      if (hasPhoto) picture.style.visibility = "hidden";
    }

    /* --- composite the photo manually --- */
    if (photoGeom) {
      await new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () {
          try {
            var sx = canvas.width / photoGeom.flyerW;
            var sy = canvas.height / photoGeom.flyerH;

            var cx = (photoGeom.left + photoGeom.w / 2) * sx;
            var cy = (photoGeom.top + photoGeom.h / 2) * sy;
            var w = photoGeom.w * sx;
            var h = photoGeom.h * sy;

            var ox = photoGeom.tx * (photoGeom.flyerW / 100) * sx;
            var oy = photoGeom.ty * (photoGeom.flyerW / 100) * sy;

            var rot = (-2 + photoGeom.tr) * Math.PI / 180;
            var s = photoGeom.ts;

            var ctx = canvas.getContext("2d");
            ctx.save();
            ctx.translate(cx + ox, cy + oy);
            ctx.rotate(rot);
            ctx.scale(s, s);
            ctx.drawImage(img, -w / 2, -h / 2, w, h);
            ctx.restore();
            resolve();
          } catch (e) { reject(e); }
        };
        img.onerror = function () { reject(new Error("Photo couldn't be loaded.")); };
        img.src = pic;
      });
    }

    var blob = await new Promise(function (resolve) {
      canvas.toBlob(resolve, "image/png");
    });
    if (!blob) throw new Error("The PNG couldn't be created.");

    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = "funflyer-" + W + "x" + H + ".png";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 10000);

    var outimg = document.getElementById("outimg");
    if (outimg) {
      if (outimg.dataset.url) URL.revokeObjectURL(outimg.dataset.url);
      var previewUrl = URL.createObjectURL(blob);
      outimg.src = previewUrl;
      outimg.dataset.url = previewUrl;
      outimg.style.display = "block";
    }

    say("Your flyer is ready! Check your downloads.");

  } catch (err) {
    console.error("Flyer export failed:", err);
    say("Couldn't make the PNG. " + (err && err.message ? err.message : ""));
  } finally {
    if (restoreLayout) { try { restoreLayout(); } catch (e) {} }
    if (picture) picture.style.visibility = savedVis;
    if (picParent && picNext) picParent.insertBefore(picture, picNext);
    else if (picParent) picParent.appendChild(picture);
    selectedElements.forEach(function (el) { el.classList.add("sel"); });
    button.disabled = false;
    button.textContent = originalText;
  }
});


/* ---------- picture upload ---------- */

document.getElementById("file")
  .addEventListener(
    "change",
    function(e){

      var f=e.target.files[0];
      if(!f)return;

      var u=URL.createObjectURL(f);
      var im=new Image();

      im.onload=function(){

        var m=Math.min(1,1200/Math.max(im.width,im.height));

        var c=document.createElement("canvas");
        c.width=Math.round(im.width*m);
        c.height=Math.round(im.height*m);

        c.getContext("2d").drawImage(im,0,0,c.width,c.height);

        pic=c.toDataURL("image/jpeg",.88);

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
      document.getElementById("file").value="";
      draw();
    }
  );


E.tabs.addEventListener("change",draw);


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

  e.style.translate=t.x+"cqw "+t.y+"cqw";
  e.style.rotate=t.r+"deg";
  e.style.scale=t.s;

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

  ["rot","siz","rst","del"].forEach(function(i){
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
      T[id]={x:0,y:0,r:0,s:1};
      t=T[id];
    }

    g("rot").value=t.r;
    g("siz").value=Math.round(t.s*100);

    g("selName").textContent=
      NAMES[id] || "Item";

  }else{

    g("selName").textContent=
      "Nothing selected. Click something on the flyer.";

  }

}


/* ---------- controls ---------- */

g("rot").addEventListener("input",function(){
  if(sel){
    T[sel].r=+this.value;
    applyT(sel);
  }
});


g("siz").addEventListener("input",function(){
  if(sel){
    T[sel].s=this.value/100;
    applyT(sel);
  }
});


g("rst").addEventListener("click",function(){
  if(sel){
    T[sel]={x:0,y:0,r:0,s:1};
    applyT(sel);
    select(sel);
  }
});


/* ---------- delete selected item ---------- */

g("del").addEventListener("click",function(){

  if(!sel)return;

  var el=g(sel);
  if(!el)return;

  if(sel==="oPic"){
    pic="";
    g("file").value="";
    T[sel]={x:0,y:0,r:0,s:1};
    select(null);
    draw();
    return;
  }

  el.remove();
  delete T[sel];
  select(null);

});


/* ---------- draggable items ---------- */

var dr=null;

function makeDraggable(el){

  if(!el)return;

  el.setAttribute("data-d","1");
  el.style.touchAction="none";
  el.style.userSelect="none";
  el.style.webkitUserSelect="none";

  el.addEventListener("pointerdown",function(e){

    var id=el.id;

    if(!T[id]){
      T[id]={x:0,y:0,r:0,s:1};
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
      el.setPointerCapture(e.pointerId);
    }catch(x){}

    e.preventDefault();
    e.stopPropagation();

  });

  el.addEventListener("pointermove",function(e){

    if(!dr || dr.el!==el || dr.pointerId!==e.pointerId){
      return;
    }

    var u=fl.getBoundingClientRect().width/100;
    var t=T[dr.id];

    t.x=dr.x+(e.clientX-dr.px)/u;
    t.y=dr.y+(e.clientY-dr.py)/u;

    applyT(dr.id);

    e.preventDefault();

  });

  el.addEventListener("pointerup",function(e){
    if(dr && dr.el===el && dr.pointerId===e.pointerId){
      dr=null;
    }
  });

  el.addEventListener("pointercancel",function(e){
    if(dr && dr.el===el && dr.pointerId===e.pointerId){
      dr=null;
    }
  });

}

/* ---------- pinch to zoom on mobile ---------- */

var pinchStart = null;

fl.addEventListener("touchstart", function(e){
  if(e.touches.length === 2){
    var t0 = e.touches[0];
    var t1 = e.touches[1];
    var dist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
    pinchStart = {dist: dist, el: null};

    var midX = (t0.clientX + t1.clientX) / 2;
    var midY = (t0.clientY + t1.clientY) / 2;
    var elem = document.elementFromPoint(midX, midY);
    if(elem && elem.closest("[data-d]")){
      pinchStart.el = elem.closest("[data-d]");
      pinchStart.id = pinchStart.el.id;
    }
  }
}, false);

fl.addEventListener("touchmove", function(e){
  if(e.touches.length === 2 && pinchStart && pinchStart.el){
    var t0 = e.touches[0];
    var t1 = e.touches[1];
    var dist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
    var ratio = dist / pinchStart.dist;

    var id = pinchStart.id;
    if(!T[id]) T[id] = {x:0, y:0, r:0, s:1};

    T[id].s = Math.max(0.5, Math.min(3, T[id].s * ratio));
    applyT(id);

    pinchStart.dist = dist;
    e.preventDefault();
  }
}, false);

fl.addEventListener("touchend", function(e){
  if(e.touches.length < 2){
    pinchStart = null;
  }
}, false);

/* ---------- built-in flyer elements ---------- */

Object.keys(NAMES).forEach(function(id){

  var el=g(id);
  if(!el)return;

  el.setAttribute("data-d","1");

  T[id]={x:0,y:0,r:0,s:1};

  makeDraggable(el);

});


/* ---------- clicking the flyer ---------- */

fl.addEventListener("pointerdown",function(e){

  var target=e.target;
  var el=null;

  if(target && target.closest){
    el=target.closest("[data-d]");
  }

  if(!el || !fl.contains(el)){
    select(null);
  }

});


/* ---------- collapsible sections ---------- */

var mq=window.matchMedia("(min-width:661px)");
var secs=document.querySelectorAll("details.sec");

function syncSec(){

  for(var n=0;n<secs.length;n++){

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


for(var n=0;n<secs.length;n++)(function(d){

  d.addEventListener("toggle",function(){

    if(d.dataset.locked){
      d.open=true;
      return;
    }

    if(!mq.matches){
      d.dataset.user="1";
    }

  });

})(secs[n]);


function mqChange(){

  for(var n=0;n<secs.length;n++){
    delete secs[n].dataset.user;
  }

  syncSec();

}


if(mq.addEventListener){
  mq.addEventListener("change",mqChange);
}else{
  mq.addListener(mqChange);
}


syncSec();


/* ---------- mobile Edit button ---------- */

document.getElementById("editJump").addEventListener("click",function(){
  document.querySelector(".ctl").scrollIntoView({
    behavior:"smooth",
    block:"start"
  });
});


/* ---------- start ---------- */

load("show");

})();