interface CurvedLineProps {
  className?: string;
  color?: string;
}

export default function CurvedLine({
  className = "",
  color = "#D4A017",
}: CurvedLineProps) {
  return (
    <svg
      viewBox="0 0 200 12"
      fill="none"
      className={`w-32 h-3 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 6 Q50 0, 100 6 T200 6"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
