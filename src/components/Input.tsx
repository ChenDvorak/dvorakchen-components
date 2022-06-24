import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import { getThemeColor } from "~/theme";

type DvorakInputAttribute = {
  label?: string;
};

const Input = forwardRef(function (
  props: InputHTMLAttributes<HTMLInputElement> & DvorakInputAttribute,
  ref: ForwardedRef<HTMLInputElement>
) {
  let { id, type, label, ...res } = props;
  type ??= "text";

  const theme = getThemeColor("primary");

  return (
    <span className="m-1 flex items-center">
      {label && (
        <>
          <label htmlFor={id}>{label}</label>
          <span className="mr-1">:</span>
        </>
      )}
      <input
        id={id}
        type={type}
        {...res}
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
