import { Component } from '@angular/core';
import { UncodeAnimDirective } from '../../shared/uncode-anim.directive';

export interface ProfessionalSection {
  title: string;
  description: string;
  image: string;
  mediaLeft: boolean;
  columns: string[][];
  subgroups?: { title: string; items: string[] }[];
}

@Component({
  selector: 'app-professional-services',
  standalone: true,
  imports: [UncodeAnimDirective],
  templateUrl: './professional-services.component.html',
  styleUrl: './professional-services.component.scss'
})
export class ProfessionalServicesComponent {
  readonly banner =
    'Wateen Digital Solutions offers a comprehensive suite of Professional Services crafted to meet your diverse and complex technological needs. From strategic consultation to seamless implementation, our certified resources help you in planning, designing, deploying and managing your enterprise network and applications, efficiently and securely.';

  readonly sections: ProfessionalSection[] = [
    {
      title: 'Resource Outsourcing',
      description:
        'Welcome to a dynamic team of professionals poised to drive your projects to new heights. From Solution Architects and Software Developers to UI/UX Designers and Project Managers, our versatile line-up covers every aspect of IT excellence. Experience innovation, expertise, and seamless collaboration with our diverse skill set, ensuring success across diverse domains.',
      image: 'assets/images/professional/Resource-Outsourcing.png',
      mediaLeft: false,
      columns: [
        [
          'Solution Architect',
          'Software Architect',
          'Software Developer',
          'QA Engineer',
          'Scrum Master',
          'DBA',
          'Project Managers',
          'UI/UX Designer',
          'Business Analyst',
          'SDM'
        ],
        [
          'Firewall Engineers',
          'SIEM/SOAR Engineer',
          'Network Engineers',
          'Enterprise Architect',
          'SecOps Engineer',
          'Collaboration Expert',
          'Data Management Specialist',
          'Product Managers',
          'IT Infrastructure Specialist',
          'Blockchain Developer'
        ]
      ]
    },
    {
      title: 'Customized Software Development & Applications',
      description:
        'Experience innovation with our dedicated team of experts, offering tailored software development services. From full-stack developers to SDLC/DevOps support and cloud-native application development, we ensure excellence at every stage. Trust us for seamless software upgrades on AWS, Azure, and GCP.',
      image: 'assets/images/professional/Customized-Software-Development.png',
      mediaLeft: true,
      columns: [
        [
          'Full-stack devs for large-scale solutions.',
          'Teams excel in SDLC/DevOps, performance, and code docs.',
          'Integration experts for seamless upgrades.',
          'Cloud-native app development on AWS/Azure/GCP.'
        ]
      ]
    },
    {
      title: 'Data Management Services',
      description:
        'Unleash actionable insights with our BI & Data Analytics solutions. We specialize in transforming raw data into meaningful patterns, empowering informed decision-making. Elevate your data-driven strategies for enhanced business intelligence.',
      image: 'assets/images/professional/BI-Data-Analytics.png',
      mediaLeft: false,
      columns: [
        [
          'Data Management Best Practices',
          'ETL/ELT/Reverse ETL/Data Pipelines',
          'AI/ML/Data Science',
          'Big Data Analytics'
        ],
        [
          'Workload Optimization',
          'Data Warehouse Architecture & Implementation',
          'Cloud Data Lake',
          'Managed Business Intelligence & Reporting'
        ]
      ]
    },
    {
      title: 'Application Management Services',
      description:
        'Wateen Digital Solutions offers comprehensive AMS that enables customers to improve internal efficiency, increase user-satisfaction and free internal IT/business teams to focus on future business instead of constantly returning to existing or, outgoing technology.',
      image: 'assets/images/professional/Cloud-Services.png',
      mediaLeft: true,
      columns: [['Plan & Design', 'Build & Test', 'Run & Optimize']]
    },
    {
      title: 'Enterprise Architecture Practice',
      description:
        'Leveraging the TOGAF Enterprise Architecture Framework, we adhere to industry best practices to meticulously document the current state (AS-IS architecture). Our approach focuses on designing architectures that ensure rapid Return on Investment (ROI), minimize capital and operational expenditures (CAPEX/OPEX), enhance user satisfaction, and foster sustained growth.',
      image: 'assets/images/professional/Enterprise-Architecture-Practice.png',
      mediaLeft: false,
      columns: [
        [
          'Business Architecture',
          'Application/Integration Architecture',
          'Data/Information Architecture',
          'Infrastructure Architecture'
        ]
      ]
    },
    {
      title: 'Cloud Services',
      description:
        'Experience cutting-edge solutions with our Cloud Services, providing scalable infrastructure, data management, and secure operations. From expert design and implementation to performance optimization and meticulous monitoring, we deliver a comprehensive suite of tailored services. Embrace the flexibility of the cloud with our reliable and efficient solutions.',
      image: 'assets/images/professional/Cloud-Services.png',
      mediaLeft: true,
      columns: [],
      subgroups: [
        {
          title: 'Public Cloud',
          items: ['Design and Implementation', 'Performance Optimization', 'Monitoring and Management']
        },
        {
          title: 'Hybrid Cloud',
          items: ['Deployment', 'Migration', 'Security']
        }
      ]
    },
    {
      title: 'Commercial Off-The-Shelf Software Solutions',
      description:
        'COTS software solutions provide a cost-effective and efficient way for organizations to acquire and deploy software with standard functionalities. These solutions are designed to be used by a wide range of businesses or individuals without the need for extensive customization. Wateen Digital Solutions has developed several Enterprise level solutions and platforms which can be deployed in a cloud native, hybrid or on-prem infrastructure.',
      image: 'assets/images/professional/Cloud-Services.png',
      mediaLeft: false,
      columns: [
        [
          'CRM Solution',
          'Campus Management Solution',
          'Employee Location Tracking',
          'HR Portal',
          'Project and Proposal Management Portal',
          'Sales Tracking',
          'Solar Energy Monitoring Solution'
        ]
      ]
    }
  ];
}
