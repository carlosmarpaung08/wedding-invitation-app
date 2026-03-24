export default function Ornament({
  className = "",
  light = false,
  variant = "simple",
}: {
  className?: string;
  light?: boolean;
  variant?: "simple" | "floral" | "cross";
}) {
  const lineColor = light ? "bg-gold/30" : "bg-gold/25";
  const goldText = light ? "text-gold/70" : "text-gold/60";

  if (variant === "cross") {
    return (
      <div className={`flex items-center justify-center py-6 ${className}`}>
        <div className={`h-[0.5px] w-12 ${lineColor}`} />
        <div className="mx-4 flex flex-col items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`${goldText.replace("text-", "fill-")} opacity-70`}>
            <path d="M7 0h2v6h6v2H9v6H7v-6H1V6h6z" fill="currentColor" className={goldText} />
          </svg>
        </div>
        <div className={`h-[0.5px] w-12 ${lineColor}`} />
      </div>
    );
  }

  if (variant === "floral") {
    return (
      <div className={`flex items-center justify-center py-6 gap-3 ${className}`}>
        {/* Left arm */}
        <div className={`h-[0.5px] w-10 ${lineColor}`} />
        <span className={`text-xs ${goldText}`}>✿</span>
        <div className={`h-[0.5px] w-6 ${lineColor}`} />
        {/* Center motif */}
        <div className="flex flex-col items-center">
          <span className={`text-[10px] leading-none ${goldText}`}>◆</span>
        </div>
        <div className={`h-[0.5px] w-6 ${lineColor}`} />
        <span className={`text-xs ${goldText}`}>✿</span>
        {/* Right arm */}
        <div className={`h-[0.5px] w-10 ${lineColor}`} />
      </div>
    );
  }

  // Default "simple" — upgraded version of original
  return (
    <div className={`flex items-center justify-center py-6 ${className}`}>
      <div className={`h-[0.5px] w-8 ${lineColor}`} />
      <span className={`mx-2 text-[8px] ${goldText}`}>◆</span>
      <div className={`h-[0.5px] w-4 ${lineColor}`} />
      <span className={`mx-3 text-lg font-serif ${goldText}`}>✦</span>
      <div className={`h-[0.5px] w-4 ${lineColor}`} />
      <span className={`mx-2 text-[8px] ${goldText}`}>◆</span>
      <div className={`h-[0.5px] w-8 ${lineColor}`} />
    </div>
  );
}
