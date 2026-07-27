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
  status?: string;
  popular?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogItem {
  id: string;
  title: string;
  slug: string;
  category?: string;
  excerpt?: string;
  content?: string;
  image?: string | File;
  author?: string;
  date?: string;
  publishedDate?: string;
  readTime?: string;
  status?: string;
}

export interface EnquiryItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  department?: string;
  productOrService?: string;
  callbackRequest?: string;
  callback?: boolean;
  interestedIn?: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface NavLink {
  id: string;
  label: string;
  url: string;
  type: string;
  parent: string;
  order: number;
  description?: string;
  title?: string;
  isStatic: boolean;
  isActive: boolean;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon?: string;
}

export interface PageSeo {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  schema?: string;
}
