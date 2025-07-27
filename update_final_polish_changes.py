#!/usr/bin/env python3
"""
Script to update all final polish changes:
1. Update Ute Bison Ranch description (cleaner format)
2. Remove YouTube references from Ute Crossing project
3. Add new KahPeeh kah-Ahn digital drive thru menu design project
4. Replace "ad" with "organic" in TikTok videos
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

def update_ute_bison_description_clean():
    """Update Ute Bison Ranch description with cleaner formatting"""
    try:
        db = get_database()
        collection = db.projects
        
        new_description = """I spearheaded the organic marketing strategy for Ute Bison Ranch, an indigenous agricultural business dedicated to sustainable bison farming and authentic ranching practices. Through engaging TikTok content, I showcased ranch operations and behind-the-scenes activities.

**Campaign Results:**
📊 **Social Media Performance**
• 90% increase in social media engagement
• 55% rise in ranch visits and tours
• 40% increase in online orders

🛒 **Business Impact**
• 75% growth in foot traffic to supermarket location (bison products: meat, jerky, skulls)
• 125% expansion in brand awareness within agricultural communities and beyond

📺 **Media Recognition**
• Featured on ABC4 Utah's "Taste Utah" - highlighting Ute culture, bison farming, and culinary traditions
• Showcased on Fox 13 News - discussing bison meat in Utah school lunch programs

Through authentic storytelling and strategic content creation, I successfully positioned Ute Bison Ranch as a leading indigenous agricultural business, driving visibility, foot traffic, and online sales across diverse markets."""
        
        result = collection.update_one({"id": "11"}, {"$set": {"description": new_description}})
        if result.modified_count > 0:
            print("✅ Updated Ute Bison Ranch description with cleaner formatting")
            return True
        else:
            print("⚠️  Ute Bison Ranch project not found or no changes made")
            return False
            
    except Exception as e:
        print(f"❌ Error updating Ute Bison description: {str(e)}")
        return False

def remove_youtube_from_ute_crossing():
    """Remove YouTube references from Ute Crossing project description"""
    try:
        db = get_database()
        collection = db.projects
        
        new_description = """Comprehensive video advertisement campaign for Ute Crossing Grill & Ute Lanes, a unique entertainment destination combining authentic dining with bowling and arcade gaming. I coordinated and directed this complete advertising production from initial concept development through final editing, showcasing the venue's diverse offerings including room booking services for private events, hosting capabilities, and family entertainment. The restaurant features comfort food with a distinctive mix of Native American and traditional American cuisine, managed by Ute Tribal Enterprises as an indigenous-owned business serving the community. I directed the entire creative process, managed cinema and big screen displays for sponsorship events, and coordinated post-production editing to create professional-grade advertising content suitable for multiple platform deployment."""
        
        result = collection.update_one({"id": "5"}, {"$set": {"description": new_description}})
        if result.modified_count > 0:
            print("✅ Removed YouTube references from Ute Crossing project")
            return True
        else:
            print("⚠️  Ute Crossing project not found or no changes made")
            return False
            
    except Exception as e:
        print(f"❌ Error updating Ute Crossing description: {str(e)}")
        return False

def add_digital_menu_project():
    """Add new KahPeeh kah-Ahn digital drive thru menu design project"""
    
    # New digital menu project data
    digital_menu_project = {
        "id": "12",
        "title": "KahPeeh kah-Ahn Ute Coffee House & Soda - Digital Drive Thru Menu Design",
        "category": "Graphic Design & Marketing Materials",
        "client": "Ute Tribal Enterprises - KahPeeh kah-Ahn Ute Coffee House & Soda",
        "project_type": "Digital Menu Design & Management",
        "description": "Comprehensive digital drive thru menu design project for KahPeeh kah-Ahn Ute Coffee House & Soda, creating visually appealing and user-friendly menu displays for their drive-through service. I designed and managed the complete digital menu system, incorporating the coffee house's indigenous branding and cultural elements while ensuring optimal readability and customer experience. The project included creating multiple menu layouts, seasonal variations, and promotional displays that celebrate the unique indigenous coffee house experience while maintaining professional food service standards.",
        "images": [
            "PLACEHOLDER_VERTICAL_1",  # Digital menu board design - vertical
            "PLACEHOLDER_VERTICAL_2",  # Coffee specialty drinks menu - vertical  
            "PLACEHOLDER_VERTICAL_3",  # Food items and snacks menu - vertical
            "PLACEHOLDER_VERTICAL_4",  # Seasonal promotions menu - vertical
            "PLACEHOLDER_VERTICAL_5",  # Cultural branding elements - vertical
            "PLACEHOLDER_HORIZONTAL_1",  # Full drive thru menu layout - horizontal
            "PLACEHOLDER_HORIZONTAL_2",  # Digital display mockup - horizontal
            "PLACEHOLDER_HORIZONTAL_3",  # Menu system overview - horizontal
        ],
        "type": "design",
        "featured": True,
        "orientation": "mixed",
        "key_contributions": [
            "Designed comprehensive digital drive thru menu system incorporating indigenous branding and cultural elements",
            "Created visually appealing menu layouts optimized for drive-through customer experience and readability",
            "Managed complete digital menu implementation ensuring consistency with coffee house brand identity",
            "Developed seasonal menu variations and promotional displays for special events and holidays",
            "Coordinated with coffee house management to ensure menu accuracy and pricing updates",
            "Created user-friendly design that celebrates indigenous culture while maintaining professional food service standards"
        ],
        "skills_utilized": [
            "Digital Menu Design & Layout",
            "Indigenous Branding Integration",
            "Drive Thru Customer Experience Design",
            "Menu Management & Coordination",
            "Cultural Design Sensitivity",
            "Food Service Graphics Design",
            "Digital Display Optimization",
            "Brand Consistency Management"
        ],
        "impact": {
            "quantified": [
                "Designed complete digital menu system for indigenous coffee house drive-through service",
                "Created multiple menu layout variations for different seasonal promotions and events",
                "Implemented user-friendly design optimizing customer order efficiency and experience",
                "Established consistent digital branding across all drive-through touchpoints"
            ],
            "qualitative": [
                "Successfully integrated indigenous cultural elements into professional food service menu design",
                "Enhanced customer experience through clear, visually appealing menu presentations",
                "Strengthened brand identity consistency across digital touchpoints and drive-through service",
                "Created sustainable menu design framework supporting ongoing promotions and seasonal updates",
                "Demonstrated expertise in culturally sensitive design for indigenous business promotion",
                "Elevated professional presentation of indigenous coffee house through polished digital menu design"
            ]
        }
    }

    try:
        # Connect to MongoDB
        db = get_database()
        collection = db.projects
        
        # Check if project already exists
        existing_project = collection.find_one({"id": "12"})
        if existing_project:
            print("✅ Digital menu project with ID 12 already exists. Updating...")
            result = collection.update_one({"id": "12"}, {"$set": digital_menu_project})
            print(f"✅ Updated existing digital menu project. Modified count: {result.modified_count}")
        else:
            # Insert the new project
            result = collection.insert_one(digital_menu_project)
            print(f"✅ Successfully added digital drive thru menu project to database")
            print(f"✅ Inserted ID: {result.inserted_id}")
        
        # Verify the project was added
        verification = collection.find_one({"id": "12"})
        if verification:
            print(f"✅ Verification successful: Project '{verification['title']}' found in database")
            print(f"✅ Category: {verification['category']}")
            print(f"✅ Images count: {len(verification.get('images', []))}")
            return True
        else:
            print("❌ Verification failed: Digital menu project not found after insertion")
            return False
            
    except Exception as e:
        print(f"❌ Error adding digital menu project to database: {str(e)}")
        return False

if __name__ == "__main__":
    print("🔄 Updating final polish changes in MongoDB...")
    
    success_count = 0
    
    # Update 1: Ute Bison description (cleaner)
    if update_ute_bison_description_clean():
        success_count += 1
    
    # Update 2: Remove YouTube from Ute Crossing
    if remove_youtube_from_ute_crossing():
        success_count += 1
    
    # Update 3: Add digital menu project
    if add_digital_menu_project():
        success_count += 1
    
    if success_count == 3:
        print("\\n✅ ALL FINAL POLISH CHANGES COMPLETE!")
        print("✅ Ute Bison Ranch description cleaned up and organized")
        print("✅ YouTube references removed from Ute Crossing project")
        print("✅ New KahPeeh kah-Ahn digital drive thru menu design project added")
        print("✅ About section cloud made smaller and neater in frontend")
    else:
        print(f"\\n⚠️  Completed {success_count}/3 updates")
        if success_count == 0:
            sys.exit(1)