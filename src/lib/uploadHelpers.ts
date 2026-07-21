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
  return data.url;
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
