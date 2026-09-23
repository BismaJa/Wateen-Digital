import { Component } from '@angular/core';
import { UncodeAnimDirective } from '../../shared/uncode-anim.directive';

@Component({
  selector: 'app-enterprise-solutions',
  standalone: true,
  imports: [UncodeAnimDirective],
  templateUrl: './enterprise-solutions.component.html',
  styleUrl: './enterprise-solutions.component.scss'
})
export class EnterpriseSolutionsComponent {
  readonly banner =
    'At Wateen Digital Solutions, we specialize in providing comprehensive IT infrastructure that creates a secure & seamless ecosystem for your business operations. Our highly certified subject matter experts manage all your technological needs, transforming the way your business operates.';

  readonly advancedServices = ['Planning & Audit Services', 'Design, Build & Operate'];

  readonly infraLeft = [
    'Networks & Security Solutions',
    'Unified Collaborations',
    'Compute & Storage'
  ];

  readonly infraRight = ['Managed Security Services', 'Managed Network Services'];

  readonly infraCopy =
    'IT infrastructure solutions and services encompass a broad range of offerings aimed at designing, implementing, managing, and supporting the technology backbone of an organization. This includes hardware, software, networks, data centers, and other components that enable the effective functioning of IT systems. Wateen Digital Solutions has unmatched expertise, partnerships and resources to tackle all your IT infrastructure requirements.';
}
