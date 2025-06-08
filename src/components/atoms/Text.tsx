import { ReactNode } from "react";

export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type Weight = 'normal' | 'medium' | 'bold';

type TextType = | 'p'
  | 'span'
  | 'strong'
  | 'em'
  | 'b'
  | 'i'
  | 'small'
  | 'mark'
  | 'del'
  | 'ins'
  | 'abbr'
  | 'code'
  | 'label'
  | 'button'
  | 'a'
  | 'legend'
  | 'blockquote'
  | 'cite'
  | 'pre'
  | 'summary'
  | 'time';



interface Props {
  as?: TextType
  className?: string;
  children: ReactNode
  size?: Size;
  weight?: Weight;
}
function Text({
  as = 'p',
  children,
  className = '',
  size = 'md',
  weight = 'normal'
}: Readonly<Props>) {
  const Component = as;
  const classNames = `text-${size} font-${weight} ${className}`;
  return <Component className={classNames}>{children}</Component>;
}

export default Text