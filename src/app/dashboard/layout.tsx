import LayoutDashboard from "@/components/LayoutDashboard";
import { ReactNode } from "react";

export const metadata = {
  title: {
    default: "Dashboard",
    template: "Hair Hub | Dashboard | %s",
  },
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <LayoutDashboard>{children}</LayoutDashboard>;
}
