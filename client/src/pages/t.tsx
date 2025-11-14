import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ✅ Define schema with Zod
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// ✅ Infer the TypeScript type from schema
type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { register, handleSubmit, formState } = useForm<LoginFormData>();
  const { errors } = formState;

  // Manual Zod validation since no zodResolver
  const onSubmit = (data: LoginFormData) => {
    const result = loginSchema.safeParse(data);
    if (!result.success) {
      console.log("Validation errors:", result.error.format());
      return;
    }
    console.log("Login data:", result.data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input type="email" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label>Password:</label>
        <input type="password" {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <button type="submit">Login</button>
    </form>
  );
}
