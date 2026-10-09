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

document.getElementById("print").addEventListener("click", function(){

  var button = this;
  button.disabled = true;
  button.textContent = "Preparing flyer...";

  say("Preparing your flyer for printing...");

  var z = +E.sz.value;
  var size = PX[z];
  var W = size[0];
  var H = size[1];

  var flyer = document.getElementById("fl");

  var clone = flyer.cloneNode(true);
  clone.removeAttribute("id");

  clone.querySelectorAll(".sel").forEach(function(el){
    el.classList.remove("sel");
  });

  var clonedPic = clone.querySelector("#oPic");
  if(clonedPic){
    clonedPic.removeAttribute("src");
    clonedPic.setAttribute("hidden", "");
    clonedPic.style.display = "none";
  }

  clone.style.width = W + "px";
  clone.style.height = H + "px";
  clone.style.aspectRatio = "auto";
  clone.style.boxShadow = "none";

  var css = "";
  document.querySelectorAll("style").forEach(function(s){
    css += s.textContent + "\n";
  });

  document.querySelectorAll('link[rel="stylesheet"]').forEach(function(link){
    try{
      if(link.sheet && link.sheet.cssRules){
        for(var i = 0; i < link.sheet.cssRules.length; i++){
          css += link.sheet.cssRules[i].cssText + "\n";
        }
      }
    }catch(e){}
  });

  css = css.replace(/&/g, "&amp;").replace(/</g, "&lt;");

  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '">' +
    '<foreignObject width="100%" height="100%">' +
    '<div xmlns="http://www.w3.org/1999/xhtml">' +
    '<style>' + css + '</style>' +
    new XMLSerializer().serializeToString(clone) +
    '</div></foreignObject></svg>';

  var renderImage = new Image();

  renderImage.onload = function(){

    var canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(renderImage, 0, 0, W, H);

    function openPrintPage(){
      canvas.toBlob(function(blob){

        button.disabled = false;
        button.textContent = "Print flyer";

        if(!blob){
          say("Could not prepare the flyer. Try Save as PNG.");
          return;
        }

        var imageURL = URL.createObjectURL(blob);

        canvas.toBlob(function(pdfBlob){
          try{
            var pdfLink = document.createElement("a");
            pdfLink.href = imageURL;
            pdfLink.download = "funflyer-" + W + "x" + H + ".png";
            pdfLink.style.display = "none";
            document.body.appendChild(pdfLink);
            pdfLink.click();
            document.body.removeChild(pdfLink);
            say("Flyer downloaded. Open it and print from your image viewer.");
          }catch(e){
            var printWindow = window.open("", "_blank");
            if(!printWindow){
              say("Could not open print window. Use Save as PNG instead.");
              return;
            }
            printWindow.document.open();
            printWindow.document.write(
              '<!DOCTYPE html><html><head>' +
              '<meta name="viewport" content="width=device-width, initial-scale=1">' +
              '<title>Print flyer</title>' +
              '<style>' +
              'html,body{margin:0;padding:0;width:100%;height:100%}' +
              'body{display:flex;justify-content:center;align-items:center}' +
              'img{display:block;width:auto;height:auto;max-width:100vw;max-height:100vh}' +
              '@media print{' +
              '@page{margin:0;size:auto}' +
              'body{margin:0;padding:0;width:100%;height:100%}' +
              'img{width:100%;height:auto}' +
              '}' +
              '</style></head><body>' +
              '<img src="' + imageURL + '" alt="Flyer">' +
              '</body></html>'
            );
            printWindow.document.close();
            setTimeout(function(){
              printWindow.focus();
              printWindow.print();
            }, 500);
          }
        }, "image/png");

      }, "image/png");
    }

    if(document.getElementById("oPic") && !document.getElementById("oPic").hidden && pic){
      var photoImage = new Image();
      photoImage.onload = function(){
        drawPhotoOnCanvas(ctx, canvas, photoImage);
        openPrintPage();
      };
      photoImage.onerror = function(){
        button.disabled = false;
        button.textContent = "Print flyer";
        say("Could not load the picture. Try Save as PNG.");
      };
      photoImage.src = pic;
    }else{
      openPrintPage();
    }
  };

  renderImage.onerror = function(){
    button.disabled = false;
    button.textContent = "Print flyer";
    say("Could not prepare the flyer. Try Save as PNG.");
  };

  renderImage.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);

});

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

/* ---------- pinch to zoom on mobile ---------- */

var pinchStart = null;

fl.addEventListener("touchstart", function(e){
  if(e.touches.length === 2){
    var t0 = e.touches[0];
    var t1 = e.touches[1];
    var dist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
    pinchStart = {dist: dist, el: null};
    
    /* find which item is being pinched */
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

  var z = PX[+E.sz.value];
  var W = z[0];
  var H = z[1];

  say("Making your PNG...");

  var n = fl.cloneNode(true);
  n.removeAttribute("id");
  n.querySelectorAll(".sel").forEach(function(e){
    e.classList.remove("sel");
  });

  /* Apply all transforms */
  Object.keys(T).forEach(function(id){
    var el = n.querySelector("#"+id);
    if(el && T[id]){
      var t = T[id];
      el.style.translate = t.x+"cqw "+t.y+"cqw";
      el.style.rotate = t.r+"deg";
      el.style.scale = t.s;
    }
  });

  /* KEEP the photo in the cloned flyer - don't hide it */
  var clonedPic = n.querySelector("#oPic");
  if(clonedPic && pic){
    /* Set it to display but don't hide - we'll render it from the data URL */
    clonedPic.src = pic;
    clonedPic.hidden = false;
  } else if(clonedPic){
    clonedPic.hidden = true;
  }

  n.style.width = W+"px";
  n.style.height = H+"px";
  n.style.aspectRatio = "auto";
  n.style.boxShadow = "none";

  var css = "";
  document.querySelectorAll("style").forEach(function(s){
    css += s.textContent + "\n";
  });

  document.querySelectorAll('link[rel="stylesheet"]').forEach(function(link){
    try{
      if(link.sheet && link.sheet.cssRules){
        for(var i=0;i<link.sheet.cssRules.length;i++){
          css += link.sheet.cssRules[i].cssText + "\n";
        }
      }
    }catch(e){}
  });

  css = css
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;");

  var svg =
    '<svg xmlns="http://www.w3.org/2000/svg"' +
    ' width="'+W+'" height="'+H+'">' +
      '<foreignObject width="100%" height="100%">' +
        '<div xmlns="http://www.w3.org/1999/xhtml">' +
          '<style>'+css+'</style>' +
          new XMLSerializer().serializeToString(n) +
        '</div>' +
      '</foreignObject>' +
    '</svg>';

  var flyerImg = new Image();

  flyerImg.onload = function(){
    try{
      var canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      var ctx = canvas.getContext("2d");

      ctx.drawImage(flyerImg, 0, 0, W, H);

      finishPng(canvas);

    }catch(err){
      console.error("PNG EXPORT ERROR:",err);
      say("Could not make the PNG. Screenshot the flyer instead.");
    }
  };

  flyerImg.onerror = function(){
    console.error("FLYER SVG EXPORT ERROR");
    say("Could not make the PNG. Screenshot the flyer instead.");
  };

  flyerImg.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}


/*
  Draw the uploaded photo onto the export canvas
  using the SAME position as the live flyer.
*/
function drawPhotoOnCanvas(ctx,canvas,photo){

  var livePic = document.getElementById("oPic");

  if(!livePic || livePic.hidden){
    return;
  }

  var flyerRect = fl.getBoundingClientRect();
  var picRect = livePic.getBoundingClientRect();

  if(
    !flyerRect.width ||
    !flyerRect.height ||
    !picRect.width ||
    !picRect.height
  ){
    return;
  }

  /* Use the T object transforms instead of browser coordinates */
  var t = T["oPic"];
  
  if(!t){
    return;
  }

  var scaleX = canvas.width / flyerRect.width;
  var scaleY = canvas.height / flyerRect.height;

  /* Get the live picture's base position and size */
  var x = (picRect.left - flyerRect.left) * scaleX;
  var y = (picRect.top - flyerRect.top) * scaleY;
  var w = picRect.width * scaleX;
  var h = picRect.height * scaleY;

  /* Apply the transforms from T */
  var cqwToPx = flyerRect.width / 100;
  var offsetX = t.x * cqwToPx * scaleX;
  var offsetY = t.y * cqwToPx * scaleY;
  var scale = t.s;
  var rotation = (t.r || 0) * Math.PI / 180;

  /* Calculate center with offset applied */
  var cx = x + w/2 + offsetX;
  var cy = y + h/2 + offsetY;

  ctx.save();

  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  ctx.rotate(-2 * Math.PI / 180);
  ctx.scale(scale, scale);

  ctx.drawImage(
    photo,
    -w/2,
    -h/2,
    w,
    h
  );

  ctx.restore();
}


/*
  Turn the finished canvas into the PNG.
*/
function finishPng(canvas){

  try{

    canvas.toBlob(function(blob){

      if(!blob){

        say(
          "Could not make the PNG. Screenshot the flyer instead."
        );

        return;
      }

      var out =
        document.getElementById("outimg");

      out.src =
        URL.createObjectURL(blob);

      out.style.display = "block";

      say(
        "Your PNG is ready below. Long-press it to save."
      );

      /* Scroll to the image on mobile */
      setTimeout(function(){
        out.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 100);

      if(typeof dl !== "undefined" && dl){

        dl.save({
          filename:
            "funflyer-"+canvas.width+"x"+canvas.height+".png",

          data:blob

        }).catch(function(){

        });

      }

    },"image/png");

  }catch(err){

    console.error("PNG FINISH ERROR:",err);

    say(
      "Could not make the PNG. Screenshot the flyer instead."
    );
  }
}
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
document.getElementById("save")
  .addEventListener(
    "click",
    savePng
  );

/* ---------- start ---------- */

load("show");

})();