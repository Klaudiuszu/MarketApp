import { headers } from "next/headers";
import { redirect } from "next/navigation";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-dark-blue/theme.css";
import Header from "../../components/Header";
import { auth } from "../../lib/better-auth/auth";

/**
 * Root Layout Component
 *
 * Wraps all pages within the (root) route group.
 * Route groups (folders with parentheses) don't affect the URL structure.
 *
 * @param children - Page content automatically passed by Next.js
 * @returns Container with minimal height styling that wraps the child content
 */

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/sign-in");

  const user = {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  };

  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <Header user={user} />
      <div className="flex-1 min-h-0 flex">{children}</div>
    </main>
  );
};
export default Layout;
