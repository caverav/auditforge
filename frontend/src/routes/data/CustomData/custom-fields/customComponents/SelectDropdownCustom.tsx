import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  ListboxSelectedOption,
} from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import { GetCustomFieldType } from '../../../../../services/data';

type ListItem = {
  id: number;
  value: string;
  label?: string;
};

type SelectDropdownProps = {
  items: ListItem[];
  title: string;
  placeholder?: string;
  setCurrentCustomFields: React.Dispatch<
    React.SetStateAction<GetCustomFieldType[]>
  >;
  id: string;
  text: string;
  currentLanguage: string;
};

const SelectDropdownCustom: React.FC<SelectDropdownProps> = ({
  items,
  title,
  placeholder,
  id,
  setCurrentCustomFields,
  text,
  currentLanguage,
}) => {
  const [selected, setSelected] = useState<ListItem | null>(
    items.find(item => item.value === text) ?? null,
  );

  useEffect(() => {
    setSelected(items.find(item => item.value === text) ?? null);
  }, [items, text]);

  const onChange = (item: ListItem) => {
    setCurrentCustomFields((prevFields: GetCustomFieldType[]) => {
      return prevFields.map((field: GetCustomFieldType) =>
        field._id === id
          ? {
              ...field,
              text: field.text.map(itemIter =>
                itemIter.locale === currentLanguage
                  ? {
                      locale: itemIter.locale,
                      value: item.value,
                    }
                  : itemIter,
              ),
            }
          : field,
      );
    });
  };
  return (
    <Field>
      <Label className="block text-sm font-medium leading-6 mb-2 text-gray-300">
        {`${title} `}
      </Label>
      <div className="relative">
        <Listbox onChange={onChange} value={selected}>
          <ListboxButton
            className={clsx(
              'inline-flex items-center justify-between w-full text-left rounded-lg bg-white/5 py-1.5 pl-3 text-left text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
              'min-h-[2.3rem]',
            )}
          >
            <div>
              <ListboxSelectedOption
                options={items.map(item => (
                  <ListboxOption
                    className="group flex cursor-default items-center gap-2 rounded-lg px-3 select-none data-[focus]:bg-white/10"
                    key={item.id}
                    value={item}
                  >
                    <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                    <div className="text-sm/6 text-white">
                      {item.label ? item.label : item.value}
                    </div>
                  </ListboxOption>
                ))}
                placeholder={placeholder}
              />
            </div>
            <ChevronDownIcon
              aria-hidden="true"
              className="size-4 fill-white/60 mr-1"
            />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            className={clsx(
              'w-[var(--button-width)] rounded-xl border border-white/5 bg-stone-800 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
              'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
              'z-50',
            )}
            transition
          >
            {items.map(item => (
              <ListboxOption
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                key={item.id}
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
      </div>
    </Field>
  );
};

export default SelectDropdownCustom;
