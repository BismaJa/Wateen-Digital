import { Component, OnDestroy, inject, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-loader',
  standalone: true,
  imports: [],
  templateUrl: './page-loader.component.html',
  styleUrl: './page-loader.component.scss'
})
export class PageLoaderComponent implements OnDestroy {
  /** Keep loader on screen long enough to see one full animation cycle. */
  private static readonly MIN_VISIBLE_MS = 1200;

  private readonly router = inject(Router);
  private readonly sub: Subscription;
  private hideTimer: ReturnType<typeof setTimeout> | null = null;
  private shownAt = Date.now();

  readonly visible = signal(true);

  constructor() {
    this.sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.show();
        return;
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.scheduleHide();
      }
    });

    // Initial app load — keep visible so loader is noticeable.
    this.scheduleHide();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    if (this.hideTimer) clearTimeout(this.hideTimer);
  }

  private show(): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
    this.shownAt = Date.now();
    this.visible.set(true);
  }

  private scheduleHide(): void {
    if (this.hideTimer) clearTimeout(this.hideTimer);

    const elapsed = Date.now() - this.shownAt;
    const remaining = Math.max(
      0,
      PageLoaderComponent.MIN_VISIBLE_MS - elapsed
    );

    this.hideTimer = setTimeout(() => {
      this.visible.set(false);
      this.hideTimer = null;
      this.removeBootstrapLoader();
    }, remaining);
  }

  private removeBootstrapLoader(): void {
    document.getElementById('bootstrap-loader')?.remove();
  }
}
