import Header from "@/components/Header";

/**
 * Root Layout Component
 * 
 * Wraps all pages within the (root) route group.
 * Route groups (folders with parentheses) don't affect the URL structure.
 * 
 * @param children - Page content automatically passed by Next.js
 * @returns Container with minimal height styling that wraps the child content
 */
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="min-h-screen text-gray-500">
            <Header />
            <div className="container py-10">
                {children}
            </div>
        </main>
    );
};

export default Layout;