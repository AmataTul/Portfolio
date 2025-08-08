#!/usr/bin/env python3

import os
import sys
sys.path.append('/app/backend')

from pymongo import MongoClient
from models import Project
import json

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/portfolio_db')
client = MongoClient(MONGO_URL)
db = client.get_database()

def update_photography_categories():
    """Update both photography projects to Photography category and update Aigata description"""
    
    try:
        # Update Aigata Brand photography project
        aigata_result = db.projects.update_one(
            {"title": {"$regex": "Aigata.*Handmade Candles", "$options": "i"}},
            {"$set": {
                "category": "Photography",
                "description": "Professional product photography for my own business, Aigata Brand, featuring handmade candles and artisan chocolate collection. Created high-quality product images for my personal brand's e-commerce listings and digital advertising campaigns. As the business owner, I personally photographed and styled each product to showcase the craftsmanship and premium quality of my handmade candles and chocolate products, ensuring authentic representation of my brand's artisanal approach."
            }}
        )
        
        # Update Ute Bison Ranch photography project
        bison_result = db.projects.update_one(
            {"title": {"$regex": "Ute Bison Ranch.*Premium Bison Meat", "$options": "i"}},
            {"$set": {
                "category": "Photography"
            }}
        )
        
        if aigata_result.modified_count > 0:
            print("✅ Successfully updated Aigata Brand Photography project:")
            print("   📸 Category: Changed to 'Photography'")
            print("   📝 Description: Updated to emphasize personal business ownership")
            print("   🕯️ Highlights: 'my own business', 'personal brand', 'business owner'")
        else:
            print("⚠️ Aigata Brand project not found or already updated")
            
        if bison_result.modified_count > 0:
            print("✅ Successfully updated Ute Bison Ranch Photography project:")
            print("   📸 Category: Changed to 'Photography'")
        else:
            print("⚠️ Ute Bison Ranch project not found or already updated")
            
        # Check category distribution
        photography_projects = list(db.projects.find({"category": "Photography"}, {"title": 1}))
        print(f"\n📸 Total projects now in 'Photography' category: {len(photography_projects)}")
        for project in photography_projects:
            print(f"   • {project['title']}")
        
    except Exception as e:
        print(f"❌ Error updating photography categories: {e}")

if __name__ == "__main__":
    print("🔄 Updating photography project categories...")
    update_photography_categories()
    print("✅ Photography category updates complete!")