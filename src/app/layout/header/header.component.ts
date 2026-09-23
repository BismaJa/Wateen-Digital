import { Component, HostListener, effect, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { FullpageStateService } from '../../shared/fullpage-state.service';

interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}

/** Inner pages where the floating menu should scroll away (not sticky). */
const NON_STICKY_PREFIXES = [
  '/services/telecom-expertise',
  '/services/professional-services',
  '/services/managed-cyber-security',
  '/services/enterprise-solutions-services',
  '/services/energy-solutions',
  '/who-we-are',
  '/careers',
  '/why-choose-wateen',
  '/certified-resources',
  '/contact-us',
  '/media'
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    '[class.non-sticky-host]': 'nonSticky()'
  }
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly fullpageState = inject(FullpageStateService);

  readonly mobileOpen = signal(false);
  readonly openDropdown = signal<string | null>(null);
  readonly lightSlide = this.fullpageState.lightSlide;

  readonly isHome = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => this.isHomeUrl(this.router.url)),
      startWith(this.isHomeUrl(this.router.url))
    ),
    { initialValue: true }
  );

  /** When true, header is not fixed — scrolls away with the page. */
  readonly nonSticky = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => this.isNonStickyUrl(this.router.url)),
      startWith(this.isNonStickyUrl(this.router.url))
    ),
    { initialValue: false }
  );

  readonly nav: NavItem[] = [
    { label: 'Home', path: '/' },
    {
      label: 'Professional Services',
      path: '/services/professional-services',
      children: [
        {
          label: 'Resource Outsourcing',
          path: '/services/professional-services/resource-outsourcing'
        }
      ]
    },
    { label: 'Enterprise Solutions', path: '/services/enterprise-solutions-services' },
    { label: 'Managed Cyber Security', path: '/services/managed-cyber-security' },
    { label: 'Products', path: '/products' },
    { label: 'Artificial Intelligence', path: '/artificial-intelligence' },
    { label: 'Telecom Expertise', path: '/services/telecom-expertise' }
  ];

  constructor() {
    effect(() => {
      document.body.classList.toggle('menu-open-lock', this.mobileOpen());
      document.body.classList.toggle('nav-non-sticky', this.nonSticky());
    });
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.mobileOpen()) this.closeMobile();
  }

  toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
    this.openDropdown.set(null);
  }

  private isHomeUrl(url: string): boolean {
    return url === '/' || url.startsWith('/#');
  }

  private isNonStickyUrl(url: string): boolean {
    const path = url.split('?')[0].split('#')[0];
    return NON_STICKY_PREFIXES.some(
      (prefix) => path === prefix || path.startsWith(prefix + '/')
    );
  }
}
