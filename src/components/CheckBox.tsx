import {
  forwardRef,
  ForwardedRef,
  PropsWithChildren,
  InputHTMLAttributes,
  useId,
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  KeyboardEvent,
} from "react";
import { getThemeColor } from "~/theme";
import { Checkmark } from "~/icons";

type CheckBoxAttributes = {
  name?: string;
  defaultValues?: string[];
  onChange?: (value: string[]) => void;
};

type CheckBoxItemAttributes = {
  label?: string;
  defaultChecked?: boolean;
  defaultValue: string;
  submitKey?: string;
};

type ItemValue = {
  id: string;
  value: string | null;
  checked: boolean;
};

type ChangeHandler = (values: ItemValue, emit?: boolean) => void;
type ContextType = [string | undefined, ChangeHandler | undefined];

const CheckboxContext = createContext<ContextType>([undefined, undefined]);

const CheckBoxRoot = function (props: PropsWithChildren<CheckBoxAttributes>) {
  const checkedValues = useRef<Map<string, string | null>>(new Map());
  const { onChange, name } = props;

  const handleClick = useCallback(
    function handleClick(value: ItemValue, emit: boolean = false) {
      if (checkedValues.current.has(value.id)) {
        checkedValues.current.delete(value.id);
      } else {
        checkedValues.current.set(value.id, value.value);
      }

      if (typeof onChange === "function" && emit) {
        const values = Array.from(checkedValues.current.values());
        const sel = values.filter(Boolean) as string[];
        onChange(sel);
      }
    },
    [onChange]
  );

  return (
    <CheckboxContext.Provider value={[props.name, handleClick]}>
      <span className="inline-flex items-center space-x-2" role="listbox">
        {props.children}
      </span>
    </CheckboxContext.Provider>
  );
};

const Item = forwardRef(function (
  props: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "checked" | "name"
  > &
    CheckBoxItemAttributes,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [name, changeHandler] = useContext(CheckboxContext);
  let { label, defaultChecked, ...rest } = props;

  defaultChecked ??= false;
  const currentValue = useMemo(
    () =>
      props.defaultValue === undefined ? null : props.defaultValue?.toString(),
    [props.defaultValue]
  );
  const generateId = useId();
  const currentId = useMemo(
    () => (props.id ? props.id : generateId),
    [props.id]
  );

  const [checked, setChecked] = useState(defaultChecked);

  useEffect(() => {
    if (checked && changeHandler) {
      changeHandler({ id: currentId, value: currentValue, checked: true });
    }
  }, []);

  const theme = checked ? getThemeColor("primary") : getThemeColor("general");

  function handleClick() {
    if (changeHandler) {
      const cur = !checked;
      changeHandler({ id: currentId, value: currentValue, checked: cur }, true);
      setChecked(cur);
    }
  }

  function handleKeydown(event: KeyboardEvent<HTMLSpanElement>) {
    if (event.code === "Space") {
      event.preventDefault();
      handleClick();
    }
  }

  return (
    <span
      className={`inline-flex relative items-center rounded-xl px-1 py-0.5
      border shadow cursor-pointer ${theme.border} ${theme.color} transition-colors
      focus:ring focus:ring-offset-1 ${theme.focusRing} space-x-1 outline-none`}
      onClick={handleClick}
      role="option"
      title={label}
      onKeyDown={handleKeydown}
      tabIndex={0}
    >
      {label && (
        <>
          <label className={`${theme.text} hidden`} htmlFor={currentId}>
            {label}
          </label>
          <span className={`${theme.text}`}>{label}</span>
        </>
      )}
      <span className={`w-6 h-6 rounded-full border ${theme.border ?? ""}`}>
        {checked && <Checkmark />}
      </span>
      <input
        className="absolute invisible z-0"
        ref={ref}
        type="checkbox"
        id={currentId}
        checked={checked}
        name={name}
        {...rest}
        value={props.submitKey}
      />
    </span>
  );
});

export const CheckBox = Object.assign(CheckBoxRoot, { Item });
