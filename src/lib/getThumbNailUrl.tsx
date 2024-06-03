export const getThumbnailUrl = (videoUrl: string | undefined): string => {
  if (!videoUrl) {
    return ""; // Return an empty string or a placeholder URL if videoUrl is undefined
  }

  if (videoUrl.includes("youtube.com")) {
    let videoId = videoUrl.split("v=")[1];
    if (videoId) {
      videoId = videoId.split("&")[0]; // Remove additional parameters
      videoId = videoId.split("#")[0]; // Remove additional parameters
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
  } else if (videoUrl.includes("vimeo.com")) {
    const videoId = videoUrl.split("/").pop();
    return `https://vumbnail.com/${videoId}.jpg`;
  }

  return "";
};
