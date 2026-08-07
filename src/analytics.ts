import posthog from "posthog-js";

import "./cookie-banner.css";

const apiKey = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN?.trim();
const host =
  import.meta.env.VITE_POSTHOG_HOST?.trim() || "https://eu.i.posthog.com";
const isConfigured = Boolean(apiKey && apiKey !== "phc_your_project_token_here");

let bannerRoot: HTMLElement | null = null;
let initialized = false;

function mountCookieBanner() {
  if (bannerRoot || document.getElementById("cookie-banner")) return;

  bannerRoot = document.createElement("aside");
  bannerRoot.id = "cookie-banner";
  bannerRoot.className = "cookie-banner";
  bannerRoot.setAttribute("role", "dialog");
  bannerRoot.setAttribute("aria-labelledby", "cookie-banner-title");
  bannerRoot.setAttribute("aria-describedby", "cookie-banner-text");
  bannerRoot.innerHTML = `
    <div>
      <p class="cookie-banner__title" id="cookie-banner-title">A word about cookies</p>
      <p class="cookie-banner__text" id="cookie-banner-text">
        We use optional analytics cookies (via PostHog) to understand how the
        site is used and improve Dear Jane. Decline and we still count visits
        without storing cookies.
        <a href="/privacy-policy.html#website-analytics">Privacy Policy</a>
      </p>
    </div>
    <div class="cookie-banner__actions">
      <button type="button" class="cookie-banner__button cookie-banner__button--accept" data-cookie-accept>
        Accept
      </button>
      <button type="button" class="cookie-banner__button cookie-banner__button--decline" data-cookie-decline>
        Decline
      </button>
    </div>
  `;

  bannerRoot
    .querySelector("[data-cookie-accept]")
    ?.addEventListener("click", () => {
      posthog.opt_in_capturing();
      dismissCookieBanner();
    });

  bannerRoot
    .querySelector("[data-cookie-decline]")
    ?.addEventListener("click", () => {
      posthog.opt_out_capturing();
      dismissCookieBanner();
    });

  document.body.appendChild(bannerRoot);
}

function dismissCookieBanner() {
  bannerRoot?.remove();
  bannerRoot = null;
}

export function initAnalytics() {
  if (!isConfigured || typeof window === "undefined") return;

  if (!initialized) {
    posthog.init(apiKey!, {
      api_host: host,
      ui_host: "https://eu.posthog.com",
      defaults: "2026-05-30",
      cookieless_mode: "on_reject",
      person_profiles: "identified_only",
      persistence: "localStorage+cookie",
    });

    posthog.register({
      surface: "website",
    });
    initialized = true;
  }

  if (posthog.get_explicit_consent_status() === "pending") {
    mountCookieBanner();
  }
}

export function captureWebsiteEvent(
  event: string,
  properties: Record<string, string | number | boolean | undefined> = {},
) {
  if (!isConfigured || !initialized) return;
  posthog.capture(event, {
    surface: "website",
    ...properties,
  });
}

export function wireCtaTracking() {
  const bindings: Array<{ selector: string; cta: string }> = [
    { selector: "[data-get-app]", cta: "get_the_app" },
    { selector: "[data-app-store]", cta: "app_store" },
    { selector: "[data-play-store]", cta: "play_store" },
    { selector: "[data-buy-me-a-coffee]", cta: "buy_me_a_coffee" },
  ];

  for (const { selector, cta } of bindings) {
    for (const el of document.querySelectorAll<HTMLElement>(selector)) {
      el.addEventListener("click", () => {
        captureWebsiteEvent("website_cta_clicked", { cta });
      });
    }
  }
}
