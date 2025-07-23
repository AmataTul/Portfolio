#!/usr/bin/env python3
"""
Script to add/update the Ute Bison Ranch project in the backend database
"""

import asyncio
import sys
import os
import re
from motor.motor_asyncio import AsyncIOMotorClient

# Add the backend directory to the Python path
sys.path.append('/app/backend')

from models import Project

async def update_ute_bison_project():
    # Connect to MongoDB
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    client = AsyncIOMotorClient(mongo_url)
    db = client.test_database  # Use the correct database name
    
    # Read the base64 images from the file
    def read_base64_images():
        images = []
        with open('/app/ute_bison_images.txt', 'r') as f:
            content = f.read()
        
        # Extract base64 strings
        pattern = r'data:image/jpeg;base64,[A-Za-z0-9+/=]+'
        matches = re.findall(pattern, content)
        
        return matches
    
    base64_images = read_base64_images()
    
    if len(base64_images) < 5:
        print(f"Error: Only found {len(base64_images)} images, expected 5")
        return False
    
    # Create the Ute Bison Ranch project data
    project_data = {
        "title": "Ute Bison Ranch Summer Youth Program Photography",
        "category": "Photography Projects",
        "client": "Ute Tribal Enterprises - Ute Bison",
        "description": "Educational photography documentation of Uintah River High School students visiting the Ute Bison Ranch as part of the Summer Youth Program. Captured authentic moments of cultural education and youth engagement with tribal heritage and bison conservation efforts.",
        "images": base64_images,
        "type": "image",
        "featured": True,
        "orientation": "horizontal",
        "educationalImpact": {
            "program": "Summer Youth Program",
            "participants": "Uintah River High School Students",
            "focus": "Cultural education and tribal heritage awareness",
            "activities": [
                "Guided bison ranch tours showcasing traditional tribal connections",
                "Educational sessions on bison conservation and cultural significance", 
                "Hands-on learning experiences with tribal heritage practices",
                "Photography documentation for program marketing and outreach"
            ],
            "communityImpact": "Strengthened connections between youth and tribal heritage while promoting educational tourism"
        }
    }
    
    # Check if project already exists
    existing_project = await db.projects.find_one({"title": project_data["title"]})
    
    if existing_project:
        # Update the existing project with new images
        result = await db.projects.update_one(
            {"title": project_data["title"]},
            {"$set": project_data}
        )
        if result.modified_count > 0:
            print("✅ Successfully updated Ute Bison Ranch project with new images in database")
        else:
            print("❌ No changes were made to the database")
    else:
        # Create new project
        project = Project(**project_data)
        result = await db.projects.insert_one(project.dict())
        if result.inserted_id:
            print("✅ Successfully added new Ute Bison Ranch project to database")
        else:
            print("❌ Failed to add project to database")
    
    # Close the connection
    client.close()
    return True

if __name__ == '__main__':
    print("🖼️ Updating Ute Bison Ranch project in backend database...")
    asyncio.run(update_ute_bison_project())