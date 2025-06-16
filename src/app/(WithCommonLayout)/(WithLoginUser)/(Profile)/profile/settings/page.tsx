import { Lock, Palette, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChangePasswordForm } from "@/components/modules/Settings/ChangePasswordForm"
import { ThemeSwitcher } from "@/components/modules/Settings/ThemeSwitcher"
import { AddressManager } from "@/components/modules/Settings/AddressManager"

const SettingPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="h-5 w-5" />
              <span>Change Password</span>
            </CardTitle>
            <CardDescription>Update your password to keep your account secure</CardDescription>
          </CardHeader>
          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5" />
              <span>Appearance</span>
            </CardTitle>
            <CardDescription>Choose your preferred theme</CardDescription>
          </CardHeader>
          <CardContent>
            <ThemeSwitcher />
          </CardContent>
        </Card>

        {/* Shipping Addresses */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Shipping Addresses</span>
            </CardTitle>
            <CardDescription>Manage your delivery addresses for faster checkout</CardDescription>
          </CardHeader>
          <CardContent>
            <AddressManager />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingPage;