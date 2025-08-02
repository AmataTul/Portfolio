from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid


class AnalyticsData(BaseModel):
    achievement: str
    competition_level: str
    duration: str
    key_metrics: Dict[str, Any]
    strategic_decisions: List[str]
    competitive_advantage: str


class ImpactData(BaseModel):
    quantified_metrics: Optional[List[str]] = None  # e.g., ["300% increase in engagement", "85% boost in sales"]
    qualitative_outcomes: Optional[List[str]] = None  # e.g., ["Enhanced brand awareness", "Improved user experience"]


class ProjectCreate(BaseModel):
    title: str
    category: str
    client: str
    description: str
    images: List[str]  # Base64 encoded images
    project_type: str = "Digital Marketing"  # More descriptive project type
    type: str = "image"  # Media type: image, video, analytics, presentation
    featured: bool = False
    orientation: str = "horizontal"  # horizontal, vertical, square
    video_url: Optional[str] = None
    youtubeEmbedId: Optional[str] = None  # YouTube video ID for embedding
    analytics: Optional[AnalyticsData] = None
    research_slides: Optional[List[Dict[str, str]]] = None
    key_contributions: Optional[List[str]] = None  # Bullet points of specific contributions
    skills_utilized: Optional[List[str]] = None  # Project-specific skills and tools
    impact: Optional[ImpactData] = None  # Both quantified and qualitative impact


class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str
    client: str
    description: str
    images: List[str]
    project_type: str = "Digital Marketing"  # More descriptive project type
    type: str = "image"  # Media type: image, video, analytics, presentation
    featured: bool = False
    orientation: str = "horizontal"
    video_url: Optional[str] = None
    analytics: Optional[AnalyticsData] = None
    research_slides: Optional[List[Dict[str, str]]] = None
    key_contributions: Optional[List[str]] = None  # Bullet points of specific contributions
    skills_utilized: Optional[List[str]] = None  # Project-specific skills and tools
    impact: Optional[ImpactData] = None  # Both quantified and qualitative impact
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class CategoryCreate(BaseModel):
    name: str
    description: str


class Category(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


class ContactInfoCreate(BaseModel):
    name: str
    email: str
    linkedin: str
    phone: str
    location: str


class ContactInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    linkedin: str
    phone: str
    location: str
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class WorkHistoryCreate(BaseModel):
    position: str
    company: str
    location: str
    period: str
    achievements: List[str]


class WorkHistory(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    position: str
    company: str
    location: str
    period: str
    achievements: List[str]
    created_at: datetime = Field(default_factory=datetime.utcnow)


class EducationCreate(BaseModel):
    degree: str
    minor: str
    university: str
    honor: str
    period: str


class Education(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    degree: str
    minor: str
    university: str
    honor: str
    period: str
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class ToolCreate(BaseModel):
    name: str
    category: str


class Tool(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


class BrandCreate(BaseModel):
    name: str


class Brand(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


class ProjectUpdateRequest(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    client: Optional[str] = None
    description: Optional[str] = None
    images: Optional[List[str]] = None
    project_type: Optional[str] = None
    type: Optional[str] = None
    featured: Optional[bool] = None
    orientation: Optional[str] = None
    video_url: Optional[str] = None
    analytics: Optional[AnalyticsData] = None
    research_slides: Optional[List[Dict[str, str]]] = None
    key_contributions: Optional[List[str]] = None
    skills_utilized: Optional[List[str]] = None
    impact: Optional[ImpactData] = None