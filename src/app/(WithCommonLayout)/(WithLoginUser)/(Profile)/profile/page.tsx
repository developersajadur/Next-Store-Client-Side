import { ProfileForm } from "@/components/modules/Profile/ProfileForm";

export default function ProfilePage() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-background md:min-h-min p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">Personal Information</h2>
          </div>
          <ProfileForm />
        </div>
      </div>
    </>
  );
}
