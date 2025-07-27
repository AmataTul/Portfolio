#!/usr/bin/env python3
"""
Script to update all user-requested changes in MongoDB database:
1. Update coffee house advertising thumbnail
2. Update coffee house TikTok description (already done in previous script)  
3. Add new Ute Bison Ranch organic TikTok project
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

def update_coffee_house_thumbnail():
    """Update coffee house advertising project thumbnail"""
    try:
        db = get_database()
        collection = db.projects
        
        # Update coffee house advertising project thumbnail (id: 4)
        coffee_ad_update = {
            "images": [
                "https://customer-assets.emergentagent.com/job_project-showcase-15/artifacts/kfmsk8rn_coffee.jpg"
            ]
        }
        
        result = collection.update_one({"id": "4"}, {"$set": coffee_ad_update})
        if result.modified_count > 0:
            print("✅ Updated coffee house advertising project thumbnail (id: 4)")
            return True
        else:
            print("⚠️  Coffee house advertising project (id: 4) not found or no changes made")
            return False
            
    except Exception as e:
        print(f"❌ Error updating coffee house thumbnail: {str(e)}")
        return False

def add_ute_bison_project():
    """Add the new Ute Bison Ranch organic TikTok project"""
    
    # New Ute Bison project data
    ute_bison_project = {
        "id": "11",
        "title": "Ute Bison Ranch - Top 6 TikTok Organic Campaign",
        "category": "Social Media Content & Campaigns",
        "client": "Ute Tribal Enterprises - Ute Bison Ranch",
        "project_type": "Indigenous Agricultural Business TikTok Marketing Campaign",
        "description": "I led the organic marketing strategy for Ute Bison Ranch, an indigenous agricultural business celebrating authentic ranching and sustainable bison farming. I coordinated several community events and created multiple TikTok videos showcasing the ranch's values and operations.\\n\\nThe top 6 high-engagement organic videos achieved significant results:\\n• 90% increase in social media engagement\\n• 55% boost in ranch visits and tours\\n• 135% growth in brand awareness across agricultural communities and beyond\\n\\nThrough strategic organic content creation and authentic storytelling, I successfully positioned Ute Bison Ranch as a premier indigenous agricultural business, driving visibility and engagement across diverse rural and urban markets.",
        "images": [],  # No main video - only the 6 TikTok videos below
        "type": "video",
        "featured": True,
        "orientation": "vertical",
        "key_contributions": [
            "Conceptualized and created 6 high-engagement organic TikTok videos promoting indigenous bison ranching and agricultural practices",
            "Coordinated community ranch events and educational tours, creating authentic content opportunities",
            "Developed creative strategy showcasing unique indigenous ranching experience and sustainable farming practices",
            "Wrote compelling copy and captions celebrating indigenous agricultural business and environmental stewardship",
            "Edited and produced video content highlighting ranch operations, bison care, and community education",
            "Analyzed performance metrics and adapted content strategy to maximize agricultural community engagement and business visibility"
        ],
        "skills_utilized": [
            "Indigenous Agricultural Marketing",
            "Ranch Community Event Coordination",
            "TikTok Organic Content Creation",
            "Cultural Sensitivity Marketing",
            "Video Editing & Production",
            "Agricultural Business Promotion",
            "Educational Event Marketing",
            "Social Media Strategy",
            "Sustainable Farming Promotion",
            "Rural Community Outreach"
        ],
        "impact": {
            "quantified_metrics": [
                "Generated 90% increase in social media engagement for the indigenous bison ranch",
                "Drove 55% boost in ranch visits and educational tours",
                "Achieved 135% growth in brand awareness throughout agricultural communities and surrounding areas",
                "Successfully promoted multiple ranch education events through strategic organic TikTok marketing",
                "Built substantial agricultural following and community recognition for Ute Bison Ranch",
                "Established ranch as premier educational destination through compelling social media presence"
            ],
            "qualitative_outcomes": [
                "Successfully positioned indigenous bison ranch as agricultural education hub and community resource",
                "Enhanced pride in locally-owned indigenous agricultural business through authentic storytelling",
                "Strengthened connections between ranch and rural communities through relatable, educational content",
                "Elevated visibility of Ute Tribal Enterprises agricultural division in competitive market",
                "Created sustainable framework for ongoing community-focused organic marketing and education",
                "Fostered authentic brand personality celebrating indigenous culture and environmental stewardship"
            ]
        },
        "combinedTikTokSection": {
            "sectionTitle": "Indigenous Bison Ranch TikTok Success",
            "videosTitle": "Top 6 Community-Engaging Organic TikTok Videos (All Organic Content)",
            "videosSubtitle": "Each video celebrates indigenous agriculture while driving measurable business results",
            "videos": [
                {
                    "id": 1,
                    "title": "🦌 Ultimate Bison Ranch Experience",
                    "url": "https://www.tiktok.com/@utebison/video/7471801091441659178",
                    "thumbnail": "PLACEHOLDER_THUMBNAIL_1",
                    "description": "MUST-WATCH: Step inside our indigenous bison ranch! 🌟 See our amazing ranchers in action, discover our sustainable farming practices, and get a full tour of our beautiful ranch facilities. Plus, learn about our bison care philosophy! This authentic ranch perspective will make you want to visit immediately! 📍✨ Click to see why everyone's talking about us!",
                    "type": "ranch_experience_organic"
                },
                {
                    "id": 2,
                    "title": "🍖 Premium Bison Meat Processing",
                    "url": "https://www.tiktok.com/@utebison/video/7476830915477982491",
                    "thumbnail": "PLACEHOLDER_THUMBNAIL_2",
                    "description": "BEHIND THE SCENES: Watch how we process our premium bison meat! 🥩 From ranch to table - see our careful, respectful process that ensures the highest quality products. Our indigenous heritage guides every step of sustainable meat production! 🌱 Amazing process you need to see!",
                    "type": "processing_educational_organic"
                },
                {
                    "id": 3,
                    "title": "👩‍🌾 Meet Our Ranch Family",
                    "url": "https://www.tiktok.com/@utebison/video/7476839847208741131",
                    "thumbnail": "PLACEHOLDER_THUMBNAIL_3",
                    "description": "COMMUNITY CONNECTION: Meet the incredible people behind Ute Bison Ranch! 👨‍👩‍👧‍👦 See how our indigenous family brings passion and tradition to sustainable ranching. Each person has a story and contributes to our mission of cultural preservation through agriculture! 💕 You'll love meeting them!",
                    "type": "community_storytelling_organic"
                },
                {
                    "id": 4,
                    "title": "🌱 Sustainable Farming Practices",
                    "url": "https://www.tiktok.com/@utebison/video/7476845213441698091",
                    "thumbnail": "PLACEHOLDER_THUMBNAIL_4",
                    "description": "EDUCATIONAL CONTENT: Learn about our sustainable bison farming methods! 🌿 Discover how traditional indigenous practices meet modern conservation. From grazing rotation to land stewardship - we're protecting our environment for future generations! 🌍 Environmental education at its best!",
                    "type": "educational_sustainability_organic"
                },
                {
                    "id": 5,
                    "title": "🦌 Baby Bison Moments",
                    "url": "https://www.tiktok.com/@utebison/video/7476852094441423131",
                    "thumbnail": "PLACEHOLDER_THUMBNAIL_5",
                    "description": "HEARTWARMING CONTENT: The cutest baby bison moments you've ever seen! 🍼 Watch these adorable calves play, learn, and grow under the caring watch of our ranch family. Indigenous tradition meets heartwarming animal care! 🤱 Guaranteed to make you smile!",
                    "type": "heartwarming_animals_organic"
                },
                {
                    "id": 6,
                    "title": "🏞️ Ranch Tours & Education",
                    "url": "https://www.tiktok.com/@utebison/video/7452207220508347691",
                    "thumbnail": "PLACEHOLDER_THUMBNAIL_6",
                    "description": "COMMUNITY FAVORITE: Experience our educational ranch tours! 🚐🦬 Watch how we share indigenous agricultural knowledge with visitors of all ages. See the excitement and engagement when authentic ranching meets community education! Always creating memorable learning experiences! 🎪 Click to see us in action!",
                    "type": "educational_tours_organic"
                }
            ]
        }
    }

    try:
        # Connect to MongoDB
        db = get_database()
        collection = db.projects
        
        # Check if project already exists
        existing_project = collection.find_one({"id": "11"})
        if existing_project:
            print("✅ Ute Bison project with ID 11 already exists. Updating...")
            result = collection.update_one({"id": "11"}, {"$set": ute_bison_project})
            print(f"✅ Updated existing Ute Bison project. Modified count: {result.modified_count}")
        else:
            # Insert the new project
            result = collection.insert_one(ute_bison_project)
            print(f"✅ Successfully added Ute Bison Ranch project to database")
            print(f"✅ Inserted ID: {result.inserted_id}")
        
        # Verify the project was added
        verification = collection.find_one({"id": "11"})
        if verification:
            print(f"✅ Verification successful: Project '{verification['title']}' found in database")
            print(f"✅ Category: {verification['category']}")
            print(f"✅ Client: {verification['client']}")
            return True
        else:
            print("❌ Verification failed: Ute Bison project not found after insertion")
            return False
            
    except Exception as e:
        print(f"❌ Error adding Ute Bison project to database: {str(e)}")
        return False

if __name__ == "__main__":
    print("🔄 Updating all user-requested changes in MongoDB...")
    
    success_count = 0
    
    # Update 1: Coffee house thumbnail
    if update_coffee_house_thumbnail():
        success_count += 1
    
    # Update 2: Add Ute Bison project
    if add_ute_bison_project():
        success_count += 1
    
    if success_count == 2:
        print("\\n✅ ALL USER CHANGES COMPLETE!")
        print("✅ Coffee house advertising thumbnail updated")
        print("✅ New Ute Bison Ranch organic TikTok project added")
        print("✅ About section updates completed in frontend")
    else:
        print(f"\\n⚠️  Completed {success_count}/2 updates")
        if success_count == 0:
            sys.exit(1)