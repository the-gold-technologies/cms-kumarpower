import toast from "react-hot-toast";

export const MAX_UPLOAD_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export function validateFileSize(file: File): boolean {
  if (file && file.size > MAX_UPLOAD_FILE_SIZE) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    toast.error(
      `File size is too big (${sizeMb}MB). Maximum allowed limit is 100MB. Please reduce it to under 100MB.`
    );
    return false;
  }
  return true;
}

export async function uploadFile(file: File): Promise<string> {
  if (!validateFileSize(file)) {
    throw new Error(
      `File size is too big (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please reduce it to under 100MB.`
    );
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    const errMsg = data.error || "Failed to upload file";
    toast.error(errMsg);
    throw new Error(errMsg);
  }

  return data.files && data.files.length > 0 ? data.files[0] : "";
}

export async function uploadFiles(files: any): Promise<string[]> {
  if (!files) return [];
  const fileArray = Array.isArray(files) ? files : Array.from(files as FileList);
  const uploadPromises = fileArray.map(async (file: any) => {
    if (typeof file === "string") return file;
    if (file && typeof file === "object" && "name" in file) return uploadFile(file);
    return "";
  });
  return Promise.all(uploadPromises);
}

/**
 * Recursively scans an object or array for File objects.
 * Uploads all File objects in parallel and replaces them with their Cloudinary URLs.
 * Returns a cloned object with the URLs injected.
 */
export async function uploadFilesDeep(obj: any): Promise<any> {
  if (!obj) return obj;

  if (obj instanceof File) {
    const urls = await uploadFiles([obj]);
    return urls[0] || "";
  }

  if (Array.isArray(obj)) {
    return Promise.all(obj.map((item) => uploadFilesDeep(item)));
  }

  if (typeof obj === "object") {
    const entries = Object.entries(obj);
    const resolvedEntries = await Promise.all(
      entries.map(async ([key, value]) => {
        return [key, await uploadFilesDeep(value)];
      })
    );
    return Object.fromEntries(resolvedEntries);
  }

  return obj;
}
