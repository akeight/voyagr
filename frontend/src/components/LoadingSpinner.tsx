import { Bot } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-[60] bg-gray-900/90 flex flex-col items-center justify-center text-white">
      <Bot className="w-24 h-24 text-teal-400 animate-bounce" />
      <p className="text-2xl font-semibold mt-4">Our AI is planning your perfect trip...</p>
      <p className="text-gray-400">This will just take a moment.</p>
    </div>
  );
}
