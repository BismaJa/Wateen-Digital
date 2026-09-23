import { Directive, ElementRef, OnDestroy, OnInit, effect, inject, input } from '@angular/core';
import { PageLoaderState } from './page-loader-state.service';

/**
 * Types `appTypewriter` into the host one character at a time once it scrolls
 * into view (after the page loader clears), with a blinking caret (`.typewriter`
 * styles in styles.scss).
 */
@Directive({
  selector: '[appTypewriter]',
  standalone: true,
  host: { class: 'typewriter' }
})
export class TypewriterDirective implements OnInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly loader = inject(PageLoaderState);
  private observer?: IntersectionObserver;
  private timer?: ReturnType<typeof setTimeout>;
  private inView = false;
  private started = false;

  readonly text = input.required<string>({ alias: 'appTypewriter' });
  /** Milliseconds per character. */
  readonly speed = input(70, { alias: 'typeSpeed' });
  /** Milliseconds to wait after coming into view. */
  readonly delay = input(300, { alias: 'typeDelay' });

  constructor() {
    effect(() => {
      if (!this.loader.visible() && this.inView) this.start();
    });
  }

  ngOnInit(): void {
    const el = this.host.nativeElement;
    el.textContent = '';
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = this.text();
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        this.inView = true;
        this.observer?.disconnect();
        if (!this.loader.visible()) this.start();
      },
      { threshold: 0.4 }
    );
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.timer) clearTimeout(this.timer);
  }

  private start(): void {
    if (this.started) return;
    this.started = true;
    const text = this.text();
    const el = this.host.nativeElement;
    let i = 0;
    const tick = () => {
      el.textContent = text.slice(0, ++i);
      if (i < text.length) this.timer = setTimeout(tick, this.speed());
    };
    this.timer = setTimeout(tick, this.delay());
  }
}
