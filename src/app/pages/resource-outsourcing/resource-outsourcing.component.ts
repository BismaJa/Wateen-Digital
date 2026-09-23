import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UncodeAnimDirective } from '../../shared/uncode-anim.directive';
import { TypewriterDirective } from '../../shared/typewriter.directive';

@Component({
  selector: 'app-resource-outsourcing',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet, UncodeAnimDirective, TypewriterDirective],
  templateUrl: './resource-outsourcing.component.html',
  styleUrl: './resource-outsourcing.component.scss'
})
export class ResourceOutsourcingComponent {
  /** Role cards show this many roles until READ MORE expands them. */
  readonly rolePreview = 4;
  readonly expandedRoles = signal(new Set<string>());

  toggleRoles(title: string): void {
    this.expandedRoles.update((open) => {
      const next = new Set(open);
      if (!next.delete(title)) next.add(title);
      return next;
    });
  }

  readonly introParagraphs = [
    'Receive the best Resource Outsourcing services at transparent pricing and no hidden costs. Our Resource Outsourcing service enables businesses to accelerate their MVP development with rapid deployment and proven enterprise-grade expertise.',
    'Gain immediate access to credible professionals who deliver results without the overhead of traditional hiring. Aligned with business objectives, our teams are highly flexible, ensuring your MVP is not only launched quickly but also built on a foundation ready for growth.'
  ];

  readonly roleCards = [
    {
      title: 'Software Development',
      icon: 'assets/images/resource/software-development.png',
      roles: [
        'Software Architect',
        'Full Stack Developer',
        'Front End Developer',
        'Back End Developer',
        'Mobile App Developer',
        'UI/UX Designer',
        'QA Engineer',
        'Product Manager',
        'Blockchain Developer'
      ]
    },
    {
      title: 'AI/ML Development',
      icon: 'assets/images/resource/adaptation.png',
      roles: [
        'ML Engineer',
        'Data Scientist',
        'NLP Engineer',
        'Computer Vision Engineer',
        'Product Engineer',
        'Project Manager'
      ]
    },
    {
      title: 'Data Management Services',
      icon: 'assets/images/resource/data-management.png',
      roles: [
        'Data Architect',
        'Data Analyst',
        'Data Engineer',
        'Data Integration Specialist',
        'DBA',
        'Business Analyst'
      ]
    },
    {
      title: 'Cloud Services',
      icon: 'assets/images/resource/cloud-service-icon.png',
      roles: [
        'Cloud Solutions Architect',
        'Cloud Developer',
        'DevOps Engineer',
        'Cloud Security Engineer',
        'Cloud Consultant'
      ]
    }
  ];

  readonly deliveryIntro = [
    'Our Resource Outsourcing services reshape how teams scale.',
    'Need a single ML engineer to validate a proof of concept? Deploy in days.',
    'Need an entire product squad for a new vertical? Ramp up within weeks.'
  ];

  readonly deliveryModels = [
    {
      title: 'Products and Solutions',
      image: 'assets/images/resource/product-and-solutions.png'
    },
    {
      title: 'Staff Augmentation',
      image: 'assets/images/resource/satff-augmentation.png'
    },
    {
      title: 'Managed Services',
      image: 'assets/images/resource/managed-services.png'
    },
    {
      title: 'IT Outsourcing',
      image: 'assets/images/resource/it-sourcing.png'
    }
  ];

  readonly shortTerm = [
    {
      title: 'Faster Deployment',
      text: 'Reduce hiring cycles from months to days with pre-vetted experts.'
    },
    {
      title: 'Immediate Expertise at Your Service',
      text: 'Integrate talent with proven experience in tools like Jira, Snowflake, Kubernetes, TensorFlow, and more.'
    },
    {
      title: 'Cost Control',
      text: 'Convert fixed headcount costs into flexible, project-based spending.'
    }
  ];

  readonly longTerm = [
    {
      title: 'Scalable Delivery Models',
      text: 'Expand or reduce teams dynamically without renegotiation or overhead increases.'
    },
    {
      title: 'Global Talent Pool',
      text: 'Access diverse mindsets and domain specialists across different time zones.'
    },
    {
      title: 'Risk Reduction',
      text: 'Reduce reliance on internal recruitment for niche roles and mitigate skill gaps during transitions.'
    }
  ];

  readonly dedicated = [
    'Dedicated teams operate as autonomous units. They take ownership of project delivery.',
    'They adapt sprint cycles, communication rhythms, and architecture decisions to your goals.',
    'This model suits end-to-end product delivery, migration projects, and roadmap ownership.'
  ];

  readonly augmented = [
    'Staff augmentation integrates our specialists into your existing teams.',
    'You retain full control of task prioritization and product direction.',
    'This approach is ideal for skill gap coverage or replacing key roles temporarily.'
  ];

  readonly techLogos = [
    'Net.png',
    'Amazon-Redshift.png',
    'Ansible.png',
    'Azure.png',
    'Azure-Synapse-Analytics.png',
    'Detectron2.png',
    'Docker.png',
    'Flutter.png',
    'Gemini.png',
    'Google-BigQuery.png',
    'Hadoop.png',
    'Informatica.png',
    'Jenkins.png',
    'Jira.png',
    'Keras.png',
    'Kubernetes.png',
    'Microsoft-Fabric.png',
    'MySQL.png',
    'NLTK.png',
    'Node.png',
    'OpenAI.png',
    'OpenCV.png',
    'php.png',
    'PostgreSQL.png',
    'Power-BI.png',
    'Python.png',
    'PyTorch.png',
    'Qlik.png',
    'Rails.png',
    'React-Native.png',
    'Snowflake.png',
    'spaCy.png',
    'Tableau.png',
    'TensorFlow.png'
  ];

  readonly gains = [
    { title: 'Short-Term Gains', image: 'assets/images/resource/short-term-gain.png', items: this.shortTerm },
    {
      title: 'Long-Term Benefits',
      image: 'assets/images/resource/modern-businessman-using-tablet.png',
      items: this.longTerm
    }
  ];

  readonly teams = [
    { title: 'Dedicated Teams', image: 'assets/images/resource/dedicated-teams.png', items: this.dedicated },
    { title: 'Augmented Teams', image: 'assets/images/resource/resource-outsource.png', items: this.augmented }
  ];

  /** Logos twice over, so the marquee can loop without a visible jump. */
  readonly marqueeLogos = [...this.techLogos, ...this.techLogos];
}
