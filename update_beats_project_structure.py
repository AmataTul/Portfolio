#!/usr/bin/env python3

import os
import sys
from pymongo import MongoClient
from pprint import pprint

# Add the backend directory to the path so we can import models
sys.path.append('/app/backend')

def update_beats_project_structure():
    """
    Update the Beats by Dre project structure in MongoDB to match new requirements
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
        
        # Find the Beats by Dre project - try multiple possible IDs
        beats_project = None
        possible_ids = ["2", "beats_kim_k_collaboration", "beats-by-dre"]
        
        for project_id in possible_ids:
            project = collection.find_one({"id": project_id})
            if project and "Beats by Dre" in project.get("title", ""):
                beats_project = project
                beats_id = project_id
                print(f"✅ Found Beats by Dre project with ID: {project_id}")
                break
        
        if not beats_project:
            print("❌ Beats by Dre project not found! Searching by title...")
            beats_project = collection.find_one({"title": {"$regex": "Beats by Dre", "$options": "i"}})
            if beats_project:
                beats_id = beats_project.get("id")
                print(f"✅ Found Beats by Dre project by title with ID: {beats_id}")
            else:
                print("❌ Beats by Dre project not found in database!")
                return False
        
        print(f"📝 Current project title: {beats_project.get('title', 'Unknown')}")
        
        # New structure for Beats by Dre project
        new_structure = {
            # Update main images to only 3 images
            "images": [
                "beatsg1.jpg",  # Graphic design project 1
                "beatsg2.jpg",  # Graphic design project 2
                "beatsg3.jpg"   # Graphic design project 3
            ],
            
            # Add creative design highlights (moved to top after description)
            "creativeDesignHighlights": [
                "Cohesive visual identity system for limited edition product line",
                "High-impact digital advertisements and social media campaign visuals",
                "Product launch collateral and celebrity partnership marketing materials",
                "Brand differentiation through strategic design and Gen Z-targeted aesthetics"
            ],
            
            # Add separate analytics section (independent from main images)
            "separateAnalyticsSection": {
                "title": "Analytics & Research - Data Analysis & Presentations",
                "description": "Consumer behavior analysis, strategic insights, and comprehensive presentations using SQL, Tableau, and advanced data visualization to optimize celebrity collaboration campaigns",
                "images": [
                    "beatsdata1.jpg",  # Analytics data image 1 (horizontal)
                    "beatsdata2.jpg",  # Analytics data image 2 (horizontal)
                    "beatsdata3.jpg",  # Analytics data image 3 (horizontal)
                    "beatsdata4.jpg"   # Analytics data image 4 (horizontal)
                ],
                "layout": "all_horizontal",  # All 4 images are horizontal
                "highlights": [
                    "SQL database analysis for Gen Z consumer behavior patterns",
                    "Tableau data visualizations revealing key market insights", 
                    "Celebrity partnership effectiveness research and trend analysis",
                    "Comprehensive presentations and strategic recommendations"
                ]
            }
        }
        
        print("\n🔄 Updating Beats by Dre project structure...")
        
        # Remove old dualSections structure if it exists
        unset_fields = {}
        if "dualSections" in beats_project:
            unset_fields["dualSections"] = ""
            print("🗑️  Removing old dualSections structure")
        
        # Update the project with new structure
        update_operation = {"$set": new_structure}
        if unset_fields:
            update_operation["$unset"] = unset_fields
        
        update_result = collection.update_one(
            {"id": beats_id},
            update_operation
        )
        
        if update_result.modified_count > 0:
            print("✅ Successfully updated Beats by Dre project structure")
            print("   - Updated main images to 3 items (beatsg1.jpg, beatsg2.jpg, beatsg3.jpg)")
            print("   - Added creativeDesignHighlights array with 4 items")
            print("   - Added separateAnalyticsSection with 4 horizontal images")
            print("   - Removed old dualSections structure")
        else:
            print("⚠️  No changes made (data may already exist or project not found)")
        
        print("\n🔍 Verifying updates...")
        
        # Verify the updates
        updated_project = collection.find_one({"id": beats_id})
        if updated_project:
            print("📊 Verification Results:")
            
            # Check main images
            main_images = updated_project.get('images', [])
            print(f"   - Main images count: {len(main_images)}")
            if len(main_images) == 3:
                print(f"   - Main images: {main_images}")
            
            # Check creative design highlights
            creative_highlights = updated_project.get('creativeDesignHighlights', [])
            print(f"   - Creative design highlights count: {len(creative_highlights)}")
            
            # Check separate analytics section
            analytics_section = updated_project.get('separateAnalyticsSection', {})
            if analytics_section:
                analytics_images = analytics_section.get('images', [])
                print(f"   - Analytics section images count: {len(analytics_images)}")
                print(f"   - Analytics layout: {analytics_section.get('layout', 'NOT SET')}")
            
            # Check if old dualSections is removed
            has_dual_sections = 'dualSections' in updated_project
            print(f"   - Old dualSections removed: {not has_dual_sections}")
        else:
            print("❌ Could not verify project updates")
        
        print("\n✅ Beats by Dre project restructuring completed successfully!")
        
        # Show total project count
        total_projects = collection.count_documents({})
        print(f"📈 Total projects in database: {total_projects}")
        
        # Close connection
        client.close()
        return True
        
    except Exception as e:
        print(f"❌ Error updating Beats by Dre project structure: {str(e)}")
        return False

if __name__ == "__main__":
    print("🚀 Starting Beats by Dre Project Structure Update Script")
    print("=" * 60)
    
    success = update_beats_project_structure()
    
    if success:
        print("\n🎉 Script completed successfully!")
        print("✅ Beats by Dre project structure should now match the new requirements")
    else:
        print("\n❌ Script failed!")
        print("⚠️  Beats by Dre project structure may not be updated properly")
    
    print("=" * 60)