import { ComponentPropsWithoutRef } from "react";
import classes from "@/components/ui/Separator/Separator.module.css";
import clsx from "clsx";

export const Separator = (props: ComponentPropsWithoutRef<"div">) => {
  return <div className={clsx(classes.separator)} {...props}></div>;
};
