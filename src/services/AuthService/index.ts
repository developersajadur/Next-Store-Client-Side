"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { BASE_API_URL } from "..";

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${BASE_API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    if (result.success) {
      (await cookies()).set("token", result.token);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const loginUser = async (loginData: FieldValues) => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const data = await res.json();
    if (data.success) {
      (await cookies()).set("token", data.data.token);
    }
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getCurrentUser = async () => {
  const token = (await cookies()).get("token")?.value;
  let decodedData = null;

  if (token) {
    decodedData = await jwtDecode(token);
    return decodedData;
  } else {
    return null;
  }
};

export const getToken = async () => {
  return (await cookies()).get("token")?.value;
};

export const logout = async () => {
  (await cookies()).delete("token");
};
