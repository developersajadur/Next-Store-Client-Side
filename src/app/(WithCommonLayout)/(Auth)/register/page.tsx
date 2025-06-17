import Link from "next/link"
import Image from "next/image"
import { Logo } from "@/components/shared/Logo"
import { RegisterForm } from "@/components/modules/(UserModules)/Auth/Register/RegisterForm"
import { SocialLogin } from "@/components/modules/(UserModules)/Auth/SocialLogin"

export default function RegisterPage() {
  return (
    <div className="h-full flex justify-center px-4 my-8 md:my-20">
      {/* Container with max width */}
      <div className="flex w-full max-w-6xl bg-white rounded-xl overflow-hidden">
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-400 to-orange-600 p-12 items-center justify-center">
          <div className="max-w-md text-white">
            <h1 className="text-4xl font-bold mb-4">Join Next Store today.</h1>
            <p className="text-lg opacity-90 mb-8">
              Create your account and start shopping with the best deals and products.
            </p>
            <div className="relative w-full h-64">
              <Image
                src="/register-image.png"
                height={400}
                width={400}
                alt="Register Image"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full lg:w-1/2 flex items-center border border-orange-500 justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            {/* Logo */}
            <div className="flex justify-center">
              <Logo size="lg" />
            </div>

            {/* Welcome Text */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
              <p className="mt-2 text-gray-600">Join us and start shopping</p>
            </div>

            {/* Register Form */}
            <RegisterForm />

            {/* Social Login */}
            <SocialLogin />

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-orange-500 hover:text-orange-600">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
