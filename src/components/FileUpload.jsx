import React, { useRef, useState } from "react";
import { HiUpload, HiX, HiDocument } from "react-icons/hi";

export default function FileUpload({ onFileSelected }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setIsUploading(true);

    try {
      await onFileSelected(selectedFile);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        onClick={() => inputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-xl p-8
          ${file 
            ? "border-primary-500 bg-primary-50 dark:bg-primary-900/10" 
            : "border-gray-300 dark:border-gray-700"
          }
          hover:border-primary-500 transition-colors cursor-pointer
        `}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
          accept=".pdf,.jpg,.jpeg,.png"
        />

        <div className="flex flex-col items-center justify-center text-center">
          {file ? (
            <div className="flex items-center gap-3">
              <HiDocument className="w-6 h-6 text-primary-500" />
              <span className="font-medium">{file.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <HiX className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <HiUpload className="w-10 h-10 text-primary-500 mb-3" />
              <p className="text-sm font-medium">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PDF, JPG, or PNG (max. 10MB)
              </p>
            </>
          )}
        </div>
      </div>

      {/* Upload progress */}
      {isUploading && (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-primary-500 animate-pulse rounded-full" />
          </div>
          <span className="text-sm text-gray-500">Uploading...</span>
        </div>
      )}
    </div>
  );
}
