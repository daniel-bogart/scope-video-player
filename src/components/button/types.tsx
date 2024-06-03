export interface CTAProps {
  children: React.ReactNode;
  to?: string;
  isAnchor?: boolean;
  isOutbound?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  theme?: "hollow" | "orange" | "mint";
}
