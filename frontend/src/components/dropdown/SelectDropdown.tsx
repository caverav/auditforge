import { Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import React from 'react'

interface ListItem {
  id: number,
  value: string,
  label?: string
}

interface SelectDropdownProps {
  items: ListItem[],
  selected: ListItem | null,
  title: string,
  onChange: (item: ListItem) => void,
  placeholder?: string
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({items, title, selected, onChange, placeholder}) => {
  return (
    <Field>
      <Label className={"block text-sm font-medium leading-6 text-gray-300"}>
        {title}
      </Label>
      <Listbox value={selected} onChange={onChange}>
        <ListboxButton
          className={clsx(
            'inline-flex items-center justify-between w-full text-left rounded-lg bg-white/5 py-1.5 pl-3 text-left text-sm/6 text-white',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
            'min-h-[2.3rem]'
          )}
          >
          <span className='truncate'>{selected ? (selected.label ? selected.label : selected.value) : placeholder}</span>
          <ChevronDownIcon
            className={`size-4 fill-white/60 mr-1`}
            aria-hidden="true"
            />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--button-width)] rounded-xl border border-white/5 bg-stone-800 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
            "z-50"
          )}
          >
          {items.map((item) => (
            <ListboxOption
            key={item.value}
            value={item}
            className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
            >
              <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
              <div className="text-sm/6 text-white">{item.label ? item.label : item.value}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </Field>
  )
}

export default SelectDropdown