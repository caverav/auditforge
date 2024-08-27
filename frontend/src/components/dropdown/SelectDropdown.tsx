import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";

type ListItem = {
  id: number;
  value: string;
  label?: string;
};

type SelectDropdownProps = {
  items: ListItem[];
  selected: ListItem | null;
  title: string;
  onChange: (item: ListItem) => void;
  placeholder?: string;
  required?: boolean;
};

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  items,
  title,
  selected,
  onChange,
  placeholder,
  required = false,
}) => {
  return (
    <Field>
      <Label className="block text-sm font-medium leading-6 text-gray-300">
        {title}
      </Label>
      <div
        className={`relative ${required && (!selected?.id || !selected.value) && "rounded-lg ring-1 ring-red-500"}`}
      >
        <Listbox onChange={onChange} value={selected}>
          <ListboxButton
            className={clsx(
              "inline-flex items-center justify-between w-full text-left rounded-lg bg-white/5 py-1.5 pl-3 text-left text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
              "min-h-[2.3rem]",
            )}
          >
            <span className="truncate">
              {selected
                ? selected.label
                  ? selected.label
                  : selected.value
                : placeholder}
            </span>
            <ChevronDownIcon
              aria-hidden="true"
              className="size-4 fill-white/60 mr-1"
            />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            className={clsx(
              "w-[var(--button-width)] rounded-xl border border-white/5 bg-stone-800 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
              "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
              "z-50",
            )}
            transition
          >
            {items.map((item) => (
              <ListboxOption
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                key={item.value}
                value={item}
              >
                <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                <div className="text-sm/6 text-white">
                  {item.label ? item.label : item.value}
                </div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
        {required && (!selected?.id || !selected.value) ? (
          <span className="absolute right-5 top-0 mt-2 ml-2 text-red-500">
            <ExclamationCircleIcon className="size-5" />
          </span>
        ) : null}
      </div>
    </Field>
  );
};

export default SelectDropdown;
