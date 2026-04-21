import ProfileClient from "@/components/dashboard/profile/ProfileClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "View and update your account details, security settings, and personal information on Life Easy.",
}

export default function ProfilePage() {
 return (
  <main>
    <ProfileClient />
  </main>
 )
}