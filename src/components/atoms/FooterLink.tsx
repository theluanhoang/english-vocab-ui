import React from 'react'
import Link from 'next/link'

interface FooterLinkProps {
    href: string
    children: React.ReactNode
}

function FooterLink({ href, children }: FooterLinkProps) {
    return (
        <li>
            <Link href={href} className="text-sm text-gray-300 hover:text-white transition-colors">
                {children}
            </Link>
        </li>
    )
}

export default FooterLink 