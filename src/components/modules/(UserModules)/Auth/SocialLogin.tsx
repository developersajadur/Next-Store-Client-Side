"use client"

import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"

export function SocialLogin() {
  const handleGoogleLogin = () => {
    // Implement Google OAuth
    console.log("Google login clicked")
  }

  const handleFacebookLogin = () => {
    // Implement Facebook OAuth
    console.log("Facebook login clicked")
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or Login with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" onClick={handleGoogleLogin} className="w-full">
          <FcGoogle className="mr-2 h-5 w-5" />
          Google
        </Button>

        <Button variant="outline" onClick={handleFacebookLogin} className="w-full">
          <FaFacebook className="mr-2 h-5 w-5 text-[#1877F2]" />
          Facebook
        </Button>
      </div>
    </div>
  )
}
