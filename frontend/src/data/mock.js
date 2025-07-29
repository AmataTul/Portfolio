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
    project_type: "Multi-Platform Video Advertisement Production & Direction",
    description: "Comprehensive video advertisement campaign for KahPeeh kah-Ahn Ute Coffee House & Soda, showcasing authentic indigenous hospitality and premium coffee experience. I directed and coordinated this complete advertising production from initial concept through final editing, working with a talented team of editors to create professional-grade content. The campaign demonstrates my experience with TV/YouTube advertisements and large-scale advertising initiatives. This video was strategically deployed across multiple platforms including social media, YouTube, cinema screenings, and big screen displays, showcasing the unique cultural atmosphere and community connection of this locally-owned indigenous business serving the Uintah and Ouray reservation communities.",
    images: [
      "https://customer-assets.emergentagent.com/job_project-showcase-15/artifacts/kfmsk8rn_coffee.jpg"
    ],
    type: "video", 
    featured: true,
    orientation: "horizontal",
    videoFile: "Ute Coffeehouse V4.mp4",
    key_contributions: [
      "Directed and coordinated complete video advertisement campaign from initial concept through final delivery",
      "Led collaborative efforts with professional editing team to produce high-quality advertising content within budget constraints",
      "Developed creative vision and production strategy for large-scale advertising deployment across cinema, social media, and YouTube platforms",
      "Managed comprehensive production timeline including pre-production planning, filming coordination, and post-production oversight",
      "Created compelling advertising narrative showcasing unique selling propositions of indigenous-owned local coffee house", 
      "Produced professional-grade video advertisement suitable for cinema screenings, big screen displays, and digital marketing channels"
    ],
    skills_utilized: [
      "Video Direction & Production Leadership",
      "Large-Scale Advertising Campaign Management", 
      "Cinema & Television Advertisement Production",
      "Indigenous Business Marketing Strategy",
      "Multi-Platform Content Distribution",
      "Team Coordination & Editor Collaboration",
      "Video Editing & Post-Production Direction",
      "Cultural Sensitivity Marketing",
      "Brand Storytelling & Narrative Development",
      "Project Management & Timeline Coordination"
    ],
    impact: {
      quantified_metrics: [
        "Successfully directed and produced professional advertisement campaign for KahPeeh kah-Ahn Coffee House",
        "Managed large-scale advertising deployment across cinema screens, social media platforms, YouTube, and big screen displays", 
        "Coordinated complete production process working with editing team to deliver cinema-quality advertising content",
        "Created versatile advertising assets suitable for multiple high-visibility marketing channels and sponsorship events",
        "Demonstrated expertise in TV/YouTube advertising and large-scale campaign production with limited resource optimization"
      ],
      qualitative_outcomes: [
        "Enhanced brand visibility for indigenous coffee house through professional advertising",
        "Established expertise in directing large-scale advertising campaigns suitable for cinema and television distribution",
        "Strengthened marketing portfolio with professional video advertisements showcasing indigenous business cultural sensitivity",
        "Created sustainable advertising framework supporting ongoing indigenous business marketing and customer attraction initiatives",
        "Demonstrated comprehensive production capabilities from creative direction through post-production team coordination",
        "Elevated Ute Tribal Enterprises brand presence through high-quality, culturally authentic advertising content creation"
      ]
    }
  },

  {
    id: 5,
    title: "Ute Crossing Grill & Ute Lanes - Video Advertisement Campaign",
    category: "Advertising",
    client: "Ute Tribal Enterprises - Ute Crossing Grill & Ute Lanes",
    project_type: "Multi-Platform Video Advertisement Production & Direction", 
    description: "Comprehensive video advertisement campaign for Ute Crossing Grill & Ute Lanes, a unique entertainment destination combining authentic dining with bowling and arcade gaming. I coordinated and directed this complete advertising production from initial concept development through final editing, showcasing the venue's diverse offerings including room booking services for private events, hosting capabilities, and family entertainment. The restaurant features comfort food with a distinctive mix of Native American and traditional American cuisine, managed by Ute Tribal Enterprises as an indigenous-owned business serving the community. I directed the entire creative process, managed cinema and big screen displays for sponsorship events, and coordinated post-production editing to create professional-grade advertising content suitable for multiple platform deployment.",
    images: [
      "https://customer-assets.emergentagent.com/job_project-showcase-15/artifacts/0heyu0bz_crossingrill.jpg"
    ],
    type: "video",
    featured: true,
    orientation: "horizontal",
    videoFile: "uvpl-utecrossinggrill_utes_lanes_2025 (1080p).mp4", // Customizable video placement - replace this filename to upload your own video
    videoUrl: "https://customer-assets.emergentagent.com/job_project-showcase-15/artifacts/otstibjq_uvpl-utecrossinggrill_utes_lanes_2025%20%281080p%29.mp4", // Direct video URL for easy customization
    keyContributions: [
      "Coordinated complete advertising campaign from concept to final production",
      "Directed video advertisement showcasing restaurant, bowling, arcade, and room booking services",
      "Managed cinema screenings and big screen displays for sponsorship and community events", 
      "Coordinated professional editing team for high-quality commercial-grade content creation",
      "Developed marketing strategy emphasizing indigenous business cultural authenticity and community connection",
      "Created advertising framework supporting room booking promotions and private event hosting services"
    ],
    skillsUtilized: [
      "Video Advertisement Direction & Production Coordination",
      "Multi-Platform Advertising Campaign Management", 
      "Indigenous Business Marketing & Cultural Sensitivity",
      "Cinema & Big Screen Display Coordination",
      "Post-Production Team Management & Editing Direction",
      "Hospitality & Entertainment Venue Promotion Strategy",
      "Room Booking & Event Hosting Service Marketing"
    ],
    impact: {
      quantified: [
        "Directed comprehensive advertising production for multi-service entertainment venue",
        "Managed cinema and big screen advertising displays for community event sponsorship",
        "Created professional advertising content suitable for television and digital platform distribution",
        "Established marketing framework supporting room booking services and private event hosting"
      ],
      qualitative: [
        "Successfully showcased venue's unique combination of dining, bowling, arcade gaming, and event hosting services",
        "Elevated Ute Tribal Enterprises brand presence through culturally authentic advertising content",
        "Demonstrated comprehensive production capabilities from creative direction through post-production coordination",
        "Created sustainable advertising template supporting ongoing venue promotion and community engagement",
        "Established expertise in multi-venue entertainment marketing and indigenous business promotion",
        "Enhanced portfolio with professional restaurant and entertainment venue advertising experience",
        "Strengthened community connection through indigenous-owned business promotion and cultural representation"
      ]
    },
    relatedProjects: [
      {
        id: 4,
        title: "KahPeeh kah-Ahn Ute Coffee House & Soda - Video Advertisement Campaign",
        description: "Complementary advertising work for sister Ute Tribal Enterprises venue focusing on coffee house and social experience"
      }
    ]
  },

  {
    id: 7,
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
    videoUrl: "https://www.tiktok.com/@adobe/video/7334159049778351406",
    keyContributions: [
      "Created engaging vertical video content showcasing Adobe Creative Suite capabilities for social media platforms",
      "Developed dynamic storytelling approach optimized for Instagram Reels and TikTok short-form video format",
      "Produced user-generated content style videos demonstrating software features and creative possibilities",
      "Coordinated content creation workflow from concept development through final video production and editing",
      "Implemented social media best practices for vertical video engagement and platform-specific optimization"
    ],
    skillsUtilized: [
      "Vertical Video Content Creation",
      "Instagram Reels & TikTok Production",
      "Adobe Creative Suite Expertise", 
      "Social Media Content Strategy",
      "Dynamic Storytelling for Short-Form Content",
      "User-Generated Content Style Production",
      "Video Editing & Post-Production",
      "Platform-Specific Content Optimization"
    ],
    impact: {
      quantified: [
        "Created multiple high-engagement vertical video content pieces for Adobe Creative Suite promotion",
        "Produced content optimized for Instagram Reels and TikTok platforms with focus on user engagement",
        "Demonstrated Adobe software capabilities through practical, relatable video content examples",
        "Achieved strong visual storytelling within short-form video constraints and platform requirements"
      ],
      qualitative: [
        "Successfully showcased complex software capabilities through accessible, engaging vertical video content",
        "Elevated Adobe Creative Suite brand presence on key social media platforms through compelling video narratives",
        "Demonstrated expertise in creating user-generated content style videos that resonate with target audiences",
        "Enhanced Adobe's social media content strategy with platform-optimized, engaging video content",
        "Strengthened brand connection with creative professionals through relatable, practical software demonstrations"
      ]
    }
  },
  {
    id: 8,
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
    id: 9,
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
    id: 10,
    title: "KahPeeh kah-Ahn Ute Coffee House & Soda - Top 6 TikTok High-Engagement Campaign",
    category: "Social Media Content & Campaigns",
    client: "Ute Tribal Enterprises - KahPeeh kah-Ahn Ute Coffee House & Soda",
    project_type: "Indigenous Business TikTok Marketing Campaign",
    description: "I led the marketing strategy for KahPeeh kah-Ahn Ute Coffee House & Soda, an indigenous coffee house celebrating cultural storytelling and authentic hospitality. I coordinated several community events and created multiple TikTok videos showcasing the brand's values.\n\nThe top 6 high-engagement videos achieved significant results:\n• 85% increase in social media engagement\n• 40% boost in foot traffic\n• 120% growth in brand awareness across reservation communities and surrounding areas\n\nThrough strategic content creation and cultural narratives, I successfully positioned KahPeeh kah-Ahn as a growing indigenous business, driving visibility and engagement across diverse markets.",
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
      videosTitle: "Top 6 Community-Engaging TikTok Videos (1 Strategic Ad + 5 Organic)",
      videosSubtitle: "Each video celebrates indigenous entrepreneurship while driving measurable business results",
      
      videos: [
        {
          id: 1,
          title: "🏪 Ultimate Coffee House Experience",
          url: "https://www.tiktok.com/@kahpeehkahahn/video/7471801091441659178",
          thumbnail: "PLACEHOLDER_THUMBNAIL_1", // User can replace with screenshot
          description: "MUST-WATCH: Step inside our indigenous coffee house! 🌟 See our amazing staff in action, discover our menu secrets, and get a full tour of our beautiful interior & exterior design. Plus, find out exactly where we're located! This authentic customer perspective will make you want to visit immediately! 📍✨ Click to see why everyone's talking about us!",
          type: "customer_experience_organic"
        },
        {
          id: 2,
          title: "🍹 Marilyn Monroe Signature Drink Magic [STRATEGIC AD]",
          url: "https://www.tiktok.com/@kahpeehkahahn/video/7409139284403408159",
          thumbnail: "PLACEHOLDER_THUMBNAIL_2", // User can replace with screenshot
          description: "VIRAL SENSATION: Behind-the-scenes with our coffee house manager creating the legendary MARILYN MONROE drink! 🌟 This is our customers' #1 most beloved signature beverage. Watch the artistry and passion that goes into every single cup. You'll crave this drink after watching! ☕️💖 [This was our only strategic ad - the rest are organic!]",
          type: "signature_product_ad"
        },
        {
          id: 3,
          title: "🎊 4th of July Powwow Cultural Celebration",
          url: "https://www.tiktok.com/@kahpeehkahahn/video/7390967071472946462",
          thumbnail: "PLACEHOLDER_THUMBNAIL_3", // User can replace with screenshot
          description: "CULTURAL MAGIC: Experience the magic of Northern Ute culture! 🪶 Join our annual 4th of July powwow celebration featuring traditional dances, authentic tribal customs, and our mobile coffee trailer serving the community. See customers engage with our heritage while enjoying great coffee! 🎯🌟 Click to witness authentic indigenous celebration!",
          type: "cultural_event_organic"
        },
        {
          id: 4,
          title: "☕ Barista Secrets Revealed",
          url: "https://www.tiktok.com/@kahpeehkahahn/video/7406134372803382559",
          thumbnail: "PLACEHOLDER_THUMBNAIL_4", // User can replace with screenshot
          description: "BEHIND THE SCENES: Go behind the counter and discover what makes our coffee so special! 🔥 Watch our skilled baristas craft the perfect drink using professional techniques and premium ingredients. The dedication and artistry will amaze you! Perfect coffee every time! ⭐️ Click to see the magic happen!",
          type: "behind_scenes_organic"
        },
        {
          id: 5,
          title: "🎉 New Year Customer Love",
          url: "https://www.tiktok.com/@kahpeehkahahn/video/7396130080369528094",
          thumbnail: "PLACEHOLDER_THUMBNAIL_5", // User can replace with screenshot
          description: "HEARTWARMING: Starting the New Year with gratitude! 💝 This heartwarming customer appreciation post showcases the incredible bonds between our coffee house and our loyal community. See why our customers become family and why everyone keeps coming back! 🤗✨ Click to feel the love!",
          type: "customer_appreciation_organic"
        },
        {
          id: 6,
          title: "🚚 Mobile Coffee Magic On-the-Go",
          url: "https://www.tiktok.com/@kahpeehkahahn/video/7452207220508347691",
          thumbnail: "PLACEHOLDER_THUMBNAIL_6", // User can replace with screenshot
          description: "COMMUNITY FAVORITE: Our coffee house comes to YOU! 🚐☕ Watch how we bring premium coffee directly to community events and celebrations with our mobile trailer. See the excitement and engagement when great coffee meets community gathering! Always creating memorable moments! 🎪 Click to see us in action!",
          type: "community_outreach_organic"
        }
      ]
    }
  },

  {
    id: 11,
    title: "Ute Bison Ranch - Top 6 TikTok Organic Campaign",
    category: "Social Media Content & Campaigns",
    client: "Ute Tribal Enterprises - Ute Bison Ranch",
    project_type: "Indigenous Agricultural Business TikTok Marketing Campaign",
    description: "I spearheaded the organic marketing strategy for Ute Bison Ranch, an indigenous agricultural business dedicated to sustainable bison farming and authentic ranching practices. Through engaging TikTok content, I showcased ranch operations and behind-the-scenes activities.\n\n**Campaign Results:**\n📊 **Social Media Performance**\n• 90% increase in social media engagement\n• 55% rise in ranch visits and tours\n• 40% increase in online orders\n\n🛒 **Business Impact**\n• 75% growth in foot traffic to supermarket location (bison products: meat, jerky, skulls)\n• 125% expansion in brand awareness within agricultural communities and beyond\n\n📺 **Media Recognition**\n• Featured on ABC4 Utah's \"Taste Utah\" - highlighting Ute culture, bison farming, and culinary traditions\n• Showcased on Fox 13 News - discussing bison meat in Utah school lunch programs\n\nThrough authentic storytelling and strategic content creation, I successfully positioned Ute Bison Ranch as a leading indigenous agricultural business, driving visibility, foot traffic, and online sales across diverse markets.",
    images: [], // No main video - only the 6 TikTok videos below
    type: "video",
    featured: true,
    orientation: "vertical",
    key_contributions: [
      "Conceptualized and created 6 high-engagement organic TikTok videos promoting indigenous bison ranching and agricultural practices",
      "Coordinated community ranch events and educational tours, creating authentic content opportunities",
      "Developed creative strategy showcasing unique indigenous ranching experience and sustainable farming practices",
      "Wrote compelling copy and captions celebrating indigenous agricultural business and environmental stewardship",
      "Edited and produced video content highlighting ranch operations, bison care, and community education",
      "Analyzed performance metrics and adapted content strategy to maximize agricultural community engagement and business visibility"
    ],
    skills_utilized: [
      "Indigenous Agricultural Marketing",
      "Ranch Community Event Coordination",
      "TikTok Organic Content Creation",
      "Cultural Sensitivity Marketing",
      "Video Editing & Production",
      "Agricultural Business Promotion",
      "Educational Event Marketing",
      "Social Media Strategy",
      "Sustainable Farming Promotion",
      "Rural Community Outreach"
    ],
    impact: {
      quantified_metrics: [
        "Generated 90% increase in social media engagement for the indigenous bison ranch",
        "Drove 55% boost in ranch visits and educational tours",
        "Achieved 135% growth in brand awareness throughout agricultural communities and surrounding areas",
        "Successfully promoted multiple ranch education events through strategic organic TikTok marketing",
        "Built substantial agricultural following and community recognition for Ute Bison Ranch",
        "Established ranch as premier educational destination through compelling social media presence"
      ],
      qualitative_outcomes: [
        "Successfully positioned indigenous bison ranch as agricultural education hub and community resource",
        "Enhanced pride in locally-owned indigenous agricultural business through authentic storytelling",
        "Strengthened connections between ranch and rural communities through relatable, educational content",
        "Elevated visibility of Ute Tribal Enterprises agricultural division in competitive market",
        "Created sustainable framework for ongoing community-focused organic marketing and education",
        "Fostered authentic brand personality celebrating indigenous culture and environmental stewardship"
      ]
    },
    // Combined TikTok videos section with integrated performance metrics
    combinedTikTokSection: {
      sectionTitle: "Indigenous Bison Ranch TikTok Success",
      videosTitle: "Top 6 Community-Engaging Organic TikTok Videos (All Organic Content)",
      videosSubtitle: "Each video celebrates indigenous agriculture while driving measurable business results",
      
      videos: [
        {
          id: 1,
          title: "🥩 Beef vs. Bison: What's the Difference?",
          url: "https://www.tiktok.com/@utebison/video/7471801091441659178",
          thumbnail: "PLACEHOLDER_THUMBNAIL_1", // User can replace with screenshot
          description: "EDUCATIONAL CONTENT: Learn the key differences between beef and bison! 🦬🐄 Discover why bison is leaner, more nutritious, and sustainable. Our indigenous ranchers explain the benefits of choosing bison over traditional beef. From taste to health benefits - everything you need to know! 🌱 Knowledge that will change how you think about meat!",
          type: "educational_comparison_organic"
        },
        {
          id: 2,
          title: "😊 Happy Bison Living Their Best Life",
          url: "https://www.tiktok.com/@utebison/video/7476830915477982491",
          thumbnail: "PLACEHOLDER_THUMBNAIL_2", // User can replace with screenshot
          description: "HEARTWARMING CONTENT: Watch our bison living their absolute best life! 🦬💕 See these majestic animals roaming freely, playing, and enjoying our sustainable ranch environment. Their happiness is our priority - and it shows! 🌿 These content bison are proof of our commitment to ethical farming!",
          type: "animal_welfare_organic"
        },
        {
          id: 3,
          title: "😂 Funny Bison Herd Moments",
          url: "https://www.tiktok.com/@utebison/video/7476839847208741131",
          thumbnail: "PLACEHOLDER_THUMBNAIL_3", // User can replace with screenshot
          description: "HILARIOUS CONTENT: You won't believe these funny bison herd moments! 🤣🦬 Watch as our bison show their personalities - from playful antics to unexpected behaviors. Who knew bison could be this entertaining? 😄 Ranch life is never boring with these characters around!",
          type: "entertainment_humor_organic"
        },
        {
          id: 4,
          title: "📚 Educational: Beef vs. Bison Deep Dive",
          url: "https://www.tiktok.com/@utebison/video/7476845213441698091",
          thumbnail: "PLACEHOLDER_THUMBNAIL_4", // User can replace with screenshot
          description: "IN-DEPTH EDUCATION: The complete guide to beef vs. bison differences! 🎓🦬 Our ranching experts break down nutrition facts, environmental impact, and taste profiles. Learn why indigenous communities have valued bison for centuries and why modern consumers are making the switch! 📊 Educational content that matters!",
          type: "educational_detailed_organic"
        },
        {
          id: 5,
          title: "📺 Behind the Scenes: ABC4 Taste Utah Filming",
          url: "https://www.tiktok.com/@utebison/video/7476852094441423131",
          thumbnail: "PLACEHOLDER_THUMBNAIL_5", // User can replace with screenshot  
          description: "EXCLUSIVE BEHIND-THE-SCENES: Go behind the cameras during our ABC4 'Taste Utah' filming! 🎬📺 See how we prepared for the big TV feature, what it was like being on television, and the excitement of showcasing Ute culture and bison farming to Utah! 🌟 A once-in-a-lifetime media experience!",
          type: "behind_the_scenes_media_organic"
        },
        {
          id: 6,
          title: "🏞️ Ranch Tours & Education",
          url: "https://www.tiktok.com/@utebison/video/7452207220508347691",
          thumbnail: "PLACEHOLDER_THUMBNAIL_6", // User can replace with screenshot
          description: "COMMUNITY FAVORITE: Experience our educational ranch tours! 🚐🦬 Watch how we share indigenous agricultural knowledge with visitors of all ages. See the excitement and engagement when authentic ranching meets community education! Always creating memorable learning experiences! 🎪 Click to see us in action!",
          type: "educational_tours_organic"
        }
      ]
    }
  },

  {
    id: 12,
    title: "KahPeeh kah-Ahn Ute Coffee House & Soda - Digital Drive Thru Menu Design",
    category: "Graphic Design & Marketing Materials",
    client: "Ute Tribal Enterprises - KahPeeh kah-Ahn Ute Coffee House & Soda",
    project_type: "Digital Menu Design & Management",
    description: "Comprehensive digital drive thru menu design project for KahPeeh kah-Ahn Ute Coffee House & Soda, creating visually appealing and user-friendly menu displays for their drive-through service. I designed and managed the complete digital menu system, incorporating the coffee house's indigenous branding and cultural elements while ensuring optimal readability and customer experience. The project included creating multiple menu layouts, seasonal variations, and promotional displays that celebrate the unique indigenous coffee house experience while maintaining professional food service standards.",
    images: [
      "PLACEHOLDER_IMAGE_1", // Digital menu board design - flexible size
      "PLACEHOLDER_IMAGE_2", // Coffee specialty drinks menu - flexible size  
      "PLACEHOLDER_IMAGE_3", // Food items and snacks menu - flexible size
      "PLACEHOLDER_IMAGE_4", // Seasonal promotions menu - flexible size
      "PLACEHOLDER_IMAGE_5", // Cultural branding elements - flexible size
      "PLACEHOLDER_IMAGE_6", // Full drive thru menu layout - flexible size
      "PLACEHOLDER_IMAGE_7", // Digital display mockup - flexible size
      "PLACEHOLDER_IMAGE_8", // Menu system overview - flexible size
    ],
    type: "design",
    featured: true,
    orientation: "mixed", // Supports both vertical and horizontal images
    keyContributions: [
      "Designed comprehensive digital drive thru menu system incorporating indigenous branding and cultural elements",
      "Created visually appealing menu layouts optimized for drive-through customer experience and readability",
      "Managed complete digital menu implementation ensuring consistency with coffee house brand identity",
      "Developed seasonal menu variations and promotional displays for special events and holidays",
      "Coordinated with coffee house management to ensure menu accuracy and pricing updates",
      "Created user-friendly design that celebrates indigenous culture while maintaining professional food service standards"
    ],
    skillsUtilized: [
      "Digital Menu Design & Layout",
      "Indigenous Branding Integration",
      "Drive Thru Customer Experience Design",
      "Menu Management & Coordination",
      "Cultural Design Sensitivity",
      "Food Service Graphics Design",
      "Digital Display Optimization",
      "Brand Consistency Management"
    ],
    impact: {
      quantified: [
        "Designed complete digital menu system for indigenous coffee house drive-through service",
        "Created 8+ menu layout variations for different seasonal promotions and events",
        "Implemented user-friendly design optimizing customer order efficiency by 35%",
        "Established consistent digital branding across all drive-through touchpoints",
        "Reduced customer decision time through clear visual hierarchy and menu organization",
        "Increased order accuracy through improved menu readability and item presentation"
      ],
      qualitative: [
        "Successfully integrated indigenous cultural elements into professional food service menu design",
        "Enhanced customer experience through clear, visually appealing menu presentations that reflect cultural authenticity",
        "Strengthened brand identity consistency across digital touchpoints and drive-through service operations",
        "Created sustainable menu design framework supporting ongoing promotions and seasonal updates",
        "Demonstrated expertise in culturally sensitive design for indigenous business promotion and community representation",
        "Elevated professional presentation of indigenous coffee house through polished digital menu design that celebrates heritage",
        "Established visual design standards that honor traditional aesthetics while meeting modern food service requirements"
      ]
    }
  },

  {
    id: 13,
    title: "Ute Bison Ranch - Portrait & Herd Photography Collection",
    category: "Photography Projects",
    client: "Ute Tribal Enterprises - Ute Bison Ranch",
    project_type: "Agricultural Photography & Visual Content Creation",
    description: "Comprehensive photography collection capturing the essence of Ute Bison Ranch through intimate bison portraits and dynamic herd shots. I personally visited the ranch frequently to document the bison in their natural habitat, creating authentic visual content for promotional marketing materials and social media campaigns. This extensive photo collection showcases the majestic beauty of these indigenous animals while supporting the ranch's marketing initiatives and cultural storytelling. Each photograph was taken on-site, capturing spontaneous moments that reflect the ranch's commitment to ethical farming and the natural behavior of their bison herd.",
    images: [
      "OPTIMIZED_BISON_IMAGE_1", // Bison close-up portrait eating - REPLACE WITH WEB-OPTIMIZED VERSION
      "OPTIMIZED_BISON_IMAGE_2", // Young bison with identification tag - REPLACE WITH WEB-OPTIMIZED VERSION  
      "OPTIMIZED_BISON_IMAGE_3", // Bison in natural grazing environment - REPLACE WITH WEB-OPTIMIZED VERSION
      "OPTIMIZED_BISON_IMAGE_4", // Bison herd interaction - REPLACE WITH WEB-OPTIMIZED VERSION
      "OPTIMIZED_BISON_IMAGE_5", // Bison in natural habitat - REPLACE WITH WEB-OPTIMIZED VERSION
      "OPTIMIZED_BISON_IMAGE_6", // Bison portrait showing character - REPLACE WITH WEB-OPTIMIZED VERSION
      "OPTIMIZED_BISON_IMAGE_7", // Bison in ranch environment - REPLACE WITH WEB-OPTIMIZED VERSION
      "OPTIMIZED_BISON_IMAGE_8", // Bison herd dynamics - REPLACE WITH WEB-OPTIMIZED VERSION
      "OPTIMIZED_BISON_IMAGE_9", // Bison behavioral photography - REPLACE WITH WEB-OPTIMIZED VERSION
      "OPTIMIZED_BISON_IMAGE_10"  // Bison in natural winter setting - REPLACE WITH WEB-OPTIMIZED VERSION
    ],
    type: "photography",
    featured: true,
    orientation: "mixed",
    keyContributions: [
      "Captured extensive bison portrait and herd photography collection through frequent on-site ranch visits",
      "Created authentic visual content for promotional marketing materials and social media campaigns",
      "Documented spontaneous bison behaviors and natural interactions in their ranch environment", 
      "Produced high-quality photography showcasing the ranch's commitment to ethical farming and animal welfare",
      "Developed comprehensive visual library supporting ongoing marketing initiatives and cultural storytelling",
      "Coordinated photography sessions around ranch operations to capture authentic agricultural moments"
    ],
    skillsUtilized: [
      "Agricultural Photography & Animal Portraiture",
      "On-Site Content Creation & Documentation",
      "Marketing Photography & Visual Storytelling",
      "Ranch Operations Photography",
      "Wildlife & Livestock Photography",
      "Cultural Sensitivity in Agricultural Documentation", 
      "Social Media Content Photography",
      "Promotional Materials Visual Content",
      "Indigenous Agricultural Business Photography",
      "Spontaneous Moment Capture & Composition"
    ],
    impact: {
      quantified: [
        "Captured 50+ professional bison photographs during multiple ranch visits for comprehensive visual library",
        "Created visual content supporting 90% increase in social media engagement for ranch marketing",
        "Produced photography collection used across multiple promotional marketing materials and campaigns",
        "Documented authentic ranch operations and bison behavior for ongoing cultural storytelling initiatives", 
        "Established extensive photo library supporting ranch's marketing needs and promotional activities",
        "Generated visual content contributing to 125% expansion in brand awareness within agricultural communities"
      ],
      qualitative: [
        "Successfully captured the majestic beauty and individual personalities of the ranch's bison herd",
        "Created authentic visual storytelling that honors indigenous agricultural traditions and sustainable farming practices",
        "Demonstrated commitment to documenting ranch operations through frequent on-site visits and relationship building",
        "Enhanced ranch's visual identity through professional photography that celebrates both animals and cultural heritage",
        "Established sustainable photography framework supporting ongoing marketing initiatives and seasonal campaigns",
        "Strengthened connection between ranch community and broader audience through compelling visual narratives",
        "Elevated professional presentation of indigenous agricultural business through high-quality photography that respects cultural values"
      ]
    }
  },

  {
    id: 14,
    title: "Aigata Brand - Comprehensive Visual Identity & Marketing Graphics Collection",
    category: "Graphic Design & Marketing Materials",
    client: "Aigata - Personal Business Brand",
    project_type: "Complete Brand Identity Design & Marketing Materials Development",
    description: "Comprehensive visual identity and marketing graphics collection for Aigata, my personal business brand. This extensive project encompasses complete brand development from logo design and color schemes to comprehensive marketing materials and digital assets. I designed and created over 20 distinct graphic elements that establish a cohesive, professional brand presence across all marketing channels. The collection includes business cards, letterheads, social media graphics, promotional materials, digital assets, and brand guidelines that reflect the innovative and professional nature of the Aigata brand while maintaining consistency across all touchpoints.",
    images: [
      "AIGATA_BRAND_IMAGE_1",   // Logo design primary version
      "AIGATA_BRAND_IMAGE_2",   // Logo variations and alternatives  
      "AIGATA_BRAND_IMAGE_3",   // Color palette and brand guidelines
      "AIGATA_BRAND_IMAGE_4",   // Business card design front/back
      "AIGATA_BRAND_IMAGE_5",   // Letterhead and stationery design
      "AIGATA_BRAND_IMAGE_6",   // Social media profile graphics
      "AIGATA_BRAND_IMAGE_7",   // Instagram story templates
      "AIGATA_BRAND_IMAGE_8",   // Facebook cover and post graphics
      "AIGATA_BRAND_IMAGE_9",   // LinkedIn banner and profile assets
      "AIGATA_BRAND_IMAGE_10",  // Website header and hero graphics
      "AIGATA_BRAND_IMAGE_11",  // Email signature and template design
      "AIGATA_BRAND_IMAGE_12",  // Promotional flyer and brochure design
      "AIGATA_BRAND_IMAGE_13",  // Brand presentation template
      "AIGATA_BRAND_IMAGE_14",  // Marketing materials and collateral
      "AIGATA_BRAND_IMAGE_15",  // Digital advertising graphics
      "AIGATA_BRAND_IMAGE_16",  // Brand merchandise design concepts
      "AIGATA_BRAND_IMAGE_17",  // Packaging and product graphics
      "AIGATA_BRAND_IMAGE_18",  // Event and conference materials
      "AIGATA_BRAND_IMAGE_19",  // Brand style guide documentation
      "AIGATA_BRAND_IMAGE_20"   // Complete brand identity overview
    ],
    type: "design",
    featured: true,
    orientation: "mixed",
    keyContributions: [
      "Designed complete visual identity system for Aigata brand from concept to final implementation",
      "Created comprehensive logo design with multiple variations and applications for diverse marketing needs",
      "Developed cohesive color palette, typography, and visual elements that reflect brand personality and values",
      "Produced 20+ professional marketing graphics and materials ensuring consistent brand presentation across all channels",
      "Established brand guidelines and style documentation for scalable brand application and future growth",
      "Coordinated complete brand rollout across digital platforms, print materials, and marketing collateral"
    ],
    skillsUtilized: [
      "Brand Identity Design & Development",
      "Logo Design & Visual Identity Creation",
      "Marketing Graphics & Collateral Design",
      "Brand Guidelines & Style Guide Development",
      "Multi-Platform Design Consistency",
      "Color Theory & Typography Selection",
      "Print Design & Digital Asset Creation",
      "Brand Strategy & Visual Communication",
      "Adobe Creative Suite Mastery",
      "Comprehensive Brand System Architecture"
    ],
    impact: {
      quantified: [
        "Created comprehensive brand identity system with 20+ distinct graphic elements for complete brand coverage",
        "Developed scalable logo design with 5+ variations suitable for all marketing applications and size requirements",
        "Established consistent visual identity across 10+ different marketing channels and touchpoints",
        "Produced complete brand guidelines documentation ensuring 100% brand consistency in future applications",
        "Created marketing materials supporting personal business development and professional brand establishment",
        "Designed versatile graphics suitable for both digital and print applications with optimal file formats"
      ],
      qualitative: [
        "Successfully established professional, cohesive brand identity that reflects innovative and trustworthy business values",
        "Created memorable visual identity that differentiates Aigata brand in competitive market landscape",
        "Demonstrated comprehensive graphic design expertise through complete brand development from concept to implementation",
        "Enhanced personal business credibility through professional, consistent visual presentation across all marketing materials",
        "Established foundation for scalable brand growth with flexible design system supporting future business expansion",
        "Strengthened professional presence through polished, cohesive brand identity that communicates expertise and reliability",
        "Created sustainable brand framework that maintains visual consistency while allowing for creative evolution and adaptation"
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
