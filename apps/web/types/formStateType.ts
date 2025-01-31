import { link } from "fs"
import { z } from "zod"

export type FormState =
  | {
      success: boolean
      message?: string
    }
  | undefined

export type AuthFormState =
  | {
      success: boolean
      message?: string
      error?: {
        name?: string[]
        email?: string[]
        password?: string[]
        linkedinUrl?: string[]
      }
    }
  | undefined

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters long.",
    })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(6, { message: "Be at least 6 characters long" })
    .trim(),
  linkedinUrl: z
    .string()
    .refine(
      (url) => !url || (typeof url === "string" && url.startsWith("http")),
      { message: "Please enter a valid URL" }
    )
    .refine((url) => !url || url.includes("linkedin.com/in/"), {
      message:
        "Please enter a valid LinkedIn profile URL (e.g., https://www.linkedin.com/in/username)",
    }),
})

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, {
    message: "Password field must not be empty.",
  }),
})

export const CreateTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"), // Required, with constraints
  description: z.string().optional(), // Optional field
  dueDate: z
    .string()
    .transform((date) => new Date(date))
    .optional(), // Optional, ensure it's a valid date
  categoryId: z.string().optional().nullable(), // Optional, matches ObjectId
})

export const UpdateTaskSchema = z.object({
  taskId: z.string(), // will be generated by db
  title: z.string().min(1, "Title is required").max(255, "Title is too long"), // Required, with constraints
  description: z.string().optional(), // Optional field
  dueDate: z
    .string()
    .transform((date) => new Date(date))
    .optional(), // Optional, ensure it's a valid date
  categoryId: z.string().optional().nullable(), // Optional, matches ObjectId
})

export const CreateCategorySchema = z.object({
  name: z.string().min(1, "Name is required").max(30, "Name is too long"), // Required, with constraints
})
export type Category = z.infer<typeof CreateCategorySchema>

export const UpdateCategorySchema = z.object({
  id: z.string(), // will be generated by db
  name: z.string().min(1, "Name is required").max(255, "Name is too long"), // Required, with constraints
})
export type CategoryType = z.infer<typeof UpdateCategorySchema>
