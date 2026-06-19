interface WaveDividerProps {
  fill?: string;
  flip?: boolean;
  className?: string;
}

export default function WaveDivider({
  fill = "#f8fafc",
  flip = false,
  className = "",
}: WaveDividerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className}`}
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        preserveAspectRatio="none"
      >
        <path
          d="M0,64 C240,120 480,0 720,48 C960,96 1200,24 1440,64 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
