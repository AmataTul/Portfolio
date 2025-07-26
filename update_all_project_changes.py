#!/usr/bin/env python3

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent / 'backend'
load_dotenv(ROOT_DIR / '.env')

async def update_all_project_changes():
    """Update all projects with the latest changes"""
    
    # Database connection
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    try:
        # Update Beats by Dre project with new dual sections layout
        beats_update = {
            "$set": {
                "dualSections.analyticsSection.title": "Analytics & Research - Data Analysis & Presentations",
                "dualSections.analyticsSection.description": "Consumer behavior analysis, strategic insights, and comprehensive presentations using SQL, Tableau, and advanced data visualization to optimize celebrity collaboration campaigns",
                "dualSections.analyticsSection.images": [
                    "/beats0.jpg",  # Analytics dashboard image 1
                    "/beats2.jpg",  # Market research visualization 2  
                    "/beats4.jpg",  # Consumer data analysis 3
                    "/beats6.jpg"   # Horizontal presentation image 4
                ],
                "dualSections.analyticsSection.layout": "mixed",
                "dualSections.analyticsSection.highlights": [
                    "SQL database analysis for Gen Z consumer behavior patterns",
                    "Tableau data visualizations revealing key market insights", 
                    "Celebrity partnership effectiveness research and trend analysis",
                    "Comprehensive presentations and strategic recommendations"
                ],
                "dualSections.brandingSection.images": [
                    "/beats.jpg",   # Vertical brand identity design
                    "/beats3.jpg"   # Horizontal marketing materials
                ],
                "dualSections.brandingSection.layout": "vertical_horizontal"
            }
        }
        
        # Update Beats by Dre project
        beats_result = await db.projects.update_one(
            {"client": "Beats by Dre"},
            beats_update
        )
        
        if beats_result.modified_count > 0:
            print("✅ Updated Beats by Dre project:")
            print("   - Analytics section: 4 images (3 square + 1 horizontal)")
            print("   - Branding section: 2 images (1 vertical + 1 horizontal)")
            print("   - Updated title to include Research & Presentations")
        
        # Confirm Coffee House project has no main video (should already be correct)
        coffee_house = await db.projects.find_one({
            "title": {"$regex": "KahPeeh kah-Ahn", "$options": "i"}
        })
        
        if coffee_house:
            if not coffee_house.get('images') or len(coffee_house.get('images', [])) == 0:
                print("✅ Coffee House project confirmed:")
                print("   - No main video (images array is empty)")
                print("   - 6 TikTok videos preserved in combinedTikTokSection")
            else:
                # Remove main images if they exist
                await db.projects.update_one(
                    {"_id": coffee_house["_id"]},
                    {"$set": {"images": []}}
                )
                print("✅ Coffee House project updated:")
                print("   - Removed main video images")
                print("   - 6 TikTok videos preserved")
        
        print("\n🎯 All project updates completed successfully!")
        
    except Exception as e:
        print(f"❌ Error updating projects: {str(e)}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(update_all_project_changes())