export interface CTAProps {
  children: React.ReactNode;
  to: string;
  isAnchor?: boolean;
  isOutbound?: boolean;
  className?: string;
  theme?: "hollow" | "orange" | "mint";
}
