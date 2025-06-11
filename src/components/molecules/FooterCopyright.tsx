import React from 'react'

function FooterCopyright() {
    return (
        <div className="py-4 border-t border-gray-700 text-center text-sm text-gray-300">
            © {new Date().getFullYear()} OxMaster. All rights reserved.
        </div>
    )
}

export default FooterCopyright 