import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

export interface NavSubItem {
    url: string;
    label: string;
}

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
    subItems?: NavSubItem[];
}

function NavItem({ subItems = [], href = '', children, ...rest }: Readonly<Props>) {
    return (
        <Link href={href} {...rest} className={`relative group`}>
            <p className={`hover:text-[var(--color-primary)]`}>{children}</p>
            {
                subItems.length > 0 && (
                    <ul className={`absolute w-60 bg-gray-800 transition-all overflow-hidden duration-150 shadow-lg rounded-md opacity-0 group-hover:opacity-100`}>
                        {
                            subItems.map((item: NavSubItem, index: number) => (
                                <li key={index} className={`hover:bg-gray-700 hover:text-[var(--color-primary)] py-2 px-4`}>
                                    {item.label}
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </Link>
    )
}

export default NavItem