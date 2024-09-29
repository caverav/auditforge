import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { Chip } from '@mui/material';
import clsx from 'clsx';

type ListItem = {
  id: number;
  value: string;
  label?: string;
};

type MultiSelectDropdownProps = {
  items: ListItem[];
  selected: ListItem[];
  title: string;
  onChange: (items: ListItem[]) => void;
  placeholder?: string;
  disabled?: boolean;
};

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  items,
  title,
  selected,
  onChange,
  placeholder,
  disabled = false,
}) => {
  const ids = items.map(item => item.id);
  const hasDuplicateIds = new Set(ids).size !== ids.length;
  if (hasDuplicateIds) {
    throw new Error('Los ids de los items deben ser únicos');
  }
  const handleChange = (items: ListItem[]) => {
    onChange(items);
  };

  const handleDeleteChip = (deletedItem: ListItem) => {
    handleChange(selected.filter(item => item !== deletedItem));
  };

  return (
    <Field disabled={disabled}>
      <Label className="block text-sm font-medium leading-6 text-gray-300">
        {title}
      </Label>
      <Listbox
        disabled={disabled}
        multiple
        onChange={handleChange}
        value={selected}
      >
        <ListboxButton
          className={clsx(
            'inline-flex items-center justify-between w-full text-left rounded-lg bg-white/5 py-1.5 pl-3 text-left text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 min-h-[2.3rem]',
            { 'opacity-50 cursor-not-allowed': disabled },
          )}
        >
          <span className="overflow-x-auto">
            {selected.length > 0
              ? selected.map(s => (
                  <Chip
                    color="primary"
                    key={s.id}
                    label={s.label ? s.label : s.value}
                    onDelete={disabled ? undefined : () => handleDeleteChip(s)}
                    variant="outlined"
                  />
                ))
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
            'w-[var(--button-width)] rounded-xl border border-white/5 bg-stone-800 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 z-50',
          )}
          transition
        >
          {items.map(item => (
            <ListboxOption
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
              key={item.id}
              value={item}
            >
              <CheckIcon
                className={clsx('size-4 fill-white', {
                  visible: selected.some(s => s.id === item.id),
                  invisible: !selected.some(s => s.id === item.id),
                })}
              />
              <div className="text-sm/6 text-white">
                {item.label ? item.label : item.value}
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </Field>
  );
};

export default MultiSelectDropdown;
