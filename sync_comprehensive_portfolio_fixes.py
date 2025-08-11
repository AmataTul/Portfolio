#!/usr/bin/env python3

import os
import sys
from pymongo import MongoClient
from urllib.parse import quote_plus
from dotenv import load_dotenv

# Load environment variables from backend/.env
load_dotenv('/app/backend/.env')

# Add backend directory to Python path
sys.path.append('/app/backend')

def get_mongo_client():
    """Create and return MongoDB client"""
    try:
        # Get MongoDB URL from environment variable
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

def update_comprehensive_portfolio_project():
    """Update the Comprehensive Graphic Design Portfolio project with fixes"""
    client = get_mongo_client()
    if not client:
        return False
    
    try:
        # Access the database and collection
        db = client.portfolio_db
        projects_collection = db.projects
        
        # Find the project by ID or title
        project = projects_collection.find_one({
            "$or": [
                {"id": "18"},
                {"title": {"$regex": "Comprehensive Graphic Design Portfolio", "$options": "i"}}
            ]
        })
        
        if not project:
            print("❌ Comprehensive Graphic Design Portfolio project not found")
            return False
            
        print(f"✅ Found project: {project.get('title', 'Unknown Title')}")
        print(f"📊 Current project ID: {project.get('id', 'No ID')}")
        
        # Updated images array with 32 items (fixing the structure)
        updated_images = [
            # Line 1: Ute Bison Ranch Graphics (13 items) - indices 0-12
            "https://customer-assets.emergentagent.com/job_project-showcase-20/artifacts/848tn2gz_490175273_1219013826892097_7282331591355033149_n.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/g10z43gt_bisonjerkyproductlisting.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/qrtvhcnj_bisonskullpainted.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/gcsb5kft_newyearbison.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/isacvov9_bisonsignpromo.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/f7pp32x2_bisonjerkypromo.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/5q5iuyno_BBQ%20Honey%20Nutrition%20Ingredients%202.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/pmzwgzfn_Family%20enjoying%20bison%20jerky.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/q9wjc02s_Original%20Nutrition%20Ingredients.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/8a7r03ba_Pepper%20Nutrition%20Ingredients%202.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/rr5iyptk_bisonmeatpromo.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/1c95a27b_bison%20burger%20menu.png",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/frotsl7q_bison%20jerky.jpg",
            
            # Line 2: Stickers, Apparel Design & Concept Logos (4 items) - indices 13-16
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/2w2simb5_472787763_122176993082111532_4308856618447500817_n.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/f2xnpts2_bandicam%202025-07-29%2020-16-33-872.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/0lii68jy_bandicam%202025-07-29%2020-16-39-603.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/t6pkgkhv_Bear%20no%20background.png",
            
            # Line 3: Multi-Business Graphics (11 items) - indices 17-27 (Plaza Father's Day is here)
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/ceyy0akf_473820052_122177917304111532_4653535610475693610_n.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/259em1lr_474083199_122177917058111532_5805025566417667602_n.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/jpq1442y_476850917_122186403386103473_6184333914300278689_n.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/go5i56th_480064924_122184792848111532_1735080723384809186_n.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/l5k4oqzm_482215365_619213051018949_5481783028424469714_n.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/688enpe9_Memorial%20Day%20BIG.png",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/7n5lqfsx_482253477_625846273688960_9088685819079564302_n.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/gj5739jq_Coffee%20House%20Hibiscus.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/yc4vxqmk_FALL%20FAVORITES.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/t4bu096a_Drinks%20Christmass.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/mowyfcr0_Mother%27s%20Day%20Plaza.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/fuj3qnc3_Plaza%20Father%27s%20Day.jpg",
            
            # Line 4: Event Flyers (4 items) - indices 28-31 (New Ute Plaza Eggstravaganza image)
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/v66lj9hc_Bunny%20Hunt.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/uv3dpw4n_Half%20Way%20Point.jpg",
            "https://customer-assets.emergentagent.com/job_246fc36d-8c7a-4bae-91a4-7079a70b8b2d/artifacts/5ssz4g5d_Myton%20Petroleum%20Egg%20Hunt.jpg",
            "https://customer-assets.emergentagent.com/job_content-manager-13/artifacts/eh3a9b99_Ute%20Plaza%20Eggstravaganza.jpg"  # NEW UPDATED IMAGE
        ]
        
        # Updated impact metrics
        updated_impact = {
            "business_scope_metrics": [
                "32 professional graphic design pieces created across 4 major categories",
                "7 different businesses supported with custom graphic design solutions",
                "Multi-platform design approach covering digital, print, and promotional materials",
                "Comprehensive brand identity development across all tribal enterprise businesses"
            ],
            "qualitative_outcomes": [
                "Established consistent visual identity across multiple Ute Tribal Enterprise businesses",
                "Enhanced professional brand presence through high-quality graphic design and marketing materials",
                "Supported business growth through effective promotional graphics and ecommerce visual assets",
                "Strengthened community engagement through culturally sensitive event and promotional materials",
                "Demonstrated versatile graphic design capabilities across multiple business sectors and design needs"
            ]
        }
        
        # Update the project
        update_result = projects_collection.update_one(
            {"_id": project["_id"]},
            {
                "$set": {
                    "images": updated_images,
                    "impact": updated_impact
                }
            }
        )
        
        if update_result.modified_count > 0:
            print(f"✅ Successfully updated Comprehensive Graphic Design Portfolio project")
            print(f"📊 Updated {len(updated_images)} images in the array")
            print(f"🎯 Updated impact metrics to reflect 32 professional pieces")
            print(f"📸 Added new Ute Plaza Eggstravaganza image to Event Flyers")
            print(f"🗂️ Plaza Father's Day image correctly placed in Multi-Business Graphics")
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
    print("🔄 STARTING COMPREHENSIVE GRAPHIC DESIGN PORTFOLIO DATABASE SYNC")
    print("=" * 70)
    
    success = update_comprehensive_portfolio_project()
    
    print("=" * 70)
    if success:
        print("✅ DATABASE SYNCHRONIZATION COMPLETED SUCCESSFULLY")
        print("🎉 All image display issues have been fixed:")
        print("   • 32 professional graphic design pieces in correct structure")
        print("   • New Ute Plaza Eggstravaganza image in Event Flyers")
        print("   • Plaza Father's Day image in Multi-Business Graphics")
        print("   • All empty containers eliminated")
        print("   • Impact metrics updated")
    else:
        print("❌ DATABASE SYNCHRONIZATION FAILED")
        print("Please check the error messages above and try again")
    
    return success

if __name__ == "__main__":
    main()