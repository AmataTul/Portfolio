#!/usr/bin/env python3

import os
import sys
from pymongo import MongoClient
from pprint import pprint

# Add the backend directory to the path so we can import models
sys.path.append('/app/backend')

def update_youtube_embedding_data():
    """
    Update the YouTube embedding data for advertising projects in MongoDB
    """
    # Get MongoDB connection string from environment
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/test_database')
    
    try:
        # Connect to MongoDB
        client = MongoClient(mongo_url)
        db = client.get_database()  # This will get the database from the URL
        collection = db.projects
        
        print("🔗 Connected to MongoDB successfully")
        print(f"📊 Database: {db.name}")
        print(f"📚 Collection: {collection.name}")
        
        # YouTube embedding data to add
        youtube_updates = {
            # KahPeeh kah-Ahn Ute Coffee House & Soda
            "4": {
                "video_url": "https://youtu.be/voPeTh_2fvw",
                "youtubeEmbedId": "voPeTh_2fvw"
            },
            # Ute Crossing Grill & Ute Lanes
            "5": {
                "video_url": "https://youtu.be/yFg8sR1Y42s", 
                "youtubeEmbedId": "yFg8sR1Y42s"
            }
        }
        
        print("\n🔄 Starting YouTube embedding data updates...")
        
        for project_id, youtube_data in youtube_updates.items():
            print(f"\n📝 Updating project ID {project_id}...")
            
            # First, check if project exists
            existing_project = collection.find_one({"id": project_id})
            if not existing_project:
                print(f"❌ Project with ID {project_id} not found!")
                continue
                
            print(f"✅ Found project: {existing_project.get('title', 'Unknown Title')}")
            
            # Update the project with YouTube data
            update_result = collection.update_one(
                {"id": project_id},
                {"$set": youtube_data}
            )
            
            if update_result.modified_count > 0:
                print(f"✅ Successfully updated project ID {project_id}")
                print(f"   - Added video_url: {youtube_data['video_url']}")
                print(f"   - Added youtubeEmbedId: {youtube_data['youtubeEmbedId']}")
            else:
                print(f"⚠️  No changes made to project ID {project_id} (data may already exist)")
        
        print("\n🔍 Verifying updates...")
        
        # Verify the updates
        for project_id in youtube_updates.keys():
            updated_project = collection.find_one({"id": project_id})
            if updated_project:
                video_url = updated_project.get('video_url', 'NOT SET')
                embed_id = updated_project.get('youtubeEmbedId', 'NOT SET')
                print(f"📊 Project {project_id}: video_url={video_url}, youtubeEmbedId={embed_id}")
            else:
                print(f"❌ Could not verify project {project_id}")
        
        print("\n✅ YouTube embedding data update completed successfully!")
        
        # Show total project count
        total_projects = collection.count_documents({})
        print(f"📈 Total projects in database: {total_projects}")
        
        # Close connection
        client.close()
        return True
        
    except Exception as e:
        print(f"❌ Error updating YouTube embedding data: {str(e)}")
        return False

if __name__ == "__main__":
    print("🚀 Starting YouTube Embedding Data Update Script")
    print("=" * 50)
    
    success = update_youtube_embedding_data()
    
    if success:
        print("\n🎉 Script completed successfully!")
        print("✅ YouTube embedding functionality should now work correctly")
    else:
        print("\n❌ Script failed!")
        print("⚠️  YouTube embedding functionality may not work properly")
    
    print("=" * 50)