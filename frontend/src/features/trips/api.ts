import { api } from "../../lib/apiClient";
import type { BackendTripIdea } from "./types";

export async function getHealth() {
  const { data } = await api.get("/health");
  return data;
}

export async function generateTripIdeas(payload: { budget: number; interests: string }): Promise<BackendTripIdea[]> {
  const { data } = await api.post("/api/v1/itinerary/generate", payload);
  return data.ideas;
}
