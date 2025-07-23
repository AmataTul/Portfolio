#!/usr/bin/env python3
"""
Script to update all vertical social media projects with TikTok video URLs
"""

import asyncio
import sys
import os
from motor.motor_asyncio import AsyncIOMotorClient

# Add the backend directory to the Python path
sys.path.append('/app/backend')

from models import Project

async def update_social_media_videos():
    # Connect to MongoDB
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/portfolio')
    client = AsyncIOMotorClient(mongo_url)
    db = client.portfolio
    
    # Define the updates for each project
    video_updates = [
        {
            "title": "KahPeeh Kah-Ahn Coffee House TikTok Strategy",
            "videoUrl": "https://www.tiktok.com/@kahpeehkahahn/video/7409139284403408159"
        },
        {
            "title": "Adobe Creative Suite Instagram Reels",
            "videoUrl": "https://www.tiktok.com/@adobe/video/7334159049778351406"
        },
        {
            "title": "Adobe TikTok Content Strategy",
            "videoUrl": "https://www.tiktok.com/@adobe/video/7326031883245079850"
        },
        {
            "title": "Beats by Dre Instagram Story Series",
            "videoUrl": "https://www.tiktok.com/@beatsbydre/video/7334159049778351406"
        },
        {
            "title": "Disney+ Character Spotlight Campaign",
            "videoUrl": "https://www.tiktok.com/@disney/video/7334159049778351406"
        },
        {
            "title": "Adobe Creative Tips TikTok Series",
            "videoUrl": "https://www.tiktok.com/@adobe/video/7329366242383498539"
        },
        {
            "title": "Ute Tribal Enterprises Cultural Content",
            "videoUrl": "https://www.tiktok.com/@utetribalenterprises/video/7334159049778351406"
        },
        {
            "title": "Bison Made Product Showcase Reels",
            "videoUrl": "https://www.tiktok.com/@bisonmade/video/7334159049778351406"
        }
    ]
    
    updated_count = 0
    
    for update in video_updates:
        # Update the project with the videoUrl
        result = await db.projects.update_one(
            {"title": update["title"]},
            {"$set": {"videoUrl": update["videoUrl"]}}
        )
        
        if result.modified_count > 0:
            print(f"✅ Updated {update['title']} with TikTok URL")
            updated_count += 1
        elif result.matched_count > 0:
            print(f"⚠️  Found {update['title']} but no changes needed")
        else:
            print(f"❌ Could not find project: {update['title']}")
    
    print(f"\n🎬 Successfully updated {updated_count} social media projects with TikTok video URLs")
    
    # Close the connection
    client.close()
    return True

if __name__ == '__main__':
    print("🎬 Updating social media projects with TikTok video URLs in backend database...")
    asyncio.run(update_social_media_videos())