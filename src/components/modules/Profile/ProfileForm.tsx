"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Edit2, X } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TUser } from "@/types"
import { updateUser } from "@/services/UserService"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
})

type FormData = z.infer<typeof formSchema>

export function ProfileForm({ user }: { user: TUser }) {
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageError, setImageError] = useState(false)
  const [isEditable, setIsEditable] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name || "",
      phoneNumber: user.phone?.toString() || "",
      email: user.email || "",
      address: user.address || "",
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreview(URL.createObjectURL(file))
      setImageError(false)
    }
  }

  const handleCancel = () => {
    reset() // reset form values to default
    setPreview(null) // discard new preview
    setSelectedFile(null)
    setImageError(false)
    setIsEditable(false)
  }

  const onSubmit = async (values: FormData) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("data", JSON.stringify(values))
      if (selectedFile) formData.append("file", selectedFile)

      const response = await updateUser(formData)

      if (response.success) {
        toast.success("Profile updated successfully!")
        setIsEditable(false)
      } else if (response.status === 413) {
        toast.error("Request Entity Too Large: Please upload a smaller file.")
      } else {
        toast.error(response.message || "Something went wrong.")
      }
    } catch (error: any) {
      if (error.response?.status === 413) {
        toast.error("Request Entity Too Large: Please upload a smaller file.")
      } else {
        toast.error("Failed to update profile.")
      }
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Edit & Cancel */}
      <div className="flex items-center justify-between mb-8">
       <h1 className="text-2xl font-semibold">Personal Information</h1>
        {!isEditable ? (
          <p
            onClick={() => setIsEditable(true)}
            className="flex items-center gap-1 text-sm cursor-pointer text-blue-600 hover:underline"
          >
            <Edit2 className="h-4 w-4" />
            Edit Profile
          </p>
        ) : (
          <p
            onClick={handleCancel}
            className="flex items-center gap-1 text-sm cursor-pointer text-red-600 hover:underline"
          >
            <X className="h-4 w-4" />
            Cancel
          </p>
        )}
      </div>

      {/* Avatar */}
      <div className="relative w-fit">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src={preview || (!imageError && user.profileImage) || ""}
            alt="Profile"
            onError={() => setImageError(true)}
          />
          <AvatarFallback>{user.name?.slice(0, 2).toUpperCase() || "NA"}</AvatarFallback>
        </Avatar>

        <input
          type="file"
          id="profileImageInput"
          accept="image/*"
          onChange={handleImageChange}
          disabled={!isEditable}
          className="absolute inset-0 opacity-0 cursor-pointer"
          style={{ width: "96px", height: "96px" }}
        />

        <label
          htmlFor="profileImageInput"
          className={`absolute -bottom-1 -right-1 h-8 w-8 rounded-full flex items-center justify-center shadow-md ${
            isEditable ? "bg-white cursor-pointer" : "bg-gray-300 cursor-not-allowed"
          }`}
          title="Change Profile Image"
        >
          <Edit2 className="h-4 w-4 text-gray-700" />
        </label>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium" htmlFor="name">
              Name
            </label>
            <Input id="name" disabled={!isEditable} {...register("name")} />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium" htmlFor="email">
              Email
            </label>
            <Input id="email" type="email" disabled={!isEditable} {...register("email")} />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-1 font-medium" htmlFor="phoneNumber">
              Phone Number
            </label>
            <Input id="phoneNumber" disabled={!isEditable} {...register("phoneNumber")} />
            {errors.phoneNumber && (
              <p className="text-sm text-red-600 mt-1">{errors.phoneNumber.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 font-medium" htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              disabled={!isEditable}
              {...register("address")}
              className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
                isEditable ? "focus:ring-blue-500" : "bg-gray-100 cursor-not-allowed"
              }`}
              rows={4}
            />
            {errors.address && (
              <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>
            )}
          </div>
        </div>

        <div className="w-full flex justify-end">
          <Button
            type="submit"
            disabled={!isEditable || loading}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
