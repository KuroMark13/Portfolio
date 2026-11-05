/* portfolio.js — เมนูมือถือ และไฮไลต์เมนูตามส่วนที่กำลังดูอยู่ (หน้า index.html) */
(function () {
  var menu = document.getElementById("menu");
  var burger = document.querySelector(".burger");

  function setOpen(open) {
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  }

  burger.addEventListener("click", function () {
    setOpen(!menu.classList.contains("open"));
  });

  // กดเลือกเมนูแล้วปิดเมนูบนมือถือ
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") setOpen(false);
  });

  // ไฮไลต์เมนูตามส่วนที่อยู่กลางหน้าจอ
  var links = {};
  Array.prototype.forEach.call(menu.querySelectorAll('a[href^="#"]'), function (a) {
    links[a.getAttribute("href").slice(1)] = a;
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        Object.keys(links).forEach(function (id) {
          links[id].classList.toggle("active", id === entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    Object.keys(links).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }
})();
