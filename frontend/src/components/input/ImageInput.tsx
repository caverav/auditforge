import React, { ChangeEvent, useState, useEffect } from "react";

interface ImageInputProps {
  label: string;
  id: string;
  name: string;
  onImageSelect: (image: string) => void;
  initialImage?: string; // Optional prop to set the initial image
}

const ImageInput: React.FC<ImageInputProps> = ({
  label,
  id,
  name,
  onImageSelect,
  initialImage,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialImage || null
  );

  useEffect(() => {
    if (initialImage) {
      setImagePreview(initialImage);
    }
  }, [initialImage]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        onImageSelect(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-300"
      >
        {label}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          id={id}
          name={name}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-7 text-white-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        />
      </div>
      {imagePreview && (
        <div className="mt-4 flex justify-center">
          <img
            src={imagePreview}
            alt="Image Preview"
            className="w-40 h-auto rounded-md shadow-md"
          />
        </div>
      )}
    </div>
  );
};

export default ImageInput;
