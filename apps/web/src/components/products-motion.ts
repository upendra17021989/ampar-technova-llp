import { gsap } from "gsap";

// Called inside the shared matchMedia context so route changes and reduced
// motion revert every tween and ScrollTrigger together.
export function mountProductsMotion(root: HTMLElement) {
  if (!root.matches(".products-index")) return () => {};
  const select = gsap.utils.selector(root);
  const cleanups: (() => void)[] = [];

  gsap.from(select(".products-hero .eyebrow, .products-hero .hero-index, .products-hero .lead, .products-hero .button"), {
    y: 18, opacity: 0, duration: 0.8, stagger: 0.1, ease: "expo.out",
  });
  gsap.from(select(".filter-strip > *"), {
    y: 16, opacity: 0, duration: 0.6, stagger: 0.07, ease: "power3.out",
    scrollTrigger: { trigger: root.querySelector(".filter-strip"), start: "top 92%", once: true },
  });

  let rowTop = -1;
  let column = 0;
  const orange = getComputedStyle(root).getPropertyValue("--orange-600").trim();
  select(".product-card").forEach((card: HTMLElement) => {
    if (card.offsetTop !== rowTop) {
      rowTop = card.offsetTop;
      column = 0;
    }
    const entrance = gsap.from(card, {
      y: 36, opacity: 0, duration: 0.85, delay: column++ * 0.08, ease: "expo.out",
      scrollTrigger: { trigger: card, start: "top 92%", once: true },
    });
    const hover = gsap.timeline({ paused: true, defaults: { duration: 0.25, ease: "power2.out" } })
      .to(card, { borderColor: orange, boxShadow: "0 12px 28px rgba(7,26,45,0.08)" }, 0)
      .to(card.querySelector(".text-link span"), { x: 4 }, 0);
    const sync = () => {
      const focused = card.contains(document.activeElement);
      // Keyboard navigation must immediately expose the focused link.
      if (focused) entrance.progress(1);
      if (focused || (window.matchMedia("(hover: hover)").matches && card.matches(":hover"))) hover.play();
      else hover.reverse();
    };
    const events = ["mouseenter", "mouseleave", "focusin", "focusout"];
    events.forEach((event) => card.addEventListener(event, sync));
    cleanups.push(() => events.forEach((event) => card.removeEventListener(event, sync)));
  });
  return () => cleanups.forEach((cleanup) => cleanup());
}
