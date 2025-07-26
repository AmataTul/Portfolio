#!/usr/bin/env python3

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent / 'backend'
load_dotenv(ROOT_DIR / '.env')

async def create_coffee_house_tiktok_project():
    """Create the Coffee House TikTok viral campaign project"""
    
    # Database connection
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    try:
        # Coffee House TikTok project data
        coffee_house_project = {
            "id": "7",
            "title": "KahPeeh Kah-Ahn Coffee House - Top 6 TikTok Viral Campaign",
            "category": "Social Media Content & Campaigns",
            "client": "Ute Tribal Enterprises - KahPeeh Kah-Ahn Coffee House",
            "project_type": "Viral TikTok Content Strategy & Campaign Management",
            "description": "High-engagement TikTok campaign featuring 6 top-performing videos that generated the most traffic, exposure, and sales for KahPeeh Kah-Ahn Coffee House. These viral videos combined organic content and strategic advertising to drive unprecedented customer engagement and business growth. From concept creation to final edit, I developed the creative strategy, wrote compelling copy, and coordinated the entire campaign execution.",
            "images": [
                "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=800&fit=crop"
            ],
            "type": "video",
            "featured": True,
            "orientation": "vertical",
            "key_contributions": [
                "Conceptualized and created 6 viral TikTok videos that became the highest-performing content for the Coffee House",
                "Developed creative strategy blending organic content with strategic advertising to maximize reach and engagement",
                "Wrote compelling copy and captions that resonated with target audience and drove viral sharing",
                "Coordinated entire campaign execution from pre-production planning to post-launch optimization",
                "Edited and produced all video content using professional techniques optimized for TikTok's algorithm",
                "Analyzed performance metrics and adapted content strategy to maintain viral momentum across all 6 videos"
            ],
            "skills_utilized": [
                "TikTok Algorithm Optimization",
                "Viral Content Creation",
                "Video Editing & Production",
                "Social Media Strategy",
                "Creative Copywriting",
                "Campaign Coordination",
                "Performance Analytics",
                "Trend Analysis",
                "Audience Engagement",
                "Content Planning",
                "Brand Storytelling",
                "Mobile-First Design"
            ],
            "impact": {
                "quantified_metrics": [
                    "Generated highest engagement rates in Coffee House's TikTok history across all 6 videos",
                    "Drove record-breaking traffic and foot traffic to physical Coffee House location",
                    "Achieved viral status with significant reach expansion and new customer acquisition",
                    "Increased Coffee House sales through strategic content-to-conversion optimization",
                    "Built substantial follower growth and brand awareness for KahPeeh Kah-Ahn Coffee House",
                    "Established Coffee House as must-visit destination through compelling visual storytelling"
                ],
                "qualitative_outcomes": [
                    "Successfully positioned Coffee House as trendy, culturally relevant destination for diverse audiences",
                    "Enhanced brand recognition and authenticity through strategic storytelling and community engagement",
                    "Strengthened customer loyalty and community connection through relatable, engaging content",
                    "Elevated Coffee House's digital presence and social media credibility in competitive market",
                    "Created sustainable content framework for ongoing viral marketing success",
                    "Fostered authentic brand personality that resonates with both local community and broader TikTok audience"
                ]
            },
            "tiktokVideos": {
                "title": "Top 6 Viral TikTok Videos",
                "description": "These 6 videos generated the most engagement, traffic, and sales for KahPeeh Kah-Ahn Coffee House",
                "videos": [
                    {
                        "id": 1,
                        "title": "Coffee House Viral Moment #1",
                        "url": "https://www.tiktok.com/@kahpeehkahahn/video/7471801091441659178",
                        "thumbnail": "https://images.unsplash.com/photo-1522992319-0365e5f11656?w=400&h=600&fit=crop",
                        "description": "Top engagement viral content",
                        "type": "organic_content"
                    },
                    {
                        "id": 2,
                        "title": "Coffee House Viral Moment #2", 
                        "url": "https://www.tiktok.com/@kahpeehkahahn/video/7409139284403408159",
                        "thumbnail": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=600&fit=crop",
                        "description": "High-traffic driving content",
                        "type": "strategic_ad"
                    },
                    {
                        "id": 3,
                        "title": "Coffee House Viral Moment #3",
                        "url": "https://www.tiktok.com/@kahpeehkahahn/video/7390967071472946462", 
                        "thumbnail": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=600&fit=crop",
                        "description": "Customer engagement leader",
                        "type": "organic_content"
                    },
                    {
                        "id": 4,
                        "title": "Coffee House Viral Moment #4",
                        "url": "https://www.tiktok.com/@kahpeehkahahn/video/7406134372803382559",
                        "thumbnail": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop", 
                        "description": "Sales conversion champion",
                        "type": "strategic_ad"
                    },
                    {
                        "id": 5,
                        "title": "Coffee House Viral Moment #5",
                        "url": "https://www.tiktok.com/@kahpeehkahahn/video/7396130080369528094",
                        "thumbnail": "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=600&fit=crop",
                        "description": "New customer acquisition driver", 
                        "type": "organic_content"
                    },
                    {
                        "id": 6,
                        "title": "Coffee House Viral Moment #6",
                        "url": "https://www.tiktok.com/@kahpeehkahahn/video/7452207220508347691",
                        "thumbnail": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=600&fit=crop",
                        "description": "Brand awareness amplifier",
                        "type": "strategic_ad"
                    }
                ]
            }
        }
        
        # Check if project already exists
        existing_project = await db.projects.find_one({
            "$or": [
                {"id": "7"},
                {"title": {"$regex": "KahPeeh Kah-Ahn Coffee House", "$options": "i"}},
                {"client": {"$regex": "KahPeeh Kah-Ahn Coffee House", "$options": "i"}}
            ]
        })
        
        if existing_project:
            # Update existing project
            result = await db.projects.update_one(
                {"_id": existing_project["_id"]},
                {"$set": coffee_house_project}
            )
            
            if result.modified_count > 0:
                print("✅ Successfully updated Coffee House TikTok project in database")
            else:
                print("⚠️  No changes made to existing Coffee House project")
        else:
            # Create new project
            result = await db.projects.insert_one(coffee_house_project)
            print(f"✅ Created new Coffee House TikTok project with ID: {result.inserted_id}")
        
        # Retrieve and display the project details
        updated_project = await db.projects.find_one({"id": "7"})
        if updated_project:
            print(f"   Title: {updated_project['title']}")
            print(f"   TikTok Videos: {len(updated_project['tiktokVideos']['videos'])} videos")
            print(f"   Key Contributions: {len(updated_project['key_contributions'])} items")
            print(f"   Skills Utilized: {len(updated_project['skills_utilized'])} skills")
            print(f"   Impact Metrics: {len(updated_project['impact']['quantified_metrics'])} quantified")
            
    except Exception as e:
        print(f"❌ Error creating Coffee House TikTok project: {str(e)}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(create_coffee_house_tiktok_project())