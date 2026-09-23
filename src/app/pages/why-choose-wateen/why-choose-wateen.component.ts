import { Component } from '@angular/core';
import { UncodeAnimDirective, UncodeAnimType } from '../../shared/uncode-anim.directive';

interface WhyCard {
  title: string;
  description: string;
  icon: string;
  anim: UncodeAnimType;
  delay: number;
}

@Component({
  selector: 'app-why-choose-wateen',
  standalone: true,
  imports: [UncodeAnimDirective],
  templateUrl: './why-choose-wateen.component.html',
  styleUrl: './why-choose-wateen.component.scss'
})
export class WhyChooseWateenComponent {
  readonly cards: WhyCard[] = [
    {
      title: 'Experience',
      description:
        'Certified and trained resources in Gartner leading platforms and solutions.',
      icon: 'assets/images/why-choose/Experience-icon.png',
      anim: 'left-t-right',
      delay: 700
    },
    {
      title: 'Partnerships',
      description: 'Strong partnerships with leading Global OEMs.',
      icon: 'assets/images/why-choose/Partnerships-icon.png',
      anim: 'bottom-t-top',
      delay: 1000
    },
    {
      title: 'Skill Readiness',
      description:
        'Wateen already has 500+ Advanced Technical, IT, and telecom resources for Telecom Deployment Services, enterprise solutions and Professional Services Projects in UAE.',
      icon: 'assets/images/why-choose/Skill-Readiness-icon.png',
      anim: 'top-t-bottom',
      delay: 1300
    },
    {
      title: 'Operating Model',
      description:
        'Sales & Technical Sales resource presence in UAE to be supported by a strong Pakistan based team to be used for project delivery.',
      icon: 'assets/images/why-choose/operating-icon.png',
      anim: 'right-t-left',
      delay: 1600
    }
  ];
}
