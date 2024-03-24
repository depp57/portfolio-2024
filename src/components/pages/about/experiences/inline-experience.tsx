import { ReactNode } from 'react';

type InlineExperienceProps = {
  company: string;
  role: string;
  date: string;
  description: string;
  children: ReactNode;
};

export default function InlineExperience({ company, role, date, description, children }: InlineExperienceProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-medium">{company}</h3>
        <span className="text-gray-500">{date}</span>
      </div>
      <p className="text-gray-500">{role}</p>
      <p>{description}</p>
      <ul className="list-disc pl-8">{children}</ul>
    </div>
  );
}
