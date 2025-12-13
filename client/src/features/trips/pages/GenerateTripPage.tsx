import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTrips } from "../context";
import { generateTripIdeas } from "../api";
import { MapSection, type Activity as MapActivity } from "../components/ItineraryMap";

function flattenActivities(itin: any): MapActivity[] {
  if (!itin?.days) return [];
  return itin.days.flatMap((d: any) =>
    (d.activities ?? []).map((a: any) => ({
      title: a.title,
      address: a.address,
      lat: a.lat,
      lon: a.lon,
      date: d.date
    }))
  );
}

export default function GenerateTripPage() {
  const [destination, setDestination] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [travelers, setTravelers] = useState<number>(2);
  const [budget, setBudget] = useState<number>(1000);
  const [interests, setInterests] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const navigate = useNavigate();
  const { setIsLoading, setTripIdeas } = useTrips();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await generateTripIdeas({ 
        destination,
        start_date: startDate,
        end_date: endDate,
        travelers,
        budget,
        interests,
        notes
      });
      // Store the structured trip ideas
      setTripIdeas(result);
      setIsLoading(false);
      navigate("/ideas");
    } catch (error) {
      console.error("Failed to generate trip ideas:", error);
      setIsLoading(false);
      //  add error handling to show error message to user
    }
  };

 

  return (
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Plan Your Next Adventure</h2>
          <p className="text-gray-400">Tell us your budget and interests to get started.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="destination" className="block text-sm font-medium text-gray-300 mb-2">
              Destination
            </label>
            <input
              id="destination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g., Paris, France"
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-300 mb-2">
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-300 mb-2">
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="travelers" className="block text-sm font-medium text-gray-300 mb-2">
              Number of Travelers
            </label>
            <input
              id="travelers"
              type="number"
              min="1"
              value={travelers}
              onChange={(e) => setTravelers(parseInt(e.target.value))}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
              What's your budget?
            </label>
            <div className="relative">
              <input
                id="budget"
                type="range"
                min={100}
                max={5000}
                step={100}
                value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center text-teal-400 font-bold mt-2 text-lg">
                ${budget}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="interests" className="block text-sm font-medium text-gray-300 mb-2">
              What are your interests?
            </label>
            <input
              id="interests"
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g., hiking, museums, beaches, food"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-2">
              Additional Notes (optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requirements or preferences..."
              rows={3}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-400 text-white font-bold py-3 px-4 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
          >
            Generate Trip Ideas
          </button>
        </form>
      </div>
    </div>
  );
}
