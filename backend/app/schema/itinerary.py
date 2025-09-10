# backend/app/schemas/itinerary.py
from pydantic import BaseModel, Field
from typing import List, Optional

class Activity(BaseModel):
    time: str = Field(..., description="HH:MM or block label")
    title: str
    description: Optional[str] = None
    address: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    cost_estimate: Optional[float] = None
    booking_link: Optional[str] = None
    place_id: str | None = None      # e.g., Mapbox feature id like "poi.123..."
    place_source: str | None = None  # "mapbox"


class DayPlan(BaseModel):
    date: str  # ISO date
    city: str
    weather_summary: Optional[str] = None
    activities: List[Activity]

class Itinerary(BaseModel):
    destination: str
    start_date: str
    end_date: str
    travelers: int
    budget_tier: str  # "low" | "mid" | "high"
    themes: List[str] = []
    notes: Optional[str] = None
    days: List[DayPlan]

class ItineraryResponse(BaseModel):
    itinerary_markdown: str
