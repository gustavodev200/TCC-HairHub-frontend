"use client";

import LayoutForClients from "@/components/LayoutForClients";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <LayoutForClients>{children}</LayoutForClients>;
}
