#!/usr/bin/env python3

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent / 'backend'
load_dotenv(ROOT_DIR / '.env')

async def update_utah_education_project():
    """Update the Utah Education project with single video and additional images"""
    
    # Database connection
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    try:
        # Updated Educational Animation project data with single video
        education_project_update = {
            "title": "Utah High School Bison Grant Program - Educational Animation & Marketing Campaign",
            "category": "Illustrations & Educational Content",
            "client": "Ute Tribal Enterprises - Ute Bison",
            "project_type": "Educational Animation & Promotional Marketing Campaign",
            "description": "Comprehensive educational animation and marketing campaign created for Ute Bison's 2024 Utah High School Bison Grant Program. Developed from concept to completion using Canva and advanced editing tools, including self-filmed footage at the bison ranch. This promotional initiative successfully attracted 15 schools across Utah to participate in the grant program, enabling schools to receive funding and purchase bison meat while promoting traditional knowledge and modern learning integration.",
            "images": [
                "https://img.youtube.com/vi/DYLLB8qiQ8k/maxresdefault.jpg"  # YouTube thumbnail
            ],
            "type": "video",
            "featured": True,
            "orientation": "horizontal",
            "video_url": "https://youtu.be/DYLLB8qiQ8k?si=IOvfHjRqkPHxcnlu",
            "key_contributions": [
                "Created complete educational animation from scratch using Canva and professional editing tools",
                "Personally filmed and edited real-life footage at the Ute Bison ranch for authentic storytelling",
                "Developed comprehensive marketing strategy for Utah high school outreach targeting bison grant recipients",
                "Designed promotional brochures and marketing materials for statewide school district distribution",
                "Coordinated multi-channel campaign reaching 15+ schools across Utah with measurable lead generation",
                "Integrated traditional tribal knowledge with modern educational approaches through animated storytelling"
            ],
            "skills_utilized": [
                "Canva Animation Design",
                "Video Production & Editing", 
                "Documentary Filming",
                "Educational Content Development",
                "Graphic Design & Brochure Creation",
                "Statewide Marketing Campaign Management",
                "Lead Generation & Business Development",
                "Cultural Sensitivity & Traditional Knowledge Integration",
                "Grant Program Promotion",
                "Multi-Platform Content Distribution"
            ],
            "impact": {
                "quantified_metrics": [
                    "Successfully attracted 15 different schools across Utah to participate in bison grant program",
                    "Generated qualified leads resulting in direct business partnerships and meat sales contracts",
                    "Achieved statewide reach across Utah school districts through strategic marketing distribution",
                    "100% completion rate on animation project from concept to final delivery",
                    "Created 10+ marketing materials including brochures, flyers, and promotional assets"
                ],
                "qualitative_outcomes": [
                    "Successfully bridged traditional tribal knowledge with modern educational approaches",
                    "Enhanced Ute Bison brand recognition and credibility among Utah educational institutions",
                    "Strengthened relationships between tribal enterprises and state educational system",
                    "Promoted cultural education and heritage awareness through innovative animation storytelling",
                    "Established foundation for ongoing partnerships between schools and tribal businesses"
                ]
            },
            "educationalImpact": {
                "targetAudience": "High School Students & Educators Statewide",
                "focus": "Traditional knowledge integration through modern educational marketing",
                "topics": [
                    "Traditional tribal knowledge and cultural heritage preservation",
                    "Modern educational pathways and bison grant program benefits",
                    "Community values and sustainable food sourcing education",
                    "Bridging traditional wisdom with contemporary learning through innovative animation"
                ],
                "format": "Professional animated educational video with real-life ranch footage and comprehensive marketing materials"
            },
            "additionalImages": {
                "title": "Supporting Marketing Materials",
                "description": "Brochures and promotional materials created for the campaign",
                "images": [
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
                ]
            }
        }
        
        # Find the existing Utah Education project
        existing_project = await db.projects.find_one({
            "$or": [
                {"title": {"$regex": "Utah High School Bison", "$options": "i"}},
                {"title": {"$regex": "High School Educational Animation", "$options": "i"}},
                {"client": "Ute Tribal Enterprises - Ute Bison", "category": "Illustrations & Educational Content"}
            ]
        })
        
        if existing_project:
            # Update the existing project and remove brochureSections
            unset_fields = {"brochureSections": 1}  # Remove old brochure sections
            
            # First remove the old brochure sections
            await db.projects.update_one(
                {"_id": existing_project["_id"]},
                {"$unset": unset_fields}
            )
            
            # Then update with new data
            result = await db.projects.update_one(
                {"_id": existing_project["_id"]},
                {"$set": education_project_update}
            )
            
            if result.modified_count > 0:
                print("✅ Successfully updated Utah Education project in database")
                
                # Retrieve and display the updated project
                updated_project = await db.projects.find_one({"_id": existing_project["_id"]})
                print(f"   Title: {updated_project['title']}")
                print(f"   Images: {len(updated_project['images'])} (should be 1 - YouTube thumbnail)")
                print(f"   Video URL: {updated_project.get('video_url', 'Not set')}")
                print(f"   Additional Images: {'Yes' if updated_project.get('additionalImages') else 'No'}")
                print(f"   Brochure Sections Removed: {'Yes' if 'brochureSections' not in updated_project else 'No'}")
            else:
                print("⚠️  No changes made to existing project")
        else:
            # Create new project if not found
            education_project_update["id"] = "utah_education_single_video"
            result = await db.projects.insert_one(education_project_update)
            print(f"✅ Created new Utah Education project with ID: {result.inserted_id}")
            
    except Exception as e:
        print(f"❌ Error updating Utah Education project: {str(e)}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(update_utah_education_project())