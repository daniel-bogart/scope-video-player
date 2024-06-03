export interface CTAProps {
  children: React.ReactNode;
  to?: string;
  isAnchor?: boolean;
  isOutbound?: boolean;
  className?: string;
  onClick?: () => void;
  theme?: "hollow" | "orange" | "mint";
}
