"use client";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="flex gap-4">
      <div className="text-blue-600 p-2 bg-blue-50 rounded-lg h-fit">
        {React.cloneElement(icon as React.ReactElement, { className: 'h-6 w-6' })}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}