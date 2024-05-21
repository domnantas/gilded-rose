import { ComponentPropsWithoutRef } from "react";
import classes from "@/components/ui/Button/Button.module.css";
import clsx from "clsx";

export const Button = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"button">) => {
  return (
    <button className={clsx(className, classes.button)} {...props}>
      {children}
    </button>
  );
};
