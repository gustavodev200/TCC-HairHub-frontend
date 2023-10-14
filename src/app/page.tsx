import LoginPageContent from "@/components/LoginComponent/LoginPageContent";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const token = cookies().get("@hairhub");

  if (token) redirect("/dashboard");

  return <LoginPageContent />;
}
