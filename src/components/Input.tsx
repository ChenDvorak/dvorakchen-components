import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

const Input = forwardRef(function (
  props: InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) {
  let { type, ...res } = props;
  type ??= "text";

  return <input type={type} {...res} ref={ref} className="" />;
});

export { Input };
