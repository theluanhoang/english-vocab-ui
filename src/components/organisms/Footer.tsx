import React from 'react'
import Text from '../atoms/Text'
import FooterSection from '../molecules/FooterSection'
import FooterLink from '../atoms/FooterLink'
import FooterCopyright from '../molecules/FooterCopyright'

function Footer() {
    return (
        <footer className="bg-bg-footer text-white mt-auto footer-shadow">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
                    <FooterSection title="OxMaster">
                        <Text className="text-sm text-gray-300">
                            Master English vocabulary with our innovative learning platform.
                        </Text>
                    </FooterSection>

                    <FooterSection title="Quick Links">
                        <ul className="space-y-2">
                            <FooterLink href="/">Home</FooterLink>
                            <FooterLink href="/learn">Learn</FooterLink>
                            <FooterLink href="/practice">Practice</FooterLink>
                            <FooterLink href="/dictionary">Dictionary</FooterLink>
                        </ul>
                    </FooterSection>

                    <FooterSection title="Contact">
                        <ul className="space-y-2">
                            <li className="text-sm text-gray-300">Email: support@oxmaster.com</li>
                            <li className="text-sm text-gray-300">Follow us on social media</li>
                        </ul>
                    </FooterSection>
                </div>
                <FooterCopyright />
            </div>
        </footer>
    )
}

export default Footer