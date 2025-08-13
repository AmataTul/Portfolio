#!/usr/bin/env python3

import os
import sys
sys.path.append('/app/backend')

from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/backend/.env')

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DATABASE_NAME = 'portfolio_db'

async def update_utah_bison_project():
    """Update the Utah High & Elementary School Bison Grant Program project with new images"""
    
    # Connect to MongoDB
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DATABASE_NAME]
    collection = db['projects']
    
    try:
        print("🔄 Updating Utah High & Elementary School Bison Grant Program project...")
        
        # New image URLs
        new_images = [
            "https://customer-assets.emergentagent.com/job_project-curator/artifacts/hqj4x6j9_bandicam%202025-08-12%2018-04-41-496.jpg",
            "https://customer-assets.emergentagent.com/job_project-curator/artifacts/djovx3im_bandicam%202025-08-12%2018-04-27-445.jpg"
        ]
        
        # Update the project with new images
        update_data = {
            "additionalImages": {
                "title": "Supporting Marketing Materials",
                "description": "Brochures and promotional materials created for the K-12 campaign",
                "images": new_images
            }
        }
        
        # Find and update the project
        result = await collection.update_one(
            {"title": {"$regex": "Utah High.*Elementary School Bison Grant Program", "$options": "i"}},
            {"$set": update_data}
        )
        
        if result.matched_count > 0:
            print(f"✅ Successfully updated Utah Bison project with new marketing materials images")
            print(f"   Updated {result.modified_count} document(s)")
            print(f"   New images:")
            for i, img in enumerate(new_images, 1):
                print(f"   {i}. {img}")
        else:
            print("❌ No project found matching the title pattern")
            
        # Verify the update
        project = await collection.find_one(
            {"title": {"$regex": "Utah High.*Elementary School Bison Grant Program", "$options": "i"}}
        )
        
        if project and 'additionalImages' in project:
            print(f"✅ Verification successful - project now has {len(project['additionalImages']['images'])} additional images")
        else:
            print("⚠️  Verification failed - additionalImages not found")
            
    except Exception as e:
        print(f"❌ Error updating Utah Bison project: {str(e)}")
    
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(update_utah_bison_project())