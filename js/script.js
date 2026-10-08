const toggle = document.getElementById("toggle");
const nav_links = document.getElementById("nav-links");
const toggleIcon = document.getElementById("toggleIcon");

/*=================toggle================= */
toggle.addEventListener("click", () => {
  nav_links.classList.toggle("hidden");

  // عشان نغير التوجل لاكس
  toggleIcon.classList.toggle("fa-bars");
  toggleIcon.classList.toggle("fa-xmark");
});

/*=================links================= */
const links = nav_links.querySelectorAll("a");
links.forEach((link) => {
  link.addEventListener("click", () => {
    nav_links.classList.add("hidden");

    //عشان نرجع شكل التوجل
    toggleIcon.classList.remove("fa-xmark");
    toggleIcon.classList.add("fa-bars");
  });
});

