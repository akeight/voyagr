import { ArrowRight, Calendar, DollarSign, MapPin } from "lucide-react";
import { useTrips } from "../context";
import ItineraryIcon from "../components/ItineraryIcon";

export default function TripIdeasPage() {
  const { tripIdeas } = useTrips();

  // Handle undefined or empty tripIdeas
  const ideas = tripIdeas || [];

  return (
    <div className="min-h-screen w-full bg-gray-900 p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Your Trip Ideas</h1>
          <a href="/generate" className="text-teal-400 hover:text-teal-300 font-semibold flex items-center">
            Plan Another Trip <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>

        <div className="flex flex-col gap-8">
          {ideas.map((idea: any, index: number) => {
            // Handle markdown response
            if (idea.itinerary_markdown) {
              return (
                <div key={index} className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-700 p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Generated Itinerary</h2>
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-gray-300 font-mono text-sm">
                      {idea.itinerary_markdown}
                    </pre>
                  </div>
                </div>
              );
            }

            // Handle structured trip idea
            return (
              <div key={idea.id || index} className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-700 flex flex-col hover:border-teal-500 transition-all duration-300">
                {idea.image && (
                  <img src={idea.image} alt={idea.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold text-white mb-2">{idea.title}</h2>
                  <div className="flex items-center text-gray-400 mb-4 space-x-4">
                    {idea.destination && (
                      <div className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-teal-400" />{idea.destination}</div>
                    )}
                    {idea.duration && (
                      <div className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-teal-400" />{idea.duration}</div>
                    )}
                    {idea.budget && (
                      <div className="flex items-center"><DollarSign className="w-4 h-4 mr-2 text-teal-400" />~${idea.budget}</div>
                    )}
                  </div>

                  {idea.theme && (
                    <div className="mb-4">
                      <span className="inline-block bg-teal-900/50 text-teal-300 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                        {idea.theme}
                      </span>
                    </div>
                  )}

                  {idea.itinerary && Array.isArray(idea.itinerary) && idea.itinerary.length > 0 && (
                    <>
                      <h3 className="text-lg font-semibold text-white mb-3 mt-auto pt-4 border-t border-gray-700">
                        Itinerary
                      </h3>
                      <ul className="space-y-3">
                        {idea.itinerary.map((item: any, itemIndex: number) => (
                          <li key={`${idea.id || index}-${item.day || itemIndex}`} className="flex items-start">
                            <div className="flex-shrink-0 mr-3 pt-1">
                              <ItineraryIcon icon={('icon' in item) ? item.icon : (item.icon_name || 'Plane')} />
                            </div>
                            <p className="text-gray-300">
                              {item.day && <span className="font-bold text-gray-100">Day {item.day}:</span>} {item.activity}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            );
          })}
          {ideas.length === 0 && (
            <p className="text-gray-400 col-span-full">No ideas yet — try generating some!</p>
          )}
        </div>
      </div>
    </div>
  );
}
