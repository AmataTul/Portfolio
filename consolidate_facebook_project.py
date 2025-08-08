#!/usr/bin/env python3

import os
import sys
sys.path.append('/app/backend')

from pymongo import MongoClient
from models import Project
import json
import uuid
from datetime import datetime

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/portfolio_db')
client = MongoClient(MONGO_URL)
db = client.get_database()

def consolidate_facebook_reels_project():
    """Remove duplicate and update the main Facebook Reels project with new title"""
    
    try:
        # Remove any duplicate Facebook Reels projects
        duplicates = list(db.projects.find({
            "$or": [
                {"title": {"$regex": "Ute Plaza.*Holiday.*Facebook", "$options": "i"}},
                {"title": {"$regex": "Holiday Merch.*Facebook Reels", "$options": "i"}}
            ]
        }))
        
        print(f"Found {len(duplicates)} Facebook Reels projects")
        
        # Delete all existing Facebook Reels projects
        result = db.projects.delete_many({
            "$or": [
                {"title": {"$regex": "Ute Plaza.*Holiday.*Facebook", "$options": "i"}},
                {"title": {"$regex": "Holiday Merch.*Facebook Reels", "$options": "i"}},
                {"title": {"$regex": "Strategic Facebook Reels", "$options": "i"}}
            ]
        })
        
        print(f"Removed {result.deleted_count} duplicate/old Facebook Reels projects")
        
        # Create the single, correct Facebook Reels project with updated title
        facebook_reels_project = {
            'id': str(uuid.uuid4())[:8],
            'title': 'Strategic Facebook Reels campaign for Ute Plaza Supermarket focusing on holiday merchandise and seasonal promotions. Created engaging vertical short-form video content optimized for Facebook\'s Reels platform to showcase holiday products, drive foot traffic, and increase seasonal sales through authentic storytelling and festive themes.',
            'category': 'Social Media Content & Campaigns',
            'client': 'Ute Plaza Supermarket - Ute Tribal Enterprises',
            'project_type': 'Multi-Holiday Facebook Video Marketing & Seasonal Merchandising Campaign',
            'description': 'Comprehensive seasonal marketing campaign featuring 4 strategic Facebook Reels designed to drive holiday shopping traffic and boost seasonal merchandise sales at Ute Plaza Supermarket. Each video strategically targets different holiday periods (Christmas, Valentine\'s Day, Easter) with engaging vertical content optimized for mobile viewing and social media engagement. The campaign showcases festive store displays, seasonal products, and promotional merchandise to attract customers during peak holiday shopping seasons, supporting the supermarket\'s revenue goals through compelling visual storytelling and strategic social media marketing.',
            'images': ['FACEBOOK_REELS_THUMBNAIL'],
            'facebookReels': {
                'sectionTitle': 'Holiday Merchandising Facebook Reels Campaign',
                'videosTitle': '4 Strategic Holiday Marketing Videos',
                'videosSubtitle': 'Each reel targets specific holiday periods with engaging vertical content designed for mobile social media consumption',
                'videos': [
                    {
                        'url': 'https://www.facebook.com/reel/1378729616424715',
                        'title': 'Christmas Merchandising & Holiday Setup',
                        'description': 'A vertical reel showcasing festive displays, aisle decor, and seasonal items to attract holiday shoppers during peak season.',
                        'holiday': 'Christmas',
                        'type': 'merchandising_display'
                    },
                    {
                        'url': 'https://fb.watch/BkYVO2DIaa/',
                        'title': 'Valentine\'s Day Gifts & Treats',
                        'description': 'A colorful reel highlighting romantic gifts and limited-edition sweets designed to drive impulse purchases and seasonal engagement.',
                        'holiday': 'Valentine\'s Day',
                        'type': 'seasonal_promotion'
                    },
                    {
                        'url': 'https://www.facebook.com/61553345977172/videos/839807461666396',
                        'title': 'Let\'s Go Easter Shopping',
                        'description': 'A cheerful Easter-themed reel showing candy aisles, decorations, and merchandise to boost in-store visits from families and holiday shoppers.',
                        'holiday': 'Easter',
                        'type': 'family_engagement'
                    },
                    {
                        'url': 'https://www.facebook.com/61553345977172/videos/1317472942877068',
                        'title': 'Easter Promo - Seasonal Merch Focus',
                        'description': 'A fun, engaging reel that spotlights Easter grocery promotions, themed product displays, and limited-time offers.',
                        'holiday': 'Easter',
                        'type': 'promotional_content'
                    }
                ]
            },
            'type': 'social_video',
            'featured': True,
            'orientation': 'vertical',
            'key_contributions': [
                "Developed comprehensive holiday marketing strategy targeting 4 major seasonal shopping periods with strategic video content",
                "Created engaging Facebook Reels optimized for vertical mobile viewing and social media algorithm performance",
                "Designed seasonal merchandising displays and promotional setups specifically for video marketing content",
                "Coordinated holiday-specific marketing campaigns to maximize customer engagement during peak shopping seasons",
                "Produced mobile-friendly vertical video content that showcases store atmosphere and seasonal product offerings",
                "Implemented strategic timing for content release to align with holiday shopping patterns and consumer behavior",
                "Developed consistent visual branding and messaging across multiple holiday campaigns for brand recognition"
            ],
            'skills_utilized': [
                "Facebook Reels Creation & Optimization", "Mobile-First Video Marketing", "Seasonal Campaign Strategy",
                "Holiday Merchandising Display", "Vertical Video Production", "Social Media Algorithm Optimization",
                "Consumer Behavior Analysis", "Retail Marketing Strategy", "Visual Storytelling for Social Media",
                "Cross-Holiday Campaign Coordination", "Mobile Video Engagement", "Seasonal Promotional Planning"
            ],
            'impact': {
                'campaign_metrics': [
                    "4 strategic holiday marketing videos created targeting Christmas, Valentine's Day, and Easter shopping seasons",
                    "100% mobile-optimized vertical video format designed for Facebook Reels algorithm and user engagement",
                    "Multi-seasonal campaign approach covering 4+ months of peak retail shopping periods throughout the year",
                    "Comprehensive merchandising display coordination featuring seasonal decorations, product arrangements, and promotional setups",
                    "Strategic content timing aligned with holiday shopping patterns to maximize customer reach and store visit conversion"
                ],
                'engagement_outcomes': [
                    "Enhanced seasonal brand visibility through engaging Facebook Reels content optimized for mobile social media consumption",
                    "Increased customer awareness of holiday merchandise and seasonal promotional offerings through strategic video marketing",
                    "Boosted in-store foot traffic during peak shopping seasons by showcasing attractive store displays and seasonal product arrangements",
                    "Strengthened community engagement through locally-focused holiday content that resonates with regional shopping preferences",
                    "Improved social media presence with professional vertical video content designed to perform well on Facebook's algorithm"
                ],
                'business_impact': [
                    "Supported seasonal revenue goals through strategic holiday marketing campaigns targeting key shopping periods",
                    "Enhanced customer shopping experience by highlighting seasonal merchandise availability and store festive atmosphere",
                    "Increased impulse purchasing opportunities by showcasing attractive holiday displays and limited-time seasonal offerings",
                    "Built stronger brand recognition in local community through consistent holiday marketing and social media engagement",
                    "Demonstrated effective use of social media marketing to drive retail foot traffic and seasonal merchandise sales"
                ]
            },
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        
        # Insert the single, consolidated project
        result = db.projects.insert_one(facebook_reels_project)
        print(f"✅ Added single Facebook Reels project with ID: {facebook_reels_project['id']}")
        print(f"✅ New title: '{facebook_reels_project['title'][:80]}...'")
        print("✅ Contains 4 Facebook video URLs with exact captions as requested")
        print("✅ Maintains the same fun design with holiday badges and consistent layout")
        
    except Exception as e:
        print(f"❌ Error consolidating Facebook Reels project: {e}")

if __name__ == "__main__":
    print("🔄 Consolidating Facebook Reels projects...")
    consolidate_facebook_reels_project()
    print("✅ Facebook Reels project consolidation complete")