import React, { useEffect } from "react";
import { useForm, SubmitHandler, get } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postRequest } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";
import { LOGIN_USER, REGISTER_USER } from "../../constants/apiRoutes";
import usePersistState from "../../hooks/usePersistState";
import { getItem } from "../../utils/localstorage";

// Define form types
type FormType = "signup" | "login";

// Dynamic schema creation
const createFormSchema = (type: FormType) => {
  const baseSchema = {
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  };

  const signupSchema = {
    ...baseSchema,
    username: z.string().min(2, "Username must be at least 2 characters"),
  };

  return z.object(type === "signup" ? signupSchema : baseSchema);
};

// Dynamic form configuration
const formConfig = {
  signup: {
    title: "Sign Up",
    endpoint: REGISTER_USER,
    fields: [
      {
        name: "username",
        type: "text",
        label: "Username",
      },
      {
        name: "email",
        type: "email",
        label: "Email",
      },
      {
        name: "password",
        type: "password",
        label: "Password",
      },
    ],
  },
  login: {
    title: "Login",
    endpoint: LOGIN_USER,
    fields: [
      {
        name: "email",
        type: "email",
        label: "Email",
      },
      {
        name: "password",
        type: "password",
        label: "Password",
      },
    ],
  },
};

interface DynamicFormProps {
  type: FormType;
}

const Form: React.FC<DynamicFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);
  const [accessToken, setAcessToken] = usePersistState<string>(
    "accessToken",
    ""
  );
  const [refreshToken, setRefreshToken] = usePersistState<string>(
    "refreshToken",
    ""
  );

  const isAuthenticated = getItem("accessToken");
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true }); // Redirect logged-in users
    }
  }, [isAuthenticated, navigate]);
  // Dynamic schema based on form type
  const FormFieldSchema = createFormSchema(type);
  type FormData = z.infer<typeof FormFieldSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(FormFieldSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setError(null);
      const config = formConfig[type];
      const response = await postRequest(config.endpoint, data);
      const { accessToken, refreshToken } = response.data;
      setAcessToken(accessToken);
      setRefreshToken(refreshToken);

      if (config["title"] === "Sign Up") {
        navigate("/login");
      } else {
        setAcessToken(accessToken);
        setRefreshToken(refreshToken);
        navigate("/dashboard"); // Add delay to ensure token persistence
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      console.error("Form submission error:", err);
    }
  };

  const config = formConfig[type];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-96 transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
          {config.title}
        </h2>
        {error && (
          <div className="mb-4 p-3 rounded bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-200">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {config.fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name}
                {...register(field.name as keyof FormData)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors[field.name as keyof typeof errors] && (
                <div className="text-red-500 dark:text-red-400 text-sm mt-1">
                  {errors[field.name as keyof typeof errors]?.message}
                </div>
              )}
            </div>
          ))}
          <Button
            type="submit"
            className="w-full text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-300"
            disabled={isSubmitting}
            variant="danger"
          >
            {isSubmitting ? "Submitting" : config.title}
          </Button>

          {config.title === "Sign Up" ? (
            <div className="flex justify-around">
              <span className="text-gray-600 dark:text-gray-400">
                Already User?{" "}
                <Link
                  to="/login"
                  className="underline text-blue-500 dark:text-blue-400"
                >
                  Login
                </Link>
              </span>
            </div>
          ) : (
            config.title === "Login" && (
              <div className="flex justify-around">
                <span className="text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to="/"
                    className="underline text-blue-500 dark:text-blue-400"
                  >
                    Sign Up
                  </Link>
                </span>
              </div>
            )
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
