export default function TestimonialCard({
    quote,
    author,
    role,
  }: {
    quote: string;
    author: string;
    role: string;
  }) {
    return (
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
        <p className="text-gray-200 mb-4 italic">"{quote}"</p>
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
            <img
              src={`https://i.pravatar.cc/48?u=${encodeURIComponent(author)}`}
              alt={author}
              className="rounded-full w-12 h-12"
            />
          </div>
          <div>
            <p className="font-bold text-white">{author}</p>
            <p className="text-teal-300">{role}</p>
          </div>
        </div>
      </div>
    );
  }
  