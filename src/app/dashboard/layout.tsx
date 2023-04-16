"use client";

import LayoutDashboard from "@/components/LayoutDashboard";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <LayoutDashboard>{children}</LayoutDashboard>;
}
