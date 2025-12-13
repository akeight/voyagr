from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from app.api.v1.routers.itinerary import router as itinerary_router

app = FastAPI()

# CORS middleware MUST be added before routes
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the itinerary router AFTER CORS middleware
app.include_router(itinerary_router, prefix="/api/v1/itinerary", tags=["itinerary"])

class TripRequest(BaseModel):
    budget: int
    interests: str

# This is mock data. In a real application, you would use an LLM
# or a more sophisticated trip generation logic.
mock_db = {
    "hiking": {
        "title": "Appalachian Adventure",
        "destination": "Shenandoah National Park, Virginia",
        "duration": "4 Days",
        "budget": 950,
        "theme": "Nature & Hiking",
        "image": "https://placehold.co/600x400/22c55e/ffffff?text=Hiking+Trip",
        "itinerary": [
          {"day": 1, "activity": "Arrive, set up camp or check into a lodge. Short sunset hike.", "icon_name": "Mountain"},
          {"day": 2, "activity": "Full-day hike on the Stony Man trail.", "icon_name": "Mountain"},
          {"day": 3, "activity": "Scenic drive along Skyline Drive, stopping at overlooks.", "icon_name": "Plane"},
          {"day": 4, "activity": "Morning walk and breakfast before departure.", "icon_name": "Pizza"},
        ]
    },
    "museums": {
        "title": "Cultural Capital",
        "destination": "Washington, D.C.",
        "duration": "3 Days",
        "budget": 1100,
        "theme": "History & Culture",
        "image": "https://placehold.co/600x400/8b5cf6/ffffff?text=Museum+Tour",
        "itinerary": [
            {"day": 1, "activity": "Arrive, visit the National Mall and monuments.", "icon_name": "Landmark"},
            {"day": 2, "activity": "Explore the Smithsonian Museums (Air and Space, Natural History).", "icon_name": "Landmark"},
            {"day": 3, "activity": "Visit the National Gallery of Art before heading home.", "icon_name": "Landmark"},
        ]
    },
    "default": {
        "title": "Surprise Urban Getaway",
        "destination": "Chicago, Illinois",
        "duration": "3 Days",
        "budget": 1300,
        "theme": "City Exploration",
        "image": "https://placehold.co/600x400/f97316/ffffff?text=City+Escape",
        "itinerary": [
            {"day": 1, "activity": "Arrive and explore Millennium Park and The Bean.", "icon_name": "Landmark"},
            {"day": 2, "activity": "Architecture river cruise and visit the Art Institute.", "icon_name": "Plane"},
            {"day": 3, "activity": "Enjoy deep-dish pizza and head to the airport.", "icon_name": "Pizza"},
        ]
    }
}


@app.get("/")
def read_root():
    return {"message": "Voyagr Backend is Running!"}

@app.post("/generate-trip-ideas")
def generate_trip_ideas(trip_request: TripRequest):
    """
    This endpoint simulates generating trip ideas based on user input.
    In a real application, this would involve a call to a generative AI model.
    """
    interests = trip_request.interests.lower()
    
    # Simple logic to return a mock trip based on the first keyword found
    idea = mock_db.get("default")
    if "hiking" in interests or "nature" in interests:
        idea = mock_db.get("hiking")
    elif "museums" in interests or "history" in interests:
        idea = mock_db.get("museums")

    # Adjust budget in response to match request
    idea['budget'] = trip_request.budget

    # We return a list to match the frontend's expectation
    return {"ideas": [idea]}