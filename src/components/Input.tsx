import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useMemo,
  useId,
} from "react";
import { getThemeColor } from "~/theme";

type DvorakInputAttribute = {
  label?: string;
};

const Input = forwardRef(function (
  props: InputHTMLAttributes<HTMLInputElement> & DvorakInputAttribute,
  ref: ForwardedRef<HTMLInputElement>
) {
  let { type, label, ...rest } = props;
  type ??= "text";

  const theme = useMemo(() => getThemeColor("primary"), []);
  const generateId = useId();
  const currentId = useMemo(
    () => (props.id ? props.id : generateId),
    [props.id]
  );

  return (
    <span className="m-1 flex items-center">
      {label && (
        <>
          <label htmlFor={currentId}>{label}</label>
          <span className="mr-1">:</span>
        </>
      )}
      <input
        id={label && currentId}
        type={type}
        {...rest}
        ref={ref}
        className={`px-2 ${theme.focusRing}
        outline-none border border-gray-300 rounded-full
        hover:ring-1 hover:ring-offset-2 hover:ring-gray-300
        focus:ring-1 focus:ring-offset-2`}
      />
    </span>
  );
});

export { Input };
