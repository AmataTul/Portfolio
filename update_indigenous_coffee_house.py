#!/usr/bin/env python3

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent / 'backend'
load_dotenv(ROOT_DIR / '.env')

async def update_indigenous_coffee_house_project():
    """Update the Coffee House project with indigenous business focus and combined section"""
    
    # Database connection
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    try:
        # Updated Indigenous Coffee House project data
        indigenous_coffee_update = {
            "title": "KahPeeh kah-Ahn Ute Coffee House & Soda - Top 6 TikTok High-Engagement Campaign",
            "category": "Social Media Content & Campaigns",
            "client": "Ute Tribal Enterprises - KahPeeh kah-Ahn Ute Coffee House & Soda",
            "project_type": "Indigenous Business TikTok Marketing Campaign",
            "description": "Strategic TikTok marketing campaign for KahPeeh kah-Ahn Ute Coffee House & Soda, an indigenous small local coffee house proudly serving the Uintah and Ouray reservation community. This locally-owned Ute Tribal Enterprises business operates both from their location and travels to community events with their mobile trailer setup. I coordinated several events and created engaging TikTok content to promote their presence, resulting in significant engagement, increased foot traffic, and stronger community connections.",
            "images": [],  # No main video - only the 6 TikTok videos
            "type": "video",
            "featured": True,
            "orientation": "vertical",
            "key_contributions": [
                "Conceptualized and created 6 high-engagement TikTok videos promoting the indigenous coffee house and community events",
                "Coordinated community events where the coffee house trailer provided services, creating authentic content opportunities",
                "Developed creative strategy showcasing the unique indigenous coffee house experience and community connection",
                "Wrote compelling copy and captions celebrating indigenous business and cultural pride",
                "Edited and produced video content highlighting both the coffee house location and mobile trailer events",
                "Analyzed performance metrics and adapted content strategy to maximize community engagement and business visibility"
            ],
            "skills_utilized": [
                "Indigenous Business Marketing",
                "Community Event Coordination",
                "TikTok Content Creation",
                "Cultural Sensitivity Marketing",
                "Video Editing & Production",
                "Local Business Promotion",
                "Event Marketing",
                "Social Media Strategy",
                "Mobile Business Promotion",
                "Reservation Community Outreach"
            ],
            "impact": {
                "quantified_metrics": [
                    "Generated 85% increase in social media engagement for the indigenous coffee house",
                    "Drove 40% boost in foot traffic to both physical location and mobile trailer events",
                    "Achieved 120% growth in brand awareness throughout Uintah and Ouray reservation communities",
                    "Successfully promoted multiple community events coordinated through strategic TikTok marketing",
                    "Built substantial local following and community recognition for KahPeeh kah-Ahn",
                    "Established coffee house as go-to community gathering place through compelling social media presence"
                ],
                "qualitative_outcomes": [
                    "Successfully positioned indigenous coffee house as cultural hub and community gathering place",
                    "Enhanced pride in locally-owned indigenous business through authentic storytelling and community engagement",
                    "Strengthened connections between coffee house and reservation community through relatable, celebratory content",
                    "Elevated visibility of Ute Tribal Enterprises and indigenous entrepreneurship in competitive market",
                    "Created sustainable framework for ongoing community-focused marketing and event promotion",
                    "Fostered authentic brand personality celebrating indigenous culture while serving diverse local community"
                ]
            },
            # Combined TikTok section with easy customization
            "combinedTikTokSection": {
                "sectionTitle": "Indigenous Coffee House Success Story",
                "engagingDescription": "🏜️ Meet KahPeeh kah-Ahn Ute Coffee House & Soda - where authentic indigenous hospitality meets amazing coffee! This locally-owned gem serves the Uintah and Ouray reservation community from both their cozy location AND their mobile trailer at community events. Through strategic TikTok marketing, we've brewed up some serious engagement success! ☕✨",
                "performanceHighlight": "📈 From 85% more engagement to 40% increased foot traffic, these 6 high-engagement TikToks have helped establish KahPeeh kah-Ahn as the heart of the community. 120% brand awareness growth shows how authentic storytelling and cultural pride create real business impact! 🚀",
                "videosTitle": "Top 6 Community-Engaging TikTok Videos",
                "videosSubtitle": "Each video celebrates indigenous entrepreneurship while driving real business results",
                "videos": [
                    {
                        "id": 1,
                        "title": "Coffee House Community Moment #1",
                        "url": "https://www.tiktok.com/@kahpeehkahahn/video/7471801091441659178",
                        "thumbnail": "PLACEHOLDER_THUMBNAIL_1",  # Easy to replace
                        "description": "Top engagement organic content showcasing coffee house atmosphere",
                        "type": "organic_content"
                    },
                    {
                        "id": 2,
                        "title": "Coffee House Community Moment #2", 
                        "url": "https://www.tiktok.com/@kahpeehkahahn/video/7409139284403408159",
                        "thumbnail": "PLACEHOLDER_THUMBNAIL_2",  # Easy to replace
                        "description": "Strategic advertising content for event promotion",
                        "type": "strategic_ad"
                    },
                    {
                        "id": 3,
                        "title": "Coffee House Community Moment #3",
                        "url": "https://www.tiktok.com/@kahpeehkahahn/video/7390967071472946462", 
                        "thumbnail": "PLACEHOLDER_THUMBNAIL_3",  # Easy to replace
                        "description": "Community engagement organic content featuring local customers",
                        "type": "organic_content"
                    },
                    {
                        "id": 4,
                        "title": "Coffee House Community Moment #4",
                        "url": "https://www.tiktok.com/@kahpeehkahahn/video/7406134372803382559",
                        "thumbnail": "PLACEHOLDER_THUMBNAIL_4",  # Easy to replace
                        "description": "Mobile trailer event promotion organic content",
                        "type": "organic_content"
                    },
                    {
                        "id": 5,
                        "title": "Coffee House Community Moment #5",
                        "url": "https://www.tiktok.com/@kahpeehkahahn/video/7396130080369528094",
                        "thumbnail": "PLACEHOLDER_THUMBNAIL_5",  # Easy to replace
                        "description": "Indigenous business celebration organic content", 
                        "type": "organic_content"
                    },
                    {
                        "id": 6,
                        "title": "Coffee House Community Moment #6",
                        "url": "https://www.tiktok.com/@kahpeehkahahn/video/7452207220508347691",
                        "thumbnail": "PLACEHOLDER_THUMBNAIL_6",  # Easy to replace
                        "description": "Community event coordination organic content",
                        "type": "organic_content"
                    }
                ]
            }
        }
        
        # Remove old tiktokVideos field and replace with combinedTikTokSection
        await db.projects.update_one(
            {"id": "7"},
            {"$unset": {"tiktokVideos": 1}}
        )
        
        # Find and update the existing Coffee House project
        existing_project = await db.projects.find_one({"id": "7"})
        
        if existing_project:
            # Update existing project
            result = await db.projects.update_one(
                {"_id": existing_project["_id"]},
                {"$set": indigenous_coffee_update}
            )
            
            if result.modified_count > 0:
                print("✅ Successfully updated Indigenous Coffee House project")
                print(f"   Title: {indigenous_coffee_update['title']}")
                print(f"   Business Type: Indigenous small local coffee house")
                print(f"   Service Area: Uintah and Ouray reservation community")
                print(f"   Mobile Service: Trailer setup for community events")
                print(f"   Videos: {len(indigenous_coffee_update['combinedTikTokSection']['videos'])} TikTok videos with placeholder thumbnails")
                print(f"   Customization: Easy thumbnail and URL replacement system")
            else:
                print("⚠️  No changes made to existing Coffee House project")
        else:
            print("❌ Coffee House project not found")
            
    except Exception as e:
        print(f"❌ Error updating Indigenous Coffee House project: {str(e)}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(update_indigenous_coffee_house_project())