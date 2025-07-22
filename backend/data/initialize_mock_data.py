from models import (
    Project, Category, ContactInfo, WorkHistory, Education, Tool, Brand, AnalyticsData
)
from datetime import datetime


async def initialize_mock_data(db):
    """Initialize the database with mock data"""
    
    # Categories
    categories_data = [
        {"name": "All", "description": "All portfolio items"},
        {"name": "Graphic Design & Marketing Materials", "description": "Brand identity, marketing collateral, and graphic designs"},
        {"name": "Advertising", "description": "Digital and print advertising campaigns"},
        {"name": "Social Media Content & Campaigns", "description": "Social media posts, campaigns, and content"},
        {"name": "Photography Projects", "description": "Product photography and event coverage"},
        {"name": "Creative Concepts & Branding", "description": "Brand strategy and creative conceptualization"},
        {"name": "Illustrations & Educational Content", "description": "Educational materials and illustrations"},
        {"name": "Business Analytics & Strategy", "description": "Strategic business analysis and competitive intelligence"}
    ]
    
    for category_data in categories_data:
        category = Category(**category_data)
        await db.categories.insert_one(category.dict())
    
    # Contact Information
    contact_info = ContactInfo(
        name="Amata T.",
        email="amata.portfolio@gmail.com",
        linkedin="https://linkedin.com/in/amata-marketing",
        phone="+1 (555) 123-4567",
        location="Utah, USA"
    )
    await db.contact_info.insert_one(contact_info.dict())
    
    # Work History
    work_history_data = [
        {
            "position": "Marketing Project Manager | Marketing Coordinator",
            "company": "Ute Tribal Enterprises",
            "location": "Fort Duchesne, UT",
            "period": "Feb 2024 – July 2025",
            "achievements": [
                "Managed full-scope marketing operations across seven diverse business divisions, including e-commerce, retail, food service, fuel, and hospitality",
                "Led integrated campaigns from strategy to execution, managing 14+ social media accounts, WordPress websites, paid Meta advertising, and cross-platform content creation",
                "Directed creative development, brand positioning, and performance optimization across all channels",
                "Collaborated with executive leadership, vendors, and business managers to align marketing efforts with organizational goals",
                "Oversaw a small team and coordinated cross-functional projects using a hands-on, data-informed approach to drive engagement, growth, and brand visibility"
            ]
        },
        {
            "position": "Founder & Brand Manager",
            "company": "Friendly Futures (Brand: Aigata)",
            "location": "Remote",
            "period": "May 2023 – Mar 2025",
            "achievements": [
                "Built and led a direct-to-consumer e-commerce brand from the ground up, overseeing strategy, operations, marketing, and product development",
                "Managed online storefronts across Amazon, Etsy, eBay, and TikTok Shop, optimizing listings, logistics, and ad performance to maximize visibility and conversions",
                "Directed brand identity and creative direction for Aigata, producing original product photography, graphics, and promotional content",
                "Developed marketing strategies tailored to target audiences, including social campaigns, influencer outreach, and seasonal promotions",
                "Coordinated events for direct customer engagement and managed a small team to scale operations efficiently"
            ]
        },
        {
            "position": "Business Analyst & Marketing Specialist",
            "company": "Zorina Jewelry Design House, Inc",
            "location": "Remote",
            "period": "Sep 2021 – Apr 2023",
            "achievements": [
                "Supported business growth by combining data analysis with creative marketing strategies for a luxury jewelry brand",
                "Conducted market research, competitor benchmarking, and consumer behavior analysis to inform product positioning and campaign planning",
                "Developed and managed digital content, promotional materials, and e-commerce listings to enhance brand visibility and drive sales",
                "Collaborated with leadership on pricing, inventory optimization, and branding decisions",
                "Provided insights through sales reports and operational analysis to support data-driven decision-making"
            ]
        },
        {
            "position": "Branding Strategy & Business Analytics Extern",
            "company": "Beats by Dre",
            "location": "Remote",
            "period": "Jan 2023 – Mar 2023",
            "achievements": [
                "Conducted consumer research and data analysis to support branding and marketing strategy for Beats by Dre",
                "Utilized SQL and Tableau to identify trends, segment audiences, and assess campaign performance",
                "Delivered strategic recommendations to enhance Gen Z engagement, improve brand sentiment, and optimize positioning",
                "Collaborated in a fast-paced, cross-functional environment to translate insights into actionable marketing strategies"
            ]
        },
        {
            "position": "Data Analyst (Adobe Analytics Challenge Competitor)",
            "company": "Adobe x Hilton",
            "location": "Remote",
            "period": "Sep 2022 – Oct 2022",
            "achievements": [
                "Selected to compete in the Adobe Analytics Challenge among 3,000+ teams",
                "Analyzed real-world data from Hilton Hotels using Adobe Analytics to uncover customer behavior trends",
                "Created compelling data visualizations and presented actionable recommendations to improve customer experience and business performance"
            ]
        }
    ]
    
    for work_data in work_history_data:
        work = WorkHistory(**work_data)
        await db.work_history.insert_one(work.dict())
    
    # Education
    education = Education(
        degree="Bachelor's of Science in Management Information Systems",
        minor="Minor in Marketing",
        university="Utah State University",
        honor="Cum Laude",
        period="2019 - 2023"
    )
    await db.education.insert_one(education.dict())
    
    # Tools
    tools_data = [
        {"name": "Google Analytics", "category": "Analytics & Data Intelligence"},
        {"name": "Adobe Analytics", "category": "Analytics & Data Intelligence"},
        {"name": "Looker Studio", "category": "Analytics & Data Intelligence"},
        {"name": "SQL", "category": "Analytics & Data Intelligence"},
        {"name": "Tableau", "category": "Analytics & Data Intelligence"},
        {"name": "Hotjar", "category": "Analytics & Data Intelligence"},
        {"name": "Google Ads", "category": "Digital Marketing & Advertising"},
        {"name": "Meta Ads Manager", "category": "Digital Marketing & Advertising"},
        {"name": "HubSpot", "category": "Digital Marketing & Advertising"},
        {"name": "Semrush", "category": "Digital Marketing & Advertising"},
        {"name": "MailChimp", "category": "Digital Marketing & Advertising"},
        {"name": "Adobe Photoshop", "category": "Creative & Design"},
        {"name": "Adobe Illustrator", "category": "Creative & Design"},
        {"name": "Canva", "category": "Creative & Design"},
        {"name": "CapCut", "category": "Creative & Design"},
        {"name": "Figma", "category": "Creative & Design"},
        {"name": "WordPress", "category": "Project Management & Operations"},
        {"name": "Trello", "category": "Project Management & Operations"},
        {"name": "Jira", "category": "Project Management & Operations"},
        {"name": "Miro", "category": "Project Management & Operations"},
        {"name": "Notion", "category": "Project Management & Operations"}
    ]
    
    for tool_data in tools_data:
        tool = Tool(**tool_data)
        await db.tools.insert_one(tool.dict())
    
    # Brands
    brands_data = [
        {"name": "Beat by Dre"},
        {"name": "Disney"},
        {"name": "Adobe"}
    ]
    
    for brand_data in brands_data:
        brand = Brand(**brand_data)
        await db.brands.insert_one(brand.dict())
    
    # Projects
    projects_data = [
        {
            "title": "Beat by Dre Brand Identity System",
            "category": "Graphic Design & Marketing Materials",
            "client": "Beat by Dre",
            "description": "Comprehensive brand identity system including logos, color palettes, typography guides, and brand guidelines for product launch campaign.",
            "images": [
                "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop"
            ],
            "type": "image",
            "featured": True,
            "orientation": "horizontal"
        },
        {
            "title": "Disney+ Digital Campaign Launch",
            "category": "Advertising",
            "client": "Disney",
            "description": "Multi-platform digital advertising campaign for Disney+ streaming service, including display ads, video commercials, and interactive banners.",
            "images": [
                "https://images.unsplash.com/photo-1489399627699-e5c5f1e8f6c6?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
            ],
            "type": "image",
            "featured": True,
            "orientation": "horizontal"
        },
        {
            "title": "Adobe Creative Suite Instagram Reels",
            "category": "Social Media Content & Campaigns",
            "client": "Adobe",
            "description": "Engaging Instagram reels and TikTok content showcasing Creative Suite capabilities through dynamic vertical storytelling and user-generated content.",
            "images": [
                "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=800&fit=crop"
            ],
            "type": "video",
            "featured": True,
            "orientation": "vertical"
        },
        {
            "title": "Adobe Analytics Challenge - Consumer Research & Strategy",
            "category": "Illustrations & Educational Content",
            "client": "Adobe x Hilton",
            "description": "Comprehensive research presentation analyzing Hilton Hotels consumer behavior data using Adobe Analytics. Includes strategic recommendations, data visualizations, and actionable insights for customer experience optimization.",
            "images": [
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop"
            ],
            "type": "presentation",
            "featured": True,
            "orientation": "horizontal",
            "research_slides": [
                {
                    "title": "Consumer Behavior Analysis",
                    "description": "Deep dive into Hilton customer journey mapping and behavior patterns",
                    "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                },
                {
                    "title": "Data Visualization & Insights",
                    "description": "Strategic recommendations based on Adobe Analytics data analysis",
                    "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                },
                {
                    "title": "Strategic Recommendations",
                    "description": "Actionable insights for customer experience optimization",
                    "image": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop"
                }
            ]
        },
        {
            "title": "High School Financial Literacy Animation",
            "category": "Illustrations & Educational Content",
            "client": "Educational Initiative",
            "description": "Educational animation video series designed for high school students covering financial literacy, budgeting, and career planning concepts.",
            "images": [
                "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop"
            ],
            "type": "video",
            "featured": True,
            "orientation": "horizontal",
            "video_url": "https://youtu.be/DYLLB8qiQ8k?si=MZxpHgA0KJ4gAKlL"
        },
        {
            "title": "Business Strategy Game - Championship Performance",
            "category": "Business Analytics & Strategy",
            "client": "Utah State University",
            "description": "Achieved 1st place among 158 students in semester-long Business Strategy Game simulation, earning invitation to worldwide university competition. Demonstrated strategic thinking, financial management, and competitive analysis skills.",
            "images": [
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop"
            ],
            "type": "analytics",
            "featured": True,
            "orientation": "horizontal",
            "analytics": {
                "achievement": "1st Place Winner (158 students)",
                "competition_level": "Worldwide University Competition Invitation",
                "duration": "Full Semester",
                "key_metrics": {
                    "earnings_per_share": 13.57,
                    "return_on_equity": 29.4,
                    "credit_rating": "A+",
                    "image_rating": 94,
                    "net_revenue": 1201007,
                    "profit_margin": 19.4,
                    "stock_price": 298.58,
                    "net_income": 233283
                },
                "strategic_decisions": [
                    "Corporate citizenship investments improved image rating from 77 to 94 (22% increase)",
                    "Strategic production capacity expansion in Latin America to meet demand",
                    "Enhanced celebrity contract bidding to improve brand appeal and market position",
                    "Maintained A+ credit rating for 4 consecutive years through strategic financial management"
                ],
                "competitive_advantage": "Achieved highest revenue in industry through data-driven strategic decisions and market analysis"
            }
        }
    ]
    
    # Add more projects from the original mock data
    additional_projects = [
        {
            "title": "Beat by Dre Product Photography",
            "category": "Photography Projects",
            "client": "Beat by Dre",
            "description": "High-end product photography series showcasing headphones with dynamic lighting and creative composition for e-commerce and marketing materials.",
            "images": [
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop"
            ],
            "type": "image",
            "featured": False,
            "orientation": "horizontal"
        },
        {
            "title": "Disney Brand Strategy & Visual Identity",
            "category": "Creative Concepts & Branding",
            "client": "Disney",
            "description": "Comprehensive brand strategy development including market research, competitive analysis, and visual identity system for new Disney product line.",
            "images": [
                "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop"
            ],
            "type": "image",
            "featured": False,
            "orientation": "horizontal"
        },
        {
            "title": "Adobe Conference Marketing Collateral",
            "category": "Graphic Design & Marketing Materials",
            "client": "Adobe",
            "description": "Complete marketing collateral suite including brochures, flyers, business cards, and presentation templates for creative conference.",
            "images": [
                "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop"
            ],
            "type": "image",
            "featured": False,
            "orientation": "horizontal"
        }
    ]
    
    all_projects = projects_data + additional_projects
    
    for project_data in all_projects:
        project = Project(**project_data)
        await db.projects.insert_one(project.dict())
    
    print("Mock data initialization completed successfully!")