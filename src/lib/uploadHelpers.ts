export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload file");
  }

  const data = await response.json();
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
    return Promise.all(obj.map(item => uploadFilesDeep(item)));
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
