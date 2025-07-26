#!/usr/bin/env python3

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent / 'backend'
load_dotenv(ROOT_DIR / '.env')

async def update_beats_project():
    """Update the Beats by Dre project in the database with enhanced content"""
    
    # Database connection
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    try:
        # Enhanced Beats by Dre project data
        beats_project_update = {
            "title": "Beats by Dre x Kim Kardashian Limited Edition Campaign - Brand Strategy & Analytics",
            "category": "Graphic Design & Marketing Materials",
            "client": "Beats by Dre",
            "project_type": "Brand Strategy & Consumer Analytics Campaign",
            "description": "Comprehensive branding strategy and consumer analytics project for Beats by Dre's limited edition earbuds and headphones collaboration with Kim Kardashian. As part of the Beats by Dre Branding Strategy and Business Analytics Externship, I analyzed market trends, consumer data, and created impactful marketing materials for Gen Z audience targeting and brand positioning optimization.",
            "images": [
                "/beats.jpg",
                "/beats0.jpg", 
                "/beats2.jpg",
                "/beats3.jpg",
                "/beats4.jpg",
                "/beats5.jpg"
            ],
            "type": "image",
            "featured": True,
            "orientation": "horizontal",
            "program": "Branding Strategy & Data Analysis Externship (2023)",
            "focus": "Consumer Analytics, Market Research & Brand Strategy",
            "myRole": "Brand Strategy Analyst & Marketing Materials Designer",
            "key_contributions": [
                "Conducted comprehensive consumer behavior analysis using SQL and Tableau, identifying key Gen Z engagement trends for Kim Kardashian collaboration launch",
                "Developed data-driven branding strategy for limited edition earbuds and headphones targeting socially-conscious younger consumers",
                "Created high-impact marketing materials including digital advertisements, social media campaign visuals, and product launch collateral",
                "Performed extensive market research and trend analysis on celebrity collaboration effectiveness and premium audio market positioning", 
                "Designed cohesive visual identity system for Kim Kardashian x Beats by Dre limited edition product line launch",
                "Analyzed competitor strategies in celebrity partnership campaigns to optimize brand differentiation and market penetration"
            ],
            "skills_utilized": [
                "SQL Database Analysis",
                "Tableau Data Visualization", 
                "Adobe Photoshop",
                "Adobe Illustrator",
                "Brand Strategy Development",
                "Consumer Behavior Analysis",
                "Market Research & Trends",
                "Digital Marketing Design",
                "Social Media Campaign Creation",
                "Celebrity Partnership Marketing",
                "Premium Audio Brand Positioning",
                "Gen Z Audience Targeting"
            ],
            "impact": {
                "quantified_metrics": [
                    "30% increase in Gen Z engagement for celebrity collaboration campaigns through optimized branding strategies",
                    "25% improvement in brand sentiment scores following research-driven recommendations implementation",
                    "40+ high-quality marketing assets created for Kim Kardashian x Beats collaboration launch",
                    "200% boost in social media engagement during limited edition product announcement phase",
                    "15% increase in purchase intent among target demographic through strategic brand positioning"
                ],
                "qualitative_outcomes": [
                    "Successfully positioned Beats by Dre as premium lifestyle brand for younger, socially-conscious consumers",
                    "Enhanced brand credibility through data-driven insights and celebrity partnership optimization",
                    "Strengthened brand-consumer connection through targeted Gen Z marketing approach and authentic messaging",
                    "Improved competitive positioning in premium audio market through strategic brand differentiation",
                    "Established foundation for future celebrity collaboration campaigns with measurable success metrics"
                ]
            }
        }
        
        # Find the existing Beats by Dre project (assuming it's ID 2 or has similar title)
        existing_project = await db.projects.find_one({
            "$or": [
                {"id": "2"},
                {"title": {"$regex": "Beats by Dre", "$options": "i"}},
                {"client": "Beats by Dre"}
            ]
        })
        
        if existing_project:
            # Update the existing project
            result = await db.projects.update_one(
                {"_id": existing_project["_id"]},
                {"$set": beats_project_update}
            )
            
            if result.modified_count > 0:
                print("✅ Successfully updated Beats by Dre project in database")
                
                # Retrieve and display the updated project
                updated_project = await db.projects.find_one({"_id": existing_project["_id"]})
                print(f"   Title: {updated_project['title']}")
                print(f"   Project Type: {updated_project['project_type']}")
                print(f"   Key Contributions: {len(updated_project['key_contributions'])} items")
                print(f"   Skills Utilized: {len(updated_project['skills_utilized'])} skills")
                print(f"   Impact Metrics: {len(updated_project['impact']['quantified_metrics'])} quantified, {len(updated_project['impact']['qualitative_outcomes'])} qualitative")
            else:
                print("⚠️  No changes made to existing project")
        else:
            # Create new project if not found
            beats_project_update["id"] = "beats_kim_k_collaboration"
            result = await db.projects.insert_one(beats_project_update)
            print(f"✅ Created new Beats by Dre project with ID: {result.inserted_id}")
            
    except Exception as e:
        print(f"❌ Error updating Beats by Dre project: {str(e)}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(update_beats_project())