from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.routers.itinerary import router as itinerary_router
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# CORS middleware MUST be added before routes
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
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


@app.get("/")
def read_root():
    return {"message": "Voyagr Backend is Running!"}
