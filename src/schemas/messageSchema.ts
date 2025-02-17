import {z} from "zod";

export const messageSchema = z.object({
    content : z
        .string()
        .min(6, {message :"content must be atleast 6 chars long"})
        .max(300, {message :"content must be no longer than 300 chars"})
})