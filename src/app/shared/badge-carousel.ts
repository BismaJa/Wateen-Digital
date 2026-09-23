import { signal } from '@angular/core';

/**
 * State for a continuous, item-by-item logo carousel (see `.badge-viewport` /
 * `.badge-track` / `.badge-slide` in home.component.scss).
 *
 * The track renders every set in order plus a clone of the first set; each
 * `step()` slides it one item left. When the clone is fully showing, the track
 * jumps back to the real first set with its transition off — identical pixels,
 * so the loop never visibly jumps or blinks.
 */
export class BadgeCarousel {
  /** Position in items (0 = first item of the first set). */
  readonly index = signal(0);
  /** Off only for the instant snap from the cloned tail back to the start. */
  readonly animate = signal(true);
  /** Set shown by the dots; only advances once a whole new set is on screen. */
  readonly page = signal(0);

  readonly setSize: number;
  readonly dots: number[];
  readonly track: string[];
  private readonly total: number;
  /** Time of the last arrow/dot press; auto-advance waits a moment after it. */
  private lastManual = 0;

  constructor(private readonly sets: string[][]) {
    this.setSize = sets[0].length;
    this.dots = sets.map((_, i) => i);
    this.total = sets.flat().length;
    this.track = [...sets.flat(), ...sets[0]];
  }

  /** Timer-driven advance; skipped briefly after the user navigates by hand. */
  autoStep(): void {
    if (Date.now() - this.lastManual < 4000) return;
    this.step();
  }

  next(): void {
    this.lastManual = Date.now();
    this.step();
  }

  prev(): void {
    if (!this.animate()) return;
    this.lastManual = Date.now();
    if (this.index() > 0) {
      this.index.update((i) => i - 1);
      return;
    }
    // At the real first item: jump (untransitioned) to its clone at the tail,
    // then slide back one so the loop runs backwards seamlessly too.
    this.animate.set(false);
    this.index.set(this.total);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        this.animate.set(true);
        this.index.set(this.total - 1);
      })
    );
  }

  step(): void {
    if (!this.animate()) return;
    // Safety net if a transitionend was missed (e.g. background tab): wrap now.
    if (this.index() >= this.total) this.snapToStart();
    else this.index.update((i) => i + 1);
  }

  goToPage(page: number): void {
    this.lastManual = Date.now();
    this.animate.set(true);
    this.index.set(page * this.setSize);
    this.page.set(page);
  }

  onTransitionEnd(event: TransitionEvent): void {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') return;
    const index = this.index();
    if (index % this.setSize === 0) this.page.set((index / this.setSize) % this.sets.length);
    else if (index > this.total - this.setSize && index < this.total) {
      // Stepping backwards into the last set.
      this.page.set(this.sets.length - 1);
    }
    if (index >= this.total) this.snapToStart();
  }

  /** Entrance-animation stagger: first set staggers in, the rest (off-screen) share the last delay. */
  entranceDelay(i: number, base = 200, stagger = 150): number {
    return base + Math.min(i, this.setSize) * stagger;
  }

  private snapToStart(): void {
    this.animate.set(false);
    this.index.set(0);
    this.page.set(0);
    requestAnimationFrame(() => requestAnimationFrame(() => this.animate.set(true)));
  }
}
