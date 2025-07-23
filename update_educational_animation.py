#!/usr/bin/env python3
"""
Script to update the High School Financial Literacy Animation project
to the new Ute Tribal Enterprises educational animation
"""

import asyncio
import sys
import os
from motor.motor_asyncio import AsyncIOMotorClient

# Add the backend directory to the Python path
sys.path.append('/app/backend')

from models import Project

async def update_educational_animation_project():
    # Connect to MongoDB using the same configuration as the backend
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    db_name = os.environ.get('DB_NAME', 'test_database')
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    # New project data
    project_data = {
        "title": "High School Educational Animation - Traditional Knowledge & Modern Learning",
        "category": "Illustrations & Educational Content",
        "client": "Ute Tribal Enterprises - Ute Bison",
        "description": "Educational animation designed for high school students, bridging traditional tribal knowledge with contemporary learning. This engaging animated video explores cultural heritage, community values, and educational pathways while respecting and celebrating tribal traditions.",
        "images": [
            "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop"
        ],
        "type": "video",
        "featured": True,
        "orientation": "horizontal",
        "videoUrl": "https://youtu.be/DYLLB8qiQ8k?si=Zm0y51wWhkg6D3P8",
        "educationalImpact": {
            "targetAudience": "High School Students",
            "focus": "Cultural education through animation",
            "topics": [
                "Traditional tribal knowledge and cultural heritage",
                "Modern educational pathways and opportunities",
                "Community values and leadership development",
                "Bridging traditional wisdom with contemporary learning"
            ],
            "format": "Animated educational video with interactive elements"
        }
    }
    
    # Check if the old Financial Literacy project exists and update it
    existing_project = await db.projects.find_one({"title": {"$regex": "Financial Literacy", "$options": "i"}})
    
    if existing_project:
        # Update the existing project
        result = await db.projects.update_one(
            {"_id": existing_project["_id"]},
            {"$set": project_data}
        )
        if result.modified_count > 0:
            print("✅ Successfully updated Financial Literacy project to new Ute Tribal Enterprises educational animation")
        else:
            print("❌ No changes were made to the database")
    else:
        # Create new project if not found
        project = Project(**project_data)
        result = await db.projects.insert_one(project.dict())
        if result.inserted_id:
            print("✅ Successfully added new educational animation project to database")
        else:
            print("❌ Failed to add project to database")
    
    # Close the connection
    client.close()
    return True

if __name__ == '__main__':
    print("🎬 Updating educational animation project in backend database...")
    asyncio.run(update_educational_animation_project())