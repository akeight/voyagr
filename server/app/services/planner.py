from app.services.places import PlaceResolver
USE_MAPS = os.getenv("MAPS_ENABLED", "false").lower() == "true"
resolver = PlaceResolver()  # swap to MapboxResolver later

itinerary = await planner.plan(req)          # LLM step (no coords)
itinerary = await resolver.enrich(itinerary) # no-op today
return itinerary