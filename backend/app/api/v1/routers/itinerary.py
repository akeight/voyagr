from fastapi import APIRouter, Depends
from app.data.mock_db import mock_db
from pydantic import BaseModel

router = APIRouter()

class ItineraryRequest(BaseModel):
    budget: int | None = None
    interests: str | None = None

@router.post("/generate")  # or GET if you prefer
def generate_itinerary(request: ItineraryRequest):
    # Convert mock_db dictionary to list format for frontend
    ideas = []
    for key, trip in mock_db.items():
        # Add an id field and convert icon_name to match frontend structure
        trip_copy = trip.copy()
        trip_copy["id"] = len(ideas) + 1
        # For now, keep icon_name as is - frontend will need to handle this
        ideas.append(trip_copy)
    
    return {"ideas": ideas}

@router.get("/sample")
def sample_itinerary():
    return {"ideas": [mock_db["default"]]}
