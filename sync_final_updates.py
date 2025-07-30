#!/usr/bin/env python3
"""
Script to sync all final updates:
1. Rename category from "Graphic Design & Marketing Materials" to "Graphic Design"
2. Add new social media posts project (ID: 16)
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

def rename_graphics_category():
    """Rename Graphics category to Graphic Design"""
    try:
        db = get_database()
        collection = db.projects
        
        # Update all projects with the old category name
        result = collection.update_many(
            {"category": "Graphic Design & Marketing Materials"}, 
            {"$set": {"category": "Graphic Design"}}
        )
        
        if result.modified_count > 0:
            print(f"✅ Renamed category for {result.modified_count} projects from 'Graphic Design & Marketing Materials' to 'Graphic Design'")
            return True
        else:
            print("⚠️  No projects found with old category name or already updated")
            return True  # This is okay, might already be updated
            
    except Exception as e:
        print(f"❌ Error renaming graphics category: {str(e)}")
        return False

def add_social_media_posts_project():
    """Add new social media posts project"""
    
    # New social media posts project data
    social_media_project = {
        "id": "16",
        "title": "Multi-Business Social Media Posts - Comprehensive Content Creation Campaign",
        "category": "Social Media Content & Campaigns",
        "client": "Ute Tribal Enterprises & Associated Businesses",
        "project_type": "Multi-Platform Social Media Content Strategy & Creation",
        "description": "Comprehensive social media content creation campaign across multiple Ute Tribal Enterprise businesses including Ute Tribal Enterprises, Kah-Peeh kah-Ahn Ute Coffee House & Soda, Ute Plaza Supermarket, and Ute Bison Ranch. I created diverse content including promotional posts, event coverage, volunteering initiatives, progress updates, behind-the-scenes content, advertisements, and various graphics. The purpose was to increase social media engagement, boost exposure, drive traffic, and strengthen community connections across all business platforms. Each post was strategically crafted to align with business objectives while maintaining authentic brand voice and cultural sensitivity.",
        "images": [
            "SOCIAL_MEDIA_POST_1", "SOCIAL_MEDIA_POST_2", "SOCIAL_MEDIA_POST_3", "SOCIAL_MEDIA_POST_4",
            "SOCIAL_MEDIA_POST_5", "SOCIAL_MEDIA_POST_6", "SOCIAL_MEDIA_POST_7", "SOCIAL_MEDIA_POST_8", 
            "SOCIAL_MEDIA_POST_9", "SOCIAL_MEDIA_POST_10", "SOCIAL_MEDIA_POST_11", "SOCIAL_MEDIA_POST_12",
            "SOCIAL_MEDIA_POST_13", "SOCIAL_MEDIA_POST_14", "SOCIAL_MEDIA_POST_15", "SOCIAL_MEDIA_POST_16",
            "SOCIAL_MEDIA_POST_17", "SOCIAL_MEDIA_POST_18", "SOCIAL_MEDIA_POST_19", "SOCIAL_MEDIA_POST_20"
        ],
        "type": "social",
        "featured": True,
        "orientation": "mixed",
        "key_contributions": [
            "Created comprehensive social media content strategy across four major Ute Tribal Enterprise businesses",
            "Developed promotional posts, event coverage, and behind-the-scenes content to increase engagement and visibility",
            "Coordinated volunteer initiative coverage and progress update posts showcasing community involvement and business growth",
            "Designed advertisements and promotional graphics optimized for social media platforms to drive traffic and sales",
            "Maintained consistent brand voice and cultural sensitivity across all business social media accounts",
            "Implemented strategic content planning to maximize exposure and strengthen community connections for indigenous businesses"
        ],
        "skills_utilized": [
            "Multi-Business Social Media Strategy",
            "Content Creation & Curation",
            "Brand Voice Development", 
            "Community Engagement Management",
            "Event Coverage & Documentation",
            "Behind-the-Scenes Content Creation",
            "Promotional Graphics Design",
            "Cultural Sensitivity in Marketing",
            "Cross-Platform Content Optimization",
            "Indigenous Business Promotion"
        ]
    }

    try:
        # Connect to MongoDB
        db = get_database()
        collection = db.projects
        
        # Check if project already exists
        existing_project = collection.find_one({"id": "16"})
        if existing_project:
            print("✅ Social media posts project with ID 16 already exists. Updating...")
            result = collection.update_one({"id": "16"}, {"$set": social_media_project})
            print(f"✅ Updated existing social media project. Modified count: {result.modified_count}")
        else:
            # Insert the new project
            result = collection.insert_one(social_media_project)
            print(f"✅ Successfully added social media posts project to database")
            print(f"✅ Inserted ID: {result.inserted_id}")
        
        # Verify the project was added
        verification = collection.find_one({"id": "16"})
        if verification:
            print(f"✅ Verification successful: Project '{verification['title'][:50]}...' found in database")
            print(f"✅ Category: {verification['category']}")
            print(f"✅ Images count: {len(verification.get('images', []))}")
            return True
        else:
            print("❌ Verification failed: Social media posts project not found after insertion")
            return False
            
    except Exception as e:
        print(f"❌ Error adding social media posts project: {str(e)}")
        return False

if __name__ == "__main__":
    print("🔄 Syncing final portfolio updates...")
    
    success_count = 0
    
    # Update 1: Rename graphics category
    if rename_graphics_category():
        success_count += 1
    
    # Update 2: Add social media posts project
    if add_social_media_posts_project():
        success_count += 1
    
    if success_count == 2:
        print("\\n✅ ALL FINAL UPDATES COMPLETE!")
        print("✅ Category renamed from 'Graphic Design & Marketing Materials' to 'Graphic Design'")
        print("✅ New Multi-Business Social Media Posts project added (ID: 16)")
        print("✅ Portfolio includes:")
        print("  • Comprehensive social media strategy across 4 businesses")
        print("  • Promotional posts, events, volunteering, behind-the-scenes content")
        print("  • Ute Tribal Enterprises, Coffee House, Supermarket, Bison Ranch")
        print("  • 20 social media post placeholders ready for upload")
    else:
        print(f"\\n⚠️  Completed {success_count}/2 updates")
        if success_count == 0:
            sys.exit(1)