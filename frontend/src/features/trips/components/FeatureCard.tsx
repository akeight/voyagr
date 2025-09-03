import type { ReactNode } from "react";

export default function FeatureCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300">
      <div className="flex items-center justify-center w-12 h-12 bg-teal-400 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-200">{children}</p>
    </div>
  );
}
