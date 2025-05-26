import { ShoppingBag } from "lucide-react"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  return (
    <div className="flex items-center space-x-2">
      <div className={`${sizeClasses[size]} bg-orange-500 rounded-lg flex items-center justify-center`}>
        <ShoppingBag className="w-1/2 h-1/2 text-white" />
      </div>
      {showText && (
        <div>
          <h1 className={`${textSizeClasses[size]} font-bold text-gray-900`}>NEXT</h1>
          <p className="text-sm text-orange-500">STORE</p>
        </div>
      )}
    </div>
  )
}
