import { ProfileForm } from "@/components/modules/(UserModules)/Profile/ProfileForm";
import { getMyProfileData } from "@/services/(UserServices)/UserService";

export default async function ProfilePage() {
  const userData = await getMyProfileData();
  return (
    <>
      <div className="flex flex-1 flex-col gap-4">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-background md:min-h-min p-6">
          <ProfileForm user={userData} />
        </div>
      </div>
    </>
  );
}
