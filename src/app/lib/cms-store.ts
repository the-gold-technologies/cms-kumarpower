"use client";

import { useEffect, useState } from "react";
import {
  ProductItem,
  ServiceItem,
  RentalItem,
  BlogItem,
  EnquiryItem,
  ResumeItem,
  NavLink,
  SocialLink,
  PageSeo,
} from "./types";

const STORAGE_KEYS = {
  PRODUCTS: "kp_cms_products",
  SERVICES: "kp_cms_services",
  RENTALS: "kp_cms_rentals",
  BLOGS: "kp_cms_blogs",
  ENQUIRIES: "kp_cms_enquiries",
  RESUMES: "kp_cms_resumes",
  NAV_LINKS: "kp_cms_nav_links",
  SOCIAL_LINKS: "kp_cms_social_links",
  SEO: "kp_cms_seo",
  HOMEPAGE: "kp_cms_homepage"
};

export function useCMSStore() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [rentals, setRentals] = useState<RentalItem[]>([]);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [resumes, setResumes] = useState<ResumeItem[]>([]);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [seoSettings, setSeoSettings] = useState<PageSeo[]>([]);
  const [homepage, setHomepage] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage or DB API
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (storedProducts) setProducts(JSON.parse(storedProducts));

      const storedServices = localStorage.getItem(STORAGE_KEYS.SERVICES);
      if (storedServices) setServices(JSON.parse(storedServices));

      const storedRentals = localStorage.getItem(STORAGE_KEYS.RENTALS);
      if (storedRentals) setRentals(JSON.parse(storedRentals));

      const storedBlogs = localStorage.getItem(STORAGE_KEYS.BLOGS);
      if (storedBlogs) setBlogs(JSON.parse(storedBlogs));

      const storedEnquiries = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      if (storedEnquiries) setEnquiries(JSON.parse(storedEnquiries));

      const storedResumes = localStorage.getItem(STORAGE_KEYS.RESUMES);
      if (storedResumes) setResumes(JSON.parse(storedResumes));

      const storedNav = localStorage.getItem(STORAGE_KEYS.NAV_LINKS);
      if (storedNav) setNavLinks(JSON.parse(storedNav));

      const storedSocial = localStorage.getItem(STORAGE_KEYS.SOCIAL_LINKS);
      if (storedSocial) setSocialLinks(JSON.parse(storedSocial));

      const storedSeo = localStorage.getItem(STORAGE_KEYS.SEO);
      if (storedSeo) setSeoSettings(JSON.parse(storedSeo));

      const storedHomepage = localStorage.getItem(STORAGE_KEYS.HOMEPAGE);
      if (storedHomepage) setHomepage(JSON.parse(storedHomepage));
    } catch (e) {
      console.error("Error reading from local storage", e);
    }
    setIsLoaded(true);
  }, []);

  const saveProducts = (newItems: ProductItem[]) => {
    setProducts(newItems);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(newItems));
  };

  const saveServices = (newItems: ServiceItem[]) => {
    setServices(newItems);
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(newItems));
  };

  const saveRentals = (newItems: RentalItem[]) => {
    setRentals(newItems);
    localStorage.setItem(STORAGE_KEYS.RENTALS, JSON.stringify(newItems));
  };

  const saveBlogs = (newItems: BlogItem[]) => {
    setBlogs(newItems);
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(newItems));
  };

  const saveEnquiries = (newItems: EnquiryItem[]) => {
    setEnquiries(newItems);
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(newItems));
  };

  const saveResumes = (newItems: ResumeItem[]) => {
    setResumes(newItems);
    localStorage.setItem(STORAGE_KEYS.RESUMES, JSON.stringify(newItems));
  };

  const saveNavLinks = (newItems: NavLink[]) => {
    setNavLinks(newItems);
    localStorage.setItem(STORAGE_KEYS.NAV_LINKS, JSON.stringify(newItems));
  };

  const saveSocialLinks = (newItems: SocialLink[]) => {
    setSocialLinks(newItems);
    localStorage.setItem(STORAGE_KEYS.SOCIAL_LINKS, JSON.stringify(newItems));
  };

  const saveSeoSettings = (newItems: PageSeo[]) => {
    setSeoSettings(newItems);
    localStorage.setItem(STORAGE_KEYS.SEO, JSON.stringify(newItems));
  };

  const saveHomepage = (data: any) => {
    setHomepage(data);
    localStorage.setItem(STORAGE_KEYS.HOMEPAGE, JSON.stringify(data));
  };

  return {
    products,
    services,
    rentals,
    blogs,
    enquiries,
    resumes,
    navLinks,
    socialLinks,
    seoSettings,
    homepage,
    isLoaded,
    saveProducts,
    saveServices,
    saveRentals,
    saveBlogs,
    saveEnquiries,
    saveResumes,
    saveNavLinks,
    saveSocialLinks,
    saveSeoSettings,
    saveHomepage,
  };
}
