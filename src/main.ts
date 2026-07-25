const revealElements = document.querySelectorAll<HTMLElement>(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target as HTMLElement;
      const delay = Number(el.dataset.revealDelay ?? 0);
      window.setTimeout(() => {
        el.classList.add("is-visible");
      }, delay);
      observer.unobserve(el);
    }
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px",
  },
);

for (const el of revealElements) {
  observer.observe(el);
}

// Soften sticky header once the user leaves the hero.
const header = document.querySelector<HTMLElement>(".site-header");
const hero = document.querySelector<HTMLElement>(".hero");

if (header && hero) {
  const headerObserver = new IntersectionObserver(
    ([entry]) => {
      header.dataset.scrolled = entry.isIntersecting ? "false" : "true";
    },
    { threshold: 0.55 },
  );
  headerObserver.observe(hero);
}
