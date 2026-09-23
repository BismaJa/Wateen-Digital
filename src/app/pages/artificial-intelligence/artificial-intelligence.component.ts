import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FullpageStateService } from '../../shared/fullpage-state.service';
import { DemoModalService } from '../../shared/demo-modal.service';
import { UncodeAnimDirective } from '../../shared/uncode-anim.directive';
import { BadgeCarousel } from '../../shared/badge-carousel';

@Component({
  selector: 'app-artificial-intelligence',
  standalone: true,
  imports: [UncodeAnimDirective],
  templateUrl: './artificial-intelligence.component.html',
  styleUrl: './artificial-intelligence.component.scss'
})
export class ArtificialIntelligenceComponent implements OnInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly fullpageState = inject(FullpageStateService);
  private readonly demoModal = inject(DemoModalService);
  private animating = false;
  private touchStartY = 0;
  private touchStartScrollTop = 0;
  private readonly onWheelBound = (e: WheelEvent) => this.handleWheel(e);

  readonly active = signal(0);
  readonly showingFooter = signal(false);
  /** 0 = on the slides; 1.. = page slid up past the last slide (logos, then footer). */
  readonly extraStage = signal(0);
  /** True once the technology-logo band has scrolled into view (starts its entrance). */
  readonly techInView = signal(false);

  readonly slides = [
    { id: 'artificial-intelligence', label: 'Artificial Intelligence' },
    { id: 'ai-vision-analytics', label: 'Ai Vision Analytics' },
    { id: 'enterprise-analytics-chatbot', label: 'Enterprise Analytics Chatbot' },
    { id: 'object-recognition', label: 'Object Recognition' },
    { id: 'ai-driven-biomechanics', label: 'AI-Driven Biomechanics' },
    { id: 'automated-customer-care', label: 'Automated Customer Care' },
    { id: 'smart-gesture-recognition', label: 'Smart Gesture Recognition' },
    { id: 'next-gen-virtual-try-on', label: 'Next-Gen Virtual Try-On' },
    { id: 'ai-driven-infrastructure-protection', label: 'AI-Driven Infrastructure Protection' },
    { id: 'health-management-solution', label: 'Health Management Solution' },
    { id: 'smart-building-management-solution', label: 'Smart Building Management Solution' },
    { id: 'our-expertise-in-ai-solutions', label: 'Our Expertise in AI Solutions' }
  ];

  readonly expertiseCards = [
    {
      title: 'Natural Language Processing (NLP)',
      icon: 'assets/images/ai/Natural-Language-Processing-NLP.png'
    },
    {
      title: 'Computer Vision (CV)',
      icon: 'assets/images/ai/Computer-Vision-CV.png'
    },
    {
      title: 'Reinforcement Learning (RL)',
      icon: 'assets/images/ai/Reinforcement-Learning-RL.png'
    },
    {
      title: 'Generative Models',
      icon: 'assets/images/ai/Generative-Models.png'
    },
    {
      title: 'Predictive Analytics',
      icon: 'assets/images/ai/Predictive-Analytics.png'
    },
    {
      title: 'Recommendation Systems',
      icon: 'assets/images/ai/Recommendation-Systems.png'
    }
  ];

  readonly techPages = [
    [
      'assets/images/ai/Prophet.png',
      'assets/images/ai/OpenCV.png',
      'assets/images/ai/OpenAI.png',
      'assets/images/ai/NVIDIA-StyleGAN.png',
      'assets/images/ai/NLTK.png',
      'assets/images/ai/lightFM.png',
      'assets/images/ai/Keras.png'
    ],
    [
      'assets/images/ai/Google-Gemini.png',
      'assets/images/ai/Detectron2.png',
      'assets/images/ai/AWS.png',
      'assets/images/ai/Tensorflow.png',
      'assets/images/ai/SpaCy_logo.svg.png',
      'assets/images/ai/scikit-learn.png',
      'assets/images/ai/Ray-RLlib.png'
    ],
    ['assets/images/ai/PyTorch.png']
  ];

  get isLast(): boolean {
    return this.active() === this.slides.length - 1;
  }

  openDemo(): void {
    const label = this.slides[this.active()]?.label ?? '';
    this.demoModal.show(label === 'Artificial Intelligence' || label === 'Our Expertise in AI Solutions' ? '' : label);
  }

  ngOnInit(): void {
    this.document.body.classList.add('fullpage-lock', 'home-fullpage');
    this.document.documentElement.classList.add('fullpage-lock');
    this.fullpageState.lightSlide.set(false);
    this.document.body.classList.remove('nav-on-light', 'showing-home-footer');
    window.addEventListener('wheel', this.onWheelBound, { passive: false });
    // Technology logos advance one at a time while the last slide is showing.
    this.techTimer = setInterval(() => {
      if (this.isLast) this.tech.autoStep();
    }, 1800);
  }

  ngOnDestroy(): void {
    clearInterval(this.techTimer);
    this.document.body.classList.remove(
      'fullpage-lock',
      'home-fullpage',
      'nav-on-light',
      'showing-home-footer',
      'page-shift'
    );
    this.document.body.style.removeProperty('--page-shift');
    this.document.documentElement.classList.remove('fullpage-lock');
    window.removeEventListener('wheel', this.onWheelBound);
    this.fullpageState.lightSlide.set(false);
  }

  goTo(index: number): void {
    if (this.animating) return;
    if (index < 0 || index >= this.slides.length) return;
    if (index === this.active() && this.extraStage() === 0) return;

    this.animating = true;
    this.setExtraStage(0);
    // Entering from above starts at the top of a tall slide; coming back up starts at its end.
    const inner = this.slideInner(index);
    if (inner) inner.scrollTop = index > this.active() ? 0 : inner.scrollHeight;
    this.active.set(index);
    this.syncNavTheme(index);

    window.setTimeout(() => {
      this.animating = false;
    }, 900);
  }

  private syncNavTheme(index: number): void {
    const light = index === 1 || index === 3 || index === 5 || index === 7 || index === 9;
    this.fullpageState.lightSlide.set(light);
    this.document.body.classList.toggle('nav-on-light', light);
  }

  /**
   * Past the last slide the page stays scroll-locked and slides up in steps, like
   * one more slide each time: first the technology-logo band, then the footer
   * (styles.scss: body.page-shift). Steps taller than the screen are split so
   * nothing is skipped on phones.
   */
  private extraStops(): number[] {
    const tech = this.document.querySelector<HTMLElement>('.expertise-tech')?.offsetHeight ?? 0;
    const footer = this.document.querySelector<HTMLElement>('app-footer')?.offsetHeight ?? 0;
    const view = window.innerHeight;
    const stops = [0];
    for (const edge of [tech, tech + footer]) {
      let last = stops[stops.length - 1];
      while (edge - last > view * 0.9) {
        last += Math.round(view * 0.8);
        stops.push(last);
      }
      if (edge > last) stops.push(edge);
    }
    return stops;
  }

  private setExtraStage(stage: number): void {
    const stops = this.extraStops();
    const clamped = Math.max(0, Math.min(stage, stops.length - 1));
    this.extraStage.set(clamped);
    const body = this.document.body;
    body.style.setProperty('--page-shift', `${stops[clamped]}px`);
    body.classList.toggle('page-shift', clamped > 0);
    if (clamped > 0) this.techInView.set(true);
    const atFooter = clamped > 0 && clamped === stops.length - 1;
    this.showingFooter.set(atFooter);
  }

  private stepExtra(direction: 1 | -1): boolean {
    const target = this.extraStage() + direction;
    if (target < 0 || target >= this.extraStops().length) return false;
    this.animating = true;
    this.setExtraStage(target);
    window.setTimeout(() => {
      this.animating = false;
    }, 900);
    return true;
  }

  next(): void {
    if (this.animating) return;
    if (this.isLast) {
      this.stepExtra(1);
      return;
    }
    this.goTo(this.active() + 1);
  }

  prev(): void {
    if (this.animating) return;
    if (this.isLast && this.stepExtra(-1)) return;
    this.goTo(this.active() - 1);
  }

  readonly tech = new BadgeCarousel(this.techPages);
  private techTimer?: ReturnType<typeof setInterval>;

  @HostListener('window:keydown', ['$event'])
  onKey(event: KeyboardEvent): void {
    if (this.overlayOpen()) return;
    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
      event.preventDefault();
      this.next();
    } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      event.preventDefault();
      this.prev();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.extraStage() > 0) this.setExtraStage(this.extraStage());
  }

  private handleWheel(event: WheelEvent): void {
    if (this.overlayOpen()) return;

    event.preventDefault();
    if (this.animating) return;

    // Slides taller than the screen (stacked on phones) scroll through their own
    // content first; only at the edge does the wheel change slides. Once the page
    // has slid past the last slide, the wheel only moves between those steps.
    const inner = this.slideInner();
    if (this.extraStage() === 0 && inner && event.deltaY !== 0 && this.canScrollInner(inner, event.deltaY > 0)) {
      inner.scrollBy({ top: event.deltaY });
      return;
    }

    if (event.deltaY > 30) this.next();
    else if (event.deltaY < -30) this.prev();
  }

  @HostListener('window:touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStartY = event.touches[0]?.clientY ?? 0;
    this.touchStartScrollTop = this.slideInner()?.scrollTop ?? 0;
  }

  @HostListener('window:touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    if (this.overlayOpen()) return;
    const endY = event.changedTouches[0]?.clientY ?? 0;
    const diff = this.touchStartY - endY;
    if (Math.abs(diff) < 50) return;

    // The swipe natively scrolled the slide's own content; only change slides when
    // the swipe started at that content's top/bottom edge.
    if (
      this.extraStage() === 0 &&
      this.canScrollInner(this.slideInner(), diff > 0, this.touchStartScrollTop)
    ) {
      return;
    }

    if (diff > 0) this.next();
    else this.prev();
  }

  private slideInner(index = this.active()): HTMLElement | null {
    const section = this.document.querySelectorAll<HTMLElement>('.ai-track > .ai-slide')[index];
    return section?.querySelector<HTMLElement>('.slide-inner, .expertise-cards') ?? null;
  }

  private canScrollInner(inner: HTMLElement | null, down: boolean, scrollTop = inner?.scrollTop ?? 0): boolean {
    if (!inner || inner.scrollHeight <= inner.clientHeight + 2) return false;
    // Only a real scroll container counts: content merely overflowing a
    // non-scrolling slide must not block moving on to the next slide.
    const overflowY = getComputedStyle(inner).overflowY;
    if (overflowY !== 'auto' && overflowY !== 'scroll') return false;
    return down ? scrollTop + inner.clientHeight < inner.scrollHeight - 2 : scrollTop > 2;
  }

  /** The mobile menu or the demo modal is covering the page: slides stay put. */
  private overlayOpen(): boolean {
    const body = this.document.body.classList;
    return body.contains('menu-open-lock') || body.contains('demo-modal-open');
  }
}
