import { ReactNode } from 'react';

type InlineExperienceProps = {
  company: string;
  role: string;
  date: string;
  description: string;
  children: ReactNode;
};

export default function InlineExperience({
  company,
  role,
  date,
  description,
  children,
}: Readonly<InlineExperienceProps>) {
  return (
    <div className="flex flex-col gap-1 lg:gap-2 text-lg lg:text-xl 2xl:text-2xl pointer-events-auto">
      <div className="flex items-center gap-2">
        <h3 className="font-medium">{company}</h3>
        <span className="text-gray-500">{date}</span>
      </div>
      <p className="text-gray-500">{role}</p>
      <p className="text-base lg:text-lg 2xl:text-xl">{description}</p>
      <ul className="list-disc pl-6 lg:pl-8 text-base lg:text-lg 2xl:text-xl">{children}</ul>
    </div>
  );
}
