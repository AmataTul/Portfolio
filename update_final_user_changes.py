#!/usr/bin/env python3
"""
Script to update final user changes:
1. Update Ute Bison Ranch description with new formatted content
2. Update Ute Bison Ranch TikTok videos with specific descriptions
3. Ensure proper bullet point formatting for coffee house project
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

def update_ute_bison_description():
    """Update Ute Bison Ranch description with new formatted content"""
    try:
        db = get_database()
        collection = db.projects
        
        new_description = """I spearheaded the organic marketing strategy for Ute Bison Ranch, an indigenous agricultural business dedicated to sustainable bison farming and authentic ranching practices. Through the creation of engaging TikTok content, I showcased the ranch's operations and behind-the-scenes activities.

The top 6 high-engagement organic videos achieved impressive results:

📊 **Social Media Performance:**
• 90% increase in social media engagement
• 55% rise in ranch visits and tours
• 40% increase in online orders

🛒 **Business Impact:**
• 75% growth in foot traffic to supermarket location (bison products: meat, jerky, skulls)
• 125% expansion in brand awareness within agricultural communities and beyond

📺 **Media Recognition:**
• Featured on ABC4 Utah's "Taste Utah" - highlighting Ute culture, bison farming, and culinary traditions
• Showcased on Fox 13 News - discussing bison meat in Utah school lunch programs

By leveraging authentic storytelling and strategic content creation, I successfully positioned Ute Bison Ranch as a leading indigenous agricultural business, driving visibility, foot traffic, and online sales across diverse markets."""
        
        result = collection.update_one({"id": "11"}, {"$set": {"description": new_description}})
        if result.modified_count > 0:
            print("✅ Updated Ute Bison Ranch description with new formatted content")
            return True
        else:
            print("⚠️  Ute Bison Ranch project not found or no changes made")
            return False
            
    except Exception as e:
        print(f"❌ Error updating Ute Bison description: {str(e)}")
        return False

def update_ute_bison_videos():
    """Update Ute Bison Ranch TikTok videos with specific descriptions"""
    try:
        db = get_database()
        collection = db.projects
        
        updated_videos = [
            {
                "id": 1,
                "title": "🥩 Beef vs. Bison: What's the Difference?",
                "url": "https://www.tiktok.com/@utebison/video/7471801091441659178",
                "thumbnail": "PLACEHOLDER_THUMBNAIL_1",
                "description": "EDUCATIONAL CONTENT: Learn the key differences between beef and bison! 🦬🐄 Discover why bison is leaner, more nutritious, and sustainable. Our indigenous ranchers explain the benefits of choosing bison over traditional beef. From taste to health benefits - everything you need to know! 🌱 Knowledge that will change how you think about meat!",
                "type": "educational_comparison_organic"
            },
            {
                "id": 2,
                "title": "😊 Happy Bison Living Their Best Life",
                "url": "https://www.tiktok.com/@utebison/video/7476830915477982491",
                "thumbnail": "PLACEHOLDER_THUMBNAIL_2",
                "description": "HEARTWARMING CONTENT: Watch our bison living their absolute best life! 🦬💕 See these majestic animals roaming freely, playing, and enjoying our sustainable ranch environment. Their happiness is our priority - and it shows! 🌿 These content bison are proof of our commitment to ethical farming!",
                "type": "animal_welfare_organic"
            },
            {
                "id": 3,
                "title": "😂 Funny Bison Herd Moments",
                "url": "https://www.tiktok.com/@utebison/video/7476839847208741131",
                "thumbnail": "PLACEHOLDER_THUMBNAIL_3",
                "description": "HILARIOUS CONTENT: You won't believe these funny bison herd moments! 🤣🦬 Watch as our bison show their personalities - from playful antics to unexpected behaviors. Who knew bison could be this entertaining? 😄 Ranch life is never boring with these characters around!",
                "type": "entertainment_humor_organic"
            },
            {
                "id": 4,
                "title": "📚 Educational: Beef vs. Bison Deep Dive",
                "url": "https://www.tiktok.com/@utebison/video/7476845213441698091",
                "thumbnail": "PLACEHOLDER_THUMBNAIL_4",
                "description": "IN-DEPTH EDUCATION: The complete guide to beef vs. bison differences! 🎓🦬 Our ranching experts break down nutrition facts, environmental impact, and taste profiles. Learn why indigenous communities have valued bison for centuries and why modern consumers are making the switch! 📊 Educational content that matters!",
                "type": "educational_detailed_organic"
            },
            {
                "id": 5,
                "title": "📺 Behind the Scenes: ABC4 Taste Utah Filming",
                "url": "https://www.tiktok.com/@utebison/video/7476852094441423131",
                "thumbnail": "PLACEHOLDER_THUMBNAIL_5",
                "description": "EXCLUSIVE BEHIND-THE-SCENES: Go behind the cameras during our ABC4 'Taste Utah' filming! 🎬📺 See how we prepared for the big TV feature, what it was like being on television, and the excitement of showcasing Ute culture and bison farming to Utah! 🌟 A once-in-a-lifetime media experience!",
                "type": "behind_the_scenes_media_organic"
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
        
        # Update the combinedTikTokSection with the new videos
        combinedTikTokSection = {
            "sectionTitle": "Indigenous Bison Ranch TikTok Success",
            "videosTitle": "Top 6 Community-Engaging Organic TikTok Videos (All Organic Content)",
            "videosSubtitle": "Each video celebrates indigenous agriculture while driving measurable business results",
            "videos": updated_videos
        }
        
        result = collection.update_one(
            {"id": "11"}, 
            {"$set": {"combinedTikTokSection": combinedTikTokSection}}
        )
        
        if result.modified_count > 0:
            print("✅ Updated Ute Bison Ranch TikTok videos with specific descriptions")
            return True
        else:
            print("⚠️  Ute Bison Ranch project not found or no video changes made")
            return False
            
    except Exception as e:
        print(f"❌ Error updating Ute Bison videos: {str(e)}")
        return False

def update_coffee_house_description_bullets():
    """Update coffee house TikTok description to ensure bullet points are preserved"""
    try:
        db = get_database()
        collection = db.projects
        
        coffee_description = """I led the marketing strategy for KahPeeh kah-Ahn Ute Coffee House & Soda, an indigenous coffee house celebrating cultural storytelling and authentic hospitality. I coordinated several community events and created multiple TikTok videos showcasing the brand's values.

The top 6 high-engagement videos achieved significant results:
• 85% increase in social media engagement
• 40% boost in foot traffic
• 120% growth in brand awareness across reservation communities and surrounding areas

Through strategic content creation and cultural narratives, I successfully positioned KahPeeh kah-Ahn as a growing indigenous business, driving visibility and engagement across diverse markets."""
        
        result = collection.update_one({"id": "10"}, {"$set": {"description": coffee_description}})
        if result.modified_count > 0:
            print("✅ Updated coffee house TikTok description with proper bullet points")
            return True
        else:
            print("⚠️  Coffee house TikTok project not found or no changes made")
            return False
            
    except Exception as e:
        print(f"❌ Error updating coffee house description: {str(e)}")
        return False

if __name__ == "__main__":
    print("🔄 Updating final user changes in MongoDB...")
    
    success_count = 0
    
    # Update 1: Ute Bison description
    if update_ute_bison_description():
        success_count += 1
    
    # Update 2: Ute Bison videos
    if update_ute_bison_videos():
        success_count += 1
    
    # Update 3: Coffee house description bullets
    if update_coffee_house_description_bullets():
        success_count += 1
    
    if success_count == 3:
        print("\n✅ ALL FINAL USER CHANGES COMPLETE!")
        print("✅ Ute Bison Ranch description updated with formatted content and media mentions")
        print("✅ Ute Bison Ranch TikTok videos updated with specific descriptions")
        print("✅ Coffee house TikTok description updated with proper bullet points")
        print("✅ About section bubble design improved in frontend")
    else:
        print(f"\n⚠️  Completed {success_count}/3 updates")
        if success_count == 0:
            sys.exit(1)