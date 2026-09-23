export interface BlogPost {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD); shown as e.g. "February 3, 2025". */
  date: string;
  excerpt: string;
  /** Post image (add under public/assets/images/blogs/); `fallback` shows until it exists. */
  image: string;
  fallback: string;
  /** Full article paragraphs; empty until the article text is provided. */
  body: string[];
}

/** Newest first, as listed on /media/blog. */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'the-role-of-ai-surveillance-solutions-for-businesses-in-uae',
    title: 'The Role of AI Surveillance Solutions for Businesses in UAE',
    date: '2025-02-03',
    excerpt: 'Artificial intelligence (AI) surveillance is a system of interconnected technologies designed to…',
    image: 'assets/images/blogs/ai-surveillance.jpg',
    fallback: 'assets/images/ai/Integrated-Surveillance-Platform.jpg',
    body: []
  },
  {
    slug: 'data-privacy-and-ethics-in-the-age-of-big-data-analytics',
    title: 'Data Privacy and Ethics In the Age of Big Data Analytics',
    date: '2025-01-31',
    excerpt: 'Discover the role of PDPL and Wateen Digital Solutions in protecting data and privacy in UAE',
    image: 'assets/images/blogs/data-privacy-ethics.jpg',
    fallback: 'assets/images/cyber/Cyber-Security.jpg',
    body: []
  },
  {
    slug: 'upholding-data-protection-and-privacy-in-the-digital-age',
    title: 'Upholding Data Protection and Privacy in the Digital Age',
    date: '2025-01-30',
    excerpt: 'Discover the role of PDPL and Wateen Digital Solutions in protecting data and privacy in UAE',
    image: 'assets/images/blogs/data-protection-privacy.jpg',
    fallback: 'assets/images/cyber-security.jpg',
    body: []
  },
  {
    slug: 'siem-solutions-for-insightful-data-analysis',
    title: 'SIEM Solutions for Insightful Data Analysis',
    date: '2025-01-29',
    excerpt:
      'Understand how big the SIEM market is in UAE. Learn what SIEM is and the industry-defining role of…',
    image: 'assets/images/blogs/siem-solutions.jpg',
    fallback: 'assets/images/enterprise/Enterprises-Solutions-Services.jpg',
    body: []
  }
];
