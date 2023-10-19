import * as yup from "yup";

export const registerSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must be at most 32 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    )
    .required("Password is required"),
  name: yup.string().min(3).max(32).required("Name is required"),
  contactNumber: yup.string().min(11).max(11).required("Phone is required"),
});
