import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { ReactElement, useState } from 'react';

type CustomAccordionProps = {
  children: ReactElement;
  title: string;
};

export const CustomAccordion: React.FC<CustomAccordionProps> = ({
  children,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-800 rounded p-2">
      <div className="flex items-center justify-between">
        <h1>{title}</h1>
        <button onClick={() => setIsOpen(!isOpen)} type="button">
          {isOpen ? (
            <ChevronDownIcon className="size-4" />
          ) : (
            <ChevronUpIcon className="size-4" />
          )}
        </button>
      </div>
      {isOpen ? (
        <>
          <hr className="h-0.5 mx-1 bg-gray-600 border-0 rounded my-2" />
          <div className="p-2">{children}</div>
        </>
      ) : null}
    </div>
  );
};
