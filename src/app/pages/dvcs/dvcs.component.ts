import { Component, signal } from '@angular/core';
import { UncodeAnimDirective } from '../../shared/uncode-anim.directive';

interface DvcsVideo {
  title: string;
  /** Add the files under public/assets/videos/dvcs/. */
  src: string;
  /** Optional still shown before playback (public/assets/images/dvcs/). */
  poster?: string;
}

@Component({
  selector: 'app-dvcs',
  standalone: true,
  imports: [UncodeAnimDirective],
  templateUrl: './dvcs.component.html',
  styleUrl: './dvcs.component.scss'
})
export class DvcsComponent {
  readonly videos: DvcsVideo[] = [
    { title: 'And transforming the world into a digital realm', src: 'assets/videos/dvcs/dvcs-1.mp4' },
    { title: 'It’s already here', src: 'assets/videos/dvcs/dvcs-2.mp4' }
  ];

  /** Videos whose file failed to load — shown as a placeholder instead of a dead player. */
  readonly missing = signal(new Set<number>());

  onError(index: number): void {
    this.missing.update((set) => new Set(set).add(index));
  }
}
