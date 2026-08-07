import { initAnalytics, wireCtaTracking } from "./analytics";
import {
  APP_STORE_URL,
  BUY_ME_A_COFFEE_URL,
  GET_THE_APP_URL,
  PLAY_STORE_URL,
} from "./config";

initAnalytics();

function wireAnchors(
  selector: string,
  url: string,
  options: { external?: boolean } = {},
) {
  const links = document.querySelectorAll<HTMLAnchorElement>(selector);
  for (const link of links) {
    if (!url) {
      link.setAttribute("aria-disabled", "true");
      link.removeAttribute("href");
      link.tabIndex = -1;
      continue;
    }

    link.href = url;
    link.removeAttribute("aria-disabled");
    if (options.external && url.startsWith("http")) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  }
}

wireAnchors("[data-get-app]", GET_THE_APP_URL);
wireAnchors("[data-app-store]", APP_STORE_URL, { external: true });
wireAnchors("[data-play-store]", PLAY_STORE_URL, { external: true });
wireAnchors("[data-buy-me-a-coffee]", BUY_ME_A_COFFEE_URL, { external: true });
wireCtaTracking();

const revealElements = document.querySelectorAll<HTMLElement>(".reveal");

const showReveal = (el: HTMLElement) => {
  el.classList.add("is-visible");
};

// Enable hide-until-scroll only after JS is confirmed running.
document.documentElement.classList.add("js-ready");

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target as HTMLElement;
      const delay = Number(el.dataset.revealDelay ?? 0);
      window.setTimeout(() => {
        showReveal(el);
      }, delay);
      observer.unobserve(el);
    }
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -4% 0px",
  },
);

for (const el of revealElements) {
  observer.observe(el);
}

// Safety net for odd mobile browser/cache states.
window.setTimeout(() => {
  for (const el of revealElements) {
    showReveal(el);
  }
}, 1500);

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
