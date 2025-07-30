#!/usr/bin/env python3
"""
Script to sync all new project updates:
1. Update Aigata Brand project with e-commerce business details
2. Add comprehensive graphic design skills portfolio project (ID: 15)
"""

import os
import sys
from pymongo import MongoClient
from dotenv import load_dotenv

def get_database():
    """Get the correct database"""
    # Load environment variables from backend/.env
    load_dotenv('/app/backend/.env')
    
    mongo_url = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
    client = MongoClient(mongo_url)
    db_name = os.getenv('DB_NAME', 'test_database')
    return client[db_name]

def update_aigata_ecommerce_project():
    """Update Aigata Brand project with e-commerce business details"""
    try:
        db = get_database()
        collection = db.projects
        
        updated_data = {
            "title": "Aigata Brand - E-commerce Product Listing Graphics & Marketing Assets",
            "client": "Aigata - Personal E-commerce Business", 
            "project_type": "Complete E-commerce Product Graphics & Multi-Platform Marketing Materials",
            "description": "Comprehensive e-commerce product listing graphics and marketing assets for my personal Aigata brand business operating across Amazon, eBay, Etsy, and TikTok Shop platforms. I designed, branded, and created over 20 distinct graphic elements for product listings, social media marketing, and promotional materials. As the sole business operator, I handled complete business operations including working with overseas vendors on product design and logistics, personally managing inventory storage at my home, and coordinating all transportation and fulfillment. These graphics supported my multi-platform e-commerce strategy, featuring professional product presentations, social media assets, and promotional materials that established Aigata as a recognizable brand across all selling platforms.",
            "key_contributions": [
                "Created comprehensive e-commerce product listing graphics for Amazon, eBay, Etsy, and TikTok Shop platforms",
                "Designed and branded 20+ marketing assets for multi-platform e-commerce business operations and social media promotion",
                "Managed complete business operations including overseas vendor relationships, product design coordination, and logistics management",
                "Established home-based inventory storage system and personally handled all product transportation and fulfillment processes",
                "Developed cohesive Aigata brand identity across all e-commerce platforms ensuring consistent visual presentation and recognition",
                "Created social media marketing graphics supporting product promotion and brand visibility across multiple online channels"
            ],
            "skills_utilized": [
                "E-commerce Product Listing Design",
                "Multi-Platform Brand Consistency",
                "Amazon & eBay Marketplace Graphics", 
                "Etsy Creative Product Presentation",
                "TikTok Shop Visual Marketing",
                "Social Media Product Promotion Graphics",
                "International Vendor Coordination",
                "Home-Based Business Operations Management",
                "Logistics & Inventory Management",
                "Cross-Platform Marketing Strategy"
            ],
            "impact": {
                "quantified": [
                    "Created 20+ professional e-commerce product graphics supporting multi-platform business operations across 4 major platforms",
                    "Established successful home-based e-commerce business with complete operational control and inventory management",
                    "Developed comprehensive brand identity ensuring consistent presentation across Amazon, eBay, Etsy, and TikTok Shop",
                    "Managed international vendor relationships and logistics coordination for complete product development lifecycle",
                    "Created scalable graphics system supporting ongoing product launches and seasonal promotional campaigns",
                    "Built sustainable e-commerce business model with integrated design, operations, and fulfillment processes"
                ],
                "qualitative": [
                    "Successfully established Aigata brand as recognizable presence across multiple e-commerce platforms through consistent visual identity",
                    "Demonstrated comprehensive business management skills combining creative design with operational excellence and logistics coordination",
                    "Created professional product presentation standards that enhanced brand credibility and customer trust across all platforms",
                    "Established efficient home-based business operations proving capability in end-to-end e-commerce business management",
                    "Enhanced product marketability through compelling graphics that effectively communicated value proposition to diverse platform audiences",
                    "Strengthened entrepreneurial skillset through successful integration of design expertise with practical business operations and international trade",
                    "Built sustainable business framework supporting continued growth and expansion across additional e-commerce platforms and product lines"
                ]
            }
        }
        
        result = collection.update_one({"id": "14"}, {"$set": updated_data})
        
        if result.modified_count > 0:
            print("✅ Updated Aigata Brand project with e-commerce business details")
            return True
        else:
            print("⚠️  Aigata Brand project not found or no changes made")
            return False
            
    except Exception as e:
        print(f"❌ Error updating Aigata project: {str(e)}")
        return False

def add_comprehensive_design_portfolio():
    """Add comprehensive graphic design skills portfolio project"""
    
    # New comprehensive design project data
    comprehensive_portfolio = {
        "id": "15",
        "title": "Comprehensive Graphic Design Skills Portfolio - Multi-Category Design Showcase",
        "category": "Graphic Design & Marketing Materials", 
        "client": "Various Clients - Comprehensive Design Portfolio",
        "project_type": "Multi-Category Graphic Design Skills Demonstration",
        "description": "Comprehensive graphic design portfolio showcasing diverse skills across multiple categories and client projects. This extensive collection demonstrates proficiency in professional design, illustration, promotional marketing, and event materials. The portfolio spans work for Ute Plaza Supermarket, KahPeeh kah-Ahn Ute Coffee House & Soda, and various event promotions, showcasing versatility in creating graphics for different industries and purposes. Each category represents specific skill sets from technical design work to creative illustration and strategic promotional materials.",
        "images": [
            # Line 1: 13 Professional & Social Media Graphics
            "PROFESSIONAL_GRAPHIC_1", "PROFESSIONAL_GRAPHIC_2", "PROFESSIONAL_GRAPHIC_3", "PROFESSIONAL_GRAPHIC_4", 
            "PROFESSIONAL_GRAPHIC_5", "PROFESSIONAL_GRAPHIC_6", "PROFESSIONAL_GRAPHIC_7", "PROFESSIONAL_GRAPHIC_8", 
            "PROFESSIONAL_GRAPHIC_9", "PROFESSIONAL_GRAPHIC_10", "PROFESSIONAL_GRAPHIC_11", "PROFESSIONAL_GRAPHIC_12", "PROFESSIONAL_GRAPHIC_13",
            
            # Line 2: 4 Drawing/Illustrator Skills (stickers, t-shirt, 2 logos)
            "ILLUSTRATION_STICKER_1", "ILLUSTRATION_TSHIRT_1", "ILLUSTRATION_LOGO_1", "ILLUSTRATION_LOGO_2",
            
            # Line 3: 12 Promotional Graphics for Ute Plaza & Coffee House
            "PROMO_SEASONAL_1", "PROMO_SEASONAL_2", "PROMO_SEASONAL_3", "PROMO_DRINKS_1", "PROMO_DRINKS_2", "PROMO_DRINKS_3",
            "PROMO_REGULAR_1", "PROMO_REGULAR_2", "PROMO_HOLIDAY_1", "PROMO_HOLIDAY_2", "PROMO_HOLIDAY_3", "PROMO_DEALS_1",
            
            # Line 4: 4 Event Flyers  
            "EVENT_FLYER_1", "EVENT_FLYER_2", "EVENT_FLYER_3", "EVENT_FLYER_4"
        ],
        "type": "design",
        "featured": True,
        "orientation": "mixed",
        "key_contributions": [
            "Created comprehensive graphic design portfolio demonstrating expertise across professional, promotional, and creative design categories",
            "Designed 13 professional graphics for business and social media use showcasing technical design skills and brand consistency",
            "Produced illustration work including custom stickers, t-shirt designs, and logo creation demonstrating artistic and creative abilities",
            "Developed 12 promotional graphics for Ute Plaza Supermarket and KahPeeh kah-Ahn Coffee House covering seasonal, beverage, and holiday campaigns",
            "Created 4 distinct event flyers showcasing layout design, typography, and information hierarchy skills for various community events",
            "Demonstrated versatility in design styles, from corporate professional graphics to creative illustrations and promotional materials"
        ],
        "skills_utilized": [
            "Professional Graphic Design & Layout",
            "Social Media Graphics Creation",
            "Custom Illustration & Drawing Skills",
            "Logo Design & Brand Identity",
            "Sticker & Merchandise Design",
            "T-shirt & Apparel Graphics",
            "Promotional Materials Design",
            "Seasonal & Holiday Campaign Graphics",
            "Event Flyer Design & Layout", 
            "Multi-Category Design Versatility"
        ],
        "impact": {
            "quantified": [
                "Created comprehensive portfolio with 33 distinct design pieces across 4 specialized categories",
                "Demonstrated proficiency in 13 professional business graphics suitable for corporate and social media applications",
                "Produced 4 illustration pieces showcasing creative design skills in stickers, apparel, and logo design",
                "Developed 12 promotional graphics supporting marketing campaigns for local businesses and establishments",
                "Designed 4 event flyers with varied layouts and information architectures for different community events"
            ],
            "qualitative": [
                "Successfully demonstrated versatility across multiple design disciplines from professional corporate graphics to creative illustrations",
                "Established comprehensive design skillset capable of serving diverse client needs and project requirements",
                "Enhanced portfolio credibility through organized presentation of varied design capabilities and technical proficiencies",
                "Proved ability to adapt design style and approach based on client needs, industry requirements, and project objectives",
                "Strengthened professional reputation through diverse portfolio showcasing both creative artistry and technical design expertise",
                "Created sustainable framework for demonstrating design capabilities across multiple categories and client types"
            ]
        }
    }

    try:
        # Connect to MongoDB
        db = get_database()
        collection = db.projects
        
        # Check if project already exists
        existing_project = collection.find_one({"id": "15"})
        if existing_project:
            print("✅ Comprehensive design portfolio with ID 15 already exists. Updating...")
            result = collection.update_one({"id": "15"}, {"$set": comprehensive_portfolio})
            print(f"✅ Updated existing design portfolio. Modified count: {result.modified_count}")
        else:
            # Insert the new project
            result = collection.insert_one(comprehensive_portfolio)
            print(f"✅ Successfully added comprehensive design portfolio to database")
            print(f"✅ Inserted ID: {result.inserted_id}")
        
        # Verify the project was added
        verification = collection.find_one({"id": "15"})
        if verification:
            print(f"✅ Verification successful: Project '{verification['title']}' found in database")
            print(f"✅ Category: {verification['category']}")
            print(f"✅ Images count: {len(verification.get('images', []))}")
            return True
        else:
            print("❌ Verification failed: Comprehensive design portfolio not found after insertion")
            return False
            
    except Exception as e:
        print(f"❌ Error adding comprehensive design portfolio: {str(e)}")
        return False

if __name__ == "__main__":
    print("🔄 Syncing all new project updates...")
    
    success_count = 0
    
    # Update 1: Aigata e-commerce project
    if update_aigata_ecommerce_project():
        success_count += 1
    
    # Update 2: Add comprehensive design portfolio
    if add_comprehensive_design_portfolio():
        success_count += 1
    
    if success_count == 2:
        print("\\n✅ ALL PROJECT UPDATES COMPLETE!")
        print("✅ Aigata Brand updated with e-commerce business operations details")
        print("✅ Comprehensive Design Skills Portfolio added with 33 categorized graphics")
        print("✅ Portfolio now showcases: E-commerce business management + Multi-category design skills")
    else:
        print(f"\\n⚠️  Completed {success_count}/2 updates")
        if success_count == 0:
            sys.exit(1)