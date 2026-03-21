export default function Ornament({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={`flex items-center justify-center py-6 ${className}`}>
      <span
        className={`block w-16 h-[0.5px] ${light ? "bg-white/20" : "bg-primary/15"}`}
      />
      <span
        className={`mx-4 text-sm ${light ? "text-gold/40" : "text-gold/50"}`}
      >
        ✦
      </span>
      <span
        className={`block w-16 h-[0.5px] ${light ? "bg-white/20" : "bg-primary/15"}`}
      />
    </div>
  );
}
