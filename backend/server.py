from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
import base64
import json

# Import our models
from models import (
    Project, ProjectCreate, ProjectUpdateRequest,
    Category, CategoryCreate,
    ContactInfo, ContactInfoCreate,
    WorkHistory, WorkHistoryCreate,
    Education, EducationCreate,
    Tool, ToolCreate,
    Brand, BrandCreate,
    AnalyticsData
)


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Portfolio API v1.0.0"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]


# PROJECT ROUTES
@api_router.post("/projects", response_model=Project)
async def create_project(project: ProjectCreate):
    """Create a new project"""
    try:
        project_dict = project.dict()
        project_obj = Project(**project_dict)
        await db.projects.insert_one(project_obj.dict())
        return project_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/projects", response_model=List[Project])
async def get_projects(category: Optional[str] = None):
    """Get all projects or filter by category"""
    try:
        if category and category != "All":
            projects = await db.projects.find({"category": category}).to_list(1000)
        else:
            projects = await db.projects.find().to_list(1000)
        return [Project(**project) for project in projects]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    """Get a specific project by ID"""
    try:
        project = await db.projects.find_one({"id": project_id})
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        return Project(**project)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.put("/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, project_update: ProjectUpdateRequest):
    """Update a project"""
    try:
        existing_project = await db.projects.find_one({"id": project_id})
        if not existing_project:
            raise HTTPException(status_code=404, detail="Project not found")
        
        update_dict = {k: v for k, v in project_update.dict().items() if v is not None}
        update_dict["updated_at"] = datetime.utcnow()
        
        await db.projects.update_one({"id": project_id}, {"$set": update_dict})
        
        updated_project = await db.projects.find_one({"id": project_id})
        return Project(**updated_project)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.delete("/projects/{project_id}")
async def delete_project(project_id: str):
    """Delete a project"""
    try:
        result = await db.projects.delete_one({"id": project_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Project not found")
        return {"message": "Project deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# CATEGORY ROUTES
@api_router.post("/categories", response_model=Category)
async def create_category(category: CategoryCreate):
    """Create a new category"""
    try:
        category_dict = category.dict()
        category_obj = Category(**category_dict)
        await db.categories.insert_one(category_obj.dict())
        return category_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/categories", response_model=List[Category])
async def get_categories():
    """Get all categories"""
    try:
        categories = await db.categories.find().to_list(1000)
        return [Category(**category) for category in categories]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# CONTACT INFO ROUTES
@api_router.post("/contact", response_model=ContactInfo)
async def create_or_update_contact_info(contact: ContactInfoCreate):
    """Create or update contact information"""
    try:
        # Check if contact info already exists
        existing_contact = await db.contact_info.find_one()
        
        if existing_contact:
            # Update existing contact info
            update_dict = contact.dict()
            update_dict["updated_at"] = datetime.utcnow()
            await db.contact_info.update_one({"id": existing_contact["id"]}, {"$set": update_dict})
            updated_contact = await db.contact_info.find_one({"id": existing_contact["id"]})
            return ContactInfo(**updated_contact)
        else:
            # Create new contact info
            contact_dict = contact.dict()
            contact_obj = ContactInfo(**contact_dict)
            await db.contact_info.insert_one(contact_obj.dict())
            return contact_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/contact", response_model=ContactInfo)
async def get_contact_info():
    """Get contact information"""
    try:
        contact = await db.contact_info.find_one()
        if not contact:
            raise HTTPException(status_code=404, detail="Contact information not found")
        return ContactInfo(**contact)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# WORK HISTORY ROUTES
@api_router.post("/work-history", response_model=WorkHistory)
async def create_work_history(work: WorkHistoryCreate):
    """Create a new work history entry"""
    try:
        work_dict = work.dict()
        work_obj = WorkHistory(**work_dict)
        await db.work_history.insert_one(work_obj.dict())
        return work_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/work-history", response_model=List[WorkHistory])
async def get_work_history():
    """Get all work history entries"""
    try:
        work_history = await db.work_history.find().sort("created_at", -1).to_list(1000)
        return [WorkHistory(**work) for work in work_history]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# EDUCATION ROUTES
@api_router.post("/education", response_model=Education)
async def create_or_update_education(education: EducationCreate):
    """Create or update education information"""
    try:
        # Check if education info already exists
        existing_education = await db.education.find_one()
        
        if existing_education:
            # Update existing education info
            update_dict = education.dict()
            update_dict["updated_at"] = datetime.utcnow()
            await db.education.update_one({"id": existing_education["id"]}, {"$set": update_dict})
            updated_education = await db.education.find_one({"id": existing_education["id"]})
            return Education(**updated_education)
        else:
            # Create new education info
            education_dict = education.dict()
            education_obj = Education(**education_dict)
            await db.education.insert_one(education_obj.dict())
            return education_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/education", response_model=Education)
async def get_education():
    """Get education information"""
    try:
        education = await db.education.find_one()
        if not education:
            raise HTTPException(status_code=404, detail="Education information not found")
        return Education(**education)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# TOOLS ROUTES
@api_router.post("/tools", response_model=Tool)
async def create_tool(tool: ToolCreate):
    """Create a new tool"""
    try:
        tool_dict = tool.dict()
        tool_obj = Tool(**tool_dict)
        await db.tools.insert_one(tool_obj.dict())
        return tool_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/tools", response_model=List[Tool])
async def get_tools():
    """Get all tools"""
    try:
        tools = await db.tools.find().to_list(1000)
        return [Tool(**tool) for tool in tools]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# BRANDS ROUTES
@api_router.post("/brands", response_model=Brand)
async def create_brand(brand: BrandCreate):
    """Create a new brand"""
    try:
        brand_dict = brand.dict()
        brand_obj = Brand(**brand_dict)
        await db.brands.insert_one(brand_obj.dict())
        return brand_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/brands", response_model=List[Brand])
async def get_brands():
    """Get all brands"""
    try:
        brands = await db.brands.find().to_list(1000)
        return [Brand(**brand) for brand in brands]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# FILE UPLOAD ROUTE
@api_router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload a file and return base64 encoded string"""
    try:
        contents = await file.read()
        base64_encoded = base64.b64encode(contents).decode('utf-8')
        return {
            "filename": file.filename,
            "content_type": file.content_type,
            "size": len(contents),
            "base64_data": f"data:{file.content_type};base64,{base64_encoded}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# INITIALIZE DATA ROUTE
@api_router.post("/initialize-data")
async def initialize_data():
    """Initialize the database with mock data"""
    try:
        # Check if data already exists
        existing_projects = await db.projects.count_documents({})
        if existing_projects > 0:
            return {"message": "Data already initialized"}
        
        # Initialize with mock data from frontend
        from data.initialize_mock_data import initialize_mock_data
        await initialize_mock_data(db)
        
        return {"message": "Database initialized with mock data successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
