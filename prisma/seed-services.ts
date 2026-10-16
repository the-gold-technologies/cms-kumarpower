import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const installationData = {
  "faqs": [
    {
      "id": "f-1",
      "answer": "The installation timeline varies based on the system complexity and site conditions. Small to medium generators typically take 1-3 days, while larger industrial installations may require 1-2 weeks. Our team will provide a detailed timeline during the initial assessment.",
      "question": "How long does the installation process take?"
    },
    {
      "id": "f-2",
      "answer": "Yes, we manage the entire permitting process. Our team handles all necessary documentation, regulatory compliance, and approvals from local authorities, ensuring your installation meets all legal requirements.",
      "question": "Do you handle all required permits and approvals?"
    },
    {
      "id": "f-3",
      "answer": "Absolutely. Our installation teams are equipped to handle challenging locations including rooftops, basements, confined spaces, and remote sites. We have specialized equipment for crane lifts, custom mounting solutions, and extended cable runs.",
      "question": "Can you install generators in difficult locations?"
    },
    {
      "id": "f-4",
      "answer": "We minimize disruption by carefully planning the installation process. Most electrical connections requiring power interruption can be scheduled during off-hours. Our team coordinates closely with your staff to develop an installation plan that accommodates your operational needs.",
      "question": "Will the installation cause disruption to our operations?"
    },
    {
      "id": "f-5",
      "answer": "Following installation, we conduct comprehensive commissioning tests, provide detailed operator training, and deliver complete documentation including operation manuals, warranty information, and maintenance schedules. We also offer ongoing maintenance contracts to keep your system operating at peak performance.",
      "question": "What happens after installation is complete?"
    },
    {
      "id": "f-6",
      "answer": "Yes, all our installation work is backed by a comprehensive warranty. We provide a standard 12-month warranty on labor and workmanship, in addition to any manufacturer warranties on the equipment. Extended warranty options are also available for added peace of mind.",
      "question": "Are your installations covered by warranty?"
    }
  ],
  "steps": [
    {
      "id": "step-1",
      "title": "Initial Consultation & Site Survey",
      "bullet1": "Comprehensive load analysis and power requirements assessment",
      "bullet2": "Detailed site inspection and infrastructure evaluation",
      "stepNum": "1",
      "description": "We begin with a thorough assessment of your power requirements and site conditions to determine the optimal system configuration, placement, and infrastructure needs."
    },
    {
      "id": "step-2",
      "title": "Detailed Design & Planning",
      "bullet1": "Custom system design optimized for your facility",
      "bullet2": "Detailed project timeline and resource allocation",
      "stepNum": "2",
      "description": "Our engineers develop comprehensive installation plans including electrical schematics, mechanical layouts, and project timelines tailored to your specific needs."
    },
    {
      "id": "step-3",
      "title": "Permitting & Compliance",
      "bullet1": "Complete management of permit acquisition process",
      "bullet2": "Regulatory compliance verification and documentation",
      "stepNum": "3",
      "description": "We handle all necessary permits, regulatory approvals, and compliance requirements to ensure your installation meets all local and national standards."
    },
    {
      "id": "step-4",
      "title": "Professional Installation",
      "bullet1": "Expert mechanical and electrical installation by certified technicians",
      "bullet2": "Quality control checks at each installation milestone",
      "stepNum": "4",
      "description": "Our certified technicians execute the installation according to the detailed plan, ensuring all components are properly installed, connected, and secured."
    },
    {
      "id": "step-5",
      "title": "Testing & Commissioning",
      "bullet1": "Full-load testing under various operational conditions",
      "bullet2": "System performance optimization and calibration",
      "stepNum": "5",
      "description": "We conduct comprehensive testing of all systems, including load testing, performance verification, and safety checks to ensure everything functions correctly."
    },
    {
      "id": "step-6",
      "title": "Training & Handover",
      "bullet1": "Comprehensive operator training and knowledge transfer",
      "bullet2": "Complete system documentation and maintenance schedules",
      "stepNum": "6",
      "description": "We provide thorough training for your staff on system operation and basic maintenance, along with complete documentation and warranty information."
    }
  ],
  "heroBg": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1792144115/KumarPower-Assets/services/installation_hero_bg.jpg",
  "faqDesc": "Get answers to frequently asked questions about our installation and commissioning services",
  "heroSub": "Expert power system installation and commissioning services for optimal performance, reliability, and compliance.",
  "introDesc": "Kumar Power delivers end-to-end installation and commissioning services for all types of power generation equipment, ensuring your systems operate at peak efficiency from day one.\n\nOur certified technicians handle everything from site assessment and planning to final commissioning and operator training, delivering turnkey solutions that maximize reliability and minimize downtime across industries.",
  "benefits": [
    {
      "id": "b-1",
      "title": "Maximize System Reliability",
      "description": "Proper installation ensures your power system performs optimally during critical situations, minimizing the risk of failures when you need power most."
    },
    {
      "id": "b-2",
      "title": "Extend Equipment Lifespan",
      "description": "Professional installation with correct mounting, connections, and calibration significantly extends the operational life of your generator and related components."
    },
    {
      "id": "b-3",
      "title": "Ensure Code Compliance",
      "description": "Our certified technicians ensure all installations meet or exceed local codes, national standards, and manufacturer specifications."
    },
    {
      "id": "b-4",
      "title": "Optimize Performance",
      "description": "Expert installation and commissioning maximize fuel efficiency, power output, and system responsiveness for optimal performance."
    },
    {
      "id": "b-5",
      "title": "Minimize Maintenance Issues",
      "description": "Correctly installed systems require less maintenance and experience fewer operational problems over their lifetime."
    },
    {
      "id": "b-6",
      "title": "Protect Warranty Coverage",
      "description": "Professional installation by authorized technicians maintains manufacturer warranty coverage and provides additional installation workmanship guarantees."
    }
  ],
  "heroBadge": "Professional Services",
  "portfolio": [
    {
      "id": "p-2",
      "name": "Commercial Power System",
      "category": "Commercial",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966974/KumarPower-Assets/mvv11ihb8nih5vrq2wb9.png"
    },
    {
      "id": "p-3",
      "name": "Residential Backup Generator",
      "category": "Residential",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966974/KumarPower-Assets/xofjblirbmylcgsjcoul.png"
    },
    {
      "id": "p-4",
      "name": "Hospital Emergency Power",
      "category": "Commercial",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966974/KumarPower-Assets/jczy7ynnmsl2zknnjefb.png"
    },
    {
      "id": "p-5",
      "name": "Data Center Installation",
      "category": "Industrial",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966975/KumarPower-Assets/i7h1huyugxxwuy1fge4y.png"
    },
    {
      "id": "p-6",
      "name": "Manufacturing Facility Setup",
      "category": "Industrial",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966975/KumarPower-Assets/izvaigzjjpswxgzfw7xv.png"
    },
    {
      "id": "p-7",
      "name": "Office Building Generator",
      "category": "Commercial",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966975/KumarPower-Assets/af4xxfn5hbbhreoxgz8x.png"
    },
    {
      "id": "p-8",
      "name": "Home Standby Power",
      "category": "Residential",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966975/KumarPower-Assets/so5pl2ojbmbasit4joke.png"
    },
    {
      "id": "p-9",
      "name": "Retail Power Solution",
      "category": "Commercial",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966976/KumarPower-Assets/eaxn6ituks463kzln40o.png"
    },
    {
      "id": "p-10",
      "name": "Industrial Complex System",
      "category": "Industrial",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966976/KumarPower-Assets/ctdmuiarag4ir1kurpxq.png"
    },
    {
      "id": "p-11",
      "name": "Apartment Building Generator",
      "category": "Residential",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966976/KumarPower-Assets/tx1zdjzesb34hzphb0zy.png"
    },
    {
      "id": "p-13",
      "name": "Hotel Backup System",
      "category": "Commercial",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966976/KumarPower-Assets/agthb94annfcg8rpoloj.png"
    },
    {
      "id": "p-14",
      "name": "Residential Power Solution",
      "category": "Residential",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966977/KumarPower-Assets/pky5dewiokxjmwgktqlh.png"
    },
    {
      "id": "p-15",
      "name": "Warehouse Power Setup",
      "category": "Industrial",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966977/KumarPower-Assets/vrfh5rvixijiharfzeij.png"
    },
    {
      "id": "p-16",
      "name": "School Generator Installation",
      "category": "Commercial",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966977/KumarPower-Assets/kmylymdkexaz8w653v3l.png"
    },
    {
      "id": "p-17",
      "name": "Single Family Home System",
      "category": "Residential",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966977/KumarPower-Assets/hndyx3wns7xdn1qihjqb.png"
    },
    {
      "id": "p-18",
      "name": "Manufacturing Plant Power",
      "category": "Industrial",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966978/KumarPower-Assets/myedwzkyo3ek6qiwtwcv.png"
    },
    {
      "id": "p-19",
      "name": "Office Complex Generator",
      "category": "Commercial",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966978/KumarPower-Assets/rxa9htcwbacqwnlfajx9.png"
    },
    {
      "id": "p-20",
      "name": "Luxury Home Installation",
      "category": "Residential",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966978/KumarPower-Assets/qyeosw2qyzo8qhe104xg.png"
    },
    {
      "id": "p-21",
      "name": "Industrial Site Power",
      "category": "Industrial",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966978/KumarPower-Assets/fq8mkfqqok0keufa4uvm.png"
    },
    {
      "id": "p-22",
      "name": "Retail Center Backup",
      "category": "Commercial",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966980/KumarPower-Assets/hlpknir1wh5jnecna9w8.png"
    },
    {
      "id": "p-23",
      "name": "Residential Community System",
      "category": "Residential",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966980/KumarPower-Assets/njwintoj94rdnlgaxpze.png"
    },
    {
      "id": "p-24",
      "name": "Production Facility Setup",
      "category": "Industrial",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966980/KumarPower-Assets/gpgfymn4gpmzmgs2hky6.png"
    },
    {
      "id": "p-25",
      "name": "Medical Center Installation",
      "category": "Commercial",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966980/KumarPower-Assets/x3zfjtialo5olhzs7cbu.png"
    },
    {
      "id": "p-26",
      "name": "Suburban Home Generator",
      "category": "Residential",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966981/KumarPower-Assets/fsl5lpqqobwfn6gc2x9v.png"
    },
    {
      "id": "p-27",
      "name": "Distribution Center Power",
      "category": "Industrial",
      "imageUrl": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966981/KumarPower-Assets/gxocpfyz1kkugoubrpfv.png"
    }
  ],
  "faqHeading": "Common Questions About Installation",
  "faqTagline": "FREQUENTLY ASKED QUESTIONS",
  "introImage": "https://res.cloudinary.com/jfjvmqfs/image/upload/v1791966974/KumarPower-Assets/uxcjegk9rty4csmdio5j.jpg",
  "heroHeading": "Installation & Commissioning",
  "processDesc": "A comprehensive approach to ensure your power system is installed correctly, efficiently, and with minimal disruption",
  "heroCtaLabel": "Schedule a Consultation",
  "introHeading": "Professional Power System Installation",
  "introTagline": "KUMAR POWER EXPERTISE",
  "portfolioDesc": "Explore our comprehensive range of professional generator installations across industrial, commercial, and residential settings",
  "processHeading": "Our Installation Process",
  "processTagline": "OUR INSTALLATION PROCESS",
  "portfolioHeading": "Our Installation Portfolio",
  "portfolioTagline": "OUR PROFESSIONAL INSTALLATIONS",
  "portfolioCtaLabel": "Schedule Your Installation",
  "heroCtaLink": "/contact",
  "introBtn1Label": "Schedule Installation",
  "introBtn1Link": "/contact",
  "introBtn2Label": "View all Products",
  "introBtn2Link": "/products/generators",
  "portfolioCtaLink": "/contact"
};

const annualMaintenanceData = {
  heroHeadingPart1: "ANNUAL MAINTENANCE CONTRACTS",
  heroTitle: "Preventive Care for Uninterrupted Power",
  heroSub: "Ensure maximum uptime and equipment longevity with our comprehensive maintenance solutions",
  heroCtaLabel: "Request AMC Quote",
  heroCtaLink: "/contact",
  introTitlePart1: "Keep Your Power Systems Running at",
  introTitlePart2: "Peak Efficiency",
  introDesc: "Our Annual Maintenance Contracts (AMC) provide scheduled preventive maintenance, prompt repairs, and emergency support to ensure your power generation equipment operates reliably year-round.\n\nWith Kumar Power's expert technicians and genuine Kirloskar parts, you can minimize downtime, extend equipment life, and optimize performance for maximum ROI.",
  introBtn1Label: "Request AMC Quote",
  introBtn1Link: "/contact",
  introBtn2Label: "View All Products",
  introBtn2Link: "/products/generators",
  introImage: "https://res.cloudinary.com/jfjvmqfs/image/upload/v1792141308/KumarPower-Assets/services/annual_maintenance_intro.png",
  benefitsTagline: "Why Choose Our AMC",
  benefitsHeading: "Benefits of Our Annual Maintenance Contracts",
  benefitsSub: "Proactive maintenance is the key to reliable power generation and equipment longevity",
  benefits: [
    {
      title: "Prevent Costly Breakdowns",
      description: "Regular maintenance identifies and resolves potential issues before they lead to major failures and expensive repairs.",
      icon: "Shield"
    },
    {
      title: "Minimize Downtime",
      description: "Scheduled maintenance during off-peak hours and priority emergency response ensure your operations continue without interruption.",
      icon: "Clock"
    },
    {
      title: "Extend Equipment Life",
      description: "Proper maintenance significantly extends the operational lifespan of generators and power equipment, maximizing your investment.",
      icon: "Calendar"
    },
    {
      title: "Regulatory Compliance",
      description: "Our maintenance protocols ensure your equipment meets all environmental and safety regulations, avoiding potential penalties.",
      icon: "AlertCircle"
    },
    {
      title: "Detailed Documentation",
      description: "Comprehensive service records and performance reports help with warranty claims, insurance requirements, and future planning.",
      icon: "FileText"
    },
    {
      title: "Expert Technicians",
      description: "All maintenance is performed by Kirloskar-certified engineers with extensive experience across our full range of equipment.",
      icon: "Wrench"
    }
  ],
  processTagline: "How We Work",
  processHeading: "Our Maintenance Process",
  processSub: "A systematic approach to ensure comprehensive care for your power equipment",
  processSteps: [
    {
      step: 1,
      title: "Initial System Assessment",
      description: "Complete evaluation of all power generation equipment to establish baseline conditions and identify any immediate concerns that need addressing."
    },
    {
      step: 2,
      title: "Scheduled Preventive Maintenance",
      description: "Regular visits based on your AMC plan to perform comprehensive maintenance including fluid checks, filter replacements, battery testing, and system calibration."
    },
    {
      step: 3,
      title: "Performance Testing & Analysis",
      description: "Load testing, efficiency measurements, and emissions monitoring to ensure optimal performance and regulatory compliance."
    },
    {
      step: 4,
      title: "Detailed Reporting",
      description: "Comprehensive service reports documenting all maintenance performed, parts replaced, system performance metrics, and recommendations for future improvements."
    },
    {
      step: 5,
      title: "Continuous Support",
      description: "Ongoing technical assistance, emergency response, and proactive notifications for scheduled maintenance to ensure your equipment operates reliably."
    }
  ],
  faqTagline: "Get Answers",
  faqHeading: "Frequently Asked Questions",
  faqSub: "Common questions about our Annual Maintenance Contracts",
  faqs: [
    {
      question: "What does the Annual Maintenance Contract cover?",
      answer: "Our AMC covers scheduled preventive maintenance visits, troubleshooting, repairs, part replacements as per the selected plan, technical support, and emergency response services. Each plan offers different levels of coverage, but all ensure your power systems operate efficiently with minimal downtime."
    },
    {
      question: "How often will maintenance be performed?",
      answer: "Maintenance frequency depends on your selected plan. Basic AMC includes quarterly visits, Standard AMC includes bi-monthly visits, and Premium AMC includes monthly visits. Additional visits can be arranged as needed for specific requirements."
    },
    {
      question: "Are parts included in the AMC?",
      answer: "Yes, replacement parts are included based on your selected plan. Basic AMC covers essential parts, Standard AMC includes most common replacement components, and Premium AMC offers comprehensive parts coverage. Consumables like oil and filters are included in all plans."
    },
    {
      question: "What is the emergency response time?",
      answer: "Emergency response times vary by plan: Basic AMC ensures 48-hour response, Standard AMC provides 24-hour response, and Premium AMC guarantees 12-hour response. For critical facilities, we can customize response times to meet your specific needs."
    },
    {
      question: "Can I customize my AMC plan?",
      answer: "Yes, we offer customized AMC plans tailored to your specific requirements. Our team will assess your power systems and develop a maintenance program that addresses your unique needs, equipment configuration, and operational demands."
    }
  ],
  ctaHeading: "Ready to Secure Your Power Equipment's Performance?",
  ctaSub: "Contact our service team today to discuss the ideal Annual Maintenance Contract for your power systems.",
  ctaBtn1Label: "Request AMC Quote",
  ctaBtn1Link: "/contact",
  ctaBtn2Label: "Explore Other Services",
  ctaBtn2Link: "/services/installation"
};

const emergencySupportData = {
  heroTagline: "Critical Response",
  heroHeading: "24/7 Emergency Support",
  heroSub: "Rapid response solutions for power emergencies when every minute counts",
  emergencyPhone: "+919773851767",
  introTagline: "EMERGENCY RESPONSE",
  introTitle: "Reliable Emergency Support When You Need It Most",
  introDesc: "Power outages and equipment failures don't follow a schedule. That's why Kumar Power's emergency response team is available 24 hours a day, 7 days a week, 365 days a year to ensure your operations can continue without disruption.\n\nOur rapid response teams are strategically positioned across India to provide fast, effective emergency service when your power systems fail, minimizing downtime and protecting your critical infrastructure and business continuity.",
  introHotlineLabel: "Emergency Hotline",
  introBtn2Label: "Request Priority Service",
  introBtn2Link: "/contact",
  introImage: "https://res.cloudinary.com/jfjvmqfs/image/upload/v1792141313/KumarPower-Assets/services/emergency_support_intro.png",
  statsTagline: "RAPID RESPONSE METRICS",
  statsHeading: "Our Emergency Response Performance",
  statsSub: "We understand that during power emergencies, every minute counts. Our service metrics demonstrate our commitment to rapid, effective response.",
  responseStats: [
    {
      value: "15",
      label: "Minutes",
      description: "Average initial phone response time"
    },
    {
      value: "<2",
      label: "Hours",
      description: "Average on-site arrival time"
    },
    {
      value: "98%",
      label: "Resolution",
      description: "First-visit resolution rate"
    },
    {
      value: "24/7",
      label: "Support",
      description: "Emergency hotline availability"
    }
  ],
  benefitsTagline: "THE KUMAR POWER DIFFERENCE",
  benefitsHeading: "Our Emergency Service Advantage",
  benefitsSub: "Why businesses across India trust Kumar Power for their critical emergency response needs",
  serviceBenefits: [
    {
      icon: "PhoneCall",
      title: "24/7/365 Response",
      description: "Our emergency hotline is always open, with skilled technicians ready to respond at any hour, any day of the year."
    },
    {
      icon: "Clock",
      title: "Rapid Deployment",
      description: "Our strategically positioned service teams can reach most locations within 1-3 hours, minimizing downtime."
    },
    {
      icon: "Truck",
      title: "Mobile Service Units",
      description: "Fully equipped service vehicles with common parts and specialized tools for on-site emergency repairs."
    },
    {
      icon: "Zap",
      title: "Priority Parts Access",
      description: "Emergency customers receive priority access to our extensive parts inventory and emergency shipping options."
    },
    {
      icon: "AlertTriangle",
      title: "Temporary Power Solutions",
      description: "Immediate access to rental generators while your equipment is being repaired for uninterrupted operations."
    },
    {
      icon: "Shield",
      title: "Service Level Guarantees",
      description: "Clear response time commitments and service level agreements for critical infrastructure clients."
    }
  ],
  processTagline: "OUR STRUCTURED APPROACH",
  processHeading: "Our Emergency Response Process",
  processSub: "A systematic approach designed for swift resolution of power emergencies",
  processSteps: [
    {
      step: 1,
      title: "Emergency Call Received",
      description: "Your call is immediately answered by our trained emergency dispatchers who collect critical information about your situation and equipment.",
      points: [
        "Dedicated emergency hotline available 24/7/365",
        "Technically trained dispatchers prioritize response"
      ]
    },
    {
      step: 2,
      title: "Initial Remote Diagnostics",
      description: "Our technical specialists provide immediate phone guidance to help identify the issue and potentially resolve simple problems while the response team is dispatched.",
      points: [
        "Expert troubleshooting begins immediately",
        "Remote monitoring connection when available"
      ]
    },
    {
      step: 3,
      title: "Rapid Team Deployment",
      description: "The nearest service team is dispatched with a fully equipped mobile unit carrying common parts and specialized tools for your generator model.",
      points: [
        "GPS-optimized routing for fastest arrival",
        "Real-time status updates on technician arrival"
      ]
    },
    {
      step: 4,
      title: "On-Site Diagnostics & Repair",
      description: "Our technicians quickly diagnose the issue on arrival and begin immediate repairs, keeping you informed throughout the process.",
      points: [
        "Advanced diagnostic equipment for rapid troubleshooting",
        "Most common repairs completed on first visit"
      ]
    },
    {
      step: 5,
      title: "Temporary Solutions Deployment",
      description: "If repairs require extended time, we arrange for temporary power solutions to keep your operations running while more comprehensive repairs are made.",
      points: [
        "Fleet of rental generators from 5kVA to 2000kVA",
        "Complete installation and connection services"
      ]
    },
    {
      step: 6,
      title: "Resolution & Follow-up",
      description: "Once repairs are complete, we verify system operation under load, provide detailed documentation of the issue and solution, and schedule any necessary follow-up service.",
      points: [
        "Comprehensive testing under load conditions",
        "Root cause analysis to prevent recurrence"
      ]
    }
  ],
  scenariosTagline: "EMERGENCY EXPERTISE",
  scenariosHeading: "Common Emergency Scenarios We Handle",
  scenariosSub: "Our emergency teams are equipped to handle a wide range of power system failures",
  emergencyScenarios: [
    {
      title: "Complete System Failure",
      description: "When your generator fails to start or shuts down unexpectedly, causing total power loss to your facility.",
      icon: "AlertTriangle"
    },
    {
      title: "Control System Issues",
      description: "Malfunctions in the control panel preventing proper operation or automatic transfer switch failures.",
      icon: "Zap"
    },
    {
      title: "Fuel System Problems",
      description: "Fuel leaks, contamination, or delivery system failures that prevent generator operation.",
      icon: "Truck"
    },
    {
      title: "Overheating & Cooling Failures",
      description: "Radiator issues, coolant leaks, or fan failures causing the generator to overheat and shut down.",
      icon: "Siren"
    },
    {
      title: "Electrical Faults",
      description: "Short circuits, alternator problems, or voltage regulation issues affecting power quality.",
      icon: "LifeBuoy"
    },
    {
      title: "Weather-Related Emergencies",
      description: "Generator issues during storms, floods, or extreme weather when grid power is also compromised.",
      icon: "Shield"
    }
  ],
  faqTagline: "FREQUENTLY ASKED QUESTIONS",
  faqHeading: "Emergency Support FAQ",
  faqSub: "Common questions about our emergency support services",
  faqs: [
    {
      question: "How quickly can you respond to an emergency?",
      answer: "Our standard emergency response time is 1-3 hours in urban areas and 2-4 hours in remote locations. For clients with priority service agreements, we guarantee even faster response times. Our nationwide network of service centers and mobile units enables us to quickly reach most locations across India."
    },
    {
      question: "What should I do while waiting for emergency service?",
      answer: "First, ensure safety by shutting down the generator if there's visible damage, smoke, or unusual odors. Secure the area to prevent access to potentially dangerous equipment. Our phone support can guide you through basic troubleshooting and safety measures until our technicians arrive. For critical facilities, activate your backup plans if available."
    },
    {
      question: "Can you provide temporary power during an emergency?",
      answer: "Yes, we maintain a fleet of rental generators ranging from 5kVA to 2000kVA that can be deployed rapidly during emergencies. Our team will assess your power requirements and deliver, install, and connect an appropriate temporary generator to keep your operations running while repairs are made to your primary system."
    },
    {
      question: "Do you carry parts for emergency repairs?",
      answer: "Our mobile service units are stocked with commonly needed parts and components for most generator brands and models. We also maintain extensive parts inventories at our service centers with overnight delivery options. For specialized components, we have expedited ordering arrangements with all major manufacturers."
    },
    {
      question: "How much does emergency service cost?",
      answer: "Emergency service rates depend on factors including time of day, distance, equipment type, and required repairs. We provide transparent pricing with clear callout fees and hourly rates. Clients with service contracts receive preferential emergency rates. We'll always provide a cost estimate before proceeding with major repairs."
    },
    {
      question: "Are your technicians qualified to work on all generator brands?",
      answer: "Yes, our emergency response technicians are factory-trained and certified to work on all major generator brands including Cummins, Caterpillar, MTU, Kohler, Kirloskar, and many others. Our teams are regularly updated with the latest technical training to handle both legacy equipment and the newest generator models."
    }
  ]
};


const repairOverhaulData = {
  heroBadge: "Expert Services",
  heroHeading: "Repair & Overhaul Services",
  heroSub: "Professional restoration and renewal of power systems for optimal performance and reliability",
  heroCtaLabel: "Request Emergency Service",
  heroCtaLink: "/contact",
  heroBg: "",

  introTagline: "KUMAR POWER EXPERTISE",
  introTitle: "Expert Generator Repair & Overhaul Services",
  introDesc: "From emergency repairs to complete system rebuilds, Kumar Power's certified technicians possess the expertise to diagnose and resolve complex mechanical and electrical issues.\n\nWe use only genuine parts and industry-leading techniques to restore your equipment to optimal performance, ensuring reliability when you need it most while maximizing your investment in critical power infrastructure.",
  introImage: "https://res.cloudinary.com/jfjvmqfs/image/upload/v1792145273/KumarPower-Assets/services/repair_overhaul_intro.png",
  introBtn1Label: "Request Repair Service",
  introBtn1Link: "/contact",
  introBtn2Label: "Emergency Repair Hotline",
  introBtn2Link: "tel:+919773851767",

  diffTagline: "MAKING THE RIGHT CHOICE",
  diffHeading: "Repair vs. Overhaul: Understanding the Difference",
  diffDesc: "Knowing when your power equipment needs a simple repair versus a comprehensive overhaul",

  repairTabLabel: "Repair Services",
  repairTabTitle: "When You Need Repair Services",
  repairTabDesc1: "Repairs address specific issues or component failures in your power system. These are typically needed when your generator is experiencing:",
  repairScenarios: [
    "Sudden failure to start or run properly",
    "Unusual noises, vibrations, or performance issues",
    "Fluid leaks or visible damage",
    "Control panel or electrical system malfunctions",
    "Isolated component failures that don't affect the entire system"
  ],
  repairTabDesc2: "Our repair services are designed for quick response and targeted fixes to get your equipment back online with minimal downtime.",

  overhaulTabLabel: "Overhaul Services",
  overhaulTabTitle: "When You Need Overhaul Services",
  overhaulTabDesc1: "Overhauls are comprehensive rebuilds or restorations of your power system. These are typically recommended when:",
  overhaulScenarios: [
    "Your generator has reached a specific number of operating hours (typically 10,000-30,000 hours)",
    "Multiple systems are showing signs of wear or deterioration",
    "Performance has gradually declined despite regular maintenance",
    "Major components need replacement (pistons, crankshaft, alternator)",
    "You want to extend the lifespan of older but valuable equipment"
  ],
  overhaulTabDesc2: "Our overhaul services restore your equipment to like-new condition, extending its useful life and improving reliability and efficiency.",

  servicesTagline: "COMPREHENSIVE SOLUTIONS",
  servicesHeading: "Our Repair & Overhaul Services",
  servicesDesc: "Comprehensive solutions for all your power equipment repair and restoration needs",
  services: [
    {
      icon: "AlertTriangle",
      title: "Emergency Repairs",
      description: "Rapid response services for unexpected breakdowns and critical failures requiring immediate attention.",
      features: [
        "24/7 emergency response with guaranteed arrival times",
        "Fully equipped mobile repair units for on-site solutions",
        "Priority parts sourcing through our extensive supplier network",
        "Temporary power solutions to minimize operational disruption",
        "Comprehensive root cause analysis to prevent recurrence"
      ]
    },
    {
      icon: "Wrench",
      title: "Engine Repairs & Overhaul",
      description: "Complete engine servicing from minor repairs to full overhaul and rebuilding for optimal performance.",
      features: [
        "Advanced diagnostic technology for precise issue identification",
        "Specialized cylinder head refurbishment and valve reconditioning",
        "Precision crankshaft grinding and bearing replacement",
        "Complete fuel system rebuilding and calibration",
        "Full engine rebuilding with genuine OEM components"
      ]
    },
    {
      icon: "Cpu",
      title: "Electrical System Repairs",
      description: "Expert troubleshooting and repair of generator control systems, alternators, and power distribution components.",
      features: [
        "Professional alternator rewinding and insulation restoration",
        "Precision AVR replacement, calibration, and testing",
        "Advanced control panel diagnostics and component replacement",
        "Comprehensive panels inspection and servicing",
        "Circuit breaker testing, maintenance, and certification"
      ]
    },
    {
      icon: "Clock",
      title: "Preventive Overhaul",
      description: "Scheduled major overhauls to extend equipment life and prevent costly breakdowns before they occur.",
      features: [
        "Data-driven condition assessment and predictive analysis",
        "Detailed component life evaluation and wear pattern analysis",
        "Strategic component replacement based on usage patterns",
        "Performance-enhancing system upgrades and modernization",
        "Complete performance restoration and efficiency optimization"
      ]
    }
  ],

  benefitsTagline: "WHY PROFESSIONAL REPAIR MATTERS",
  benefitsHeading: "Benefits of Expert Repair & Overhaul",
  benefitsDesc: "Investing in professional repair services delivers long-term value and peace of mind",
  benefitsCtaLabel: "Schedule Your Repair Service",
  benefitsCtaLink: "/contact",
  benefits: [
    {
      icon: "Clock",
      title: "Extended Equipment Life",
      description: "Professional repairs and overhauls can significantly extend the operational lifespan of your power equipment, maximizing your return on investment."
    },
    {
      icon: "Shield",
      title: "Improved Reliability",
      description: "Properly repaired and overhauled systems experience fewer breakdowns and provide consistent, dependable power when you need it most."
    },
    {
      icon: "Activity",
      title: "Enhanced Performance",
      description: "Our repair services restore or even improve your system's original performance specifications, ensuring optimal efficiency and output."
    },
    {
      icon: "FileText",
      title: "Cost Effectiveness",
      description: "Quality repairs and strategic overhauls are often more economical than replacement, especially for larger power systems."
    },
    {
      icon: "CheckCircle2",
      title: "Regulatory Compliance",
      description: "Our repair services ensure your equipment meets all current regulatory standards for emissions, safety, and performance."
    },
    {
      icon: "Zap",
      title: "Minimized Downtime",
      description: "Fast, efficient repair processes and temporary power solutions help minimize operational disruptions during necessary service work."
    }
  ],

  processTagline: "OUR SYSTEMATIC APPROACH",
  processHeading: "Our Repair Process",
  processDesc: "A systematic approach to efficiently diagnose and resolve power system issues",
  processSteps: [
    {
      title: "Initial Assessment & Diagnostics",
      description: "Our technicians conduct a thorough inspection and diagnostic testing to identify the root cause of the issue and any related problems that need addressing.",
      features: [
        "Comprehensive digital diagnostics using advanced testing equipment",
        "Detailed inspection by certified technicians with specialized expertise"
      ]
    },
    {
      title: "Detailed Scope & Estimate",
      description: "We provide a comprehensive scope of work and detailed cost estimate, explaining all required repairs, parts, and labor before proceeding with any work.",
      features: [
        "Transparent pricing with detailed breakdown of all costs",
        "Clear timeline expectations with completion estimates"
      ]
    },
    {
      title: "Parts Procurement",
      description: "Our team sources genuine OEM parts or high-quality alternatives as specified, ensuring quick availability for time-sensitive repairs.",
      features: [
        "Extensive parts inventory for common repair components",
        "Direct relationships with manufacturers for expedited shipping"
      ]
    },
    {
      title: "Skilled Repair Execution",
      description: "Our certified technicians perform the necessary repairs or overhaul procedures according to manufacturer specifications and industry best practices.",
      features: [
        "Factory-trained technicians with specialized certifications",
        "Advanced tooling and equipment for precise repairs"
      ]
    },
    {
      title: "Testing & Quality Assurance",
      description: "We conduct comprehensive post-repair testing under load conditions to ensure all systems function properly and meet performance specifications.",
      features: [
        "Load bank testing to verify performance under various conditions",
        "Detailed performance metrics verification and documentation"
      ]
    },
    {
      title: "Detailed Documentation & Warranty",
      description: "We provide complete documentation of all work performed, parts replaced, and testing results, along with warranty information for your records.",
      features: [
        "Comprehensive service reports with detailed findings",
        "Clear warranty terms and recommended follow-up service"
      ]
    }
  ],

  faqTagline: "FREQUENTLY ASKED QUESTIONS",
  faqHeading: "Common Questions About Repairs",
  faqDesc: "Get answers to frequently asked questions about our repair and overhaul services",
  faqs: [
    {
      question: "How do I know if my generator needs a repair or an overhaul?",
      answer: "A repair is typically appropriate for isolated issues, sudden malfunctions, or specific component failures. An overhaul is recommended when an engine reaches high operating hours (usually 10,000-30,000 hours), exhibits widespread wear, experiences significant power loss, or consumes excessive oil. Our technicians can conduct a comprehensive assessment to recommend the most cost-effective solution."
    },
    {
      question: "Do you offer emergency on-site repair services?",
      answer: "Yes, we provide 24/7 emergency repair services with rapid response times. Our mobile repair units are fully equipped with diagnostic tools, common replacement parts, and equipment necessary to resolve many issues immediately on-site."
    },
    {
      question: "How long does a typical generator overhaul take?",
      answer: "The timeline for an overhaul depends on the generator size, model, and the scope of work required. In-chassis overhauls can typically be completed in 3-5 days, while complete out-of-chassis overhauls or major rebuilds may take 1-3 weeks. We provide detailed timeline estimates before beginning work and offer temporary power solutions if needed."
    },
    {
      question: "What kind of warranty do you provide on repairs and overhauls?",
      answer: "We stand behind our work with comprehensive warranties. Standard repairs include a 90-day warranty on parts and labor, while major overhauls typically include a 1-year/2,000-hour warranty (whichever comes first) on overhauled components. Extended warranty options are also available."
    },
    {
      question: "Can you provide temporary power during extensive repairs or overhauls?",
      answer: "Yes, we maintain a fleet of rental generators ranging from 15 kVA to 2000 kVA that can be deployed quickly to ensure continuous power supply for your critical operations while your equipment is being serviced."
    },
    {
      question: "Do you use OEM parts for repairs and overhauls?",
      answer: "Yes, we prioritize genuine OEM parts for all repairs to ensure optimal performance and reliability. In situations where OEM parts may have extended lead times, we offer high-quality aftermarket alternatives after discussing the options with you."
    }
  ],

  helpTitle: "Need Generator Repair or Overhaul Services?",
  helpSub: "Contact our expert technicians today for fast, reliable repair services that get your power systems back to peak performance.",
  helpBtnLabel: "Request Repair Service",
  helpBtnLink: "/contact",
  hotlineLabel: "Emergency Repair Hotline",
  hotlineLink: "tel:+919773851767",
  emergencyPhone: "+919773851767"
};

async function seedServices() {
  console.log("Seeding Annual Maintenance and Emergency Support with single introDesc...");

  // 0. Installation Services
  const installPage = await prisma.page.upsert({
    where: { slug: "installation" },
    create: {
      title: "Installation & Commissioning",
      slug: "installation",
      type: "static",
      visibility: "published",
      metaTitle: "Installation Services - Kumar Power",
      metaDescription: "Expert installation and commissioning services for power generators.",
      keywords: "generator installation, commissioning, diesel generator setup, power system commissioning"
    },
    update: {
      title: "Installation & Commissioning",
      metaTitle: "Installation Services - Kumar Power",
      metaDescription: "Expert installation and commissioning services for power generators."
    }
  });

  await prisma.section.deleteMany({
    where: { pageId: installPage.id }
  });

  await prisma.section.create({
    data: {
      pageId: installPage.id,
      type: "installation",
      content: installationData,
      order: 0
    }
  });

  await prisma.section.create({
    data: {
      pageId: installPage.id,
      type: "services",
      content: installationData,
      order: 1
    }
  });
  console.log("✅ Seeded Installation with website heroBg and content.");

  // 1. Annual Maintenance
  const amcPage = await prisma.page.upsert({
    where: { slug: "annual-maintenance" },
    create: {
      title: "Annual Maintenance Contracts",
      slug: "annual-maintenance",
      type: "static",
      visibility: "published",
      metaTitle: "Annual Maintenance Contracts - Kumar Power",
      metaDescription: "Our Annual Maintenance Contracts (AMC) provide scheduled preventive maintenance, prompt repairs, and emergency support to ensure your power generation equipment operates reliably year-round.",
      keywords: "AMC, annual maintenance contract, generator maintenance, kirloskar amc, preventive maintenance"
    },
    update: {
      title: "Annual Maintenance Contracts",
      metaTitle: "Annual Maintenance Contracts - Kumar Power",
      metaDescription: "Our Annual Maintenance Contracts (AMC) provide scheduled preventive maintenance, prompt repairs, and emergency support to ensure your power generation equipment operates reliably year-round.",
      canonicalUrl: "https://www.kumarpower.com/services/annual-maintenance",
      headingOptions: "h1"
    }
  });

  await prisma.section.deleteMany({
    where: { pageId: amcPage.id }
  });

  await prisma.section.create({
    data: {
      pageId: amcPage.id,
      type: "annual-maintenance",
      content: annualMaintenanceData,
      order: 0
    }
  });

  await prisma.section.create({
    data: {
      pageId: amcPage.id,
      type: "services",
      content: annualMaintenanceData,
      order: 1
    }
  });
  console.log("✅ Seeded Annual Maintenance with unified introDesc.");

  // 2. Emergency Support
  const emergencyPage = await prisma.page.upsert({
    where: { slug: "emergency-support" },
    create: {
      title: "24/7 Emergency Support",
      slug: "emergency-support",
      type: "static",
      visibility: "published",
      metaTitle: "Reliable 24/7 Emergency Support - Kumar Power",
      metaDescription: "Kumar Power's emergency response team is available 24 hours a day, 7 days a week, 365 days a year to ensure your operations can continue without disruption.",
      keywords: "emergency generator repair, 24/7 generator support, power failure response, emergency dg service",
      canonicalUrl: "https://www.kumarpower.com/services/emergency-support",
      headingOptions: "h1"
    },
    update: {
      title: "24/7 Emergency Support",
      metaTitle: "Reliable 24/7 Emergency Support - Kumar Power",
      metaDescription: "Kumar Power's emergency response team is available 24 hours a day, 7 days a week, 365 days a year to ensure your operations can continue without disruption.",
      canonicalUrl: "https://www.kumarpower.com/services/emergency-support",
      headingOptions: "h1"
    }
  });

  await prisma.section.deleteMany({
    where: { pageId: emergencyPage.id }
  });

  await prisma.section.create({
    data: {
      pageId: emergencyPage.id,
      type: "emergency-support",
      content: emergencySupportData,
      order: 0
    }
  });

  await prisma.section.create({
    data: {
      pageId: emergencyPage.id,
      type: "services",
      content: emergencySupportData,
      order: 1
    }
  });
  console.log("✅ Seeded Emergency Support with unified introDesc.");

  // 4. Repair & Overhaul
  const repairPage = await prisma.page.upsert({
    where: { slug: "repair-overhaul" },
    create: {
      title: "Repair & Engine Overhaul",
      slug: "repair-overhaul",
      type: "static",
      visibility: "published",
      metaTitle: "Repair & Overhaul Services - Kumar Power",
      metaDescription: "Professional restoration and renewal of power systems for optimal performance and reliability.",
      keywords: "generator repair, overhaul services, DG set repair, power system maintenance, Kumar Power"
    },
    update: {
      title: "Repair & Engine Overhaul",
      metaTitle: "Repair & Overhaul Services - Kumar Power",
      metaDescription: "Professional restoration and renewal of power systems for optimal performance and reliability."
    }
  });

  await prisma.section.deleteMany({
    where: { pageId: repairPage.id }
  });

  await prisma.section.create({
    data: {
      pageId: repairPage.id,
      type: "repair-overhaul",
      content: repairOverhaulData,
      order: 0
    }
  });

  await prisma.section.create({
    data: {
      pageId: repairPage.id,
      type: "services",
      content: repairOverhaulData,
      order: 1
    }
  });
  console.log("✅ Seeded Repair & Overhaul with unified introDesc.");

}

seedServices()
  .catch((e) => {
    console.error("Error seeding services:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
