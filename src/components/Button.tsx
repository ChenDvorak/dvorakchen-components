import {
  useState,
  forwardRef,
  ForwardedRef,
  ButtonHTMLAttributes,
  MouseEvent,
} from "react";
import { selectThemeColor, ThemeAttributes } from "~/theme";
import { CircleLoading } from "~/icons";

const Button = forwardRef(function (
  props: ButtonHTMLAttributes<HTMLButtonElement> & ThemeAttributes,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const [loading, setLoading] = useState(false);

  let { role, children, primary, secondary, onClick, ...rest } = props;

  const themeColor = selectThemeColor({ primary, secondary });

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (loading || !onClick) {
      return;
    }
    setLoading(true);
    onClick(event);
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }

  role ??= "button";
  return (
    <button
      {...rest}
      role={role}
      ref={ref}
      onClick={handleClick}
      className={`inline-flex items-center
      px-3 py-0.5 mx-1 my-1 rounded-full ${themeColor}
      hover:ring-offset-2 focus:ring focus:ring-offset-2
      disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed`}
    >
      {loading && <CircleLoading className="animate-spin -ml-1 mr-1 h-5 w-5" />}
      {children}
    </button>
  );
});

export { Button };
