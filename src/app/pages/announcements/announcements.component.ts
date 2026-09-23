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
import { UncodeAnimDirective } from '../../shared/uncode-anim.directive';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [UncodeAnimDirective],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss'
})
export class AnnouncementsComponent implements OnInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly fullpageState = inject(FullpageStateService);
  private animating = false;
  private touchStartY = 0;
  private touchStartScrollTop = 0;
  private readonly onWheelBound = (e: WheelEvent) => this.handleWheel(e);

  readonly active = signal(0);
  readonly showingFooter = signal(false);
  /** 0 = on the slides; 1.. = page slid up past the last slide to the footer. */
  readonly extraStage = signal(0);

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
      mediaLeft: true,
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
      mediaLeft: false,
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
  }

  ngOnDestroy(): void {
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

    window.setTimeout(() => {
      this.animating = false;
    }, 900);
  }

  /**
   * Past the last slide the page stays scroll-locked and slides the footer up
   * like one more slide (styles.scss: body.page-shift). A footer taller than the
   * screen is split into screen-sized steps so nothing is skipped on phones.
   */
  private extraStops(): number[] {
    const footer = this.document.querySelector<HTMLElement>('app-footer')?.offsetHeight ?? 0;
    const view = window.innerHeight;
    const stops = [0];
    let last = 0;
    while (footer - last > view * 0.9) {
      last += Math.round(view * 0.8);
      stops.push(last);
    }
    if (footer > last) stops.push(footer);
    return stops;
  }

  private setExtraStage(stage: number): void {
    const stops = this.extraStops();
    const clamped = Math.max(0, Math.min(stage, stops.length - 1));
    this.extraStage.set(clamped);
    const body = this.document.body;
    body.style.setProperty('--page-shift', `${stops[clamped]}px`);
    body.classList.toggle('page-shift', clamped > 0);
    this.showingFooter.set(clamped > 0);
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
    // content first; only at the edge does the wheel change slides.
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
    const section = this.document.querySelectorAll<HTMLElement>('.ann-track > .ann-slide')[index];
    return section?.querySelector<HTMLElement>('.slide-inner') ?? null;
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
