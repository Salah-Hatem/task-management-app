"use server"

import { redirect } from "next/navigation"
import { BackendUrl } from "./contants"
import {
  FormState,
  LoginFormSchema,
  SignupFormSchema,
} from "../types/formStateType"
import { createSession, deleteSession } from "./sessions"

export async function signUp(
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const formDataObject = Object.fromEntries(formData.entries())
  const validationResult = SignupFormSchema.safeParse(formDataObject)

  if (!validationResult.success) {
    return {
      success: false,
      message: validationResult.error.errors[0]?.message || "Invalid data",
    }
  }

  const payload = {
    name: validationResult.data.name,
    email: validationResult.data.email,
    password: validationResult.data.password,
    linkedinUrl: validationResult.data.linkedinUrl,
  }

  try {
    // Submit the form data to the server and return the response
    const response = await fetch(`${BackendUrl}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.ok) {
      redirect("/signin")
    } else {
      return {
        success: false,
        message:
          response.status === 409
            ? "Email already exists"
            : response.statusText,
      }
    }
  } catch (error) {
    console.error("Failed to sign up", error)
    return { success: false, message: "Failed to sign up" }
  }
}

export async function signin(
  state: FormState,
  FormData: FormData,
  req: Request
): Promise<FormState> {
  const formDataObject = Object.fromEntries(FormData.entries())
  const validation = LoginFormSchema.safeParse(formDataObject)

  if (!validation.success) {
    return {
      success: false,
      message: validation.error.errors[0]?.message || "Invalid data",
    }
  }
  // redirect can't be used in try-catch block
  let redirectUrl: string | null = null
  try {
    const response = await fetch(`${BackendUrl}/auth/signin`, {
      method: "POST",
      body: JSON.stringify(validation.data),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      const result = await response.json()
      //Create a session
      await createSession({
        user: {
          id: result.id,
          email: result.email,
          name: result.name,
        },
        accessToken: result.accessToken,
      })
      // Redirect to the dashboard
      redirectUrl = "/dashboard"
    } else {
      return {
        success: false,
        message:
          response.status === 401
            ? "Invalid email or password"
            : response.statusText,
      }
    }
  } catch (error) {
    console.error("Failed to sign in", error)
    return { success: false, message: "Failed to sign in" }
  } finally {
    if (redirectUrl) {
      redirect(redirectUrl)
    }
  }
}

export async function signOut() {
  deleteSession()
  redirect("/signin")
}
