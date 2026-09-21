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

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss'
})
export class AnnouncementsComponent implements OnInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly fullpageState = inject(FullpageStateService);
  private animating = false;
  private touchStartY = 0;
  private lastSlideScrollReady = false;
  private lastSlideReadyTimer: number | null = null;
  private readonly onWheelBound = (e: WheelEvent) => this.handleWheel(e);
  private readonly onScrollBound = () => this.syncFooterVisibility();

  readonly active = signal(0);
  readonly showingFooter = signal(false);

  readonly slides = [
    {
      id: 'announcements',
      label: 'Announcements',
      background: 'assets/images/announcements/Announcements.jpg',
      type: 'hero' as const,
      title: 'Announcements',
      body: 'Discover the latest news, strategic collaborations, and corporate achievements at Wateen Digital Solutions. We continue to expand our impact in the digital transformation landscape.'
    },
    {
      id: 'aaa-law-firm',
      label: 'MoU with AAA Law Firm',
      background: 'assets/images/announcements/Signs-MoU.jpg',
      media: 'assets/images/announcements/AAA-Law-Firm.png',
      type: 'article' as const,
      title:
        'Wateen Digital Solutions Signs MoU with AAA Law Firm to Advance Digital Transformation in the UAE’s Legal Sector',
      paragraphs: [
        'Wateen Digital Solutions and AAA Law Firm have formalized a strategic MoU to drive digital transformation across the UAE’s legal industry by introducing an entirely new technology.',
        'The collaboration will leverage Wateen Digital Solutions’ eContracts Platform, integrating blockchain security, digital signatures, and automated workflows, to bring transparency, compliance, and operational efficiency to legal processes.',
        'This partnership marks another step in Wateen Digital Solutions’ mission to empower businesses with secure, intelligent, and future-ready digital solutions.'
      ]
    },
    {
      id: 'cdm-smith',
      label: 'CDM Smith UAE Partnership',
      background: 'assets/images/announcements/Wateen-CDM-Smith.jpg',
      media: 'assets/images/announcements/CDM-Smith-1.png',
      type: 'article' as const,
      title:
        'Wateen Digital Solutions and CDM Smith UAE: A Partnership Driven by Vision and Progress',
      paragraphs: [
        'Built on a shared vision for innovation, Wateen Digital Solutions and CDM Smith UAE continue their journey of transforming how organizations operate through the power of data and technology.',
        'Since 2023, Wateen Digital Solutions has worked alongside CDM Smith UAE to digitize and streamline project management through Project Pulse, a platform that unites data, people, and performance.',
        'This collaboration stands as a testament to innovation in action, redefining digital transformation with trust, intelligence, and a collective drive to build smarter, more connected organizations.'
      ]
    }
  ];

  get isLast(): boolean {
    return this.active() === this.slides.length - 1;
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
    if (this.lastSlideReadyTimer != null) window.clearTimeout(this.lastSlideReadyTimer);
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
    this.fullpageState.lightSlide.set(false);
    this.document.body.classList.remove('nav-on-light');
    this.syncPageScrollMode(index);
    this.showingFooter.set(false);

    window.setTimeout(() => {
      this.animating = false;
    }, 900);
  }

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
    const inFooter = footer.getBoundingClientRect().top < window.innerHeight * 0.55;
    this.showingFooter.set(inFooter);
    this.document.body.classList.toggle('showing-home-footer', inFooter);
  }

  next(): void {
    if (this.isLast) {
      if (!this.lastSlideScrollReady) return;
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
