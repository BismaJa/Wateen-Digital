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
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly fullpageState = inject(FullpageStateService);
  private readonly demoModal = inject(DemoModalService);
  private animating = false;
  private touchStartY = 0;
  private lastSlideScrollReady = false;
  private lastSlideReadyTimer: number | null = null;
  private readonly onWheelBound = (e: WheelEvent) => this.handleWheel(e);
  private readonly onScrollBound = () => this.syncFooterVisibility();

  readonly active = signal(0);
  readonly showingFooter = signal(false);

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
    // Light product slides (dark text): campus (1), smart energy (3), watapp (7)
    const light = index === 1 || index === 3 || index === 7;
    this.fullpageState.lightSlide.set(light);
    this.document.body.classList.toggle('nav-on-light', light);
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
    const top = footer.getBoundingClientRect().top;
    const inFooter = top < window.innerHeight * 0.55;
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
