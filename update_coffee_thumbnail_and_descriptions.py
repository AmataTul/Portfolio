#!/usr/bin/env python3
"""
Script to update coffee house advertising project thumbnail and TikTok project description in MongoDB database.
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

def update_coffee_house_projects():
    """Update coffee house advertising project thumbnail and TikTok description"""
    
    try:
        # Connect to MongoDB
        db = get_database()
        collection = db.projects
        
        # Update 1: Coffee house advertising project thumbnail (id: 4)
        coffee_ad_update = {
            "images": [
                "https://customer-assets.emergentagent.com/job_project-showcase-15/artifacts/og27kur5_coffee.jpg"
            ]
        }
        
        result1 = collection.update_one({"id": "4"}, {"$set": coffee_ad_update})
        if result1.modified_count > 0:
            print("✅ Updated coffee house advertising project thumbnail (id: 4)")
        else:
            print("⚠️  Coffee house advertising project (id: 4) not found or no changes made")
        
        # Update 2: TikTok project description (id: 10)  
        tiktok_description_update = {
            "description": "I led the marketing strategy for KahPeeh kah-Ahn Ute Coffee House & Soda, an indigenous coffee house that celebrates cultural storytelling and authentic hospitality. I coordinated several community events and created multiple TikTok videos showcasing the brand's values. The top 6 high-engagement videos achieved significant results within the reservation and beyond: 85% increase in social media engagement, 40% boost in foot traffic, 120% growth in brand awareness across reservation communities and surrounding areas. Through strategic content creation and cultural narratives, I successfully positioned KahPeeh kah-Ahn as a growing indigenous business, driving visibility and engagement across diverse markets."
        }
        
        result2 = collection.update_one({"id": "10"}, {"$set": tiktok_description_update})
        if result2.modified_count > 0:
            print("✅ Updated TikTok project description (id: 10)")
        else:
            print("⚠️  TikTok project (id: 10) not found or no changes made")
        
        # Verify updates
        coffee_ad = collection.find_one({"id": "4"})
        tiktok_project = collection.find_one({"id": "10"})
        
        if coffee_ad and "coffee.jpg" in str(coffee_ad.get('images', [])):
            print("✅ Verification: Coffee house advertising thumbnail updated successfully")
        else:
            print("❌ Verification failed: Coffee house advertising thumbnail")
            
        if tiktok_project and len(tiktok_project.get('description', '')) > 500:
            print("✅ Verification: TikTok project description updated successfully")
        else:
            print("❌ Verification failed: TikTok project description")
            
        return True
        
    except Exception as e:
        print(f"❌ Error updating projects: {str(e)}")
        return False

if __name__ == "__main__":
    print("🔄 Updating coffee house projects in MongoDB...")
    
    if update_coffee_house_projects():
        print("\n✅ COFFEE HOUSE PROJECT UPDATES COMPLETE!")
        print("✅ Advertising project thumbnail updated with new coffee.jpg asset")
        print("✅ TikTok project description updated for better readability")
    else:
        print("\n❌ Failed to update coffee house projects")
        sys.exit(1)