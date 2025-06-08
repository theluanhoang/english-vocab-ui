import { ReactNode } from "react";

interface Props {
    children: ReactNode,
    className?: string;
    id?: string;
}

function Label({
    children,
    className,
    id,
}: Readonly<Props>) {
    return (
        <label
            htmlFor={id}
            className={className}
        >
            {children}
        </label>
    )
}

export default Label