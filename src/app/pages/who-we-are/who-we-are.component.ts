import { Component } from '@angular/core';
import { UncodeAnimDirective } from '../../shared/uncode-anim.directive';

@Component({
  selector: 'app-who-we-are',
  standalone: true,
  imports: [UncodeAnimDirective],
  templateUrl: './who-we-are.component.html',
  styleUrl: './who-we-are.component.scss'
})
export class WhoWeAreComponent {
  readonly paragraphs = [
    'Wateen Digital Solutions LLC., is a Dhabi Group Company with the objective of transforming the digital landscape of UAE through innovative solutions and services.',
    'The Company and its affiliated entities are part of the Dhabi Group, and have been in this business for the past two decades. Our extensive expertise has led to productive partnerships with Global OEMs, delivering significant value to enterprises in Pakistan and international ICT landscape.',
    'Wateen Digital Solutions is offering a comprehensive range of services including Professional Services, Managed Cyber Security, Enterprise Solutions and services, Telecom Expertise, and more.',
    "Choosing Wateen Digital Solutions means more than just selecting a service; it's securing a partnership with industry-leading, skillful resources dedicated to meeting your business needs and steer your vision towards unprecedented heights."
  ];

  readonly howWeWork =
    'Share your distinctive business needs as we craft personalized solutions to align with your specific goals. Our experienced team ensures the seamless implementation of advanced solutions. Continuous refinement and optimization keep your business at the forefront of digital innovation. Enjoy the advantages of a dynamic partnership as our dedicated resources propel your vision to new heights.';
}
