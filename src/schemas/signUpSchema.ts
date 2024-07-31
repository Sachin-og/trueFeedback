import {z} from "zod";

export const usernameValidation = z
        .string()
        .min(2, "Username must be atleat two characters")
        .max(20, "Username can not exceed 20 characters")
        .regex(/^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/, "username must not contain special characters ")


export const signUpSchema = z.object({
    username : usernameValidation,
    email : z.string().email({message:"Invalid Email Address"}),
    password : z.string().min(6, {message:"password must be atleast 6 chars"})
})