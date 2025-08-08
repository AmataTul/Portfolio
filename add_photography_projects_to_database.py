#!/usr/bin/env python3

import os
import sys
from pymongo import MongoClient
from bson.objectid import ObjectId

# Add the backend directory to the Python path
sys.path.append('/app/backend')

def add_photography_projects():
    """
    Adds the photography projects from mock.js to MongoDB database
    """
    
    # Get MongoDB connection
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/portfolio')
    client = MongoClient(mongo_url)
    db = client.get_database()
    projects_collection = db.projects
    
    print("🚀 Adding photography projects to database...")
    
    # Aigata Brand Photography Project (ID: 24)
    aigata_project = {
        "id": 24,
        "title": "Aigata Brand - Handmade Candles & Chocolate Product Photography",
        "category": "Photography Projects",
        "client": "Aigata Brand - Personal Business",
        "project_type": "Professional Product Photography for E-commerce & Marketing",
        "description": "Comprehensive professional product photography project for my personally-owned Aigata Brand business, specializing in handmade candles and artisan chocolate collections. I executed all photography, styling, and post-production work to create compelling visual assets for e-commerce listings, social media marketing, and digital advertising campaigns. This project showcased my complete creative control and business ownership, managing every aspect from product styling and lighting setup to final image editing and marketing implementation. Using professional photography techniques, custom prop arrangements, and strategic color correction, I created cohesive brand imagery that authentically represented the artisanal quality and premium positioning of my handmade products. These images directly supported my business operations across multiple platforms, contributing to brand recognition and sales conversion through visually compelling product presentations that highlighted the craftsmanship and unique appeal of each handmade item.",
        "images": [
            "AIGATA_CANDLE_PRODUCT_1",
            "AIGATA_CANDLE_PRODUCT_2", 
            "AIGATA_CANDLE_PRODUCT_3",
            "AIGATA_CHOCOLATE_PRODUCT_1",
            "AIGATA_CHOCOLATE_PRODUCT_2",
            "AIGATA_CHOCOLATE_PRODUCT_3",
            "AIGATA_CANDLE_PRODUCT_4",
            "AIGATA_CANDLE_PRODUCT_5",
            "AIGATA_CHOCOLATE_PRODUCT_4",
            "AIGATA_CANDLE_PRODUCT_6",
            "AIGATA_CHOCOLATE_PRODUCT_5",
            "AIGATA_CANDLE_PRODUCT_7",
            "AIGATA_CHOCOLATE_PRODUCT_6",
            "AIGATA_CANDLE_PRODUCT_8",
            "AIGATA_CHOCOLATE_PRODUCT_7"
        ],
        "type": "photography",
        "featured": True,
        "orientation": "mixed",
        "skills_utilized": [
            "Professional Product Photography", "E-commerce Photography Standards", "Studio Lighting Setup & Control",
            "Creative Photo Props & Styling", "Decorative Arrangement & Composition", "Adobe Photoshop Color Correction & Enhancement",
            "Background Selection & Setup", "Shadow & Highlight Management", "Advanced Image Composition Techniques",
            "E-commerce Platform Optimization", "Product Staging & Visual Storytelling", "Digital Image Editing & Retouching",
            "Brand-Consistent Visual Identity", "Multi-Platform Marketing Photography", "Artisan Product Presentation Expertise"
        ]
    }
    
    # Ute Bison Ranch Photography Project (ID: 25)
    ute_bison_project = {
        "id": 25,
        "title": "Ute Bison Ranch - Premium Bison Meat Product Photography",
        "category": "Photography Projects",
        "client": "Ute Bison Ranch - Ute Tribal Enterprises",
        "project_type": "Professional Food Product Photography & Marketing Imagery",
        "description": "Comprehensive professional photography project for Ute Bison Ranch's premium bison meat products, used across multiple marketing channels including product listings, social media campaigns, advertisements, and promotional materials. I executed all photography with meticulous attention to food styling, lighting, and prop coordination using limited resources to achieve professional-grade results. The project required coordinating complex logistics to ensure optimal product presentation while preventing meat spoilage, managing temperature control throughout the shoot, and employing creative backdrop setups and professional lighting techniques. These high-quality images directly supported the ranch's marketing efforts across digital platforms and print materials, showcasing the premium quality and artisanal nature of their bison meat products to drive sales and brand recognition.",
        "images": [
            "UTE_BISON_MEAT_PRODUCT_1",
            "UTE_BISON_MEAT_PRODUCT_2",
            "UTE_BISON_MEAT_PRODUCT_3", 
            "UTE_BISON_MEAT_PRODUCT_4",
            "UTE_BISON_MEAT_PRODUCT_5",
            "UTE_BISON_MEAT_PRODUCT_6",
            "UTE_BISON_MEAT_PRODUCT_7",
            "UTE_BISON_MEAT_PRODUCT_8",
            "UTE_BISON_MEAT_PRODUCT_9",
            "UTE_BISON_MEAT_PRODUCT_10"
        ],
        "type": "photography",
        "featured": True,
        "orientation": "mixed",
        "skills_utilized": [
            "Professional Food Photography", "Product Styling & Presentation", "Studio Lighting with Limited Resources",
            "Backdrop & Prop Coordination", "Adobe Photoshop Editing", "Temperature-Sensitive Product Handling",
            "Logistics Coordination & Planning", "Food Safety & Handling Protocols", "Color Correction for Food Products",
            "Social Media Marketing Photography", "Advertisement Photography", "Product Listing Optimization Photography",
            "Creative Problem-Solving Under Constraints", "Multi-Platform Content Creation", "Brand-Aligned Visual Storytelling"
        ]
    }
    
    try:
        # Add Aigata Brand project
        aigata_result = projects_collection.insert_one(aigata_project)
        print(f"✅ Successfully added Aigata Brand photography project (ID: {aigata_result.inserted_id})")
        
        # Add Ute Bison Ranch project
        ute_result = projects_collection.insert_one(ute_bison_project)
        print(f"✅ Successfully added Ute Bison Ranch photography project (ID: {ute_result.inserted_id})")
        
        print(f"\n🎯 Photography projects added successfully!")
        print(f"   • Aigata Brand - Handmade Candles & Chocolate Product Photography")
        print(f"   • Ute Bison Ranch - Premium Bison Meat Product Photography")
        
        # Verify the projects were added
        total_projects = projects_collection.count_documents({})
        photo_projects = projects_collection.count_documents({"category": "Photography Projects"})
        
        print(f"\n📊 Database Statistics:")
        print(f"   • Total projects: {total_projects}")
        print(f"   • Photography projects: {photo_projects}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error adding photography projects: {str(e)}")
        return False
    
    finally:
        client.close()

if __name__ == "__main__":
    print("📸 Adding Photography Projects to Database")
    print("=" * 50)
    
    success = add_photography_projects()
    
    if success:
        print("\n🎉 Photography projects successfully added to database!")
        print("💡 Projects now available in both frontend and backend")
        print("🔄 Users can now view photography projects with enhanced:")
        print("   • Marketing-focused descriptions")
        print("   • Professional image gallery layout")
        print("   • Comprehensive skills showcase")
    else:
        print("\n❌ Failed to add photography projects to database")
        sys.exit(1)