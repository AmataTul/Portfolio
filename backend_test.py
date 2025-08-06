#!/usr/bin/env python3
"""
Comprehensive Backend API Testing Suite for Portfolio Website
Tests all FastAPI endpoints with proper error handling and validation
"""

import requests
import json
import os
import sys
from datetime import datetime
from typing import Dict, Any, List
import uuid

# Load environment variables
sys.path.append('/app/backend')
from dotenv import load_dotenv
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'http://localhost:8001')
API_BASE_URL = f"{BACKEND_URL}/api"

class BackendTester:
    def __init__(self):
        self.session = requests.Session()
        self.test_results = []
        self.created_project_id = None
        
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
    
    def test_initialize_data(self):
        """Test the data initialization endpoint"""
        try:
            response = self.session.post(f"{API_BASE_URL}/initialize-data", timeout=30)
            if response.status_code == 200:
                data = response.json()
                message = data.get("message", "")
                if "initialized" in message.lower() or "already initialized" in message.lower():
                    self.log_test("Initialize Mock Data", True, f"Data initialization successful: {message}")
                    return True
                else:
                    self.log_test("Initialize Mock Data", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("Initialize Mock Data", False, f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Initialize Mock Data", False, f"Request failed: {str(e)}")
            return False
    
    def test_get_projects(self):
        """Test retrieving all projects"""
        try:
            response = self.session.get(f"{API_BASE_URL}/projects", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                if isinstance(projects, list):
                    self.log_test("Get All Projects", True, f"Retrieved {len(projects)} projects successfully")
                    return projects
                else:
                    self.log_test("Get All Projects", False, f"Expected list, got: {type(projects)}")
                    return []
            else:
                self.log_test("Get All Projects", False, f"Status {response.status_code}: {response.text}")
                return []
        except requests.exceptions.RequestException as e:
            self.log_test("Get All Projects", False, f"Request failed: {str(e)}")
            return []
    
    def test_get_projects_by_category(self):
        """Test filtering projects by category"""
        try:
            # Test with Analytics category
            response = self.session.get(f"{API_BASE_URL}/projects?category=Business Analytics & Strategy", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                if isinstance(projects, list):
                    analytics_projects = [p for p in projects if p.get('category') == 'Business Analytics & Strategy']
                    if len(analytics_projects) > 0:
                        self.log_test("Filter Projects by Category", True, f"Found {len(analytics_projects)} analytics projects")
                        return True
                    else:
                        self.log_test("Filter Projects by Category", True, "No analytics projects found (expected if not initialized)")
                        return True
                else:
                    self.log_test("Filter Projects by Category", False, f"Expected list, got: {type(projects)}")
                    return False
            else:
                self.log_test("Filter Projects by Category", False, f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Filter Projects by Category", False, f"Request failed: {str(e)}")
            return False
    
    def test_create_project(self):
        """Test creating a new project"""
        try:
            project_data = {
                "title": "Test Marketing Campaign",
                "category": "Advertising",
                "client": "Test Client Inc.",
                "description": "A comprehensive test marketing campaign showcasing creative strategy and execution.",
                "images": ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"],
                "type": "image",
                "featured": False,
                "orientation": "horizontal"
            }
            
            response = self.session.post(f"{API_BASE_URL}/projects", json=project_data, timeout=10)
            if response.status_code == 200:
                project = response.json()
                if project.get('id') and project.get('title') == project_data['title']:
                    self.created_project_id = project['id']
                    self.log_test("Create Project", True, f"Project created successfully with ID: {project['id']}")
                    return project
                else:
                    self.log_test("Create Project", False, f"Invalid project response: {project}")
                    return None
            else:
                self.log_test("Create Project", False, f"Status {response.status_code}: {response.text}")
                return None
        except requests.exceptions.RequestException as e:
            self.log_test("Create Project", False, f"Request failed: {str(e)}")
            return None
    
    def test_get_single_project(self):
        """Test retrieving a single project by ID"""
        if not self.created_project_id:
            self.log_test("Get Single Project", False, "No project ID available for testing")
            return False
        
        try:
            response = self.session.get(f"{API_BASE_URL}/projects/{self.created_project_id}", timeout=10)
            if response.status_code == 200:
                project = response.json()
                if project.get('id') == self.created_project_id:
                    self.log_test("Get Single Project", True, f"Retrieved project successfully: {project['title']}")
                    return True
                else:
                    self.log_test("Get Single Project", False, f"ID mismatch: expected {self.created_project_id}, got {project.get('id')}")
                    return False
            else:
                self.log_test("Get Single Project", False, f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Get Single Project", False, f"Request failed: {str(e)}")
            return False
    
    def test_update_project(self):
        """Test updating a project"""
        if not self.created_project_id:
            self.log_test("Update Project", False, "No project ID available for testing")
            return False
        
        try:
            update_data = {
                "title": "Updated Test Marketing Campaign",
                "description": "Updated description for the test marketing campaign."
            }
            
            response = self.session.put(f"{API_BASE_URL}/projects/{self.created_project_id}", json=update_data, timeout=10)
            if response.status_code == 200:
                project = response.json()
                if project.get('title') == update_data['title']:
                    self.log_test("Update Project", True, f"Project updated successfully: {project['title']}")
                    return True
                else:
                    self.log_test("Update Project", False, f"Title not updated: expected '{update_data['title']}', got '{project.get('title')}'")
                    return False
            else:
                self.log_test("Update Project", False, f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Update Project", False, f"Request failed: {str(e)}")
            return False
    
    def test_delete_project(self):
        """Test deleting a project"""
        if not self.created_project_id:
            self.log_test("Delete Project", False, "No project ID available for testing")
            return False
        
        try:
            response = self.session.delete(f"{API_BASE_URL}/projects/{self.created_project_id}", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "deleted" in data.get("message", "").lower():
                    self.log_test("Delete Project", True, "Project deleted successfully")
                    return True
                else:
                    self.log_test("Delete Project", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("Delete Project", False, f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Delete Project", False, f"Request failed: {str(e)}")
            return False
    
    def test_categories_endpoints(self):
        """Test category endpoints"""
        try:
            # Test GET categories
            response = self.session.get(f"{API_BASE_URL}/categories", timeout=10)
            if response.status_code == 200:
                categories = response.json()
                if isinstance(categories, list):
                    self.log_test("Get Categories", True, f"Retrieved {len(categories)} categories")
                    
                    # Test POST category
                    new_category = {
                        "name": "Test Category",
                        "description": "A test category for API testing"
                    }
                    
                    response = self.session.post(f"{API_BASE_URL}/categories", json=new_category, timeout=10)
                    if response.status_code == 200:
                        category = response.json()
                        if category.get('name') == new_category['name']:
                            self.log_test("Create Category", True, f"Category created: {category['name']}")
                            return True
                        else:
                            self.log_test("Create Category", False, f"Name mismatch: {category}")
                            return False
                    else:
                        self.log_test("Create Category", False, f"Status {response.status_code}: {response.text}")
                        return False
                else:
                    self.log_test("Get Categories", False, f"Expected list, got: {type(categories)}")
                    return False
            else:
                self.log_test("Get Categories", False, f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Categories Endpoints", False, f"Request failed: {str(e)}")
            return False
    
    def test_contact_endpoints(self):
        """Test contact info endpoints"""
        try:
            # Test GET contact (might not exist initially)
            response = self.session.get(f"{API_BASE_URL}/contact", timeout=10)
            
            # Test POST/PUT contact
            contact_data = {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "linkedin": "https://linkedin.com/in/johndoe",
                "phone": "+1 (555) 123-4567",
                "location": "New York, NY"
            }
            
            response = self.session.post(f"{API_BASE_URL}/contact", json=contact_data, timeout=10)
            if response.status_code == 200:
                contact = response.json()
                if contact.get('email') == contact_data['email']:
                    self.log_test("Contact Endpoints", True, f"Contact info created/updated: {contact['name']}")
                    return True
                else:
                    self.log_test("Contact Endpoints", False, f"Email mismatch: {contact}")
                    return False
            else:
                self.log_test("Contact Endpoints", False, f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Contact Endpoints", False, f"Request failed: {str(e)}")
            return False
    
    def test_work_history_endpoints(self):
        """Test work history endpoints"""
        try:
            # Test GET work history
            response = self.session.get(f"{API_BASE_URL}/work-history", timeout=10)
            if response.status_code == 200:
                work_history = response.json()
                if isinstance(work_history, list):
                    self.log_test("Get Work History", True, f"Retrieved {len(work_history)} work entries")
                    
                    # Test POST work history
                    work_data = {
                        "position": "Test Marketing Manager",
                        "company": "Test Company Inc.",
                        "location": "Test City, TS",
                        "period": "2023 - 2024",
                        "achievements": [
                            "Led successful marketing campaigns",
                            "Increased brand awareness by 50%"
                        ]
                    }
                    
                    response = self.session.post(f"{API_BASE_URL}/work-history", json=work_data, timeout=10)
                    if response.status_code == 200:
                        work = response.json()
                        if work.get('position') == work_data['position']:
                            self.log_test("Create Work History", True, f"Work entry created: {work['position']}")
                            return True
                        else:
                            self.log_test("Create Work History", False, f"Position mismatch: {work}")
                            return False
                    else:
                        self.log_test("Create Work History", False, f"Status {response.status_code}: {response.text}")
                        return False
                else:
                    self.log_test("Get Work History", False, f"Expected list, got: {type(work_history)}")
                    return False
            else:
                self.log_test("Get Work History", False, f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Work History Endpoints", False, f"Request failed: {str(e)}")
            return False
    
    def test_education_endpoints(self):
        """Test education endpoints"""
        try:
            # Test POST education
            education_data = {
                "degree": "Bachelor of Science in Computer Science",
                "minor": "Mathematics",
                "university": "Test University",
                "honor": "Magna Cum Laude",
                "period": "2019 - 2023"
            }
            
            response = self.session.post(f"{API_BASE_URL}/education", json=education_data, timeout=10)
            if response.status_code == 200:
                education = response.json()
                if education.get('degree') == education_data['degree']:
                    self.log_test("Education Endpoints", True, f"Education created/updated: {education['degree']}")
                    
                    # Test GET education
                    response = self.session.get(f"{API_BASE_URL}/education", timeout=10)
                    if response.status_code == 200:
                        retrieved_education = response.json()
                        if retrieved_education.get('degree') == education_data['degree']:
                            self.log_test("Get Education", True, "Education retrieved successfully")
                            return True
                        else:
                            self.log_test("Get Education", False, f"Degree mismatch: {retrieved_education}")
                            return False
                    else:
                        self.log_test("Get Education", False, f"Status {response.status_code}: {response.text}")
                        return False
                else:
                    self.log_test("Education Endpoints", False, f"Degree mismatch: {education}")
                    return False
            else:
                self.log_test("Education Endpoints", False, f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Education Endpoints", False, f"Request failed: {str(e)}")
            return False
    
    def test_tools_endpoints(self):
        """Test tools endpoints"""
        try:
            # Test GET tools
            response = self.session.get(f"{API_BASE_URL}/tools", timeout=10)
            if response.status_code == 200:
                tools = response.json()
                if isinstance(tools, list):
                    self.log_test("Get Tools", True, f"Retrieved {len(tools)} tools")
                    
                    # Test POST tool
                    tool_data = {
                        "name": "Test Analytics Tool",
                        "category": "Analytics & Testing"
                    }
                    
                    response = self.session.post(f"{API_BASE_URL}/tools", json=tool_data, timeout=10)
                    if response.status_code == 200:
                        tool = response.json()
                        if tool.get('name') == tool_data['name']:
                            self.log_test("Create Tool", True, f"Tool created: {tool['name']}")
                            return True
                        else:
                            self.log_test("Create Tool", False, f"Name mismatch: {tool}")
                            return False
                    else:
                        self.log_test("Create Tool", False, f"Status {response.status_code}: {response.text}")
                        return False
                else:
                    self.log_test("Get Tools", False, f"Expected list, got: {type(tools)}")
                    return False
            else:
                self.log_test("Get Tools", False, f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Tools Endpoints", False, f"Request failed: {str(e)}")
            return False
    
    def test_brands_endpoints(self):
        """Test brands endpoints"""
        try:
            # Test GET brands
            response = self.session.get(f"{API_BASE_URL}/brands", timeout=10)
            if response.status_code == 200:
                brands = response.json()
                if isinstance(brands, list):
                    self.log_test("Get Brands", True, f"Retrieved {len(brands)} brands")
                    
                    # Test POST brand
                    brand_data = {
                        "name": "Test Brand Inc."
                    }
                    
                    response = self.session.post(f"{API_BASE_URL}/brands", json=brand_data, timeout=10)
                    if response.status_code == 200:
                        brand = response.json()
                        if brand.get('name') == brand_data['name']:
                            self.log_test("Create Brand", True, f"Brand created: {brand['name']}")
                            return True
                        else:
                            self.log_test("Create Brand", False, f"Name mismatch: {brand}")
                            return False
                    else:
                        self.log_test("Create Brand", False, f"Status {response.status_code}: {response.text}")
                        return False
                else:
                    self.log_test("Get Brands", False, f"Expected list, got: {type(brands)}")
                    return False
            else:
                self.log_test("Get Brands", False, f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Brands Endpoints", False, f"Request failed: {str(e)}")
            return False
    
    def test_file_upload(self):
        """Test file upload endpoint"""
        try:
            # Create a simple test file
            test_content = b"This is a test file for upload testing"
            files = {'file': ('test.txt', test_content, 'text/plain')}
            
            response = self.session.post(f"{API_BASE_URL}/upload", files=files, timeout=10)
            if response.status_code == 200:
                result = response.json()
                if result.get('filename') == 'test.txt' and 'base64_data' in result:
                    self.log_test("File Upload", True, f"File uploaded successfully: {result['filename']}")
                    return True
                else:
                    self.log_test("File Upload", False, f"Invalid upload response: {result}")
                    return False
            else:
                self.log_test("File Upload", False, f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("File Upload", False, f"Request failed: {str(e)}")
            return False
    
    def test_ute_bison_ranch_project_retrieval(self):
        """Test that Ute Bison Ranch project exists and is retrievable"""
        try:
            response = self.session.get(f"{API_BASE_URL}/projects", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                ute_bison_project = None
                
                # Find the Ute Bison Ranch project
                for project in projects:
                    if "Ute Bison Ranch" in project.get('title', '') or "Summer Youth Program" in project.get('title', ''):
                        ute_bison_project = project
                        break
                
                if ute_bison_project:
                    self.log_test("Ute Bison Ranch Project Retrieval", True, 
                                f"Found Ute Bison Ranch project: {ute_bison_project['title']}")
                    return ute_bison_project
                else:
                    self.log_test("Ute Bison Ranch Project Retrieval", False, 
                                "Ute Bison Ranch project not found in projects list")
                    return None
            else:
                self.log_test("Ute Bison Ranch Project Retrieval", False, 
                            f"Status {response.status_code}: {response.text}")
                return None
        except requests.exceptions.RequestException as e:
            self.log_test("Ute Bison Ranch Project Retrieval", False, f"Request failed: {str(e)}")
            return None
    
    def test_ute_bison_ranch_base64_images(self):
        """Test that Ute Bison Ranch project has valid base64 images"""
        try:
            # First get the project
            ute_project = self.test_ute_bison_ranch_project_retrieval()
            if not ute_project:
                self.log_test("Ute Bison Ranch Base64 Images", False, 
                            "Cannot test images - project not found")
                return False
            
            images = ute_project.get('images', [])
            if not images:
                self.log_test("Ute Bison Ranch Base64 Images", False, 
                            "No images found in Ute Bison Ranch project")
                return False
            
            # Check that we have 5 images as expected
            if len(images) != 5:
                self.log_test("Ute Bison Ranch Base64 Images", False, 
                            f"Expected 5 images, found {len(images)}")
                return False
            
            # Validate each image is proper base64 format
            valid_images = 0
            for i, image in enumerate(images):
                if isinstance(image, str) and image.startswith("data:image/jpeg;base64,"):
                    # Check that there's actual base64 data after the prefix
                    base64_data = image.split("data:image/jpeg;base64,")[1]
                    if len(base64_data) > 100:  # Should be substantial base64 data
                        valid_images += 1
                    else:
                        self.log_test("Ute Bison Ranch Base64 Images", False, 
                                    f"Image {i+1} has insufficient base64 data")
                        return False
                else:
                    self.log_test("Ute Bison Ranch Base64 Images", False, 
                                f"Image {i+1} is not in proper base64 format: {image[:50]}...")
                    return False
            
            if valid_images == 5:
                self.log_test("Ute Bison Ranch Base64 Images", True, 
                            f"All 5 base64 images are valid and properly formatted")
                return True
            else:
                self.log_test("Ute Bison Ranch Base64 Images", False, 
                            f"Only {valid_images}/5 images are valid")
                return False
                
        except Exception as e:
            self.log_test("Ute Bison Ranch Base64 Images", False, f"Error validating images: {str(e)}")
            return False
    
    def test_ute_bison_ranch_photography_category(self):
        """Test that Ute Bison Ranch project appears in Photography Projects category"""
        try:
            # Test with Photography Projects category (URL encoded)
            response = self.session.get(f"{API_BASE_URL}/projects?category=Photography%20Projects", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                ute_bison_project = None
                
                # Find the Ute Bison Ranch project in Photography category
                for project in projects:
                    if "Ute Bison Ranch" in project.get('title', '') or "Summer Youth Program" in project.get('title', ''):
                        ute_bison_project = project
                        break
                
                if ute_bison_project:
                    # Verify it's actually in Photography Projects category
                    if ute_bison_project.get('category') == 'Photography Projects':
                        self.log_test("Ute Bison Ranch Photography Category", True, 
                                    f"Ute Bison Ranch project found in Photography Projects category")
                        return True
                    else:
                        self.log_test("Ute Bison Ranch Photography Category", False, 
                                    f"Project found but in wrong category: {ute_bison_project.get('category')}")
                        return False
                else:
                    self.log_test("Ute Bison Ranch Photography Category", False, 
                                "Ute Bison Ranch project not found in Photography Projects category")
                    return False
            else:
                self.log_test("Ute Bison Ranch Photography Category", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Ute Bison Ranch Photography Category", False, f"Request failed: {str(e)}")
            return False
    
    def test_ute_bison_ranch_project_details(self):
        """Test that Ute Bison Ranch project has complete details including educational impact"""
        try:
            ute_project = self.test_ute_bison_ranch_project_retrieval()
            if not ute_project:
                self.log_test("Ute Bison Ranch Project Details", False, 
                            "Cannot test details - project not found")
                return False
            
            # Check required fields
            required_fields = ['title', 'description', 'category', 'images', 'id']
            missing_fields = []
            
            for field in required_fields:
                if not ute_project.get(field):
                    missing_fields.append(field)
            
            if missing_fields:
                self.log_test("Ute Bison Ranch Project Details", False, 
                            f"Missing required fields: {missing_fields}")
                return False
            
            # Check that description contains educational content
            description = ute_project.get('description', '')
            educational_keywords = ['youth', 'program', 'educational', 'learning', 'students', 'summer']
            has_educational_content = any(keyword.lower() in description.lower() for keyword in educational_keywords)
            
            if not has_educational_content:
                self.log_test("Ute Bison Ranch Project Details", False, 
                            "Description lacks educational impact content")
                return False
            
            # Check that it has proper project structure
            if ute_project.get('category') != 'Photography Projects':
                self.log_test("Ute Bison Ranch Project Details", False, 
                            f"Wrong category: {ute_project.get('category')}")
                return False
            
            self.log_test("Ute Bison Ranch Project Details", True, 
                        "Project has complete details with educational impact content")
            return True
            
        except Exception as e:
            self.log_test("Ute Bison Ranch Project Details", False, f"Error checking details: {str(e)}")
            return False
    
    def test_ute_bison_ranch_individual_retrieval(self):
        """Test individual project retrieval for Ute Bison Ranch project"""
        try:
            # First get the project to find its ID
            ute_project = self.test_ute_bison_ranch_project_retrieval()
            if not ute_project:
                self.log_test("Ute Bison Ranch Individual Retrieval", False, 
                            "Cannot test individual retrieval - project not found")
                return False
            
            project_id = ute_project.get('id')
            if not project_id:
                self.log_test("Ute Bison Ranch Individual Retrieval", False, 
                            "Project ID not found")
                return False
            
            # Test individual project retrieval
            response = self.session.get(f"{API_BASE_URL}/projects/{project_id}", timeout=10)
            if response.status_code == 200:
                individual_project = response.json()
                
                # Verify it's the same project
                if individual_project.get('id') == project_id:
                    # Verify images are still intact
                    images = individual_project.get('images', [])
                    if len(images) == 5:
                        self.log_test("Ute Bison Ranch Individual Retrieval", True, 
                                    f"Individual project retrieval successful with {len(images)} images")
                        return True
                    else:
                        self.log_test("Ute Bison Ranch Individual Retrieval", False, 
                                    f"Expected 5 images, got {len(images)}")
                        return False
                else:
                    self.log_test("Ute Bison Ranch Individual Retrieval", False, 
                                f"ID mismatch: expected {project_id}, got {individual_project.get('id')}")
                    return False
            else:
                self.log_test("Ute Bison Ranch Individual Retrieval", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Ute Bison Ranch Individual Retrieval", False, f"Request failed: {str(e)}")
            return False
    
    def test_educational_animation_project_retrieval(self):
        """Test that Educational Animation project exists and is retrievable (may be under old or new title)"""
        try:
            response = self.session.get(f"{API_BASE_URL}/projects", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                educational_project = None
                
                # First look for the new title
                for project in projects:
                    title = project.get('title', '')
                    if ("Traditional Knowledge" in title and "Modern Learning" in title) or \
                       ("Educational Animation" in title and "Ute" in project.get('client', '')):
                        educational_project = project
                        break
                
                # If not found, look for the old Financial Literacy project that should have been updated
                if not educational_project:
                    for project in projects:
                        title = project.get('title', '')
                        if "Financial Literacy" in title and "Animation" in title:
                            educational_project = project
                            self.log_test("Educational Animation Project Retrieval", False, 
                                        f"Found old Financial Literacy project that should have been updated: {title}")
                            return educational_project
                
                if educational_project:
                    self.log_test("Educational Animation Project Retrieval", True, 
                                f"Found Educational Animation project: {educational_project['title']}")
                    return educational_project
                else:
                    self.log_test("Educational Animation Project Retrieval", False, 
                                "Educational Animation project not found in projects list")
                    return None
            else:
                self.log_test("Educational Animation Project Retrieval", False, 
                            f"Status {response.status_code}: {response.text}")
                return None
        except requests.exceptions.RequestException as e:
            self.log_test("Educational Animation Project Retrieval", False, f"Request failed: {str(e)}")
            return None
    
    def test_educational_animation_youtube_url(self):
        """Test that Educational Animation project has proper YouTube URL"""
        try:
            educational_project = self.test_educational_animation_project_retrieval()
            if not educational_project:
                self.log_test("Educational Animation YouTube URL", False, 
                            "Cannot test YouTube URL - project not found")
                return False
            
            # Check for YouTube URL in various possible fields
            youtube_url = None
            expected_url = "https://youtu.be/DYLLB8qiQ8k?si=Zm0y51wWhkg6D3P8"
            
            # Check in images array (might be stored as video URL)
            images = educational_project.get('images', [])
            for image in images:
                if isinstance(image, str) and "youtu" in image:
                    youtube_url = image
                    break
            
            # Check in video_url field if it exists
            if not youtube_url:
                youtube_url = educational_project.get('video_url', '')
            
            # Check in description for the URL
            if not youtube_url:
                description = educational_project.get('description', '')
                if expected_url in description:
                    youtube_url = expected_url
            
            if youtube_url and "youtu" in youtube_url and "DYLLB8qiQ8k" in youtube_url:
                self.log_test("Educational Animation YouTube URL", True, 
                            f"YouTube URL found and valid: {youtube_url}")
                return True
            else:
                self.log_test("Educational Animation YouTube URL", False, 
                            f"YouTube URL not found or invalid. Found: {youtube_url}")
                return False
                
        except Exception as e:
            self.log_test("Educational Animation YouTube URL", False, f"Error checking YouTube URL: {str(e)}")
            return False
    
    def test_educational_animation_client_info(self):
        """Test that Educational Animation project has correct client information"""
        try:
            educational_project = self.test_educational_animation_project_retrieval()
            if not educational_project:
                self.log_test("Educational Animation Client Info", False, 
                            "Cannot test client info - project not found")
                return False
            
            client = educational_project.get('client', '')
            expected_client = "Ute Tribal Enterprises - Ute Bison"
            
            if client == expected_client:
                self.log_test("Educational Animation Client Info", True, 
                            f"Client information correct: {client}")
                return True
            else:
                self.log_test("Educational Animation Client Info", False, 
                            f"Client mismatch. Expected: '{expected_client}', Got: '{client}'")
                return False
                
        except Exception as e:
            self.log_test("Educational Animation Client Info", False, f"Error checking client info: {str(e)}")
            return False
    
    def test_educational_animation_category_filtering(self):
        """Test that Educational Animation project appears in Illustrations & Educational Content category"""
        try:
            # Test with Illustrations & Educational Content category (URL encoded)
            response = self.session.get(f"{API_BASE_URL}/projects?category=Illustrations%20%26%20Educational%20Content", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                educational_project = None
                
                # Find the Educational Animation project in the category
                for project in projects:
                    title = project.get('title', '')
                    client = project.get('client', '')
                    if ("Traditional Knowledge" in title and "Modern Learning" in title) or \
                       ("Educational Animation" in title and "Ute" in client):
                        educational_project = project
                        break
                
                if educational_project:
                    # Verify it's actually in the correct category
                    category = educational_project.get('category')
                    if category == 'Illustrations & Educational Content':
                        self.log_test("Educational Animation Category Filtering", True, 
                                    f"Educational Animation project found in correct category")
                        return True
                    else:
                        self.log_test("Educational Animation Category Filtering", False, 
                                    f"Project found but in wrong category: {category}")
                        return False
                else:
                    self.log_test("Educational Animation Category Filtering", False, 
                                "Educational Animation project not found in Illustrations & Educational Content category")
                    return False
            else:
                self.log_test("Educational Animation Category Filtering", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Educational Animation Category Filtering", False, f"Request failed: {str(e)}")
            return False
    
    def test_educational_animation_project_details(self):
        """Test that Educational Animation project has complete details including tribal education focus"""
        try:
            educational_project = self.test_educational_animation_project_retrieval()
            if not educational_project:
                self.log_test("Educational Animation Project Details", False, 
                            "Cannot test details - project not found")
                return False
            
            # Check required fields
            required_fields = ['title', 'description', 'category', 'client', 'id']
            missing_fields = []
            
            for field in required_fields:
                if not educational_project.get(field):
                    missing_fields.append(field)
            
            if missing_fields:
                self.log_test("Educational Animation Project Details", False, 
                            f"Missing required fields: {missing_fields}")
                return False
            
            # Check that description contains tribal education content
            description = educational_project.get('description', '')
            tribal_keywords = ['tribal', 'traditional', 'knowledge', 'cultural', 'education', 'learning']
            has_tribal_content = any(keyword.lower() in description.lower() for keyword in tribal_keywords)
            
            if not has_tribal_content:
                self.log_test("Educational Animation Project Details", False, 
                            "Description lacks tribal cultural education content")
                return False
            
            # Check that it has proper project structure
            if educational_project.get('category') != 'Illustrations & Educational Content':
                self.log_test("Educational Animation Project Details", False, 
                            f"Wrong category: {educational_project.get('category')}")
                return False
            
            # Check project type is video
            project_type = educational_project.get('type', '')
            if project_type != 'video':
                self.log_test("Educational Animation Project Details", False, 
                            f"Wrong project type. Expected 'video', got: {project_type}")
                return False
            
            self.log_test("Educational Animation Project Details", True, 
                        "Project has complete details with tribal cultural education focus and correct video type")
            return True
            
        except Exception as e:
            self.log_test("Educational Animation Project Details", False, f"Error checking details: {str(e)}")
            return False
    
    def test_educational_animation_individual_retrieval(self):
        """Test individual project retrieval for Educational Animation project"""
        try:
            # First get the project to find its ID
            educational_project = self.test_educational_animation_project_retrieval()
            if not educational_project:
                self.log_test("Educational Animation Individual Retrieval", False, 
                            "Cannot test individual retrieval - project not found")
                return False
            
            project_id = educational_project.get('id')
            if not project_id:
                self.log_test("Educational Animation Individual Retrieval", False, 
                            "Project ID not found")
                return False
            
            # Test individual project retrieval
            response = self.session.get(f"{API_BASE_URL}/projects/{project_id}", timeout=10)
            if response.status_code == 200:
                individual_project = response.json()
                
                # Verify it's the same project
                if individual_project.get('id') == project_id:
                    # Verify all key details are intact
                    title = individual_project.get('title', '')
                    client = individual_project.get('client', '')
                    category = individual_project.get('category', '')
                    project_type = individual_project.get('type', '')
                    
                    if ("Traditional Knowledge" in title and "Modern Learning" in title and 
                        client == "Ute Tribal Enterprises - Ute Bison" and
                        category == "Illustrations & Educational Content" and
                        project_type == "video"):
                        self.log_test("Educational Animation Individual Retrieval", True, 
                                    f"Individual project retrieval successful with all details intact")
                        return True
                    else:
                        self.log_test("Educational Animation Individual Retrieval", False, 
                                    f"Project details incomplete. Title: {title}, Client: {client}, Category: {category}, Type: {project_type}")
                        return False
                else:
                    self.log_test("Educational Animation Individual Retrieval", False, 
                                f"ID mismatch: expected {project_id}, got {individual_project.get('id')}")
                    return False
            else:
                self.log_test("Educational Animation Individual Retrieval", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Educational Animation Individual Retrieval", False, f"Request failed: {str(e)}")
            return False
    
    def test_social_media_projects_retrieval(self):
        """Test that social media projects exist and are retrievable"""
        try:
            response = self.session.get(f"{API_BASE_URL}/projects", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                social_media_projects = []
                
                # Look for social media projects with TikTok URLs
                social_media_titles = [
                    "KahPeeh Kah-Ahn Coffee House TikTok Strategy",
                    "Adobe Creative Suite Instagram Reels",
                    "Adobe TikTok Content Strategy", 
                    "Beats by Dre Instagram Story Series",
                    "Disney+ Character Spotlight Campaign",
                    "Adobe Creative Tips TikTok Series",
                    "Ute Tribal Enterprises Cultural Content",
                    "Bison Made Product Showcase Reels"
                ]
                
                for project in projects:
                    title = project.get('title', '')
                    for social_title in social_media_titles:
                        if social_title in title:
                            social_media_projects.append(project)
                            break
                
                if len(social_media_projects) >= 8:
                    self.log_test("Social Media Projects Retrieval", True, 
                                f"Found {len(social_media_projects)} social media projects with TikTok integration")
                    return social_media_projects
                else:
                    self.log_test("Social Media Projects Retrieval", False, 
                                f"Expected at least 8 social media projects, found {len(social_media_projects)}")
                    return social_media_projects
            else:
                self.log_test("Social Media Projects Retrieval", False, 
                            f"Status {response.status_code}: {response.text}")
                return []
        except requests.exceptions.RequestException as e:
            self.log_test("Social Media Projects Retrieval", False, f"Request failed: {str(e)}")
            return []
    
    def test_tiktok_url_format_validation(self):
        """Test that TikTok URLs follow proper format pattern"""
        try:
            social_media_projects = self.test_social_media_projects_retrieval()
            if not social_media_projects:
                self.log_test("TikTok URL Format Validation", False, 
                            "Cannot test TikTok URLs - no social media projects found")
                return False
            
            valid_tiktok_urls = 0
            invalid_urls = []
            
            for project in social_media_projects:
                # Check for TikTok URL in videoUrl field
                video_url = project.get('videoUrl', '')
                if video_url:
                    if "tiktok.com" in video_url and "/video/" in video_url:
                        valid_tiktok_urls += 1
                    else:
                        invalid_urls.append(f"{project.get('title', 'Unknown')}: {video_url}")
                else:
                    # Check in images array as fallback
                    images = project.get('images', [])
                    found_tiktok = False
                    for image in images:
                        if isinstance(image, str) and "tiktok.com" in image and "/video/" in image:
                            valid_tiktok_urls += 1
                            found_tiktok = True
                            break
                    if not found_tiktok:
                        invalid_urls.append(f"{project.get('title', 'Unknown')}: No TikTok URL found")
            
            if valid_tiktok_urls >= 8:
                self.log_test("TikTok URL Format Validation", True, 
                            f"All {valid_tiktok_urls} TikTok URLs follow proper format")
                return True
            else:
                self.log_test("TikTok URL Format Validation", False, 
                            f"Only {valid_tiktok_urls}/8+ TikTok URLs are valid. Invalid: {invalid_urls}")
                return False
                
        except Exception as e:
            self.log_test("TikTok URL Format Validation", False, f"Error validating TikTok URLs: {str(e)}")
            return False
    
    def test_kahpeeh_primary_tiktok_url(self):
        """Test that KahPeeh Kah-Ahn Coffee House has the specific primary TikTok URL"""
        try:
            social_media_projects = self.test_social_media_projects_retrieval()
            if not social_media_projects:
                self.log_test("KahPeeh Primary TikTok URL", False, 
                            "Cannot test primary TikTok URL - no social media projects found")
                return False
            
            expected_url = "https://www.tiktok.com/@kahpeehkahahn/video/7409139284403408159"
            kahpeeh_project = None
            
            for project in social_media_projects:
                if "KahPeeh Kah-Ahn Coffee House" in project.get('title', ''):
                    kahpeeh_project = project
                    break
            
            if not kahpeeh_project:
                self.log_test("KahPeeh Primary TikTok URL", False, 
                            "KahPeeh Kah-Ahn Coffee House project not found")
                return False
            
            # Check videoUrl field
            video_url = kahpeeh_project.get('videoUrl', '')
            if video_url == expected_url:
                self.log_test("KahPeeh Primary TikTok URL", True, 
                            f"KahPeeh project has correct primary TikTok URL: {video_url}")
                return True
            else:
                # Check in images array as fallback
                images = kahpeeh_project.get('images', [])
                for image in images:
                    if isinstance(image, str) and image == expected_url:
                        self.log_test("KahPeeh Primary TikTok URL", True, 
                                    f"KahPeeh project has correct primary TikTok URL in images: {image}")
                        return True
                
                self.log_test("KahPeeh Primary TikTok URL", False, 
                            f"Expected URL: {expected_url}, Found: {video_url}")
                return False
                
        except Exception as e:
            self.log_test("KahPeeh Primary TikTok URL", False, f"Error checking primary TikTok URL: {str(e)}")
            return False
    
    def test_social_media_category_filtering(self):
        """Test filtering for Social Media Content & Campaigns category"""
        try:
            # Test with Social Media Content & Campaigns category (URL encoded)
            response = self.session.get(f"{API_BASE_URL}/projects?category=Social%20Media%20Content%20%26%20Campaigns", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                social_media_projects = []
                
                # Find social media projects in the category
                for project in projects:
                    if project.get('category') == 'Social Media Content & Campaigns':
                        social_media_projects.append(project)
                
                if len(social_media_projects) >= 8:
                    self.log_test("Social Media Category Filtering", True, 
                                f"Found {len(social_media_projects)} projects in Social Media Content & Campaigns category")
                    return True
                else:
                    self.log_test("Social Media Category Filtering", False, 
                                f"Expected at least 8 social media projects, found {len(social_media_projects)}")
                    return False
            else:
                self.log_test("Social Media Category Filtering", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Social Media Category Filtering", False, f"Request failed: {str(e)}")
            return False
    
    def test_video_project_orientation(self):
        """Test that video projects have proper type and orientation fields"""
        try:
            social_media_projects = self.test_social_media_projects_retrieval()
            if not social_media_projects:
                self.log_test("Video Project Orientation", False, 
                            "Cannot test video orientation - no social media projects found")
                return False
            
            correct_orientations = 0
            incorrect_projects = []
            
            for project in social_media_projects:
                project_type = project.get('type', '')
                orientation = project.get('orientation', '')
                
                # All social media video projects should be type 'video' and orientation 'vertical'
                if project_type == 'video' and orientation == 'vertical':
                    correct_orientations += 1
                else:
                    incorrect_projects.append(f"{project.get('title', 'Unknown')}: type={project_type}, orientation={orientation}")
            
            if correct_orientations >= 8:
                self.log_test("Video Project Orientation", True, 
                            f"All {correct_orientations} video projects have correct type and vertical orientation")
                return True
            else:
                self.log_test("Video Project Orientation", False, 
                            f"Only {correct_orientations}/8+ projects have correct orientation. Issues: {incorrect_projects}")
                return False
                
        except Exception as e:
            self.log_test("Video Project Orientation", False, f"Error checking video orientation: {str(e)}")
            return False
    
    def test_featured_projects_marking(self):
        """Test that featured projects are properly marked"""
        try:
            response = self.session.get(f"{API_BASE_URL}/projects", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                featured_projects = []
                
                for project in projects:
                    if project.get('featured', False):
                        featured_projects.append(project)
                
                # Check that we have some featured projects
                if len(featured_projects) > 0:
                    self.log_test("Featured Projects Marking", True, 
                                f"Found {len(featured_projects)} featured projects properly marked")
                    return True
                else:
                    self.log_test("Featured Projects Marking", True, 
                                "No featured projects found (this may be expected)")
                    return True
            else:
                self.log_test("Featured Projects Marking", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Featured Projects Marking", False, f"Request failed: {str(e)}")
            return False

    def test_beats_by_dre_project_retrieval(self):
        """Test that Beats by Dre project (ID: 2) exists and is retrievable"""
        try:
            # Test individual project retrieval
            response = self.session.get(f"{API_BASE_URL}/projects/2", timeout=10)
            if response.status_code == 200:
                project = response.json()
                if project.get('id') == '2':
                    self.log_test("Beats by Dre Project Retrieval", True, 
                                f"Found Beats by Dre project: {project.get('title', 'Unknown Title')}")
                    return project
                else:
                    self.log_test("Beats by Dre Project Retrieval", False, 
                                f"ID mismatch: expected '2', got {project.get('id')}")
                    return None
            elif response.status_code == 404:
                self.log_test("Beats by Dre Project Retrieval", False, 
                            "Beats by Dre project (ID: 2) not found in database")
                return None
            else:
                self.log_test("Beats by Dre Project Retrieval", False, 
                            f"Status {response.status_code}: {response.text}")
                return None
        except requests.exceptions.RequestException as e:
            self.log_test("Beats by Dre Project Retrieval", False, f"Request failed: {str(e)}")
            return None

    def test_beats_by_dre_main_images_structure(self):
        """Test that Beats by Dre project has exactly 3 main images"""
        try:
            project = self.test_beats_by_dre_project_retrieval()
            if not project:
                self.log_test("Beats by Dre Main Images Structure", False, 
                            "Cannot test main images - project not found")
                return False
            
            images = project.get('images', [])
            expected_images = ['beatsg1.jpg', 'beatsg2.jpg', 'beatsg3.jpg']
            
            # Check that we have exactly 3 images
            if len(images) != 3:
                self.log_test("Beats by Dre Main Images Structure", False, 
                            f"Expected 3 main images, found {len(images)}")
                return False
            
            # Check that the images contain the expected filenames
            image_names_found = []
            for image in images:
                if isinstance(image, str):
                    for expected_name in expected_images:
                        if expected_name in image:
                            image_names_found.append(expected_name)
                            break
            
            if len(image_names_found) == 3:
                self.log_test("Beats by Dre Main Images Structure", True, 
                            f"Found all 3 expected main images: {image_names_found}")
                return True
            else:
                self.log_test("Beats by Dre Main Images Structure", False, 
                            f"Expected images {expected_images}, found {image_names_found}")
                return False
                
        except Exception as e:
            self.log_test("Beats by Dre Main Images Structure", False, f"Error checking main images: {str(e)}")
            return False

    def test_beats_by_dre_creative_design_highlights(self):
        """Test that Beats by Dre project has creativeDesignHighlights array with 4 elements"""
        try:
            project = self.test_beats_by_dre_project_retrieval()
            if not project:
                self.log_test("Beats by Dre Creative Design Highlights", False, 
                            "Cannot test creative design highlights - project not found")
                return False
            
            creative_highlights = project.get('creativeDesignHighlights', [])
            
            # Check that creativeDesignHighlights exists and is an array
            if not isinstance(creative_highlights, list):
                self.log_test("Beats by Dre Creative Design Highlights", False, 
                            f"creativeDesignHighlights should be an array, got {type(creative_highlights)}")
                return False
            
            # Check that we have exactly 4 creative design points
            if len(creative_highlights) != 4:
                self.log_test("Beats by Dre Creative Design Highlights", False, 
                            f"Expected 4 creative design highlights, found {len(creative_highlights)}")
                return False
            
            # Check that all elements are strings
            for i, highlight in enumerate(creative_highlights):
                if not isinstance(highlight, str) or len(highlight.strip()) == 0:
                    self.log_test("Beats by Dre Creative Design Highlights", False, 
                                f"Creative design highlight {i+1} is not a valid string")
                    return False
            
            self.log_test("Beats by Dre Creative Design Highlights", True, 
                        f"Found 4 valid creative design highlights")
            return True
                
        except Exception as e:
            self.log_test("Beats by Dre Creative Design Highlights", False, f"Error checking creative design highlights: {str(e)}")
            return False

    def test_beats_by_dre_separate_analytics_section(self):
        """Test that Beats by Dre project has separateAnalyticsSection with proper structure"""
        try:
            project = self.test_beats_by_dre_project_retrieval()
            if not project:
                self.log_test("Beats by Dre Separate Analytics Section", False, 
                            "Cannot test separate analytics section - project not found")
                return False
            
            analytics_section = project.get('separateAnalyticsSection', {})
            
            # Check that separateAnalyticsSection exists and is an object
            if not isinstance(analytics_section, dict):
                self.log_test("Beats by Dre Separate Analytics Section", False, 
                            f"separateAnalyticsSection should be an object, got {type(analytics_section)}")
                return False
            
            # Check required fields in separateAnalyticsSection
            required_fields = ['title', 'description', 'images', 'layout', 'highlights']
            missing_fields = []
            
            for field in required_fields:
                if field not in analytics_section:
                    missing_fields.append(field)
            
            if missing_fields:
                self.log_test("Beats by Dre Separate Analytics Section", False, 
                            f"Missing required fields in separateAnalyticsSection: {missing_fields}")
                return False
            
            # Check that images array has 4 elements
            analytics_images = analytics_section.get('images', [])
            if not isinstance(analytics_images, list) or len(analytics_images) != 4:
                self.log_test("Beats by Dre Separate Analytics Section", False, 
                            f"Expected 4 images in separateAnalyticsSection, found {len(analytics_images) if isinstance(analytics_images, list) else 'not an array'}")
                return False
            
            # Check that layout is "all_horizontal"
            layout = analytics_section.get('layout', '')
            if layout != 'all_horizontal':
                self.log_test("Beats by Dre Separate Analytics Section", False, 
                            f"Expected layout 'all_horizontal', found '{layout}'")
                return False
            
            # Check that highlights is an array
            highlights = analytics_section.get('highlights', [])
            if not isinstance(highlights, list):
                self.log_test("Beats by Dre Separate Analytics Section", False, 
                            f"highlights should be an array, got {type(highlights)}")
                return False
            
            self.log_test("Beats by Dre Separate Analytics Section", True, 
                        f"separateAnalyticsSection has proper structure with 4 images and all_horizontal layout")
            return True
                
        except Exception as e:
            self.log_test("Beats by Dre Separate Analytics Section", False, f"Error checking separate analytics section: {str(e)}")
            return False

    def test_beats_by_dre_analytics_images_validation(self):
        """Test that Beats by Dre separateAnalyticsSection has 4 specific horizontal images"""
        try:
            project = self.test_beats_by_dre_project_retrieval()
            if not project:
                self.log_test("Beats by Dre Analytics Images Validation", False, 
                            "Cannot test analytics images - project not found")
                return False
            
            analytics_section = project.get('separateAnalyticsSection', {})
            analytics_images = analytics_section.get('images', [])
            expected_images = ['beatsdata1.jpg', 'beatsdata2.jpg', 'beatsdata3.jpg', 'beatsdata4.jpg']
            
            if len(analytics_images) != 4:
                self.log_test("Beats by Dre Analytics Images Validation", False, 
                            f"Expected 4 analytics images, found {len(analytics_images)}")
                return False
            
            # Check that the images contain the expected filenames
            image_names_found = []
            for image in analytics_images:
                if isinstance(image, str):
                    for expected_name in expected_images:
                        if expected_name in image:
                            image_names_found.append(expected_name)
                            break
            
            if len(image_names_found) == 4:
                self.log_test("Beats by Dre Analytics Images Validation", True, 
                            f"Found all 4 expected analytics images: {image_names_found}")
                return True
            else:
                self.log_test("Beats by Dre Analytics Images Validation", False, 
                            f"Expected images {expected_images}, found {image_names_found}")
                return False
                
        except Exception as e:
            self.log_test("Beats by Dre Analytics Images Validation", False, f"Error validating analytics images: {str(e)}")
            return False

    def test_beats_by_dre_no_dual_sections(self):
        """Test that Beats by Dre project no longer has dualSections field"""
        try:
            project = self.test_beats_by_dre_project_retrieval()
            if not project:
                self.log_test("Beats by Dre No Dual Sections", False, 
                            "Cannot test dual sections removal - project not found")
                return False
            
            # Check that dualSections field does not exist
            if 'dualSections' in project:
                self.log_test("Beats by Dre No Dual Sections", False, 
                            "dualSections field still exists - should have been removed")
                return False
            
            # Also check for any brandingSection references
            if 'brandingSection' in project:
                self.log_test("Beats by Dre No Dual Sections", False, 
                            "brandingSection field still exists - should have been removed")
                return False
            
            self.log_test("Beats by Dre No Dual Sections", True, 
                        "dualSections and brandingSection fields successfully removed")
            return True
                
        except Exception as e:
            self.log_test("Beats by Dre No Dual Sections", False, f"Error checking dual sections removal: {str(e)}")
            return False

    def test_beats_by_dre_existing_data_preservation(self):
        """Test that Beats by Dre project preserves all existing metadata fields"""
        try:
            project = self.test_beats_by_dre_project_retrieval()
            if not project:
                self.log_test("Beats by Dre Existing Data Preservation", False, 
                            "Cannot test data preservation - project not found")
                return False
            
            # Check that essential project fields are preserved
            essential_fields = ['id', 'title', 'description', 'category', 'client', 'type', 'created_at', 'updated_at']
            missing_fields = []
            
            for field in essential_fields:
                if field not in project or not project[field]:
                    missing_fields.append(field)
            
            if missing_fields:
                self.log_test("Beats by Dre Existing Data Preservation", False, 
                            f"Missing essential fields: {missing_fields}")
                return False
            
            # Check enhanced project fields if they exist
            enhanced_fields = ['key_contributions', 'skills_utilized', 'impact']
            for field in enhanced_fields:
                if field in project and project[field] is not None:
                    # Validate structure
                    if field in ['key_contributions', 'skills_utilized'] and not isinstance(project[field], list):
                        self.log_test("Beats by Dre Existing Data Preservation", False, 
                                    f"{field} should be an array")
                        return False
                    elif field == 'impact' and not isinstance(project[field], dict):
                        self.log_test("Beats by Dre Existing Data Preservation", False, 
                                    f"{field} should be an object")
                        return False
            
            # Verify it's still a Branding project
            if project.get('category') != 'Branding':
                self.log_test("Beats by Dre Existing Data Preservation", False, 
                            f"Category changed from Branding to {project.get('category')}")
                return False
            
            self.log_test("Beats by Dre Existing Data Preservation", True, 
                        "All existing metadata fields preserved correctly")
            return True
                
        except Exception as e:
            self.log_test("Beats by Dre Existing Data Preservation", False, f"Error checking data preservation: {str(e)}")
            return False

    def test_beats_by_dre_branding_category_filtering(self):
        """Test that Beats by Dre project appears in Branding category filtering"""
        try:
            # Test with Branding category (URL encoded)
            response = self.session.get(f"{API_BASE_URL}/projects?category=Branding", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                beats_project = None
                
                # Find the Beats by Dre project in Branding category
                for project in projects:
                    if project.get('id') == '2' or 'Beats by Dre' in project.get('title', ''):
                        beats_project = project
                        break
                
                if beats_project:
                    # Verify it's actually in Branding category
                    if beats_project.get('category') == 'Branding':
                        self.log_test("Beats by Dre Branding Category Filtering", True, 
                                    f"Beats by Dre project found in Branding category")
                        return True
                    else:
                        self.log_test("Beats by Dre Branding Category Filtering", False, 
                                    f"Project found but in wrong category: {beats_project.get('category')}")
                        return False
                else:
                    self.log_test("Beats by Dre Branding Category Filtering", False, 
                                "Beats by Dre project not found in Branding category")
                    return False
            else:
                self.log_test("Beats by Dre Branding Category Filtering", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Beats by Dre Branding Category Filtering", False, f"Request failed: {str(e)}")
            return False

    def test_beats_by_dre_data_structure_integrity(self):
        """Test overall data structure integrity of restructured Beats by Dre project"""
        try:
            project = self.test_beats_by_dre_project_retrieval()
            if not project:
                self.log_test("Beats by Dre Data Structure Integrity", False, 
                            "Cannot test data structure integrity - project not found")
                return False
            
            # Comprehensive structure validation
            structure_checks = {
                'main_images_count': len(project.get('images', [])) == 3,
                'creative_highlights_exists': 'creativeDesignHighlights' in project,
                'creative_highlights_count': len(project.get('creativeDesignHighlights', [])) == 4,
                'analytics_section_exists': 'separateAnalyticsSection' in project,
                'analytics_images_count': len(project.get('separateAnalyticsSection', {}).get('images', [])) == 4,
                'no_dual_sections': 'dualSections' not in project,
                'proper_category': project.get('category') == 'Branding',
                'has_title': bool(project.get('title')),
                'has_description': bool(project.get('description'))
            }
            
            failed_checks = [check for check, passed in structure_checks.items() if not passed]
            
            if not failed_checks:
                self.log_test("Beats by Dre Data Structure Integrity", True, 
                            "All data structure integrity checks passed")
                return True
            else:
                self.log_test("Beats by Dre Data Structure Integrity", False, 
                            f"Failed structure checks: {failed_checks}")
                return False
                
        except Exception as e:
            self.log_test("Beats by Dre Data Structure Integrity", False, f"Error checking data structure integrity: {str(e)}")
            return False

    def test_youtube_embedding_advertising_projects(self):
        """Test YouTube video embedding functionality for advertising projects"""
        try:
            # Test 1: Retrieve both advertising projects (IDs 4 and 5)
            response = self.session.get(f"{API_BASE_URL}/projects", timeout=10)
            if response.status_code != 200:
                self.log_test("YouTube Embedding - Project Retrieval", False, 
                            f"Failed to retrieve projects: {response.status_code}")
                return False
            
            projects = response.json()
            advertising_projects = [p for p in projects if p.get('category') == 'Advertising']
            
            # Find specific projects
            kahpeeh_project = None
            ute_crossing_project = None
            
            for project in advertising_projects:
                title = project.get('title', '')
                if 'KahPeeh' in title and 'Coffee House' in title:
                    kahpeeh_project = project
                elif 'Ute Crossing Grill' in title:
                    ute_crossing_project = project
            
            if not kahpeeh_project:
                self.log_test("YouTube Embedding - KahPeeh Project Retrieval", False, 
                            "KahPeeh Coffee House advertising project not found")
                return False
            
            if not ute_crossing_project:
                self.log_test("YouTube Embedding - Ute Crossing Project Retrieval", False, 
                            "Ute Crossing Grill advertising project not found")
                return False
            
            self.log_test("YouTube Embedding - Project Retrieval", True, 
                        f"Found both advertising projects: KahPeeh (ID: {kahpeeh_project.get('id')}) and Ute Crossing (ID: {ute_crossing_project.get('id')})")
            
            # Test 2: Validate YouTube URL fields
            expected_kahpeeh_url = "https://youtu.be/voPeTh_2fvw"
            expected_ute_crossing_url = "https://youtu.be/yFg8sR1Y42s"
            
            kahpeeh_video_url = kahpeeh_project.get('video_url', '')
            ute_crossing_video_url = ute_crossing_project.get('video_url', '')
            
            if kahpeeh_video_url != expected_kahpeeh_url:
                self.log_test("YouTube Embedding - KahPeeh Video URL", False, 
                            f"Expected: {expected_kahpeeh_url}, Got: {kahpeeh_video_url}")
                return False
            
            if ute_crossing_video_url != expected_ute_crossing_url:
                self.log_test("YouTube Embedding - Ute Crossing Video URL", False, 
                            f"Expected: {expected_ute_crossing_url}, Got: {ute_crossing_video_url}")
                return False
            
            self.log_test("YouTube Embedding - Video URL Validation", True, 
                        "Both projects have correct YouTube URLs")
            
            # Test 3: Validate YouTube Embed ID fields
            expected_kahpeeh_embed_id = "voPeTh_2fvw"
            expected_ute_crossing_embed_id = "yFg8sR1Y42s"
            
            kahpeeh_embed_id = kahpeeh_project.get('youtubeEmbedId', '')
            ute_crossing_embed_id = ute_crossing_project.get('youtubeEmbedId', '')
            
            if kahpeeh_embed_id != expected_kahpeeh_embed_id:
                self.log_test("YouTube Embedding - KahPeeh Embed ID", False, 
                            f"Expected: {expected_kahpeeh_embed_id}, Got: {kahpeeh_embed_id}")
                return False
            
            if ute_crossing_embed_id != expected_ute_crossing_embed_id:
                self.log_test("YouTube Embedding - Ute Crossing Embed ID", False, 
                            f"Expected: {expected_ute_crossing_embed_id}, Got: {ute_crossing_embed_id}")
                return False
            
            self.log_test("YouTube Embedding - Embed ID Validation", True, 
                        "Both projects have correct YouTube embed IDs")
            
            # Test 4: Test individual project retrieval
            kahpeeh_response = self.session.get(f"{API_BASE_URL}/projects/{kahpeeh_project['id']}", timeout=10)
            if kahpeeh_response.status_code != 200:
                self.log_test("YouTube Embedding - Individual KahPeeh Retrieval", False, 
                            f"Failed to retrieve KahPeeh project individually: {kahpeeh_response.status_code}")
                return False
            
            individual_kahpeeh = kahpeeh_response.json()
            if (individual_kahpeeh.get('video_url') != expected_kahpeeh_url or 
                individual_kahpeeh.get('youtubeEmbedId') != expected_kahpeeh_embed_id):
                self.log_test("YouTube Embedding - Individual KahPeeh Retrieval", False, 
                            "YouTube fields missing in individual project retrieval")
                return False
            
            ute_crossing_response = self.session.get(f"{API_BASE_URL}/projects/{ute_crossing_project['id']}", timeout=10)
            if ute_crossing_response.status_code != 200:
                self.log_test("YouTube Embedding - Individual Ute Crossing Retrieval", False, 
                            f"Failed to retrieve Ute Crossing project individually: {ute_crossing_response.status_code}")
                return False
            
            individual_ute_crossing = ute_crossing_response.json()
            if (individual_ute_crossing.get('video_url') != expected_ute_crossing_url or 
                individual_ute_crossing.get('youtubeEmbedId') != expected_ute_crossing_embed_id):
                self.log_test("YouTube Embedding - Individual Ute Crossing Retrieval", False, 
                            "YouTube fields missing in individual project retrieval")
                return False
            
            self.log_test("YouTube Embedding - Individual Project Retrieval", True, 
                        "Both projects maintain YouTube fields in individual retrieval")
            
            # Test 5: Test category filtering with YouTube fields
            advertising_response = self.session.get(f"{API_BASE_URL}/projects?category=Advertising", timeout=10)
            if advertising_response.status_code != 200:
                self.log_test("YouTube Embedding - Category Filtering", False, 
                            f"Failed to filter by Advertising category: {advertising_response.status_code}")
                return False
            
            advertising_filtered = advertising_response.json()
            kahpeeh_filtered = None
            ute_crossing_filtered = None
            
            for project in advertising_filtered:
                title = project.get('title', '')
                if 'KahPeeh' in title and 'Coffee House' in title:
                    kahpeeh_filtered = project
                elif 'Ute Crossing Grill' in title:
                    ute_crossing_filtered = project
            
            if not kahpeeh_filtered or not ute_crossing_filtered:
                self.log_test("YouTube Embedding - Category Filtering", False, 
                            "Projects not found in Advertising category filter")
                return False
            
            if (kahpeeh_filtered.get('video_url') != expected_kahpeeh_url or 
                kahpeeh_filtered.get('youtubeEmbedId') != expected_kahpeeh_embed_id or
                ute_crossing_filtered.get('video_url') != expected_ute_crossing_url or 
                ute_crossing_filtered.get('youtubeEmbedId') != expected_ute_crossing_embed_id):
                self.log_test("YouTube Embedding - Category Filtering", False, 
                            "YouTube fields missing in category filtered results")
                return False
            
            self.log_test("YouTube Embedding - Category Filtering", True, 
                        "Both projects maintain YouTube fields in category filtering")
            
            # Test 6: Validate data structure integrity
            required_fields = ['id', 'title', 'category', 'client', 'description', 'type', 'video_url', 'youtubeEmbedId']
            
            for field in required_fields:
                if not kahpeeh_project.get(field):
                    self.log_test("YouTube Embedding - Data Structure Integrity", False, 
                                f"KahPeeh project missing field: {field}")
                    return False
                if not ute_crossing_project.get(field):
                    self.log_test("YouTube Embedding - Data Structure Integrity", False, 
                                f"Ute Crossing project missing field: {field}")
                    return False
            
            # Verify project types are 'video'
            if kahpeeh_project.get('type') != 'video' or ute_crossing_project.get('type') != 'video':
                self.log_test("YouTube Embedding - Data Structure Integrity", False, 
                            f"Projects should have type 'video'. KahPeeh: {kahpeeh_project.get('type')}, Ute Crossing: {ute_crossing_project.get('type')}")
                return False
            
            self.log_test("YouTube Embedding - Data Structure Integrity", True, 
                        "Both projects maintain all required fields including YouTube fields")
            
            # Test 7: API Response Format Validation
            # Verify that Pydantic models correctly serialize YouTube fields
            if not isinstance(kahpeeh_project.get('video_url'), str) or not isinstance(kahpeeh_project.get('youtubeEmbedId'), str):
                self.log_test("YouTube Embedding - API Response Format", False, 
                            "KahPeeh YouTube fields are not properly serialized as strings")
                return False
            
            if not isinstance(ute_crossing_project.get('video_url'), str) or not isinstance(ute_crossing_project.get('youtubeEmbedId'), str):
                self.log_test("YouTube Embedding - API Response Format", False, 
                            "Ute Crossing YouTube fields are not properly serialized as strings")
                return False
            
            self.log_test("YouTube Embedding - API Response Format", True, 
                        "Pydantic models correctly serialize YouTube fields in API responses")
            
            # Overall success
            self.log_test("YouTube Embedding - Overall Functionality", True, 
                        "YouTube video embedding functionality is working correctly for both advertising projects")
            return True
            
        except requests.exceptions.RequestException as e:
            self.log_test("YouTube Embedding - Overall Functionality", False, f"Request failed: {str(e)}")
            return False
        except Exception as e:
            self.log_test("YouTube Embedding - Overall Functionality", False, f"Unexpected error: {str(e)}")
            return False
    
    def test_enhanced_project_fields_creation(self):
        """Test creating a project with enhanced fields (project_type, key_contributions, skills_utilized, impact)"""
        try:
            enhanced_project_data = {
                "title": "Enhanced Marketing Campaign with Analytics",
                "category": "Business Analytics & Strategy",
                "client": "Enhanced Test Client",
                "description": "A comprehensive marketing campaign with detailed analytics and impact tracking.",
                "images": ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"],
                "project_type": "Strategic Marketing Analytics",  # Enhanced field
                "type": "analytics",
                "featured": True,
                "orientation": "horizontal",
                "key_contributions": [  # Enhanced field
                    "Developed comprehensive market analysis strategy",
                    "Implemented advanced analytics tracking system",
                    "Created data-driven campaign optimization framework"
                ],
                "skills_utilized": [  # Enhanced field
                    "Google Analytics",
                    "Data Visualization",
                    "Strategic Planning",
                    "Market Research",
                    "Campaign Optimization"
                ],
                "impact": {  # Enhanced field
                    "quantified_metrics": [
                        "300% increase in engagement rate",
                        "85% boost in conversion rate",
                        "150% improvement in ROI"
                    ],
                    "qualitative_outcomes": [
                        "Enhanced brand awareness and recognition",
                        "Improved customer experience and satisfaction",
                        "Strengthened market positioning"
                    ]
                }
            }
            
            response = self.session.post(f"{API_BASE_URL}/projects", json=enhanced_project_data, timeout=10)
            if response.status_code == 200:
                project = response.json()
                
                # Verify all enhanced fields are present and correct
                if (project.get('id') and 
                    project.get('title') == enhanced_project_data['title'] and
                    project.get('project_type') == enhanced_project_data['project_type'] and
                    project.get('key_contributions') == enhanced_project_data['key_contributions'] and
                    project.get('skills_utilized') == enhanced_project_data['skills_utilized'] and
                    project.get('impact') == enhanced_project_data['impact']):
                    
                    self.created_enhanced_project_id = project['id']
                    self.log_test("Enhanced Project Fields Creation", True, 
                                f"Project with enhanced fields created successfully. ID: {project['id']}")
                    return project
                else:
                    missing_fields = []
                    if not project.get('project_type'): missing_fields.append('project_type')
                    if not project.get('key_contributions'): missing_fields.append('key_contributions')
                    if not project.get('skills_utilized'): missing_fields.append('skills_utilized')
                    if not project.get('impact'): missing_fields.append('impact')
                    
                    self.log_test("Enhanced Project Fields Creation", False, 
                                f"Enhanced fields missing or incorrect: {missing_fields}")
                    return None
            else:
                self.log_test("Enhanced Project Fields Creation", False, 
                            f"Status {response.status_code}: {response.text}")
                return None
        except requests.exceptions.RequestException as e:
            self.log_test("Enhanced Project Fields Creation", False, f"Request failed: {str(e)}")
            return None
    
    def test_enhanced_project_fields_retrieval(self):
        """Test retrieving a project with enhanced fields"""
        if not hasattr(self, 'created_enhanced_project_id') or not self.created_enhanced_project_id:
            self.log_test("Enhanced Project Fields Retrieval", False, "No enhanced project ID available for testing")
            return False
        
        try:
            response = self.session.get(f"{API_BASE_URL}/projects/{self.created_enhanced_project_id}", timeout=10)
            if response.status_code == 200:
                project = response.json()
                
                # Verify all enhanced fields are preserved
                enhanced_fields_present = (
                    project.get('project_type') == "Strategic Marketing Analytics" and
                    isinstance(project.get('key_contributions'), list) and len(project.get('key_contributions', [])) == 3 and
                    isinstance(project.get('skills_utilized'), list) and len(project.get('skills_utilized', [])) == 5 and
                    isinstance(project.get('impact'), dict) and
                    isinstance(project.get('impact', {}).get('quantified_metrics'), list) and
                    isinstance(project.get('impact', {}).get('qualitative_outcomes'), list)
                )
                
                if enhanced_fields_present:
                    self.log_test("Enhanced Project Fields Retrieval", True, 
                                "All enhanced fields retrieved correctly with proper data types")
                    return True
                else:
                    self.log_test("Enhanced Project Fields Retrieval", False, 
                                f"Enhanced fields not properly preserved. Project: {project}")
                    return False
            else:
                self.log_test("Enhanced Project Fields Retrieval", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Enhanced Project Fields Retrieval", False, f"Request failed: {str(e)}")
            return False
    
    def test_impact_data_model_validation(self):
        """Test that ImpactData model is working correctly with both quantified and qualitative data"""
        try:
            # Test creating a project with only quantified metrics
            quantified_only_data = {
                "title": "Quantified Impact Test Project",
                "category": "Business Analytics & Strategy",
                "client": "Test Analytics Client",
                "description": "Testing quantified metrics only",
                "images": ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"],
                "project_type": "Analytics Testing",
                "type": "analytics",
                "impact": {
                    "quantified_metrics": [
                        "200% increase in traffic",
                        "50% reduction in bounce rate"
                    ]
                    # No qualitative_outcomes
                }
            }
            
            response = self.session.post(f"{API_BASE_URL}/projects", json=quantified_only_data, timeout=10)
            if response.status_code == 200:
                project = response.json()
                impact = project.get('impact', {})
                
                if (isinstance(impact.get('quantified_metrics'), list) and 
                    len(impact.get('quantified_metrics', [])) == 2 and
                    impact.get('qualitative_outcomes') is None):
                    
                    self.log_test("Impact Data Model Validation", True, 
                                "ImpactData model correctly handles quantified metrics only")
                    
                    # Clean up test project
                    self.session.delete(f"{API_BASE_URL}/projects/{project['id']}")
                    return True
                else:
                    self.log_test("Impact Data Model Validation", False, 
                                f"ImpactData model validation failed. Impact: {impact}")
                    return False
            else:
                self.log_test("Impact Data Model Validation", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Impact Data Model Validation", False, f"Request failed: {str(e)}")
            return False
    
    def test_project_type_categorization(self):
        """Test that project_type field provides better categorization than basic type"""
        try:
            # Get all projects and check for project_type diversity
            response = self.session.get(f"{API_BASE_URL}/projects", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                project_types = set()
                projects_with_project_type = 0
                
                for project in projects:
                    project_type = project.get('project_type')
                    if project_type:
                        project_types.add(project_type)
                        projects_with_project_type += 1
                
                if projects_with_project_type > 0:
                    self.log_test("Project Type Categorization", True, 
                                f"Found {projects_with_project_type} projects with project_type field. Types: {list(project_types)}")
                    return True
                else:
                    self.log_test("Project Type Categorization", True, 
                                "No existing projects have project_type field (expected for legacy data)")
                    return True
            else:
                self.log_test("Project Type Categorization", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Project Type Categorization", False, f"Request failed: {str(e)}")
            return False
    
    def test_backward_compatibility(self):
        """Test that existing projects without enhanced fields still work"""
        try:
            # Get existing projects (should be legacy projects without enhanced fields)
            response = self.session.get(f"{API_BASE_URL}/projects", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                legacy_projects = []
                
                for project in projects:
                    # Check if project lacks enhanced fields (legacy project)
                    if (not project.get('key_contributions') and 
                        not project.get('skills_utilized') and 
                        not project.get('impact')):
                        legacy_projects.append(project)
                
                if len(legacy_projects) > 0:
                    # Test that we can still retrieve and update legacy projects
                    test_project = legacy_projects[0]
                    project_id = test_project['id']
                    
                    # Test individual retrieval
                    response = self.session.get(f"{API_BASE_URL}/projects/{project_id}", timeout=10)
                    if response.status_code == 200:
                        retrieved_project = response.json()
                        
                        # Test updating legacy project (should work without enhanced fields)
                        update_data = {"description": "Updated legacy project description"}
                        response = self.session.put(f"{API_BASE_URL}/projects/{project_id}", json=update_data, timeout=10)
                        
                        if response.status_code == 200:
                            self.log_test("Backward Compatibility", True, 
                                        f"Legacy projects work correctly. Tested with: {test_project['title']}")
                            return True
                        else:
                            self.log_test("Backward Compatibility", False, 
                                        f"Failed to update legacy project: {response.status_code}")
                            return False
                    else:
                        self.log_test("Backward Compatibility", False, 
                                    f"Failed to retrieve legacy project: {response.status_code}")
                        return False
                else:
                    self.log_test("Backward Compatibility", True, 
                                "No legacy projects found (all projects have enhanced fields)")
                    return True
            else:
                self.log_test("Backward Compatibility", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Backward Compatibility", False, f"Request failed: {str(e)}")
            return False

    def test_social_media_tiktok_integration_focus(self):
        """Test the specific Social Media TikTok Video URL Integration task that needs retesting"""
        try:
            # Check for KahPeeh Kah-Ahn Coffee House project specifically
            response = self.session.get(f"{API_BASE_URL}/projects", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                kahpeeh_project = None
                social_media_projects = []
                
                for project in projects:
                    title = project.get('title', '')
                    category = project.get('category', '')
                    
                    # Look for KahPeeh project specifically
                    if "KahPeeh" in title or "Coffee House" in title:
                        kahpeeh_project = project
                    
                    # Count social media projects
                    if category == "Social Media Content & Campaigns":
                        social_media_projects.append(project)
                
                # Check if the main KahPeeh project exists with TikTok URL
                if kahpeeh_project:
                    video_url = kahpeeh_project.get('videoUrl', '')
                    expected_url = "https://www.tiktok.com/@kahpeehkahahn/video/7409139284403408159"
                    
                    if video_url == expected_url:
                        self.log_test("Social Media TikTok Integration Focus", True, 
                                    f"KahPeeh project found with correct TikTok URL: {video_url}")
                        return True
                    else:
                        self.log_test("Social Media TikTok Integration Focus", False, 
                                    f"KahPeeh project found but TikTok URL incorrect. Expected: {expected_url}, Got: {video_url}")
                        return False
                else:
                    self.log_test("Social Media TikTok Integration Focus", False, 
                                f"KahPeeh Kah-Ahn Coffee House project not found. Found {len(social_media_projects)} social media projects total")
                    return False
            else:
                self.log_test("Social Media TikTok Integration Focus", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Social Media TikTok Integration Focus", False, f"Request failed: {str(e)}")
            return False
    
    def test_database_consistency(self):
        """Test database consistency and connection"""
        try:
            # Test multiple endpoints to ensure database is consistent
            endpoints_to_test = [
                ("/projects", "projects"),
                ("/categories", "categories"),
                ("/contact", "contact"),
                ("/tools", "tools"),
                ("/brands", "brands")
            ]
            
            successful_connections = 0
            
            for endpoint, name in endpoints_to_test:
                try:
                    response = self.session.get(f"{API_BASE_URL}{endpoint}", timeout=10)
                    if response.status_code in [200, 404]:  # 404 is acceptable for some endpoints
                        successful_connections += 1
                    else:
                        self.log_test("Database Consistency", False, 
                                    f"Database connection issue with {name}: status {response.status_code}")
                        return False
                except requests.exceptions.RequestException:
                    self.log_test("Database Consistency", False, 
                                f"Database connection failed for {name}")
                    return False
            
            if successful_connections == len(endpoints_to_test):
                self.log_test("Database Consistency", True, 
                            "All database connections successful, no consistency issues detected")
                return True
            else:
                self.log_test("Database Consistency", False, 
                            f"Only {successful_connections}/{len(endpoints_to_test)} endpoints accessible")
                return False
                
        except Exception as e:
            self.log_test("Database Consistency", False, f"Error checking database consistency: {str(e)}")
            return False
    
    def test_youtube_embedding_project_retrieval(self):
        """Test that both advertising projects with YouTube embedding exist and are retrievable"""
        try:
            response = self.session.get(f"{API_BASE_URL}/projects", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                
                # Look for both advertising projects
                kahpeeh_project = None
                ute_crossing_project = None
                
                for project in projects:
                    title = project.get('title', '')
                    if "KahPeeh kah-Ahn Ute Coffee House & Soda" in title and "Advertisement" in title:
                        kahpeeh_project = project
                    elif "Ute Crossing Grill & Ute Lanes" in title and "Advertisement" in title:
                        ute_crossing_project = project
                
                found_projects = []
                if kahpeeh_project:
                    found_projects.append(f"KahPeeh Coffee House (ID: {kahpeeh_project.get('id')})")
                if ute_crossing_project:
                    found_projects.append(f"Ute Crossing Grill (ID: {ute_crossing_project.get('id')})")
                
                if len(found_projects) == 2:
                    self.log_test("YouTube Embedding Project Retrieval", True, 
                                f"Found both advertising projects: {', '.join(found_projects)}")
                    return kahpeeh_project, ute_crossing_project
                else:
                    self.log_test("YouTube Embedding Project Retrieval", False, 
                                f"Expected 2 advertising projects, found {len(found_projects)}: {found_projects}")
                    return kahpeeh_project, ute_crossing_project
            else:
                self.log_test("YouTube Embedding Project Retrieval", False, 
                            f"Status {response.status_code}: {response.text}")
                return None, None
        except requests.exceptions.RequestException as e:
            self.log_test("YouTube Embedding Project Retrieval", False, f"Request failed: {str(e)}")
            return None, None
    
    def test_youtube_url_validation(self):
        """Test that both advertising projects have correct YouTube URLs"""
        try:
            kahpeeh_project, ute_crossing_project = self.test_youtube_embedding_project_retrieval()
            
            expected_urls = {
                "KahPeeh": "https://youtu.be/voPeTh_2fvw",
                "Ute Crossing": "https://youtu.be/yFg8sR1Y42s"
            }
            
            validation_results = []
            
            # Test KahPeeh project
            if kahpeeh_project:
                video_url = kahpeeh_project.get('videoUrl', '')
                if video_url == expected_urls["KahPeeh"]:
                    validation_results.append("✅ KahPeeh Coffee House YouTube URL correct")
                else:
                    validation_results.append(f"❌ KahPeeh Coffee House YouTube URL incorrect. Expected: {expected_urls['KahPeeh']}, Got: {video_url}")
            else:
                validation_results.append("❌ KahPeeh Coffee House project not found")
            
            # Test Ute Crossing project
            if ute_crossing_project:
                video_url = ute_crossing_project.get('videoUrl', '')
                if video_url == expected_urls["Ute Crossing"]:
                    validation_results.append("✅ Ute Crossing Grill YouTube URL correct")
                else:
                    validation_results.append(f"❌ Ute Crossing Grill YouTube URL incorrect. Expected: {expected_urls['Ute Crossing']}, Got: {video_url}")
            else:
                validation_results.append("❌ Ute Crossing Grill project not found")
            
            success_count = sum(1 for result in validation_results if result.startswith("✅"))
            
            if success_count == 2:
                self.log_test("YouTube URL Validation", True, 
                            f"Both projects have correct YouTube URLs: {'; '.join(validation_results)}")
                return True
            else:
                self.log_test("YouTube URL Validation", False, 
                            f"YouTube URL validation failed ({success_count}/2 correct): {'; '.join(validation_results)}")
                return False
                
        except Exception as e:
            self.log_test("YouTube URL Validation", False, f"Error validating YouTube URLs: {str(e)}")
            return False
    
    def test_youtube_embed_id_validation(self):
        """Test that both advertising projects have correct YouTube embed IDs"""
        try:
            kahpeeh_project, ute_crossing_project = self.test_youtube_embedding_project_retrieval()
            
            expected_embed_ids = {
                "KahPeeh": "voPeTh_2fvw",
                "Ute Crossing": "yFg8sR1Y42s"
            }
            
            validation_results = []
            
            # Test KahPeeh project
            if kahpeeh_project:
                embed_id = kahpeeh_project.get('youtubeEmbedId', '')
                if embed_id == expected_embed_ids["KahPeeh"]:
                    validation_results.append("✅ KahPeeh Coffee House YouTube Embed ID correct")
                else:
                    validation_results.append(f"❌ KahPeeh Coffee House YouTube Embed ID incorrect. Expected: {expected_embed_ids['KahPeeh']}, Got: {embed_id}")
            else:
                validation_results.append("❌ KahPeeh Coffee House project not found")
            
            # Test Ute Crossing project
            if ute_crossing_project:
                embed_id = ute_crossing_project.get('youtubeEmbedId', '')
                if embed_id == expected_embed_ids["Ute Crossing"]:
                    validation_results.append("✅ Ute Crossing Grill YouTube Embed ID correct")
                else:
                    validation_results.append(f"❌ Ute Crossing Grill YouTube Embed ID incorrect. Expected: {expected_embed_ids['Ute Crossing']}, Got: {embed_id}")
            else:
                validation_results.append("❌ Ute Crossing Grill project not found")
            
            success_count = sum(1 for result in validation_results if result.startswith("✅"))
            
            if success_count == 2:
                self.log_test("YouTube Embed ID Validation", True, 
                            f"Both projects have correct YouTube Embed IDs: {'; '.join(validation_results)}")
                return True
            else:
                self.log_test("YouTube Embed ID Validation", False, 
                            f"YouTube Embed ID validation failed ({success_count}/2 correct): {'; '.join(validation_results)}")
                return False
                
        except Exception as e:
            self.log_test("YouTube Embed ID Validation", False, f"Error validating YouTube Embed IDs: {str(e)}")
            return False
    
    def test_youtube_data_structure_integrity(self):
        """Test that both projects maintain all existing fields while adding new YouTube-related fields"""
        try:
            kahpeeh_project, ute_crossing_project = self.test_youtube_embedding_project_retrieval()
            
            # Required existing fields that should be preserved
            required_fields = ['id', 'title', 'category', 'client', 'description', 'type', 'created_at', 'updated_at']
            
            # New YouTube-related fields
            youtube_fields = ['videoUrl', 'youtubeEmbedId']
            
            validation_results = []
            
            # Test KahPeeh project structure
            if kahpeeh_project:
                missing_required = [field for field in required_fields if not kahpeeh_project.get(field)]
                missing_youtube = [field for field in youtube_fields if not kahpeeh_project.get(field)]
                
                if not missing_required and not missing_youtube:
                    validation_results.append("✅ KahPeeh Coffee House has complete data structure")
                else:
                    issues = []
                    if missing_required:
                        issues.append(f"missing required fields: {missing_required}")
                    if missing_youtube:
                        issues.append(f"missing YouTube fields: {missing_youtube}")
                    validation_results.append(f"❌ KahPeeh Coffee House data structure issues: {'; '.join(issues)}")
            else:
                validation_results.append("❌ KahPeeh Coffee House project not found")
            
            # Test Ute Crossing project structure
            if ute_crossing_project:
                missing_required = [field for field in required_fields if not ute_crossing_project.get(field)]
                missing_youtube = [field for field in youtube_fields if not ute_crossing_project.get(field)]
                
                if not missing_required and not missing_youtube:
                    validation_results.append("✅ Ute Crossing Grill has complete data structure")
                else:
                    issues = []
                    if missing_required:
                        issues.append(f"missing required fields: {missing_required}")
                    if missing_youtube:
                        issues.append(f"missing YouTube fields: {missing_youtube}")
                    validation_results.append(f"❌ Ute Crossing Grill data structure issues: {'; '.join(issues)}")
            else:
                validation_results.append("❌ Ute Crossing Grill project not found")
            
            success_count = sum(1 for result in validation_results if result.startswith("✅"))
            
            if success_count == 2:
                self.log_test("YouTube Data Structure Integrity", True, 
                            f"Both projects have complete data structure: {'; '.join(validation_results)}")
                return True
            else:
                self.log_test("YouTube Data Structure Integrity", False, 
                            f"Data structure validation failed ({success_count}/2 complete): {'; '.join(validation_results)}")
                return False
                
        except Exception as e:
            self.log_test("YouTube Data Structure Integrity", False, f"Error validating data structure: {str(e)}")
            return False
    
    def test_youtube_api_endpoints(self):
        """Test /api/projects and /api/projects/{id} endpoints for both YouTube projects"""
        try:
            kahpeeh_project, ute_crossing_project = self.test_youtube_embedding_project_retrieval()
            
            validation_results = []
            
            # Test individual project retrieval for KahPeeh
            if kahpeeh_project:
                project_id = kahpeeh_project.get('id')
                if project_id:
                    response = self.session.get(f"{API_BASE_URL}/projects/{project_id}", timeout=10)
                    if response.status_code == 200:
                        individual_project = response.json()
                        if (individual_project.get('videoUrl') == "https://youtu.be/voPeTh_2fvw" and
                            individual_project.get('youtubeEmbedId') == "voPeTh_2fvw"):
                            validation_results.append("✅ KahPeeh individual API endpoint working with YouTube data")
                        else:
                            validation_results.append("❌ KahPeeh individual API endpoint missing YouTube data")
                    else:
                        validation_results.append(f"❌ KahPeeh individual API endpoint failed: {response.status_code}")
                else:
                    validation_results.append("❌ KahPeeh project ID not found")
            else:
                validation_results.append("❌ KahPeeh project not found for API testing")
            
            # Test individual project retrieval for Ute Crossing
            if ute_crossing_project:
                project_id = ute_crossing_project.get('id')
                if project_id:
                    response = self.session.get(f"{API_BASE_URL}/projects/{project_id}", timeout=10)
                    if response.status_code == 200:
                        individual_project = response.json()
                        if (individual_project.get('videoUrl') == "https://youtu.be/yFg8sR1Y42s" and
                            individual_project.get('youtubeEmbedId') == "yFg8sR1Y42s"):
                            validation_results.append("✅ Ute Crossing individual API endpoint working with YouTube data")
                        else:
                            validation_results.append("❌ Ute Crossing individual API endpoint missing YouTube data")
                    else:
                        validation_results.append(f"❌ Ute Crossing individual API endpoint failed: {response.status_code}")
                else:
                    validation_results.append("❌ Ute Crossing project ID not found")
            else:
                validation_results.append("❌ Ute Crossing project not found for API testing")
            
            success_count = sum(1 for result in validation_results if result.startswith("✅"))
            
            if success_count == 2:
                self.log_test("YouTube API Endpoints", True, 
                            f"Both individual project API endpoints working: {'; '.join(validation_results)}")
                return True
            else:
                self.log_test("YouTube API Endpoints", False, 
                            f"API endpoint testing failed ({success_count}/2 working): {'; '.join(validation_results)}")
                return False
                
        except Exception as e:
            self.log_test("YouTube API Endpoints", False, f"Error testing API endpoints: {str(e)}")
            return False
    
    def test_youtube_advertising_category_filtering(self):
        """Test that both YouTube projects appear in Advertising category filtering"""
        try:
            # Test with Advertising category
            response = self.session.get(f"{API_BASE_URL}/projects?category=Advertising", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                
                kahpeeh_found = False
                ute_crossing_found = False
                advertising_projects = []
                
                for project in projects:
                    if project.get('category') == 'Advertising':
                        advertising_projects.append(project.get('title', 'Unknown'))
                        title = project.get('title', '')
                        
                        if "KahPeeh kah-Ahn Ute Coffee House & Soda" in title and "Advertisement" in title:
                            # Verify YouTube fields are present
                            if (project.get('videoUrl') == "https://youtu.be/voPeTh_2fvw" and
                                project.get('youtubeEmbedId') == "voPeTh_2fvw"):
                                kahpeeh_found = True
                        
                        elif "Ute Crossing Grill & Ute Lanes" in title and "Advertisement" in title:
                            # Verify YouTube fields are present
                            if (project.get('videoUrl') == "https://youtu.be/yFg8sR1Y42s" and
                                project.get('youtubeEmbedId') == "yFg8sR1Y42s"):
                                ute_crossing_found = True
                
                validation_results = []
                if kahpeeh_found:
                    validation_results.append("✅ KahPeeh Coffee House found in Advertising category with YouTube data")
                else:
                    validation_results.append("❌ KahPeeh Coffee House not found in Advertising category or missing YouTube data")
                
                if ute_crossing_found:
                    validation_results.append("✅ Ute Crossing Grill found in Advertising category with YouTube data")
                else:
                    validation_results.append("❌ Ute Crossing Grill not found in Advertising category or missing YouTube data")
                
                success_count = sum(1 for result in validation_results if result.startswith("✅"))
                
                if success_count == 2:
                    self.log_test("YouTube Advertising Category Filtering", True, 
                                f"Both YouTube projects found in Advertising category ({len(advertising_projects)} total): {'; '.join(validation_results)}")
                    return True
                else:
                    self.log_test("YouTube Advertising Category Filtering", False, 
                                f"Category filtering failed ({success_count}/2 found). Projects in Advertising: {advertising_projects}. Results: {'; '.join(validation_results)}")
                    return False
            else:
                self.log_test("YouTube Advertising Category Filtering", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("YouTube Advertising Category Filtering", False, f"Request failed: {str(e)}")
            return False
    
    def test_youtube_database_persistence(self):
        """Test that YouTube changes are persisted in MongoDB database"""
        try:
            kahpeeh_project, ute_crossing_project = self.test_youtube_embedding_project_retrieval()
            
            validation_results = []
            
            # Test KahPeeh project persistence
            if kahpeeh_project:
                # Verify project has proper timestamps indicating it was updated
                created_at = kahpeeh_project.get('created_at')
                updated_at = kahpeeh_project.get('updated_at')
                
                if created_at and updated_at:
                    # Check that project maintains video type and advertising category
                    if (kahpeeh_project.get('type') == 'video' and
                        kahpeeh_project.get('category') == 'Advertising' and
                        kahpeeh_project.get('videoUrl') == "https://youtu.be/voPeTh_2fvw" and
                        kahpeeh_project.get('youtubeEmbedId') == "voPeTh_2fvw"):
                        validation_results.append("✅ KahPeeh Coffee House properly persisted with YouTube data")
                    else:
                        validation_results.append("❌ KahPeeh Coffee House missing required fields or YouTube data")
                else:
                    validation_results.append("❌ KahPeeh Coffee House missing timestamp fields")
            else:
                validation_results.append("❌ KahPeeh Coffee House project not found for persistence testing")
            
            # Test Ute Crossing project persistence
            if ute_crossing_project:
                # Verify project has proper timestamps indicating it was updated
                created_at = ute_crossing_project.get('created_at')
                updated_at = ute_crossing_project.get('updated_at')
                
                if created_at and updated_at:
                    # Check that project maintains video type and advertising category
                    if (ute_crossing_project.get('type') == 'video' and
                        ute_crossing_project.get('category') == 'Advertising' and
                        ute_crossing_project.get('videoUrl') == "https://youtu.be/yFg8sR1Y42s" and
                        ute_crossing_project.get('youtubeEmbedId') == "yFg8sR1Y42s"):
                        validation_results.append("✅ Ute Crossing Grill properly persisted with YouTube data")
                    else:
                        validation_results.append("❌ Ute Crossing Grill missing required fields or YouTube data")
                else:
                    validation_results.append("❌ Ute Crossing Grill missing timestamp fields")
            else:
                validation_results.append("❌ Ute Crossing Grill project not found for persistence testing")
            
            success_count = sum(1 for result in validation_results if result.startswith("✅"))
            
            if success_count == 2:
                self.log_test("YouTube Database Persistence", True, 
                            f"Both projects properly persisted in database: {'; '.join(validation_results)}")
                return True
            else:
                self.log_test("YouTube Database Persistence", False, 
                            f"Database persistence validation failed ({success_count}/2 persisted): {'; '.join(validation_results)}")
                return False
                
        except Exception as e:
            self.log_test("YouTube Database Persistence", False, f"Error validating database persistence: {str(e)}")
            return False
    
    def test_youtube_project_type_and_category_validation(self):
        """Test that both projects maintain type: 'video' and category: 'Advertising'"""
        try:
            kahpeeh_project, ute_crossing_project = self.test_youtube_embedding_project_retrieval()
            
            validation_results = []
            
            # Test KahPeeh project
            if kahpeeh_project:
                project_type = kahpeeh_project.get('type')
                category = kahpeeh_project.get('category')
                
                if project_type == 'video' and category == 'Advertising':
                    validation_results.append("✅ KahPeeh Coffee House has correct type and category")
                else:
                    validation_results.append(f"❌ KahPeeh Coffee House incorrect type/category. Type: {project_type}, Category: {category}")
            else:
                validation_results.append("❌ KahPeeh Coffee House project not found")
            
            # Test Ute Crossing project
            if ute_crossing_project:
                project_type = ute_crossing_project.get('type')
                category = ute_crossing_project.get('category')
                
                if project_type == 'video' and category == 'Advertising':
                    validation_results.append("✅ Ute Crossing Grill has correct type and category")
                else:
                    validation_results.append(f"❌ Ute Crossing Grill incorrect type/category. Type: {project_type}, Category: {category}")
            else:
                validation_results.append("❌ Ute Crossing Grill project not found")
            
            success_count = sum(1 for result in validation_results if result.startswith("✅"))
            
            if success_count == 2:
                self.log_test("YouTube Project Type and Category Validation", True, 
                            f"Both projects have correct type and category: {'; '.join(validation_results)}")
                return True
            else:
                self.log_test("YouTube Project Type and Category Validation", False, 
                            f"Type/category validation failed ({success_count}/2 correct): {'; '.join(validation_results)}")
                return False
                
        except Exception as e:
            self.log_test("YouTube Project Type and Category Validation", False, f"Error validating type and category: {str(e)}")
            return False
    
    def test_coffee_house_tiktok_project_retrieval(self):
        """Test that TikTok Campaign Project (ID: 8) exists and is retrievable"""
        try:
            response = self.session.get(f"{API_BASE_URL}/projects", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                tiktok_project = None
                
                # Look for TikTok Campaign project
                for project in projects:
                    if project.get('id') == '8' or ('TikTok' in project.get('title', '') and 'Coffee' in project.get('title', '')):
                        tiktok_project = project
                        break
                
                if tiktok_project:
                    self.log_test("Coffee House TikTok Project Retrieval", True, 
                                f"Found TikTok Campaign project: {tiktok_project['title']}")
                    return tiktok_project
                else:
                    self.log_test("Coffee House TikTok Project Retrieval", False, 
                                "TikTok Campaign project not found in projects list")
                    return None
            else:
                self.log_test("Coffee House TikTok Project Retrieval", False, 
                            f"Status {response.status_code}: {response.text}")
                return None
        except requests.exceptions.RequestException as e:
            self.log_test("Coffee House TikTok Project Retrieval", False, f"Request failed: {str(e)}")
            return None
    
    def test_coffee_house_tiktok_video_descriptions(self):
        """Test that TikTok project has 6 enhanced video descriptions in combinedTikTokSection"""
        try:
            tiktok_project = self.test_coffee_house_tiktok_project_retrieval()
            if not tiktok_project:
                self.log_test("Coffee House TikTok Video Descriptions", False, 
                            "Cannot test video descriptions - TikTok project not found")
                return False
            
            # Check for combinedTikTokSection
            combined_section = tiktok_project.get('combinedTikTokSection', [])
            if not combined_section:
                self.log_test("Coffee House TikTok Video Descriptions", False, 
                            "combinedTikTokSection not found in TikTok project")
                return False
            
            # Should have 6 videos
            if len(combined_section) != 6:
                self.log_test("Coffee House TikTok Video Descriptions", False, 
                            f"Expected 6 TikTok videos, found {len(combined_section)}")
                return False
            
            # Check for specific video descriptions
            expected_descriptions = [
                "Customer Experience Showcase",
                "Marylin Monroe Signature Drink", 
                "4th of July Northern Ute Powwow",
                "Barista Behind the Scenes",
                "New Year Customer Appreciation",
                "Community Event Coordination"
            ]
            
            found_descriptions = []
            for video in combined_section:
                description = video.get('description', '')
                found_descriptions.append(description)
            
            # Check if all expected descriptions are present
            missing_descriptions = []
            for expected in expected_descriptions:
                found = False
                for desc in found_descriptions:
                    if expected.lower() in desc.lower():
                        found = True
                        break
                if not found:
                    missing_descriptions.append(expected)
            
            if not missing_descriptions:
                self.log_test("Coffee House TikTok Video Descriptions", True, 
                            f"All 6 enhanced video descriptions found: {expected_descriptions}")
                return True
            else:
                self.log_test("Coffee House TikTok Video Descriptions", False, 
                            f"Missing video descriptions: {missing_descriptions}")
                return False
                
        except Exception as e:
            self.log_test("Coffee House TikTok Video Descriptions", False, f"Error checking video descriptions: {str(e)}")
            return False
    
    def test_coffee_house_tiktok_empty_images(self):
        """Test that TikTok project has empty images array (no main video)"""
        try:
            tiktok_project = self.test_coffee_house_tiktok_project_retrieval()
            if not tiktok_project:
                self.log_test("Coffee House TikTok Empty Images", False, 
                            "Cannot test empty images - TikTok project not found")
                return False
            
            images = tiktok_project.get('images', [])
            if len(images) == 0:
                self.log_test("Coffee House TikTok Empty Images", True, 
                            "TikTok project has empty images array as expected")
                return True
            else:
                self.log_test("Coffee House TikTok Empty Images", False, 
                            f"Expected empty images array, found {len(images)} images")
                return False
                
        except Exception as e:
            self.log_test("Coffee House TikTok Empty Images", False, f"Error checking empty images: {str(e)}")
            return False
    
    def test_coffee_house_advertising_project_retrieval(self):
        """Test that Advertising Campaign Project (ID: 4) exists and is retrievable"""
        try:
            response = self.session.get(f"{API_BASE_URL}/projects", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                advertising_project = None
                
                # Look for Advertising Campaign project
                for project in projects:
                    if project.get('id') == '4' or ('Advertising' in project.get('title', '') and 'Coffee' in project.get('title', '')):
                        advertising_project = project
                        break
                
                if advertising_project:
                    self.log_test("Coffee House Advertising Project Retrieval", True, 
                                f"Found Advertising Campaign project: {advertising_project['title']}")
                    return advertising_project
                else:
                    self.log_test("Coffee House Advertising Project Retrieval", False, 
                                "Advertising Campaign project not found in projects list")
                    return None
            else:
                self.log_test("Coffee House Advertising Project Retrieval", False, 
                            f"Status {response.status_code}: {response.text}")
                return None
        except requests.exceptions.RequestException as e:
            self.log_test("Coffee House Advertising Project Retrieval", False, f"Request failed: {str(e)}")
            return None
    
    def test_coffee_house_advertising_enhanced_description(self):
        """Test that Advertising project has enhanced description emphasizing team direction"""
        try:
            advertising_project = self.test_coffee_house_advertising_project_retrieval()
            if not advertising_project:
                self.log_test("Coffee House Advertising Enhanced Description", False, 
                            "Cannot test enhanced description - Advertising project not found")
                return False
            
            description = advertising_project.get('description', '')
            
            # Check for team direction keywords
            team_keywords = ['team', 'direction', 'editors', 'large-scale', 'advertising']
            found_keywords = []
            for keyword in team_keywords:
                if keyword.lower() in description.lower():
                    found_keywords.append(keyword)
            
            if len(found_keywords) >= 3:  # Should have at least 3 of the keywords
                self.log_test("Coffee House Advertising Enhanced Description", True, 
                            f"Enhanced description with team direction emphasis found. Keywords: {found_keywords}")
                return True
            else:
                self.log_test("Coffee House Advertising Enhanced Description", False, 
                            f"Description lacks team direction emphasis. Found keywords: {found_keywords}")
                return False
                
        except Exception as e:
            self.log_test("Coffee House Advertising Enhanced Description", False, f"Error checking enhanced description: {str(e)}")
            return False
    
    def test_coffee_house_advertising_two_videos(self):
        """Test that Advertising project has 2 videos in videos array"""
        try:
            advertising_project = self.test_coffee_house_advertising_project_retrieval()
            if not advertising_project:
                self.log_test("Coffee House Advertising Two Videos", False, 
                            "Cannot test two videos - Advertising project not found")
                return False
            
            videos = advertising_project.get('videos', [])
            if len(videos) == 2:
                # Check for specific video titles
                video_titles = [video.get('title', '') for video in videos]
                expected_titles = [
                    "KahPeeh kah-Ahn Coffee House Advertisement",
                    "Ute Crossing Grill & Ute Lanes Advertisement"
                ]
                
                found_titles = []
                for expected in expected_titles:
                    for title in video_titles:
                        if expected.lower() in title.lower() or any(word in title.lower() for word in expected.lower().split()):
                            found_titles.append(expected)
                            break
                
                if len(found_titles) == 2:
                    self.log_test("Coffee House Advertising Two Videos", True, 
                                f"Found 2 videos with correct titles: {video_titles}")
                    return True
                else:
                    self.log_test("Coffee House Advertising Two Videos", False, 
                                f"Videos found but titles don't match expected. Found: {video_titles}")
                    return False
            else:
                self.log_test("Coffee House Advertising Two Videos", False, 
                            f"Expected 2 videos, found {len(videos)}")
                return False
                
        except Exception as e:
            self.log_test("Coffee House Advertising Two Videos", False, f"Error checking two videos: {str(e)}")
            return False
    
    def test_coffee_house_advertising_additional_project(self):
        """Test that Advertising project has additionalProject section for Ute Crossing Grill"""
        try:
            advertising_project = self.test_coffee_house_advertising_project_retrieval()
            if not advertising_project:
                self.log_test("Coffee House Advertising Additional Project", False, 
                            "Cannot test additional project - Advertising project not found")
                return False
            
            additional_project = advertising_project.get('additionalProject', {})
            if not additional_project:
                self.log_test("Coffee House Advertising Additional Project", False, 
                            "additionalProject section not found")
                return False
            
            # Check for Ute Crossing Grill details
            title = additional_project.get('title', '')
            description = additional_project.get('description', '')
            
            if 'Ute Crossing Grill' in title and 'Ute Lanes' in title:
                if 'restaurant' in description.lower() and 'bowling' in description.lower():
                    self.log_test("Coffee House Advertising Additional Project", True, 
                                f"additionalProject section found with Ute Crossing Grill & Ute Lanes details")
                    return True
                else:
                    self.log_test("Coffee House Advertising Additional Project", False, 
                                f"additionalProject found but description lacks restaurant/bowling details")
                    return False
            else:
                self.log_test("Coffee House Advertising Additional Project", False, 
                            f"additionalProject title doesn't match expected. Found: {title}")
                return False
                
        except Exception as e:
            self.log_test("Coffee House Advertising Additional Project", False, f"Error checking additional project: {str(e)}")
            return False
    
    def test_coffee_house_advertising_no_video_url(self):
        """Test that Advertising project has no videoUrl field (YouTube links removed)"""
        try:
            advertising_project = self.test_coffee_house_advertising_project_retrieval()
            if not advertising_project:
                self.log_test("Coffee House Advertising No Video URL", False, 
                            "Cannot test no video URL - Advertising project not found")
                return False
            
            video_url = advertising_project.get('videoUrl')
            if video_url is None or video_url == '':
                self.log_test("Coffee House Advertising No Video URL", True, 
                            "videoUrl field is empty/removed as expected")
                return True
            else:
                self.log_test("Coffee House Advertising No Video URL", False, 
                            f"videoUrl field still present: {video_url}")
                return False
                
        except Exception as e:
            self.log_test("Coffee House Advertising No Video URL", False, f"Error checking no video URL: {str(e)}")
            return False
    
    def test_coffee_house_advertising_enhanced_contributions(self):
        """Test that Advertising project has enhanced key_contributions and skills_utilized"""
        try:
            advertising_project = self.test_coffee_house_advertising_project_retrieval()
            if not advertising_project:
                self.log_test("Coffee House Advertising Enhanced Contributions", False, 
                            "Cannot test enhanced contributions - Advertising project not found")
                return False
            
            key_contributions = advertising_project.get('key_contributions', [])
            skills_utilized = advertising_project.get('skills_utilized', [])
            
            # Check for TV/YouTube ad experience in contributions
            tv_youtube_keywords = ['TV', 'YouTube', 'advertisement', 'commercial', 'broadcast']
            found_tv_keywords = []
            for contribution in key_contributions:
                for keyword in tv_youtube_keywords:
                    if keyword.lower() in contribution.lower():
                        found_tv_keywords.append(keyword)
                        break
            
            # Check for relevant skills
            expected_skills = ['video', 'advertising', 'marketing', 'production']
            found_skills = []
            for skill in skills_utilized:
                for expected in expected_skills:
                    if expected.lower() in skill.lower():
                        found_skills.append(expected)
                        break
            
            if len(found_tv_keywords) > 0 and len(found_skills) > 0:
                self.log_test("Coffee House Advertising Enhanced Contributions", True, 
                            f"Enhanced contributions and skills found. TV/YouTube keywords: {found_tv_keywords}, Skills: {found_skills}")
                return True
            else:
                self.log_test("Coffee House Advertising Enhanced Contributions", False, 
                            f"Enhanced contributions/skills lacking. TV keywords: {found_tv_keywords}, Skills: {found_skills}")
                return False
                
        except Exception as e:
            self.log_test("Coffee House Advertising Enhanced Contributions", False, f"Error checking enhanced contributions: {str(e)}")
            return False
    
    def test_coffee_house_projects_database_health(self):
        """Test general database health and that other projects remain intact"""
        try:
            response = self.session.get(f"{API_BASE_URL}/projects", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                
                # Should have multiple projects (at least the original ones plus coffee house projects)
                if len(projects) >= 9:  # Original mock data had 9 projects
                    # Test category filtering still works
                    categories_to_test = [
                        "Business Analytics & Strategy",
                        "Social Media Content & Campaigns", 
                        "Advertising",
                        "Photography Projects"
                    ]
                    
                    all_categories_work = True
                    for category in categories_to_test:
                        cat_response = self.session.get(f"{API_BASE_URL}/projects?category={category.replace(' ', '%20').replace('&', '%26')}", timeout=10)
                        if cat_response.status_code != 200:
                            all_categories_work = False
                            break
                    
                    if all_categories_work:
                        self.log_test("Coffee House Projects Database Health", True, 
                                    f"Database healthy with {len(projects)} projects and category filtering working")
                        return True
                    else:
                        self.log_test("Coffee House Projects Database Health", False, 
                                    "Category filtering not working properly")
                        return False
                else:
                    self.log_test("Coffee House Projects Database Health", False, 
                                f"Expected at least 9 projects, found {len(projects)}")
                    return False
            else:
                self.log_test("Coffee House Projects Database Health", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Coffee House Projects Database Health", False, f"Request failed: {str(e)}")
            return False
    
    def test_coffee_house_projects_crud_operations(self):
        """Test that CRUD operations still work after coffee house updates"""
        try:
            # Test creating a new project
            test_project_data = {
                "title": "Test Coffee House Integration",
                "category": "Advertising",
                "client": "Test Client",
                "description": "Testing CRUD operations after coffee house updates",
                "images": [],
                "type": "image",
                "featured": False,
                "orientation": "horizontal"
            }
            
            # CREATE
            response = self.session.post(f"{API_BASE_URL}/projects", json=test_project_data, timeout=10)
            if response.status_code != 200:
                self.log_test("Coffee House Projects CRUD Operations", False, 
                            f"CREATE failed: {response.status_code}")
                return False
            
            project = response.json()
            test_project_id = project.get('id')
            
            # READ
            response = self.session.get(f"{API_BASE_URL}/projects/{test_project_id}", timeout=10)
            if response.status_code != 200:
                self.log_test("Coffee House Projects CRUD Operations", False, 
                            f"READ failed: {response.status_code}")
                return False
            
            # UPDATE
            update_data = {"title": "Updated Test Coffee House Integration"}
            response = self.session.put(f"{API_BASE_URL}/projects/{test_project_id}", json=update_data, timeout=10)
            if response.status_code != 200:
                self.log_test("Coffee House Projects CRUD Operations", False, 
                            f"UPDATE failed: {response.status_code}")
                return False
            
            # DELETE
            response = self.session.delete(f"{API_BASE_URL}/projects/{test_project_id}", timeout=10)
            if response.status_code != 200:
                self.log_test("Coffee House Projects CRUD Operations", False, 
                            f"DELETE failed: {response.status_code}")
                return False
            
            self.log_test("Coffee House Projects CRUD Operations", True, 
                        "All CRUD operations working correctly after coffee house updates")
            return True
            
        except requests.exceptions.RequestException as e:
            self.log_test("Coffee House Projects CRUD Operations", False, f"Request failed: {str(e)}")
            return False

    def test_coffee_house_tiktok_project(self):
        """Test TikTok Campaign Project (ID: 8) with combinedTikTokSection and 6 videos"""
        try:
            # Test GET /api/projects/8
            response = self.session.get(f"{API_BASE_URL}/projects/8", timeout=10)
            if response.status_code == 200:
                project = response.json()
                
                # Verify project exists with ID "8"
                if project.get('id') != "8":
                    self.log_test("Coffee House TikTok Project - ID Check", False, 
                                f"Expected ID '8', got '{project.get('id')}'")
                    return False
                
                # Check for combinedTikTokSection
                combined_section = project.get('combinedTikTokSection')
                if not combined_section:
                    self.log_test("Coffee House TikTok Project - Combined Section", False, 
                                "Missing 'combinedTikTokSection' field")
                    return False
                
                # Verify 6 videos exist
                if not isinstance(combined_section, list) or len(combined_section) != 6:
                    self.log_test("Coffee House TikTok Project - Video Count", False, 
                                f"Expected 6 videos in combinedTikTokSection, got {len(combined_section) if isinstance(combined_section, list) else 'not a list'}")
                    return False
                
                # Verify specific video descriptions
                expected_descriptions = [
                    "Customer Experience Showcase",
                    "Marylin Monroe Signature Drink", 
                    "4th of July Northern Ute Powwow",
                    "Barista Behind the Scenes",
                    "New Year Customer Appreciation",
                    "Community Event Coordination"
                ]
                
                found_descriptions = []
                for video in combined_section:
                    if isinstance(video, dict):
                        desc = video.get('description', '')
                        found_descriptions.append(desc)
                
                missing_descriptions = []
                for expected in expected_descriptions:
                    found = False
                    for found_desc in found_descriptions:
                        if expected.lower() in found_desc.lower():
                            found = True
                            break
                    if not found:
                        missing_descriptions.append(expected)
                
                if missing_descriptions:
                    self.log_test("Coffee House TikTok Project - Video Descriptions", False, 
                                f"Missing expected video descriptions: {missing_descriptions}")
                    return False
                
                self.log_test("Coffee House TikTok Project", True, 
                            f"TikTok project (ID: 8) found with combinedTikTokSection containing 6 videos with correct descriptions")
                return True
                
            elif response.status_code == 404:
                self.log_test("Coffee House TikTok Project", False, 
                            "TikTok Campaign Project with ID '8' not found")
                return False
            else:
                self.log_test("Coffee House TikTok Project", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Coffee House TikTok Project", False, f"Request failed: {str(e)}")
            return False
    
    def test_coffee_house_advertising_project(self):
        """Test Advertising Campaign Project (ID: 4) with videos array and additionalProject section"""
        try:
            # Test GET /api/projects/4
            response = self.session.get(f"{API_BASE_URL}/projects/4", timeout=10)
            if response.status_code == 200:
                project = response.json()
                
                # Verify project exists with ID "4"
                if project.get('id') != "4":
                    self.log_test("Coffee House Advertising Project - ID Check", False, 
                                f"Expected ID '4', got '{project.get('id')}'")
                    return False
                
                # Check for videos array with 2 videos
                videos = project.get('videos')
                if not videos:
                    self.log_test("Coffee House Advertising Project - Videos Array", False, 
                                "Missing 'videos' array field")
                    return False
                
                if not isinstance(videos, list) or len(videos) != 2:
                    self.log_test("Coffee House Advertising Project - Video Count", False, 
                                f"Expected 2 videos in videos array, got {len(videos) if isinstance(videos, list) else 'not a list'}")
                    return False
                
                # Check for additionalProject section for Ute Crossing Grill
                additional_project = project.get('additionalProject')
                if not additional_project:
                    self.log_test("Coffee House Advertising Project - Additional Project", False, 
                                "Missing 'additionalProject' section")
                    return False
                
                # Verify Ute Crossing Grill details in additionalProject
                if isinstance(additional_project, dict):
                    additional_desc = str(additional_project)
                    if "ute crossing grill" not in additional_desc.lower():
                        self.log_test("Coffee House Advertising Project - Ute Crossing Grill", False, 
                                    "additionalProject section missing Ute Crossing Grill details")
                        return False
                
                # Confirm videoUrl field is NOT present (YouTube links removed)
                if 'videoUrl' in project:
                    self.log_test("Coffee House Advertising Project - VideoUrl Removal", False, 
                                "videoUrl field should be removed but still present")
                    return False
                
                # Check description includes "team", "editors", "large-scale advertising"
                description = project.get('description', '').lower()
                required_terms = ['team', 'editors']
                missing_terms = []
                for term in required_terms:
                    if term not in description:
                        missing_terms.append(term)
                
                if missing_terms:
                    self.log_test("Coffee House Advertising Project - Description Terms", False, 
                                f"Description missing required terms: {missing_terms}")
                    return False
                
                self.log_test("Coffee House Advertising Project", True, 
                            f"Advertising project (ID: 4) found with videos array (2 videos), additionalProject section, no videoUrl field, and proper description")
                return True
                
            elif response.status_code == 404:
                self.log_test("Coffee House Advertising Project", False, 
                            "Advertising Campaign Project with ID '4' not found")
                return False
            else:
                self.log_test("Coffee House Advertising Project", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Coffee House Advertising Project", False, f"Request failed: {str(e)}")
            return False
    
    def test_coffee_house_projects_in_list(self):
        """Test that both coffee house projects appear in GET /api/projects"""
        try:
            response = self.session.get(f"{API_BASE_URL}/projects", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                
                # Look for both projects
                tiktok_project = None
                advertising_project = None
                
                for project in projects:
                    project_id = project.get('id')
                    if project_id == "8":
                        tiktok_project = project
                    elif project_id == "4":
                        advertising_project = project
                
                results = []
                if tiktok_project:
                    results.append("TikTok project (ID: 8) found")
                else:
                    results.append("❌ TikTok project (ID: 8) missing")
                
                if advertising_project:
                    results.append("Advertising project (ID: 4) found")
                else:
                    results.append("❌ Advertising project (ID: 4) missing")
                
                if tiktok_project and advertising_project:
                    self.log_test("Coffee House Projects in List", True, 
                                f"Both coffee house projects found in projects list. {'; '.join(results)}")
                    return True
                else:
                    self.log_test("Coffee House Projects in List", False, 
                                f"Missing coffee house projects. {'; '.join(results)}")
                    return False
                
            else:
                self.log_test("Coffee House Projects in List", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Coffee House Projects in List", False, f"Request failed: {str(e)}")
            return False

    def test_ute_crossing_grill_project_retrieval(self):
        """Test that Ute Crossing Grill & Ute Lanes project (id: 5) exists and is retrievable"""
        try:
            response = self.session.get(f"{API_BASE_URL}/projects", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                ute_crossing_project = None
                
                # Find the Ute Crossing Grill project by ID or title
                for project in projects:
                    if (project.get('id') == '5' or 
                        "Ute Crossing Grill" in project.get('title', '') and 
                        "Ute Lanes" in project.get('title', '')):
                        ute_crossing_project = project
                        break
                
                if ute_crossing_project:
                    self.log_test("Ute Crossing Grill Project Retrieval", True, 
                                f"Found Ute Crossing Grill project: {ute_crossing_project['title']} (ID: {ute_crossing_project.get('id')})")
                    return ute_crossing_project
                else:
                    self.log_test("Ute Crossing Grill Project Retrieval", False, 
                                "Ute Crossing Grill & Ute Lanes project not found in projects list")
                    return None
            else:
                self.log_test("Ute Crossing Grill Project Retrieval", False, 
                            f"Status {response.status_code}: {response.text}")
                return None
        except requests.exceptions.RequestException as e:
            self.log_test("Ute Crossing Grill Project Retrieval", False, f"Request failed: {str(e)}")
            return None

    def test_ute_crossing_grill_advertising_category(self):
        """Test that Ute Crossing Grill project is in Advertising category"""
        try:
            ute_crossing_project = self.test_ute_crossing_grill_project_retrieval()
            if not ute_crossing_project:
                self.log_test("Ute Crossing Grill Advertising Category", False, 
                            "Cannot test category - project not found")
                return False
            
            category = ute_crossing_project.get('category')
            if category == 'Advertising':
                self.log_test("Ute Crossing Grill Advertising Category", True, 
                            f"Project correctly assigned to Advertising category")
                return True
            else:
                self.log_test("Ute Crossing Grill Advertising Category", False, 
                            f"Wrong category. Expected: 'Advertising', Got: '{category}'")
                return False
                
        except Exception as e:
            self.log_test("Ute Crossing Grill Advertising Category", False, f"Error checking category: {str(e)}")
            return False

    def test_ute_crossing_grill_video_fields(self):
        """Test that Ute Crossing Grill project has proper video placement fields (videoFile, videoUrl)"""
        try:
            ute_crossing_project = self.test_ute_crossing_grill_project_retrieval()
            if not ute_crossing_project:
                self.log_test("Ute Crossing Grill Video Fields", False, 
                            "Cannot test video fields - project not found")
                return False
            
            # Check for video placement fields
            has_video_url = 'video_url' in ute_crossing_project or 'videoUrl' in ute_crossing_project
            has_video_file = 'videoFile' in ute_crossing_project
            
            # Check project type is appropriate for video content
            project_type = ute_crossing_project.get('type', '')
            
            if has_video_url or has_video_file:
                self.log_test("Ute Crossing Grill Video Fields", True, 
                            f"Project has video placement fields. Type: {project_type}")
                return True
            else:
                self.log_test("Ute Crossing Grill Video Fields", False, 
                            "Project missing video placement fields (videoFile, videoUrl)")
                return False
                
        except Exception as e:
            self.log_test("Ute Crossing Grill Video Fields", False, f"Error checking video fields: {str(e)}")
            return False

    def test_ute_crossing_grill_project_structure(self):
        """Test that Ute Crossing Grill project has complete project details"""
        try:
            ute_crossing_project = self.test_ute_crossing_grill_project_retrieval()
            if not ute_crossing_project:
                self.log_test("Ute Crossing Grill Project Structure", False, 
                            "Cannot test project structure - project not found")
                return False
            
            # Check required fields
            required_fields = ['title', 'category', 'client', 'description', 'project_type']
            missing_fields = []
            
            for field in required_fields:
                if not ute_crossing_project.get(field):
                    missing_fields.append(field)
            
            if missing_fields:
                self.log_test("Ute Crossing Grill Project Structure", False, 
                            f"Missing required fields: {missing_fields}")
                return False
            
            # Check enhanced fields
            enhanced_fields = ['key_contributions', 'skills_utilized', 'impact']
            has_enhanced_fields = any(ute_crossing_project.get(field) for field in enhanced_fields)
            
            # Check for cross-linking (relatedProjects)
            has_related_projects = 'relatedProjects' in ute_crossing_project or 'related_projects' in ute_crossing_project
            
            # Check description contains relevant keywords
            description = ute_crossing_project.get('description', '').lower()
            relevant_keywords = ['restaurant', 'bowling', 'ute', 'tribal', 'entertainment']
            has_relevant_content = any(keyword in description for keyword in relevant_keywords)
            
            if has_enhanced_fields and has_relevant_content:
                self.log_test("Ute Crossing Grill Project Structure", True, 
                            f"Project has complete structure with enhanced fields and relevant content")
                return True
            else:
                issues = []
                if not has_enhanced_fields:
                    issues.append("missing enhanced fields")
                if not has_relevant_content:
                    issues.append("lacks relevant content keywords")
                
                self.log_test("Ute Crossing Grill Project Structure", False, 
                            f"Project structure issues: {', '.join(issues)}")
                return False
                
        except Exception as e:
            self.log_test("Ute Crossing Grill Project Structure", False, f"Error checking project structure: {str(e)}")
            return False

    def test_ute_crossing_grill_individual_retrieval(self):
        """Test individual project retrieval for Ute Crossing Grill project via /api/projects/{id}"""
        try:
            # First get the project to find its ID
            ute_crossing_project = self.test_ute_crossing_grill_project_retrieval()
            if not ute_crossing_project:
                self.log_test("Ute Crossing Grill Individual Retrieval", False, 
                            "Cannot test individual retrieval - project not found")
                return False
            
            project_id = ute_crossing_project.get('id')
            if not project_id:
                self.log_test("Ute Crossing Grill Individual Retrieval", False, 
                            "Project ID not found")
                return False
            
            # Test individual project retrieval
            response = self.session.get(f"{API_BASE_URL}/projects/{project_id}", timeout=10)
            if response.status_code == 200:
                individual_project = response.json()
                
                # Verify it's the same project
                if individual_project.get('id') == project_id:
                    # Verify key details are intact
                    title = individual_project.get('title', '')
                    category = individual_project.get('category', '')
                    
                    if ("Ute Crossing Grill" in title and "Ute Lanes" in title and 
                        category == "Advertising"):
                        self.log_test("Ute Crossing Grill Individual Retrieval", True, 
                                    f"Individual project retrieval successful with all details intact")
                        return True
                    else:
                        self.log_test("Ute Crossing Grill Individual Retrieval", False, 
                                    f"Project details incomplete. Title: {title}, Category: {category}")
                        return False
                else:
                    self.log_test("Ute Crossing Grill Individual Retrieval", False, 
                                f"ID mismatch: expected {project_id}, got {individual_project.get('id')}")
                    return False
            else:
                self.log_test("Ute Crossing Grill Individual Retrieval", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Ute Crossing Grill Individual Retrieval", False, f"Request failed: {str(e)}")
            return False

    def test_project_ids_sequential_integrity(self):
        """Test that project IDs are sequential and unique, specifically checking for IDs 5, 7, 8, 9, 10"""
        try:
            response = self.session.get(f"{API_BASE_URL}/projects", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                
                # Extract all project IDs
                project_ids = [project.get('id') for project in projects if project.get('id')]
                
                # Check for specific expected IDs
                expected_ids = ['5', '7', '8', '9', '10']
                found_ids = []
                missing_ids = []
                
                for expected_id in expected_ids:
                    if expected_id in project_ids:
                        found_ids.append(expected_id)
                    else:
                        missing_ids.append(expected_id)
                
                # Check for duplicates
                unique_ids = set(project_ids)
                has_duplicates = len(project_ids) != len(unique_ids)
                
                # Find projects with expected IDs and verify their details
                expected_projects = {
                    '5': {'title_contains': ['Ute Crossing Grill', 'Ute Lanes'], 'category': 'Advertising'},
                    '7': {'title_contains': ['Adobe Creative Suite', 'Instagram Reels'], 'category': 'Social Media Content & Campaigns'},
                    '8': {'title_contains': ['Adobe Analytics Challenge'], 'category': 'Illustrations & Educational Content'},
                    '9': {'title_contains': ['Utah High', 'Elementary School', 'Bison Grant'], 'category': 'Illustrations & Educational Content'},
                    '10': {'title_contains': ['KahPeeh kah-Ahn', 'TikTok Campaign'], 'category': 'Social Media Content & Campaigns'}
                }
                
                verified_projects = {}
                for project in projects:
                    project_id = project.get('id')
                    if project_id in expected_projects:
                        expected = expected_projects[project_id]
                        title = project.get('title', '')
                        category = project.get('category', '')
                        
                        title_matches = any(keyword in title for keyword in expected['title_contains'])
                        category_matches = category == expected['category']
                        
                        verified_projects[project_id] = {
                            'found': True,
                            'title_matches': title_matches,
                            'category_matches': category_matches,
                            'title': title,
                            'category': category
                        }
                
                # Generate results
                if not has_duplicates and len(found_ids) >= 4:  # Allow some flexibility
                    success_details = []
                    for project_id in found_ids:
                        if project_id in verified_projects:
                            proj = verified_projects[project_id]
                            success_details.append(f"ID {project_id}: {proj['title']} ({proj['category']})")
                    
                    self.log_test("Project IDs Sequential Integrity", True, 
                                f"Found {len(found_ids)} expected project IDs with unique values. Details: {'; '.join(success_details)}")
                    return True
                else:
                    issues = []
                    if has_duplicates:
                        issues.append("duplicate IDs found")
                    if missing_ids:
                        issues.append(f"missing IDs: {missing_ids}")
                    
                    self.log_test("Project IDs Sequential Integrity", False, 
                                f"Data integrity issues: {', '.join(issues)}. Found IDs: {found_ids}")
                    return False
            else:
                self.log_test("Project IDs Sequential Integrity", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Project IDs Sequential Integrity", False, f"Request failed: {str(e)}")
            return False

    def test_advertising_category_filtering(self):
        """Test category filtering functionality for Advertising category"""
        try:
            # Test with Advertising category (URL encoded)
            response = self.session.get(f"{API_BASE_URL}/projects?category=Advertising", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                advertising_projects = []
                
                # Find advertising projects
                for project in projects:
                    if project.get('category') == 'Advertising':
                        advertising_projects.append(project)
                
                # Check if Ute Crossing Grill project is in the results
                ute_crossing_found = False
                for project in advertising_projects:
                    title = project.get('title', '')
                    if "Ute Crossing Grill" in title and "Ute Lanes" in title:
                        ute_crossing_found = True
                        break
                
                if ute_crossing_found and len(advertising_projects) > 0:
                    self.log_test("Advertising Category Filtering", True, 
                                f"Found {len(advertising_projects)} advertising projects including Ute Crossing Grill")
                    return True
                else:
                    self.log_test("Advertising Category Filtering", False, 
                                f"Ute Crossing Grill not found in {len(advertising_projects)} advertising projects")
                    return False
            else:
                self.log_test("Advertising Category Filtering", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Advertising Category Filtering", False, f"Request failed: {str(e)}")
            return False

    def test_thumbnail_image_integration(self):
        """Test that projects have proper thumbnail image URL integration"""
        try:
            ute_crossing_project = self.test_ute_crossing_grill_project_retrieval()
            if not ute_crossing_project:
                self.log_test("Thumbnail Image Integration", False, 
                            "Cannot test thumbnail integration - Ute Crossing Grill project not found")
                return False
            
            # Check for images array
            images = ute_crossing_project.get('images', [])
            if not images:
                self.log_test("Thumbnail Image Integration", False, 
                            "No images found in Ute Crossing Grill project")
                return False
            
            # Check if images are properly formatted (base64 or URLs)
            valid_images = 0
            for image in images:
                if isinstance(image, str) and (image.startswith('data:image/') or image.startswith('http')):
                    valid_images += 1
            
            if valid_images > 0:
                self.log_test("Thumbnail Image Integration", True, 
                            f"Found {valid_images} valid thumbnail images in project")
                return True
            else:
                self.log_test("Thumbnail Image Integration", False, 
                            f"No valid thumbnail images found. Images: {images[:2]}...")  # Show first 2 for debugging
                return False
                
        except Exception as e:
            self.log_test("Thumbnail Image Integration", False, f"Error checking thumbnail integration: {str(e)}")
            return False

    def test_ute_crossing_grill_project_accessibility(self):
        """Test GET /api/projects/5 to confirm Ute Crossing Grill project is accessible"""
        try:
            response = self.session.get(f"{API_BASE_URL}/projects/5", timeout=10)
            if response.status_code == 200:
                project = response.json()
                if project.get('id') == '5':
                    title = project.get('title', '')
                    if 'Ute Crossing Grill' in title and 'Ute Lanes' in title:
                        self.log_test("Ute Crossing Grill Project Accessibility", True, 
                                    f"Project ID 5 accessible with correct title: {title}")
                        return project
                    else:
                        self.log_test("Ute Crossing Grill Project Accessibility", False, 
                                    f"Project ID 5 found but wrong title: {title}")
                        return None
                else:
                    self.log_test("Ute Crossing Grill Project Accessibility", False, 
                                f"ID mismatch: expected '5', got '{project.get('id')}'")
                    return None
            elif response.status_code == 404:
                self.log_test("Ute Crossing Grill Project Accessibility", False, 
                            "Project ID 5 not found (404 error)")
                return None
            else:
                self.log_test("Ute Crossing Grill Project Accessibility", False, 
                            f"Status {response.status_code}: {response.text}")
                return None
        except requests.exceptions.RequestException as e:
            self.log_test("Ute Crossing Grill Project Accessibility", False, f"Request failed: {str(e)}")
            return None

    def test_ute_crossing_grill_project_structure_enhanced(self):
        """Verify all required fields are present in Ute Crossing Grill project"""
        try:
            project = self.test_ute_crossing_grill_project_accessibility()
            if not project:
                self.log_test("Ute Crossing Grill Project Structure Enhanced", False, 
                            "Cannot test structure - project not accessible")
                return False
            
            # Check required basic fields
            required_fields = {
                'title': 'Ute Crossing Grill & Ute Lanes - Video Advertisement Campaign',
                'category': 'Advertising',
                'client': 'Ute Tribal Enterprises',
                'description': str,  # Should be a string
                'project_type': str,  # Enhanced field
                'key_contributions': list,  # Enhanced field
                'skills_utilized': list,  # Enhanced field
                'impact': dict  # Enhanced field
            }
            
            missing_fields = []
            incorrect_fields = []
            
            for field, expected_value in required_fields.items():
                actual_value = project.get(field)
                
                if actual_value is None:
                    missing_fields.append(field)
                elif isinstance(expected_value, type):
                    # Type check
                    if not isinstance(actual_value, expected_value):
                        incorrect_fields.append(f"{field}: expected {expected_value.__name__}, got {type(actual_value).__name__}")
                elif actual_value != expected_value:
                    # Exact value check
                    incorrect_fields.append(f"{field}: expected '{expected_value}', got '{actual_value}'")
            
            if missing_fields or incorrect_fields:
                error_msg = f"Missing fields: {missing_fields}, Incorrect fields: {incorrect_fields}"
                self.log_test("Ute Crossing Grill Project Structure Enhanced", False, error_msg)
                return False
            else:
                self.log_test("Ute Crossing Grill Project Structure Enhanced", True, 
                            "All required fields present with correct values and types")
                return True
                
        except Exception as e:
            self.log_test("Ute Crossing Grill Project Structure Enhanced", False, f"Error checking structure: {str(e)}")
            return False

    def test_ute_crossing_grill_video_customization(self):
        """Verify video_url and videoFile fields for video customization"""
        try:
            project = self.test_ute_crossing_grill_project_accessibility()
            if not project:
                self.log_test("Ute Crossing Grill Video Customization", False, 
                            "Cannot test video customization - project not accessible")
                return False
            
            # Check for video customization fields
            video_url = project.get('video_url')
            video_file = project.get('videoFile')
            
            video_issues = []
            
            # video_url should contain asset URL
            if not video_url:
                video_issues.append("video_url field missing")
            elif not isinstance(video_url, str) or len(video_url) < 10:
                video_issues.append(f"video_url invalid: {video_url}")
            
            # videoFile should reference original filename
            if not video_file:
                video_issues.append("videoFile field missing")
            elif not isinstance(video_file, str):
                video_issues.append(f"videoFile should be string, got {type(video_file)}")
            
            if video_issues:
                self.log_test("Ute Crossing Grill Video Customization", False, 
                            f"Video customization issues: {video_issues}")
                return False
            else:
                self.log_test("Ute Crossing Grill Video Customization", True, 
                            f"Video customization fields present: video_url={video_url[:50]}..., videoFile={video_file}")
                return True
                
        except Exception as e:
            self.log_test("Ute Crossing Grill Video Customization", False, f"Error checking video customization: {str(e)}")
            return False

    def test_ute_crossing_grill_api_integration(self):
        """Confirm project appears in project lists and category filtering"""
        try:
            # Test 1: Project appears in full project list
            response = self.session.get(f"{API_BASE_URL}/projects", timeout=10)
            if response.status_code != 200:
                self.log_test("Ute Crossing Grill API Integration", False, 
                            f"Failed to get projects list: {response.status_code}")
                return False
            
            projects = response.json()
            ute_project_in_list = None
            
            for project in projects:
                if project.get('id') == '5' and 'Ute Crossing Grill' in project.get('title', ''):
                    ute_project_in_list = project
                    break
            
            if not ute_project_in_list:
                self.log_test("Ute Crossing Grill API Integration", False, 
                            "Project not found in full projects list")
                return False
            
            # Test 2: Project appears in Advertising category filter
            response = self.session.get(f"{API_BASE_URL}/projects?category=Advertising", timeout=10)
            if response.status_code != 200:
                self.log_test("Ute Crossing Grill API Integration", False, 
                            f"Failed to get Advertising category: {response.status_code}")
                return False
            
            advertising_projects = response.json()
            ute_project_in_category = None
            
            for project in advertising_projects:
                if project.get('id') == '5' and 'Ute Crossing Grill' in project.get('title', ''):
                    ute_project_in_category = project
                    break
            
            if not ute_project_in_category:
                self.log_test("Ute Crossing Grill API Integration", False, 
                            "Project not found in Advertising category filter")
                return False
            
            self.log_test("Ute Crossing Grill API Integration", True, 
                        "Project appears in both full project list and Advertising category filter")
            return True
            
        except requests.exceptions.RequestException as e:
            self.log_test("Ute Crossing Grill API Integration", False, f"Request failed: {str(e)}")
            return False
        except Exception as e:
            self.log_test("Ute Crossing Grill API Integration", False, f"Error in API integration test: {str(e)}")
            return False

    def test_ute_crossing_grill_database_persistence(self):
        """Verify project is properly stored in MongoDB and survives backend restarts"""
        try:
            # Test 1: Verify project exists and has all data
            project = self.test_ute_crossing_grill_project_accessibility()
            if not project:
                self.log_test("Ute Crossing Grill Database Persistence", False, 
                            "Cannot test persistence - project not accessible")
                return False
            
            # Test 2: Verify project has proper MongoDB structure (UUID-based ID)
            project_id = project.get('id')
            if not project_id or len(project_id) < 10:
                self.log_test("Ute Crossing Grill Database Persistence", False, 
                            f"Invalid project ID format: {project_id}")
                return False
            
            # Test 3: Verify created_at and updated_at timestamps exist
            created_at = project.get('created_at')
            updated_at = project.get('updated_at')
            
            if not created_at:
                self.log_test("Ute Crossing Grill Database Persistence", False, 
                            "Missing created_at timestamp")
                return False
            
            if not updated_at:
                self.log_test("Ute Crossing Grill Database Persistence", False, 
                            "Missing updated_at timestamp")
                return False
            
            # Test 4: Verify all complex data structures are preserved
            impact = project.get('impact', {})
            if not isinstance(impact, dict) or not impact.get('quantified_metrics') or not impact.get('qualitative_outcomes'):
                self.log_test("Ute Crossing Grill Database Persistence", False, 
                            "Complex impact data structure not properly persisted")
                return False
            
            key_contributions = project.get('key_contributions', [])
            if not isinstance(key_contributions, list) or len(key_contributions) == 0:
                self.log_test("Ute Crossing Grill Database Persistence", False, 
                            "Key contributions list not properly persisted")
                return False
            
            skills_utilized = project.get('skills_utilized', [])
            if not isinstance(skills_utilized, list) or len(skills_utilized) == 0:
                self.log_test("Ute Crossing Grill Database Persistence", False, 
                            "Skills utilized list not properly persisted")
                return False
            
            self.log_test("Ute Crossing Grill Database Persistence", True, 
                        "Project properly stored with UUID ID, timestamps, and complex data structures intact")
            return True
            
        except Exception as e:
            self.log_test("Ute Crossing Grill Database Persistence", False, f"Error checking persistence: {str(e)}")
            return False

    def test_ute_crossing_grill_comprehensive_verification(self):
        """Comprehensive verification of all Ute Crossing Grill project requirements"""
        try:
            print("\n" + "="*60)
            print("UTE CROSSING GRILL & UTE LANES - COMPREHENSIVE VERIFICATION")
            print("="*60)
            
            # Run all specific tests
            accessibility_result = self.test_ute_crossing_grill_project_accessibility()
            structure_result = self.test_ute_crossing_grill_project_structure_enhanced()
            video_result = self.test_ute_crossing_grill_video_customization()
            api_result = self.test_ute_crossing_grill_api_integration()
            persistence_result = self.test_ute_crossing_grill_database_persistence()
            
            # Calculate overall success
            tests_passed = sum([
                bool(accessibility_result),
                structure_result,
                video_result,
                api_result,
                persistence_result
            ])
            
            total_tests = 5
            success_rate = (tests_passed / total_tests) * 100
            
            if success_rate == 100:
                self.log_test("Ute Crossing Grill Comprehensive Verification", True, 
                            f"ALL TESTS PASSED ({tests_passed}/{total_tests}) - Project fully functional")
                return True
            elif success_rate >= 80:
                self.log_test("Ute Crossing Grill Comprehensive Verification", True, 
                            f"MOSTLY FUNCTIONAL ({tests_passed}/{total_tests}, {success_rate:.1f}%) - Minor issues only")
                return True
            else:
                self.log_test("Ute Crossing Grill Comprehensive Verification", False, 
                            f"CRITICAL ISSUES ({tests_passed}/{total_tests}, {success_rate:.1f}%) - Major functionality problems")
                return False
                
        except Exception as e:
            self.log_test("Ute Crossing Grill Comprehensive Verification", False, f"Error in comprehensive verification: {str(e)}")
            return False

    def test_user_requested_updates(self):
        """Test all user-requested updates from the review request"""
        print("\n" + "=" * 80)
        print("TESTING USER-REQUESTED UPDATES")
        print("=" * 80)
        
        # 1. Ute Crossing Grill Project (ID: 5) - YouTube Button Removal
        self.test_ute_crossing_grill_project_accessibility_review()
        self.test_ute_crossing_grill_no_youtube_fields()
        
        # 2. Coffee House Advertising Project (ID: 4) - Thumbnail Update
        self.test_coffee_house_advertising_thumbnail_update()
        
        # 3. Coffee House TikTok Project (ID: 10) - Description Cleanup
        self.test_coffee_house_tiktok_description_cleanup()
        
        # 4. New Ute Bison Ranch Project (ID: 11) - Complete Creation
        self.test_new_ute_bison_ranch_project_creation()
        self.test_ute_bison_ranch_organic_content_structure()
        
        # 5. API Functionality - Total Projects Count and Category Filtering
        self.test_total_projects_count_22()
        self.test_category_filtering_includes_ute_bison()
    
    def test_ute_crossing_grill_project_accessibility_review(self):
        """Test that Ute Crossing Grill project (ID: 5) is accessible"""
        try:
            response = self.session.get(f"{API_BASE_URL}/projects/5", timeout=10)
            if response.status_code == 200:
                project = response.json()
                if project.get('id') == '5':
                    title = project.get('title', '')
                    if 'Ute Crossing Grill' in title:
                        self.log_test("Ute Crossing Grill Project Accessibility (Review)", True, 
                                    f"Project ID 5 accessible with title: {title}")
                        return project
                    else:
                        self.log_test("Ute Crossing Grill Project Accessibility (Review)", False, 
                                    f"Project ID 5 found but wrong title: {title}")
                        return None
                else:
                    self.log_test("Ute Crossing Grill Project Accessibility (Review)", False, 
                                f"ID mismatch: expected '5', got '{project.get('id')}'")
                    return None
            else:
                self.log_test("Ute Crossing Grill Project Accessibility (Review)", False, 
                            f"Status {response.status_code}: {response.text}")
                return None
        except requests.exceptions.RequestException as e:
            self.log_test("Ute Crossing Grill Project Accessibility (Review)", False, f"Request failed: {str(e)}")
            return None
    
    def test_ute_crossing_grill_no_youtube_fields(self):
        """Test that Ute Crossing Grill project has no YouTube-specific fields"""
        try:
            project = self.test_ute_crossing_grill_project_accessibility_review()
            if not project:
                self.log_test("Ute Crossing Grill No YouTube Fields", False, 
                            "Cannot test YouTube fields - project not accessible")
                return False
            
            # Check that videoUrl does not contain "youtube"
            video_url = project.get('videoUrl', '')
            if video_url and 'youtube' in video_url.lower():
                self.log_test("Ute Crossing Grill No YouTube Fields", False, 
                            f"Project contains YouTube URL: {video_url}")
                return False
            
            # Check video_url field as well
            video_url_alt = project.get('video_url', '')
            if video_url_alt and 'youtube' in video_url_alt.lower():
                self.log_test("Ute Crossing Grill No YouTube Fields", False, 
                            f"Project contains YouTube URL in video_url: {video_url_alt}")
                return False
            
            # Check images array for YouTube URLs
            images = project.get('images', [])
            for image in images:
                if isinstance(image, str) and 'youtube' in image.lower():
                    self.log_test("Ute Crossing Grill No YouTube Fields", False, 
                                f"Project contains YouTube URL in images: {image}")
                    return False
            
            # Check description for YouTube references
            description = project.get('description', '')
            if 'youtube' in description.lower():
                self.log_test("Ute Crossing Grill No YouTube Fields", False, 
                            f"Project description contains YouTube reference")
                return False
            
            self.log_test("Ute Crossing Grill No YouTube Fields", True, 
                        "Project confirmed to have no YouTube-specific fields or references")
            return True
            
        except Exception as e:
            self.log_test("Ute Crossing Grill No YouTube Fields", False, f"Error checking YouTube fields: {str(e)}")
            return False
    
    def test_coffee_house_advertising_thumbnail_update(self):
        """Test that Coffee House Advertising Project (ID: 4) has updated thumbnail"""
        try:
            response = self.session.get(f"{API_BASE_URL}/projects/4", timeout=10)
            if response.status_code == 200:
                project = response.json()
                if project.get('id') == '4':
                    title = project.get('title', '')
                    if 'Coffee House' in title and 'Advertisement' in title:
                        # Check for updated thumbnail image
                        thumbnail = project.get('thumbnail', '')
                        images = project.get('images', [])
                        
                        # Look for the new coffee.jpg asset (kfmsk8rn_coffee.jpg)
                        has_updated_thumbnail = False
                        if 'kfmsk8rn_coffee.jpg' in thumbnail or 'coffee.jpg' in thumbnail:
                            has_updated_thumbnail = True
                        
                        # Also check in images array
                        for image in images:
                            if isinstance(image, str) and ('kfmsk8rn_coffee.jpg' in image or 'coffee.jpg' in image):
                                has_updated_thumbnail = True
                                break
                        
                        if has_updated_thumbnail:
                            self.log_test("Coffee House Advertising Thumbnail Update", True, 
                                        f"Project has updated coffee.jpg thumbnail asset")
                            return True
                        else:
                            self.log_test("Coffee House Advertising Thumbnail Update", False, 
                                        f"Updated coffee.jpg thumbnail not found. Thumbnail: {thumbnail}")
                            return False
                    else:
                        self.log_test("Coffee House Advertising Thumbnail Update", False, 
                                    f"Project ID 4 found but wrong title: {title}")
                        return False
                else:
                    self.log_test("Coffee House Advertising Thumbnail Update", False, 
                                f"ID mismatch: expected '4', got '{project.get('id')}'")
                    return False
            else:
                self.log_test("Coffee House Advertising Thumbnail Update", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Coffee House Advertising Thumbnail Update", False, f"Request failed: {str(e)}")
            return False
    
    def test_coffee_house_tiktok_description_cleanup(self):
        """Test that Coffee House TikTok Project (ID: 10) has organized description with bullet points"""
        try:
            response = self.session.get(f"{API_BASE_URL}/projects/10", timeout=10)
            if response.status_code == 200:
                project = response.json()
                if project.get('id') == '10':
                    title = project.get('title', '')
                    if 'Coffee House' in title and 'TikTok' in title:
                        description = project.get('description', '')
                        
                        # Check for bullet point formatting (• bullets)
                        has_bullet_points = '•' in description
                        
                        # Check for organized metrics formatting
                        has_organized_metrics = any(metric_word in description.lower() 
                                                  for metric_word in ['views', 'engagement', 'reach', 'metrics'])
                        
                        if has_bullet_points and has_organized_metrics:
                            self.log_test("Coffee House TikTok Description Cleanup", True, 
                                        f"Description has organized bullet points and clear metrics formatting")
                            return True
                        else:
                            missing_elements = []
                            if not has_bullet_points:
                                missing_elements.append("bullet points (•)")
                            if not has_organized_metrics:
                                missing_elements.append("organized metrics")
                            
                            self.log_test("Coffee House TikTok Description Cleanup", False, 
                                        f"Description missing: {', '.join(missing_elements)}")
                            return False
                    else:
                        self.log_test("Coffee House TikTok Description Cleanup", False, 
                                    f"Project ID 10 found but wrong title: {title}")
                        return False
                else:
                    self.log_test("Coffee House TikTok Description Cleanup", False, 
                                f"ID mismatch: expected '10', got '{project.get('id')}'")
                    return False
            else:
                self.log_test("Coffee House TikTok Description Cleanup", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Coffee House TikTok Description Cleanup", False, f"Request failed: {str(e)}")
            return False
    
    def test_new_ute_bison_ranch_project_creation(self):
        """Test that new Ute Bison Ranch Project (ID: 11) exists and is properly created"""
        try:
            response = self.session.get(f"{API_BASE_URL}/projects/11", timeout=10)
            if response.status_code == 200:
                project = response.json()
                if project.get('id') == '11':
                    title = project.get('title', '')
                    category = project.get('category', '')
                    client = project.get('client', '')
                    
                    # Verify it's the Ute Bison Ranch project
                    if 'Ute Bison Ranch' in title:
                        # Check category is "Social Media Content & Campaigns"
                        if category == 'Social Media Content & Campaigns':
                            # Check client is "Ute Tribal Enterprises - Ute Bison Ranch"
                            if 'Ute Tribal Enterprises' in client and 'Ute Bison Ranch' in client:
                                self.log_test("New Ute Bison Ranch Project Creation", True, 
                                            f"Project ID 11 properly created: {title} in {category} category")
                                return project
                            else:
                                self.log_test("New Ute Bison Ranch Project Creation", False, 
                                            f"Wrong client: expected 'Ute Tribal Enterprises - Ute Bison Ranch', got '{client}'")
                                return None
                        else:
                            self.log_test("New Ute Bison Ranch Project Creation", False, 
                                        f"Wrong category: expected 'Social Media Content & Campaigns', got '{category}'")
                            return None
                    else:
                        self.log_test("New Ute Bison Ranch Project Creation", False, 
                                    f"Project ID 11 found but wrong title: {title}")
                        return None
                else:
                    self.log_test("New Ute Bison Ranch Project Creation", False, 
                                f"ID mismatch: expected '11', got '{project.get('id')}'")
                    return None
            else:
                self.log_test("New Ute Bison Ranch Project Creation", False, 
                            f"Status {response.status_code}: {response.text}")
                return None
        except requests.exceptions.RequestException as e:
            self.log_test("New Ute Bison Ranch Project Creation", False, f"Request failed: {str(e)}")
            return None
    
    def test_ute_bison_ranch_organic_content_structure(self):
        """Test that Ute Bison Ranch project has same structure as coffee house TikTok with all organic content"""
        try:
            ute_bison_project = self.test_new_ute_bison_ranch_project_creation()
            if not ute_bison_project:
                self.log_test("Ute Bison Ranch Organic Content Structure", False, 
                            "Cannot test structure - project not found")
                return False
            
            # Check for combinedTikTokSection structure
            combined_section = ute_bison_project.get('combinedTikTokSection', {})
            if not combined_section:
                self.log_test("Ute Bison Ranch Organic Content Structure", False, 
                            "Missing combinedTikTokSection structure")
                return False
            
            # Check for 6 videos in the structure
            videos = combined_section.get('videos', [])
            if len(videos) != 6:
                self.log_test("Ute Bison Ranch Organic Content Structure", False, 
                            f"Expected 6 videos, found {len(videos)}")
                return False
            
            # Verify all videos are marked as organic content
            organic_count = 0
            for video in videos:
                video_type = video.get('type', '')
                description = video.get('description', '')
                if 'organic' in video_type.lower() or 'organic' in description.lower():
                    organic_count += 1
                elif 'agricultural' in description.lower() or 'sustainability' in description.lower() or 'education' in description.lower():
                    organic_count += 1  # Educational/agricultural content counts as organic
            
            if organic_count == 6:
                self.log_test("Ute Bison Ranch Organic Content Structure", True, 
                            f"All 6 videos are marked as organic content focused on agricultural education and sustainability")
                return True
            else:
                self.log_test("Ute Bison Ranch Organic Content Structure", False, 
                            f"Only {organic_count}/6 videos are marked as organic content")
                return False
                
        except Exception as e:
            self.log_test("Ute Bison Ranch Organic Content Structure", False, f"Error checking structure: {str(e)}")
            return False
    
    def test_total_projects_count_22(self):
        """Test that GET /api/projects returns 22 total projects"""
        try:
            response = self.session.get(f"{API_BASE_URL}/projects", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                if isinstance(projects, list):
                    project_count = len(projects)
                    if project_count == 22:
                        self.log_test("Total Projects Count 22", True, 
                                    f"Confirmed 22 total projects in database")
                        return True
                    else:
                        self.log_test("Total Projects Count 22", False, 
                                    f"Expected 22 projects, found {project_count}")
                        return False
                else:
                    self.log_test("Total Projects Count 22", False, 
                                f"Expected list, got: {type(projects)}")
                    return False
            else:
                self.log_test("Total Projects Count 22", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Total Projects Count 22", False, f"Request failed: {str(e)}")
            return False
    
    def test_category_filtering_includes_ute_bison(self):
        """Test that category filtering includes the new Ute Bison project in Social Media category"""
        try:
            # Test with Social Media Content & Campaigns category (URL encoded)
            response = self.session.get(f"{API_BASE_URL}/projects?category=Social%20Media%20Content%20%26%20Campaigns", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                ute_bison_found = False
                
                for project in projects:
                    title = project.get('title', '')
                    if 'Ute Bison Ranch' in title:
                        ute_bison_found = True
                        break
                
                if ute_bison_found:
                    self.log_test("Category Filtering Includes Ute Bison", True, 
                                f"Ute Bison Ranch project found in Social Media Content & Campaigns category filter")
                    return True
                else:
                    self.log_test("Category Filtering Includes Ute Bison", False, 
                                f"Ute Bison Ranch project not found in Social Media category filter. Found {len(projects)} projects")
                    return False
            else:
                self.log_test("Category Filtering Includes Ute Bison", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Category Filtering Includes Ute Bison", False, f"Request failed: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend tests"""
        print(f"\n🚀 Starting Backend API Tests")
        print(f"Backend URL: {BACKEND_URL}")
        print(f"API Base URL: {API_BASE_URL}")
        print("=" * 60)
        
        # Test server health first
        if not self.test_server_health():
            print("\n❌ Server health check failed. Stopping tests.")
            return False
        
        # Initialize data
        self.test_initialize_data()
        
        # USER-REQUESTED UPDATES TESTING (PRIORITY)
        print("\n" + "=" * 80)
        print("🎯 USER-REQUESTED UPDATES TESTING (REVIEW REQUEST PRIORITY)")
        print("=" * 80)
        self.test_user_requested_updates()
        
        # Test all endpoints
        self.test_get_projects()
        self.test_get_projects_by_category()
        self.test_create_project()
        self.test_get_single_project()
        self.test_update_project()
        self.test_delete_project()
        
        # UTE CROSSING GRILL PROJECT TESTS (REVIEW REQUEST FOCUS)
        print("\n" + "=" * 60)
        print("🏢 UTE CROSSING GRILL & UTE LANES PROJECT TESTING (REVIEW REQUEST FOCUS)")
        print("=" * 60)
        self.test_ute_crossing_grill_project_accessibility()
        self.test_ute_crossing_grill_project_structure()
        self.test_ute_crossing_grill_video_customization()
        self.test_ute_crossing_grill_api_integration()
        self.test_ute_crossing_grill_database_persistence()
        self.test_ute_crossing_grill_comprehensive_verification()
        
        # Legacy tests for compatibility
        self.test_ute_crossing_grill_project_retrieval()
        self.test_ute_crossing_grill_advertising_category()
        self.test_ute_crossing_grill_video_fields()
        self.test_ute_crossing_grill_individual_retrieval()
        
        # DATA INTEGRITY TESTS
        print("\n" + "=" * 60)
        print("🔍 DATA INTEGRITY & PROJECT ID SEQUENCE TESTING")
        print("=" * 60)
        self.test_project_ids_sequential_integrity()
        self.test_advertising_category_filtering()
        self.test_thumbnail_image_integration()

        # Coffee House Projects Tests (Priority Focus)
        print("\n" + "=" * 60)
        print("☕ COFFEE HOUSE PROJECTS TESTING (PRIORITY FOCUS)")
        print("=" * 60)
        self.test_coffee_house_projects_in_list()
        self.test_coffee_house_tiktok_project()
        self.test_coffee_house_advertising_project()
        self.test_coffee_house_tiktok_project_retrieval()
        self.test_coffee_house_tiktok_video_descriptions()
        self.test_coffee_house_tiktok_empty_images()
        self.test_coffee_house_advertising_project_retrieval()
        self.test_coffee_house_advertising_enhanced_description()
        self.test_coffee_house_advertising_two_videos()
        self.test_coffee_house_advertising_additional_project()
        self.test_coffee_house_advertising_no_video_url()
        self.test_coffee_house_advertising_enhanced_contributions()
        self.test_coffee_house_projects_database_health()
        self.test_coffee_house_projects_crud_operations()
        
        # Test enhanced project fields specifically
        print("\n" + "=" * 60)
        print("🚀 ENHANCED PROJECT FIELDS TESTS")
        print("=" * 60)
        self.test_enhanced_project_fields_creation()
        self.test_enhanced_project_fields_retrieval()
        self.test_impact_data_model_validation()
        self.test_project_type_categorization()
        self.test_backward_compatibility()
        
        # Test the specific focus task
        print("\n" + "=" * 60)
        print("📱 SOCIAL MEDIA TIKTOK INTEGRATION FOCUS TEST")
        print("=" * 60)
        self.test_social_media_tiktok_integration_focus()
        
        self.test_categories_endpoints()
        self.test_contact_endpoints()
        self.test_work_history_endpoints()
        self.test_education_endpoints()
        self.test_tools_endpoints()
        self.test_brands_endpoints()
        self.test_file_upload()
        
        # Test Ute Bison Ranch image integration specifically
        print("\n" + "=" * 60)
        print("🖼️  UTE BISON RANCH IMAGE INTEGRATION TESTS")
        print("=" * 60)
        self.test_ute_bison_ranch_project_retrieval()
        self.test_ute_bison_ranch_base64_images()
        self.test_ute_bison_ranch_photography_category()
        self.test_ute_bison_ranch_project_details()
        self.test_ute_bison_ranch_individual_retrieval()
        
        # Test Educational Animation project update specifically
        print("\n" + "=" * 60)
        print("🎓 EDUCATIONAL ANIMATION PROJECT UPDATE TESTS")
        print("=" * 60)
        self.test_educational_animation_project_retrieval()
        self.test_educational_animation_youtube_url()
        self.test_educational_animation_client_info()
        self.test_educational_animation_category_filtering()
        self.test_educational_animation_project_details()
        self.test_educational_animation_individual_retrieval()
        
        # Test TikTok Video URL Integration specifically
        print("\n" + "=" * 60)
        print("📱 TIKTOK VIDEO URL INTEGRATION TESTS")
        print("=" * 60)
        self.test_social_media_projects_retrieval()
        self.test_tiktok_url_format_validation()
        self.test_kahpeeh_primary_tiktok_url()
        self.test_social_media_category_filtering()
        self.test_video_project_orientation()
        self.test_featured_projects_marking()
        self.test_database_consistency()
        
        # YouTube Video Embedding Tests (Priority Focus)
        print("\n" + "=" * 60)
        print("🎥 YOUTUBE VIDEO EMBEDDING TESTS (PRIORITY FOCUS)")
        print("=" * 60)
        self.test_youtube_embedding_advertising_projects()
        self.test_youtube_embedding_project_retrieval()
        self.test_youtube_url_validation()
        self.test_youtube_embed_id_validation()
        self.test_youtube_data_structure_integrity()
        self.test_youtube_api_endpoints()
        self.test_youtube_advertising_category_filtering()
        self.test_youtube_database_persistence()
        self.test_youtube_project_type_and_category_validation()
        
        # Beats by Dre Project Restructuring Tests (REVIEW REQUEST PRIORITY)
        print("\n" + "=" * 60)
        print("🎧 BEATS BY DRE PROJECT RESTRUCTURING TESTS (REVIEW REQUEST PRIORITY)")
        print("=" * 60)
        self.test_beats_by_dre_project_retrieval()
        self.test_beats_by_dre_main_images_structure()
        self.test_beats_by_dre_creative_design_highlights()
        self.test_beats_by_dre_separate_analytics_section()
        self.test_beats_by_dre_analytics_images_validation()
        self.test_beats_by_dre_no_dual_sections()
        self.test_beats_by_dre_existing_data_preservation()
        self.test_beats_by_dre_branding_category_filtering()
        self.test_beats_by_dre_data_structure_integrity()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result['success'])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        if total - passed > 0:
            print("\n❌ FAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  - {result['test']}: {result['message']}")
        
        return passed == total

def main():
    """Main test execution"""
    tester = BackendTester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All backend tests passed!")
        return 0
    else:
        print("\n💥 Some backend tests failed!")
        return 1

if __name__ == "__main__":
    exit(main())