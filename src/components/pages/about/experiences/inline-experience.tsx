import { Fragment, ReactNode } from 'react';

type InlineExperienceProps = {
  company: string;
  role: string;
  date: string;
  description: string;
  tasks: string[];
};

const LINK_PATTERN = /\[([^\]]+)]\(([^)]+)\)/g;

function renderTask(task: string): ReactNode {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of task.matchAll(LINK_PATTERN)) {
    const [fullMatch, label, href] = match;
    const start = match.index;

    if (start > lastIndex) {
      nodes.push(<Fragment key={lastIndex}>{task.slice(lastIndex, start)}</Fragment>);
    }

    nodes.push(
      <a key={start} href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-gray-500">
        {label}
      </a>,
    );

    lastIndex = start + fullMatch.length;
  }

  if (lastIndex < task.length) {
    nodes.push(<Fragment key={lastIndex}>{task.slice(lastIndex)}</Fragment>);
  }

  return nodes;
}

export default function InlineExperience({ company, role, date, description, tasks }: Readonly<InlineExperienceProps>) {
  return (
    <div className="flex flex-col gap-1 lg:gap-2 text-lg lg:text-xl 2xl:text-2xl pointer-events-auto">
      <div className="flex items-center gap-2">
        <h3 className="font-medium">{company}</h3>
        <span className="text-gray-500">{date}</span>
      </div>
      <p className="text-gray-500">{role}</p>
      <p className="text-base lg:text-lg 2xl:text-xl">{description}</p>
      <ul className="list-disc pl-6 lg:pl-8 text-base lg:text-lg 2xl:text-xl">
        {tasks.map((task, index) => (
          <li key={index}>{renderTask(task)}</li>
        ))}
      </ul>
    </div>
  );
}
