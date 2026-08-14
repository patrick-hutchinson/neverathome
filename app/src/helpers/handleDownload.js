const getFileUrl = (file) => file?.asset?.url || file?.url;

const getFileName = (file) => file?.asset?.originalFilename || file?.originalFilename || "file.pdf";

export const getDownloadUrl = (file) => {
  const url = getFileUrl(file);
  if (!url) return null;

  const downloadUrl = new URL(url);
  downloadUrl.searchParams.set("dl", getFileName(file));
  return downloadUrl.toString();
};

export const handleDownload = async (file) => {
  const url = getFileUrl(file);
  if (!url) return;

  const response = await fetch(url);
  const blob = await response.blob();

  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = getFileName(file);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(objectUrl);
};
