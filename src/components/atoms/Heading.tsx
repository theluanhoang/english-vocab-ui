import { ReactNode } from 'react';
import { Size, Weight } from './Text';

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface Props {
    as?: HeadingType
    className?: string;
    children: ReactNode
    size?: Size;
    weight?: Weight;
}

function Heading({
    as = 'h1',
    children,
    className = '',
    size = 'md',
    weight = 'normal'
}: Readonly<Props>) {
    const Component = as;
    const classNames = `text-${size} font-${weight} ${className}`;
    return <Component className={classNames}>{children}</Component>;
}

export default Heading