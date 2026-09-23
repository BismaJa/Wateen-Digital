import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UncodeAnimDirective } from '../../shared/uncode-anim.directive';
import { CAREER_OPENINGS } from './careers-data';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [RouterLink, UncodeAnimDirective],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.scss'
})
export class CareersComponent {
  readonly openings = CAREER_OPENINGS;
}
