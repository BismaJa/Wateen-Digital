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
  /** After landing on last slide, ignore wheel until settle (blocks trackpad scroll-through). */
  private lastSlideScrollReady = false;
  private lastSlideReadyTimer: number | null = null;
  private readonly onWheelBound = (e: WheelEvent) => this.handleWheel(e);
  private readonly onScrollBound = () => this.syncFooterVisibility();

  readonly active = signal(0);
  readonly showingFooter = signal(false);
  readonly techPage = signal(0);

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
    window.addEventListener('scroll', this.onScrollBound, { passive: true });
  }

  ngOnDestroy(): void {
    if (this.lastSlideReadyTimer != null) {
      window.clearTimeout(this.lastSlideReadyTimer);
    }
    this.document.body.classList.remove(
      'fullpage-lock',
      'home-fullpage',
      'nav-on-light',
      'showing-home-footer'
    );
    this.document.documentElement.classList.remove('fullpage-lock');
    window.removeEventListener('wheel', this.onWheelBound);
    window.removeEventListener('scroll', this.onScrollBound);
    this.fullpageState.lightSlide.set(false);
  }

  goTo(index: number): void {
    if (this.animating) return;
    if (index < 0 || index >= this.slides.length) return;
    if (index === this.active() && window.scrollY <= 2) return;

    this.animating = true;
    window.scrollTo({ top: 0, behavior: 'auto' });
    this.active.set(index);
    this.syncNavTheme(index);
    this.syncPageScrollMode(index);
    this.showingFooter.set(false);

    window.setTimeout(() => {
      this.animating = false;
    }, 900);
  }

  private syncNavTheme(index: number): void {
    const light = index === 1 || index === 3 || index === 5 || index === 7 || index === 9;
    this.fullpageState.lightSlide.set(light);
    this.document.body.classList.toggle('nav-on-light', light);
  }

  /** Last slide: unlock body scroll after pin-to-title settle. */
  private syncPageScrollMode(index: number): void {
    const last = index === this.slides.length - 1;
    if (this.lastSlideReadyTimer != null) {
      window.clearTimeout(this.lastSlideReadyTimer);
      this.lastSlideReadyTimer = null;
    }

    if (last) {
      this.lastSlideScrollReady = false;
      window.scrollTo({ top: 0, behavior: 'auto' });
      this.document.body.classList.remove('fullpage-lock');
      this.document.documentElement.classList.remove('fullpage-lock');
      // Keep pinned to title until slide animation + trackpad inertia die down
      this.lastSlideReadyTimer = window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
        this.lastSlideScrollReady = true;
        this.lastSlideReadyTimer = null;
      }, 950);
    } else {
      this.lastSlideScrollReady = false;
      this.document.body.classList.add('fullpage-lock');
      this.document.documentElement.classList.add('fullpage-lock');
      this.document.body.classList.remove('showing-home-footer');
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }

  private syncFooterVisibility(): void {
    if (!this.isLast) {
      this.showingFooter.set(false);
      this.document.body.classList.remove('showing-home-footer');
      return;
    }
    if (!this.lastSlideScrollReady) {
      if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: 'auto' });
      this.showingFooter.set(false);
      return;
    }
    const footer = this.document.querySelector('app-footer') as HTMLElement | null;
    if (!footer) return;
    const top = footer.getBoundingClientRect().top;
    const inFooter = top < window.innerHeight * 0.55;
    this.showingFooter.set(inFooter);
    this.document.body.classList.toggle('showing-home-footer', inFooter);
  }

  next(): void {
    if (this.isLast) {
      if (!this.lastSlideScrollReady) return;
      if (window.scrollY < 8) {
        this.document
          .querySelector('.expertise-tech')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      this.document
        .querySelector('app-footer')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    this.goTo(this.active() + 1);
  }

  prev(): void {
    if (this.isLast && window.scrollY > 8) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    this.goTo(this.active() - 1);
  }

  visibleTech(): string[] {
    return this.techPages[this.techPage()] ?? this.techPages[0];
  }

  @HostListener('window:keydown', ['$event'])
  onKey(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
      event.preventDefault();
      this.next();
    } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      event.preventDefault();
      this.prev();
    }
  }

  private handleWheel(event: WheelEvent): void {
    if (this.document.body.classList.contains('menu-open-lock')) return;

    if (this.isLast) {
      // Pin to title until ready — stops trackpad from skipping past the heading
      if (!this.lastSlideScrollReady) {
        event.preventDefault();
        if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }
      if (event.deltaY < -30 && window.scrollY <= 2) {
        event.preventDefault();
        if (!this.animating) this.goTo(this.slides.length - 2);
      }
      return;
    }

    event.preventDefault();
    if (this.animating) return;
    if (event.deltaY > 30) this.next();
    else if (event.deltaY < -30) this.prev();
  }

  @HostListener('window:touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStartY = event.touches[0]?.clientY ?? 0;
  }

  @HostListener('window:touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    const endY = event.changedTouches[0]?.clientY ?? 0;
    const diff = this.touchStartY - endY;
    if (Math.abs(diff) < 50) return;

    if (this.isLast) {
      if (!this.lastSlideScrollReady) return;
      if (diff < 0 && window.scrollY <= 8) this.prev();
      return;
    }

    if (diff > 0) this.next();
    else this.prev();
  }
}
