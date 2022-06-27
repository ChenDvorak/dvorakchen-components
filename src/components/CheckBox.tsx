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

type CheckBoxAttributes = {
  defaultValues?: string[];
  onChange?: (value: string[]) => void;
};

type CheckBoxItemAttributes = {
  label?: string;
  defaultChecked?: boolean;
  defaultValue: string;
};

type ItemValue = {
  id: string;
  value: string | null;
  checked: boolean;
};

type ChangeHandler = (values: ItemValue, emit?: boolean) => void;

const CheckboxContext = createContext<ChangeHandler | undefined>(undefined);

const useCheckBoxContent = (): ChangeHandler => {
  const ctx = useContext(CheckboxContext);
  if (!ctx) {
    throw new Error("checkbox context null");
  }
  return ctx;
};

const CheckBoxRoot = function (props: PropsWithChildren<CheckBoxAttributes>) {
  const checkedValues = useRef<Map<string, string | null>>(new Map());
  const { onChange } = props;

  const handleClick = useCallback(
    function handleClick(value: ItemValue, emit: boolean = false) {
      if (checkedValues.current.has(value.id)) {
        checkedValues.current.delete(value.id);
      } else {
        checkedValues.current.set(value.id, value.value);
      }
      if (typeof onChange === "function" && emit) {
        const values = Array.from(checkedValues.current.values());
        onChange(values.filter(Boolean) as string[]);
      }
    },
    [onChange]
  );

  return (
    <CheckboxContext.Provider value={handleClick}>
      <span className="inline-flex items-center space-x-2" role="listbox">
        {props.children}
      </span>
    </CheckboxContext.Provider>
  );
};

const Item = forwardRef(function (
  props: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "checked"> &
    CheckBoxItemAttributes,
  ref: ForwardedRef<HTMLInputElement>
) {
  const changeHandler = useCheckBoxContent();
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
    if (checked) {
      changeHandler({ id: currentId, value: currentValue, checked: true });
    }
  }, []);

  const theme = checked ? getThemeColor("primary") : getThemeColor("general");

  function handleClick() {
    const cur = !checked;
    changeHandler({ id: currentId, value: currentValue, checked: cur }, true);
    setChecked(cur);
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
        {checked && (
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#fff" opacity="0.2" />
            <path
              d="M7 13l3 3 7-7"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <input
        className="absolute invisible z-0"
        ref={ref}
        type="checkbox"
        id={currentId}
        checked={checked}
        {...rest}
      />
    </span>
  );
});

export const CheckBox = Object.assign(CheckBoxRoot, { Item });
