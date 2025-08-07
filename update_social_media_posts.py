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

def update_social_media_posts():
    """Update the Multi-Business Social Media Posts project with new uploaded images"""
    
    # Updated social media posts with new uploaded images
    updated_posts = [
        # First 5 posts now have real uploaded images
        { "placeholder": "https://customer-assets.emergentagent.com/job_project-showcase-20/artifacts/w9d5a58c_bandicam%202025-07-29%2017-32-59-176.jpg", "business": "Ute Bison Ranch", "likes": 124, "shares": 18, "comments": 23, "type": "promotional" },
        { "placeholder": "https://customer-assets.emergentagent.com/job_project-showcase-20/artifacts/6m82f0jp_bandicam%202025-07-29%2017-40-47-752.jpg", "business": "Ute Bison Ranch", "likes": 89, "shares": 12, "comments": 16, "type": "promotional" },
        { "placeholder": "https://customer-assets.emergentagent.com/job_project-showcase-20/artifacts/4m8i6vmt_3.jpg", "business": "KahPeeh Kah-Ahn Ute Coffee House & Soda", "likes": 156, "shares": 31, "comments": 42, "type": "promotional" },
        { "placeholder": "https://customer-assets.emergentagent.com/job_project-showcase-20/artifacts/0c5vivjr_4.jpg", "business": "Ute Bison Ranch", "likes": 201, "shares": 24, "comments": 35, "type": "product_showcase" },
        { "placeholder": "https://customer-assets.emergentagent.com/job_project-showcase-20/artifacts/zapufvso_5.jpg", "business": "Ute Bison Ranch", "likes": 178, "shares": 29, "comments": 51, "type": "educational_content" },
        
        # Remaining placeholder posts
        { "placeholder": "UTE_TRIBAL_POST_6", "business": "Ute Tribal Enterprises", "likes": 95, "shares": 14, "comments": 19, "type": "advertisement" },
        { "placeholder": "UTE_TRIBAL_POST_7", "business": "Ute Tribal Enterprises", "likes": 143, "shares": 22, "comments": 28, "type": "promotional" },
        { "placeholder": "UTE_TRIBAL_POST_8", "business": "Ute Tribal Enterprises", "likes": 167, "shares": 33, "comments": 46, "type": "community_engagement" },
        
        # Ute Bison Ranch posts (8 posts)
        { "placeholder": "UTE_BISON_POST_1", "business": "Ute Bison Ranch", "likes": 289, "shares": 45, "comments": 67, "type": "promotional" },
        { "placeholder": "UTE_BISON_POST_2", "business": "Ute Bison Ranch", "likes": 234, "shares": 38, "comments": 52, "type": "behind_scenes" },
        { "placeholder": "UTE_BISON_POST_3", "business": "Ute Bison Ranch", "likes": 198, "shares": 27, "comments": 41, "type": "event_coverage" },
        { "placeholder": "UTE_BISON_POST_4", "business": "Ute Bison Ranch", "likes": 312, "shares": 56, "comments": 78, "type": "advertisement" },
        { "placeholder": "UTE_BISON_POST_5", "business": "Ute Bison Ranch", "likes": 176, "shares": 31, "comments": 44, "type": "progress_update" },
        { "placeholder": "UTE_BISON_POST_6", "business": "Ute Bison Ranch", "likes": 145, "shares": 19, "comments": 33, "type": "promotional" },
        { "placeholder": "UTE_BISON_POST_7", "business": "Ute Bison Ranch", "likes": 267, "shares": 42, "comments": 59, "type": "community_engagement" },
        { "placeholder": "UTE_BISON_POST_8", "business": "Ute Bison Ranch", "likes": 223, "shares": 35, "comments": 48, "type": "behind_scenes" },
        
        # Ute Plaza Supermarket posts (7 posts)
        { "placeholder": "UTE_PLAZA_POST_1", "business": "Ute Plaza Supermarket", "likes": 134, "shares": 21, "comments": 29, "type": "promotional" },
        { "placeholder": "UTE_PLAZA_POST_2", "business": "Ute Plaza Supermarket", "likes": 98, "shares": 15, "comments": 22, "type": "advertisement" },
        { "placeholder": "UTE_PLAZA_POST_3", "business": "Ute Plaza Supermarket", "likes": 167, "shares": 28, "comments": 36, "type": "event_coverage" },
        { "placeholder": "UTE_PLAZA_POST_4", "business": "Ute Plaza Supermarket", "likes": 189, "shares": 32, "comments": 43, "type": "behind_scenes" },
        { "placeholder": "UTE_PLAZA_POST_5", "business": "Ute Plaza Supermarket", "likes": 156, "shares": 24, "comments": 31, "type": "promotional" },
        { "placeholder": "UTE_PLAZA_POST_6", "business": "Ute Plaza Supermarket", "likes": 112, "shares": 18, "comments": 25, "type": "community_engagement" },
        { "placeholder": "UTE_PLAZA_POST_7", "business": "Ute Plaza Supermarket", "likes": 143, "shares": 26, "comments": 34, "type": "progress_update" },
        
        # KahPeeh Kah-Ahn Coffee House posts (7 posts)
        { "placeholder": "COFFEE_HOUSE_POST_1", "business": "KahPeeh Kah-Ahn Ute Coffee House & Soda", "likes": 245, "shares": 41, "comments": 58, "type": "promotional" },
        { "placeholder": "COFFEE_HOUSE_POST_2", "business": "KahPeeh Kah-Ahn Ute Coffee House & Soda", "likes": 198, "shares": 34, "comments": 47, "type": "behind_scenes" },
        { "placeholder": "COFFEE_HOUSE_POST_3", "business": "KahPeeh Kah-Ahn Ute Coffee House & Soda", "likes": 167, "shares": 29, "comments": 39, "type": "event_coverage" },
        { "placeholder": "COFFEE_HOUSE_POST_4", "business": "KahPeeh Kah-Ahn Ute Coffee House & Soda", "likes": 287, "shares": 48, "comments": 65, "type": "advertisement" },
        { "placeholder": "COFFEE_HOUSE_POST_5", "business": "KahPeeh Kah-Ahn Ute Coffee House & Soda", "likes": 156, "shares": 27, "comments": 38, "type": "promotional" },
        { "placeholder": "COFFEE_HOUSE_POST_6", "business": "KahPeeh Kah-Ahn Ute Coffee House & Soda", "likes": 134, "shares": 23, "comments": 32, "type": "volunteer_initiative" },
        { "placeholder": "COFFEE_HOUSE_POST_7", "business": "KahPeeh Kah-Ahn Ute Coffee House & Soda", "likes": 201, "shares": 36, "comments": 49, "type": "community_engagement" }
    ]
    
    try:
        # Find and update the Multi-Business Social Media Posts project
        project = db.projects.find_one({"id": 17})  # Multi-Business Social Media Posts project ID
        
        if project:
            # Update the images array with the new posts structure
            project['images'] = updated_posts
            
            # Update the project in database
            result = db.projects.update_one(
                {"id": 17}, 
                {"$set": {"images": updated_posts}}
            )
            
            if result.modified_count > 0:
                print(f"✅ Successfully updated Multi-Business Social Media Posts project with {len(updated_posts)} posts")
                print(f"✅ First 5 posts now have real uploaded social media images")
                print(f"✅ Remaining {len(updated_posts)-5} posts still use placeholders")
            else:
                print("⚠️ No changes were made to the project")
        else:
            print("❌ Multi-Business Social Media Posts project not found in database")
    
    except Exception as e:
        print(f"❌ Error updating social media posts: {e}")

if __name__ == "__main__":
    print("🔄 Updating Multi-Business Social Media Posts with uploaded images...")
    update_social_media_posts()
    print("✅ Social media posts update complete")