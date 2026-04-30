const header = document.getElementById("site-header");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const contactForm = document.getElementById("contact-form");
const revealElements = document.querySelectorAll(".reveal");

const setHeaderState = () => {
  if (window.scrollY > 24) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};

const closeMobileMenu = () => {
  navToggle.classList.remove("active");
  navMenu.classList.remove("active");
  document.body.classList.remove("nav-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation menu");
};

const toggleMobileMenu = () => {
  const isOpen = navMenu.classList.toggle("active");

  navToggle.classList.toggle("active", isOpen);
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
};

const setActiveNavLink = () => {
  const sections = document.querySelectorAll("main section[id]");
  let currentSectionId = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;

    if (window.scrollY >= sectionTop) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (href === `#${currentSectionId}`) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
};

const handleSmoothScroll = (event) => {
  const href = event.currentTarget.getAttribute("href");

  if (!href || !href.startsWith("#")) {
    return;
  }

  const target = document.querySelector(href);

  if (!target) {
    return;
  }

  event.preventDefault();

  closeMobileMenu();

  target.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
};

const handleContactForm = (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields before sending your message.");
    return;
  }

  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  alert("Thank you! Please contact me directly through email.");

  window.location.href = `mailto:mhshakib96@gmail.com?subject=${subject}&body=${body}`;

  contactForm.reset();
};

const initRevealAnimation = () => {
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -60px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
};

navToggle.addEventListener("click", toggleMobileMenu);

navLinks.forEach((link) => {
  link.addEventListener("click", handleSmoothScroll);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

window.addEventListener("scroll", () => {
  setHeaderState();
  setActiveNavLink();
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) {
    closeMobileMenu();
  }
});

if (contactForm) {
  contactForm.addEventListener("submit", handleContactForm);
}

setHeaderState();
setActiveNavLink();
initRevealAnimation();