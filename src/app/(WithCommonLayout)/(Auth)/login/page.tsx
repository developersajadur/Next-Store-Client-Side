import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/shared/Logo";
import { LoginForm } from "@/components/modules/Auth/Login/LoginForm";
import { SocialLogin } from "@/components/modules/Auth/SocialLogin";

export default function LoginPage() {
  return (
    <div className="h-full flex justify-center px-4 my-8 md:my-20">
      {/* Container with max width */}
      <div className="flex w-full max-w-6xl bg-white rounded-xl overflow-hidden">
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-400 to-orange-600 p-12 items-center justify-center">
          <div className="max-w-md text-white">
            <h1 className="text-4xl font-bold mb-4">
              Shopping With Us
            </h1>
            <p className="text-lg opacity-90 mb-8">
              Simplify Shopping Here With Better Price and Offer.
            </p>
            <div className="relative w-full h-64">
              <Image
                src="/login-image.png"
                height={400}
                width={400}
                alt="Login Image"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex border border-orange-500 items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            {/* Logo */}
            <div className="flex justify-center">
              <Logo size="lg" />
            </div>

            {/* Welcome Text */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
              <p className="mt-2 text-gray-600">Please login to your account</p>
            </div>

            {/* Login Form */}
            <LoginForm />

            {/* Social Login */}
            <SocialLogin />

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-orange-500 hover:text-orange-600"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
