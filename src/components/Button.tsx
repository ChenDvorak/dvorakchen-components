import { forwardRef, ForwardedRef, ButtonHTMLAttributes } from "react";
import { selectThemeColor } from "~/theme";
import type { ThemeAttributes } from "~/theme";
import { CircleLoading } from "~/icons";
import type { LoadingType } from "~/types";

const Button = forwardRef(function (
  props: ButtonHTMLAttributes<HTMLButtonElement> &
    ThemeAttributes &
    LoadingType,
  ref: ForwardedRef<HTMLButtonElement>
) {
  let { role, children, primary, secondary, loading, onClick, ...rest } = props;

  const themeColor = selectThemeColor({ primary, secondary });

  role ??= "button";
  return (
    <button
      {...rest}
      role={role}
      ref={ref}
      className={`inline-flex items-center
      px-3 py-0.5 mx-1 my-1 rounded-full ${themeColor}
      hover:ring-offset-2 focus:ring focus:ring-offset-2
      shadow
      disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed`}
    >
      {loading && <CircleLoading className="animate-spin -ml-1 mr-1 h-5 w-5" />}
      {children}
    </button>
  );
});

export { Button };
