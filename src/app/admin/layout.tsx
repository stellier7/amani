import type { Metadata } from "next";
import { getSession } from "@/lib/auth/cookies";
import { AdminChrome } from "./admin-chrome";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s — Admin Amani",
  },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: LayoutProps<"/admin">) {
  const session = await getSession();
  return <AdminChrome session={session}>{children}</AdminChrome>;
}
