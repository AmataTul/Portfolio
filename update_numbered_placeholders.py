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

def update_social_media_with_numbered_placeholders():
    """Update the Multi-Business Social Media Posts project with 6.jpg to 30.jpg placeholders"""
    
    # Updated social media posts with 6.jpg to 30.jpg placeholders
    updated_posts = [
        # First 5 posts have real uploaded images (1-5)
        { "placeholder": "https://customer-assets.emergentagent.com/job_project-showcase-20/artifacts/fzl5cjdl_2.jpg", "business": "Ute Bison Ranch", "likes": 124, "shares": 18, "comments": 23, "type": "promotional" },
        { "placeholder": "https://customer-assets.emergentagent.com/job_project-showcase-20/artifacts/ho81nlun_1.jpg", "business": "Ute Bison Ranch", "likes": 89, "shares": 12, "comments": 16, "type": "promotional" },
        { "placeholder": "https://customer-assets.emergentagent.com/job_project-showcase-20/artifacts/k38jbmdp_5.jpg", "business": "KahPeeh Kah-Ahn Ute Coffee House & Soda", "likes": 156, "shares": 31, "comments": 42, "type": "promotional" },
        { "placeholder": "https://customer-assets.emergentagent.com/job_project-showcase-20/artifacts/p0p5ps8h_3.jpg", "business": "Ute Bison Ranch", "likes": 201, "shares": 24, "comments": 35, "type": "product_showcase" },
        { "placeholder": "https://customer-assets.emergentagent.com/job_project-showcase-20/artifacts/1sp42bds_4.jpg", "business": "Ute Bison Ranch", "likes": 178, "shares": 29, "comments": 51, "type": "educational_content" },
        
        # Remaining placeholders 6-30
        { "placeholder": "6.jpg", "business": "Ute Tribal Enterprises", "likes": 95, "shares": 14, "comments": 19, "type": "advertisement" },
        { "placeholder": "7.jpg", "business": "Ute Tribal Enterprises", "likes": 143, "shares": 22, "comments": 28, "type": "promotional" },
        { "placeholder": "8.jpg", "business": "Ute Tribal Enterprises", "likes": 167, "shares": 33, "comments": 46, "type": "community_engagement" },
        
        # Ute Bison Ranch posts (8 posts)
        { "placeholder": "9.jpg", "business": "Ute Bison Ranch", "likes": 289, "shares": 45, "comments": 67, "type": "promotional" },
        { "placeholder": "10.jpg", "business": "Ute Bison Ranch", "likes": 234, "shares": 38, "comments": 52, "type": "behind_scenes" },
        { "placeholder": "11.jpg", "business": "Ute Bison Ranch", "likes": 198, "shares": 27, "comments": 41, "type": "event_coverage" },
        { "placeholder": "12.jpg", "business": "Ute Bison Ranch", "likes": 312, "shares": 56, "comments": 78, "type": "advertisement" },
        { "placeholder": "13.jpg", "business": "Ute Bison Ranch", "likes": 176, "shares": 31, "comments": 44, "type": "progress_update" },
        { "placeholder": "14.jpg", "business": "Ute Bison Ranch", "likes": 145, "shares": 19, "comments": 33, "type": "promotional" },
        { "placeholder": "15.jpg", "business": "Ute Bison Ranch", "likes": 267, "shares": 42, "comments": 59, "type": "community_engagement" },
        { "placeholder": "16.jpg", "business": "Ute Bison Ranch", "likes": 223, "shares": 35, "comments": 48, "type": "behind_scenes" },
        
        # Ute Plaza Supermarket posts (7 posts)
        { "placeholder": "17.jpg", "business": "Ute Plaza Supermarket", "likes": 134, "shares": 21, "comments": 29, "type": "promotional" },
        { "placeholder": "18.jpg", "business": "Ute Plaza Supermarket", "likes": 98, "shares": 15, "comments": 22, "type": "advertisement" },
        { "placeholder": "19.jpg", "business": "Ute Plaza Supermarket", "likes": 167, "shares": 28, "comments": 36, "type": "event_coverage" },
        { "placeholder": "20.jpg", "business": "Ute Plaza Supermarket", "likes": 189, "shares": 32, "comments": 43, "type": "behind_scenes" },
        { "placeholder": "21.jpg", "business": "Ute Plaza Supermarket", "likes": 156, "shares": 24, "comments": 31, "type": "promotional" },
        { "placeholder": "22.jpg", "business": "Ute Plaza Supermarket", "likes": 112, "shares": 18, "comments": 25, "type": "community_engagement" },
        { "placeholder": "23.jpg", "business": "Ute Plaza Supermarket", "likes": 143, "shares": 26, "comments": 34, "type": "progress_update" },
        
        # KahPeeh Kah-Ahn Coffee House posts (7 posts)
        { "placeholder": "24.jpg", "business": "KahPeeh Kah-Ahn Ute Coffee House & Soda", "likes": 245, "shares": 41, "comments": 58, "type": "promotional" },
        { "placeholder": "25.jpg", "business": "KahPeeh Kah-Ahn Ute Coffee House & Soda", "likes": 198, "shares": 34, "comments": 47, "type": "behind_scenes" },
        { "placeholder": "26.jpg", "business": "KahPeeh Kah-Ahn Ute Coffee House & Soda", "likes": 167, "shares": 29, "comments": 39, "type": "event_coverage" },
        { "placeholder": "27.jpg", "business": "KahPeeh Kah-Ahn Ute Coffee House & Soda", "likes": 287, "shares": 48, "comments": 65, "type": "advertisement" },
        { "placeholder": "28.jpg", "business": "KahPeeh Kah-Ahn Ute Coffee House & Soda", "likes": 156, "shares": 27, "comments": 38, "type": "promotional" },
        { "placeholder": "29.jpg", "business": "KahPeeh Kah-Ahn Ute Coffee House & Soda", "likes": 134, "shares": 23, "comments": 32, "type": "volunteer_initiative" },
        { "placeholder": "30.jpg", "business": "KahPeeh Kah-Ahn Ute Coffee House & Soda", "likes": 201, "shares": 36, "comments": 49, "type": "community_engagement" }
    ]
    
    try:
        # Find and update the Multi-Business Social Media Posts project
        project = db.projects.find_one({"title": "Multi-Business Social Media Posts - Comprehensive Content Creation Campaign"})
        
        if project:
            # Update the images array with the new posts structure
            result = db.projects.update_one(
                {"title": "Multi-Business Social Media Posts - Comprehensive Content Creation Campaign"}, 
                {"$set": {"images": updated_posts}}
            )
            
            if result.modified_count > 0:
                print(f"✅ Successfully updated Multi-Business Social Media Posts project with {len(updated_posts)} posts")
                print(f"✅ First 5 posts have real uploaded images (1-5)")
                print(f"✅ Remaining 25 posts now use numbered placeholders (6.jpg through 30.jpg)")
                
                # Count different types of placeholders
                numbered_placeholders = [p for p in updated_posts if p['placeholder'].endswith('.jpg') and not p['placeholder'].startswith('http')]
                print(f"✅ Added {len(numbered_placeholders)} numbered placeholder images:")
                for i, p in enumerate(numbered_placeholders[:5]):  # Show first 5 as example
                    print(f"   - {p['placeholder']}: {p['business']} ({p['type']})")
                if len(numbered_placeholders) > 5:
                    print(f"   ... and {len(numbered_placeholders) - 5} more")
                    
            else:
                print("⚠️ No changes were made to the project")
        else:
            print("❌ Multi-Business Social Media Posts project not found in database")
    
    except Exception as e:
        print(f"❌ Error updating social media posts: {e}")

if __name__ == "__main__":
    print("🔄 Updating Multi-Business Social Media Posts with numbered placeholders (6-30)...")
    update_social_media_with_numbered_placeholders()
    print("✅ Numbered placeholders update complete")