import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CHANGE_CURRENT_PASSWORD } from "../../constants/apiRoutes";
import { patchRequest } from "../../api";
import { z } from "zod";

const PasswordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
  confirmPassword: z.string().min(6),
});

type PasswordChangeProps = z.infer<typeof PasswordSchema>;

interface ChangePasswordProps {
  onClose: () => void;
}

export default function ChangePassword({ onClose }: ChangePasswordProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordChangeProps>({
    mode: "onChange",
    resolver: zodResolver(PasswordSchema),
  });

  const [passwordMessage, setPasswordMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<PasswordChangeProps> = async (data) => {
    setIsSubmitting(true);
    setPasswordMessage("");

    if (data.newPassword !== data.confirmPassword) {
      setPasswordMessage("New password and confirmation do not match.");
      setIsSubmitting(false);
      return;
    }

    try {
      await patchRequest(CHANGE_CURRENT_PASSWORD, {
        newPassword: data.newPassword,
        currentPassword: data.currentPassword,
      });

      setPasswordMessage("Password updated successfully");
      setTimeout(() => {
        onClose();
        setPasswordMessage("");
        reset();
      }, 2000);
    } catch (error) {
      console.error("Error updating password", error);
      setPasswordMessage("Failed to update password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        {passwordMessage && (
          <h3 className="text-sm text-green-600 mb-2">{passwordMessage}</h3>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              {...register("currentPassword")}
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400"
            />
            {errors.currentPassword && (
              <div className="text-red-500">
                {errors.currentPassword.message}{" "}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              {...register("newPassword")}
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400"
            />
            {errors.newPassword && (
              <div className="text-red-500">{errors.newPassword.message} </div>
            )}
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400"
            />
            {errors.confirmPassword && (
              <div className="text-red-500">
                {errors.confirmPassword.message}{" "}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
