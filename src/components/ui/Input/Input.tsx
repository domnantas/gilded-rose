import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import classes from "@/components/ui/Input/Input.module.css";

export const Input = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"input">) => {
  return <input className={clsx(className, classes.input)} {...props} />;
};
