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

export interface ProductSlide {
  id: string;
  label: string;
  title: string;
  description: string;
  features: string[];
  outcome: string;
  background: string;
  media: string;
  /** Media on the left (true) or right (false) */
  mediaLeft: boolean;
  /** Light text on dark bg */
  dark: boolean;
  overlay?: number;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [UncodeAnimDirective],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly fullpageState = inject(FullpageStateService);
  private readonly demoModal = inject(DemoModalService);
  private animating = false;
  private touchStartY = 0;
  private touchStartScrollTop = 0;
  private readonly onWheelBound = (e: WheelEvent) => this.handleWheel(e);

  readonly active = signal(0);
  readonly showingFooter = signal(false);
  /** 0 = on the slides; 1.. = page slid up past the last slide to the footer. */
  readonly extraStage = signal(0);

  readonly hero = {
    background: 'assets/images/products/Professional-Services-w.jpg',
    titleBlue: 'Our',
    titleRest: 'Products',
    description:
      "Explore Wateen Digital Solutions’ innovative products designed to enhance connectivity, optimize energy use, and streamline operations. From AI-driven management tools to intelligent chatbots, our solutions empower businesses to achieve greater efficiency and success. Transform your organization with our cutting-edge technology today!"
  };

  readonly products: ProductSlide[] = [
    {
      id: 'campus-management-system',
      label: 'Campus Management System',
      title: 'Campus Management System',
      description:
        'Wateen’s ERP@Cloud is a comprehensive, web-based solution for seamless academic and administrative management in universities, colleges, and schools. It enhances efficiency, decision-making, and compliance, and is deployable on cloud or on-premises, aligned with HEC and global standards.',
      features: [
        'Complete ERP suite for Students, HR, Finance, Academics & Administration',
        'Cloud or on-premise deployment with paperless, role-based workflows',
        'Integrated payments, auto alerts, and HEC/global compliance support',
        'Real-time dashboards, mobile access, and multi-campus management'
      ],
      outcome:
        'Improved efficiency and accuracy through automation. Faster decision-making with real-time, reliable data. Enhanced transparency and compliance across operations.',
      background: 'assets/images/products/Smart-Energy-Monitoring-Platform.jpg',
      media: 'assets/images/products/campus-management-system.png',
      mediaLeft: true,
      dark: false,
      overlay: 0.55
    },
    {
      id: 'connect95',
      label: 'Connect95',
      title: 'Connect95',
      description:
        'Connect95 streamlines HR tasks and boosts employee engagement with a user-friendly interface, providing a single access point for managing attendance, payroll, and performance analytics. It helps organizations efficiently track and support their workforce.',
      features: [
        'Attendance Management',
        'HR Tasks',
        'Payslip Generation',
        'Timesheet Management',
        'Approvals',
        'Management Dashboard',
        'Employee Productivity Analytics'
      ],
      outcome:
        'Enhance employee efficiency and engagement with a single point of click, enabling organizations to foster a more productive and motivated workforce.',
      background: 'assets/images/products/Connect95.jpg',
      media: 'assets/images/products/Connect95withlogo.png',
      mediaLeft: false,
      dark: true,
      overlay: 0.45
    },
    {
      id: 'smart-energy-monitoring-platform',
      label: 'Smart Energy Monitoring Platform',
      title: 'Smart Energy Monitoring Platform',
      description:
        'Our Smart Energy Monitoring Platform provides real-time insights into energy generation and consumption, using advanced analytics to optimize energy use and forecast future needs, ensuring businesses can operate efficiently and sustainably.',
      features: [
        'Real-time monitoring of Energy Generation & Consumption by various sources',
        'Advanced Analytics',
        'Energy Optimization and Forecasting'
      ],
      outcome:
        'Achieve cost savings, promote environmental sustainability, and improve operational and maintenance efficiency.',
      background: 'assets/images/products/Smart-Energy-Monitoring-Platform.jpg',
      media: 'assets/images/products/Smart-Energy-Monitoring-Platform.png',
      mediaLeft: true,
      dark: false,
      overlay: 0.5
    },
    {
      id: 'ai-driven-proposal',
      label: 'AI-Driven Proposal and Project Cost Management',
      title: 'AI-Driven Proposal and Project Cost Management',
      description:
        'This platform automates key project management processes, from proposal creation to cost tracking, using AI-driven decision-making to improve efficiency and accuracy in budgeting and project delivery.',
      features: [
        'Proposal Creation',
        'Employee HR Module',
        'Project Task Tracking',
        'Advanced Reporting Module',
        'Invoice Management'
      ],
      outcome:
        'Automate project business processes with AI-driven decision-making for improved efficiency and accuracy in managing tasks, costs, and resources.',
      background:
        'assets/images/products/AI-Driven-Proposal-and-Project-Cost-Management.jpg',
      media:
        'assets/images/products/AI-Driven-Proposal-and-Project-Cost-Management.png',
      mediaLeft: false,
      dark: true,
      overlay: 0.5
    },
    {
      id: 'fleetops360',
      label: 'FleetOps360',
      title: 'FleetOps360',
      description:
        'Our FleetOps360 empowers businesses to efficiently manage fleet operations by providing real-time tracking, task assignment, and optimized resource utilization, ensuring better control and performance of fleet and field teams.',
      features: [
        'Real-time Tracking of Resources and Assets',
        'Offline Data Saving',
        'Task Assignment',
        'Attendance Logging',
        'Management Dashboards',
        'Route Optimization'
      ],
      outcome:
        'Achieve efficient fleet operations management, reduce turnaround time (TAT), and improve asset management for optimal field operation performance.',
      background: 'assets/images/products/Field-Force-Management-Solution.jpg',
      media: 'assets/images/products/Fleetops360.png',
      mediaLeft: true,
      dark: true,
      overlay: 0.5
    },
    {
      id: 'ai-based-chatbot',
      label: 'AI-Based Chatbot for Data Analytics',
      title: 'AI-Based Chatbot for Data Analytics',
      description:
        'This AI-driven chatbot transforms data analytics by offering human-like conversation capabilities, enabling business users to access insights, predictive analytics, and automated dashboards without the need for technical expertise.',
      features: [
        'Human-like Conversation',
        'Ease of Use',
        'Unification of Data Sources',
        'Predictive Analytics',
        'Real-time Insights',
        'Automated Dashboard Creation'
      ],
      outcome:
        'Enable faster decision-making, reduce manual data analysis, and empower business users with a simple, no-SQL solution that supports a variety of applications.',
      background: 'assets/images/products/AI-Based-Chatbot-for-Data-Analytics.jpg',
      media: 'assets/images/products/AI-Based-Chatbot-for-Data-Analytics.png',
      mediaLeft: false,
      dark: true,
      overlay: 0.5
    },
    {
      id: 'wateen-watapp',
      label: 'Wateen Watapp',
      title: 'Wateen Watapp',
      description:
        'Wateen Watapp offers seamless customer interaction, automating support, FAQs, bookings, and more, all within a familiar messaging platform, ensuring customers get fast, personalized responses around the clock.',
      features: [
        '24/7 Support',
        'FAQ Handling',
        'Customer Engagement',
        'Bookings and Reservations',
        'Customer Sentiment Analysis',
        'AI-based Suggestions'
      ],
      outcome:
        'Enhance customer satisfaction with faster response times, automate routine inquiries, reduce the need for human agents, and provide a widely accessible solution for customer engagement.',
      background: 'assets/images/products/WhatsApp-Chatbot.jpg',
      media: 'assets/images/products/The-Whatsapp.png',
      mediaLeft: true,
      dark: false,
      overlay: 0.35
    }
  ];

  readonly slides = [
    { id: 'our-products', label: 'Our Products' },
    ...this.products.map((p) => ({ id: p.id, label: p.label }))
  ];

  get isLast(): boolean {
    return this.active() === this.slides.length - 1;
  }

  openDemo(productTitle = ''): void {
    this.demoModal.show(productTitle);
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
    this.syncNavTheme(index);

    window.setTimeout(() => {
      this.animating = false;
    }, 900);
  }

  private syncNavTheme(index: number): void {
    // Light product slides (dark text): campus (1), smart energy (3), watapp (7)
    const light = index === 1 || index === 3 || index === 7;
    this.fullpageState.lightSlide.set(light);
    this.document.body.classList.toggle('nav-on-light', light);
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
    const section = this.document.querySelectorAll<HTMLElement>('.products-track > .prod-slide')[index];
    return section?.querySelector<HTMLElement>('.product-inner, .slide-inner') ?? null;
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
