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

def final_streamline_facebook_reels():
    """Final streamlining: new Valentine's URL, shortened description, remove image"""
    
    try:
        # Update the Facebook Reels project with final changes
        result = db.projects.update_one(
            {"title": "Holiday Campaign Reels - Ute Plaza Supermarket"},
            {
                "$set": {
                    "facebookReels.videosSubtitle": "Seasonal marketing campaign with 4 strategic Facebook Reels to boost holiday traffic and merchandise sales at Ute Plaza Supermarket. Each video targets key holidays (Christmas, Valentine's Day, Easter), using engaging vertical content to showcase festive displays and promotions, driving mobile engagement and in-store visits.",
                    "facebookReels.videos.1.url": "https://fb.watch/Bl0G-WI0oO/"
                },
                "$unset": {
                    "images": ""
                }
            }
        )
        
        if result.modified_count > 0:
            print("✅ Successfully applied final streamlining:")
            print("   ✅ Updated Valentine's Day video URL: https://fb.watch/Bl0G-WI0oO/")
            print("   ✅ Shortened description to concise version")
            print("   ✅ Removed project thumbnail image completely")
            print("   ✅ Project is now fully streamlined - Facebook Reels only!")
        else:
            print("⚠️ No Facebook Reels project found to update")
            
    except Exception as e:
        print(f"❌ Error applying final streamlining: {e}")

if __name__ == "__main__":
    print("🔄 Applying final streamlining to Facebook Reels project...")
    final_streamline_facebook_reels()
    print("✅ Final streamlining complete")