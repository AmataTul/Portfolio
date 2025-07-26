#!/usr/bin/env python3

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent / 'backend'
load_dotenv(ROOT_DIR / '.env')

async def update_coffee_house_realistic():
    """Update the Coffee House TikTok project with realistic metrics and remove viral language"""
    
    # Database connection
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    try:
        # Updated Coffee House TikTok project data
        coffee_house_update = {
            "title": "KahPeeh Kah-Ahn Coffee House - Top 6 TikTok High-Engagement Campaign",
            "category": "Social Media Content & Campaigns",
            "client": "Ute Tribal Enterprises - KahPeeh Kah-Ahn Coffee House",
            "project_type": "TikTok Content Strategy & Campaign Management",
            "description": "Strategic TikTok campaign featuring 6 top-performing videos that drove significant engagement, foot traffic, and business growth for KahPeeh Kah-Ahn Coffee House. These high-engagement videos combined organic content with strategic advertising to maximize customer engagement and drive measurable business results. From concept creation to final edit, I developed the creative strategy, wrote compelling copy, and coordinated the entire campaign execution.",
            "images": [],  # Remove main video
            "type": "video",
            "featured": True,
            "orientation": "vertical",
            "key_contributions": [
                "Conceptualized and created 6 high-engagement TikTok videos that became the top-performing content for the Coffee House",
                "Developed creative strategy blending organic content with strategic advertising to maximize reach and engagement",
                "Wrote compelling copy and captions that resonated with target audience and drove customer action",
                "Coordinated entire campaign execution from pre-production planning to post-launch optimization",
                "Edited and produced all video content using professional techniques optimized for TikTok's algorithm",
                "Analyzed performance metrics and adapted content strategy to maintain engagement momentum across all 6 videos"
            ],
            "skills_utilized": [
                "TikTok Algorithm Optimization",
                "High-Engagement Content Creation",
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
                    "Drove measurable foot traffic increase to physical Coffee House location",
                    "Achieved significant reach expansion and new customer acquisition through strategic content",
                    "Increased Coffee House sales through strategic content-to-conversion optimization",
                    "Built substantial follower growth and brand awareness for KahPeeh Kah-Ahn Coffee House",
                    "Established Coffee House as must-visit destination through compelling visual storytelling"
                ],
                "qualitative_outcomes": [
                    "Successfully positioned Coffee House as trendy, culturally relevant destination for diverse audiences",
                    "Enhanced brand recognition and authenticity through strategic storytelling and community engagement",
                    "Strengthened customer loyalty and community connection through relatable, engaging content",
                    "Elevated Coffee House's digital presence and social media credibility in competitive market",
                    "Created sustainable content framework for ongoing high-engagement marketing success",
                    "Fostered authentic brand personality that resonates with both local community and broader TikTok audience"
                ]
            },
            "tiktokVideos": {
                "title": "Top 6 High-Engagement TikTok Videos",
                "description": "These 6 videos generated the most engagement, foot traffic, and business growth for KahPeeh Kah-Ahn Coffee House",
                "videos": [
                    {
                        "id": 1,
                        "title": "Coffee House Moment #1",
                        "url": "https://www.tiktok.com/@kahpeehkahahn/video/7471801091441659178",
                        "thumbnail": "https://images.unsplash.com/photo-1522992319-0365e5f11656?w=400&h=600&fit=crop",
                        "description": "Top engagement organic content",
                        "type": "organic_content"
                    },
                    {
                        "id": 2,
                        "title": "Coffee House Moment #2", 
                        "url": "https://www.tiktok.com/@kahpeehkahahn/video/7409139284403408159",
                        "thumbnail": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=600&fit=crop",
                        "description": "Strategic advertising content",
                        "type": "strategic_ad"
                    },
                    {
                        "id": 3,
                        "title": "Coffee House Moment #3",
                        "url": "https://www.tiktok.com/@kahpeehkahahn/video/7390967071472946462", 
                        "thumbnail": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=600&fit=crop",
                        "description": "Customer engagement organic content",
                        "type": "organic_content"
                    },
                    {
                        "id": 4,
                        "title": "Coffee House Moment #4",
                        "url": "https://www.tiktok.com/@kahpeehkahahn/video/7406134372803382559",
                        "thumbnail": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop", 
                        "description": "Business growth organic content",
                        "type": "organic_content"
                    },
                    {
                        "id": 5,
                        "title": "Coffee House Moment #5",
                        "url": "https://www.tiktok.com/@kahpeehkahahn/video/7396130080369528094",
                        "thumbnail": "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=600&fit=crop",
                        "description": "New customer acquisition organic content", 
                        "type": "organic_content"
                    },
                    {
                        "id": 6,
                        "title": "Coffee House Moment #6",
                        "url": "https://www.tiktok.com/@kahpeehkahahn/video/7452207220508347691",
                        "thumbnail": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=600&fit=crop",
                        "description": "Brand awareness organic content",
                        "type": "organic_content"
                    }
                ],
                "campaignStats": {
                    "totalVideos": 6,
                    "organicContent": 5,
                    "strategicAds": 1,
                    "engagementIncrease": "85%",
                    "footTrafficBoost": "40%", 
                    "brandAwarenessGrowth": "120%"
                }
            }
        }
        
        # Find and update the existing Coffee House project
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
                {"$set": coffee_house_update}
            )
            
            if result.modified_count > 0:
                print("✅ Successfully updated Coffee House TikTok project with realistic metrics")
                
                # Retrieve and display the updated project
                updated_project = await db.projects.find_one({"_id": existing_project["_id"]})
                print(f"   Title: {updated_project['title']}")
                print(f"   Main Images Removed: {len(updated_project['images'])} (should be 0)")
                print(f"   Content Mix: {updated_project['tiktokVideos']['campaignStats']['organicContent']} organic, {updated_project['tiktokVideos']['campaignStats']['strategicAds']} ad")
                print(f"   Engagement Increase: {updated_project['tiktokVideos']['campaignStats']['engagementIncrease']}")
                print(f"   Foot Traffic Boost: {updated_project['tiktokVideos']['campaignStats']['footTrafficBoost']}")
                print(f"   Brand Awareness Growth: {updated_project['tiktokVideos']['campaignStats']['brandAwarenessGrowth']}")
            else:
                print("⚠️  No changes made to existing Coffee House project")
        else:
            print("❌ Coffee House project not found")
            
    except Exception as e:
        print(f"❌ Error updating Coffee House project: {str(e)}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(update_coffee_house_realistic())