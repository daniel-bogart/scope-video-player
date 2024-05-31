export const getThumbnailUrl = (videoUrl: string): string => {
  if (videoUrl.includes("youtube.com")) {
    let videoId = videoUrl.split("v=")[1];
    if (videoId) {
      videoId = videoId.split("&")[0]; // Remove additional parameters
      videoId = videoId.split("#")[0]; // Remove additional parameters
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
  }
  return "";
};
