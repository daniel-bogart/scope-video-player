
import placeholder from '.././../public/images/mountaineering.jpg'

export const getThumbnailUrl = (videoUrl: string | undefined): string => {
  if (!videoUrl) {
    return "";
  }
  if (videoUrl.includes("sdf234r23f23d23d")) {
    return placeholder.src;
  }
    if (videoUrl.includes("youtube.com")) {
      let videoId = videoUrl.split("v=")[1];
      if (videoId) {
        videoId = videoId.split("&")[0];
        videoId = videoId.split("#")[0];
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      }
    } else if (videoUrl.includes("vimeo.com")) {
      const videoId = videoUrl.split("/").pop();
      return `https://vumbnail.com/${videoId}.jpg`;
    }

  return placeholder.src;
};
