#!/usr/bin/env python3
"""
Script to optimize the comprehensive design portfolio:
1. Remove number mentions from description 
2. Add specific design tool skills (Photoshop, Illustrator, Canva, Lightroom)
3. Remove impact section
4. Update to focus on best selected work
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

def optimize_comprehensive_design_portfolio():
    """Optimize the comprehensive design portfolio project"""
    try:
        db = get_database()
        collection = db.projects
        
        # Updated project data without numbers and with enhanced skills
        updated_data = {
            "description": "Comprehensive graphic design portfolio showcasing diverse skills across multiple categories and client projects. This extensive collection demonstrates proficiency in professional design, illustration, promotional marketing, and event materials. The portfolio spans work for Ute Plaza Supermarket, KahPeeh kah-Ahn Ute Coffee House & Soda, and various event promotions, showcasing versatility in creating graphics for different industries and purposes. From my extensive collection of digital assets, I've highlighted some of the best work that represents the breadth and quality of my design capabilities across all categories.",
            
            "key_contributions": [
                "Created comprehensive graphic design portfolio demonstrating expertise across professional, promotional, and creative design categories",
                "Designed professional graphics for business and social media use showcasing technical design skills and brand consistency",
                "Produced illustration work including custom stickers, t-shirt designs, and logo creation demonstrating artistic and creative abilities",
                "Developed promotional graphics for Ute Plaza Supermarket and KahPeeh kah-Ahn Coffee House covering seasonal, beverage, and holiday campaigns",
                "Created distinct event flyers showcasing layout design, typography, and information hierarchy skills for various community events",
                "Demonstrated versatility in design styles, from corporate professional graphics to creative illustrations and promotional materials"
            ],
            
            "skills_utilized": [
                "Adobe Photoshop",
                "Adobe Illustrator", 
                "Canva Design Platform",
                "Adobe Lightroom",
                "Professional Graphic Design & Layout",
                "Social Media Graphics Creation",
                "Custom Illustration & Drawing Skills",
                "Logo Design & Brand Identity",
                "Sticker & Merchandise Design",
                "T-shirt & Apparel Graphics",
                "Promotional Materials Design",
                "Seasonal & Holiday Campaign Graphics",
                "Event Flyer Design & Layout", 
                "Multi-Category Design Versatility"
            ]
        }
        
        # Remove the impact field and update other fields
        result = collection.update_one(
            {"id": "15"}, 
            {
                "$set": updated_data,
                "$unset": {"impact": ""}  # Remove impact section completely
            }
        )
        
        if result.modified_count > 0:
            print("✅ Optimized comprehensive design portfolio successfully")
            return True
        else:
            print("⚠️  Comprehensive design portfolio not found or no changes made")
            return False
            
    except Exception as e:
        print(f"❌ Error optimizing design portfolio: {str(e)}")
        return False

def verify_optimization():
    """Verify the optimization was successful"""
    try:
        db = get_database()
        collection = db.projects
        
        project = collection.find_one({"id": "15"})
        if project:
            print(f"✅ Project found: {project.get('title', '')[:50]}...")
            print(f"✅ Skills count: {len(project.get('skills_utilized', []))}")
            print(f"✅ Adobe tools included: {any('Adobe' in skill for skill in project.get('skills_utilized', []))}")
            print(f"✅ Canva included: {'Canva' in str(project.get('skills_utilized', []))}")
            print(f"✅ Impact removed: {'impact' not in project}")
            print(f"✅ Description updated: {'extensive collection' in project.get('description', '')}")
            return True
        else:
            print("❌ Project not found for verification")
            return False
            
    except Exception as e:
        print(f"❌ Error during verification: {str(e)}")
        return False

if __name__ == "__main__":
    print("🔄 Optimizing comprehensive design portfolio...")
    
    if optimize_comprehensive_design_portfolio():
        print("\n🔍 Verifying optimization...")
        if verify_optimization():
            print("\n✅ COMPREHENSIVE DESIGN PORTFOLIO OPTIMIZATION COMPLETE!")
            print("✅ Removed specific number mentions from description")
            print("✅ Added Adobe Photoshop, Illustrator, Canva, and Lightroom to skills")
            print("✅ Removed impact section entirely")
            print("✅ Updated description to focus on 'best of the best' selected work")
            print("✅ Maintained all placeholder image structure for easy upload")
        else:
            print("\n⚠️  Optimization completed but verification failed")
    else:
        print("\n❌ Failed to optimize comprehensive design portfolio")
        sys.exit(1)