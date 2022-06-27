import {
  useMemo,
  useState,
  createContext,
  useContext,
  SelectHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
} from "react";
import { KeyValue } from "~/types";
import { Selector as SelectorIcon } from "~/icons";

type SelectDataSource = { dataSource: KeyValue[]; placeholder: string };

type SelectorButton = { placeholder?: string; text?: string };

const SelectorContext = createContext<
  [KeyValue | null, (arg: KeyValue) => void] | null
>(null);

const useSelectorContext = (): [KeyValue | null, (arg: KeyValue) => void] => {
  const ctx = useContext(SelectorContext);
  if (ctx === null) {
    throw new Error("context is null");
  }
  return ctx;
};

export function Selector(
  props: SelectHTMLAttributes<HTMLSelectElement> & SelectDataSource
) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<KeyValue | null>(null);
  const dataSource = props.dataSource;
  const placeholder = useMemo(
    () => props.placeholder ?? "",
    [props.placeholder]
  );

  function selectedItem(item: KeyValue) {
    if (item === selected || item.key === selected?.key) {
      return;
    }

    setSelected(item);
    setOpen(false);
  }

  return (
    <span className="relative" role="list">
      <SelectorContext.Provider value={[selected, selectedItem]}>
        <SelectorButton placeholder={placeholder}></SelectorButton>
        {open && <Items dataSource={dataSource} />}
      </SelectorContext.Provider>
    </span>
  );
}

function SelectorButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const [selected, _] = useSelectorContext();
  return <button>{selected?.value || props.placeholder}</button>;
}

function Items(
  props: HTMLAttributes<HTMLSpanElement> & { dataSource: KeyValue[] }
) {
  return (
    <span role="listbox" tabIndex={0}>
      {props.dataSource.map((data) => (
        <Item option={data} />
      ))}
    </span>
  );
}

function Item(props: { option: KeyValue }) {
  const [_, selectedItem] = useSelectorContext();

  function handleSelect() {
    selectedItem(props.option);
  }

  return (
    <span
      role="listitem"
      title={`option-${props.option.key}`}
      onClick={handleSelect}
    >
      {props.option.value}
    </span>
  );
}
