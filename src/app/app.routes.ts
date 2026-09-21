import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContentPageComponent, PageData } from './pages/content-page/content-page.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TelecomExpertiseComponent } from './pages/telecom-expertise/telecom-expertise.component';
import { ArtificialIntelligenceComponent } from './pages/artificial-intelligence/artificial-intelligence.component';
import { ProductsComponent } from './pages/products/products.component';
import { ManagedCyberSecurityComponent } from './pages/managed-cyber-security/managed-cyber-security.component';
import { EnterpriseSolutionsComponent } from './pages/enterprise-solutions/enterprise-solutions.component';
import { ProfessionalServicesComponent } from './pages/professional-services/professional-services.component';
import { ResourceOutsourcingComponent } from './pages/resource-outsourcing/resource-outsourcing.component';
import { WhoWeAreComponent } from './pages/who-we-are/who-we-are.component';
import { WhyChooseWateenComponent } from './pages/why-choose-wateen/why-choose-wateen.component';
import { CertifiedResourcesComponent } from './pages/certified-resources/certified-resources.component';
import { AnnouncementsComponent } from './pages/announcements/announcements.component';
import { MediaComponent } from './pages/media/media.component';

function page(data: PageData) {
  return { page: data };
}

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Homepage - Wateen Digital Solutions' },
  {
    path: 'services/professional-services',
    component: ProfessionalServicesComponent,
    title: 'Professional Services - Wateen Digital Solutions'
  },
  {
    path: 'services/professional-services/resource-outsourcing',
    component: ResourceOutsourcingComponent,
    title: 'Resource Outsourcing - Wateen Digital Solutions'
  },
  {
    path: 'services/enterprise-solutions-services',
    component: EnterpriseSolutionsComponent,
    title: 'Enterprise Solutions - Wateen Digital Solutions'
  },
  {
    path: 'services/managed-cyber-security',
    component: ManagedCyberSecurityComponent,
    title: 'Managed Cyber Security - Wateen Digital Solutions'
  },
  {
    path: 'services/telecom-expertise',
    component: TelecomExpertiseComponent,
    title: 'Telecom Expertise - Wateen Digital Solutions'
  },
  {
    path: 'products',
    component: ProductsComponent,
    title: 'Products - Wateen Digital Solutions'
  },
  {
    path: 'artificial-intelligence',
    component: ArtificialIntelligenceComponent,
    title: 'Artificial Intelligence - Wateen Digital Solutions'
  },
  {
    path: 'who-we-are',
    component: WhoWeAreComponent,
    title: 'Who We Are - Wateen Digital Solutions'
  },
  {
    path: 'why-choose-wateen',
    component: WhyChooseWateenComponent,
    title: 'Why Choose Wateen - Wateen Digital Solutions'
  },
  {
    path: 'certified-resources',
    component: CertifiedResourcesComponent,
    title: 'Certified Resources - Wateen Digital Solutions'
  },
  {
    path: 'careers',
    component: ContentPageComponent,
    title: 'Careers - Wateen Digital Solutions',
    data: page({
      title: 'Careers',
      subtitle: 'Build your career with Wateen Digital Solutions.',
      paragraphs: [
        'Join a Dhabi Group company focused on transforming the UAE digital landscape.',
        'We look for certified, curious professionals ready to deliver enterprise technology outcomes.'
      ],
      ctaLabel: 'Contact Us',
      ctaLink: '/contact-us'
    })
  },
  {
    path: 'media',
    component: MediaComponent,
    title: 'Media - Wateen Digital Solutions'
  },
  {
    path: 'media/blog',
    component: ContentPageComponent,
    title: 'Blogs - Wateen Digital Solutions',
    data: page({
      title: 'Blogs',
      paragraphs: [
        'Insights and updates from Wateen Digital Solutions on digital transformation, cybersecurity, and enterprise technology.'
      ],
      ctaLabel: 'Back to Media',
      ctaLink: '/media'
    })
  },
  {
    path: 'dvcs',
    component: ContentPageComponent,
    title: 'DVCS - Wateen Digital Solutions',
    data: page({
      title: 'DVCS',
      paragraphs: [
        'Explore DVCS media and coverage featuring Wateen Digital Solutions.'
      ],
      ctaLabel: 'Back to Media',
      ctaLink: '/media'
    })
  },
  {
    path: 'announcements',
    component: AnnouncementsComponent,
    title: 'Announcements - Wateen Digital Solutions'
  },
  {
    path: 'contact-us',
    component: ContactComponent,
    title: 'Contact Us - Wateen Digital Solutions'
  },
  { path: '**', redirectTo: '' }
];
