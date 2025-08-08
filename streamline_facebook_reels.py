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

def update_facebook_reels_streamlined():
    """Update Facebook Reels project with streamlined design"""
    
    try:
        # Update the existing Facebook Reels project
        result = db.projects.update_one(
            {"title": {"$regex": "Strategic Facebook Reels", "$options": "i"}},
            {
                "$set": {
                    "title": "Holiday Campaign Reels - Ute Plaza Supermarket",
                    "facebookReels.sectionTitle": "Seasonal Facebook Reels – Ute Plaza Supermarket Campaign",
                    "facebookReels.videosSubtitle": "Comprehensive seasonal marketing campaign featuring 4 strategic Facebook Reels designed to drive holiday shopping traffic and boost seasonal merchandise sales at Ute Plaza Supermarket. Each video strategically targets different holiday periods (Christmas, Valentine's Day, Easter) with engaging vertical content optimized for mobile viewing and social media engagement. The campaign showcases festive store displays, seasonal products, and promotional merchandise to attract customers during peak holiday shopping seasons, supporting the supermarket's revenue goals through compelling visual storytelling and strategic social media marketing."
                },
                "$unset": {
                    "description": "",
                    "facebookReels.videosTitle": "",
                    "impact": ""
                }
            }
        )
        
        if result.modified_count > 0:
            print("✅ Successfully updated Facebook Reels project:")
            print("   ✅ Title: 'Holiday Campaign Reels - Ute Plaza Supermarket'")
            print("   ✅ Section Title: 'Seasonal Facebook Reels – Ute Plaza Supermarket Campaign'")
            print("   ✅ Removed main description (streamlined to reels only)")
            print("   ✅ Removed '4 Strategic Holiday Marketing Videos'")
            print("   ✅ Removed project impact section")
            print("   ✅ Updated subtitle with comprehensive description")
        else:
            print("⚠️ No Facebook Reels project found to update")
            
    except Exception as e:
        print(f"❌ Error updating Facebook Reels project: {e}")

if __name__ == "__main__":
    print("🔄 Streamlining Facebook Reels project...")
    update_facebook_reels_streamlined()
    print("✅ Facebook Reels streamlining complete")