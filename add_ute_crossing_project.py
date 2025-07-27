#!/usr/bin/env python3
"""
Script to add the new Ute Crossing Grill & Ute Lanes project to MongoDB database.
This ensures the project is properly persisted and available via API endpoints.
"""

import os
import sys
from pymongo import MongoClient
from bson import ObjectId
import json

def get_mongo_client():
    """Get MongoDB client from environment"""
    mongo_url = os.getenv('MONGO_URL', 'mongodb://localhost:27017/portfolio')
    return MongoClient(mongo_url)

def add_ute_crossing_project():
    """Add the Ute Crossing Grill & Ute Lanes project to the database"""
    
    # New project data
    ute_crossing_project = {
        "id": "5",
        "title": "Ute Crossing Grill & Ute Lanes - Video Advertisement Campaign",
        "category": "Advertising",
        "client": "Ute Tribal Enterprises - Ute Crossing Grill & Ute Lanes",
        "project_type": "Multi-Platform Video Advertisement Production & Direction",
        "description": "Comprehensive video advertisement campaign for Ute Crossing Grill & Ute Lanes, a unique entertainment destination combining authentic dining with bowling and arcade gaming. I coordinated and directed this complete advertising production from initial concept development through final editing, showcasing the venue's diverse offerings including room booking services for private events, hosting capabilities, and family entertainment. The restaurant features comfort food with a distinctive mix of Native American and traditional American cuisine, managed by Ute Tribal Enterprises as an indigenous-owned business serving the community. I directed the entire creative process, managed cinema and big screen displays for sponsorship events, and coordinated post-production editing to create professional-grade advertising content suitable for multiple platform deployment.",
        "images": [
            "https://customer-assets.emergentagent.com/job_project-showcase-15/artifacts/0heyu0bz_crossingrill.jpg"
        ],
        "type": "video",
        "featured": True,
        "orientation": "horizontal",
        "videoFile": "uvpl-utecrossinggrill_utes_lanes_2025 (1080p).mp4",
        "video_url": "https://customer-assets.emergentagent.com/job_project-showcase-15/artifacts/otstibjq_uvpl-utecrossinggrill_utes_lanes_2025%20%281080p%29.mp4",
        "key_contributions": [
            "Coordinated complete advertising campaign from concept to final production",
            "Directed video advertisement showcasing restaurant, bowling, arcade, and room booking services",
            "Managed cinema screenings and big screen displays for sponsorship and community events",
            "Coordinated professional editing team for high-quality commercial-grade content creation",
            "Developed marketing strategy emphasizing indigenous business cultural authenticity and community connection",
            "Created advertising framework supporting room booking promotions and private event hosting services"
        ],
        "skills_utilized": [
            "Video Advertisement Direction & Production Coordination",
            "Multi-Platform Advertising Campaign Management",
            "Indigenous Business Marketing & Cultural Sensitivity",
            "Cinema & Big Screen Display Coordination",
            "Post-Production Team Management & Editing Direction",
            "Hospitality & Entertainment Venue Promotion Strategy",
            "Room Booking & Event Hosting Service Marketing"
        ],
        "impact": {
            "quantified": [
                "Directed comprehensive advertising production for multi-service entertainment venue",
                "Managed cinema and big screen advertising displays for community event sponsorship",
                "Created professional advertising content suitable for television and digital platform distribution",
                "Established marketing framework supporting room booking services and private event hosting"
            ],
            "qualitative": [
                "Successfully showcased venue's unique combination of dining, bowling, arcade gaming, and event hosting services",
                "Elevated Ute Tribal Enterprises brand presence through culturally authentic advertising content",
                "Demonstrated comprehensive production capabilities from creative direction through post-production coordination",
                "Created sustainable advertising template supporting ongoing venue promotion and community engagement",
                "Established expertise in multi-venue entertainment marketing and indigenous business promotion",
                "Enhanced portfolio with professional restaurant and entertainment venue advertising experience",
                "Strengthened community connection through indigenous-owned business promotion and cultural representation"
            ]
        },
        "related_projects": [
            {
                "id": "4",
                "title": "KahPeeh kah-Ahn Ute Coffee House & Soda - Video Advertisement Campaign",
                "description": "Complementary advertising work for sister Ute Tribal Enterprises venue focusing on coffee house and social experience"
            }
        ]
    }

    try:
        # Connect to MongoDB
        client = get_mongo_client()
        db = client.get_default_database()
        collection = db.projects
        
        # Check if project already exists
        existing_project = collection.find_one({"id": "5"})
        if existing_project:
            print("✅ Project with ID 5 already exists. Updating...")
            result = collection.update_one({"id": "5"}, {"$set": ute_crossing_project})
            print(f"✅ Updated existing project. Modified count: {result.modified_count}")
        else:
            # Insert the new project
            result = collection.insert_one(ute_crossing_project)
            print(f"✅ Successfully added Ute Crossing Grill & Ute Lanes project to database")
            print(f"✅ Inserted ID: {result.inserted_id}")
        
        # Verify the project was added
        verification = collection.find_one({"id": "5"})
        if verification:
            print(f"✅ Verification successful: Project '{verification['title']}' found in database")
            print(f"✅ Category: {verification['category']}")
            print(f"✅ Client: {verification['client']}")
            print(f"✅ Video URL: {verification.get('video_url', 'N/A')}")
            return True
        else:
            print("❌ Verification failed: Project not found after insertion")
            return False
            
    except Exception as e:
        print(f"❌ Error adding project to database: {str(e)}")
        return False
    finally:
        if 'client' in locals():
            client.close()

def update_project_ids():
    """Update other project IDs to maintain sequential order"""
    try:
        client = get_mongo_client()
        db = client.get_default_database()
        collection = db.projects
        
        # Update project IDs as per the new structure
        id_updates = [
            ("6", "7"),  # Adobe Creative Suite Instagram Reels
            ("7", "8"),  # Adobe Analytics Challenge
            ("8", "9"),  # Utah High & Elementary School Bison Grant
            ("9", "10"), # KahPeeh kah-Ahn TikTok Campaign
        ]
        
        for old_id, new_id in id_updates:
            # Check if project with old_id exists and new_id doesn't exist
            old_project = collection.find_one({"id": old_id})
            new_project = collection.find_one({"id": new_id})
            
            if old_project and not new_project:
                result = collection.update_one({"id": old_id}, {"$set": {"id": new_id}})
                if result.modified_count > 0:
                    print(f"✅ Updated project ID from {old_id} to {new_id}")
                else:
                    print(f"⚠️  No changes made for ID {old_id} to {new_id}")
            elif new_project:
                print(f"ℹ️  Project with ID {new_id} already exists, skipping update")
            else:
                print(f"⚠️  Project with ID {old_id} not found")
        
        return True
        
    except Exception as e:
        print(f"❌ Error updating project IDs: {str(e)}")
        return False
    finally:
        if 'client' in locals():
            client.close()

if __name__ == "__main__":
    print("🔄 Adding Ute Crossing Grill & Ute Lanes project to MongoDB...")
    
    # Add the new project
    if add_ute_crossing_project():
        print("\n🔄 Updating other project IDs for sequential integrity...")
        if update_project_ids():
            print("\n✅ DATABASE SYNCHRONIZATION COMPLETE!")
            print("✅ Ute Crossing Grill & Ute Lanes project successfully added")
            print("✅ Project IDs updated for sequential integrity")
        else:
            print("\n⚠️  Project added but ID updates failed")
    else:
        print("\n❌ Failed to add project to database")
        sys.exit(1)