import React from 'react'
import Heading from '../atoms/Heading'

interface FooterSectionProps {
    title: string
    children: React.ReactNode
}

function FooterSection({ title, children }: FooterSectionProps) {
    return (
        <div>
            <Heading size='md' className="text-lg font-semibold mb-4">{title}</Heading>
            {children}
        </div>
    )
}

export default FooterSection 