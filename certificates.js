/* =====================================================
   certificates.js
   ส่วนที่ 1: ข้อมูลใบประกาศ  <-- คุณแก้ไขเฉพาะส่วนนี้เท่านั้น
   ส่วนที่ 2: โค้ดสร้างการ์ด  <-- ไม่ต้องแก้
   ===================================================== */

/* ---------- ส่วนที่ 1: ข้อมูลใบประกาศ ----------
   - 1 ก้อน { ... } = 1 ใบประกาศ
   - ใบที่อยู่บนสุดจะแสดงเป็นใบแรก (ใส่ใบใหม่ไว้บนสุดได้เลย)
   - ต้องมีเครื่องหมายจุลภาค "," คั่นระหว่างแต่ละก้อน (ก้อนสุดท้ายไม่ต้องมี)
   - ช่องที่ไม่มีข้อมูล ให้ปล่อยเป็น "" ได้ เว็บจะไม่แสดงช่องนั้น
   - ชื่อไฟล์ใช้ตัวพิมพ์เล็ก ภาษาอังกฤษ ไม่มีช่องว่าง เช่น cert-01.jpg
*/
const certificates = [
  {
    title: "เกียรติบัตรเข้าร่วมกิจกรรมวิชาการด้านไอที",      // ชื่อใบประกาศ
    course: "กิจกรรมและเวิร์กชอปเสริมสร้างทักษะวิชาชีพด้านไอที", // ชื่อหลักสูตร/กิจกรรม
    issuer: "มหาวิทยาลัยศรีปทุม",                          // หน่วยงานที่ออก
    date: "",                                              // วันที่ได้รับ เช่น "15 มีนาคม 2568"
    image: "images/certificates/cert-01.jpg",              // รูปใบประกาศ
    file: "files/certificates/cert-03.pdf",                // ไฟล์ PDF (ถ้ามี) เช่น "files/certificates/cert-01.pdf"
    link: "https://www.linkedin.com/in/teerapat-kamyuang-30a605290/" // ลิงก์ภายนอก (ถ้ามี)
  },
  {
    title: "Web Development & Programming Fundamentals",
    course: "ความรู้พื้นฐานด้านการเขียนโปรแกรมและการพัฒนาเว็บไซต์",
    issuer: "",
    date: "",
    image: "images/certificates/cert-02.jpg",
    file: "",
    link: ""
  }
];


/* ---------- ส่วนที่ 2: โค้ดสร้างการ์ด (ไม่ต้องแก้) ---------- */
(function () {
  var list = document.getElementById("cert-list");
  var emptyBox = document.getElementById("cert-empty");

  // สร้างแท็ก HTML พร้อมข้อความ (ใช้ textContent เพื่อความปลอดภัย)
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  // กันลิงก์อันตราย เช่น javascript: ผ่านได้เฉพาะลิงก์ปกติ
  function safeUrl(url) {
    if (!url || /^\s*(javascript|data):/i.test(url)) return "";
    return url;
  }

  // กล่องข้อความเมื่อไม่มีรูป / หารูปไม่เจอ
  function missingBox(message) {
    var box = el("div", "cert-img-missing");
    box.appendChild(el("span", "glyphicon glyphicon-picture"));
    box.appendChild(el("span", "", message));
    return box;
  }

  // สร้างรูป ถ้าโหลดไม่ได้จะเปลี่ยนเป็นข้อความแจ้งแทน
  function makeImage(src, alt, className) {
    var wrap = el("div", className);
    if (!src) {
      wrap.appendChild(missingBox("ยังไม่มีรูปใบประกาศ"));
      return wrap;
    }
    var img = el("img");
    img.src = src;
    img.alt = alt;
    img.loading = "lazy";
    img.addEventListener("error", function () {
      wrap.textContent = "";
      wrap.appendChild(missingBox("ไม่พบไฟล์รูป: " + src));
    });
    wrap.appendChild(img);
    return wrap;
  }

  // สร้างปุ่มลิงก์ที่เปิดแท็บใหม่ (rel ป้องกันหน้าใหม่ควบคุมหน้าเรา)
  function makeLink(url, label, className) {
    var a = el("a", className, label);
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    return a;
  }

  // เปิด Popup แสดงใบประกาศขนาดใหญ่
  function openModal(c) {
    document.getElementById("certModalTitle").textContent = c.title;

    var body = document.getElementById("certModalBody");
    body.textContent = "";
    body.appendChild(makeImage(c.image, c.title, "cert-modal-img"));

    var actions = document.getElementById("certModalActions");
    actions.textContent = "";
    if (safeUrl(c.file)) actions.appendChild(makeLink(safeUrl(c.file), "เปิดไฟล์ PDF", "btn btn-primary"));
    if (safeUrl(c.link)) actions.appendChild(makeLink(safeUrl(c.link), "ดูเอกสารต้นฉบับ", "btn btn-default"));

    $("#certModal").modal("show");
  }

  // สร้างการ์ด 1 ใบ
  function buildCard(c) {
    var card = el("article", "cert-card");
    card.appendChild(makeImage(c.image, c.title, "cert-thumb"));

    var body = el("div", "cert-body");
    if (c.issuer) body.appendChild(el("span", "card-tag", c.issuer));
    body.appendChild(el("h3", "cert-title", c.title));
    if (c.course) body.appendChild(el("p", "cert-course", c.course));
    if (c.date) body.appendChild(el("p", "cert-date", "ได้รับเมื่อ: " + c.date));

    var actions = el("div", "cert-actions");
    var pdf = safeUrl(c.file);
    if (!c.image && pdf) {
      // มีแต่ PDF ไม่มีรูป -> เปิด PDF ในแท็บใหม่เลย
      actions.appendChild(makeLink(pdf, "View Certificate", "btn btn-primary"));
    } else {
      var btn = el("button", "btn btn-primary", "View Certificate");
      btn.type = "button";
      btn.addEventListener("click", function () { openModal(c); });
      actions.appendChild(btn);
    }
    body.appendChild(actions);

    card.appendChild(body);
    return card;
  }

  // เริ่มทำงาน: ถ้าไม่มีใบประกาศ ให้โชว์ข้อความแจ้ง
  if (!certificates || certificates.length === 0) {
    emptyBox.hidden = false;
    return;
  }
  certificates.forEach(function (c) {
    list.appendChild(buildCard(c));
  });
})();
