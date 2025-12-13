from fastapi import APIRouter, Depends
from app.data.mock_db import mock_db
from pydantic import BaseModel
from app.services.langchain_chain import build_itinerary_chain
from app.schema.itinerary import ItineraryResponse, BackendTripIdea

router = APIRouter()

class ItineraryRequest(BaseModel):
    destination: str
    start_date: str
    end_date: str
    travelers: int
    budget: int | None = None
    interests: str | None = None
    notes: str | None = None

@router.post("/generate", response_model=ItineraryResponse)
def generate_itinerary_endpoint(payload: ItineraryRequest):
    chain = build_itinerary_chain()
    result = chain.invoke({
        "destination": payload.destination,
        "start_date": payload.start_date,
        "end_date": payload.end_date,
        "travelers": payload.travelers,
        "budget": payload.budget or 0,
        "interests": payload.interests or "",
        "notes": payload.notes or ""
    })
    
    # Add id and ensure image is a valid URL
    trip_idea = BackendTripIdea(
        id=1,
        title=result.get("title", "Generated Trip"),
        destination=result.get("destination", payload.destination),
        duration=result.get("duration", "N/A"),
        budget=result.get("budget", payload.budget or 0),
        theme=result.get("theme", "Adventure"),
        image=result.get("image", "https://placehold.co/600x400/22c55e/ffffff?text=Trip"),
        itinerary=result.get("itinerary", [])
    )
    
    return ItineraryResponse(ideas=[trip_idea])   

# @router.post("/generate")  # or GET if you prefer
# def generate_itinerary(request: ItineraryRequest):
#     # Convert mock_db dictionary to list format for frontend
#     ideas = []
#     for key, trip in mock_db.items():
#         # Add an id field and convert icon_name to match frontend structure
#         trip_copy = trip.copy()
#         trip_copy["id"] = len(ideas) + 1
#         # For now, keep icon_name as is - frontend will need to handle this
#         ideas.append(trip_copy)
    
#     return {"ideas": ideas}

@router.get("/sample")
def sample_itinerary():
    return {"ideas": [mock_db["default"]]}
