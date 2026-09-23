import { Directive, ElementRef, OnDestroy, OnInit, effect, inject, input } from '@angular/core';

export type UncodeAnimType =
  | 'top-t-bottom'
  | 'bottom-t-top'
  | 'left-t-right'
  | 'right-t-left'
  | 'zoom-in'
  | 'zoom-out'
  | 'alpha-anim'
  | 'slight-anim';

/**
 * Reproduces the Uncode "animated content" behaviour:
 * `.animate_when_almost_visible` + direction class stay at opacity 0 until
 * `.start_animation` is added, which is delayed by `animDelay` ms.
 * Animations run once per element.
 */
@Directive({
  selector: '[appAnim]',
  standalone: true
})
export class UncodeAnimDirective implements OnInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;
  private timer?: ReturnType<typeof setTimeout>;
  private started = false;
  private initialized = false;

  readonly type = input.required<UncodeAnimType>({ alias: 'appAnim' });
  /** Milliseconds before the animation is allowed to start. */
  readonly delay = input(0, { alias: 'animDelay' });
  /** Maps to the theme's data-speed attribute (ms). 0 keeps the 0.6s default. */
  readonly speed = input(0, { alias: 'animSpeed' });
  /** When bound, the animation waits for true instead of scrolling into view. */
  readonly active = input<boolean | undefined>(undefined, { alias: 'animActive' });

  constructor() {
    this.host.nativeElement.classList.add('animate_when_almost_visible');
    effect(() => {
      if (this.active() === true) this.start();
    });
  }

  ngOnInit(): void {
    const node = this.host.nativeElement;
    node.classList.add(this.type());
    if (this.speed() > 0) node.setAttribute('data-speed', String(this.speed()));
    this.initialized = true;

    if (this.active() === true) this.start();
    else if (this.active() === undefined) this.observe();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.timer) clearTimeout(this.timer);
  }

  private observe(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) this.start();
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    );
    this.observer.observe(this.host.nativeElement);
  }

  private start(): void {
    if (!this.initialized || this.started) return;
    this.started = true;
    this.observer?.disconnect();
    this.observer = undefined;

    // The theme never sets animation-delay; it adds the trigger class after a
    // timeout so the element keeps its hidden from-state until the delay elapses.
    if (this.delay() > 0) {
      this.timer = setTimeout(() => this.trigger(), this.delay());
    } else {
      this.trigger();
    }
  }

  private trigger(): void {
    this.host.nativeElement.classList.add('start_animation');
  }
}
