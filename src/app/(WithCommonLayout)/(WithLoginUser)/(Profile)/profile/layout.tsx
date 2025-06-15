import type { ReactNode } from "react"
import { ProfileSidebar } from "@/components/shared/ProfileSidebar"

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row overflow-hidden">
      <ProfileSidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-5 hide-scrollbar">
        {children}
      </main>
    </div>
  )
}
