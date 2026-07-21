export interface ProductItem {
  id: string;
  name: string;
  category: string;
  powerRating: string;
  phase: string;
  cooling: string;
  fuelType: string;
  description: string;
  image: string;
  status: 'In Stock' | 'Available on Order' | 'Out of Stock';
  popular?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  turnaroundTime: string;
  status: 'Active' | 'Draft';
}

export interface RentalItem {
  id: string;
  title: string;
  kvaCapacity: string;
  fuelType: string;
  dailyRate: string;
  monthlyRate: string;
  availability: 'Available' | 'On Hire' | 'Maintenance';
  image: string;
}

export interface BlogItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  publishedDate: string;
  excerpt: string;
  content: string;
  image: string;
  readTime: string;
  status: 'Published' | 'Draft';
}

export interface EnquiryItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  department?: string;
  productOrService?: string;
  message: string;
  callback?: boolean;
  submittedAt: string;
  status: 'New' | 'Contacted' | 'Closed';
}

export interface ResumeItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  appliedPosition: string;
  experienceYears: string;
  message: string;
  resumePath: string;
  submittedAt: string;
  status: 'Under Review' | 'Shortlisted' | 'Rejected';
}

export interface NavLink {
  id: string;
  label: string;
  url: string;
  order: number;
  location: 'Header' | 'Footer' | 'Both';
  isActive: boolean;
  type?: 'Main Link' | 'Dropdown' | 'Sub Link';
  parent?: string;
  isStatic?: boolean;
  title?: string;
  description?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface PageSeo {
  id: string;
  pageName: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl?: string;
  ogImage: string;
  schema?: string;
}
