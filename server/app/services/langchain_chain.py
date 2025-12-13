from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI
from app.core.config import settings
from .rag import get_retriever

SYSTEM = (
    "You are a precise travel planner. Use the provided CONTEXT for facts "
    "(hours, neighborhoods, kid-friendliness). If info is missing, say so. "
    "Make a feasible, time-boxed day-by-day plan. Return your response as valid JSON."
)

JSON_SCHEMA = """{
  "title": "Adventure in Paris",
  "destination": "Paris, France",
  "duration": "5 Days",
  "budget": 1500,
  "theme": "History & Culture",
  "image": "https://placehold.co/600x400/22c55e/ffffff?text=Trip",
  "itinerary": [
    {
      "day": 1,
      "activity": "Arrive and explore the Eiffel Tower and nearby attractions",
      "icon_name": "Landmark"
    },
    {
      "day": 2,
      "activity": "Visit the Louvre Museum and enjoy local cuisine",
      "icon_name": "Museum"
    }
  ]
}

Note: 
- "title" should be a catchy string describing the trip
- "destination" should be the full destination name
- "duration" should be a string like "3 Days" or "5 Days"
- "budget" should be a number (total budget estimate)
- "theme" should be a string like "Nature & Hiking", "History & Culture", or "City Exploration"
- "image" should be a placeholder image URL
- "itinerary" is an array of objects, each with:
  - "day": a number (1, 2, 3, etc.)
  - "activity": a string describing the day's activities
  - "icon_name": a string from: Mountain, Landmark, Plane, Pizza, Beach, Museum, etc."""

PROMPT = ChatPromptTemplate.from_messages([
    ("system", SYSTEM),
    ("human",
     "Destination: {destination}\nDates: {start_date} to {end_date}\n"
     "Travelers: {travelers}\nInterests: {interests}\nBudget: {budget}\nNotes: {notes}\n\n"
     "CONTEXT:\n{context}\n\n"
     "Return a JSON object matching this schema:\n{json_schema}\n\n"
     "Write the itinerary. Prefer items from CONTEXT; avoid guessing. Return ONLY valid JSON, no markdown formatting.")
])

def _query(inputs: dict) -> str:
    # Be defensive in case keys are missing or types vary
    city = inputs.get("destination", "")
    interests = inputs.get("interests", [])
    if isinstance(interests, list):
        interests = ", ".join(interests)
    return (
        f"{city} family-friendly highlights with hours, neighborhoods, indoor backups, "
        f"walkability, transit notes, and low-cost options. Interests: {interests}"
    )

def _format_docs(docs) -> str:
    return "\n\n".join(d.page_content for d in docs)

def build_itinerary_chain():
    llm = ChatOpenAI(
        model=settings.openai_model,
        temperature=0.3,
        api_key=settings.openai_api_key,
        base_url=settings.openai_base_url or None,
    )
    retriever = get_retriever()
    json_parser = JsonOutputParser()

    # Add "context" onto the ORIGINAL input (don't wrap it inside "passthrough")
    chain = (
        RunnablePassthrough.assign(
            context=(lambda x: _query(x)) | retriever | _format_docs,
            json_schema=lambda x: JSON_SCHEMA
        )
        | PROMPT
        | llm
        | json_parser
    )
    return chain
