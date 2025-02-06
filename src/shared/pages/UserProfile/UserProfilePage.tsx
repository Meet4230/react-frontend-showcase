import { useRef, useState } from "react";
import { patchRequest } from "../../api";
import { UPDATE_AVATAR } from "../../constants/apiRoutes";
import { useAuth } from "../../context/AuthContext";
import ChangePassword from "../../components/Change-Password";

export default function UserProfilePage() {
  const { user, refreshUser } = useAuth();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState(user?.avatar.url);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <img
          src={avatar}
          alt="User Avatar"
          className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 cursor-pointer dark:border-blue-300"
          onClick={handleAvtarClick}
        />

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpdateAvatar}
          ref={fileInputRef}
        />

        <h1 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
          {user?.username}
        </h1>
        <span className="block mt-2 text-gray-600 dark:text-gray-400">
          {user?.email}
        </span>
        <span className="block mt-2 text-sm text-gray-500 dark:text-gray-400">
          Role: {user?.role}
        </span>

        <div className="mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 dark:bg-blue-700 dark:hover:bg-blue-600"
            onClick={() => setIsModalOpen(true)}
          >
            Edit Password
          </button>
        </div>
        {isModalOpen && (
          <ChangePassword onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </div>
  );
}
