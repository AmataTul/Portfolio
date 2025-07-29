#!/usr/bin/env python3
"""
Script to add the new Aigata brand graphics project with 20 image placeholders
"""

import os
import sys
from pymongo import MongoClient
from dotenv import load_dotenv

def get_database():
    """Get the correct database"""
    # Load environment variables from backend/.env
    load_dotenv('/app/backend/.env')
    
    mongo_url = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
    client = MongoClient(mongo_url)
    db_name = os.getenv('DB_NAME', 'test_database')
    return client[db_name]

def add_aigata_brand_project():
    """Add the new Aigata brand graphics project"""
    
    # New Aigata brand project data
    aigata_brand_project = {
        "id": "14",
        "title": "Aigata Brand - Comprehensive Visual Identity & Marketing Graphics Collection",
        "category": "Graphic Design & Marketing Materials",
        "client": "Aigata - Personal Business Brand",
        "project_type": "Complete Brand Identity Design & Marketing Materials Development",
        "description": "Comprehensive visual identity and marketing graphics collection for Aigata, my personal business brand. This extensive project encompasses complete brand development from logo design and color schemes to comprehensive marketing materials and digital assets. I designed and created over 20 distinct graphic elements that establish a cohesive, professional brand presence across all marketing channels. The collection includes business cards, letterheads, social media graphics, promotional materials, digital assets, and brand guidelines that reflect the innovative and professional nature of the Aigata brand while maintaining consistency across all touchpoints.",
        "images": [
            "AIGATA_BRAND_IMAGE_1",   # Logo design primary version
            "AIGATA_BRAND_IMAGE_2",   # Logo variations and alternatives  
            "AIGATA_BRAND_IMAGE_3",   # Color palette and brand guidelines
            "AIGATA_BRAND_IMAGE_4",   # Business card design front/back
            "AIGATA_BRAND_IMAGE_5",   # Letterhead and stationery design
            "AIGATA_BRAND_IMAGE_6",   # Social media profile graphics
            "AIGATA_BRAND_IMAGE_7",   # Instagram story templates
            "AIGATA_BRAND_IMAGE_8",   # Facebook cover and post graphics
            "AIGATA_BRAND_IMAGE_9",   # LinkedIn banner and profile assets
            "AIGATA_BRAND_IMAGE_10",  # Website header and hero graphics
            "AIGATA_BRAND_IMAGE_11",  # Email signature and template design
            "AIGATA_BRAND_IMAGE_12",  # Promotional flyer and brochure design
            "AIGATA_BRAND_IMAGE_13",  # Brand presentation template
            "AIGATA_BRAND_IMAGE_14",  # Marketing materials and collateral
            "AIGATA_BRAND_IMAGE_15",  # Digital advertising graphics
            "AIGATA_BRAND_IMAGE_16",  # Brand merchandise design concepts
            "AIGATA_BRAND_IMAGE_17",  # Packaging and product graphics
            "AIGATA_BRAND_IMAGE_18",  # Event and conference materials
            "AIGATA_BRAND_IMAGE_19",  # Brand style guide documentation
            "AIGATA_BRAND_IMAGE_20"   # Complete brand identity overview
        ],
        "type": "design",
        "featured": True,
        "orientation": "mixed",
        "key_contributions": [
            "Designed complete visual identity system for Aigata brand from concept to final implementation",
            "Created comprehensive logo design with multiple variations and applications for diverse marketing needs",
            "Developed cohesive color palette, typography, and visual elements that reflect brand personality and values",
            "Produced 20+ professional marketing graphics and materials ensuring consistent brand presentation across all channels",
            "Established brand guidelines and style documentation for scalable brand application and future growth",
            "Coordinated complete brand rollout across digital platforms, print materials, and marketing collateral"
        ],
        "skills_utilized": [
            "Brand Identity Design & Development",
            "Logo Design & Visual Identity Creation",
            "Marketing Graphics & Collateral Design",
            "Brand Guidelines & Style Guide Development",
            "Multi-Platform Design Consistency",
            "Color Theory & Typography Selection",
            "Print Design & Digital Asset Creation",
            "Brand Strategy & Visual Communication",
            "Adobe Creative Suite Mastery",
            "Comprehensive Brand System Architecture"
        ],
        "impact": {
            "quantified": [
                "Created comprehensive brand identity system with 20+ distinct graphic elements for complete brand coverage",
                "Developed scalable logo design with 5+ variations suitable for all marketing applications and size requirements",
                "Established consistent visual identity across 10+ different marketing channels and touchpoints",
                "Produced complete brand guidelines documentation ensuring 100% brand consistency in future applications",
                "Created marketing materials supporting personal business development and professional brand establishment",
                "Designed versatile graphics suitable for both digital and print applications with optimal file formats"
            ],
            "qualitative": [
                "Successfully established professional, cohesive brand identity that reflects innovative and trustworthy business values",
                "Created memorable visual identity that differentiates Aigata brand in competitive market landscape",
                "Demonstrated comprehensive graphic design expertise through complete brand development from concept to implementation",
                "Enhanced personal business credibility through professional, consistent visual presentation across all marketing materials",
                "Established foundation for scalable brand growth with flexible design system supporting future business expansion",
                "Strengthened professional presence through polished, cohesive brand identity that communicates expertise and reliability",
                "Created sustainable brand framework that maintains visual consistency while allowing for creative evolution and adaptation"
            ]
        }
    }

    try:
        # Connect to MongoDB
        db = get_database()
        collection = db.projects
        
        # Check if project already exists
        existing_project = collection.find_one({"id": "14"})
        if existing_project:
            print("✅ Aigata brand project with ID 14 already exists. Updating...")
            result = collection.update_one({"id": "14"}, {"$set": aigata_brand_project})
            print(f"✅ Updated existing Aigata brand project. Modified count: {result.modified_count}")
        else:
            # Insert the new project
            result = collection.insert_one(aigata_brand_project)
            print(f"✅ Successfully added Aigata brand graphics project to database")
            print(f"✅ Inserted ID: {result.inserted_id}")
        
        # Verify the project was added
        verification = collection.find_one({"id": "14"})
        if verification:
            print(f"✅ Verification successful: Project '{verification['title']}' found in database")
            print(f"✅ Category: {verification['category']}")
            print(f"✅ Images count: {len(verification.get('images', []))}")
            print(f"✅ Client: {verification['client']}")
            return True
        else:
            print("❌ Verification failed: Aigata brand project not found after insertion")
            return False
            
    except Exception as e:
        print(f"❌ Error adding Aigata brand project to database: {str(e)}")
        return False

if __name__ == "__main__":
    print("🔄 Adding Aigata brand graphics project with 20 image placeholders...")
    
    if add_aigata_brand_project():
        print("\\n✅ AIGATA BRAND PROJECT CREATION COMPLETE!")
        print("✅ Comprehensive visual identity project added with 20 image placeholders")
        print("✅ Project includes: logo design, business cards, social media graphics, marketing materials")
        print("✅ All 20 image placeholders ready for your Aigata brand graphics:")
        print("   • AIGATA_BRAND_IMAGE_1 through AIGATA_BRAND_IMAGE_20")
        print("\\n📋 PROJECT FEATURES:")
        print("• Complete brand identity system")
        print("• 20+ distinct graphic elements")
        print("• Professional marketing materials")
        print("• Comprehensive impact metrics")
        print("• Ready for your brand graphics upload!")
    else:
        print("\\n❌ Failed to add Aigata brand project")
        sys.exit(1)