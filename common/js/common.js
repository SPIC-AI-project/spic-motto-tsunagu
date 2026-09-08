// common.js — スクロールリビール & サイドナビのアクティブ切り替え

document.addEventListener("DOMContentLoaded", function () {
  var revealTargets = document.querySelectorAll(".reveal");
  var sideNavLinks = document.querySelectorAll(".side-nav__link");
  var sections = document.querySelectorAll("main section[id]");

  if (revealTargets.length && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  if (sideNavLinks.length && sections.length && "IntersectionObserver" in window) {
    var setActive = function (id) {
      sideNavLinks.forEach(function (link) {
        link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
      });
    };
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

  document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
    var track = carousel.querySelector(".venue-carousel__track");
    var slides = carousel.querySelectorAll(".venue-carousel__slide");
    var dotsWrap = carousel.querySelector(".venue-carousel__dots");
    var prevBtn = carousel.querySelector(".venue-carousel__arrow--prev");
    var nextBtn = carousel.querySelector(".venue-carousel__arrow--next");
    var index = 0;

    var dots = Array.prototype.map.call(slides, function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "venue-carousel__dot";
      dot.setAttribute("aria-label", (i + 1) + "枚目の写真を表示");
      dot.addEventListener("click", function () {
        goTo(i);
      });
      dotsWrap.appendChild(dot);
      return dot;
    });

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = "translateX(-" + index * 100 + "%)";
      dots.forEach(function (dot, di) {
        dot.classList.toggle("is-active", di === index);
      });
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { goTo(index - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { goTo(index + 1); });

    goTo(0);
  });
});
