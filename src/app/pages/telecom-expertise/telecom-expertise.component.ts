import { Component } from '@angular/core';
import { UncodeAnimDirective } from '../../shared/uncode-anim.directive';

@Component({
  selector: 'app-telecom-expertise',
  standalone: true,
  imports: [UncodeAnimDirective],
  templateUrl: './telecom-expertise.component.html',
  styleUrl: './telecom-expertise.component.scss'
})
export class TelecomExpertiseComponent {
  readonly services = [
    // Column order: the desktop grid fills top-to-bottom, phones stack in this order.
    'Optical Fiber Deployment',
    'Transmission Network',
    'Access Network (GPON & FTTx)',
    'Voice/LDI Services'
  ];
}
