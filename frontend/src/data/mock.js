// Mock data for Amata T. portfolio website
export const portfolioProjects = [
  {
    id: 1,
    title: "Ute Bison Ranch Summer Youth Program Photography",
    category: "Photography Projects",
    client: "Ute Tribal Enterprises - Ute Bison",
    project_type: "Educational Photography & Documentation",
    description: "Educational photography documentation of Uintah River High School students visiting the Ute Bison Ranch as part of the Summer Youth Program. Captured authentic moments of cultural education and youth engagement with tribal heritage and bison conservation efforts.",
    images: [
      "/b1.jpg",
      "/b2.jpg",
      "/b3.jpg",
      "/b4.jpg",
      "/b5.jpg"
    ],
    type: "image",
    featured: true,
    orientation: "horizontal",
    key_contributions: [
      "Led photo documentation strategy for educational tourism program",
      "Captured authentic student engagement moments during cultural activities",
      "Developed visual storytelling approach highlighting tribal heritage connection",
      "Created marketing-ready photography portfolio for program promotion",
      "Coordinated with educators and tribal representatives for respectful documentation"
    ],
    skills_utilized: [
      "Professional Photography",
      "Cultural Sensitivity",
      "Educational Documentation",
      "Visual Storytelling",
      "Adobe Photoshop",
      "Adobe Lightroom",
      "Project Coordination",
      "Marketing Content Creation"
    ],
    impact: {
      quantified_metrics: [
        "85% increase in program enrollment inquiries",
        "300% boost in social media engagement for program posts",
        "40+ high-quality marketing assets created",
        "100% positive feedback from participating students and educators"
      ],
      qualitative_outcomes: [
        "Strengthened connections between youth and tribal heritage",
        "Enhanced program visibility and educational tourism appeal",
        "Improved documentation standards for future educational programs",
        "Fostered respectful representation of tribal culture and traditions"
      ]
    },
    educationalImpact: {
      program: "Summer Youth Program",
      participants: "Uintah River High School Students",
      focus: "Cultural education and tribal heritage awareness",
      activities: [
        "Guided bison ranch tours showcasing traditional tribal connections",
        "Educational sessions on bison conservation and cultural significance", 
        "Hands-on learning experiences with tribal heritage practices",
        "Photography documentation for program marketing and outreach"
      ],
      communityImpact: "Strengthened connections between youth and tribal heritage while promoting educational tourism"
    }
  },
  {
    id: 2,
    title: "Beats by Dre x Kim Kardashian Limited Edition Campaign - Brand Strategy & Analytics",
    category: "Branding",
    client: "Beats by Dre",
    project_type: "Brand Strategy & Consumer Analytics Campaign",
    description: "Comprehensive branding strategy and consumer analytics project for Beats by Dre's limited edition earbuds and headphones collaboration with Kim Kardashian. As part of the Beats by Dre Branding Strategy and Business Analytics Externship, I analyzed market trends, consumer data, and created impactful marketing materials for Gen Z audience targeting and brand positioning optimization.",
    images: [
      "/beats.jpg",
      "/beats0.jpg", 
      "/beats2.jpg",
      "/beats3.jpg",
      "/beats4.jpg",
      "/beats5.jpg"
    ],
    type: "image",
    featured: true,
    orientation: "horizontal",
    program: "Branding Strategy & Data Analysis Externship (2023)",
    focus: "Consumer Analytics, Market Research & Brand Strategy",
    myRole: "Brand Strategy Analyst & Marketing Materials Designer",
    key_contributions: [
      "Conducted comprehensive consumer behavior analysis using SQL and Tableau, identifying key Gen Z engagement trends for Kim Kardashian collaboration launch",
      "Developed data-driven branding strategy for limited edition earbuds and headphones targeting socially-conscious younger consumers",
      "Created high-impact marketing materials including digital advertisements, social media campaign visuals, and product launch collateral",
      "Performed extensive market research and trend analysis on celebrity collaboration effectiveness and premium audio market positioning", 
      "Designed cohesive visual identity system for Kim Kardashian x Beats by Dre limited edition product line launch",
      "Analyzed competitor strategies in celebrity partnership campaigns to optimize brand differentiation and market penetration"
    ],
    skills_utilized: [
      "SQL Database Analysis",
      "Tableau Data Visualization", 
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Brand Strategy Development",
      "Consumer Behavior Analysis",
      "Market Research & Trends",
      "Digital Marketing Design",
      "Social Media Campaign Creation",
      "Celebrity Partnership Marketing",
      "Premium Audio Brand Positioning",
      "Gen Z Audience Targeting"
    ],
    impact: {
      quantified_metrics: [
        "30% increase in Gen Z engagement for celebrity collaboration campaigns through optimized branding strategies",
        "25% improvement in brand sentiment scores following research-driven recommendations implementation",
        "40+ high-quality marketing assets created for Kim Kardashian x Beats collaboration launch",
        "200% boost in social media engagement during limited edition product announcement phase",
        "15% increase in purchase intent among target demographic through strategic brand positioning"
      ],
      qualitative_outcomes: [
        "Successfully positioned Beats by Dre as premium lifestyle brand for younger, socially-conscious consumers",
        "Enhanced brand credibility through data-driven insights and celebrity partnership optimization",
        "Strengthened brand-consumer connection through targeted Gen Z marketing approach and authentic messaging",
        "Improved competitive positioning in premium audio market through strategic brand differentiation",
        "Established foundation for future celebrity collaboration campaigns with measurable success metrics"
      ]
    },
    // Dual-section project structure
    dualSections: {
      analyticsSection: {
        title: "Analytics & Research - Data Analysis & Presentations",
        description: "Consumer behavior analysis, strategic insights, and comprehensive presentations using SQL, Tableau, and advanced data visualization to optimize celebrity collaboration campaigns",
        images: [
          "/beats0.jpg", // Analytics dashboard image 1
          "/beats2.jpg", // Market research visualization 2  
          "/beats4.jpg", // Consumer data analysis 3
          "/beats6.jpg"  // Horizontal presentation image 4
        ],
        layout: "mixed", // Indicates mixed layouts (3 square + 1 horizontal)
        highlights: [
          "SQL database analysis for Gen Z consumer behavior patterns",
          "Tableau data visualizations revealing key market insights", 
          "Celebrity partnership effectiveness research and trend analysis",
          "Comprehensive presentations and strategic recommendations"
        ]
      },
      brandingSection: {
        title: "Graphic Design & Brand Materials",
        description: "Creative visual identity development and marketing materials design for the Kim Kardashian x Beats by Dre limited edition collaboration",
        images: [
          "/beats.jpg",  // Vertical brand identity design
          "/beats3.jpg"  // Horizontal marketing materials
        ],
        layout: "vertical_horizontal", // Indicates 1 vertical + 1 horizontal
        highlights: [
          "Cohesive visual identity system for limited edition product line",
          "High-impact digital advertisements and social media campaign visuals",
          "Product launch collateral and celebrity partnership marketing materials",
          "Brand differentiation through strategic design and Gen Z-targeted aesthetics"
        ]
      }
    }
  },
  {
    id: 3,
    title: "Disney+ Digital Campaign Launch",
    category: "Advertising",
    client: "Disney",
    project_type: "Multi-Platform Digital Advertising",
    description: "Multi-platform digital advertising campaign for Disney+ streaming service, including display ads, video commercials, and interactive banners.",
    images: [
      "https://images.unsplash.com/photo-1489399627699-e5c5f1e8f6c6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
    ],
    type: "image",
    featured: true,
    orientation: "horizontal",
    key_contributions: [
      "Designed comprehensive digital ad campaign across Google, Facebook, and YouTube platforms",
      "Created interactive banner advertisements with click-through optimization",
      "Developed video commercial concepts aligned with Disney+ brand guidelines",
      "Implemented A/B testing strategy for ad creative optimization",
      "Coordinated with media buying team for optimal campaign placement and timing"
    ],
    skills_utilized: [
      "Digital Advertising",
      "Google Ads",
      "Facebook Ads Manager",
      "YouTube Advertising",
      "A/B Testing",
      "Campaign Optimization",
      "Creative Strategy",
      "Adobe Creative Suite",
      "Performance Analytics"
    ],
    impact: {
      quantified_metrics: [
        "150% increase in Disney+ subscription sign-ups during campaign period",
        "45% improvement in click-through rates compared to previous campaigns",
        "2.8M+ impressions across all digital platforms",
        "25% reduction in cost-per-acquisition through optimization"
      ],
      qualitative_outcomes: [
        "Successfully launched Disney+ to new market segments",
        "Enhanced brand awareness in competitive streaming market",
        "Established Disney+ as premium entertainment platform",
        "Strengthened customer engagement through interactive ad experiences"
      ]
    }
  },
  {
    id: 4,
    title: "KahPeeh kah-Ahn Ute Coffee House & Soda - Video Advertisement Campaign",
    category: "Advertising",
    client: "Ute Tribal Enterprises - KahPeeh kah-Ahn Ute Coffee House & Soda",
    project_type: "Video Advertisement Production & Direction",
    description: "Professional video advertisement for KahPeeh kah-Ahn Ute Coffee House & Soda, showcasing authentic indigenous hospitality and premium coffee experience. I directed and coordinated this comprehensive advertising campaign from concept to completion, highlighting the unique cultural atmosphere and community connection of this locally-owned indigenous business serving the Uintah and Ouray reservation communities.",
    images: [
      "https://img.youtube.com/vi/placeholder/maxresdefault.jpg" // Video thumbnail placeholder
    ],
    type: "video", 
    featured: true,
    orientation: "horizontal",
    videoUrl: "https://customer-assets.emergentagent.com/job_smooth-site-setup/artifacts/a3tv7dfw_Ute%20Coffeehouse%20V4.mp4",
    key_contributions: [
      "Directed complete video advertisement production from initial concept through final editing",
      "Coordinated all aspects of video shoot including location setup, talent direction, and equipment management",
      "Developed creative vision showcasing authentic indigenous coffee house experience and cultural atmosphere",
      "Managed production timeline and budget to deliver high-quality advertising content within project constraints",
      "Created compelling narrative highlighting unique selling propositions of indigenous-owned local business",
      "Produced professional-grade video advertisement suitable for multiple marketing channels and platforms"
    ],
    skills_utilized: [
      "Video Direction & Production",
      "Creative Campaign Development", 
      "Indigenous Business Marketing",
      "Production Coordination",
      "Video Editing & Post-Production",
      "Advertising Strategy",
      "Cultural Sensitivity Marketing",
      "Local Business Promotion",
      "Brand Storytelling",
      "Project Management"
    ],
    impact: {
      quantified_metrics: [
        "Produced high-quality video advertisement showcasing authentic indigenous coffee house experience",
        "Successfully directed and coordinated complete advertising campaign from concept to delivery", 
        "Created compelling marketing asset suitable for multiple advertising platforms and channels",
        "Delivered professional video content highlighting unique cultural atmosphere and community connection",
        "Developed advertising material supporting overall brand positioning for KahPeeh kah-Ahn Coffee House"
      ],
      qualitative_outcomes: [
        "Enhanced brand storytelling through authentic visual representation of indigenous hospitality",
        "Strengthened marketing portfolio with professional video advertisement showcasing cultural sensitivity",
        "Elevated coffee house brand presence through high-quality advertising content creation",
        "Demonstrated comprehensive video production capabilities from direction through post-production",
        "Created sustainable advertising framework for ongoing indigenous business marketing initiatives"
      ]
    }
  },
  {
    id: 5,
    title: "Adobe Creative Suite Instagram Reels",
    category: "Social Media Content & Campaigns",
    client: "Adobe",
    description: "Engaging Instagram reels and TikTok content showcasing Creative Suite capabilities through dynamic vertical storytelling and user-generated content.",
    images: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=800&fit=crop"
    ],
    type: "video",
    featured: true,
    orientation: "vertical",
    videoUrl: "https://www.tiktok.com/@adobe/video/7334159049778351406"
  },
  {
    id: 6,
    title: "Adobe Analytics Challenge - Consumer Research & Strategy",
    category: "Illustrations & Educational Content",
    client: "Adobe x Hilton",
    description: "Comprehensive research presentation analyzing Hilton Hotels consumer behavior data using Adobe Analytics. Includes strategic recommendations, data visualizations, and actionable insights for customer experience optimization.",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop"
    ],
    type: "presentation",
    featured: true,
    orientation: "horizontal",
    researchSlides: [
      {
        title: "Consumer Behavior Analysis",
        description: "Deep dive into Hilton customer journey mapping and behavior patterns",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      },
      {
        title: "Data Visualization & Insights",
        description: "Strategic recommendations based on Adobe Analytics data analysis",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
      },
      {
        title: "Strategic Recommendations",
        description: "Actionable insights for customer experience optimization",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop"
      }
    ]
  },
  {
    id: 6,
    title: "Utah High & Elementary School Bison Grant Program - Educational Animation & Marketing Campaign",
    category: "Illustrations & Educational Content",
    client: "Ute Tribal Enterprises - Ute Bison",
    project_type: "Educational Animation & Promotional Marketing Campaign",
    description: "Comprehensive educational animation and marketing campaign created for Ute Bison's 2024 Utah School Bison Grant Program targeting both high schools and elementary schools. Developed from concept to completion using Canva and advanced editing tools, including self-filmed footage at the bison ranch. This promotional initiative successfully attracted 15 schools across Utah to participate in the grant program, enabling schools to receive funding and purchase bison meat while promoting traditional knowledge and modern learning integration for students of all ages.",
    images: [
      "https://img.youtube.com/vi/DYLLB8qiQ8k/maxresdefault.jpg"
    ],
    type: "video",
    featured: true,
    orientation: "horizontal",
    videoUrl: "https://youtu.be/DYLLB8qiQ8k?si=IOvfHjRqkPHxcnlu",
    key_contributions: [
      "Created complete educational animation from scratch using Canva and professional editing tools for K-12 audience engagement",
      "Personally filmed and edited real-life footage at the Ute Bison ranch for authentic storytelling across grade levels",
      "Developed comprehensive marketing strategy for Utah high school and elementary school outreach targeting bison grant recipients",
      "Designed age-appropriate promotional brochures and marketing materials for statewide school district distribution",
      "Coordinated multi-channel campaign reaching 15+ schools across Utah with measurable lead generation for both elementary and secondary education",
      "Integrated traditional tribal knowledge with modern educational approaches through animated storytelling suitable for all school levels"
    ],
    skills_utilized: [
      "Canva Animation Design",
      "Video Production & Editing", 
      "Documentary Filming",
      "K-12 Educational Content Development",
      "Age-Appropriate Graphic Design & Brochure Creation",
      "Statewide Marketing Campaign Management",
      "Lead Generation & Business Development",
      "Cultural Sensitivity & Traditional Knowledge Integration",
      "Grant Program Promotion",
      "Multi-Platform Content Distribution"
    ],
    impact: {
      quantified_metrics: [
        "Successfully attracted 15 different high schools and elementary schools across Utah to participate in bison grant program",
        "Generated qualified leads resulting in direct business partnerships and meat sales contracts with K-12 institutions",
        "Achieved statewide reach across Utah school districts serving students from kindergarten through 12th grade",
        "100% completion rate on animation project from concept to final delivery for multi-grade audience",
        "Created 10+ marketing materials including age-appropriate brochures, flyers, and promotional assets"
      ],
      qualitative_outcomes: [
        "Successfully bridged traditional tribal knowledge with modern educational approaches for students across all grade levels",
        "Enhanced Ute Bison brand recognition and credibility among Utah K-12 educational institutions",
        "Strengthened relationships between tribal enterprises and both elementary and secondary education systems",
        "Promoted cultural education and heritage awareness through innovative animation storytelling for diverse age groups",
        "Established foundation for ongoing partnerships between schools and tribal businesses across the K-12 spectrum"
      ]
    },
    educationalImpact: {
      targetAudience: "K-12 Students (Elementary through High School) & Educators Statewide",
      focus: "Traditional knowledge integration through modern educational marketing for all grade levels",
      topics: [
        "Traditional tribal knowledge and cultural heritage preservation accessible to young learners",
        "Modern educational pathways and bison grant program benefits for K-12 institutions",
        "Community values and sustainable food sourcing education for elementary and high school students",
        "Bridging traditional wisdom with contemporary learning through innovative animation for diverse age groups"
      ],
      format: "Professional animated educational video with real-life ranch footage and comprehensive marketing materials designed for K-12 engagement"
    },
    additionalImages: {
      title: "Supporting Marketing Materials",
      description: "Brochures and promotional materials created for the K-12 campaign",
      images: [
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
      ]
    }
  },
  {
    id: 7,
    title: "KahPeeh kah-Ahn Ute Coffee House & Soda - Top 6 TikTok High-Engagement Campaign",
    category: "Social Media Content & Campaigns",
    client: "Ute Tribal Enterprises - KahPeeh kah-Ahn Ute Coffee House & Soda",
    project_type: "Indigenous Business TikTok Marketing Campaign",
    description: "Strategic TikTok marketing campaign for KahPeeh kah-Ahn Ute Coffee House & Soda, an indigenous small local coffee house proudly serving the Uintah and Ouray reservation community. This locally-owned Ute Tribal Enterprises business operates from their cozy location and travels to community events with their mobile trailer setup. I coordinated multiple community events and created 6 high-engagement TikTok videos to promote their authentic indigenous hospitality, resulting in 85% increased social media engagement, 40% boost in foot traffic, and 120% brand awareness growth throughout the reservation communities. Through strategic content creation and cultural storytelling, we've established KahPeeh kah-Ahn as the heart of the community and a thriving indigenous business success story.",
    images: [], // No main video - only the 6 TikTok videos below
    type: "video",
    featured: true,
    orientation: "vertical",
    key_contributions: [
      "Conceptualized and created 6 high-engagement TikTok videos promoting the indigenous coffee house and community events",
      "Coordinated community events where the coffee house trailer provided services, creating authentic content opportunities",
      "Developed creative strategy showcasing the unique indigenous coffee house experience and community connection",
      "Wrote compelling copy and captions celebrating indigenous business and cultural pride",
      "Edited and produced video content highlighting both the coffee house location and mobile trailer events",
      "Analyzed performance metrics and adapted content strategy to maximize community engagement and business visibility"
    ],
    skills_utilized: [
      "Indigenous Business Marketing",
      "Community Event Coordination",
      "TikTok Content Creation",
      "Cultural Sensitivity Marketing",
      "Video Editing & Production",
      "Local Business Promotion",
      "Event Marketing",
      "Social Media Strategy",
      "Mobile Business Promotion",
      "Reservation Community Outreach"
    ],
    impact: {
      quantified_metrics: [
        "Generated 85% increase in social media engagement for the indigenous coffee house",
        "Drove 40% boost in foot traffic to both physical location and mobile trailer events",
        "Achieved 120% growth in brand awareness throughout Uintah and Ouray reservation communities",
        "Successfully promoted multiple community events coordinated through strategic TikTok marketing",
        "Built substantial local following and community recognition for KahPeeh kah-Ahn",
        "Established coffee house as go-to community gathering place through compelling social media presence"
      ],
      qualitative_outcomes: [
        "Successfully positioned indigenous coffee house as cultural hub and community gathering place",
        "Enhanced pride in locally-owned indigenous business through authentic storytelling and community engagement",
        "Strengthened connections between coffee house and reservation community through relatable, celebratory content",
        "Elevated visibility of Ute Tribal Enterprises and indigenous entrepreneurship in competitive market",
        "Created sustainable framework for ongoing community-focused marketing and event promotion",
        "Fostered authentic brand personality celebrating indigenous culture while serving diverse local community"
      ]
    },
    // Combined TikTok videos section with integrated performance metrics
    combinedTikTokSection: {
      sectionTitle: "Indigenous Coffee House TikTok Success",
      videosTitle: "Top 6 Community-Engaging TikTok Videos",
      videosSubtitle: "Each video celebrates indigenous entrepreneurship while driving measurable business results",
      
      // Easy-to-customize video array - you can replace thumbnails and URLs here
      videos: [
        {
          id: 1,
          title: "Coffee House Community Moment #1",
          // REPLACE THIS URL with your actual TikTok video URL
          url: "https://www.tiktok.com/@kahpeehkahahn/video/7471801091441659178",
          // REPLACE THIS THUMBNAIL with your actual screenshot
          thumbnail: "PLACEHOLDER_THUMBNAIL_1", // You can replace this with your screenshot
          description: "Top engagement organic content showcasing coffee house atmosphere",
          type: "organic_content"
        },
        {
          id: 2,
          title: "Coffee House Community Moment #2", 
          // REPLACE THIS URL with your actual TikTok video URL
          url: "https://www.tiktok.com/@kahpeehkahahn/video/7409139284403408159",
          // REPLACE THIS THUMBNAIL with your actual screenshot
          thumbnail: "PLACEHOLDER_THUMBNAIL_2", // You can replace this with your screenshot
          description: "Strategic advertising content for event promotion",
          type: "strategic_ad"
        },
        {
          id: 3,
          title: "Coffee House Community Moment #3",
          // REPLACE THIS URL with your actual TikTok video URL
          url: "https://www.tiktok.com/@kahpeehkahahn/video/7390967071472946462", 
          // REPLACE THIS THUMBNAIL with your actual screenshot
          thumbnail: "PLACEHOLDER_THUMBNAIL_3", // You can replace this with your screenshot
          description: "Community engagement organic content featuring local customers",
          type: "organic_content"
        },
        {
          id: 4,
          title: "Coffee House Community Moment #4",
          // REPLACE THIS URL with your actual TikTok video URL
          url: "https://www.tiktok.com/@kahpeehkahahn/video/7406134372803382559",
          // REPLACE THIS THUMBNAIL with your actual screenshot
          thumbnail: "PLACEHOLDER_THUMBNAIL_4", // You can replace this with your screenshot
          description: "Mobile trailer event promotion organic content",
          type: "organic_content"
        },
        {
          id: 5,
          title: "Coffee House Community Moment #5",
          // REPLACE THIS URL with your actual TikTok video URL
          url: "https://www.tiktok.com/@kahpeehkahahn/video/7396130080369528094",
          // REPLACE THIS THUMBNAIL with your actual screenshot
          thumbnail: "PLACEHOLDER_THUMBNAIL_5", // You can replace this with your screenshot
          description: "Indigenous business celebration organic content", 
          type: "organic_content"
        },
        {
          id: 6,
          title: "Coffee House Community Moment #6",
          // REPLACE THIS URL with your actual TikTok video URL
          url: "https://www.tiktok.com/@kahpeehkahahn/video/7452207220508347691",
          // REPLACE THIS THUMBNAIL with your actual screenshot
          thumbnail: "PLACEHOLDER_THUMBNAIL_6", // You can replace this with your screenshot  
          description: "Community event coordination organic content",
          type: "organic_content"
        }
      ]
    }
  },
  // Additional entries omitted for brevity
];

export const brands = [
  "Beats by Dre", "Disney", "Adobe"
];

export const categories = [
  "All",
  "Branding",
  "Analytics & Research", 
  "Graphic Design & Marketing Materials",
  "Advertising", 
  "Social Media Content & Campaigns",
  "Photography Projects",
  "Creative Concepts",
  "Illustrations & Educational Content"
];

export const tools = [
  "Google Analytics", "Adobe Analytics", "Google Ads", "Looker Studio", 
  "HubSpot", "Semrush", "WordPress", "Meta Ads Manager", "MailChimp", 
  "SQL", "Tableau", "Adobe Photoshop", "Adobe Illustrator", "Canva", 
  "CapCut", "Figma", "Hotjar", "Trello", "Jira", "Miro", "Notion"
];

export const workHistory = [
  {
    position: "Marketing Project Manager | Marketing Coordinator",
    company: "Ute Tribal Enterprises",
    location: "Fort Duchesne, UT",
    period: "Feb 2024 – July 2025",
    achievements: [
      "Managed marketing operations across 7 diverse business divisions, driving 300% growth in brand visibility and customer engagement",
      "Led 14+ social media accounts with paid Meta advertising, generating measurable ROI and conversion increases",
      "Developed and managed WordPress website for Ute Bison brand (bison-made products), increasing online sales by 85%",
      "Coordinated and managed large-scale events, increasing foot traffic by 85% and strengthening community partnerships",
      "Directed comprehensive branding for Bison Made products, resulting in 40% increase in product recognition and sales",
      "Analyzed marketing data to drive strategic decisions across marketing, design, and operations, improving efficiency by 25%",
      "Collaborated with C-suite executives to align marketing strategies with business goals, securing $2M+ in new revenue opportunities"
    ]
  },
  {
    position: "Founder & Brand Manager",
    company: "Friendly Futures (Brand: Aigata)",
    location: "Remote",
    period: "May 2023 – Mar 2025",
    achievements: [
      "Built and scaled D2C e-commerce brand (Aigata) from $0 to 6-figure revenue across Amazon, Etsy, eBay, and TikTok Shop",
      "Managed complete brand lifecycle: strategy, operations, marketing, and product development with 95% customer satisfaction",
      "Produced original content and photography that increased conversion rates by 150% and reduced marketing costs by 30%",
      "Developed targeted marketing campaigns generating 200% ROI through social media, influencer partnerships, and seasonal promotions",
      "Coordinated events for direct customer engagement, resulting in 300% increase in local brand awareness and repeat customers"
    ]
  },
  // Other work entries omitted for brevity
];

export const education = {
  degree: "Bachelor's of Science in Management Information Systems",
  minor: "Minor in Marketing",
  university: "Utah State University",
  honor: "Cum Laude",
  period: "2019 - 2023"
};

export const contactInfo = {
  name: "Amata T.",
  email: "amata.portfolio@gmail.com",
  linkedin: "https://linkedin.com/in/amata-marketing",
  phone: "+1 (555) 123-4567",
  location: "Utah, USA"
};
