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

def add_photography_projects():
    """Add the two new product photography projects and update Facebook Reels stats"""
    
    try:
        # First update Facebook Reels with new statistics
        fb_result = db.projects.update_one(
            {"title": "Holiday Campaign Reels - Ute Plaza Supermarket"},
            {"$set": {
                "campaign_stats": {
                    "total_views": "14,000+",
                    "engagement_rate": "90%",
                    "sales_increase": "+55%"
                }
            }}
        )
        
        if fb_result.modified_count > 0:
            print("✅ Updated Facebook Reels with performance metrics:")
            print("   📊 Total Views: Over 14,000")
            print("   💬 Engagement Rate: 90%") 
            print("   📈 Product Sales Increase: +55%")
        
        # Project 1: Aigata Brand Photography
        aigata_project = {
            'id': str(uuid.uuid4())[:8],
            'title': 'Aigata Brand - Handmade Candles & Chocolate Product Photography',
            'category': 'Product Photography & E-commerce',
            'client': 'Aigata Brand - Personal Business',
            'project_type': 'Professional Product Photography for E-commerce & Marketing',
            'description': 'Professional product photography for Aigata Brand\'s handmade candles and artisan chocolate collection. High-quality images designed for e-commerce product listings and digital advertising campaigns, showcasing the craftsmanship and premium quality of handmade products.',
            'images': [
                "AIGATA_CANDLE_PRODUCT_1", "AIGATA_CANDLE_PRODUCT_2", "AIGATA_CANDLE_PRODUCT_3",
                "AIGATA_CHOCOLATE_PRODUCT_1", "AIGATA_CHOCOLATE_PRODUCT_2", "AIGATA_CHOCOLATE_PRODUCT_3",
                "AIGATA_CANDLE_PRODUCT_4", "AIGATA_CANDLE_PRODUCT_5", "AIGATA_CHOCOLATE_PRODUCT_4",
                "AIGATA_CANDLE_PRODUCT_6", "AIGATA_CHOCOLATE_PRODUCT_5", "AIGATA_CANDLE_PRODUCT_7",
                "AIGATA_CHOCOLATE_PRODUCT_6", "AIGATA_CANDLE_PRODUCT_8", "AIGATA_CHOCOLATE_PRODUCT_7"
            ],
            'type': 'photography',
            'featured': True,
            'orientation': 'mixed',
            'skills_utilized': [
                "Adobe Photoshop", "Professional Product Photography", "Studio Lighting Setup",
                "Photo Props & Styling", "Decorative Arrangement", "Color Correction & Enhancement",
                "Background Selection & Setup", "Shadow & Highlight Control", "Image Composition",
                "E-commerce Photography Standards", "Product Staging & Presentation", "Digital Image Editing"
            ],
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        
        # Project 2: Ute Bison Ranch Photography
        bison_project = {
            'id': str(uuid.uuid4())[:8],
            'title': 'Ute Bison Ranch - Premium Bison Meat Product Photography',
            'category': 'Product Photography & Marketing',
            'client': 'Ute Bison Ranch - Ute Tribal Enterprises',
            'project_type': 'Professional Food Product Photography & Marketing Imagery',
            'description': 'Professional product photography for Ute Bison Ranch\'s premium bison meat products. High-quality images used for product listings, social media marketing, advertisements, and promotional materials. Coordinated complex logistics including product handling, temperature control, and styling to showcase the quality and appeal of bison meat products.',
            'images': [
                "UTE_BISON_MEAT_PRODUCT_1", "UTE_BISON_MEAT_PRODUCT_2", "UTE_BISON_MEAT_PRODUCT_3",
                "UTE_BISON_MEAT_PRODUCT_4", "UTE_BISON_MEAT_PRODUCT_5", "UTE_BISON_MEAT_PRODUCT_6",
                "UTE_BISON_MEAT_PRODUCT_7", "UTE_BISON_MEAT_PRODUCT_8", "UTE_BISON_MEAT_PRODUCT_9",
                "UTE_BISON_MEAT_PRODUCT_10"
            ],
            'type': 'photography',
            'featured': True,
            'orientation': 'mixed',
            'skills_utilized': [
                "Professional Food Photography", "Product Styling & Presentation", "Studio Lighting with Limited Resources",
                "Backdrop & Prop Coordination", "Adobe Photoshop Editing", "Temperature-Sensitive Product Handling",
                "Logistics Coordination", "Food Safety & Handling", "Color Correction for Food Products",
                "Social Media Marketing Photography", "Advertisement Photography", "Product Listing Optimization"
            ],
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        
        # Insert both projects
        aigata_result = db.projects.insert_one(aigata_project)
        bison_result = db.projects.insert_one(bison_project)
        
        print(f"\n✅ Successfully added Aigata Brand Photography project (ID: {aigata_project['id']})")
        print("   📷 15 scrollable product images (candles & chocolate)")
        print("   🛍️ E-commerce & advertising focus")
        print("   💡 Professional lighting, props, and Photoshop skills")
        
        print(f"\n✅ Successfully added Ute Bison Ranch Photography project (ID: {bison_project['id']})")
        print("   📷 10 scrollable bison meat product images")
        print("   🥩 Professional food photography with logistics coordination")
        print("   ❄️ Temperature-sensitive product handling expertise")
        
    except Exception as e:
        print(f"❌ Error adding photography projects: {e}")

if __name__ == "__main__":
    print("🔄 Adding product photography projects and updating Facebook Reels stats...")
    add_photography_projects()
    print("\n✅ Photography projects and Facebook Reels update complete!")