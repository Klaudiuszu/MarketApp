import Header from "@/components/Header";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
    <main className="min-h-screen text-gray-400">
      <Header user={user} />

      <div className="container py-10">{children}</div>
    </main>
  );
};
export default Layout;
