import { BookOpen, LucideIcon } from 'lucide-react'
import React from 'react'
import Heading from '../atoms/Heading'
import Text from '../atoms/Text'

interface IntroductionProps {
    title: string;
    description: string;
    icon?: LucideIcon;
}

function IntroductionSection({ title, description, icon: Icon = BookOpen }: IntroductionProps) {
    return (
        <div className="text-center mb-8 md:mb-12">
            <div className="inline-block p-3 bg-background-icon-light dark:bg-background-icon-dark rounded-full">
                <Icon className="w-8 h-8 text-warning-500 dark:text-warning-400" />
            </div>
            <Heading as='h1' className="text-4xl font-bold text-content-primary-light dark:text-content-primary-dark mb-3">{title}</Heading>
            <Text className="text-content-secondary-light dark:text-content-secondary-dark max-w-2xl mx-auto">
                {description}
            </Text>
        </div>
    )
}

export default IntroductionSection