import { useRef, useState } from "react";
import { patchRequest } from "../api";
import { CHANGE_CURRENT_PASSWORD, UPDATE_AVATAR } from "../constants/apiRoutes";
import { useAuth } from "../context/AuthContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const PasswordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
  confirmPassword: z.string().min(6),
});

type PasswordChangeProps = z.infer<typeof PasswordSchema>;
export default function UserProfilePage() {
  const { user, refreshUser } = useAuth();
  const { register, handleSubmit, reset } = useForm<PasswordChangeProps>({
    mode: "onChange",
    resolver: zodResolver(PasswordSchema),
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState(user?.avatar.url);

  const [passwordMessage, setPasswordMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        setIsModalOpen(false);
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

  function handleAvtarClick() {
    fileInputRef.current?.click();
  }

  async function updateAvtar(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = (await patchRequest(UPDATE_AVATAR, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })) as { data: { avatar: { url: string } } };

      return response?.data.avatar.url;
    } catch (error) {
      console.error("Error uploading Avatar", error);
      throw error;
    }
  }

  async function handleUpdateAvatar(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    try {
      if (file) {
        const newAvatarUrl = await updateAvtar(file);
        setAvatar(newAvatarUrl);
        await refreshUser();
      }
    } catch (error) {
      console.error("Error uploading Avatar", error);
      throw error;
    }
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <img
          src={avatar}
          alt="User Avatar"
          className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 cursor-pointer"
          onClick={handleAvtarClick}
        />

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpdateAvatar}
          ref={fileInputRef}
        />

        <h1 className="mt-4 text-2xl font-bold text-gray-800">
          {user?.username}
        </h1>
        <span className="block mt-2 text-gray-600">{user?.email}</span>
        <span className="block mt-2 text-sm text-gray-500">
          Role: {user?.role}
        </span>

        <div className="mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            Edit Password
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              >
                ✕
              </button>

              <h2 className="text-xl font-semibold mb-4">Change Password</h2>
              {passwordMessage && (
                <h3 className="text-sm text-green-600 mb-2">
                  {passwordMessage}
                </h3>
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
        )}
      </div>
    </div>
  );
}
