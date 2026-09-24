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
    // Local copies of the live DVCS videos and their poster frames.
    {
      title: 'And transforming the world into a digital realm',
      src: 'assets/videos/dvcs/dvcs-1.mp4',
      poster: 'assets/images/dvcs/the-world.png'
    },
    {
      title: 'It’s already here',
      src: 'assets/videos/dvcs/dvcs-2.mp4',
      poster: 'assets/images/dvcs/its-already-here.png'
    }
  ];

  /** Videos whose file failed to load — shown as a placeholder instead of a dead player. */
  readonly missing = signal(new Set<number>());

  onError(index: number): void {
    this.missing.update((set) => new Set(set).add(index));
  }
}
