import { Injectable, signal } from '@angular/core';

/**
 * Whether the full-screen page loader is currently covering the page. Entrance
 * animations wait for it to clear so they don't play (unseen) behind it.
 */
@Injectable({ providedIn: 'root' })
export class PageLoaderState {
  readonly visible = signal(true);
}
