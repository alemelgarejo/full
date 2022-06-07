import * as React from "react";

interface LayoutProps {
    children: React.ReactNode
}

const Layout:React.FunctionComponent<LayoutProps> = ({
    children
}) => {
    return (
        <div className="max-w-6xl mx-auto my-8 p-5">
            {children}
        </div>
    )
}

export default Layout;