export const truncateText = (text: string, charLimit: number): string => {
  if (text.length <= charLimit) {
    return text;
  }
  return text.slice(0, charLimit) + "...";
};

