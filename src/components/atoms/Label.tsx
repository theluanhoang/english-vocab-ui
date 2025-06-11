import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {}

function Label({
    className,
    children,
    ...props
}: Readonly<Props>) {
    return (
        <label
            className={cn(className)}
            {...props}
        >
            {children}
        </label>
    )
}

export default Label