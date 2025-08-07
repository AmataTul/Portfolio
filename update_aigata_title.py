#!/usr/bin/env python3

import os
import sys
sys.path.append('/app/backend')

from pymongo import MongoClient
from models import Project
import json

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/portfolio_db')
client = MongoClient(MONGO_URL)
db = client.get_database()

def update_aigata_project_title():
    """Update the Aigata project title"""
    
    try:
        # Find and update the Aigata project
        old_title = "Aigata Brand - E-commerce Product Listing Graphics & Marketing Assets"
        new_title = "E-commerce Graphics & Marketing Assets for My Owned Business"
        
        project = db.projects.find_one({"title": old_title})
        
        if project:
            # Update the project title
            result = db.projects.update_one(
                {"title": old_title}, 
                {"$set": {"title": new_title}}
            )
            
            if result.modified_count > 0:
                print(f"✅ Successfully updated project title:")
                print(f"   FROM: {old_title}")
                print(f"   TO: {new_title}")
            else:
                print("⚠️ No changes were made to the project")
        else:
            print("❌ Aigata project not found in database with old title")
            
            # Check if it already has the new title
            project_with_new_title = db.projects.find_one({"title": new_title})
            if project_with_new_title:
                print(f"✅ Project already has the correct title: {new_title}")
            else:
                print("❌ Project not found with either title")
    
    except Exception as e:
        print(f"❌ Error updating Aigata project title: {e}")

if __name__ == "__main__":
    print("🔄 Updating Aigata project title...")
    update_aigata_project_title()
    print("✅ Aigata project title update complete")