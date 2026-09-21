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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroVideo') heroVideo?: ElementRef<HTMLVideoElement>;

  private readonly document = inject(DOCUMENT);
  private readonly fullpageState = inject(FullpageStateService);
  private animating = false;
  private touchStartY = 0;
  private timers: ReturnType<typeof setInterval>[] = [];
  private readonly onWheelBound = (e: WheelEvent) => this.handleWheel(e);
  readonly showingFooter = signal(false);

  readonly active = signal(0);
  readonly focusIndex = signal(0);
  /** Original shows ~3 cards; with 4 items we get 2 carousel positions (dots). */
  readonly focusDotCount = 2;
  readonly partnerIndex = signal(0);
  readonly certPage = signal(0);

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

  readonly whyChoose = [
    {
      title: 'Experience',
      text: 'Certified and trained resources in Gartner leading platforms and solutions.',
      icon: 'assets/images/Experience-icon.png'
    },
    {
      title: 'Partnerships',
      text: 'Strong partnerships with leading Global OEMs.',
      icon: 'assets/images/Partnerships-icon.png'
    },
    {
      title: 'Skill Readiness',
      text: 'Wateen already has 500+ Advanced Technical, IT, and telecom resources for Telecom Deployment Services, enterprise solutions and Professional Services Projects in UAE.',
      icon: 'assets/images/Skill-Readiness-icon.png'
    },
    {
      title: 'Operating Model',
      text: 'Sales & Technical Sales resource presence in UAE to be supported by a strong Pakistan based team to be used for project delivery.',
      icon: 'assets/images/operating-icon.png'
    }
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
        this.partnerIndex.update((i) => (i + 1) % this.partners.length);
      }, 3200)
    );
    this.timers.push(
      setInterval(() => {
        this.certPage.update((i) => (i + 1) % this.certBadges.length);
      }, 4000)
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
      'showing-home-footer'
    );
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
    if (event.deltaY > 30) this.next();
    else if (event.deltaY < -30) this.prev();
  }

  private enterFooter(): void {
    if (this.showingFooter() || this.animating) return;
    this.animating = true;
    this.showingFooter.set(true);
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
  }

  @HostListener('window:touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    const endY = event.changedTouches[0]?.clientY ?? 0;
    const diff = this.touchStartY - endY;
    if (Math.abs(diff) < 50) return;
    if (diff > 0) this.next();
    else this.prev();
  }

  visibleFocusCards() {
    const start = this.focusIndex();
    return this.focusAreas.slice(start, start + 3);
  }

  visibleCertBadges(): string[] {
    return this.certBadges[this.certPage()] ?? this.certBadges[0];
  }

  visiblePartners(): string[] {
    return this.partners[this.partnerIndex()] ?? this.partners[0];
  }

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
