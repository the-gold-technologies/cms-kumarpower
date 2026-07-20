export interface ProductItem {
  id: string;
  name: string;
  category: 'Kirloskar Diesel Generator' | 'Kirloskar Gas Generator' | 'Portable Generator' | 'AMF & LT Panels' | 'Servo Stabilizers' | 'Transformers';
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
  department: string;
  productOrService: string;
  message: string;
  callback: boolean;
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
}

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: "prod-1",
    name: "Kirloskar CPCB IV+ 20 kVA DG Set",
    category: "Kirloskar Diesel Generator",
    powerRating: "20 kVA",
    phase: "Three Phase / Single Phase",
    cooling: "Liquid Cooled",
    fuelType: "Diesel",
    description: "Compact, eco-friendly CPCB IV+ compliant silent diesel generator set engineered by Kirloskar for maximum fuel efficiency.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    status: "In Stock",
    popular: true
  },
  {
    id: "prod-2",
    name: "Kirloskar CPCB IV+ 62.5 kVA DG Set",
    category: "Kirloskar Diesel Generator",
    powerRating: "62.5 kVA",
    phase: "3 Phase",
    cooling: "Water Cooled",
    fuelType: "Diesel",
    description: "Heavy-duty commercial silent generator providing reliable power for industrial plants, commercial buildings, and healthcare facilities.",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop",
    status: "In Stock",
    popular: true
  },
  {
    id: "prod-3",
    name: "Kirloskar 250 kVA Industrial DG Set",
    category: "Kirloskar Diesel Generator",
    powerRating: "250 kVA",
    phase: "3 Phase",
    cooling: "Radiator Cooled",
    fuelType: "Diesel",
    description: "High capacity CPCB IV+ compliant diesel generator designed for continuous operation in severe ambient conditions.",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop",
    status: "In Stock",
    popular: false
  },
  {
    id: "prod-4",
    name: "Kirloskar 750 kVA Mega Power Genset",
    category: "Kirloskar Diesel Generator",
    powerRating: "750 kVA",
    phase: "3 Phase",
    cooling: "Water Cooled",
    fuelType: "Diesel",
    description: "Prime industrial generator set engineered for data centers, airports, heavy manufacturing, and infrastructure projects.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop",
    status: "Available on Order",
    popular: true
  },
  {
    id: "prod-5",
    name: "Kirloskar Natural Gas Generator 100 kVA",
    category: "Kirloskar Gas Generator",
    powerRating: "100 kVA",
    phase: "3 Phase",
    cooling: "Liquid Cooled",
    fuelType: "Natural Gas / PNG",
    description: "Environmentally friendly clean gas generator delivering low operational costs and near-zero carbon emissions.",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop",
    status: "In Stock",
    popular: false
  },
  {
    id: "prod-6",
    name: "Optiprime Silent Portable Genset 5.5 kVA",
    category: "Portable Generator",
    powerRating: "5.5 kVA",
    phase: "Single Phase",
    cooling: "Air Cooled",
    fuelType: "Petrol / Dual Fuel",
    description: "Portable lightweight generator featuring electric start, ultra-quiet soundproof acoustic enclosure, and smooth wave inverter output.",
    image: "https://images.unsplash.com/photo-1544725121-be3bf52e2dc8?q=80&w=800&auto=format&fit=crop",
    status: "In Stock",
    popular: true
  },
  {
    id: "prod-7",
    name: "Automatic Mains Failure (AMF) Panel 500A",
    category: "AMF & LT Panels",
    powerRating: "Up to 500 kVA",
    phase: "3 Phase",
    cooling: "N/A",
    fuelType: "N/A",
    description: "Microprocessor based AMF control panel with automatic mains failure transfer, digital metering, and engine safety protections.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    status: "In Stock",
    popular: false
  },
  {
    id: "prod-8",
    name: "Industrial Servo Voltage Stabilizer 200 kVA",
    category: "Servo Stabilizers",
    powerRating: "200 kVA",
    phase: "3 Phase",
    cooling: "Oil Cooled",
    fuelType: "N/A",
    description: "High precision microprocessor controlled oil-cooled servo voltage stabilizer designed to protect sensitive equipment.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    status: "In Stock",
    popular: false
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "serv-1",
    title: "Annual Maintenance Contract (AMC)",
    slug: "annual-maintenance",
    icon: "ShieldCheck",
    shortDesc: "Comprehensive periodic preventive & breakdown maintenance for Kirloskar DG sets.",
    fullDesc: "Our Annual Maintenance Contract covers regular routine servicing, 24/7 emergency response, genuine replacement filters, lubrication checks, and certified technician inspections to keep your generators running smoothly.",
    features: ["24/7 Breakdown Assistance", "4 Scheduled Preventive Services per Year", "100% Genuine Kirloskar Spare Parts", "Load Testing & Oil Analysis"],
    turnaroundTime: "Within 2 Hours (NCR)",
    status: "Active"
  },
  {
    id: "serv-2",
    title: "Generator Installation & Commissioning",
    slug: "installation-commissioning",
    icon: "Wrench",
    shortDesc: "Turnkey installation of DG sets including acoustic enclosure, civil work, and electrical cabling.",
    fullDesc: "Complete end-to-end installation services by authorized engineers following CPCB standards, pollution board clearance guidelines, acoustic treatment, and electrical safety standards.",
    features: ["Civil Foundation Design", "Acoustic Ducting & Piping", "Pollution Clearance Support", "System Commissioning & Testing"],
    turnaroundTime: "3 to 5 Days",
    status: "Active"
  },
  {
    id: "serv-3",
    title: "Engine Repair & Major Overhauling",
    slug: "repair-overhaul",
    icon: "Cpu",
    shortDesc: "Complete top/major engine overhaul using original OEM components.",
    fullDesc: "State-of-the-art diagnostic engine testing, cylinder head reconditioning, fuel pump calibration, alternator rewinding, and performance restoration.",
    features: ["OEM Certified Technicians", "Precision Cylinder Reboring", "Fuel Injection System Tuning", "Post-Overhaul Load Bench Test"],
    turnaroundTime: "2 to 4 Days",
    status: "Active"
  },
  {
    id: "serv-4",
    title: "24/7 Emergency Support & Breakdown",
    slug: "emergency-support",
    icon: "Zap",
    shortDesc: "Rapid response mobile service teams equipped with spares for immediate power restoration.",
    fullDesc: "Dedicated emergency response unit available 24 hours a day, 365 days a year across Delhi NCR to address sudden power outages or generator failures.",
    features: ["Instant Mobile Response Van", "On-site Fault Diagnostics", "Temporary Backup Genset Option", "Guaranteed SLA Response"],
    turnaroundTime: "30 - 60 Minutes",
    status: "Active"
  }
];

export const INITIAL_RENTALS: RentalItem[] = [
  {
    id: "rent-1",
    title: "25 kVA Silent DG Set on Hire",
    kvaCapacity: "25 kVA",
    fuelType: "Diesel",
    dailyRate: "₹ 2,500 / day",
    monthlyRate: "₹ 35,000 / month",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "rent-2",
    title: "62.5 kVA Heavy Duty Soundproof Genset",
    kvaCapacity: "62.5 kVA",
    fuelType: "Diesel",
    dailyRate: "₹ 4,500 / day",
    monthlyRate: "₹ 65,000 / month",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "rent-3",
    title: "125 kVA Commercial Generator Rental",
    kvaCapacity: "125 kVA",
    fuelType: "Diesel",
    dailyRate: "₹ 7,500 / day",
    monthlyRate: "₹ 1,10,000 / month",
    availability: "On Hire",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "rent-4",
    title: "500 kVA Industrial Containerized Genset",
    kvaCapacity: "500 kVA",
    fuelType: "Diesel",
    dailyRate: "₹ 18,000 / day",
    monthlyRate: "₹ 2,80,000 / month",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop"
  }
];

export const INITIAL_BLOGS: BlogItem[] = [
  {
    id: "blog-1",
    title: "Why Choose Kirloskar CPCB IV+ Compliant Silent Generators?",
    slug: "why-choose-kirloskar-cpcb4-silent-generators",
    category: "Product Guide",
    author: "Technical Team",
    publishedDate: "2026-06-15",
    excerpt: "Learn how CPCB IV+ emissions standards reduce environmental impact while saving up to 15% on fuel costs.",
    content: "CPCB IV+ norms represent India's most stringent generator emission standards. Kirloskar's latest range of silent diesel generators features advanced common rail direct injection (CRDi) technology and exhaust gas recirculation (EGR) to minimize harmful pollutants. Investing in a CPCB IV+ DG set guarantees regulatory compliance, reduced noise output under 75 dBA, and exceptional fuel economy.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    readTime: "4 min read",
    status: "Published"
  },
  {
    id: "blog-2",
    title: "Essential Generator Maintenance Tips Before Monsoon Season",
    slug: "essential-generator-maintenance-monsoon",
    category: "Maintenance Tips",
    author: "Ravi Kumar",
    publishedDate: "2026-07-02",
    excerpt: "Prevent sudden power outages during heavy rains with our comprehensive pre-monsoon DG checklist.",
    content: "Heavy rainfall often causes grid interruptions. To ensure your backup generator operates seamlessly, check fuel tank water contamination, inspect battery electrolyte levels, service the AMF panel switches, and verify acoustic enclosure drainage holes are clear.",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop",
    readTime: "5 min read",
    status: "Published"
  },
  {
    id: "blog-3",
    title: "Benefits of Automatic Mains Failure (AMF) Panels for DG Sets",
    slug: "benefits-of-amf-panel-for-dg-set",
    category: "Technology",
    author: "Engineering Dept",
    publishedDate: "2026-07-10",
    excerpt: "How AMF control panels enable instant automatic power switching within seconds of grid failure.",
    content: "An AMF panel monitors utility power continuously. Upon sensing grid interruption, it signals the generator to start automatically and transfers the load without human intervention, protecting data centers and critical medical equipment.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    readTime: "3 min read",
    status: "Published"
  }
];

export const INITIAL_ENQUIRIES: EnquiryItem[] = [
  {
    id: "enq-101",
    name: "Vikram Malhotra",
    email: "v.malhotra@gmrgroup.in",
    phone: "+91 98110 43210",
    department: "Sales / Quote Request",
    productOrService: "Kirloskar 250 kVA DG Set",
    message: "We need a quote for 2 units of 250 kVA Kirloskar CPCB IV+ DG Sets along with AMF panels for our upcoming construction site in Noida.",
    callback: true,
    submittedAt: "2026-07-20T10:30:00Z",
    status: "New"
  },
  {
    id: "enq-102",
    name: "Sunita Sharma",
    email: "sunita@apollohospitals.org",
    phone: "+91 97177 12345",
    department: "AMC / Maintenance",
    productOrService: "Annual Maintenance Contract",
    message: "Looking to renew annual maintenance contract for our 3 existing Kirloskar 500 kVA generators at Apollo Sarita Vihar.",
    callback: true,
    submittedAt: "2026-07-19T14:15:00Z",
    status: "Contacted"
  },
  {
    id: "enq-103",
    name: "Rajesh Oberoi",
    email: "roberoi@hotelmapple.com",
    phone: "+91 98991 88765",
    department: "Rental Enquiry",
    productOrService: "125 kVA Generator Rental",
    message: "Required 125 kVA soundproof generator on rent for 15 days event at hotel lawn.",
    callback: false,
    submittedAt: "2026-07-18T09:45:00Z",
    status: "Closed"
  }
];

export const INITIAL_RESUMES: ResumeItem[] = [
  {
    id: "res-1",
    fullName: "Amitabh Verma",
    email: "amitabh.verma@gmail.com",
    phone: "+91 98102 99887",
    appliedPosition: "Senior Service Engineer (DG Sets)",
    experienceYears: "6 Years",
    message: "Diploma in Mechanical Engineering with 6+ years hands-on experience in Kirloskar & Cummins DG servicing.",
    resumePath: "/resumes/amitabh_verma_cv.pdf",
    submittedAt: "2026-07-17T11:20:00Z",
    status: "Under Review"
  },
  {
    id: "res-2",
    fullName: "Pooja Deshmukh",
    email: "pooja.d@yahoo.co.in",
    phone: "+91 98765 43210",
    appliedPosition: "Industrial Sales Executive",
    experienceYears: "4 Years",
    message: "B.Tech Electrical with experience selling industrial power products and handling tender bidding.",
    resumePath: "/resumes/pooja_deshmukh_resume.pdf",
    submittedAt: "2026-07-15T16:05:00Z",
    status: "Shortlisted"
  }
];

export const INITIAL_NAV_LINKS: NavLink[] = [
  { id: "nav-1", label: "Home", url: "/", order: 1, location: "Both", isActive: true, type: "Main Link", parent: "-", isStatic: true },
  
  { id: "nav-2", label: "About Us", url: "/about", order: 2, location: "Both", isActive: true, type: "Dropdown", parent: "-", isStatic: true },
  { id: "nav-2-1", label: "Our Story", url: "/about/OurProfile", order: 1, location: "Both", isActive: true, type: "Sub Link", parent: "nav-2", isStatic: true },
  { id: "nav-2-2", label: "Testimonials", url: "/about/Testimonials", order: 2, location: "Both", isActive: true, type: "Sub Link", parent: "nav-2", isStatic: true },
  { id: "nav-2-3", label: "Photo gallery", url: "/about/PhotoGallery", order: 3, location: "Both", isActive: true, type: "Sub Link", parent: "nav-2", isStatic: true },
  { id: "nav-2-4", label: "Certifications", url: "/about/Certifications", order: 4, location: "Both", isActive: true, type: "Sub Link", parent: "nav-2", isStatic: true },

  { id: "nav-3", label: "Products", url: "/products", order: 3, location: "Both", isActive: true, type: "Dropdown", parent: "-", isStatic: true },
  { id: "nav-3-1", label: "Kirloskar Diesel Generator", url: "/products/kirloskar-diesel-generator", order: 1, location: "Both", isActive: true, type: "Sub Link", parent: "nav-3", isStatic: true },
  { id: "nav-3-2", label: "Kirloskar Gas Generator", url: "/products/kirloskar-gas-generator", order: 2, location: "Both", isActive: true, type: "Sub Link", parent: "nav-3", isStatic: true },
  { id: "nav-3-3", label: "Kirloskar Portable Generator", url: "/products/kirloskar-portable-generator", order: 3, location: "Both", isActive: true, type: "Sub Link", parent: "nav-3", isStatic: true },
  { id: "nav-3-4", label: "Panels", url: "/products/panels", order: 4, location: "Both", isActive: true, type: "Sub Link", parent: "nav-3", isStatic: true },
  { id: "nav-3-5", label: "Optiprime", url: "/products/optiprime", order: 5, location: "Both", isActive: true, type: "Sub Link", parent: "nav-3", isStatic: true },
  { id: "nav-3-6", label: "Servo Stabilizer", url: "/products/servo-stabilizer", order: 6, location: "Both", isActive: true, type: "Sub Link", parent: "nav-3", isStatic: true },
  { id: "nav-3-7", label: "Transformers", url: "/products/transformers", order: 7, location: "Both", isActive: true, type: "Sub Link", parent: "nav-3", isStatic: true },

  { id: "nav-4", label: "Our Clients", url: "/about/OurClients", order: 4, location: "Both", isActive: true, type: "Main Link", parent: "-", isStatic: true },
  { id: "nav-5", label: "Installation", url: "/installation", order: 5, location: "Both", isActive: true, type: "Main Link", parent: "-", isStatic: true },
  { id: "nav-6", label: "Contact", url: "/contact", order: 6, location: "Both", isActive: true, type: "Main Link", parent: "-", isStatic: true },
  { id: "nav-7", label: "Blog", url: "/blogs", order: 7, location: "Both", isActive: true, type: "Main Link", parent: "-", isStatic: true }
];

export const INITIAL_SOCIAL_LINKS: SocialLink[] = [
  { id: "soc-1", platform: "LinkedIn", url: "https://linkedin.com/company/kumarpower", icon: "Linkedin" },
  { id: "soc-2", platform: "Facebook", url: "https://facebook.com/kumarpowergenerators", icon: "Facebook" },
  { id: "soc-3", platform: "Instagram", url: "https://instagram.com/kumarpower_official", icon: "Instagram" },
  { id: "soc-4", platform: "YouTube", url: "https://youtube.com/@kumarpower", icon: "Youtube" }
];

export const INITIAL_SEO_SETTINGS: PageSeo[] = [
  {
    id: "seo-1",
    pageName: "Home Page",
    slug: "/",
    metaTitle: "Kirloskar Generator Dealer | Authorized Distributor in Delhi NCR",
    metaDescription: "Looking for a reliable Kirloskar Generator dealer? Explore affordable prices, expert installation, 24/7 service support & high-efficiency DG sets. Call now for details.",
    canonicalUrl: "https://www.kumarpower.com/",
    keywords: "Kirloskar DG set, silent generator, generator dealer delhi, kirloskar generator 20kva to 1500kva, generator rental",
    ogImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "seo-2",
    pageName: "Products Page",
    slug: "/products",
    metaTitle: "Kirloskar Silent Diesel & Gas Generators | Kumar Power",
    metaDescription: "Explore our range of Kirloskar CPCB IV+ compliant silent diesel generators, gas gensets, portable generators, and AMF panels.",
    keywords: "kirloskar diesel generator price, cpcb4 generator, portable genset, amf panel, servo stabilizer",
    ogImage: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "seo-3",
    pageName: "Services Page",
    slug: "/services",
    metaTitle: "Generator AMC, Repair & Installation Services | Kumar Power",
    metaDescription: "Expert generator AMC services, 24/7 breakdown support, installation, and major overhauling for all Kirloskar DG sets.",
    keywords: "generator amc delhi, generator repair service, kirloskar engine overhaul, generator installation",
    ogImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop"
  }
];

export const INITIAL_HOMEPAGE_DATA = {
  hero: {
    title: "Powering India with Kirloskar Reliability",
    subtitle: "Authorized Dealer of Kirloskar Green CPCB IV+ Silent Diesel Generators, Gas Gensets & Turnkey Power Solutions",
    ctaPrimary: "Request a Quote",
    ctaSecondary: "Explore Products",
    bannerImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    stats: [
      { label: "Years of Excellence", value: "35+" },
      { label: "Generators Installed", value: "12,500+" },
      { label: "Happy Clients", value: "8,000+" },
      { label: "Service Response SLA", value: "< 60 Mins" }
    ]
  },
  aboutSection: {
    badge: "About Kumar Power",
    heading: "Leading Authorized Kirloskar Power Solutions Provider",
    description: "Established as a premier channel partner for Kirloskar Oil Engines Limited (KOEL), Kumar Power specializes in sales, installation, commissioning, maintenance, and rental of silent diesel generators ranging from 2.1 kVA to 1500 kVA.",
    yearsExperience: "35+",
    certifications: "ISO 9001:2015 Certified & CPCB IV+ Compliant"
  },
  kirloskarAdvantage: {
    heading: "The Kirloskar Advantage",
    features: [
      { title: "CPCB IV+ Emission Standard", desc: "Eco-friendly, ultra-clean emissions & low carbon footprint." },
      { title: "Fuel Efficient Engine", desc: "Best-in-class power output per liter of diesel consumption." },
      { title: "Ultra Quiet Operation", desc: "Soundproof acoustic enclosures under 75 dBA at 1 meter." },
      { title: "Pan-India Service Network", desc: "24/7 technical support & guaranteed spare availability." }
    ]
  }
};
