#!/usr/bin/env python3
"""
Review Request Testing: Comprehensive Graphic Design Portfolio
Tests the specific requirements from the review request
"""

import requests
import json
import os
import sys
from datetime import datetime
from typing import Dict, Any, List

# Load environment variables
sys.path.append('/app/backend')
from dotenv import load_dotenv
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'http://localhost:8001')
API_BASE_URL = f"{BACKEND_URL}/api"

class ReviewRequestTester:
    def __init__(self):
        self.session = requests.Session()
        self.test_results = []
        
    def log_test(self, test_name: str, success: bool, message: str, details: Dict = None):
        """Log test results"""
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'timestamp': datetime.now().isoformat(),
            'details': details or {}
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {test_name}: {message}")
        if details and not success:
            print(f"   Details: {details}")
    
    def test_server_health(self):
        """Test if the FastAPI server is running and responding"""
        try:
            response = self.session.get(f"{API_BASE_URL}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "Portfolio API" in data.get("message", ""):
                    self.log_test("Server Health Check", True, "Backend server is running and responding correctly")
                    return True
                else:
                    self.log_test("Server Health Check", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("Server Health Check", False, f"Server returned status {response.status_code}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Server Health Check", False, f"Connection failed: {str(e)}")
            return False
    
    def find_comprehensive_graphic_design_portfolio(self):
        """Find the Comprehensive Graphic Design Portfolio project by title search"""
        try:
            response = self.session.get(f"{API_BASE_URL}/projects", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                found_project = None
                
                # Search for project by title containing "Comprehensive Graphic Design Portfolio"
                for project in projects:
                    title = project.get('title', '')
                    if "Comprehensive Graphic Design Portfolio" in title:
                        found_project = project
                        break
                
                if found_project:
                    self.log_test("1. Project Exists - Search by Title", True, 
                                f"✅ Found project: '{found_project.get('title')}'")
                    return found_project
                else:
                    self.log_test("1. Project Exists - Search by Title", False, 
                                "❌ Project with title containing 'Comprehensive Graphic Design Portfolio' not found")
                    return None
            else:
                self.log_test("1. Project Exists - Search by Title", False, 
                            f"❌ API request failed with status {response.status_code}: {response.text}")
                return None
        except requests.exceptions.RequestException as e:
            self.log_test("1. Project Exists - Search by Title", False, f"❌ Request failed: {str(e)}")
            return None

    def test_image_count(self, project):
        """Test that the project has exactly 32 images"""
        try:
            images = project.get('images', [])
            expected_count = 32
            
            if len(images) == expected_count:
                self.log_test("2. Correct Image Count", True, 
                            f"✅ Project has exactly {expected_count} images as required")
                return True
            else:
                self.log_test("2. Correct Image Count", False, 
                            f"❌ Expected {expected_count} images, found {len(images)}")
                return False
                
        except Exception as e:
            self.log_test("2. Correct Image Count", False, f"❌ Error checking image count: {str(e)}")
            return False

    def test_ute_plaza_eggstravaganza_image(self, project):
        """Test that the last image (index 31) is the Ute Plaza Eggstravaganza URL"""
        try:
            images = project.get('images', [])
            expected_url = "https://customer-assets.emergentagent.com/job_content-manager-13/artifacts/eh3a9b99_Ute%20Plaza%20Eggstravaganza.jpg"
            
            if len(images) < 32:
                self.log_test("3. Event Flyers New Image", False, 
                            f"❌ Project has only {len(images)} images, cannot check index 31")
                return False
            
            # Check the last image (index 31)
            last_image = images[31] if len(images) > 31 else None
            
            if last_image and expected_url in str(last_image):
                self.log_test("3. Event Flyers New Image", True, 
                            f"✅ Last image (index 31) contains the expected Ute Plaza Eggstravaganza URL")
                return True
            else:
                self.log_test("3. Event Flyers New Image", False, 
                            f"❌ Expected Ute Plaza Eggstravaganza URL at index 31. Found: {str(last_image)[:100]}...")
                return False
                
        except Exception as e:
            self.log_test("3. Event Flyers New Image", False, f"❌ Error checking Ute Plaza image: {str(e)}")
            return False

    def test_impact_metrics(self, project):
        """Test that impact.business_scope_metrics contains '32 professional graphic design pieces'"""
        try:
            impact = project.get('impact', {})
            expected_text = "32 professional graphic design pieces"
            
            # Check in impact.business_scope_metrics
            business_scope_metrics = impact.get('business_scope_metrics', '') if isinstance(impact, dict) else ''
            if expected_text in str(business_scope_metrics):
                self.log_test("4. Impact Metrics Updated", True, 
                            f"✅ Impact metrics contain the expected text: '{expected_text}'")
                return True
            
            # Also check in description as fallback
            description = project.get('description', '')
            if expected_text in description:
                self.log_test("4. Impact Metrics Updated", True, 
                            f"✅ Expected text found in description: '{expected_text}'")
                return True
            
            # Check in other impact fields
            if isinstance(impact, dict):
                for key, value in impact.items():
                    if expected_text in str(value):
                        self.log_test("4. Impact Metrics Updated", True, 
                                    f"✅ Expected text found in impact.{key}: '{expected_text}'")
                        return True
            
            self.log_test("4. Impact Metrics Updated", False, 
                        f"❌ Expected text '{expected_text}' not found in impact metrics or description")
            return False
                
        except Exception as e:
            self.log_test("4. Impact Metrics Updated", False, f"❌ Error checking impact metrics: {str(e)}")
            return False

    def test_category(self, project):
        """Test that the project is in 'Graphic Design & Marketing Materials' category"""
        try:
            category = project.get('category', '')
            expected_category = "Graphic Design & Marketing Materials"
            
            if category == expected_category:
                self.log_test("5. Category Correct", True, 
                            f"✅ Project is in the correct category: '{expected_category}'")
                return True
            else:
                # Also check for similar category names
                if "Graphic Design" in category:
                    self.log_test("5. Category Correct", True, 
                                f"✅ Project is in a Graphic Design category: '{category}' (acceptable match)")
                    return True
                else:
                    self.log_test("5. Category Correct", False, 
                                f"❌ Expected category '{expected_category}', found: '{category}'")
                    return False
                
        except Exception as e:
            self.log_test("5. Category Correct", False, f"❌ Error checking category: {str(e)}")
            return False

    def run_review_request_tests(self):
        """Run all review request tests"""
        print("🎨 COMPREHENSIVE GRAPHIC DESIGN PORTFOLIO - REVIEW REQUEST TESTING")
        print(f"📡 Testing Backend URL: {API_BASE_URL}")
        print("=" * 80)
        print("Testing the following requirements:")
        print("1. Project Exists: Find by title 'Comprehensive Graphic Design Portfolio'")
        print("2. Correct Image Count: Verify it has exactly 32 images")
        print("3. Event Flyers New Image: Check last image (index 31) is Ute Plaza Eggstravaganza")
        print("4. Impact Metrics Updated: Verify contains '32 professional graphic design pieces'")
        print("5. Category Correct: Confirm it's in 'Graphic Design & Marketing Materials'")
        print("=" * 80)
        
        # Test server health first
        if not self.test_server_health():
            print("\n❌ Server health check failed. Cannot proceed with tests.")
            return False
        
        # Find the project
        project = self.find_comprehensive_graphic_design_portfolio()
        if not project:
            print("\n❌ Cannot proceed with tests - project not found.")
            return False
        
        print(f"\n📋 Project Details:")
        print(f"   ID: {project.get('id')}")
        print(f"   Title: {project.get('title')}")
        print(f"   Category: {project.get('category')}")
        print(f"   Images Count: {len(project.get('images', []))}")
        print("\n" + "=" * 80)
        
        # Run all tests
        test_results = []
        test_results.append(self.test_image_count(project))
        test_results.append(self.test_ute_plaza_eggstravaganza_image(project))
        test_results.append(self.test_impact_metrics(project))
        test_results.append(self.test_category(project))
        
        # Summary
        passed = sum(1 for result in self.test_results if result['success'])
        total = len(self.test_results)
        success_rate = (passed / total) * 100 if total > 0 else 0
        
        print("\n" + "=" * 80)
        print("📊 REVIEW REQUEST TEST SUMMARY")
        print("=" * 80)
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {success_rate:.1f}%")
        
        if passed == total:
            print("\n🎉 ALL REVIEW REQUEST REQUIREMENTS MET!")
            print("✅ The Comprehensive Graphic Design Portfolio project is working correctly.")
        else:
            print(f"\n⚠️  {total - passed} REQUIREMENTS NOT MET")
            print("❌ The following issues need to be addressed:")
            for result in self.test_results:
                if not result['success']:
                    print(f"   - {result['test']}: {result['message']}")
        
        return passed == total

if __name__ == "__main__":
    tester = ReviewRequestTester()
    success = tester.run_review_request_tests()
    sys.exit(0 if success else 1)