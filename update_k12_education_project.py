#!/usr/bin/env python3

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent / 'backend'
load_dotenv(ROOT_DIR / '.env')

async def update_k12_education_project():
    """Update the Utah Education project to include both high and elementary schools"""
    
    # Database connection
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    try:
        # Updated Educational Animation project data with K-12 scope
        k12_project_update = {
            "title": "Utah High & Elementary School Bison Grant Program - Educational Animation & Marketing Campaign",
            "category": "Illustrations & Educational Content",
            "client": "Ute Tribal Enterprises - Ute Bison",
            "project_type": "Educational Animation & Promotional Marketing Campaign",
            "description": "Comprehensive educational animation and marketing campaign created for Ute Bison's 2024 Utah School Bison Grant Program targeting both high schools and elementary schools. Developed from concept to completion using Canva and advanced editing tools, including self-filmed footage at the bison ranch. This promotional initiative successfully attracted 15 schools across Utah to participate in the grant program, enabling schools to receive funding and purchase bison meat while promoting traditional knowledge and modern learning integration for students of all ages.",
            "images": [
                "https://img.youtube.com/vi/DYLLB8qiQ8k/maxresdefault.jpg"  # YouTube thumbnail
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
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
                ]
            }
        }
        
        # Find the existing Utah Education project
        existing_project = await db.projects.find_one({
            "$or": [
                {"title": {"$regex": "Utah.*School.*Bison", "$options": "i"}},
                {"title": {"$regex": "High School Educational Animation", "$options": "i"}},
                {"client": "Ute Tribal Enterprises - Ute Bison", "category": "Illustrations & Educational Content"}
            ]
        })
        
        if existing_project:
            # Update the existing project
            result = await db.projects.update_one(
                {"_id": existing_project["_id"]},
                {"$set": k12_project_update}
            )
            
            if result.modified_count > 0:
                print("✅ Successfully updated Utah K-12 Education project in database")
                
                # Retrieve and display the updated project
                updated_project = await db.projects.find_one({"_id": existing_project["_id"]})
                print(f"   Title: {updated_project['title']}")
                print(f"   Target Audience: {updated_project['educationalImpact']['targetAudience']}")
                print(f"   Description mentions: K-12, Elementary & High Schools")
                print(f"   Key Contributions: {len(updated_project['key_contributions'])} items (K-12 focused)")
                print(f"   Impact Metrics: Updated for elementary and secondary education")
            else:
                print("⚠️  No changes made to existing project")
        else:
            # Create new project if not found
            k12_project_update["id"] = "utah_k12_bison_grant"
            result = await db.projects.insert_one(k12_project_update)
            print(f"✅ Created new Utah K-12 Education project with ID: {result.inserted_id}")
            
    except Exception as e:
        print(f"❌ Error updating Utah K-12 Education project: {str(e)}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(update_k12_education_project())