/**
 * Site motion, built on GSAP + ScrollTrigger + SplitText.
 *
 * Progressive enhancement: every element is visible in the HTML. The inline
 * script in Base.astro adds `js-anim` (which sets the hidden starting states)
 * only when the visitor has not asked for reduced motion; this file animates
 * from those states and marks the page ready. If this file never runs, the
 * inline failsafe removes `js-anim` and the page shows as-is.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const root = document.documentElement;

/* Header: solid glass once the page scrolls. ------------------------------ */
const header = document.querySelector<HTMLElement>('[data-header]');
const syncHeader = () => header?.toggleAttribute('data-scrolled', window.scrollY > 12);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

/* Glass cards: cursor-following spotlight (fine pointers only). ----------- */
if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.addEventListener(
    'pointermove',
    (e) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>('[data-spotlight]');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    },
    { passive: true },
  );
}

/* Scroll-driven motion. --------------------------------------------------- */
const mm = gsap.matchMedia();

mm.add('(prefers-reduced-motion: no-preference)', () => {
  // Section headings: words rise out of a soft blur.
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
    const split = SplitText.create(el, { type: 'words', aria: 'auto' });
    gsap.set(el, { opacity: 1 });
    gsap.from(split.words, {
      opacity: 0,
      yPercent: 55,
      filter: 'blur(8px)',
      duration: 0.9,
      ease: 'expo.out',
      stagger: 0.04,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  // Generic reveals, batched so siblings entering together stagger.
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, overwrite: true }),
  });

  // Hero workspace: the tilted screen settles flat as you scroll into it.
  const frame = document.querySelector<HTMLElement>('[data-hud-frame]');
  if (frame) {
    gsap.fromTo(
      frame,
      { rotateX: 14, scale: 0.94, transformOrigin: '50% 0%' },
      {
        rotateX: 0,
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: frame, start: 'top 95%', end: 'top 28%', scrub: 0.6 },
      },
    );
    const img = frame.querySelector('img');
    if (img) {
      gsap.fromTo(
        img,
        { scale: 1.08 },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } },
      );
    }
  }

  // Elora's reply types itself out (screen readers get the full sentence).
  gsap.utils.toArray<HTMLElement>('[data-type]').forEach((el) => {
    const text = el.textContent ?? '';
    const state = { n: 0 };
    el.textContent = '';
    el.classList.add('caret');
    gsap.to(state, {
      n: text.length,
      duration: text.length * 0.032,
      delay: 0.5,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      onUpdate: () => {
        el.textContent = text.slice(0, Math.round(state.n));
      },
      onComplete: () => {
        gsap.delayedCall(2.4, () => el.classList.remove('caret'));
      },
    });
  });

  // Cognitive loop: stages light up in order as the reader scrolls past.
  const stagesWrap = document.querySelector<HTMLElement>('[data-stages]');
  if (stagesWrap) {
    const stages = gsap.utils.toArray<HTMLElement>('[data-stage]', stagesWrap);
    const rail = stagesWrap.querySelector<HTMLElement>('[data-stage-rail]');
    ScrollTrigger.create({
      trigger: stagesWrap,
      start: 'top 78%',
      end: 'bottom 50%',
      onUpdate: (self) => {
        const lit = Math.ceil(self.progress * stages.length);
        stages.forEach((stage, i) => stage.classList.toggle('is-lit', i < lit));
        rail?.style.setProperty('--p', self.progress.toFixed(3));
      },
      onLeave: () => {
        stages.forEach((stage) => stage.classList.add('is-lit'));
        rail?.style.setProperty('--p', '1');
      },
    });
  }

  // Numbers count up; bars fill.
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const raw = el.dataset.count ?? '0';
    const target = parseFloat(raw);
    const decimals = raw.split('.')[1]?.length ?? 0;
    const state = { v: 0 };
    el.textContent = (0).toFixed(decimals);
    gsap.to(state, {
      v: target,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      onUpdate: () => {
        el.textContent = state.v.toFixed(decimals);
      },
    });
  });

  gsap.utils.toArray<HTMLElement>('[data-bar]').forEach((el) => {
    gsap.fromTo(
      el,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 94%', once: true } },
    );
  });
});

// Web fonts change line lengths; re-measure trigger positions once they land.
document.fonts?.ready.then(() => ScrollTrigger.refresh());

root.dataset.anim = 'ready';
