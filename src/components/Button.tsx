import { forwardRef, ForwardedRef, ButtonHTMLAttributes } from "react";
import { getThemeColor, ThemeAttributes } from "~/theme";

const Button = forwardRef(function (
  props: ButtonHTMLAttributes<HTMLButtonElement> & ThemeAttributes,
  ref: ForwardedRef<HTMLButtonElement>
) {
  let { role, children, primary, secondary, ...rest } = props;

  const themeColor = getThemeColor({ primary, secondary });

  role ??= "button";
  return (
    <button
      {...rest}
      role={role}
      ref={ref}
      className={`px-4 py-0.5 mx-1 my-1 rounded-full ${themeColor}
      hover:ring-offset-2
      focus:ring focus:ring-offset-2`}
    >
      {children}
    </button>
  );
});

export { Button };
