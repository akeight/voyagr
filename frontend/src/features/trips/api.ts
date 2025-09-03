import { api } from "../../lib/apiClient";
// import type { TripIdea } from "./types";

export async function getHealth() {
  const { data } = await api.get("/health");
  return data;
}

// Example for later:
// export async function generateTripIdeas(payload: { budget: number; interests: string }): Promise<TripIdea[]> {
//   const { data } = await api.post("/generate-trip-ideas", payload);
//   return data.ideas;
// }
