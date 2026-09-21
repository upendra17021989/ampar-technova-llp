import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export function mountReferenceMotion(root: HTMLElement) {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const media = gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)", () => {
    root.classList.add("reference-motion");
    const select = gsap.utils.selector(root);
    select(".home-hero-content > p, .home-hero-content > .action-row, .hero-capabilities, .positioning-copy, .section-intro, .product-story-copy, .process-intro > p, .process-steps > li, .quality-copy > p, .quality-evidence, .reach-grid > div, .final-cta .button, .interior-page .section > .shell").forEach((target: HTMLElement) => {
      gsap.from(target, { y: 28, opacity: 0, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: target, start: "top 88%", once: true } });
    });
    const splits = select("h1, .home-section-heading h2, .positioning-grid h2, .quality-copy h2, .industries-title h2, .final-cta h2").map((heading: HTMLElement) =>
      SplitText.create(heading, { type: "lines", mask: "lines", autoSplit: true,
        onSplit: (split) => {
          gsap.set(split.masks, { padding: "0.15em 0.12em", margin: "-0.15em -0.12em" });
          return gsap.from(split.lines, { y: (_, line: HTMLElement) => line.parentElement?.offsetHeight ?? 0,
            duration: 1.4, stagger: 0.09, ease: "expo.out",
            scrollTrigger: { trigger: heading, start: "top 88%", once: true } });
        } }));
    select(".technology-media, .quality-image").forEach((image: HTMLElement) => {
      gsap.fromTo(image, { clipPath: "polygon(0% 0%, -35% 0%, 0% 50%, -35% 100%, 0% 100%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 135% 50%, 100% 100%, 0% 100%)", duration: 1.4, ease: "power3.inOut",
          scrollTrigger: { trigger: image, start: "top 88%", once: true } });
    });
    return () => { splits.forEach((split) => split.revert()); root.classList.remove("reference-motion"); };
  });
  media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
    root.classList.add("reference-desktop-motion");
    const select = gsap.utils.selector(root);
    const hero = root.querySelector(".home-hero-scroll");
    const heroContent = root.querySelector<HTMLElement>(".home-hero .hero-grid");
    if (hero) {
      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: hero, start: "top top", end: "bottom bottom", scrub: true,
        onUpdate: (self) => { if (heroContent) heroContent.inert = self.progress >= 0.18; },
      } })
        .to(select(".home-hero .hero-grid, .hero-footnote"), { opacity: 0, y: -60, duration: 0.18 }, 0)
        .fromTo(select(".hero-blueprint"), { opacity: 0 }, { opacity: 1, duration: 0.25 }, 0)
        .to(select(".home-hero-media"), { clipPath: "inset(0% 0% 100% 0%)", duration: 1 }, 0)
        .fromTo(select(".hero-drawing-caption"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.25 }, 0.6);
    }
    const cards = gsap.utils.toArray<HTMLElement>(".product-story-card", root);
    cards.slice(0, -1).forEach((card, index) => {
      gsap.to(card, { scale: 0.94, filter: "brightness(0.55)", ease: "none",
        scrollTrigger: { trigger: cards[index + 1], start: "top bottom", end: "top 120px", scrub: true } });
    });
    const technologyStage = root.querySelector<HTMLElement>(".technology-stage");
    const technologies = gsap.utils.toArray<HTMLElement>(".technology-grid article", root);
    let activeTechnology = -1;
    if (technologyStage && technologies.length) {
      const activateTechnology = (index: number) => {
        if (activeTechnology === index) return;
        activeTechnology = index;
        technologies.forEach((article, i) => {
          article.inert = i !== index;
          article.toggleAttribute("data-active", i === index);
        });
      };
      activateTechnology(0);
      gsap.timeline({ defaults: { ease: "power3.inOut" }, scrollTrigger: {
        trigger: technologyStage, start: "top 110px", end: () => `+=${window.innerHeight * 3}`,
        pin: true, scrub: true, invalidateOnRefresh: true,
        onUpdate: (self) => activateTechnology(Math.min(technologies.length - 1, Math.floor(self.progress * technologies.length))),
      } })
        .fromTo(select(".technology-shell"), { x: -30, opacity: 0.2 }, { x: 0, opacity: 1, duration: 1 }, 0)
        .fromTo(select(".technology-liner"), { x: -90, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, 1)
        .fromTo(select(".technology-bond"), { opacity: 0 }, { opacity: 1, duration: 1 }, 2);
    }
    const steps = gsap.utils.toArray<HTMLElement>(".process-steps > li", root);
    const digits = root.querySelector(".process-counter-track");
    const moveDigits = digits ? gsap.quickTo(digits, "yPercent", { duration: 0.65, ease: "expo.out" }) : undefined;
    const activate = (index: number) => {
      steps.forEach((step, i) => step.toggleAttribute("data-active", i === index));
      moveDigits?.(-100 * index / steps.length);
    };
    steps.forEach((step, index) => ScrollTrigger.create({ trigger: step, start: "top 55%",
      onEnter: () => activate(index), onLeaveBack: () => activate(Math.max(0, index - 1)) }));
    if (steps.length) {
      activate(0);
      gsap.fromTo(select(".process-progress"), { scaleY: 0 }, { scaleY: 1, ease: "none",
        scrollTrigger: { trigger: root.querySelector(".process-steps"), start: "top 55%", end: "bottom 55%", scrub: true } });
    }
    const marquee = root.querySelector<HTMLElement>(".industry-marquee-track");
    let cleanupMarquee = () => {};
    if (marquee) {
      const loop = gsap.to(marquee, { xPercent: -50, duration: 28, repeat: -1, ease: "none" });
      const skew = gsap.quickTo(marquee, "skewX", { duration: 0.5, ease: "power3.out" });
      let speedTween: gsap.core.Tween | undefined;
      const region = marquee.parentElement!;
      let active = false;
      const sync = () => { loop.paused(!active || region.matches(":hover, :focus-within") || document.hidden); };
      ScrollTrigger.create({ trigger: region, start: "top bottom", end: "bottom top",
        onToggle: (self) => { active = self.isActive; sync(); },
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          speedTween?.kill();
          loop.timeScale(self.direction * (1 + Math.min(Math.abs(velocity) / 400, 5)));
          speedTween = gsap.to(loop, { timeScale: self.direction, duration: 1.2, ease: "power2.out", overwrite: true });
          skew(gsap.utils.clamp(-7, 7, -velocity / 350));
        } });
      const stopSkew = () => { skew(0); };
      ScrollTrigger.addEventListener("scrollEnd", stopSkew);
      ["mouseenter", "mouseleave", "focusin", "focusout"].forEach((event) => region.addEventListener(event, sync));
      document.addEventListener("visibilitychange", sync);
      sync();
      cleanupMarquee = () => {
        ScrollTrigger.removeEventListener("scrollEnd", stopSkew);
        speedTween?.kill();
        ["mouseenter", "mouseleave", "focusin", "focusout"].forEach((event) => region.removeEventListener(event, sync));
        document.removeEventListener("visibilitychange", sync);
      };
    }
    return () => { cleanupMarquee(); if (heroContent) heroContent.inert = false; technologies.forEach((article) => { article.inert = false; article.removeAttribute("data-active"); }); steps.forEach((step) => step.removeAttribute("data-active")); root.classList.remove("reference-desktop-motion"); };
  });
  ScrollTrigger.refresh();
  return () => media.revert();
}
