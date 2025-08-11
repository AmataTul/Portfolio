#!/usr/bin/env python3

import os
import sys
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables from backend/.env
load_dotenv('/app/backend/.env')

def get_mongo_client():
    """Create and return MongoDB client"""
    try:
        mongo_url = os.environ.get('MONGO_URL')
        if not mongo_url:
            print("❌ MONGO_URL environment variable not set")
            return None
            
        print(f"🔌 Connecting to MongoDB...")
        client = MongoClient(mongo_url, serverSelectionTimeoutMS=5000)
        
        # Test the connection
        client.admin.command('ping')
        print("✅ Successfully connected to MongoDB")
        return client
        
    except Exception as e:
        print(f"❌ Failed to connect to MongoDB: {str(e)}")
        return None

def update_aigata_brand_project():
    """Update the Aigata Brand project with new logo images"""
    client = get_mongo_client()
    if not client:
        return False
    
    try:
        db = client.portfolio_db
        projects_collection = db.projects
        
        # Find the Aigata Brand project by ID or title
        project = projects_collection.find_one({
            "$or": [
                {"id": "20"},
                {"title": {"$regex": "Aigata Brand.*Complete Business Development", "$options": "i"}}
            ]
        })
        
        if not project:
            print("❌ Aigata Brand - Complete Business Development project not found")
            return False
            
        print(f"✅ Found project: {project.get('title', 'Unknown Title')}")
        print(f"📊 Current project ID: {project.get('id', 'No ID')}")
        
        # Updated images array with new logo structure
        updated_images = [
            # Row 1: Brand Identity and Logo Design - Actual Business Logos (3 items)
            "https://customer-assets.emergentagent.com/job_content-manager-13/artifacts/i0gb7ayv_Aigata%20Logo%201.png",
            "https://customer-assets.emergentagent.com/job_content-manager-13/artifacts/a9dy2rmc_Aigata%20Logo.png", 
            "https://customer-assets.emergentagent.com/job_content-manager-13/artifacts/1p90o8kt_Logo.jpg",
            
            # Row 2: Concept Logos & Brand Development (3 items)
            "AIGATA_BRAND_GUIDELINES",
            "AIGATA_BUSINESS_CARDS", 
            "AIGATA_BRAND_MOCKUPS",

            # Row 3: Top-Selling Products - Amazon/Etsy (6 items)
            "AIGATA_PRODUCT_1",
            "AIGATA_PRODUCT_2",
            "AIGATA_PRODUCT_3", 
            "AIGATA_PRODUCT_4",
            "AIGATA_PRODUCT_5",
            "AIGATA_PRODUCT_6",

            # Row 4: Product Development & Design Process (6 items)
            "AIGATA_DESIGN_PROCESS_1",
            "AIGATA_DESIGN_PROCESS_2",
            "AIGATA_VENDOR_COMMUNICATION",
            "AIGATA_QUALITY_CONTROL",
            "AIGATA_LOGISTICS_PLANNING", 
            "AIGATA_INVENTORY_MANAGEMENT",

            # Row 5: Sales Success & Marketing (6 items)
            "AIGATA_SALES_DASHBOARD",
            "AIGATA_AMAZON_PERFORMANCE",
            "AIGATA_ETSY_SUCCESS",
            "AIGATA_TIKTOK_VIRAL",
            "AIGATA_EVENT_SALES",
            "AIGATA_CUSTOMER_REVIEWS"
        ]
        
        # Update the project
        update_result = projects_collection.update_one(
            {"_id": project["_id"]},
            {
                "$set": {
                    "images": updated_images
                }
            }
        )
        
        if update_result.modified_count > 0:
            print(f"✅ Successfully updated Aigata Brand project")
            print(f"📊 Updated with {len(updated_images)} images in the array")
            print(f"🎨 Added 3 actual business logos to Brand Identity section")
            print(f"💡 Separated Concept Logos into their own section")
            return True
        else:
            print("⚠️ No changes were made to the project")
            return False
            
    except Exception as e:
        print(f"❌ Error updating project: {str(e)}")
        return False
    
    finally:
        client.close()

def main():
    """Main function to run the synchronization"""
    print("🔄 STARTING AIGATA BRAND LOGO DATABASE SYNC")
    print("=" * 60)
    
    success = update_aigata_brand_project()
    
    print("=" * 60)
    if success:
        print("✅ DATABASE SYNCHRONIZATION COMPLETED SUCCESSFULLY")
        print("🎉 Aigata Brand project updated with:")
        print("   • 3 actual business logos in Brand Identity section")
        print("   • Separate Concept Logos section") 
        print("   • Maintained all other sections structure")
    else:
        print("❌ DATABASE SYNCHRONIZATION FAILED")
        print("Please check the error messages above and try again")
    
    return success

if __name__ == "__main__":
    main()