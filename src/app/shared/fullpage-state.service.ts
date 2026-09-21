import { Injectable, signal } from '@angular/core';

/** Shared homepage fullpage state for header styling. */
@Injectable({ providedIn: 'root' })
export class FullpageStateService {
  readonly lightSlide = signal(false);
}
