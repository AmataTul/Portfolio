#!/usr/bin/env python3

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent / 'backend'
load_dotenv(ROOT_DIR / '.env')

async def update_educational_animation_project():
    """Update the Educational Animation project in the database with enhanced content"""
    
    # Database connection
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    try:
        # Enhanced Educational Animation project data
        educational_project_update = {
            "title": "Utah High School Bison Grant Program - Educational Animation & Marketing Campaign",
            "category": "Illustrations & Educational Content",
            "client": "Ute Tribal Enterprises - Ute Bison",
            "project_type": "Educational Animation & Promotional Marketing Campaign",
            "description": "Comprehensive educational animation and marketing campaign created for Ute Bison's 2024 Utah High School Bison Grant Program. Developed from concept to completion using Canva and advanced editing tools, including self-filmed footage at the bison ranch. This promotional initiative successfully attracted 15 schools across Utah to participate in the grant program, enabling schools to receive funding and purchase bison meat while promoting traditional knowledge and modern learning integration.",
            "images": [
                "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
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
            "brochureSections": {
                "section1": {
                    "title": "Educational Program Brochures",
                    "description": "Comprehensive brochures designed for Utah school districts highlighting bison grant benefits and educational opportunities",
                    "images": [
                        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
                    ]
                },
                "section2": {
                    "title": "Marketing Materials & Grant Information",
                    "description": "Professional marketing collateral including program benefits, application processes, and cultural education components",
                    "images": [
                        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
                        "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=600&fit=crop"
                    ]
                }
            }
        }
        
        # Find the existing Educational Animation project
        existing_project = await db.projects.find_one({
            "$or": [
                {"id": "6"},
                {"title": {"$regex": "High School Educational Animation", "$options": "i"}},
                {"title": {"$regex": "Utah High School Bison", "$options": "i"}},
                {"client": "Ute Tribal Enterprises - Ute Bison", "category": "Illustrations & Educational Content"}
            ]
        })
        
        if existing_project:
            # Update the existing project
            result = await db.projects.update_one(
                {"_id": existing_project["_id"]},
                {"$set": educational_project_update}
            )
            
            if result.modified_count > 0:
                print("✅ Successfully updated Educational Animation project in database")
                
                # Retrieve and display the updated project
                updated_project = await db.projects.find_one({"_id": existing_project["_id"]})
                print(f"   Title: {updated_project['title']}")
                print(f"   Project Type: {updated_project['project_type']}")
                print(f"   Video URL: {updated_project.get('video_url', 'Not set')}")
                print(f"   Key Contributions: {len(updated_project['key_contributions'])} items")
                print(f"   Skills Utilized: {len(updated_project['skills_utilized'])} skills")
                print(f"   Impact Metrics: {len(updated_project['impact']['quantified_metrics'])} quantified")
                print(f"   Brochure Sections: {'Yes' if updated_project.get('brochureSections') else 'No'}")
            else:
                print("⚠️  No changes made to existing project")
        else:
            # Create new project if not found
            educational_project_update["id"] = "utah_bison_grant_animation"
            result = await db.projects.insert_one(educational_project_update)
            print(f"✅ Created new Educational Animation project with ID: {result.inserted_id}")
            
    except Exception as e:
        print(f"❌ Error updating Educational Animation project: {str(e)}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(update_educational_animation_project())