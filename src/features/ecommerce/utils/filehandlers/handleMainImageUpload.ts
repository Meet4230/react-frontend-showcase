import { UseFormSetValue } from "react-hook-form";
import { SetPreviewFunction } from "./types";

export const handleMainImageUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  setValue: UseFormSetValue<any>,
  setPreview: (callback: SetPreviewFunction) => void
) => {
  const file = e.target.files?.[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setPreview((prev) => ({ ...prev, mainImage: imageUrl }));
    setValue("mainImage", file);
  }
};
