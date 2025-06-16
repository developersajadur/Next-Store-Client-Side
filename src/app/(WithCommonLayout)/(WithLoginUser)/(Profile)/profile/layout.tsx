import type { ReactNode } from "react"
import { ProfileSidebar } from "@/components/shared/ProfileSidebar"
import { getMyProfileData } from "@/services/UserService";

export default async function ProfileLayout({ children }: { children: ReactNode }) {
    const userData = await getMyProfileData();
  return (
    <div className="flex h-screen flex-col md:flex-row overflow-hidden">
      <ProfileSidebar userData={userData} />
      <main className="flex-1 overflow-y-auto p-4 md:p-5 hide-scrollbar">
        {children}
      </main>
    </div>
  )
}
