/* =====================================================
   certificates.js
   ส่วนที่ 1: ข้อมูลใบประกาศ  <-- คุณแก้ไขเฉพาะส่วนนี้เท่านั้น
   ส่วนที่ 2: โค้ดสร้างการ์ด  <-- ไม่ต้องแก้
   ===================================================== */

/* ---------- ส่วนที่ 1: ข้อมูลใบประกาศ ----------
   - 1 ก้อน { ... } = 1 ใบประกาศ
   - ใบที่อยู่บนสุดจะแสดงเป็นใบแรก (ย้ายก้อนขึ้น-ลงเพื่อเรียงลำดับได้)
   - ต้องมีเครื่องหมายจุลภาค "," คั่นระหว่างแต่ละก้อน (ก้อนสุดท้ายไม่ต้องมี)
   - ช่องที่ไม่มีข้อมูล ให้ปล่อยเป็น "" ได้ เว็บจะไม่แสดงช่องนั้น
   - dateLabel = คำนำหน้าวันที่ (ถ้าไม่ใส่ จะขึ้นว่า "ได้รับเมื่อ")
   - ชื่อไฟล์ใช้ตัวพิมพ์เล็ก ภาษาอังกฤษ ไม่มีช่องว่าง เช่น cert-01.jpg
*/
const certificates = [
  {
    title: "HCCDA-AI",
    course: "Huawei Cloud Developer Certification (Certified Developer Associate)",
    issuer: "Huawei Cloud",
    dateLabel: "ใช้ได้ถึง",
    date: "21 กรกฎาคม 2572",
    image: "images/certificates/cert-03.jpg",
    file: "",
    link: ""
  },
  {
    title: "Basic Network สำหรับมือใหม่สาย IT",
    course: "วุฒิบัตรการฝึกทักษะออนไลน์ (1 ชั่วโมง 40 นาที)",
    issuer: "กรมพัฒนาฝีมือแรงงาน ร่วมกับ CIPAT",
    date: "28 เมษายน 2568",
    image: "images/certificates/cert-06.jpg",
    file: "files/certificates/cert-06.pdf",
    link: ""
  },
  {
    title: "Cloud Basics: Development and Basic Concepts (CRA Training Program)",
    course: "Certificate of Completion",
    issuer: "Huawei Talent",
    date: "25 เมษายน 2568",
    image: "images/certificates/cert-01.jpg",
    file: "",
    link: ""
  },
  {
    title: "Development and Basic Concepts of Cloud Computing",
    course: "Certificate of Completion",
    issuer: "Huawei Talent",
    date: "25 เมษายน 2568",
    image: "images/certificates/cert-02.jpg",
    file: "",
    link: ""
  },
  {
    title: "Google Data Analytics",
    course: "Professional Certificate (8 courses)",
    issuer: "Google · Coursera",
    date: "17 พฤศจิกายน 2567",
    image: "images/certificates/cert-05.jpg",
    file: "files/certificates/cert-05.pdf",
    link: "https://coursera.org/verify/professional-cert/LFH0EGFQV4UF"
  },
  {
    title: "Basic Cybersecurity",
    course: "Certificate of Completion",
    issuer: "MOOC · NCSA Thailand",
    date: "23 มีนาคม 2567",
    image: "images/certificates/cert-04.jpg",
    file: "files/certificates/cert-04.pdf",
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
    if (c.date) body.appendChild(el("p", "cert-date", (c.dateLabel || "ได้รับเมื่อ") + ": " + c.date));

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
