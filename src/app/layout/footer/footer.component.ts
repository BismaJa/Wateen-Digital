import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

interface FooterLink {
  label: string;
  route?: string;
  href?: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  readonly columns: { title: string; links: FooterLink[] }[] = [
    {
      title: 'About Us',
      links: [
        { label: 'Who We Are', route: '/who-we-are' },
        { label: 'Why Choose Wateen', route: '/why-choose-wateen' },
        { label: 'Certified Resources', route: '/certified-resources' }
      ]
    },
    {
      title: 'Our Services',
      links: [
        { label: 'Professional Services', route: '/services/professional-services' },
        { label: 'Enterprise Solutions', route: '/services/enterprise-solutions-services' },
        { label: 'Managed Cyber Security', route: '/services/managed-cyber-security' },
        { label: 'Telecom Expertise', route: '/services/telecom-expertise' }
      ]
    },
    {
      title: 'Quick Links',
      links: [
        { label: 'Careers', route: '/careers' },
        { label: 'Who We Are', route: '/who-we-are' },
        { label: 'Contact Us', route: '/contact-us' },
        { label: 'Media', route: '/media' },
        { label: 'Sitemap', href: '/sitemap.xml' }
      ]
    }
  ];

  readonly socials = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'X', href: 'https://twitter.com/' },
    { label: 'Facebook', href: 'https://www.facebook.com/' },
    { label: 'Instagram', href: 'https://www.instagram.com/' }
  ];
}
