import { UseFormSetValue } from "react-hook-form";
import { SetPreviewFunction } from "./types";

export const handleSubImagesUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  setValue: UseFormSetValue<any>,
  setPreview: (callback: SetPreviewFunction) => void
) => {
  const files = e.target.files;
  if (files) {
    const imageUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setPreview((prev) => ({ ...prev, subImages: imageUrls }));

    setValue("subImages", Array.from(files));
  }
};
