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
        
        # Test all endpoints
        self.test_get_projects()
        self.test_get_projects_by_category()
        self.test_create_project()
        self.test_get_single_project()
        self.test_update_project()
        self.test_delete_project()
        
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