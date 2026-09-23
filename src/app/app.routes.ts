import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
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
import { CareersComponent } from './pages/careers/careers.component';
import { CareerDetailComponent } from './pages/careers/career-detail.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { BlogPostComponent } from './pages/blogs/blog-post.component';
import { DvcsComponent } from './pages/dvcs/dvcs.component';

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
    component: CareersComponent,
    title: 'Careers - Wateen Digital Solutions'
  },
  {
    path: 'careers/:slug',
    component: CareerDetailComponent,
    title: 'Careers - Wateen Digital Solutions'
  },
  {
    path: 'media',
    component: MediaComponent,
    title: 'Media - Wateen Digital Solutions'
  },
  {
    path: 'media/blog',
    component: BlogsComponent,
    title: 'Blogs - Wateen Digital Solutions'
  },
  {
    path: 'media/blog/:slug',
    component: BlogPostComponent,
    title: 'Blogs - Wateen Digital Solutions'
  },
  {
    path: 'dvcs',
    component: DvcsComponent,
    title: 'DVCS - Wateen Digital Solutions'
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
