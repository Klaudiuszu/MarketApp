"use client";

import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputFIeld";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

/**
 * SignIn Component
 *
 * A user authentication page that allows users to log in with their email and password.
 * Uses React Hook Form for form management and validation.
 *
 * @returns {JSX.Element} The sign-in form component
 *
 * @example
 * ```tsx
 * <SignIn />
 * ```
 *
 * Form Fields:
 * - Email: Required, must match email pattern (user@domain.com)
 * - Password: Required field
 *
 * Features:
 * - Client-side form validation
 * - Loading state during form submission
 * - Link to sign-up page for new users
 */
const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      console.log("Form Data Submitted:", data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h1 className="form-title">Log In Your Account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="email"
          label="Email"
          placeholder="your@email.com"
          register={register}
          error={errors.email}
          validation={{
            required: "Email is required",
            pattern: /^\w+@\w+\.\w+$/,
            message: "Email address is required",
          }}
        />

        <InputField
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          register={register}
          error={errors.password}
          validation={{ required: "Password is required" }}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Logging In..." : "Log In"}
        </Button>

        <FooterLink
          text="Don't have an account?"
          linkText="Sign Up"
          href="/sign-up"
        />
      </form>
    </>
  );
};
export default SignIn;
