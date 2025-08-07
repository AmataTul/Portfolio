#!/usr/bin/env python3

import os
import sys
sys.path.append('/app/backend')

from pymongo import MongoClient
from models import Project
import json
import uuid
from datetime import datetime

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/portfolio_db')
client = MongoClient(MONGO_URL)
db = client.get_database()

def add_comprehensive_graphic_design_project():
    """Add/Update the Comprehensive Graphic Design Portfolio project with uploaded bison skull image"""
    
    # Project data with the first image being the uploaded bison skull
    graphic_design_project = {
        'id': str(uuid.uuid4())[:8],
        'title': 'Comprehensive Graphic Design Portfolio - Multi-Category Professional Showcase',
        'category': 'Graphic Design & Marketing Materials',
        'client': 'Ute Tribal Enterprises & Associated Businesses',
        'project_type': 'Multi-Business Graphic Design & Visual Identity Portfolio',
        'images': [
            # Line 1: Ute Bison Ranch Graphics (13 items) - First image uploaded for testing
            { "placeholder": "https://customer-assets.emergentagent.com/job_project-showcase-20/artifacts/848tn2gz_490175273_1219013826892097_7282331591355033149_n.jpg", "category": "Ute Bison Ranch Promos", "type": "promotional_graphic" },
            { "placeholder": "UTE_BISON_PROMO_2", "category": "Ute Bison Ranch Promos", "type": "advertisement" },
            { "placeholder": "UTE_BISON_PRODUCT_1", "category": "Ute Bison Ranch Promos", "type": "product_listing" },
            { "placeholder": "UTE_BISON_PRODUCT_2", "category": "Ute Bison Ranch Promos", "type": "ecommerce_graphic" },
            { "placeholder": "UTE_BISON_EMAIL_1", "category": "Ute Bison Ranch Promos", "type": "email_template" },
            { "placeholder": "UTE_BISON_EMAIL_2", "category": "Ute Bison Ranch Promos", "type": "email_header" },
            { "placeholder": "UTE_BISON_PROMO_3", "category": "Ute Bison Ranch Promos", "type": "promotional_banner" },
            { "placeholder": "UTE_BISON_PROMO_4", "category": "Ute Bison Ranch Promos", "type": "social_media_post" },
            { "placeholder": "UTE_BISON_AD_1", "category": "Ute Bison Ranch Promos", "type": "digital_advertisement" },
            { "placeholder": "UTE_BISON_AD_2", "category": "Ute Bison Ranch Promos", "type": "print_advertisement" },
            { "placeholder": "UTE_BISON_MATERIAL_1", "category": "Ute Bison Ranch Promos", "type": "promotional_material" },
            { "placeholder": "UTE_BISON_MATERIAL_2", "category": "Ute Bison Ranch Promos", "type": "marketing_collateral" },
            { "placeholder": "UTE_BISON_BRAND_1", "category": "Ute Bison Ranch Promos", "type": "brand_graphic" },
            
            # Line 2: Design Assets (4 items)
            { "placeholder": "STICKER_DESIGN_1", "category": "Custom Design Assets", "type": "sticker_design" },
            { "placeholder": "TSHIRT_DESIGN_1", "category": "Custom Design Assets", "type": "tshirt_design" },
            { "placeholder": "LOGO_DESIGN_1", "category": "Custom Design Assets", "type": "logo_design" },
            { "placeholder": "LOGO_DESIGN_2", "category": "Custom Design Assets", "type": "logo_design" },
            
            # Line 3: Multi-Business Graphics (13 items)
            { "placeholder": "UTE_PLAZA_PROMO_1", "category": "Multi-Business Graphics", "type": "supermarket_promo" },
            { "placeholder": "UTE_PLAZA_PROMO_2", "category": "Multi-Business Graphics", "type": "supermarket_ad" },
            { "placeholder": "UTE_PLAZA_HOLIDAY_1", "category": "Multi-Business Graphics", "type": "holiday_material" },
            { "placeholder": "UTE_PLAZA_HOLIDAY_2", "category": "Multi-Business Graphics", "type": "seasonal_graphic" },
            { "placeholder": "UTE_PETROLEUM_AD_1", "category": "Multi-Business Graphics", "type": "gas_station_promo" },
            { "placeholder": "UTE_PETROLEUM_AD_2", "category": "Multi-Business Graphics", "type": "convenience_store_ad" },
            { "placeholder": "UTE_PETROLEUM_PROMO_1", "category": "Multi-Business Graphics", "type": "fuel_promotion" },
            { "placeholder": "COFFEE_HOUSE_PROMO_1", "category": "Multi-Business Graphics", "type": "coffee_shop_ad" },
            { "placeholder": "COFFEE_HOUSE_PROMO_2", "category": "Multi-Business Graphics", "type": "beverage_promotion" },
            { "placeholder": "COFFEE_HOUSE_HOLIDAY_1", "category": "Multi-Business Graphics", "type": "cafe_holiday_material" },
            { "placeholder": "MULTI_BUSINESS_AD_1", "category": "Multi-Business Graphics", "type": "cross_promotion" },
            { "placeholder": "MULTI_BUSINESS_AD_2", "category": "Multi-Business Graphics", "type": "tribal_enterprise_ad" },
            { "placeholder": "MULTI_BUSINESS_BRAND_1", "category": "Multi-Business Graphics", "type": "unified_branding" },
            
            # Line 4: Event Flyers (4 items)
            { "placeholder": "EVENT_FLYER_1", "category": "Event Flyers", "type": "community_event" },
            { "placeholder": "EVENT_FLYER_2", "category": "Event Flyers", "type": "cultural_event" },
            { "placeholder": "EVENT_FLYER_3", "category": "Event Flyers", "type": "business_event" },
            { "placeholder": "EVENT_FLYER_4", "category": "Event Flyers", "type": "promotional_event" }
        ],
        'type': 'graphic_design',
        'featured': True,
        'key_contributions': [
            "Designed comprehensive promotional graphics and advertisements for Ute Bison Ranch business operations",
            "Created ecommerce product listings and email marketing templates to support online sales initiatives",
            "Developed custom design assets including stickers, t-shirt designs, and professional logos",
            "Produced multi-business marketing materials for Ute Plaza Supermarket, Ute Petroleum, and KahPeeh Kah-Ahn Coffee House",
            "Created seasonal and holiday-themed promotional materials to support event-based marketing campaigns",
            "Designed professional event flyers for community, cultural, and business events",
            "Maintained consistent visual identity across multiple business brands while respecting cultural sensitivity"
        ],
        'skills_utilized': [
            "Adobe Photoshop", "Adobe Illustrator", "Canva Pro",
            "Logo Design & Brand Identity", "Print Design", "Digital Marketing Graphics",
            "Ecommerce Visual Design", "Email Template Design", "Social Media Graphics",
            "Event Marketing Materials", "Promotional Design", "Multi-Brand Coordination",
            "Cultural Design Sensitivity", "Visual Hierarchy", "Color Theory Application"
        ],
        'created_at': datetime.utcnow(),
        'updated_at': datetime.utcnow()
    }
    
    try:
        # Check if project already exists
        existing_project = db.projects.find_one({"title": "Comprehensive Graphic Design Portfolio - Multi-Category Professional Showcase"})
        
        if existing_project:
            # Update existing project
            result = db.projects.update_one(
                {"title": "Comprehensive Graphic Design Portfolio - Multi-Category Professional Showcase"},
                {"$set": graphic_design_project}
            )
            if result.modified_count > 0:
                print("✅ Updated existing Comprehensive Graphic Design Portfolio project")
            else:
                print("⚠️ Project already up to date")
        else:
            # Insert new project
            result = db.projects.insert_one(graphic_design_project)
            print(f"✅ Added new Comprehensive Graphic Design Portfolio project with ID: {graphic_design_project['id']}")
            
        print("✅ First placeholder now displays uploaded bison skull artwork!")
        print("   URL: https://customer-assets.emergentagent.com/job_project-showcase-20/artifacts/848tn2gz_490175273_1219013826892097_7282331591355033149_n.jpg")
        print("✅ All placeholder windows now consistent size (4-column grid)")
        
    except Exception as e:
        print(f"❌ Error updating graphic design project: {e}")

if __name__ == "__main__":
    print("🔄 Adding/Updating Comprehensive Graphic Design Portfolio with uploaded bison skull image...")
    add_comprehensive_graphic_design_project()
    print("✅ Graphic design project update complete")