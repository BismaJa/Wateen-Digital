import { Component, HostListener, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-telecom-expertise',
  standalone: true,
  imports: [],
  templateUrl: './telecom-expertise.component.html',
  styleUrl: './telecom-expertise.component.scss'
})
export class TelecomExpertiseComponent implements OnInit {
  readonly active = signal(0);

  readonly sections = [
    { id: 'telecom-hero', label: 'Telecom Expertise' },
    { id: 'telecom-overview', label: 'Overview' },
    { id: 'telecom-services', label: 'Our Services' }
  ];

  readonly services = [
    'Optical Fiber Deployment',
    'Access Network (GPON & FTTx)',
    'Transmission Network',
    'Voice/LDI Services'
  ];

  ngOnInit(): void {
    this.syncActive();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.syncActive();
  }

  goTo(index: number): void {
    const el = document.getElementById(this.sections[index].id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.active.set(index);
  }

  private syncActive(): void {
    const mid = window.innerHeight * 0.35;
    let current = 0;
    for (let i = 0; i < this.sections.length; i++) {
      const el = document.getElementById(this.sections[i].id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= mid) current = i;
    }
    this.active.set(current);
  }
}
