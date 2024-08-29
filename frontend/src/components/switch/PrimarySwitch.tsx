import { Switch } from '@headlessui/react';

type PrimarySwitchProps = {
  enabled: boolean;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
  label?: string;
};

const PrimarySwitch: React.FC<PrimarySwitchProps> = ({
  enabled,
  onChange,
  label,
}) => {
  return (
    <div className="inline-flex">
      {label ? <span className="mx-1">{label}</span> : null}
      <Switch
        checked={enabled}
        className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-700 transition data-[checked]:bg-blue-600"
        onChange={onChange}
      >
        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
      </Switch>
    </div>
  );
};

export default PrimarySwitch;
