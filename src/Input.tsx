import { forwardRef, type InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: "underline" | "plain";
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { variant = "underline", className, ...rest },
  ref
) {
  const classes = ["lui-input"];
  if (variant === "plain") classes.push("lui-input--plain");
  if (className) classes.push(className);

  return <input ref={ref} className={classes.join(" ")} {...rest} />;
});

export default Input;
