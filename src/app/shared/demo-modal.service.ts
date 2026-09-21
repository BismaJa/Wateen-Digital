import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DemoModalService {
  readonly open = signal(false);
  readonly preselectedProduct = signal('');

  show(product = ''): void {
    this.preselectedProduct.set(product);
    this.open.set(true);
    document.body.classList.add('demo-modal-open');
  }

  hide(): void {
    this.open.set(false);
    this.preselectedProduct.set('');
    document.body.classList.remove('demo-modal-open');
  }
}
