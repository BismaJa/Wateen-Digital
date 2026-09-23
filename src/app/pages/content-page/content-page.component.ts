import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { UncodeAnimDirective } from '../../shared/uncode-anim.directive';

export interface PageData {
  title: string;
  subtitle?: string;
  paragraphs: string[];
  ctaLabel?: string;
  ctaLink?: string;
}

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [RouterLink, UncodeAnimDirective],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.scss'
})
export class ContentPageComponent {
  private readonly route = inject(ActivatedRoute);

  readonly page = toSignal(
    this.route.data.pipe(map((d) => d['page'] as PageData)),
    {
      initialValue: {
        title: '',
        subtitle: undefined,
        paragraphs: [] as string[],
        ctaLabel: undefined,
        ctaLink: undefined
      } satisfies PageData
    }
  );
}
