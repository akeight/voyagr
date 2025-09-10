from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI
from app.core.config import settings
from .rag import get_retriever

SYSTEM = (
    "You are a precise travel planner. Use the provided CONTEXT for facts "
    "(hours, neighborhoods, kid-friendliness). If info is missing, say so. "
    "Make a feasible, time-boxed day-by-day plan."
)

PROMPT = ChatPromptTemplate.from_messages([
    ("system", SYSTEM),
    ("human",
     "Destination: {destination}\nDates: {start_date} to {end_date}\n"
     "Travelers: {travelers}\nInterests: {interests}\nBudget: {budget}\nNotes: {notes}\n\n"
     "CONTEXT:\n{context}\n\nWrite the itinerary. Prefer items from CONTEXT; avoid guessing.")
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

    # Add "context" onto the ORIGINAL input (don’t wrap it inside "passthrough")
    chain = (
        RunnablePassthrough.assign(
            context=(lambda x: _query(x)) | retriever | _format_docs
        )
        | PROMPT
        | llm
        | StrOutputParser()
    )
    return chain
