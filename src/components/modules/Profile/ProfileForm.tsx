"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Edit2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
});

type FormData = z.infer<typeof formSchema>;

export function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Kazi Mahbub",
      phoneNumber: "+90-123456789",
      email: "abcd1234@email.com",
      address: "123 Blue Avenue, Dhaka, Bangladesh",
    },
  });

  const onSubmit = (values: FormData) => {
    console.log(values);
  };

  return (
    <div className="space-y-6">
      {/* Avatar */}
      <div className="relative w-fit">
        <Avatar className="h-24 w-24">
          <AvatarImage src="/images/profile-avatar.png" alt="Profile" />
          <AvatarFallback>KM</AvatarFallback>
        </Avatar>
        <Button
          size="sm"
          className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full p-0"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <Input {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <Input type="email" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <Input {...register("phoneNumber")} />
            {errors.phoneNumber && (
              <p className="text-sm text-red-600 mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 font-medium">Address</label>
            <textarea
              {...register("address")}
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
            {errors.address && (
              <p className="text-sm text-red-600 mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full flex justify-end">
          {/* Submit */}
          <Button
            type="submit"
            className="flex justify-end bg-orange-600 hover:bg-orange-700"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
