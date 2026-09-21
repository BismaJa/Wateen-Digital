import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface CyberCard {
  title: string;
  icon: string;
  items: { label: string; value: string }[];
}

@Component({
  selector: 'app-managed-cyber-security',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './managed-cyber-security.component.html',
  styleUrl: './managed-cyber-security.component.scss'
})
export class ManagedCyberSecurityComponent {
  readonly banner =
    "Fortify your digital stronghold with Wateen’s advanced cybersecurity solutions. Our proactive measures ensure robust protection against evolving threats, providing peace of mind in today’s dynamic cyber landscape.";

  readonly nistParagraphs = [
    'Wateen Digital Solutions greatly emphasizes cybersecurity, utilizing the NIST Cybersecurity Framework’s core components – Identify, Protect, Detect, Respond, and Recover. This approach is essential in safeguarding their systems against cyber threats. The flexibility of the NIST framework allows Wateen Digital Solutions to customize it to their specific security needs, enhancing their existing cybersecurity processes and aligning with industry standards.',
    'As an ICT/Managed Security Services/Integrated Services provider, Wateen Digital Solutions acknowledges the NIST Cybersecurity Framework’s reputation as a top method for managing cybersecurity risks. By adopting this framework, Wateen aims to bolster its cybersecurity stance and maintain the trust of its customers.',
    'In essence, the NIST Cybersecurity Framework is central to Wateen Digital Solutions’ commitment to upholding the highest standards in cybersecurity. Their implementation of this framework demonstrates a continuous effort to improve their cybersecurity resilience and protect their clients’ valuable information.'
  ];

  readonly cards: CyberCard[] = [
    {
      title: 'Devices',
      icon: 'device',
      items: [
        { label: 'Identify', value: 'EDR' },
        { label: 'Protect', value: 'EDR' },
        { label: 'Detect', value: 'EDR & SIEM' },
        { label: 'Respond', value: 'SOAR & MDR Service' },
        { label: 'Recover', value: 'SOAR & MDR Service' }
      ]
    },
    {
      title: 'Applications',
      icon: 'app',
      items: [
        { label: 'Identify', value: 'VA' },
        { label: 'Protect', value: 'IR Services' },
        { label: 'Detect', value: 'PT & IR Service' },
        { label: 'Respond', value: 'SOAR & IR Service' },
        { label: 'Recover', value: 'SOAR & IR Service' }
      ]
    },
    {
      title: 'Networks',
      icon: 'network',
      items: [
        { label: 'Identify', value: 'VA' },
        { label: 'Protect', value: 'XDR' },
        { label: 'Detect', value: 'SIEM & IR Service' },
        { label: 'Respond', value: 'SOAR & IR Service' },
        { label: 'Recover', value: 'SOAR & IR Service' }
      ]
    },
    {
      title: 'Data',
      icon: 'data',
      items: [
        { label: 'Identify', value: 'DLP & SIEM' },
        { label: 'Protect', value: 'DLP' },
        { label: 'Detect', value: 'DLP & IR Service' },
        { label: 'Respond', value: 'DLP, SOAR & IR Service' },
        { label: 'Recover', value: 'DLP, SOAR & IR Service' }
      ]
    },
    {
      title: 'Users',
      icon: 'users',
      items: [
        { label: 'Identify', value: 'EDR' },
        { label: 'Protect', value: 'EDR' },
        { label: 'Detect', value: 'EDR & SIEM' },
        { label: 'Respond', value: 'SOAR & MDR Service' },
        { label: 'Recover', value: 'SOAR & MDR Service' }
      ]
    }
  ];

  readonly capabilitiesLeft = [
    'Incident Response & Recovery',
    'Threat Intelligence',
    'Defense In Depth',
    'Endpoint Security'
  ];

  readonly capabilitiesRight = [
    'Compliance Management',
    'Security Expertise',
    'IT Audits',
    'Trainings'
  ];

  readonly solutions = [
    'Endpoint Detection & Response (EDR)',
    'Extended Detection and Response (XDR)',
    'Security Information & Event Management (SIEM)',
    'Security Orchestration, Automation, & Response (SOAR)',
    'Multi Factor Authentication (MFA)',
    'Data Loss Prevention (DLP)',
    'Data Classification',
    'Email/Web Gateway',
    'Digital Risk Intelligence'
  ];

  readonly partners = [
    'Managed-Security-Services-Technology-Partners-9.png.webp',
    'Managed-Security-Services-Technology-Partners-6.png.webp',
    'Managed-Security-Services-Technology-Partners-3.png.webp',
    'Managed-Security-Services-Technology-Partners-5.png.webp',
    'Managed-Security-Services-Technology-Partners-1.png.webp',
    'Managed-Security-Services-Technology-Partners-4.png.webp',
    'Managed-Security-Services-Technology-Partners.png.webp'
  ];
}
