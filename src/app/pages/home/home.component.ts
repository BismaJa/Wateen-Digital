import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  signal,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { FullpageStateService } from '../../shared/fullpage-state.service';
import { UncodeAnimDirective, UncodeAnimType } from '../../shared/uncode-anim.directive';
import { CountUpDirective } from '../../shared/count-up.directive';
import { BadgeCarousel } from '../../shared/badge-carousel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, UncodeAnimDirective, CountUpDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroVideo') heroVideo?: ElementRef<HTMLVideoElement>;

  private readonly document = inject(DOCUMENT);
  private readonly fullpageState = inject(FullpageStateService);
  private animating = false;
  private touchStartY = 0;
  private touchStartScrollTop = 0;
  /** True while the footer is shown by sliding the locked page up (vs. native scroll). */
  private footerReveal = false;
  private timers: ReturnType<typeof setInterval>[] = [];
  private readonly onWheelBound = (e: WheelEvent) => this.handleWheel(e);
  readonly showingFooter = signal(false);

  readonly active = signal(0);
  readonly focusIndex = signal(0);

  readonly certBadges = [
    [
      'assets/images/certs/c.png',
      'assets/images/certs/ccnp.png',
      'assets/images/certs/certification-itil.png',
      'assets/images/certs/hcie.png',
      'assets/images/certs/hcnp.png',
      'assets/images/certs/Java.png',
      'assets/images/certs/microsoft.png'
    ],
    [
      'assets/images/certs/microsoft-certified-professional.png',
      'assets/images/certs/net.png',
      'assets/images/certs/angular.png',
      'assets/images/certs/pmi-certified.png',
      'assets/images/certs/vmware-certified.png',
      'assets/images/certs/hcie.png',
      'assets/images/certs/hcnp.png'
    ],
    [
      'assets/images/certs/Java.png',
      'assets/images/certs/ccnp.png',
      'assets/images/certs/certification-itil.png',
      'assets/images/certs/c.png',
      'assets/images/certs/microsoft.png',
      'assets/images/certs/net.png',
      'assets/images/certs/angular.png'
    ]
  ];

  readonly slides = [
    { id: 'welcome', label: 'Welcome' },
    { id: 'services', label: 'Services' },
    { id: 'who-we-are', label: 'Who We Are' },
    { id: 'why-choose-wateen', label: 'Why Choose Wateen' },
    { id: 'announcements', label: 'Announcements' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'partners', label: 'Partners' },
    { id: 'contact', label: 'Contact' }
  ];

  readonly focusAreas = [
    {
      title: 'Professional Services',
      image: 'assets/images/Professional-Services-image.jpg',
      link: '/services/professional-services'
    },
    {
      title: 'Enterprise Solutions',
      image: 'assets/images/enterprises-solution-services.jpg',
      link: '/services/enterprise-solutions-services'
    },
    {
      title: 'Managed Cyber Security',
      image: 'assets/images/cyber-security.jpg',
      link: '/services/managed-cyber-security'
    },
    {
      title: 'Telecom Expertise',
      image: 'assets/images/telecom.jpg',
      link: '/services/telecom-expertise'
    }
  ];

  get focusDotCount(): number {
    return window.innerWidth <= 576 ? this.focusAreas.length : 2;
  }

  focusDotIndices(): number[] {
    return Array.from({ length: this.focusDotCount }, (_, index) => index);
  }

  readonly whyChoose: {
    title: string;
    text: string;
    icon: string;
    anim: UncodeAnimType;
    delay: number;
  }[] = [
    {
      title: 'Experience',
      text: 'Certified and trained resources in Gartner leading platforms and solutions.',
      icon: 'assets/images/Experience-icon.png',
      anim: 'left-t-right',
      delay: 700
    },
    {
      title: 'Partnerships',
      text: 'Strong partnerships with leading Global OEMs.',
      icon: 'assets/images/Partnerships-icon.png',
      anim: 'bottom-t-top',
      delay: 1000
    },
    {
      title: 'Skill Readiness',
      text: 'Wateen already has 500+ Advanced Technical, IT, and telecom resources for Telecom Deployment Services, enterprise solutions and Professional Services Projects in UAE.',
      icon: 'assets/images/Skill-Readiness-icon.png',
      anim: 'top-t-bottom',
      delay: 1300
    },
    {
      title: 'Operating Model',
      text: 'Sales & Technical Sales resource presence in UAE to be supported by a strong Pakistan based team to be used for project delivery.',
      icon: 'assets/images/operating-icon.png',
      anim: 'right-t-left',
      delay: 1600
    }
  ];

  readonly socials = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/', delay: 0 },
    { label: 'X', href: 'https://twitter.com/', delay: 50 },
    { label: 'Facebook', href: 'https://www.facebook.com/', delay: 100 },
    { label: 'Instagram', href: 'https://www.instagram.com/', delay: 150 }
  ];

  readonly announcements = [
    {
      title:
        'Wateen Digital Solutions Signs MoU with AAA Law Firm to Advance Digital Transformation in the UAE’s Legal Sector',
      image: 'assets/images/AAA-Law-Firm.jpg',
      link: '/announcements'
    },
    {
      title:
        'Wateen Digital Solutions and CDM Smith UAE: A Partnership Driven by Vision and Progress',
      image: 'assets/images/CDM-Smith-new.jpg',
      link: '/announcements'
    }
  ];

  readonly partners = [
    // page 1 — matches live Our Partners carousel
    [
      'assets/images/partners/fortinet.png',
      'assets/images/partners/Wateen-Logos.png',
      'assets/images/partners/splunk.png',
      'assets/images/partners/solarwinds.png',
      'assets/images/partners/snowflake.png',
      'assets/images/partners/Sentinals.png',
      'assets/images/partners/Oracle.png'
    ],
    // page 2
    [
      'assets/images/partners/logrhythm.png',
      'assets/images/partners/Juniper.png',
      'assets/images/partners/fortinet.png',
      'assets/images/partners/Wateen-Logos.png',
      'assets/images/partners/splunk.png',
      'assets/images/partners/solarwinds.png',
      'assets/images/partners/snowflake.png'
    ]
  ];

  ngOnInit(): void {
    this.document.body.classList.add('fullpage-lock');
    this.document.documentElement.classList.add('fullpage-lock');
    this.document.body.classList.add('home-fullpage');
    window.addEventListener('wheel', this.onWheelBound, { passive: false });
    this.syncNavTheme(this.active());

    this.timers.push(
      setInterval(() => {
        this.focusIndex.update((i) => (i + 1) % this.focusDotCount);
      }, 4500)
    );
    this.timers.push(
      setInterval(() => {
        // Logo carousels advance one item at a time, only while their slide is visible.
        if (this.active() === 5) this.certs.autoStep();
        if (this.active() === 6) this.partnerCarousel.autoStep();
      }, 1800)
    );
  }

  ngAfterViewInit(): void {
    const video = this.heroVideo?.nativeElement;
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    const play = () => {
      video.play().catch(() => {
        // retry once after short delay (browser autoplay quirks)
        window.setTimeout(() => video.play().catch(() => undefined), 400);
      });
    };
    if (video.readyState >= 2) play();
    else video.addEventListener('loadeddata', play, { once: true });
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove(
      'fullpage-lock',
      'home-fullpage',
      'nav-on-light',
      'showing-home-footer',
      'home-footer-reveal'
    );
    this.document.body.style.removeProperty('--home-footer-shift');
    this.document.documentElement.classList.remove('fullpage-lock');
    window.removeEventListener('wheel', this.onWheelBound);
    this.fullpageState.lightSlide.set(false);
    this.timers.forEach(clearInterval);
  }

  goTo(index: number): void {
    if (this.showingFooter()) {
      this.exitFooter(index);
      return;
    }
    if (this.animating) return;
    if (index < 0 || index >= this.slides.length) return;
    if (index === this.active()) return;
    this.animating = true;
    // Entering from above starts at the top of a tall slide; coming back up starts at its end.
    const inner = this.slideInner(index);
    if (inner) inner.scrollTop = index > this.active() ? 0 : inner.scrollHeight;
    this.active.set(index);
    this.syncNavTheme(index);
    window.setTimeout(() => {
      this.animating = false;
    }, 900);
  }

  next(): void {
    const last = this.slides.length - 1;
    if (this.active() >= last) {
      this.enterFooter();
      return;
    }
    this.goTo(this.active() + 1);
  }

  prev(): void {
    if (this.showingFooter()) {
      this.exitFooter(this.slides.length - 1);
      return;
    }
    this.goTo(this.active() - 1);
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

    if (this.showingFooter()) {
      if (event.deltaY < -30 && window.scrollY <= 8) {
        event.preventDefault();
        if (!this.animating) this.exitFooter(this.slides.length - 1);
      }
      return;
    }

    event.preventDefault();
    if (this.animating) return;

    // Slides taller than the screen (stacked cards on small screens) scroll through
    // their own content first; only at the edge does the wheel change slides.
    const inner = this.slideInner();
    if (inner && event.deltaY !== 0 && this.canScrollInner(inner, event.deltaY > 0)) {
      inner.scrollBy({ top: event.deltaY });
      return;
    }

    if (event.deltaY > 30) this.next();
    else if (event.deltaY < -30) this.prev();
  }

  private enterFooter(): void {
    if (this.showingFooter() || this.animating) return;
    this.animating = true;
    this.showingFooter.set(true);

    // Footer fits on screen: slide the page up by the footer's height like one more
    // slide (styles.scss: body.home-footer-reveal), keeping the page scroll-locked.
    const footerHeight = this.footerHeight();
    if (footerHeight > 0 && footerHeight <= window.innerHeight) {
      this.footerReveal = true;
      this.document.body.style.setProperty('--home-footer-shift', `${footerHeight}px`);
      this.document.body.classList.add('home-footer-reveal');
      window.setTimeout(() => {
        this.animating = false;
      }, 900);
      return;
    }

    // Footer taller than the screen (stacked on phones): fall back to native scrolling.
    this.document.body.classList.remove('fullpage-lock');
    this.document.documentElement.classList.remove('fullpage-lock');
    this.document.body.classList.add('showing-home-footer');
    window.setTimeout(() => {
      const footer = this.document.querySelector('app-footer');
      footer?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.animating = false;
    }, 40);
  }

  private exitFooter(slideIndex = this.slides.length - 1): void {
    if (!this.showingFooter() || this.animating) return;
    this.animating = true;

    if (this.footerReveal) {
      this.footerReveal = false;
      this.document.body.classList.remove('home-footer-reveal');
      this.showingFooter.set(false);
      if (slideIndex !== this.active()) {
        this.active.set(slideIndex);
        this.syncNavTheme(slideIndex);
      }
      window.setTimeout(() => {
        this.animating = false;
      }, 900);
      return;
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
    this.showingFooter.set(false);
    this.document.body.classList.remove('showing-home-footer');
    this.document.body.classList.add('fullpage-lock');
    this.document.documentElement.classList.add('fullpage-lock');
    this.active.set(slideIndex);
    this.syncNavTheme(slideIndex);
    window.setTimeout(() => {
      this.animating = false;
    }, 200);
  }

  @HostListener('window:touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStartY = event.touches[0]?.clientY ?? 0;
    this.touchStartScrollTop = this.slideInner()?.scrollTop ?? 0;
  }

  @HostListener('window:touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    const endY = event.changedTouches[0]?.clientY ?? 0;
    const diff = this.touchStartY - endY;
    if (Math.abs(diff) < 50) return;
    // The swipe natively scrolled the slide's own content; only change slides when
    // the swipe started at that content's top/bottom edge.
    const inner = this.slideInner();
    if (!this.showingFooter() && this.canScrollInner(inner, diff > 0, this.touchStartScrollTop)) return;
    if (diff > 0) this.next();
    else this.prev();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.footerReveal) return;
    this.document.body.style.setProperty('--home-footer-shift', `${this.footerHeight()}px`);
  }

  private footerHeight(): number {
    return this.document.querySelector<HTMLElement>('app-footer')?.offsetHeight ?? 0;
  }

  private slideInner(index = this.active()): HTMLElement | null {
    const section = this.document.querySelectorAll<HTMLElement>('.fullpage-track > .fp-section')[index];
    return section?.querySelector<HTMLElement>('.fp-inner') ?? null;
  }

  private canScrollInner(inner: HTMLElement | null, down: boolean, scrollTop = inner?.scrollTop ?? 0): boolean {
    if (!inner || inner.scrollHeight <= inner.clientHeight + 2) return false;
    return down ? scrollTop + inner.clientHeight < inner.scrollHeight - 2 : scrollTop > 2;
  }

  visibleFocusCards() {
    const start = this.focusIndex();
    return this.focusAreas.slice(start, start + 3);
  }

  readonly certs = new BadgeCarousel(this.certBadges);
  readonly partnerCarousel = new BadgeCarousel(this.partners);

  isLightSlide(): boolean {
    // slides with white/light backgrounds need dark header treatment
    const i = this.active();
    return i === 1 || i === 3 || i === 7;
  }

  private syncNavTheme(index: number): void {
    const light = index === 1 || index === 3 || index === 7;
    this.fullpageState.lightSlide.set(light);
    this.document.body.classList.toggle('nav-on-light', light);
  }
}
