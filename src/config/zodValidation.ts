import { z } from "zod";

export const userSchema = z.object({
  name: z.string().trim().min(3, "Length must be greater than 3"),
  userName: z.string().trim().min(3, "Length must be greater than 3"),
  email: z.email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters long"),
});
