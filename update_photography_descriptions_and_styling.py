#!/usr/bin/env python3

import os
import sys
from pymongo import MongoClient
from bson.objectid import ObjectId

# Add the backend directory to the Python path
sys.path.append('/app/backend')

def update_photography_projects():
    """
    Updates photography project descriptions and styling in MongoDB database
    to sync with frontend mock.js changes for enhanced marketing content.
    """
    
    # Get MongoDB connection
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/portfolio')
    client = MongoClient(mongo_url)
    db = client.get_database()
    projects_collection = db.projects
    
    print("🚀 Starting photography projects description update...")
    
    # Updated Ute Bison Ranch Premium Bison Meat Product Photography
    ute_bison_update = {
        "$set": {
            "title": "Ute Bison Ranch - Premium Bison Meat Product Photography",
            "description": "Comprehensive professional photography project for Ute Bison Ranch's premium bison meat products, used across multiple marketing channels including product listings, social media campaigns, advertisements, and promotional materials. I executed all photography with meticulous attention to food styling, lighting, and prop coordination using limited resources to achieve professional-grade results. The project required coordinating complex logistics to ensure optimal product presentation while preventing meat spoilage, managing temperature control throughout the shoot, and employing creative backdrop setups and professional lighting techniques. These high-quality images directly supported the ranch's marketing efforts across digital platforms and print materials, showcasing the premium quality and artisanal nature of their bison meat products to drive sales and brand recognition.",
            "skills_utilized": [
                "Professional Food Photography", "Product Styling & Presentation", "Studio Lighting with Limited Resources",
                "Backdrop & Prop Coordination", "Adobe Photoshop Editing", "Temperature-Sensitive Product Handling",
                "Logistics Coordination & Planning", "Food Safety & Handling Protocols", "Color Correction for Food Products",
                "Social Media Marketing Photography", "Advertisement Photography", "Product Listing Optimization Photography",
                "Creative Problem-Solving Under Constraints", "Multi-Platform Content Creation", "Brand-Aligned Visual Storytelling"
            ]
        }
    }
    
    # Updated Aigata Brand Handmade Candles & Chocolate Product Photography
    aigata_brand_update = {
        "$set": {
            "title": "Aigata Brand - Handmade Candles & Chocolate Product Photography",
            "description": "Comprehensive professional product photography project for my personally-owned Aigata Brand business, specializing in handmade candles and artisan chocolate collections. I executed all photography, styling, and post-production work to create compelling visual assets for e-commerce listings, social media marketing, and digital advertising campaigns. This project showcased my complete creative control and business ownership, managing every aspect from product styling and lighting setup to final image editing and marketing implementation. Using professional photography techniques, custom prop arrangements, and strategic color correction, I created cohesive brand imagery that authentically represented the artisanal quality and premium positioning of my handmade products. These images directly supported my business operations across multiple platforms, contributing to brand recognition and sales conversion through visually compelling product presentations that highlighted the craftsmanship and unique appeal of each handmade item.",
            "skills_utilized": [
                "Professional Product Photography", "E-commerce Photography Standards", "Studio Lighting Setup & Control",
                "Creative Photo Props & Styling", "Decorative Arrangement & Composition", "Adobe Photoshop Color Correction & Enhancement",
                "Background Selection & Setup", "Shadow & Highlight Management", "Advanced Image Composition Techniques",
                "E-commerce Platform Optimization", "Product Staging & Visual Storytelling", "Digital Image Editing & Retouching",
                "Brand-Consistent Visual Identity", "Multi-Platform Marketing Photography", "Artisan Product Presentation Expertise"
            ]
        }
    }
    
    try:
        # Update Ute Bison Ranch Photography Project (should be id: 25)
        ute_result = projects_collection.update_one(
            {"id": 25},
            ute_bison_update
        )
        
        if ute_result.matched_count > 0:
            print(f"✅ Successfully updated Ute Bison Ranch photography project (matched: {ute_result.matched_count})")
        else:
            print("⚠️ No Ute Bison Ranch photography project found with id: 25")
            
        # Update Aigata Brand Photography Project (should be id: 24)
        aigata_result = projects_collection.update_one(
            {"id": 24},
            aigata_brand_update
        )
        
        if aigata_result.matched_count > 0:
            print(f"✅ Successfully updated Aigata Brand photography project (matched: {aigata_result.matched_count})")
        else:
            print("⚠️ No Aigata Brand photography project found with id: 24")
            
        print("\n🎯 Photography projects update summary:")
        print(f"   • Ute Bison Ranch: {'Updated' if ute_result.matched_count > 0 else 'Not Found'}")
        print(f"   • Aigata Brand: {'Updated' if aigata_result.matched_count > 0 else 'Not Found'}")
        print("\n📝 Updates include:")
        print("   • Enhanced marketing-focused descriptions")
        print("   • Expanded technical skills highlighting")
        print("   • Professional photography capabilities showcase")
        print("   • Multi-platform marketing emphasis")
        
        # Let's also verify the projects are there with updated info
        print("\n🔍 Verification:")
        ute_project = projects_collection.find_one({"id": 25})
        if ute_project:
            print(f"   • Ute Bison Ranch description length: {len(ute_project.get('description', ''))}")
            print(f"   • Ute Bison Ranch skills count: {len(ute_project.get('skills_utilized', []))}")
            
        aigata_project = projects_collection.find_one({"id": 24})
        if aigata_project:
            print(f"   • Aigata Brand description length: {len(aigata_project.get('description', ''))}")
            print(f"   • Aigata Brand skills count: {len(aigata_project.get('skills_utilized', []))}")
            
    except Exception as e:
        print(f"❌ Error updating photography projects: {str(e)}")
        return False
    
    finally:
        client.close()
    
    return True

if __name__ == "__main__":
    print("📸 Photography Projects Description & Styling Update")
    print("=" * 60)
    
    success = update_photography_projects()
    
    if success:
        print("\n🎉 Photography projects successfully updated!")
        print("💡 Changes include enhanced descriptions and improved image styling")
        print("🔄 Frontend will now display photography projects with:")
        print("   • Comprehensive marketing-focused descriptions")
        print("   • Professional image grid gallery layout")
        print("   • object-fit: contain styling to prevent cropping")
        print("   • Enhanced technical skills showcase")
    else:
        print("\n❌ Failed to update photography projects")
        sys.exit(1)