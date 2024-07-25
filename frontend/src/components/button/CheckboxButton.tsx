import { Checkbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export interface CheckboxButtonProps {
  text: string;
}

export default function CheckboxButton({ text }: CheckboxButtonProps) {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center">
      <Checkbox
        checked={enabled}
        onChange={setEnabled}
        className="group flex items-center justify-center size-6 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
      >
        <CheckIcon className="hidden size-4 fill-black group-data-[checked]:block" />
      </Checkbox>
      <div className="ml-2">
        <p className="text-md text-gray-200">{text}</p>
      </div>
    </div>
  );
}
