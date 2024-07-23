import cx from 'clsx';

export interface RadioProps {
  disabled?: boolean;
  defaultChecked?: boolean;
  id: string;
  label: string;
  name?: string;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  value?: string;
}

const Radio = ({ defaultChecked, disabled, id, label, name, onChange, value }: RadioProps) => (
  <div className="flex gap-2 items-start">
    <div className="grid place-items-center mt-1">
      <input
        type="radio"
        id={id}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
        className="
          peer
          col-start-1 row-start-1
          appearance-none shrink-0
          w-4 h-4 border-2 border-blue-500 rounded-full
          focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-blue-400
          disabled:border-gray-400
        "
        onChange={onChange}
        value={value}
      />
      <div
        className={cx(
          "pointer-events-none",
          "col-start-1 row-start-1",
          "w-2 h-2 rounded-full peer-checked:bg-blue-500",
          "peer-checked:peer-disabled:bg-gray-400"
        )}
      />
    </div>
    <label htmlFor={id}
      className={cx(
        "text-start hover:cursor-pointer",
        {
          "text-gray-400": disabled,
        })}
    >
      {label}
    </label>
  </div>
);

export default Radio;
