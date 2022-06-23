import { forwardRef, ForwardedRef } from "react";

const Button = forwardRef(function (
  props: any,
  ref: ForwardedRef<HTMLButtonElement>
) {
  let { role, children, ...rest } = props;
  role ??= "button";
  return (
    <button
      {...rest}
      role={role}
      ref={ref}
      // role="button"
      className="px-4 py-0.5 mx-2 my-1 bg-purple-500 rounded-full
      text-white
      hover:bg-purple-400 hover:ring-offset-2 hover:ring-purple-400
      focus:ring focus:ring-offset-2 focus:ring-purple-500"
    >
      {children}
    </button>
  );
});

export { Button };
