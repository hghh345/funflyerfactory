(function () {

"use strict";

var P = {

  show: {

    head: "BASEMENT SHOW!!!", burst: "",

    sub: "3 bands. $5. Bring a friend.",

    body: "Doors at 7. Bring snacks to share.\nNo jerks.",

    when: "Fri Oct 22 @ 7pm\n418 Maple St (the basement)",

    tab: "BASEMENT SHOW FRI 7PM", wa: "1", font: "1",

    col: "0", pat: "0", bd: "2", dg: "★ ★ ★"

  },

  cat: {

    head: "HAVE YOU SEEN MITTENS?", burst: "",

    sub: "Orange cat. Very chatty.",

    body: "Last seen near the corner store.\nAnswers to treats, not her name.",

    when: "Call or text Dana\n555-0142",

    tab: "MITTENS 555-0142", wa: "0", font: "0",

    col: "2", pat: "0", bd: "3", dg: ""

  },

  sale: {

    head: "HUGE YARD SALE", burst: "",

    sub: "Everything must go",

    body: "Records, lamps, a bread maker,\nand one (1) exercise bike.",

    when: "Sat 8am to 2pm\n77 Elm Court",

    tab: "YARD SALE SAT 8AM", wa: "2", font: "5",

    col: "3", pat: "2", bd: "1", dg: "☺ ☺ ☺"

  },

  party: {

    head: "DANCE PARTY", burst: "",

    sub: "Wear something shiny",

    body: "DJ sets all night.\nCoat check is a chair.",

    when: "Sat Nov 6, 10pm\nThe Roller Rink",

    tab: "DANCE PARTY NOV 6", wa: "3", font: "0",

    col: "1", pat: "1", bd: "2", dg: "♪ ♫ ♪"

  }

};

var C = [

  ["#fff200", "#000", "#ff1493"],

  ["#ff9ee5", "#3a006f", "#00b7ff"],

  ["#fff", "#000", "#d00000"],

  ["#b6ff3b", "#1a1a8c", "#ff5a00"],

  ["#8fd8ff", "#00205b", "#ff00aa"],

  ["#ff2a2a", "#fff200", "#ffffff"],

  ["#7a2cff", "#ffffff", "#3cff9e"],

  ["#9ff5d0", "#003b2e", "#ff4fa3"],

  ["#ffcf33", "#6a0dad", "#ff3d00"],

  ["#ff9a1f", "#1a0033", "#fff200"]

];

var IDS = [

  "head", "burst", "sub", "body", "when", "tab",

  "wa", "font", "col", "pat", "bd", "dg",

  "sz", "tabs", "shape", "bw", "c0", "c1", "c2"

];

var E = {};

IDS.forEach(function (id) {

  E[id] = document.getElementById(id);

});

var fl = document.getElementById("fl");

var msg = document.getElementById("msg");

var pic = "";

var AR = ["8.5 / 11", "1 / 1", "4 / 5", "9 / 16"];

var EXPORT = [

  { w: 1275, h: 1650, label: "letter" },

  { w: 800, h: 800, label: "square" },

  { w: 1080, h: 1350, label: "4:5" },

  { w: 1080, h: 1920, label: "story" }

];

var T = Object.create(null);

var deleted = Object.create(null);

var sel = null;

var lastPNG = "";

var busy = false;

function g(id) {

  return document.getElementById(id);

}

function say(text) {

  msg.textContent = text;

}

var NAMES = {

  oHead: "Headline",

  oSub: "Subheading",

  oPic: "Picture",

  oDg: "Dingbats",

  oBody: "Details",

  oWhen: "When and where",

  oTabs: "Tear-off tabs"

};

var INPUT_TO_ITEM = {

  head: "oHead",

  sub: "oSub",

  body: "oBody",

  when: "oWhen",

  dg: "oDg",

  tab: "oTabs"

};

function resetTransforms() {

  T = Object.create(null);

  Object.keys(NAMES).forEach(function (id) {

    T[id] = { x: 0, y: 0, r: 0, s: 1 };

  });

}

function applyT(id) {

  var el = g(id);

  var t = T[id];

  if (!el || !t) return;

  el.style.translate = t.x + "cqw " + t.y + "cqw";

  el.style.rotate = t.r + "deg";

  el.style.scale = String(t.s);

}

function draw() {

  var colorIndex = Number(E.col.value);

  var c = colorIndex === 10

    ? [E.c0.value, E.c1.value, E.c2.value]

    : (C[colorIndex] || C[0]);

  g("cust").hidden = E.col.value !== "10";

  fl.style.setProperty("--bg", c[0]);

  fl.style.setProperty("--fg", c[1]);

  fl.style.setProperty("--ac", c[2]);

  fl.className =

    "flyer b" + E.bd.value +

    " p" + E.pat.value +

    " f" + E.font.value +

    " z" + E.sz.value +

    (E.bw.checked ? " bw" : "");

  fl.style.setProperty(

    "--ar",

    AR[Number(E.sz.value)] || AR[0]

  );

  var pc = g("oPic");

  if (pic) {

    pc.src = pic;

    pc.hidden = !!deleted.oPic;

  } else {

    pc.removeAttribute("src");

    pc.hidden = true;

  }

  var h = g("oHead");

  var shape = Number(E.shape.value);

  var headline = E.head.value;

  h.textContent = "";

  if (!shape) {

    h.textContent = headline;

    h.className = "head w" + E.wa.value;

  } else {

    h.className = "head";

    var clean = headline.replace(/\s+/g, " ").trim();

    var count = clean.replace(/ /g, "").length;

    var k = 0;

    clean.split(" ").forEach(function (word, wi) {

      if (wi) {

        h.appendChild(document.createTextNode(" "));

      }

      var wordSpan = document.createElement("span");

      wordSpan.className = "wd";

      word.split("").forEach(function (ch) {

        var letter = document.createElement("span");

        var t = (k - (count - 1) / 2) /

          Math.max(1, count / 2);

        var y, rot;

        if (shape === 1) {

          y = Math.sin(k * 0.9) * 1.6;

          rot = 0;

        } else if (shape === 2) {

          y = t * t * 6;

          rot = t * 20;

        } else {

          y = Math.sin(k * 12.9) * 1.2;

          rot = Math.sin(k * 7.7) * 8;

        }

        letter.className = "l w" + E.wa.value;

        letter.textContent = ch;

        letter.style.transform =

          "translateY(" + y.toFixed(2) +

          "cqw) rotate(" + rot.toFixed(1) + "deg)";

        wordSpan.appendChild(letter);

        k++;

      });

      h.appendChild(wordSpan);

    });

  }

  g("oSub").textContent = E.sub.value;

  g("oSub").style.display =

    E.sub.value ? "inline-block" : "none";

  g("oBody").textContent = E.body.value;

  g("oWhen").textContent = E.when.value;

  g("oDg").textContent = E.dg.value;

  var tabs = g("oTabs");

  tabs.style.display = E.tabs.checked ? "flex" : "none";

  E.tab.disabled = !E.tabs.checked;

  tabs.innerHTML = "";

  for (var n = 0; n < 8; n++) {

    var tab = document.createElement("div");

    tab.className = "tab";

    tab.textContent = E.tab.value;

    var tabTextLength = (E.tab.value || "").trim().length;

    var tabFontSize = Math.min(2.7, 18 / Math.max(1, tabTextLength * 0.55));

    tab.style.fontSize = tabFontSize + "cqw";

    tabs.appendChild(tab);

  }

  Object.keys(NAMES).forEach(function (id) {

    var el = g(id);

    if (!el) return;

    if (id !== "oPic") {

      el.hidden = !!deleted[id];

    }

    if (id === "oSub") {

      el.style.display =

        deleted[id] || !E.sub.value

          ? "none" : "inline-block";

    }

    if (id === "oDg") {

      el.style.display =

        deleted[id] || !E.dg.value

          ? "none" : "block";

    }

    if (id === "oTabs") {

      el.style.display =

        deleted[id] || !E.tabs.checked

          ? "none" : "flex";

    }

    applyT(id);

  });

}

function select(id) {

  document.querySelectorAll(".sel").forEach(function (el) {

    el.classList.remove("sel");

  });

  sel = id;

  ["rot", "siz", "rst", "del"].forEach(function (control) {

    g(control).disabled = !id;

  });

  if (!id) {

    g("selName").textContent =

      "Nothing selected. Click something on the flyer.";

    return;

  }

  var el = g(id);

  if (!el || el.hidden) {

    sel = null;

    ["rot", "siz", "rst", "del"].forEach(function (control) {

      g(control).disabled = true;

    });

    g("selName").textContent =

      "Nothing selected. Click something on the flyer.";

    return;

  }

  el.classList.add("sel");

  if (!T[id]) {

    T[id] = { x: 0, y: 0, r: 0, s: 1 };

  }

  g("rot").value = T[id].r;

  g("siz").value = Math.round(T[id].s * 100);

  g("selName").textContent = NAMES[id] || "Item";

}

function load(key) {

  var preset = P[key];

  if (!preset) return;

  Object.keys(preset).forEach(function (id) {

    if (E[id]) E[id].value = preset[id];

  });

  deleted = Object.create(null);

  resetTransforms();

  select(null);

  draw();

  g("exportOptions").hidden = true;

  lastPNG = "";

  g("outimg").hidden = true;

  say("Template loaded. Make it yours, then generate your flyer.");

}

IDS.forEach(function (id) {

  E[id].addEventListener("input", function () {

    var item = INPUT_TO_ITEM[id];

    if (item) deleted[item] = false;

    if (id === "sz") {

      g("exportOptions").hidden = true;

      lastPNG = "";

      g("outimg").hidden = true;

    }

    draw();

  });

  E[id].addEventListener("change", draw);

});

document.querySelectorAll("[data-t]").forEach(function (button) {

  button.addEventListener("click", function () {

    load(button.getAttribute("data-t"));

  });

});

g("rot").addEventListener("input", function () {

  if (sel && T[sel]) {

    T[sel].r = Number(this.value);

    applyT(sel);

  }

});

g("siz").addEventListener("input", function () {

  if (sel && T[sel]) {

    T[sel].s = Number(this.value) / 100;

    applyT(sel);

  }

});

g("rst").addEventListener("click", function () {

  if (!sel) return;

  T[sel] = { x: 0, y: 0, r: 0, s: 1 };

  applyT(sel);

  select(sel);

});

g("del").addEventListener("click", function () {

  if (!sel) return;

  if (sel === "oPic") {

    pic = "";

    g("file").value = "";

  }

  deleted[sel] = true;

  var old = sel;

  select(null);

  draw();

  say(

    (NAMES[old] || "Item") +

    " hidden. Change its text or load a template to bring it back."

  );

});

g("file").addEventListener("change", function (event) {

  var file = event.target.files && event.target.files[0];

  if (!file) return;

  if (!file.type || file.type.indexOf("image/") !== 0) {

    say("Please choose an image file.");

    return;

  }

  if (file.size > 15 * 1024 * 1024) {

    say("That image is over 15 MB. Please choose a smaller image.");

    event.target.value = "";

    return;

  }

  var objectURL = URL.createObjectURL(file);

  var image = new Image();

  image.onload = function () {

    try {

      var scale = Math.min(

        1,

        1600 / Math.max(image.naturalWidth, image.naturalHeight)

      );

      var canvas = document.createElement("canvas");

      canvas.width = Math.max(

        1, Math.round(image.naturalWidth * scale)

      );

      canvas.height = Math.max(

        1, Math.round(image.naturalHeight * scale)

      );

      var context = canvas.getContext("2d");

      context.drawImage(

        image, 0, 0, canvas.width, canvas.height

      );

      pic = canvas.toDataURL("image/jpeg", 0.9);

      deleted.oPic = false;

      draw();

      say("Picture added. Generate your flyer when you're ready.");

    } catch (error) {

      say("Couldn't process that picture. Try a JPG or PNG.");

    }

    URL.revokeObjectURL(objectURL);

  };

  image.onerror = function () {

    URL.revokeObjectURL(objectURL);

    say("That file wouldn't open as an image. Try a JPG or PNG.");

  };

  image.src = objectURL;

});

g("nopic").addEventListener("click", function () {

  pic = "";

  g("file").value = "";

  deleted.oPic = false;

  draw();

  say("Picture removed.");

});

function makeDraggable(el) {

  if (!el) return;

  el.setAttribute("data-d", "1");

  el.addEventListener("pointerdown", function (event) {

    if (event.button !== undefined && event.button !== 0) return;

    if (el.hidden) return;

    var id = el.id;

    if (!T[id]) {

      T[id] = { x: 0, y: 0, r: 0, s: 1 };

    }

    select(id);

    var start = {

      id: id,

      pointerId: event.pointerId,

      px: event.clientX,

      py: event.clientY,

      x: T[id].x,

      y: T[id].y

    };

    try {

      el.setPointerCapture(event.pointerId);

    } catch (_) {}

    function move(e) {

      if (e.pointerId !== start.pointerId) return;

      var unit = fl.getBoundingClientRect().width / 100;

      if (!unit) return;

      T[id].x = start.x + (e.clientX - start.px) / unit;

      T[id].y = start.y + (e.clientY - start.py) / unit;

      applyT(id);

      e.preventDefault();

    }

    function end(e) {

      if (e.pointerId !== start.pointerId) return;

      el.removeEventListener("pointermove", move);

      el.removeEventListener("pointerup", end);

      el.removeEventListener("pointercancel", end);

    }

    el.addEventListener("pointermove", move);

    el.addEventListener("pointerup", end);

    el.addEventListener("pointercancel", end);

    event.preventDefault();

    event.stopPropagation();

  });

}

Object.keys(NAMES).forEach(function (id) {

  makeDraggable(g(id));

});

fl.addEventListener("pointerdown", function (event) {

  var target = event.target;

  var item = target && target.closest

    ? target.closest("[data-d]")

    : null;

  if (!item || !fl.contains(item)) select(null);

});

g("editJump").addEventListener("click", function () {

  g("head").scrollIntoView({

    behavior: "smooth",

    block: "center"

  });

  g("head").focus({ preventScroll: true });

});

async function waitForImages(root) {

  var images = Array.prototype.slice.call(

    root.querySelectorAll("img")

  );

  await Promise.all(images.map(function (image) {

    if (image.hidden || !image.src) {

      return Promise.resolve();

    }

    if (image.complete && image.naturalWidth > 0) {

      return Promise.resolve();

    }

    if (image.decode) {

      return image.decode().catch(function () {});

    }

    return new Promise(function (resolve) {

      image.onload = resolve;

      image.onerror = resolve;

    });

  }));

}

function prepareCloneForCanvas(clone) {

var headline = clone.querySelector("#oHead");

var styleIndex = Number(E.wa.value);

var palettes = {

  1: [

    "#ff2020", "#ff8a00", "#ffe600", "#18b83c",

    "#008cff", "#8b35ff", "#ff42b8"

  ],

  4: [

    "#ffffff", "#b8d9ff", "#5b77a9", "#f4f8ff",

    "#7d9acb", "#eaf4ff", "#ffffff"

  ],

  5: [

    "#fff200", "#ffb000", "#ff6a00", "#e51b00",

    "#ff8a00", "#ffe600", "#cf1600"

  ]

};

if (headline && palettes[styleIndex]) {

  if (!headline.querySelector(".l")) {

    var text = headline.textContent || "";

    headline.textContent = "";

    text.split(/(\s+)/).forEach(function (part) {

      if (!part) return;

      if (/^\s+$/.test(part)) {

        headline.appendChild(document.createTextNode(part));

        return;

      }

      var word = document.createElement("span");

      word.className = "wd";

      Array.from(part).forEach(function (character) {

        var letter = document.createElement("span");

        letter.className = "l export-wordart-letter";

        letter.textContent = character;

        word.appendChild(letter);

      });

      headline.appendChild(word);

    });

  }

  ["w1", "w4", "w5"].forEach(function (name) {

    headline.classList.remove(name);

  });

  headline.querySelectorAll(".l").forEach(function (letter, index) {

    ["w1", "w4", "w5"].forEach(function (name) {

      letter.classList.remove(name);

    });

    var color = palettes[styleIndex][index % palettes[styleIndex].length];

    letter.style.background = "none";

    letter.style.backgroundImage = "none";

    letter.style.backgroundClip = "border-box";

    letter.style.webkitBackgroundClip = "border-box";

    letter.style.setProperty("color", color, "important");

    letter.style.setProperty("-webkit-text-fill-color", color, "important");

    letter.style.filter = "none";

    if (styleIndex === 1) {

      letter.style.webkitTextStroke = "0.3cqw #000";

      letter.style.textShadow = "0.8cqw 0.8cqw 0 #000";

    } else if (styleIndex === 4) {

      letter.style.webkitTextStroke = "0.35cqw #002044";

      letter.style.textShadow = "0.7cqw 0.7cqw 0 rgba(0,0,0,.55)";

    } else {

      letter.style.webkitTextStroke = "0.4cqw #3b0000";

      letter.style.textShadow = "0.6cqw 0.6cqw 0 #000";

    }

  });

}

var tabText = (E.tab.value || "").trim();

var tabFontSize = Math.min(2.7, 18 / Math.max(1, tabText.length * 0.55));

clone.querySelectorAll(".tab").forEach(function (tab) {

  tab.style.setProperty("font-size", tabFontSize + "cqw", "important");

  tab.style.setProperty("white-space", "nowrap", "important");

  tab.style.setProperty("overflow", "hidden", "important");

  tab.style.setProperty("writing-mode", "vertical-rl", "important");

  tab.style.setProperty("-webkit-writing-mode", "vertical-rl", "important");

  tab.style.setProperty("text-orientation", "mixed", "important");

  tab.style.setProperty("transform", "rotate(180deg)", "important");

  tab.style.setProperty("-webkit-transform", "rotate(180deg)", "important");

  tab.style.setProperty("box-sizing", "border-box", "important");

});

}

async function generatePNG() {

  busy = true;

  g("generate").disabled = true;

  g("generate").textContent = "Generating…";

  say("Making your flyer image…");

  var stage = document.createElement("div");

  var clone = fl.cloneNode(true);

  var format = EXPORT[Number(E.sz.value)] || EXPORT[0];

  try {

    select(null);

    clone.querySelectorAll(".sel").forEach(function (el) {

      el.classList.remove("sel");

    });

    clone.style.width = format.w + "px";

    clone.style.maxWidth = "none";

    clone.style.height = "auto";

    clone.style.margin = "0";

    clone.style.boxShadow = "none";

    clone.style.position = "relative";

    clone.style.left = "auto";

    clone.style.top = "auto";

    stage.setAttribute("aria-hidden", "true");

    stage.style.cssText =

      "position:fixed;left:-20000px;top:0;width:" +

      format.w +

      "px;z-index:-1;pointer-events:none;overflow:hidden;" +

      "background:transparent;";

    stage.appendChild(clone);

    document.body.appendChild(stage);

    prepareCloneForCanvas(clone);

    if (document.fonts && document.fonts.ready) {

      await document.fonts.ready;

    }

    await waitForImages(clone);

    await new Promise(function (resolve) {

      requestAnimationFrame(function () {

        requestAnimationFrame(resolve);

      });

    });

    var canvas = await window.html2canvas(clone, {

      backgroundColor: null,

      scale: 1,

      width: format.w,

      height: format.h,

      windowWidth: format.w,

      windowHeight: format.h,

      useCORS: true,

      allowTaint: false,

      logging: false,

      imageTimeout: 15000

    });

    var ratio = format.w / format.h;

    if (Math.abs(canvas.width / canvas.height - ratio) > 0.01) {

      var cropped = document.createElement("canvas");

      cropped.width = format.w;

      cropped.height = format.h;

      var ctx = cropped.getContext("2d");

      ctx.fillStyle = "#ffffff";

      ctx.fillRect(0, 0, cropped.width, cropped.height);

      var scale = Math.min(

        format.w / canvas.width,

        format.h / canvas.height

      );

      var dw = canvas.width * scale;

      var dh = canvas.height * scale;

      ctx.drawImage(

        canvas,

        (format.w - dw) / 2,

        (format.h - dh) / 2,

        dw,

        dh

      );

      canvas = cropped;

    }

if (clone.classList.contains("bw")) {

var bwContext = canvas.getContext("2d");

var pixels = bwContext.getImageData(

  0, 0, canvas.width, canvas.height

);

var data = pixels.data;

for (var i = 0; i < data.length; i += 4) {

  var gray = Math.round(

    data[i] * 0.299 +

    data[i + 1] * 0.587 +

    data[i + 2] * 0.114

  );

  data[i] = gray;

  data[i + 1] = gray;

  data[i + 2] = gray;

}

bwContext.putImageData(pixels, 0, 0);

}

    lastPNG = canvas.toDataURL("image/png");

    g("outimg").src = lastPNG;

    g("outimg").hidden = false;

    g("exportOptions").hidden = false;

    say("Your flyer is ready! Download the PNG or print it below.");

  } catch (error) {

    console.error("Flyer export failed:", error);

    say(

      "Couldn't generate the flyer image this time. " +

      "Please reload and try once more; your design is still here."

    );

  } finally {

    if (stage.parentNode) {

      stage.parentNode.removeChild(stage);

    }

    busy = false;

    g("generate").disabled = false;

    g("generate").textContent = "Generate my flyer!";

  }

}

g("generate").addEventListener("click", generatePNG);

g("download").addEventListener("click", function () {

  if (!lastPNG) {

    say("Generate your flyer first.");

    return;

  }

  var link = document.createElement("a");

  link.href = lastPNG;

  link.download = "my-fun-flyer.png";

  document.body.appendChild(link);

  link.click();

  link.remove();

  say("Your PNG download should be starting.");

});

g("print").addEventListener("click", function () {

  if (!lastPNG) {

    say("Generate your flyer first.");

    return;

  }

  var format = EXPORT[Number(E.sz.value)] || EXPORT[0];

  var printWindow = window.open("", "_blank");

  if (!printWindow) {

    say(

      "Your browser blocked the print window. Allow pop-ups " +

      "for this site, then try Print flyer again."

    );

    return;

  }

  var pageCSS = Number(E.sz.value) === 0

    ? "@page{size:letter portrait;margin:.5in}" +

      ".sheet{width:7.5in;height:10in}"

    : "@page{size:auto;margin:.25in}" +

      ".sheet{width:min(100%,7.5in);max-height:10in}" +

      ".sheet img{max-height:10in;width:auto;" +

      "max-width:100%;object-fit:contain}";

  printWindow.document.open();

  printWindow.document.write(

    "<!doctype html><html><head>" +

    "<meta charset='utf-8'>" +

    "<title>My fun flyer</title>" +

    "<style>" +

    "html,body{margin:0;padding:0;background:#fff}" +

    "body{display:flex;justify-content:center;align-items:flex-start}" +

    ".sheet{margin:0 auto;display:flex;justify-content:center;" +

    "align-items:flex-start}" +

    ".sheet img{display:block;width:100%;height:auto}" +

    pageCSS +

    "@media screen{body{padding:16px}.sheet{max-width:100%}}" +

    "</style></head><body>" +

    "<div class='sheet'><img id='printImage' alt='My flyer'>" +

    "</div></body></html>"

  );

  printWindow.document.close();

  var printImage = printWindow.document.getElementById("printImage");

  var didPrint = false;

  function startPrint() {

    if (didPrint) return;

    didPrint = true;

    printWindow.focus();

    printWindow.print();

  }

  printImage.onload = startPrint;

  printImage.onerror = function () {

    printWindow.close();

    say("Couldn't open the flyer for printing. Please download the PNG instead.");

  };

  printImage.src = lastPNG;

  if (printImage.complete && printImage.naturalWidth) {

    startPrint();

  }

});

var mq = window.matchMedia("(min-width:661px)");

var sections = document.querySelectorAll("details.sec");

function syncSections() {

  sections.forEach(function (section) {

    if (mq.matches) {

      section.dataset.locked = "1";

      section.open = true;

    } else {

      delete section.dataset.locked;

      if (!section.dataset.user) {

        section.open = false;

      }

    }

  });

}

sections.forEach(function (section) {

  section.addEventListener("toggle", function () {

    if (section.dataset.locked) {

      section.open = true;

      return;

    }

    if (!mq.matches) {

      section.dataset.user = "1";

    }

  });

});

function mqChange() {

  sections.forEach(function (section) {

    delete section.dataset.user;

  });

  syncSections();

}

if (mq.addEventListener) {

  mq.addEventListener("change", mqChange);

} else {

  mq.addListener(mqChange);

}

resetTransforms();

select(null);

load("show");

})();