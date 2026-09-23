export interface CareerSection {
  title: string;
  items: string[];
}

export interface CareerOpening {
  slug: string;
  title: string;
  /** Hero title in brand cyan (Manager Pre-Sales) instead of white. */
  cyanTitle?: boolean;
  summaryTitle: string;
  summary: string[];
  sections: CareerSection[];
}

/** Open positions, in the order shown on /careers (PREV/NEXT follow this order). */
export const CAREER_OPENINGS: CareerOpening[] = [
  {
    slug: 'account-manager',
    title: 'Account Manager',
    summaryTitle: 'Position Summary',
    summary: [
      'Join Wateen Digital Solutions, write your own sales success story, and help redefine the future of digital transformation.',
      'At Wateen Digital Solutions, we are not just providing digital solutions and services — we are powering possibilities. If you are a results-driven sales leader with a customer-first mindset, a flair for strategic thinking, and the ambition to shape the future of digital transformation in the UAE, this is your chance to make it happen.',
      'We are hiring an Account Manager to drive revenue growth and profitability in your assigned territory. Surpass targets by leveraging market intelligence to proactively monitor trends and pricing. Build strong relationships with senior management, representing the company at key industry events. Ensure accurate forecasting, collaborate on account plans, and expand market share. Apply your technical expertise in digital transformation products while cultivating partnerships with global technology providers for mutual benefit.',
      'Be a part of shaping Wateen Digital Solutions’ success story by setting benchmarks for profitable customer relationships that align with our long-term goals. Apply now and join us on our journey to success.'
    ],
    sections: [
      {
        title: 'Key Responsibilities',
        items: [
          'Achieve Revenue, Profits, Collections, and Customer experience targets.',
          'Build relationships with key principals, technology vendors, and partners.',
          'Proactively analyze and consolidate market intelligence to monitor pricing and trends.',
          'Ensure accurate forecasting and comprehensive sales reporting.',
          'Collaborate on account management plans with the sales account managers.',
          'Drive the growth of Wateen Digital Solutions’ market share in the industry.',
          'Apply a deep understanding of digital products.',
          'Foster and nurture profitable relationships with customers and stakeholders such as Global Technology Providers.',
          'Establish account management benchmarks that enhance profitability in customer relationships and align with the organization’s long-term strategy.'
        ]
      },
      {
        title: 'Required Skills',
        items: [
          'Ability to drive sales and manage large to medium-sized deals with precision.',
          'Enterprise software/cloud sales, services, and solutions experience, with a track record of exceeding targets and closing large deals.',
          'Demonstrate an outstanding grasp of Enterprise and Corporate business dynamics.',
          'Demonstrated ability to build relationships and influence senior executives across various industries.',
          'Deep understanding of cloud technologies (IaaS, PaaS, SaaS, AI) and their potential applications across different business functions.',
          'Ability to articulate complex technical concepts in a clear and concise manner to both technical and non-technical audiences.',
          'Apply a reasonable knowledge of Account Plan methodology to strategize and execute sales approaches effectively.',
          'Leverage a deep understanding of sales processes and be adept at managing opportunities to maximize results.',
          'Efficiently oversee contract management procedures.',
          'Exhibit excellent business communication skills, both verbal and written (Ability to communicate in Arabic would be a plus).',
          'Deliver impactful presentations and exhibit strong prowess in selling and negotiations.',
          'Self-motivated individual with a go-getter attitude with strong communication, negotiation, and presentation skills.'
        ]
      },
      {
        title: 'Education & Experience',
        items: [
          'Bachelor’s or Master’s Degree in Business Administration (BBA/MBA), Computer Sciences, or other relevant field.',
          '5-7 years of relevant experience within digital transformation sales.',
          'Advanced knowledge of relevant digital technologies, tech products, services, and solutions.',
          'Proven track record in selling Cloud, Infrastructure, Data, Digital Solutions, as well as Cybersecurity products and services in the UAE Market.',
          'Deep understanding of the sales processes and challenges faced by businesses, with the ability to translate customer needs into enhancement ideas and solutions.'
        ]
      }
    ]
  },
  {
    slug: 'manager-pre-sales',
    title: 'Manager Pre-Sales',
    cyanTitle: true,
    summaryTitle: 'Position Summary:',
    summary: [
      'Join Wateen Digital as Manager Pre-Sales and showcase your expertise in evaluating customer needs and proposing optimal solutions based on their requirements. Thrive in technical pre-sales activities by seamlessly communicating industry insights, technical expertise, and product knowledge. This role merges your passion for technology with sales acumen, providing a dynamic opportunity to create seamless customer experiences and make a meaningful impact on our organization’s success.'
    ],
    sections: [
      {
        title: 'Main Responsibilities:',
        items: [
          'Proficiency in Cisco, Juniper, and Huawei routing and switching within an Enterprise MPLS WAN setting.',
          'In-depth understanding and knowledge of Cloud computing including AWS, Google, Oracle, Azure would be preferred.',
          'In-depth familiarity with Cisco, Juniper, and Huawei Security products as applied to Enterprise networks.',
          'Expertise in Cisco, HP, Dell, EMC, and Citrix Data Centers Computing products within Enterprise networks.',
          'Exceptional aptitude for delivering engaging presentations and demonstrations.',
          'Strong mentoring and team management capabilities.',
          'Demonstrated experience in customer-facing roles.',
          'Analytical acumen coupled with the ability to comprehend client requirements.',
          'Skillful at articulating and showcasing the business advantages and value of technical solutions to customers.',
          'Proficient in translating both technical and business needs into cost-effective solutions.'
        ]
      },
      {
        title: 'Education:',
        items: [
          'Bachelor’s Degree in Engineering, Telecom, or IT.',
          'Design expertise with credentials such as CCDP/HCDP, CCIE/HCIE/JNCIE, or CCDE would be a plus.',
          'A comprehensive background spanning 8-10 years in Pre-Sales roles within the vendor sphere, or 8-12 years in Post-Sales capacities.'
        ]
      }
    ]
  }
];
