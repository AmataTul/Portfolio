#!/usr/bin/env python3

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent / 'backend'
load_dotenv(ROOT_DIR / '.env')

async def update_final_project_changes():
    """Update all projects with the final changes"""
    
    # Database connection
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    try:
        # 1. Update Coffee House project description
        coffee_house_update = {
            "$set": {
                "description": "Strategic TikTok marketing campaign for KahPeeh kah-Ahn Ute Coffee House & Soda, an indigenous small local coffee house proudly serving the Uintah and Ouray reservation community. This locally-owned Ute Tribal Enterprises business operates from their cozy location and travels to community events with their mobile trailer setup. I coordinated multiple community events and created 6 high-engagement TikTok videos to promote their authentic indigenous hospitality, resulting in 85% increased social media engagement, 40% boost in foot traffic, and 120% brand awareness growth throughout the reservation communities. Through strategic content creation and cultural storytelling, we've established KahPeeh kah-Ahn as the heart of the community and a thriving indigenous business success story.",
                "combinedTikTokSection.sectionTitle": "Indigenous Coffee House TikTok Success",
                "combinedTikTokSection.videosTitle": "Top 6 Community-Engaging TikTok Videos",
                "combinedTikTokSection.videosSubtitle": "Each video celebrates indigenous entrepreneurship while driving measurable business results"
            },
            "$unset": {
                "combinedTikTokSection.engagingDescription": 1,
                "combinedTikTokSection.performanceHighlight": 1
            }
        }
        
        coffee_result = await db.projects.update_one(
            {"title": {"$regex": "KahPeeh kah-Ahn.*TikTok", "$options": "i"}},
            coffee_house_update
        )
        
        if coffee_result.modified_count > 0:
            print("✅ Updated Coffee House TikTok project:")
            print("   - Combined descriptions into single SEO-optimized version")
            print("   - Removed duplicate descriptions from TikTok section")
            print("   - Streamlined section titles")
        
        # 2. Create new Coffee House Advertising project
        advertising_project = {
            "id": "4",
            "title": "KahPeeh kah-Ahn Ute Coffee House & Soda - Video Advertisement Campaign",
            "category": "Advertising",
            "client": "Ute Tribal Enterprises - KahPeeh kah-Ahn Ute Coffee House & Soda",
            "project_type": "Video Advertisement Production & Direction",
            "description": "Professional video advertisement for KahPeeh kah-Ahn Ute Coffee House & Soda, showcasing authentic indigenous hospitality and premium coffee experience. I directed and coordinated this comprehensive advertising campaign from concept to completion, highlighting the unique cultural atmosphere and community connection of this locally-owned indigenous business serving the Uintah and Ouray reservation communities.",
            "images": [
                "https://img.youtube.com/vi/placeholder/maxresdefault.jpg"
            ],
            "type": "video", 
            "featured": True,
            "orientation": "horizontal",
            "video_url": "https://customer-assets.emergentagent.com/job_smooth-site-setup/artifacts/a3tv7dfw_Ute%20Coffeehouse%20V4.mp4",
            "key_contributions": [
                "Directed complete video advertisement production from initial concept through final editing",
                "Coordinated all aspects of video shoot including location setup, talent direction, and equipment management",
                "Developed creative vision showcasing authentic indigenous coffee house experience and cultural atmosphere",
                "Managed production timeline and budget to deliver high-quality advertising content within project constraints",
                "Created compelling narrative highlighting unique selling propositions of indigenous-owned local business",
                "Produced professional-grade video advertisement suitable for multiple marketing channels and platforms"
            ],
            "skills_utilized": [
                "Video Direction & Production",
                "Creative Campaign Development", 
                "Indigenous Business Marketing",
                "Production Coordination",
                "Video Editing & Post-Production",
                "Advertising Strategy",
                "Cultural Sensitivity Marketing",
                "Local Business Promotion",
                "Brand Storytelling",
                "Project Management"
            ],
            "impact": {
                "quantified_metrics": [
                    "Produced high-quality video advertisement showcasing authentic indigenous coffee house experience",
                    "Successfully directed and coordinated complete advertising campaign from concept to delivery", 
                    "Created compelling marketing asset suitable for multiple advertising platforms and channels",
                    "Delivered professional video content highlighting unique cultural atmosphere and community connection",
                    "Developed advertising material supporting overall brand positioning for KahPeeh kah-Ahn Coffee House"
                ],
                "qualitative_outcomes": [
                    "Enhanced brand storytelling through authentic visual representation of indigenous hospitality",
                    "Strengthened marketing portfolio with professional video advertisement showcasing cultural sensitivity",
                    "Elevated coffee house brand presence through high-quality advertising content creation",
                    "Demonstrated comprehensive video production capabilities from direction through post-production",
                    "Created sustainable advertising framework for ongoing indigenous business marketing initiatives"
                ]
            }
        }
        
        # Check if advertising project already exists
        existing_ad = await db.projects.find_one({"id": "4"})
        if not existing_ad:
            await db.projects.insert_one(advertising_project)
            print("✅ Created new Coffee House Advertising project:")
            print("   - Video advertisement campaign with directed content")
            print("   - Comprehensive production and direction details")
            print("   - Professional video URL integrated")
        else:
            await db.projects.update_one(
                {"id": "4"},
                {"$set": advertising_project}
            )
            print("✅ Updated existing Coffee House Advertising project")
        
        print("\n🎯 All final project updates completed successfully!")
        
    except Exception as e:
        print(f"❌ Error updating projects: {str(e)}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(update_final_project_changes())