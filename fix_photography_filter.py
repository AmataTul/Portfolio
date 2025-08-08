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

def fix_photography_filter_category():
    """Fix photography projects to use 'Photography Projects' category to match filter"""
    
    try:
        # Update both photography projects to use correct category name
        result = db.projects.update_many(
            {
                "$or": [
                    {"title": {"$regex": "Aigata.*Handmade Candles", "$options": "i"}},
                    {"title": {"$regex": "Ute Bison Ranch.*Premium Bison Meat", "$options": "i"}}
                ]
            },
            {"$set": {"category": "Photography Projects"}}
        )
        
        if result.modified_count > 0:
            print(f"✅ Successfully updated {result.modified_count} photography projects:")
            print("   📸 Category: Changed from 'Photography' to 'Photography Projects'")
            print("   🔗 Now matches the filter category exactly")
        else:
            print("⚠️ Photography projects not found or already have correct category")
            
        # Verify the update
        photography_projects = list(db.projects.find(
            {"category": "Photography Projects"}, 
            {"title": 1, "category": 1}
        ))
        
        print(f"\n📸 Projects now in 'Photography Projects' category: {len(photography_projects)}")
        for project in photography_projects:
            print(f"   • {project['title']} (Category: {project['category']})")
        
    except Exception as e:
        print(f"❌ Error fixing photography filter category: {e}")

if __name__ == "__main__":
    print("🔄 Fixing photography projects category for filter compatibility...")
    fix_photography_filter_category()
    print("✅ Photography filter fix complete!")