import { Bot, Search, Plane, ChevronRight } from "lucide-react";
import FeatureCard from "../components/FeatureCard";
import TestimonialCard from "../components/TestimonialCard";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full">
      {/* Hero */}
      <section className="relative text-white text-center py-40 px-4 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://placehold.co/1920x1080/0a0a0a/ffffff?text=World+Map')",
          }}
        />
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
            Your Personal AI Travel Agent
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Generate custom travel itineraries in seconds. Just set your budget
            and interests, and let our AI handle the rest.
          </p>
          <button
            onClick={() => navigate("/generate")}
            className="bg-teal-500 hover:bg-teal-400 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform duration-300 ease-in-out hover:scale-105"
          >
            Start Planning Your Trip <ChevronRight className="inline-block" />
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard icon={<Bot className="w-6 h-6 text-white" />} title="AI-Powered Ideas">
              Our smart AI analyzes your preferences to suggest unique
              destinations and activities you'll love.
            </FeatureCard>
            <FeatureCard icon={<Search className="w-6 h-6 text-white" />} title="Custom Itineraries">
              Get detailed day-by-day plans, from flights and hotels to
              restaurants and attractions.
            </FeatureCard>
            <FeatureCard icon={<Plane className="w-6 h-6 text-white" />} title="Budget-Friendly">
              We find the best deals to create amazing trips that won't break
              the bank. Your dream vacation is within reach.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            What Our Travelers Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <TestimonialCard
              quote="Voyagr is a game-changer! I planned a week-long trip to Italy in minutes."
              author="Alex Johnson"
              role="Solo Traveler"
            />
            <TestimonialCard
              quote="Perfect, kid-friendly itineraries in seconds. Highly recommended!"
              author="Samantha Lee"
              role="Family Vacationer"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
