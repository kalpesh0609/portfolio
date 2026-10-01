import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

export interface ScrollSmootherVars {
  wrapper?: string | HTMLElement;
  content?: string | HTMLElement;
  smooth?: number | boolean;
  speed?: number;
  effects?: boolean | string;
  autoResize?: boolean;
  ignoreMobileResize?: boolean;
  smoothTouch?: boolean | number;
  normalizeScroll?: boolean;
  [key: string]: unknown;
}

export class ScrollSmoother {
  private static instance: ScrollSmoother | null = null;
  public lenis: Lenis | null = null;
  public vars: ScrollSmootherVars;
  private isPaused: boolean = false;
  private tickerRaf: ((time: number) => void) | null = null;

  constructor(vars: ScrollSmootherVars = {}) {
    this.vars = vars;
    ScrollSmoother.instance = this;

    const smoothVal = typeof vars.smooth === "number" ? vars.smooth : 1.2;
    // Map smooth parameter to duration
    const duration = Math.max(0.6, smoothVal * 0.7);

    this.lenis = new Lenis({
      duration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Notify GSAP ScrollTrigger whenever Lenis scrolls
    this.lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Bind Lenis animation frame to GSAP's central ticker
    this.tickerRaf = (time: number) => {
      this.lenis?.raf(time * 1000);
    };
    gsap.ticker.add(this.tickerRaf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();
  }

  static create(vars?: ScrollSmootherVars): ScrollSmoother {
    if (ScrollSmoother.instance) {
      ScrollSmoother.instance.kill();
    }
    return new ScrollSmoother(vars);
  }

  static get(): ScrollSmoother | null {
    return ScrollSmoother.instance;
  }

  static refresh(hard?: boolean): void {
    ScrollTrigger.refresh(hard);
  }

  static register(): boolean {
    return true;
  }

  scrollTop(value?: number): number {
    if (typeof value === "number") {
      this.lenis?.scrollTo(value, { immediate: true });
      window.scrollTo(0, value);
      return value;
    }
    return this.lenis?.scroll ?? window.scrollY;
  }

  paused(paused?: boolean): boolean {
    if (typeof paused === "boolean") {
      this.isPaused = paused;
      if (paused) {
        this.lenis?.stop();
      } else {
        this.lenis?.start();
      }
      return paused;
    }
    return this.isPaused;
  }

  scrollTo(
    target: string | HTMLElement | number,
    smooth: boolean = true,
    position?: string
  ): void {
    const offset = position ? 0 : 0;
    if (typeof target === "string") {
      const el = document.querySelector(target) as HTMLElement;
      if (el && this.lenis) {
        this.lenis.scrollTo(el, {
          offset,
          immediate: !smooth,
          duration: smooth ? 1.2 : 0,
        });
      }
    } else if (typeof target === "number") {
      this.lenis?.scrollTo(target + offset, {
        immediate: !smooth,
        duration: smooth ? 1.2 : 0,
      });
    } else if (target instanceof HTMLElement) {
      this.lenis?.scrollTo(target, {
        offset,
        immediate: !smooth,
        duration: smooth ? 1.2 : 0,
      });
    }
  }

  wrapper(): HTMLElement | null {
    if (typeof this.vars.wrapper === "string") {
      return document.querySelector(this.vars.wrapper);
    }
    return (this.vars.wrapper as HTMLElement) || document.body;
  }

  content(): HTMLElement | null {
    if (typeof this.vars.content === "string") {
      return document.querySelector(this.vars.content);
    }
    return (this.vars.content as HTMLElement) || document.body;
  }

  effects(): unknown[] {
    return [];
  }

  getVelocity(): number {
    return this.lenis?.velocity ?? 0;
  }

  progress(value?: number): number {
    if (typeof value === "number") {
      const maxScroll = this.lenis?.limit ?? (document.documentElement.scrollHeight - window.innerHeight);
      this.scrollTop(value * maxScroll);
      return value;
    }
    return this.lenis?.progress ?? 0;
  }

  kill(): void {
    if (this.tickerRaf) {
      gsap.ticker.remove(this.tickerRaf);
      this.tickerRaf = null;
    }
    this.lenis?.destroy();
    this.lenis = null;
    if (ScrollSmoother.instance === this) {
      ScrollSmoother.instance = null;
    }
  }
}

export default ScrollSmoother;
