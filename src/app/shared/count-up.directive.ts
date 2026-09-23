import { Directive, ElementRef, OnDestroy, effect, inject, input } from '@angular/core';

/**
 * Counts the host's text up from 0 to `appCountUp` (plus `countSuffix`) whenever
 * `countActive` turns true, e.g. each time its fullpage slide comes into view.
 * Resets to 0 while inactive so the count replays on the next visit.
 */
@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private frame?: number;
  private timer?: ReturnType<typeof setTimeout>;

  readonly target = input.required<number>({ alias: 'appCountUp' });
  readonly suffix = input('', { alias: 'countSuffix' });
  /** Milliseconds for the full count. */
  readonly duration = input(1800, { alias: 'countDuration' });
  /** Milliseconds to wait after activation (to sync with entrance animations). */
  readonly delay = input(0, { alias: 'countDelay' });
  readonly active = input(false, { alias: 'countActive' });

  constructor() {
    effect(() => {
      const target = this.target();
      this.stop();
      if (!this.active()) {
        this.render(0);
        return;
      }
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        this.render(target);
        return;
      }
      this.render(0);
      this.timer = setTimeout(() => this.run(target), this.delay());
    });
  }

  ngOnDestroy(): void {
    this.stop();
  }

  private run(target: number): void {
    const duration = this.duration();
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic: fast start, gentle landing
      this.render(Math.round(target * eased));
      if (t < 1) this.frame = requestAnimationFrame(step);
    };
    this.frame = requestAnimationFrame(step);
  }

  private render(value: number): void {
    this.host.nativeElement.textContent = `${value}${this.suffix()}`;
  }

  private stop(): void {
    if (this.frame) cancelAnimationFrame(this.frame);
    if (this.timer) clearTimeout(this.timer);
    this.frame = undefined;
    this.timer = undefined;
  }
}
