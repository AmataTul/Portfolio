#!/usr/bin/env python3

import os
import sys
from pymongo import MongoClient
from datetime import datetime, timezone

# Add the backend directory to Python path to import models
sys.path.append('/app/backend')

# Import the database models
from models import Project

def main():
    # Connect to MongoDB
    mongo_url = os.getenv('MONGO_URL', 'mongodb://localhost:27017/portfolio')
    client = MongoClient(mongo_url)
    db = client.get_default_database()
    projects_collection = db.projects
    
    print("🔄 Updating Coffee House Projects with Enhanced Content...")
    
    # Update TikTok Campaign Project (ID: 8)
    tiktok_project_data = {
        "id": "8",
        "title": "KahPeeh kah-Ahn Ute Coffee House & Soda - Top 6 TikTok High-Engagement Campaign",
        "category": "Social Media Content & Campaigns",
        "client": "Ute Tribal Enterprises - KahPeeh kah-Ahn Ute Coffee House & Soda",
        "project_type": "Indigenous Business TikTok Marketing Campaign",
        "description": "Strategic TikTok marketing campaign for KahPeeh kah-Ahn Ute Coffee House & Soda, an indigenous small local coffee house proudly serving the Uintah and Ouray reservation community. This locally-owned Ute Tribal Enterprises business operates from their cozy location and travels to community events with their mobile trailer setup. I coordinated multiple community events and created 6 high-engagement TikTok videos to promote their authentic indigenous hospitality, resulting in 85% increased social media engagement, 40% boost in foot traffic, and 120% brand awareness growth throughout the reservation communities. Through strategic content creation and cultural storytelling, we've established KahPeeh kah-Ahn as the heart of the community and a thriving indigenous business success story.",
        "images": [],  # No main video - only the 6 TikTok videos below
        "type": "video",
        "featured": True,
        "orientation": "vertical",
        "key_contributions": [
            "Conceptualized and created 6 high-engagement TikTok videos promoting the indigenous coffee house and community events",
            "Coordinated community events where the coffee house trailer provided services, creating authentic content opportunities",
            "Developed creative strategy showcasing the unique indigenous coffee house experience and community connection",
            "Wrote compelling copy and captions celebrating indigenous business and cultural pride",
            "Edited and produced video content highlighting both the coffee house location and mobile trailer events",
            "Analyzed performance metrics and adapted content strategy to maximize community engagement and business visibility"
        ],
        "skills_utilized": [
            "Indigenous Business Marketing",
            "Community Event Coordination",
            "TikTok Content Creation",
            "Cultural Sensitivity Marketing",
            "Video Editing & Production",
            "Local Business Promotion",
            "Event Marketing",
            "Social Media Strategy",
            "Mobile Business Promotion",
            "Reservation Community Outreach"
        ],
        "impact": {
            "quantified_metrics": [
                "Generated 85% increase in social media engagement for the indigenous coffee house",
                "Drove 40% boost in foot traffic to both physical location and mobile trailer events",
                "Achieved 120% growth in brand awareness throughout Uintah and Ouray reservation communities",
                "Successfully promoted multiple community events coordinated through strategic TikTok marketing",
                "Built substantial local following and community recognition for KahPeeh kah-Ahn",
                "Established coffee house as go-to community gathering place through compelling social media presence"
            ],
            "qualitative_outcomes": [
                "Successfully positioned indigenous coffee house as cultural hub and community gathering place",
                "Enhanced pride in locally-owned indigenous business through authentic storytelling and community engagement",
                "Strengthened connections between coffee house and reservation community through relatable, celebratory content",
                "Elevated visibility of Ute Tribal Enterprises and indigenous entrepreneurship in competitive market",
                "Created sustainable framework for ongoing community-focused marketing and event promotion",
                "Fostered authentic brand personality celebrating indigenous culture while serving diverse local community"
            ]
        },
        "combinedTikTokSection": {
            "sectionTitle": "Indigenous Coffee House TikTok Success",
            "videosTitle": "Top 6 Community-Engaging TikTok Videos",
            "videosSubtitle": "Each video celebrates indigenous entrepreneurship while driving measurable business results",
            "videos": [
                {
                    "id": 1,
                    "title": "Customer Experience Showcase",
                    "url": "https://www.tiktok.com/@kahpeehkahahn/video/7471801091441659178",
                    "thumbnail": "PLACEHOLDER_THUMBNAIL_1",
                    "description": "Customer perspective video showing coffee house staff, drinks, menu, internal and external design, and location. Features authentic customer interaction highlighting the welcoming atmosphere and quality service.",
                    "type": "customer_experience"
                },
                {
                    "id": 2,
                    "title": "Marylin Monroe Signature Drink",
                    "url": "https://www.tiktok.com/@kahpeehkahahn/video/7409139284403408159",
                    "thumbnail": "PLACEHOLDER_THUMBNAIL_2",
                    "description": "Behind-the-scenes video featuring me and the coffee house manager creating the Marylin Monroe - the most popular and beloved drink by our customers. Shows the craftsmanship and care that goes into every signature beverage.",
                    "type": "signature_product"
                },
                {
                    "id": 3,
                    "title": "4th of July Northern Ute Powwow Celebration",
                    "url": "https://www.tiktok.com/@kahpeehkahahn/video/7390967071472946462",
                    "thumbnail": "PLACEHOLDER_THUMBNAIL_3",
                    "description": "Annual Northern Ute celebration event where I promoted both the powwow and our coffee house trailer. Features customer engagement, traditional dances, cultural celebration, and authentic Ute tribal ways while showcasing our community presence.",
                    "type": "cultural_event"
                },
                {
                    "id": 4,
                    "title": "Barista Behind the Scenes",
                    "url": "https://www.tiktok.com/@kahpeehkahahn/video/7406134372803382559",
                    "thumbnail": "PLACEHOLDER_THUMBNAIL_4",
                    "description": "Professional barista content showing drink preparation, coffee crafting techniques, and behind-the-scenes operations that make our coffee house special. Highlights the skill and dedication of our team.",
                    "type": "behind_scenes"
                },
                {
                    "id": 5,
                    "title": "New Year Customer Appreciation",
                    "url": "https://www.tiktok.com/@kahpeehkahahn/video/7396130080369528094",
                    "thumbnail": "PLACEHOLDER_THUMBNAIL_5",
                    "description": "Special customer appreciation content created for New Year celebrations, thanking our loyal community for their continued support and showcasing the strong bonds between our coffee house and local customers.",
                    "type": "customer_appreciation"
                },
                {
                    "id": 6,
                    "title": "Community Event Coordination",
                    "url": "https://www.tiktok.com/@kahpeehkahahn/video/7452207220508347691",
                    "thumbnail": "PLACEHOLDER_THUMBNAIL_6",
                    "description": "Community event coordination showcase highlighting our mobile trailer services and community engagement initiatives that bring quality coffee directly to local gatherings and celebrations.",
                    "type": "community_outreach"
                }
            ]
        },
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc)
    }
    
    # Update or insert TikTok project
    result_tiktok = projects_collection.update_one(
        {"project_id": "8"},
        {"$set": tiktok_project_data},
        upsert=True
    )
    print(f"✅ TikTok Campaign Project: {'Updated' if result_tiktok.matched_count > 0 else 'Created'}")
    
    # Update Advertising Campaign Project (ID: 4)
    advertising_project_data = {
        "id": "4",
        "title": "KahPeeh kah-Ahn Ute Coffee House & Soda - Video Advertisement Campaign",
        "category": "Advertising",
        "client": "Ute Tribal Enterprises - KahPeeh kah-Ahn Ute Coffee House & Soda",
        "project_type": "Multi-Platform Video Advertisement Production & Direction",
        "description": "Comprehensive video advertisement campaign for KahPeeh kah-Ahn Ute Coffee House & Soda, showcasing authentic indigenous hospitality and premium coffee experience. I directed and coordinated this complete advertising production from initial concept through final editing, working with a talented team of editors to create professional-grade content. The campaign demonstrates my experience with TV/YouTube advertisements and large-scale advertising initiatives. These videos were strategically deployed across multiple platforms including social media, YouTube, cinema screenings, and big screen displays, showcasing the unique cultural atmosphere and community connection of this locally-owned indigenous business serving the Uintah and Ouray reservation communities.",
        "images": [
            "COFFEE_HOUSE_VIDEO_THUMBNAIL_1",
            "UTE_CROSSING_GRILL_VIDEO_THUMBNAIL_2"
        ],
        "type": "video",
        "featured": True,
        "orientation": "horizontal",
        "videos": [
            {
                "id": 1,
                "title": "KahPeeh kah-Ahn Coffee House Advertisement",
                "videoFile": "Ute Coffeehouse V4.mp4",
                "thumbnail": "COFFEE_HOUSE_VIDEO_THUMBNAIL_1",
                "description": "Professional advertisement showcasing authentic indigenous coffee house experience"
            },
            {
                "id": 2,
                "title": "Ute Crossing Grill & Ute Lanes Advertisement",
                "videoFile": "Ute_Crossing_Grill_Advertisement.mp4",
                "thumbnail": "UTE_CROSSING_GRILL_VIDEO_THUMBNAIL_2",
                "description": "Restaurant and bowling entertainment advertising campaign"
            }
        ],
        "key_contributions": [
            "Directed and coordinated complete multi-video advertisement campaign from initial concept through final delivery",
            "Led collaborative efforts with professional editing team to produce high-quality advertising content within budget constraints",
            "Developed creative vision and production strategy for large-scale advertising deployment across cinema, social media, and YouTube platforms",
            "Managed comprehensive production timeline including pre-production planning, filming coordination, and post-production oversight",
            "Created compelling advertising narratives showcasing unique selling propositions of indigenous-owned local businesses",
            "Produced professional-grade video advertisements suitable for cinema screenings, big screen displays, and digital marketing channels",
            "Coordinated second advertisement production for Ute Crossing Grill & Ute Lanes restaurant and bowling entertainment venue"
        ],
        "skills_utilized": [
            "Video Direction & Production Leadership",
            "Large-Scale Advertising Campaign Management",
            "Cinema & Television Advertisement Production",
            "Indigenous Business Marketing Strategy",
            "Multi-Platform Content Distribution",
            "Team Coordination & Editor Collaboration",
            "Video Editing & Post-Production Direction",
            "Restaurant & Entertainment Venue Advertising",
            "Cultural Sensitivity Marketing",
            "Brand Storytelling & Narrative Development",
            "Project Management & Timeline Coordination"
        ],
        "impact": {
            "quantified_metrics": [
                "Successfully directed and produced two professional advertisement campaigns for Ute Tribal Enterprises businesses",
                "Managed large-scale advertising deployment across cinema screens, social media platforms, YouTube, and big screen displays",
                "Coordinated complete production process working with editing team to deliver cinema-quality advertising content",
                "Created versatile advertising assets suitable for multiple high-visibility marketing channels and sponsorship events",
                "Demonstrated expertise in TV/YouTube advertising and large-scale campaign production with limited resource optimization"
            ],
            "qualitative_outcomes": [
                "Enhanced brand visibility for both coffee house and restaurant/bowling entertainment venue through professional advertising",
                "Established expertise in directing large-scale advertising campaigns suitable for cinema and television distribution",
                "Strengthened marketing portfolio with professional video advertisements showcasing indigenous business cultural sensitivity",
                "Created sustainable advertising framework supporting ongoing indigenous business marketing and customer attraction initiatives",
                "Demonstrated comprehensive production capabilities from creative direction through post-production team coordination",
                "Elevated Ute Tribal Enterprises brand presence through high-quality, culturally authentic advertising content creation"
            ]
        },
        "additionalProject": {
            "businessName": "Ute Crossing Grill & Ute Lanes",
            "businessType": "Restaurant & Bowling Entertainment Venue",
            "location": "Same area as KahPeeh kah-Ahn Coffee House",
            "ownership": "Ute Tribal Enterprises",
            "services": "Comfort food restaurant with bowling entertainment, party rooms for booking, and arcade games",
            "marketingFocus": "Attracting new customers and retention of regular customers while increasing exposure and food traffic",
            "advertisingScope": "Cinemas, community events, sponsorships, social media platforms, and big screen displays"
        },
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc)
    }
    
    # Update or insert Advertising project
    result_advertising = projects_collection.update_one(
        {"project_id": "4"},
        {"$set": advertising_project_data},
        upsert=True
    )
    print(f"✅ Advertising Campaign Project: {'Updated' if result_advertising.matched_count > 0 else 'Created'}")
    
    print(f"\n🎉 Successfully updated both Coffee House projects in the database!")
    print("   - Enhanced TikTok video descriptions with specific details")
    print("   - Added team collaboration and large-scale advertising experience")
    print("   - Added second video for Ute Crossing Grill & Ute Lanes")
    print("   - Removed YouTube links from advertising project")
    print("   - Made content professional, SEO-optimized, and recruiter-friendly")
    
    # Verify the updates
    tiktok_check = projects_collection.find_one({"project_id": "8"})
    advertising_check = projects_collection.find_one({"project_id": "4"})
    
    print(f"\n📊 Verification:")
    print(f"   TikTok Project: {'✅ Found' if tiktok_check else '❌ Not found'}")
    print(f"   Advertising Project: {'✅ Found' if advertising_check else '❌ Not found'}")
    
    if tiktok_check:
        print(f"   TikTok Videos: {len(tiktok_check.get('combinedTikTokSection', {}).get('videos', []))} videos")
    if advertising_check:
        print(f"   Advertising Videos: {len(advertising_check.get('videos', []))} videos")
    
    client.close()

if __name__ == "__main__":
    main()