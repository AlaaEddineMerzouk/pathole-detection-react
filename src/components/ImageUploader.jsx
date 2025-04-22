import React, { useState } from "react";

const ImageUploader = ({ onUpload }) => {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md">
      <div className="w-full flex justify-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-white file:bg-gradient-to-r file:from-blue-500 file:to-green-500 hover:file:bg-gradient-to-l hover:file:from-green-500 hover:file:to-blue-600 cursor-pointer transition duration-200 ease-in-out"
        />
      </div>
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="max-h-80 rounded-lg shadow-md mt-6"
        />
      )}
    </div>
  );
};

export default ImageUploader;
