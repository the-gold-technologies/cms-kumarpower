"use client";

import React, { useState, useRef } from "react";
import { CloudUpload, X, HelpCircle } from "lucide-react";

interface ImageUploadFieldProps {
  label?: string;
  value?: string | File;
  images?: (File | string | null)[];
  onChange?: (val: string | File) => void;
  onImagesChange?: (images: (File | string | null)[]) => void;
  maxImages?: number;
  containerClassName?: string;
  tooltip?: string;
}

import { uploadFile } from "@/lib/uploadHelpers";
import toast from "react-hot-toast";

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label = "Image",
  value,
  images: controlledImages,
  onChange,
  onImagesChange,
  maxImages = 1,
  containerClassName = "",
  tooltip,
  uploadImmediately = false,
}: ImageUploadFieldProps & { uploadImmediately?: boolean }) => {
  const [internalImages, setInternalImages] = useState<(File | string | null)[]>(
    value ? [value] : []
  );
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const images = controlledImages ?? (value ? [value] : internalImages);

  const handleUpdate = async (newImages: (File | string | null)[]) => {
    if (!controlledImages) {
      setInternalImages(newImages);
    }
    
    if (newImages.length > 0) {
      const first = newImages[0];
      if (typeof first === "string") {
        // @ts-ignore - allow string
        onChange?.(first);
        onImagesChange?.(newImages);
      } else if (first instanceof File) {
        if (uploadImmediately) {
          setIsUploading(true);
          const tid = toast.loading("Uploading image...");
          try {
            const url = await uploadFile(first);
            // @ts-ignore - allow string
            onChange?.(url);
            onImagesChange?.([url]);
            if (!controlledImages) setInternalImages([url]);
            toast.success("Image uploaded successfully!", { id: tid });
          } catch (e: any) {
            toast.error("Upload failed: " + e.message, { id: tid });
            if (!controlledImages) setInternalImages([]);
          } finally {
            setIsUploading(false);
          }
        } else {
          // Pass the File object directly if not uploading immediately
          // @ts-ignore - allow File object
          onChange?.(first);
          onImagesChange?.([first]);
        }
      }
    } else {
      // @ts-ignore - allow empty string
      onChange?.("");
      onImagesChange?.([]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files) {
      const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/")
      );
      const newImages = [...images, ...droppedFiles].slice(0, maxImages);
      handleUpdate(newImages);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const newImages = [...images, ...selectedFiles].slice(0, maxImages);
      handleUpdate(newImages);
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    handleUpdate(images.filter((_, i) => i !== index));
  };

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-4 flex items-center gap-1.5 relative">
          {label}
          {tooltip && (
            <div className="group relative flex items-center">
              <HelpCircle className="w-3.5 h-3.5 cursor-help text-gray-300 hover:text-[#2D6FBA] transition-colors" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max max-w-[280px] px-4 py-3 bg-white text-gray-900 text-[11px] font-medium rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 normal-case tracking-normal text-center leading-relaxed backdrop-blur-sm">
                {tooltip}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-white"></div>
              </div>
            </div>
          )}
        </label>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
        multiple={maxImages > 1}
        className="hidden"
      />

      {images.length > 0 && (
        <div className="flex flex-col gap-2 mt-1 mb-1">
          {images.map((img, idx) => {
            if (!img) return null;
            return (
              <div
                key={idx}
                className="w-full border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-between p-3 px-4 relative overflow-hidden group"
              >
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      typeof img === "string"
                        ? img
                        : URL.createObjectURL(img as Blob)
                    }
                    alt={`Preview ${idx + 1}`}
                    className="w-12 h-12 object-cover rounded-md shadow-xs border border-gray-200"
                  />
                  <div className="flex flex-col">
                    <span className="text-gray-900 font-semibold text-sm truncate max-w-[200px]">
                      {typeof img === "string"
                        ? "Uploaded Image"
                        : (img as File).name || "Image Asset"}
                    </span>
                    <span className="text-gray-500 font-medium text-[12px]">
                      {typeof img === "string"
                        ? "URL Asset"
                        : (img as File).size
                        ? ((img as File).size / 1024 / 1024).toFixed(2) + " MB"
                        : "Ready"}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    removeImage(idx);
                  }}
                  className="p-1.5 bg-white text-gray-500 hover:text-red-500 rounded-full shadow-xs ring-1 ring-gray-100 transition-colors cursor-pointer relative z-10"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {images.length < maxImages && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`mt-1 w-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 lg:p-8 transition-colors cursor-pointer group
          ${
            isDragging
              ? "border-[#0A0F29] border-solid bg-gray-100"
              : "border-gray-200 bg-gray-50 hover:bg-gray-100"
          }
        `}
        >
          <span className="text-gray-600 font-medium text-sm mb-4">
            {maxImages > 1
              ? `Image (${images.length}/${maxImages} selected)`
              : "Provide an image asset"}
          </span>

          <div
            className={`p-3 rounded-full shadow-xs ring-1 ring-gray-100 mb-4 transition-transform
          ${
            isDragging
              ? "bg-[#0A0F29] text-white scale-110"
              : "bg-white text-[#0A0F29] group-hover:scale-110"
          }
        `}
          >
            <CloudUpload className="w-6 h-6" strokeWidth={2} />
          </div>

          <p className="text-gray-500 text-sm mb-2 text-center">
            <span className="text-[#2D6FBA] font-semibold hover:underline mr-1">
              Click to upload
            </span>
            <br className="lg:hidden" />
            <span className="hidden lg:inline">or </span>drag and drop
          </p>
          <p className="text-gray-400 text-[13px] font-medium text-center">
            PNG, JPG or WEBP (800×400px).
          </p>
        </div>
      )}
    </div>
  );
};
