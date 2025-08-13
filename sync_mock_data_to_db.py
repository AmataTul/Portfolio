#!/usr/bin/env python3

import os
import sys
import json
import uuid
from datetime import datetime
sys.path.append('/app/backend')

from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/backend/.env')

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DATABASE_NAME = 'portfolio_db'

# Import the mock data structure
mock_projects = [
    {
        "id": 10,
        "title": "Utah High & Elementary School Bison Grant Program - Educational Animation & Marketing Campaign",
        "category": "Illustrations & Educational Content",
        "client": "Ute Tribal Enterprises - Ute Bison",
        "project_type": "Educational Animation & Promotional Marketing Campaign",
        "description": "Comprehensive educational animation and marketing campaign created for Ute Bison's 2024 Utah School Bison Grant Program targeting both high schools and elementary schools. Developed from concept to completion using Canva and advanced editing tools, including self-filmed footage at the bison ranch. This promotional initiative successfully attracted 15 schools across Utah to participate in the grant program, enabling schools to receive funding and purchase bison meat while promoting traditional knowledge and modern learning integration for students of all ages.",
        "images": [
            "https://img.youtube.com/vi/DYLLB8qiQ8k/maxresdefault.jpg"
        ],
        "type": "video",
        "featured": True,
        "orientation": "horizontal",
        "video_url": "https://youtu.be/DYLLB8qiQ8k?si=IOvfHjRqkPHxcnlu",
        "key_contributions": [
            "Created complete educational animation from scratch using Canva and professional editing tools for K-12 audience engagement",
            "Personally filmed and edited real-life footage at the Ute Bison ranch for authentic storytelling across grade levels",
            "Developed comprehensive marketing strategy for Utah high school and elementary school outreach targeting bison grant recipients",
            "Designed age-appropriate promotional brochures and marketing materials for statewide school district distribution",
            "Coordinated multi-channel campaign reaching 15+ schools across Utah with measurable lead generation for both elementary and secondary education",
            "Integrated traditional tribal knowledge with modern educational approaches through animated storytelling suitable for all school levels"
        ],
        "skills_utilized": [
            "Canva Animation Design",
            "Video Production & Editing", 
            "Documentary Filming",
            "K-12 Educational Content Development",
            "Age-Appropriate Graphic Design & Brochure Creation",
            "Statewide Marketing Campaign Management",
            "Lead Generation & Business Development",
            "Cultural Sensitivity & Traditional Knowledge Integration",
            "Grant Program Promotion",
            "Multi-Platform Content Distribution"
        ],
        "impact": {
            "quantified_metrics": [
                "Successfully attracted 15 different high schools and elementary schools across Utah to participate in bison grant program",
                "Generated qualified leads resulting in direct business partnerships and meat sales contracts with K-12 institutions",
                "Achieved statewide reach across Utah school districts serving students from kindergarten through 12th grade",
                "100% completion rate on animation project from concept to final delivery for multi-grade audience",
                "Created 10+ marketing materials including age-appropriate brochures, flyers, and promotional assets"
            ],
            "qualitative_outcomes": [
                "Successfully bridged traditional tribal knowledge with modern educational approaches for students across all grade levels",
                "Enhanced Ute Bison brand recognition and credibility among Utah K-12 educational institutions",
                "Strengthened relationships between tribal enterprises and both elementary and secondary education systems",
                "Promoted cultural education and heritage awareness through innovative animation storytelling for diverse age groups",
                "Established foundation for ongoing partnerships between schools and tribal businesses across the K-12 spectrum"
            ]
        },
        "educationalImpact": {
            "targetAudience": "K-12 Students (Elementary through High School) & Educators Statewide",
            "focus": "Traditional knowledge integration through modern educational marketing for all grade levels",
            "topics": [
                "Traditional tribal knowledge and cultural heritage preservation accessible to young learners",
                "Modern educational pathways and bison grant program benefits for K-12 institutions",
                "Community values and sustainable food sourcing education for elementary and high school students",
                "Bridging traditional wisdom with contemporary learning through innovative animation for diverse age groups"
            ],
            "format": "Professional animated educational video with real-life ranch footage and comprehensive marketing materials designed for K-12 engagement"
        },
        "additionalImages": {
            "title": "Supporting Marketing Materials",
            "description": "Brochures and promotional materials created for the K-12 campaign",
            "images": [
                "https://customer-assets.emergentagent.com/job_project-curator/artifacts/hqj4x6j9_bandicam%202025-08-12%2018-04-41-496.jpg",
                "https://customer-assets.emergentagent.com/job_project-curator/artifacts/djovx3im_bandicam%202025-08-12%2018-04-27-445.jpg"
            ]
        }
    }
]

async def sync_utah_project():
    """Sync the Utah project to the database"""
    
    # Connect to MongoDB
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DATABASE_NAME]
    collection = db['projects']
    
    try:
        print("🔄 Syncing Utah High & Elementary School Bison Grant Program project to database...")
        
        project_data = mock_projects[0]
        
        # Check if project already exists
        existing = await collection.find_one({"id": project_data["id"]})
        
        if existing:
            print(f"📝 Updating existing project with ID {project_data['id']}...")
            
            # Update with new data
            await collection.update_one(
                {"id": project_data["id"]},
                {"$set": {
                    **project_data,
                    "updated_at": datetime.utcnow()
                }}
            )
            print("✅ Project updated successfully")
            
        else:
            print(f"➕ Creating new project with ID {project_data['id']}...")
            
            # Add timestamps
            project_data["created_at"] = datetime.utcnow()
            project_data["updated_at"] = datetime.utcnow()
            
            # Insert new project
            await collection.insert_one(project_data)
            print("✅ Project created successfully")
        
        # Verify the additionalImages are correctly saved
        saved_project = await collection.find_one({"id": project_data["id"]})
        if saved_project and 'additionalImages' in saved_project:
            print(f"✅ Verification successful:")
            print(f"   Project title: {saved_project['title']}")
            print(f"   Additional images count: {len(saved_project['additionalImages']['images'])}")
            print(f"   Image 1: {saved_project['additionalImages']['images'][0]}")
            print(f"   Image 2: {saved_project['additionalImages']['images'][1]}")
        else:
            print("⚠️  Verification failed - additionalImages not found")
            
    except Exception as e:
        print(f"❌ Error syncing Utah project: {str(e)}")
        import traceback
        traceback.print_exc()
    
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(sync_utah_project())