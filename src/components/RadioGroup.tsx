import { useId, useState, KeyboardEvent } from "react";
import { getThemeColor } from "~/theme";
import { KeyValue } from "~/types";

type RadioGroupAttributes = {
  onChange?: (item: KeyValue) => void;
  defaultValue?: KeyValue;
  dataSource: KeyValue[];
};

type RadioItemAttributes = {
  data: KeyValue;
  onChange: (item: KeyValue) => void;
  checked?: boolean;
};

export function RadioGroup(props: RadioGroupAttributes) {
  const [selected, setSelected] = useState<KeyValue | null>(null);
  function handleClick(item: KeyValue) {
    if (selected?.key !== item.key || selected?.value !== item.value) {
      setSelected(item);
      props.onChange?.(item);
    }
  }
  return (
    <span className="inline-flex" role="radiogroup">
      {props.dataSource.map((t) => (
        <Item
          data={t}
          onChange={handleClick}
          checked={selected?.key === t.key && selected?.value === t.value}
        />
      ))}
    </span>
  );
}

function Item(props: RadioItemAttributes) {
  const generateId = useId();
  const { data, checked, onChange } = props;
  checked ?? false;
  const primaryTheme = getThemeColor("primary");
  const generateTheme = getThemeColor("general");

  function handleClick() {
    onChange(data);
  }

  function handleKeydown(event: KeyboardEvent<HTMLSpanElement>) {
    if (event.code === "Space") {
      event.preventDefault();
      handleClick();
    }
  }

  return (
    <span className="relative p-1">
      <span
        className={`inline-flex items-center cursor-pointer outline-none space-x-0.5 px-1 py-0.5`}
        onClick={handleClick}
        role="radio"
        aria-selected={checked}
        title={data.value}
      >
        <span className={`${generateTheme.text}`}>{data.value}</span>
        <span
          className={`inline-flex items-center justify-center
            w-5 h-5 rounded-full border ${generateTheme.border}`}
        >
          <span
            className={`w-3 h-3 rounded-full transition-colors outline-inherit
            ${checked ? primaryTheme.color : generateTheme.color}`}
            tabIndex={0}
            onKeyDown={handleKeydown}
          ></span>
        </span>
      </span>
      <span className="absolute invisible">
        <label htmlFor={generateId}>{data.value}</label>
        <input type="radio" id={generateId} value={data.key} />
      </span>
    </span>
  );
}
